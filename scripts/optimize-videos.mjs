/**
 * Re-encode public/videos for web: 720p max, CRF 28, no audio, faststart.
 * Replaces files in place when smaller.
 * Usage: node scripts/optimize-videos.mjs
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const videosDir = path.join(root, "public", "videos");

function findVideos(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) findVideos(full, acc);
    else if (/\.mp4$/i.test(entry.name)) acc.push(full);
  }
  return acc;
}

const ffmpeg =
  spawnSync("ffmpeg", ["-version"], { encoding: "utf8" }).status === 0
    ? "ffmpeg"
    : null;

if (!ffmpeg) {
  console.error("ffmpeg not found on PATH");
  process.exit(1);
}

const files = findVideos(videosDir);
for (const file of files) {
  const before = fs.statSync(file).size;
  if (before < 500_000) {
    console.log(`skip small ${path.relative(videosDir, file)}`);
    continue;
  }
  const tmp = `${file}.cwv.tmp.mp4`;
  const args = [
    "-y",
    "-i",
    file,
    "-vf",
    "scale='min(1280,iw)':-2",
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-crf",
    "28",
    "-preset",
    "medium",
    "-an",
    "-movflags",
    "+faststart",
    tmp,
  ];
  const res = spawnSync(ffmpeg, args, { encoding: "utf8" });
  if (res.status !== 0) {
    console.error(`fail ${path.relative(videosDir, file)}\n${res.stderr?.slice(-400)}`);
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    continue;
  }
  const after = fs.statSync(tmp).size;
  if (after >= before * 0.95) {
    console.log(
      `keep ${path.relative(videosDir, file)} (${(before / 1e6).toFixed(1)}MB)`,
    );
    fs.unlinkSync(tmp);
    continue;
  }
  fs.renameSync(tmp, file);
  console.log(
    `ok   ${path.relative(videosDir, file)}  ${(before / 1e6).toFixed(1)}MB → ${(after / 1e6).toFixed(1)}MB`,
  );
}
