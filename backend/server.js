import { createApp, supabaseTokenVerifier } from "./app.js";

const required = ["SUPABASE_URL", "SUPABASE_ANON_KEY"];
const missing = required.filter((name) => !process.env[name]);
if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

const app = createApp({
  verifyToken: supabaseTokenVerifier({
    supabaseUrl: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
  }),
  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  maxFileSizeBytes: Number(process.env.MAX_UPLOAD_MB ?? 200) * 1024 * 1024,
  maxWidth: Number(process.env.MAX_VIDEO_WIDTH ?? 1080),
  maxConcurrentJobs: Number(process.env.MAX_CONCURRENT_JOBS ?? 2),
});

const port = Number(process.env.PORT ?? 5000);
app.listen(port, () => {
  console.log(`Video service listening on port ${port}`);
});
