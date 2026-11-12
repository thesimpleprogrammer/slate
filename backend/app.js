import express from "express";
import multer from "multer";
import cors from "cors";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffprobeInstaller from "@ffprobe-installer/ffprobe";
import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeInstaller.path);

const MB = 1024 * 1024;

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function probe(filePath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => (err ? reject(err) : resolve(metadata)));
  });
}

// Re-encode to H.264/AAC. Videos wider than maxWidth are scaled down; smaller
// ones keep their size. "-2" keeps the height even, which libx264 requires.
export function compressVideo(inputPath, outputPath, { maxWidth }) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .videoFilters(`scale='min(${maxWidth},iw)':-2`)
      .outputOptions([
        "-c:v libx264",
        "-crf 28",
        "-preset veryfast",
        "-c:a aac",
        "-b:a 64k",
        "-movflags +faststart", // lets browsers start playback before the download finishes
      ])
      .on("end", resolve)
      .on("error", reject)
      .save(outputPath);
  });
}

// Checks a Supabase access token by asking Supabase who it belongs to.
// Works with both legacy (HS256) and newer asymmetric signing keys.
export function supabaseTokenVerifier({ supabaseUrl, anonKey }) {
  return async (token) => {
    const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${token}`, apikey: anonKey },
    });
    if (!response.ok) return null;
    return response.json();
  };
}

function sendFile(res, filePath) {
  return new Promise((resolve, reject) => {
    res.type("video/mp4").sendFile(filePath, (err) => (err ? reject(err) : resolve()));
  });
}

export function createApp({
  verifyToken,
  allowedOrigins = [],
  maxFileSizeBytes = 200 * MB,
  maxWidth = 1080,
  maxConcurrentJobs = 2,
  tmpDir = path.join(os.tmpdir(), "slate-uploads"),
}) {
  if (typeof verifyToken !== "function") {
    throw new Error("createApp needs a verifyToken function");
  }
  mkdirSync(tmpDir, { recursive: true });

  const app = express();
  app.disable("x-powered-by");
  // With no allowed origins configured, browsers on other sites are refused.
  app.use(cors({ origin: allowedOrigins.length > 0 ? allowedOrigins : false }));

  let activeJobs = 0;

  const requireUser = async (req, _res, next) => {
    const [scheme, token] = (req.get("authorization") ?? "").split(" ");
    if (scheme !== "Bearer" || !token) {
      throw new HttpError(401, "Missing bearer token");
    }
    let user;
    try {
      user = await verifyToken(token);
    } catch {
      throw new HttpError(503, "Could not verify the session. Try again shortly.");
    }
    if (!user) throw new HttpError(401, "Invalid or expired session");
    req.user = user;
    next();
  };

  // Checked before the upload is read, so a busy server doesn't store files it won't process.
  const reserveJobSlot = (_req, res, next) => {
    if (activeJobs >= maxConcurrentJobs) {
      throw new HttpError(503, "The video service is busy. Try again in a minute.");
    }
    activeJobs += 1;
    let released = false;
    const release = () => {
      if (!released) {
        released = true;
        activeJobs -= 1;
      }
    };
    res.on("finish", release);
    res.on("close", release);
    next();
  };

  const upload = multer({
    storage: multer.diskStorage({
      destination: tmpDir,
      filename: (_req, _file, cb) => cb(null, `${randomUUID()}.upload`),
    }),
    limits: { fileSize: maxFileSizeBytes, files: 1 },
    fileFilter: (_req, file, cb) => {
      if (file.mimetype.startsWith("video/")) cb(null, true);
      else cb(new HttpError(415, "Only video files are accepted"));
    },
  });

  app.get(["/", "/health"], (_req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/resize", requireUser, reserveJobSlot, upload.single("video"), async (req, res) => {
    if (!req.file) {
      throw new HttpError(400, "No video uploaded. Send it in a form field named 'video'.");
    }

    const inputPath = req.file.path;
    const outputPath = path.join(tmpDir, `${randomUUID()}.mp4`);

    try {
      try {
        const metadata = await probe(inputPath);
        if (!metadata.streams.some((stream) => stream.codec_type === "video")) {
          throw new Error("No video stream");
        }
      } catch {
        throw new HttpError(422, "The file could not be read as a video");
      }

      await compressVideo(inputPath, outputPath, { maxWidth });
      await sendFile(res, outputPath);
    } finally {
      await Promise.allSettled([rm(inputPath, { force: true }), rm(outputPath, { force: true })]);
    }
  });

  app.use((err, _req, res, _next) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        const limitMb = Math.max(1, Math.ceil(maxFileSizeBytes / MB));
        return res.status(413).json({ error: `Video is larger than the ${limitMb} MB limit` });
      }
      return res.status(400).json({ error: err.message });
    }

    const status = err.status ?? 500;
    if (status >= 500) console.error(err);
    if (res.headersSent) return res.end();
    res.status(status).json({ error: status >= 500 && !err.status ? "Video processing failed" : err.message });
  });

  return app;
}
