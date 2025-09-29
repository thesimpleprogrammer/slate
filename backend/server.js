// @ts-nocheck
// server.ts
import express from "express";
import multer from "multer";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffprobeInstaller from "@ffprobe-installer/ffprobe";
import fs from "fs";
import path from "path";
import cors from "cors";

export const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

// Setup ffmpeg binary
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeInstaller.path); 

// ✅ Add this root route for testing
app.get("/", (req, res) => {
  res.status(200).send("Hello from the web server 🚀");
});

console.log("We're in the backend");

app.post("/resize", upload.single("video"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  console.log("We're in the backend");

  console.log("This is the req: " + JSON.stringify(req.file));

  const inputPath = req.file.path;
  console.log("Input path: " + inputPath);

  const outputPath = path.join("uploads", `output.mp4`);
  console.log("Output path: " + outputPath);

  try {
    // Run ffmpeg
    // await new Promise((resolve, reject) => {
      ffmpeg.ffprobe(inputPath, (err, metadata) => {
        if (err) throw err;
        const duration = metadata.format.duration; // in seconds
        console.log("Video duration:", duration);

        ffmpeg(inputPath)
          .size("1080x?") // scale to 360p
          .outputOptions([
            "-c:v libx264", // H.264 codec
            "-crf 28", // quality factor (23=default, 28=smaller file, 30+ very small but blurry)
            "-preset veryfast",
            "-c:a aac",
            "-b:a 64k",
          ])
          .output(outputPath)
          .on("progress", (progress) => {
            console.log(`Processing: ${progress.percent?.toFixed(2)}% done`);
          })
          .on("end", () => {
            console.log("FFmpeg finished writing file");

            const buffer = fs.readFileSync(outputPath);

            res.set("Content-Type", "video/mp4");
            res.set("Content-Length", buffer.length);
            res.send(buffer);

            console.log("Sent buffer to client, cleaning up...");
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
          })
          .on("error", (err) => console.error(err))
          .run();
      });
    // });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing video");
  }
});

// app.listen(5000, () => {
//   console.log("🚀 Server running on http://localhost:5000");
// });
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app;
