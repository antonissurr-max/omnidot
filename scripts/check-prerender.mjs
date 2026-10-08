/**
 * No-deps SEO shell check for dist prerender HTML.
 * Usage: node scripts/check-prerender.mjs
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const baseFiles = [
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
  "articles/index.html",
  "el/articles/index.html",
  "404.html",
];

function listArticlePages(localePrefix) {
  const dir = join(dist, localePrefix, "articles");
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) =>
      localePrefix
        ? `${localePrefix}/articles/${d.name}/index.html`
        : `articles/${d.name}/index.html`,
    );
}

const files = [
  ...baseFiles,
  ...listArticlePages(""),
  ...listArticlePages("el"),
];

const unpublished = [
  "articles/google-business-profile-athina",
  "articles/onoma-epixeirisis-ai-overview",
  "el/articles/google-business-profile-athina",
  "el/articles/onoma-epixeirisis-ai-overview",
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

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function metaContent(html, attr, key) {
  const re = new RegExp(
    `<meta\\s+${attr}="${key}"\\s+content="([^"]*)"`,
    "i",
  );
  return decode((html.match(re) || [, ""])[1]);
}

function charLen(s) {
  return [...s].length;
}

function isArticleDetail(rel) {
  return /(?:^|\/)articles\/[^/]+\/index\.html$/.test(rel);
}

function isArticlesList(rel) {
  return (
    rel === "articles/index.html" || rel === "el/articles/index.html"
  );
}

function imagePreloads(html) {
  return [
    ...html.matchAll(/<link\b[^>]*rel="preload"[^>]*>/gi),
  ]
    .map((m) => m[0])
    .filter((tag) => /as="image"/i.test(tag));
}

let failed = false;

for (const rel of unpublished) {
  if (existsSync(join(dist, rel)) || existsSync(join(dist, `${rel}/index.html`))) {
    console.log(`\n=== ${rel} ===\nFAIL unpublished article path exists`);
    failed = true;
  }
}

for (const rel of files) {
  const full = join(dist, rel);
  if (!existsSync(full)) {
    console.log(`\n=== ${rel} ===\nMISSING`);
    failed = true;
    continue;
  }
  const html = readFileSync(full, "utf8");
  const title = decode((html.match(/<title>([^<]*)<\/title>/i) || [, ""])[1]);
  const desc = metaContent(html, "name", "description");
  const ogDesc = metaContent(html, "property", "og:description");
  const twDesc = metaContent(html, "name", "twitter:description");
  const ogType = metaContent(html, "property", "og:type");
  const ogSite = metaContent(html, "property", "og:site_name");
  const published = metaContent(html, "property", "article:published_time");
  const mainMatch = html.match(
    /<main\s+id="prerender"[^>]*>([\s\S]*?)<\/main>/i,
  );
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
  let blogPosting = null;
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
          if (t === "BlogPosting" || (Array.isArray(t) && t.includes("BlogPosting"))) {
            blogPosting = node;
          }
        }
        if (node["@graph"]) walk(node["@graph"]);
        for (const v of Object.values(node)) {
          if (v && typeof v === "object") walk(v);
        }
      };
      walk(data);

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
  if (rel !== "404.html" && h1s.length !== 1) {
    console.log(`  FAIL h1 count=${h1s.length}`);
    failed = true;
  }

  if (!ogSite) {
    console.log("  FAIL og:site_name missing");
    failed = true;
  }

  const descLen = charLen(desc);
  if (!desc) {
    console.log("  FAIL meta description empty");
    failed = true;
  } else if (descLen > 160) {
    console.log(`  FAIL meta description length ${descLen} > 160`);
    failed = true;
  } else if (
    (rel === "pricing/index.html" ||
      rel === "el/pricing/index.html" ||
      rel === "about/index.html" ||
      rel === "el/about/index.html") &&
    descLen > 155
  ) {
    console.log(`  FAIL pricing/about meta description length ${descLen} > 155`);
    failed = true;
  } else if (descLen > 155) {
    console.log(`  WARN meta description length ${descLen} > 155`);
  }

  if (isArticleDetail(rel)) {
    if (ogDesc !== desc || twDesc !== desc) {
      console.log("  FAIL og/twitter description ≠ meta description");
      failed = true;
    }
    if (ogType !== "article") {
      console.log(`  FAIL og:type=${ogType || "(empty)"} (want article)`);
      failed = true;
    }
    if (!published) {
      console.log("  FAIL article:published_time missing");
      failed = true;
    }
    if (!blogPosting) {
      console.log("  FAIL BlogPosting missing");
      failed = true;
    } else {
      if (!blogPosting.headline) {
        console.log("  FAIL BlogPosting.headline empty");
        failed = true;
      }
      if (!blogPosting.description) {
        console.log("  FAIL BlogPosting.description empty");
        failed = true;
      }
      if (
        !blogPosting.image ||
        (typeof blogPosting.image === "string" &&
          !blogPosting.image.startsWith("https://"))
      ) {
        console.log("  FAIL BlogPosting.image not absolute https");
        failed = true;
      }
    }
  }

  if (rel === "404.html") {
    if (/<link\s+rel="canonical"/i.test(html)) {
      console.log("  FAIL 404 has canonical");
      failed = true;
    }
    const robots = metaContent(html, "name", "robots");
    if (!/noindex/i.test(robots)) {
      console.log("  FAIL 404 robots missing noindex");
      failed = true;
    }
  }

  if (isArticlesList(rel)) {
    const linkedH2 = [
      ...mainHtml.matchAll(/<a\b[^>]*>[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/gi),
    ].map((m) => textContent(m[1]));
    if (!linkedH2.length) {
      console.log("  FAIL articles list: no H2 inside links");
      failed = true;
    }
    for (const h2 of linkedH2) {
      if (!h2) {
        console.log("  FAIL articles list: empty H2 in link");
        failed = true;
      }
    }
    console.log(`  articles list linked H2s: ${linkedH2.length}`);
  }

  const preloads = imagePreloads(html);
  const highPreloads = preloads.filter((tag) =>
    /fetchpriority=["']high["']/i.test(tag),
  );
  if (
    rel === "index.html" ||
    rel === "el/index.html"
  ) {
    if (highPreloads.length !== 1) {
      console.log(
        `  FAIL home image preload count=${highPreloads.length} (want 1)`,
      );
      failed = true;
    } else if (!/social(?:-\d+)?\.webp/i.test(highPreloads[0])) {
      console.log("  FAIL home preload not pointing at social tile image");
      failed = true;
    }
  } else if (
    rel === "social/index.html" ||
    rel === "el/social/index.html" ||
    rel === "content/index.html" ||
    rel === "el/content/index.html"
  ) {
    if (highPreloads.length !== 1) {
      console.log(
        `  FAIL service image preload count=${highPreloads.length} (want 1)`,
      );
      failed = true;
    } else if (!/-540\.webp/i.test(highPreloads[0])) {
      console.log("  FAIL service preload not a -540.webp poster");
      failed = true;
    }
  } else if (preloads.length > 0) {
    console.log(`  FAIL unexpected image preload on ${rel}`);
    failed = true;
  }

  console.log(`\n=== ${rel} ===`);
  console.log(`title (${charLen(title)}): ${title}`);
  console.log(`description (${descLen}): ${desc}`);
  console.log(`og:type: ${ogType || "(none)"}`);
  console.log(`og:site_name: ${ogSite || "(none)"}`);
  if (isArticleDetail(rel)) {
    console.log(`article:published_time: ${published || "(none)"}`);
  }
  console.log(`h1 (${h1s.length}): ${h1s.join(" | ")}`);
  console.log(`h2: ${h2s.join(" · ")}`);
  console.log(`prerender words: ${wc}`);
  console.log(`json-ld @types: ${[...new Set(types)].join(", ")}`);
  console.log(`image preloads: ${preloads.length}`);
}

/** Fail if any built CSS rule targeting `.boxed-title` (not `__word`) sets a zero column gap. */
function isZeroLength(value) {
  return /^(?:0+|0*\.0+)(?:px|em|rem|%|vw|vh|vmin|vmax|ex|ch)?$/i.test(
    String(value).trim(),
  );
}

