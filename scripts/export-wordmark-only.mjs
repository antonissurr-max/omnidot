/**
 * Export Omnidot brand logos.
 *
 * Wordmark-only = navy name + hydrangea period (natural period spacing, baseline).
 * Mark + wordmark lockups = navy throughout (period same color as the logo mark).
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ink = "#1B263B";
const hydrangea = "#8FAFD1";
const paper = "#FAF9F6";
const font =
  'IBM Plex Sans, Segoe UI, Arial, sans-serif';

const outDirs = [
  path.join(root, "public", "images"),
  path.join(process.env.USERPROFILE || "", "Desktop", "Omnidot", "Omnidot-Brand-Logos"),
].filter(Boolean);

/** Wordmark-only: navy name + hydrangea period with natural period kerning. */
const wordmarkOnlySvg = (size, bg = null) => {
  const fs = Math.round(size * 0.111);
  const baseline = size / 2 + fs * 0.32;
  const tracking = (-0.04 * fs).toFixed(2);
  const bgRect = bg
    ? `<rect width="${size}" height="${size}" fill="${bg}"/>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" role="img" aria-label="omnidot.">
  ${bgRect}
  <text x="${size / 2}" y="${baseline}" text-anchor="middle" fill="${ink}" font-family="${font}" font-size="${fs}" font-weight="600" letter-spacing="${tracking}">omnidot<tspan fill="${hydrangea}">.</tspan></text>
</svg>`;
};

const horizontalWordmarkSvg = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 120" fill="none" role="img" aria-label="omnidot.">
  <text x="24" y="78" fill="${ink}" font-family="${font}" font-size="72" font-weight="600" letter-spacing="-2.88">omnidot<tspan fill="${hydrangea}">.</tspan></text>
</svg>`;

/** Mark + name: period stays ink — same color as the logo mark (original lockup). */
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 72" fill="none" role="img" aria-label="omnidot.">
  <g transform="translate(8, 18)">
    <circle cx="7.5" cy="18" r="5.5" fill="${ink}"/>
    <circle cx="28.5" cy="18" r="5.5" fill="${ink}"/>
    <path d="M13 18h10" stroke="${ink}" stroke-width="2.4" stroke-linecap="round"/>
  </g>
  <text x="56" y="46" fill="${ink}" font-family="${font}" font-size="36" font-weight="600" letter-spacing="-1.44">omnidot.</text>
</svg>`;

const logoLightSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 100" fill="none" role="img" aria-label="omnidot.">
  <rect width="360" height="100" fill="${paper}"/>
  <g transform="translate(28, 32)">
    <circle cx="7.5" cy="18" r="5.5" fill="${ink}"/>
    <circle cx="28.5" cy="18" r="5.5" fill="${ink}"/>
    <path d="M13 18h10" stroke="${ink}" stroke-width="2.4" stroke-linecap="round"/>
  </g>
  <text x="76" y="64" fill="${ink}" font-family="${font}" font-size="36" font-weight="600" letter-spacing="-1.44">omnidot.</text>
</svg>`;

const profileLockupSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" role="img" aria-label="omnidot.">
  <rect width="1080" height="1080" fill="#FFFFFF"/>
  <g transform="translate(200, 468)">
    <g transform="translate(0, 6) scale(2.2)">
      <circle cx="7.5" cy="12" r="2.35" fill="${ink}"/>
      <circle cx="16.5" cy="12" r="2.35" fill="${ink}"/>
      <path d="M9.85 12h4.3" stroke="${ink}" stroke-width="1.2" stroke-linecap="round"/>
    </g>
    <text x="72" y="42" fill="${ink}" font-family="${font}" font-size="72" font-weight="600" letter-spacing="-2.88">omnidot.</text>
  </g>
</svg>`;

const coverSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="4200" height="700" viewBox="0 0 4200 700" fill="none">
  <rect width="4200" height="700" fill="#FFFFFF"/>
  <text x="2100" y="368" text-anchor="middle" fill="${ink}" font-family="${font}" font-size="96" font-weight="600" letter-spacing="-3.84">omnidot<tspan fill="${hydrangea}">.</tspan></text>
