/**
 * One-shot image optimizer for public/images cover + proof assets.
 * Keeps original extension; rewrites JPEG/PNG smaller (max edge 1600, quality ~78).
 * Usage: node scripts/optimize-images.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "public", "images");

const TARGETS = [
  "social.jpg",
  "content.jpg",
  "performance.jpg",
  "web.jpg",
  "hero.jpg",
  "work-omnidot.jpg",
  "europatch.jpg",
  "europatch-reels-grid-1.png",
  "europatch-reels-grid-2.jpg",
  "n4sails-reels-grid.png",
  "n4sails-reel-views.png",
  "proof-europatch-all.png",
  "proof-europatch-ig.png",
  "proof-europatch-fb.png",
  "proof-europatch-reel.png",
  "proof-europatch-month.png",
  "proof-pyrgiotis-meta.png",
  "proof-pyrgiotis-google.png",
  "work-pyrgiotis-home.jpg",
  "work-pyrgiotis-office.jpg",
  "work-pyrgiotis-check.jpg",
  "exterior.jpg",
  "living.jpg",
  "view.jpg",
  "bedroom.jpg",
  "kitchen.jpg",
  "bathroom.jpg",
  "attic.jpg",
];

const MAX_EDGE = 1600;

async function optimizeOne(rel) {
  const file = path.join(imagesDir, rel);
  try {
    await fs.access(file);
  } catch {
    console.log(`skip missing ${rel}`);
    return;
  }

  const before = (await fs.stat(file)).size;
  const ext = path.extname(file).toLowerCase();
  const input = sharp(file, { failOn: "none" }).rotate();
  const meta = await input.metadata();
  let pipeline = input;
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  if (Math.max(w, h) > MAX_EDGE) {
    pipeline = pipeline.resize({
      width: w >= h ? MAX_EDGE : undefined,
      height: h > w ? MAX_EDGE : undefined,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  let buf;
  if (ext === ".png") {
    buf = await pipeline.png({ compressionLevel: 9, palette: true, quality: 80 }).toBuffer();
  } else if (ext === ".webp") {
    buf = await pipeline.webp({ quality: 78 }).toBuffer();
  } else {
    buf = await pipeline.jpeg({ quality: 78, mozjpeg: true }).toBuffer();
  }

  if (buf.length >= before * 0.97) {
    console.log(
      `keep ${rel} (${(before / 1024).toFixed(0)}KB — no meaningful gain)`,
    );
    return;
  }

  const tmp = `${file}.cwv.tmp${ext}`;
  await fs.writeFile(tmp, buf);
  await fs.rename(tmp, file);
  console.log(
    `ok   ${rel}  ${(before / 1024).toFixed(0)}KB → ${(buf.length / 1024).toFixed(0)}KB`,
  );
}

for (const rel of TARGETS) {
  await optimizeOne(rel);
}
