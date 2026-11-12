/**
 * @jest-environment node
 */
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import ffmpeg from "fluent-ffmpeg";
import { mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createApp, probe } from "../app.js";

const VALID_TOKEN = "valid-token";
const verifyToken = async (token) => (token === VALID_TOKEN ? { id: "user-1" } : null);

// Collects a binary response body into a Buffer.
const binaryParser = (res, callback) => {
  const chunks = [];
  res.on("data", (chunk) => chunks.push(chunk));
  res.on("end", () => callback(null, Buffer.concat(chunks)));
};

let workDir;
let uploadDir;
let sampleVideo;
let app;

beforeAll(async () => {
  workDir = await mkdtemp(path.join(os.tmpdir(), "slate-test-"));
  uploadDir = path.join(workDir, "uploads");
  sampleVideo = path.join(workDir, "sample.mp4");
  app = createApp({ verifyToken, tmpDir: uploadDir });

  // A 1-second 1920x1080 test clip, so the scale-down path is exercised.
  await new Promise((resolve, reject) => {
    ffmpeg()
      .input("testsrc=duration=1:size=1920x1080:rate=10")
      .inputFormat("lavfi")
      .outputOptions(["-c:v libx264", "-pix_fmt yuv420p"])
      .on("end", resolve)
      .on("error", reject)
      .save(sampleVideo);
  });
}, 60_000);

afterAll(async () => {
  await rm(workDir, { recursive: true, force: true });
});

const authed = (req) => req.set("Authorization", `Bearer ${VALID_TOKEN}`);

describe("GET /health", () => {
  test("reports the service is up", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});

describe("POST /resize authentication", () => {
  test("rejects requests with no token", async () => {
    const response = await request(app).post("/resize");
    expect(response.status).toBe(401);
  });

  test("rejects requests with an invalid token", async () => {
    const response = await request(app)
      .post("/resize")
      .set("Authorization", "Bearer wrong-token");
    expect(response.status).toBe(401);
  });

  test("returns 503 when the token cannot be checked", async () => {
    const failingApp = createApp({
      verifyToken: async () => {
        throw new Error("Supabase unreachable");
      },
      tmpDir: uploadDir,
    });
    const response = await authed(request(failingApp).post("/resize"));
    expect(response.status).toBe(503);
  });
});

describe("POST /resize validation", () => {
  test("requires a file", async () => {
    const response = await authed(request(app).post("/resize"));
    expect(response.status).toBe(400);
  });

  test("rejects files that are not videos", async () => {
    const response = await authed(request(app).post("/resize")).attach(
      "video",
      Buffer.from("just some notes"),
      { filename: "notes.txt", contentType: "text/plain" },
    );
    expect(response.status).toBe(415);
  });

  test("rejects files over the size limit", async () => {
    const smallLimitApp = createApp({ verifyToken, tmpDir: uploadDir, maxFileSizeBytes: 1024 });
    const response = await authed(request(smallLimitApp).post("/resize")).attach("video", sampleVideo);
    expect(response.status).toBe(413);
  });

  test("rejects a file that claims to be a video but is not one", async () => {
    const fakeVideo = path.join(workDir, "fake.mp4");
    await writeFile(fakeVideo, "this is not a video");
    const response = await authed(request(app).post("/resize")).attach("video", fakeVideo, {
      contentType: "video/mp4",
    });
    expect(response.status).toBe(422);
  });

  test("returns 503 when the server is at capacity", async () => {
    const fullApp = createApp({ verifyToken, tmpDir: uploadDir, maxConcurrentJobs: 0 });
    const response = await authed(request(fullApp).post("/resize"));
    expect(response.status).toBe(503);
  });
});

describe("POST /resize compression", () => {
  test(
    "returns a smaller-resolution MP4 and cleans up its temporary files",
    async () => {
      const response = await authed(request(app).post("/resize"))
        .attach("video", sampleVideo, { contentType: "video/mp4" })
        .buffer(true)
        .parse(binaryParser);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/^video\/mp4/);

      const outputPath = path.join(workDir, "output.mp4");
      await writeFile(outputPath, response.body);
      const metadata = await probe(outputPath);
      const videoStream = metadata.streams.find((stream) => stream.codec_type === "video");
      expect(videoStream.width).toBe(1080);
      expect(videoStream.height % 2).toBe(0);

      expect(await readdir(uploadDir)).toEqual([]);
    },
    60_000,
  );
});
