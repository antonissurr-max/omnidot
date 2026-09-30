/**
 * Export LinkedIn Company Page assets:
 * - Logo 400×400 (from profile mark SVG)
 * - Cover 4200×700 (white field + centered wordmark; safe from bottom-left logo overlap)
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDirs = [
  path.join(root, "public", "images"),
  path.join(process.env.USERPROFILE || "", "Desktop", "Omnidot-Brand-Logos"),
].filter(Boolean);

const coverSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="4200" height="700" viewBox="0 0 4200 700" fill="none">
  <rect width="4200" height="700" fill="#FFFFFF"/>
  <!-- Keep clear of bottom-left logo overlap; center the wordmark in the safe band -->
  <g transform="translate(1680, 268)">
    <g transform="translate(0, 8)">
      <circle cx="18" cy="42" r="13" fill="#23395B"/>
      <circle cx="68" cy="42" r="13" fill="#23395B"/>
      <path d="M31 42h24" stroke="#23395B" stroke-width="5.5" stroke-linecap="round"/>
    </g>
    <text x="100" y="62" fill="#23395B" font-family="Segoe UI, IBM Plex Sans, Arial, sans-serif" font-size="72" font-weight="700" letter-spacing="-2.8">omnidot.</text>
  </g>
</svg>`;

for (const dir of outDirs) {
  await mkdir(dir, { recursive: true });

  const coverFile = path.join(dir, "omnidot-linkedin-cover-4200.png");
  const coverBuf = await sharp(Buffer.from(coverSvg), { density: 150 })
    .resize(4200, 700, { fit: "fill" })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(coverFile, coverBuf);
  console.log(`wrote ${coverFile} (${coverBuf.length} bytes)`);

  const logoSvg = await readFile(
    path.join(root, "public", "images", "omnidot-profile-1080.svg"),
  );
  const logoFile = path.join(dir, "omnidot-linkedin-logo-400.png");
  const logoBuf = await sharp(logoSvg, { density: 150 })
    .resize(400, 400, { fit: "fill" })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(logoFile, logoBuf);
  console.log(`wrote ${logoFile} (${logoBuf.length} bytes)`);
}