</svg>`;

const fbCoverSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1640" height="924" viewBox="0 0 1640 924" fill="none">
  <rect width="1640" height="924" fill="#FFFFFF"/>
  <text x="820" y="478" text-anchor="middle" fill="${ink}" font-family="${font}" font-size="88" font-weight="600" letter-spacing="-3.52">omnidot<tspan fill="${hydrangea}">.</tspan></text>
</svg>`;

const smallSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="98" height="98" viewBox="0 0 98 98" fill="none">
  <rect width="98" height="98" fill="${paper}"/>
  <text x="49" y="54" text-anchor="middle" fill="${ink}" font-family="${font}" font-size="18" font-weight="600" letter-spacing="-0.72">omnidot<tspan fill="${hydrangea}">.</tspan></text>
</svg>`;

for (const dir of outDirs) {
  await mkdir(dir, { recursive: true });
}

const profileSvg = wordmarkOnlySvg(1080, "#FFFFFF");

await writeFile(path.join(root, "public", "images", "omnidot-wordmark-only.svg"), horizontalWordmarkSvg());
await writeFile(path.join(root, "public", "images", "omnidot-profile-wordmark-1080.svg"), profileSvg);
await writeFile(path.join(root, "public", "images", "omnidot-logo.svg"), logoSvg);
await writeFile(path.join(root, "public", "images", "omnidot-logo-light.svg"), logoLightSvg);
await writeFile(path.join(root, "public", "images", "omnidot-profile-1080.svg"), profileLockupSvg);
await writeFile(path.join(root, "public", "images", "omnidot-logo-98.svg"), smallSvg);

const exports = [
  { name: "omnidot-wordmark-only-1080.png", svg: wordmarkOnlySvg(1080, "#FFFFFF"), w: 1080, h: 1080 },
  { name: "omnidot-wordmark-only-2048.png", svg: wordmarkOnlySvg(2048, "#FFFFFF"), w: 2048, h: 2048 },
  { name: "omnidot-wordmark-only-1080-transparent.png", svg: wordmarkOnlySvg(1080, null), w: 1080, h: 1080 },
  { name: "omnidot-profile-wordmark-1080.png", svg: wordmarkOnlySvg(1080, "#FFFFFF"), w: 1080, h: 1080 },
  { name: "omnidot-profile-wordmark-2048.png", svg: wordmarkOnlySvg(2048, "#FFFFFF"), w: 2048, h: 2048 },
  { name: "omnidot-profile-1080.png", svg: profileLockupSvg, w: 1080, h: 1080 },
  { name: "omnidot-profile-2048.png", svg: profileLockupSvg, w: 2048, h: 2048 },
  { name: "omnidot-linkedin-logo-400.png", svg: profileLockupSvg, w: 400, h: 400 },
  { name: "omnidot-linkedin-cover-4200.png", svg: coverSvg, w: 4200, h: 700 },
  { name: "omnidot-fb-cover-1640.png", svg: fbCoverSvg, w: 1640, h: 924 },
  { name: "omnidot-logo-98.png", svg: smallSvg, w: 98, h: 98 },
];

for (const dir of outDirs) {
  for (const item of exports) {
    const file = path.join(dir, item.name);
    const input = Buffer.from(item.svg);
    const buf = await sharp(input, { density: item.w >= 2000 ? 300 : 150 })
      .resize(item.w, item.h, { fit: "fill" })
      .png({ compressionLevel: 9 })
      .toBuffer();
    await writeFile(file, buf);
    console.log(`wrote ${file} (${buf.length} bytes)`);
  }
  await writeFile(path.join(dir, "omnidot-wordmark-only.svg"), horizontalWordmarkSvg());
  await writeFile(path.join(dir, "omnidot-logo.svg"), logoSvg);
  await writeFile(path.join(dir, "omnidot-logo-light.svg"), logoLightSvg);
  await writeFile(path.join(dir, "omnidot-profile-1080.svg"), profileLockupSvg);
  await writeFile(path.join(dir, "omnidot-profile-wordmark-1080.svg"), profileSvg);
  await writeFile(path.join(dir, "omnidot-logo-98.svg"), smallSvg);
}

console.log("done");
