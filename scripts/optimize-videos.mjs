/**
 * Re-encode public/videos for web: short-side ≤720px, CRF 28, no audio, faststart.
 * Also builds *-preview.mp4 loops (~11s, ≤540p short side) for card/orb use.
 * Usage: node scripts/optimize-videos.mjs
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const videosDir = path.join(root, "public", "videos");

const PREVIEW_SOURCES = [
  "europatch/timeline-1.mp4",
  "n4sails/escape-summer-story.mp4",
  "pricing-orb-content.mp4",
];

function findVideos(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) findVideos(full, acc);
    else if (/\.mp4$/i.test(entry.name) && !/-preview\.mp4$/i.test(entry.name)) {
      acc.push(full);
    }
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

function runFfmpeg(args) {
  return spawnSync(ffmpeg, args, { encoding: "utf8" });
}

/** Scale so the shorter side is at most maxShort (vertical clips shrink width). */
function scaleFilter(maxShort) {
  return `scale='if(gt(iw\\,ih)\\,min(${maxShort * 16 / 9}\\,iw)\\,-2)':'if(gt(ih\\,iw)\\,min(${maxShort}\\,ih)\\,-2)'`;
}

const files = findVideos(videosDir);
for (const file of files) {
  const before = fs.statSync(file).size;
  if (before < 500_000) {
    console.log(`skip small ${path.relative(videosDir, file)}`);
    continue;
  }
  const tmp = `${file}.cwv.tmp.mp4`;
  const res = runFfmpeg([
    "-y",
    "-i",
    file,
    "-vf",
    scaleFilter(720),
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
  ]);
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

for (const rel of PREVIEW_SOURCES) {
  const src = path.join(videosDir, rel);
  if (!fs.existsSync(src)) {
    console.warn(`preview skip missing ${rel}`);
    continue;
  }
  const out = src.replace(/\.mp4$/i, "-preview.mp4");
  const tmp = `${out}.tmp.mp4`;
  const res = runFfmpeg([
    "-y",
    "-i",
    src,
    "-t",
    "11",
    "-vf",
    scaleFilter(540),
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-crf",
    "30",
    "-preset",
    "medium",
    "-an",
    "-movflags",
    "+faststart",
    tmp,
  ]);
  if (res.status !== 0) {
    console.error(`preview fail ${rel}\n${res.stderr?.slice(-400)}`);
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    continue;
  }
  fs.renameSync(tmp, out);
  const size = fs.statSync(out).size;
  console.log(
    `preview ${path.relative(videosDir, out)}  ${(size / 1e6).toFixed(2)}MB`,
  );
}