function extractCssRules(text, rules = []) {
  let i = 0;
  while (i < text.length) {
    while (i < text.length && /\s/.test(text[i])) i++;
    if (i >= text.length) break;

    if (text[i] === "@") {
      const brace = text.indexOf("{", i);
      if (brace < 0) break;
      const prelude = text.slice(i, brace).trim();
      let depth = 0;
      let j = brace;
      for (; j < text.length; j++) {
        if (text[j] === "{") depth++;
        else if (text[j] === "}") {
          depth--;
          if (depth === 0) {
            j++;
            break;
          }
        }
      }
      const body = text.slice(brace + 1, j - 1);
      if (/^@(?:media|supports|layer)\b/i.test(prelude)) {
        extractCssRules(body, rules);
      }
      i = j;
      continue;
    }

    const brace = text.indexOf("{", i);
    if (brace < 0) break;
    const selector = text.slice(i, brace).trim();
    let depth = 0;
    let j = brace;
    for (; j < text.length; j++) {
      if (text[j] === "{") depth++;
      else if (text[j] === "}") {
        depth--;
        if (depth === 0) {
          j++;
          break;
        }
      }
    }
    const decls = text.slice(brace + 1, j - 1);
    if (selector) rules.push({ selector, decls });
    i = j;
  }
  return rules;
}

function selectorTargetsBoxedTitle(selector) {
  const stripped = selector.replace(/\.boxed-title__word\b/g, "");
  return /\.boxed-title\b/.test(stripped);
}

function hasZeroColumnGap(decls) {
  const col = decls.match(/(?:^|;)\s*column-gap\s*:\s*([^;]+)/i);
  if (col && isZeroLength(col[1])) return true;

  const gap = decls.match(/(?:^|;)\s*gap\s*:\s*([^;]+)/i);
  if (!gap) return false;
  const parts = gap[1].trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return isZeroLength(parts[0]);
  return isZeroLength(parts[1]);
}

const assetsDir = join(dist, "assets");
const cssFiles = existsSync(assetsDir)
  ? readdirSync(assetsDir).filter((f) => f.endsWith(".css"))
  : [];

if (!cssFiles.length) {
  console.log("\nFAIL no built CSS in dist/assets");
  failed = true;
} else {
  for (const file of cssFiles) {
    const css = readFileSync(join(assetsDir, file), "utf8");
    const rules = extractCssRules(css);
    for (const { selector, decls } of rules) {
      if (!selectorTargetsBoxedTitle(selector)) continue;
      if (!hasZeroColumnGap(decls)) continue;
      console.log(
        `\nFAIL ${file}: .boxed-title rule has zero column gap\n  ${selector} { ${decls.trim()} }`,
      );
      failed = true;
    }
  }
  if (!failed) {
    console.log("\nboxed-title gap check: OK (no zero column gap)");
  }
}

console.log(failed ? "\ncheck-prerender: FAILED" : "\ncheck-prerender: OK");
process.exit(failed ? 1 : 0);
