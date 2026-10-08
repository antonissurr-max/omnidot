/**
 * No-deps SEO shell check for dist prerender HTML.
 * Usage: node scripts/check-prerender.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const files = [
  "index.html",
  "el/index.html",
  "about/index.html",
  "el/about/index.html",
  "pricing/index.html",
  "el/pricing/index.html",
  "social/index.html",
  "content/index.html",
  "performance/index.html",
  "web/index.html",
  "el/social/index.html",
  "el/content/index.html",
  "el/performance/index.html",
  "el/web/index.html",
];

function textContent(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|div|li|h\d|dt|dd|section|tr)>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function words(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

let failed = false;

for (const rel of files) {
  const full = join(dist, rel);
  if (!existsSync(full)) {
    console.log(`\n=== ${rel} ===\nMISSING`);
    failed = true;
    continue;
  }
  const html = readFileSync(full, "utf8");
  const decode = (s) =>
    s
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  const title = decode((html.match(/<title>([^<]*)<\/title>/i) || [, ""])[1]);
  const desc = decode(
    (html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [, ""])[1],
  );
  const mainMatch = html.match(/<main\s+id="prerender"[^>]*>([\s\S]*?)<\/main>/i);
  const mainHtml = mainMatch ? mainMatch[1] : "";
  const h1s = [...mainHtml.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    textContent(m[1]),
  );
  const h2s = [...mainHtml.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) =>
    textContent(m[1]),
  );
  const mainText = textContent(mainHtml);
  const wc = words(mainText);

  const ldBlocks = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  const types = [];
  for (const block of ldBlocks) {
    try {
      const data = JSON.parse(block[1]);
      const walk = (node) => {
        if (!node || typeof node !== "object") return;
        if (Array.isArray(node)) {
          node.forEach(walk);
          return;
        }
        if (node["@type"]) {
          const t = node["@type"];
          types.push(Array.isArray(t) ? t.join(",") : t);
        }
        if (node["@graph"]) walk(node["@graph"]);
        for (const v of Object.values(node)) {
          if (v && typeof v === "object") walk(v);
        }
      };
      walk(data);

      // FAQ answers must appear in page HTML (tag-stripped)
      const pageText = textContent(html);
      const checkFaq = (node) => {
        if (!node || typeof node !== "object") return;
        if (Array.isArray(node)) {
          node.forEach(checkFaq);
          return;
        }
        if (node["@type"] === "FAQPage" && Array.isArray(node.mainEntity)) {
          for (const q of node.mainEntity) {
            const qText = q.name || "";
            const aText = q.acceptedAnswer?.text || "";
            if (qText && !pageText.includes(qText)) {
              console.log(`  FAIL FAQ Q missing in HTML: ${qText.slice(0, 80)}`);
              failed = true;
            }
            if (aText && !pageText.includes(aText)) {
              console.log(`  FAIL FAQ A missing in HTML: ${aText.slice(0, 80)}`);
              failed = true;
            }
          }
        }
        if (node["@graph"]) checkFaq(node["@graph"]);
        for (const v of Object.values(node)) {
          if (v && typeof v === "object") checkFaq(v);
        }
      };
      checkFaq(data);
    } catch (e) {
      console.log(`  FAIL JSON-LD parse: ${e.message}`);
      failed = true;
    }
  }

  if (/remote/i.test(html)) {
    console.log("  FAIL contains 'remote'");
    failed = true;
  }
  if (/\ba A\b/.test(html) || /ένα Ένα/.test(html)) {
    console.log("  FAIL duplicate swap words (a A / ένα Ένα)");
    failed = true;
  }
  if (h1s.length !== 1) {
    console.log(`  FAIL h1 count=${h1s.length}`);
    failed = true;
  }
  if (desc.length > 155) {
    console.log(`  WARN meta description length ${desc.length} > 155`);
  }

  console.log(`\n=== ${rel} ===`);
  console.log(`title (${title.length}): ${title}`);
  console.log(`description (${desc.length}): ${desc}`);
  console.log(`h1 (${h1s.length}): ${h1s.join(" | ")}`);
  console.log(`h2: ${h2s.join(" · ")}`);
  console.log(`prerender words: ${wc}`);
  console.log(`json-ld @types: ${[...new Set(types)].join(", ")}`);
}

console.log(failed ? "\ncheck-prerender: FAILED" : "\ncheck-prerender: OK");
process.exit(failed ? 1 : 0);
