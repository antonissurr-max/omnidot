import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as esbuild from "esbuild";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const origin = "https://omnidot.gr";
const phone = "+306970862839";

/** @type {Awaited<ReturnType<typeof loadArticleModule>>} */
let articleModule;


/** @type {Awaited<ReturnType<typeof loadI18nModule>>} */
let i18nModule;

async function loadI18nModule() {
  const outfile = join(root, "scripts/.cache/i18n-prerender.mjs");
  mkdirSync(dirname(outfile), { recursive: true });
  await esbuild.build({
    entryPoints: [join(root, "scripts/i18n-prerender-entry.ts")],
    bundle: true,
    format: "esm",
    platform: "neutral",
    outfile,
    logLevel: "silent",
  });
  return import(`${pathToFileURL(outfile).href}?t=${Date.now()}`);
}

async function loadArticleModule() {
  const outfile = join(root, "scripts/.cache/articles-prerender.mjs");
  mkdirSync(dirname(outfile), { recursive: true });
  await esbuild.build({
    entryPoints: [join(root, "scripts/article-prerender-entry.ts")],
    bundle: true,
    format: "esm",
    platform: "neutral",
    outfile,
    logLevel: "silent",
  });
  return import(`${pathToFileURL(outfile).href}?t=${Date.now()}`);
}

function isArticleDetail(def) {
  return (
    def.enPath.startsWith("/articles/") && def.enPath !== "/articles/"
  );
}

function articleSlugFromDef(def) {
  return def.enPath.split("/").filter(Boolean).pop();
}

const navEn = [
  { href: "/social/", label: "Social Media Management" },
  { href: "/content/", label: "Content Creation" },
  { href: "/performance/", label: "Performance Marketing" },
  { href: "/web/", label: "Web Development" },
  { href: "/pricing/", label: "Packages & pricing" },
  { href: "/articles/", label: "Articles" },
  { href: "/about/", label: "About / Contact" },
  { href: "/privacy/", label: "Privacy" },
];

const navEl = [
  { href: "/el/social/", label: "Διαχείριση Social Media" },
  { href: "/el/content/", label: "Δημιουργία Περιεχομένου" },
  { href: "/el/performance/", label: "Performance Marketing" },
  { href: "/el/web/", label: "Ανάπτυξη Ιστοσελίδων" },
  { href: "/el/pricing/", label: "Πακέτα & τιμές" },
  { href: "/el/articles/", label: "Άρθρα" },
  { href: "/el/about/", label: "Σχετικά / Επικοινωνία" },
  { href: "/el/privacy/", label: "Απόρρητο" },
];

function withTrailingSlash(path) {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

/** Structural routes — page copy hydrated from src/i18n.ts via esbuild. */
const routeStructure = [
  {
    id: "home",
    enPath: "/",
    elPath: "/el/",
    enFile: "index.html",
    elFile: "el/index.html",
    image: `${origin}/images/work-omnidot.jpg`,
    type: "org",
  },
  {
    id: "social",
    enPath: "/social/",
    elPath: "/el/social/",
    enFile: "social/index.html",
    elFile: "el/social/index.html",
    image: `${origin}/images/social.webp`,
    type: "service",
  },
  {
    id: "content",
    enPath: "/content/",
    elPath: "/el/content/",
    enFile: "content/index.html",
    elFile: "el/content/index.html",
    image: `${origin}/images/content.webp`,
    type: "service",
  },
  {
    id: "performance",
    enPath: "/performance/",
    elPath: "/el/performance/",
    enFile: "performance/index.html",
    elFile: "el/performance/index.html",
    image: `${origin}/images/performance.webp`,
    type: "service",
  },
  {
    id: "web",
    enPath: "/web/",
    elPath: "/el/web/",
    enFile: "web/index.html",
    elFile: "el/web/index.html",
    image: `${origin}/images/web.webp`,
    type: "service",
  },
  {
    id: "about",
    enPath: "/about/",
    elPath: "/el/about/",
    enFile: "about/index.html",
    elFile: "el/about/index.html",
    image: `${origin}/images/work-omnidot.jpg`,
    type: "about",
  },
  {
    id: "pricing",
    enPath: "/pricing/",
    elPath: "/el/pricing/",
    enFile: "pricing/index.html",
    elFile: "el/pricing/index.html",
    image: `${origin}/images/work-omnidot.jpg`,
    type: "pricing",
  },
  {
    id: "articles",
    enPath: "/articles/",
    elPath: "/el/articles/",
    enFile: "articles/index.html",
    elFile: "el/articles/index.html",
    image: `${origin}/images/work-omnidot.jpg`,
    type: "articles",
  },
  {
    id: "article-website-athens",
    enPath: "/articles/dimiourgia-istoselidas-athina/",
    elPath: "/el/articles/dimiourgia-istoselidas-athina/",
    enFile: "articles/dimiourgia-istoselidas-athina/index.html",
    elFile: "el/articles/dimiourgia-istoselidas-athina/index.html",
    image: `${origin}/images/articles/dimiourgia-istoselidas-athina.jpg`,
    type: "articles",
  },
  {
    id: "privacy",
    enPath: "/privacy/",
    elPath: "/el/privacy/",
    enFile: "privacy/index.html",
    elFile: "el/privacy/index.html",
    image: `${origin}/images/work-omnidot.jpg`,
    type: "privacy",
  },
];

/** @type {typeof routeStructure} */
let routeDefs = routeStructure;

function serviceCases(page, id) {
  const clients = page.proof?.clients;
  if (!clients?.length) {
    if (page.proof?.client && page.proof?.story) {
      return [
        {
          client: page.proof.client,
          story: page.proof.story,
          value: page.proof.value,
          href: page.proof.links?.[0]?.href,
          label: page.proof.links?.[0]?.label,
        },
      ];
    }
    return [];
  }
  return clients.map((c) => ({
    client: c.client,
    story: c.story,
    value: c.value,
    href: c.links?.[0]?.href,
    label: c.links?.[0]?.label,
  }));
}

function localeShell(locale, def) {
  const t = i18nModule.copy[locale];
  const titles = i18nModule.PAGE_TITLES[locale];

  if (def.id === "home") {
    const services = ["social", "content", "performance", "web"].map((id) => {
      const page = t.pages[id];
      const href = locale === "el" ? `/el/${id}/` : `/${id}/`;
      const blurb =
        page.serviceGuide?.intro?.slice(0, 140) ||
        page.points?.[0]?.body?.slice(0, 140) ||
        "";
      return {
        name: page.title,
        href,
        body: blurb,
      };
    });
    return {
      title: titles.home,
      description: t.metaDescription,
      h1: t.homeMobileHeadline,
      body: t.aboutSub,
      story: "",
      services,
    };
  }

  if (def.id === "about") {
    return {
      title: titles.about,
      description: t.aboutSeoDescription,
      h1: t.aboutHeading,
      body: i18nModule.verseOpenText(t.aboutVerse),
      extra: t.aboutBody,
      story: "",
      services: ["social", "content", "performance", "web"].map((id) => ({
        name: t.pages[id].title,
        href: locale === "el" ? `/el/${id}/` : `/${id}/`,
      })),
    };
  }

  if (def.id === "pricing") {
    return {
      title: titles.pricing,
      description: t.pricingSeoDescription,
      h1: t.pricingTitle,
      body: t.pricingIntro,
      story: "",
      plans: t.pricingPlans,
      principlesTitle: t.pricingPrinciplesTitle,
      principles: t.pricingPrinciples,
      faqTitle: t.pricingFaqTitle,
      faq: t.pricingFaq,
    };
  }

  if (def.type === "service") {
    const page = t.pages[def.id];
    const cases = serviceCases(page, def.id);
    const story =
      def.id === "social" && cases[0]?.story ? cases[0].story : "";
    return {
      title: titles[def.id] || page.seoTitle,
      description: page.seoDescription,
      h1: page.title,
      body: page.serviceGuide?.intro || page.points?.[0]?.body || "",
      story,
      // Social uses a single story paragraph after intro; content has showcase only.
      cases:
        def.id === "content" || def.id === "social"
          ? []
          : cases,
      guide: page.serviceGuide,
      points: page.points,
      serviceName: page.title,
    };
  }

  if (def.id === "articles") {
    return {
      title: titles.articles,
      description: t.articlesSeoDescription,
      h1: t.articlesTitle,
      body: t.articlesLede,
      story: "",
    };
  }

  if (def.id === "privacy") {
    return {
      title: titles.privacy,
      description: t.privacySeoDescription,
      h1: t.privacyTitle,
      body: t.privacyDisclaimer,
      story: "",
      sections: t.privacySections,
    };
  }

  if (isArticleDetail(def)) {
    // Titles filled later from article module; keep stubs for path wiring.
    return {
      title: titles.article,
      description: "",
      h1: "",
      body: "",
      story: "",
    };
  }

  return { title: "", description: "", h1: "", body: "", story: "" };
}

function hydrateRouteDefs() {
  routeDefs = routeStructure.map((def) => {
    if (isArticleDetail(def)) {
      return {
        ...def,
        en: localeShell("en", def),
        el: localeShell("el", def),
      };
    }
    const en = localeShell("en", def);
    const el = localeShell("el", def);
    const out = { ...def, en, el };
    if (def.type === "service") {
      out.serviceName = { en: en.h1, el: el.h1 };
    }
    return out;
  });
}

function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

function stripPrior(html) {
  return html
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="alternate"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="og:url"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:title"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:description"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="robots"[^>]*>\s*/gi, "")
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, "")
    .replace(/<main\s+id="prerender">[\s\S]*?<\/main>\s*/gi, "");
}

function homeUrl(locale) {
  return locale === "el" ? `${origin}/el/` : `${origin}/`;
}

function homeLabel(locale) {
  return locale === "el" ? "Αρχική" : "Home";
}

function breadcrumbs(locale, crumbs) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel(locale),
        item: homeUrl(locale),
      },
      ...crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.name,
        item: c.url,
      })),
    ],
  };
}

function withCrumbs(locale, primary, crumbs) {
  if (!crumbs?.length) {
    return { "@context": "https://schema.org", ...primary };
  }
  const graph = primary["@graph"]
    ? [...primary["@graph"]]
    : [{ ...primary }];
  return {
    "@context": "https://schema.org",
    "@graph": [...graph, breadcrumbs(locale, crumbs)],
  };
}

function jsonLdFor(def, locale) {
  const copy = def[locale];
  const path = withTrailingSlash(locale === "el" ? def.elPath : def.enPath);
  const url = `${origin}${path}`;
  if (def.type === "org") {
    return {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "omnidot.",
      legalName: "Antonios Syrianos",
      url: origin,
      description: copy.description,
      image: def.image,
      logo: `${origin}/images/omnidot-logo.svg`,
      telephone: phone,
      email: "info@omnidot.gr",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Athens",
        addressRegion: "Attica",
        addressCountry: "GR",
      },
      areaServed: [
        { "@type": "City", name: "Athens" },
        { "@type": "Country", name: "Greece" },
      ],
      priceRange: "€€",
    };
  }
  if (def.type === "about") {
    return withCrumbs(
      locale,
      {
        "@type": "AboutPage",
        name: locale === "el" ? "Σχετικά" : "About",
        description: copy.description,
        url,
        isPartOf: { "@type": "WebSite", name: "omnidot.", url: origin },
      },
      [{ name: locale === "el" ? "Σχετικά" : "About", url }],
    );
  }
  if (def.type === "pricing") {
    const graph = [
      {
        "@type": "WebPage",
        name: locale === "el" ? "Πακέτα & τιμές" : "Packages & pricing",
        description: copy.description,
        url,
        isPartOf: { "@type": "WebSite", name: "omnidot.", url: origin },
      },
    ];
    if (copy.faq?.length) {
      graph.push({
        "@type": "FAQPage",
        mainEntity: copy.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      });
    }
    return withCrumbs(
      locale,
      { "@graph": graph },
      [{ name: locale === "el" ? "Πακέτα & τιμές" : "Packages & pricing", url }],
    );
  }
  if (isArticleDetail(def)) {
    const articlesUrl =
      locale === "el" ? `${origin}/el/articles/` : `${origin}/articles/`;
    const date = copy.date || "2026-10-07";
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          headline: copy.subtitle ? `${copy.h1}: ${copy.subtitle}` : copy.h1,
          description: copy.description,
          datePublished: date,
          dateModified: copy.dateModified || date,
          author: { "@type": "Organization", name: "omnidot", url: origin },
          publisher: {
            "@type": "Organization",
            name: "omnidot",
            url: origin,
            logo: {
              "@type": "ImageObject",
              url: `${origin}/images/omnidot-logo.svg`,
            },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          inLanguage: locale === "el" ? "el" : "en",
        },
        breadcrumbs(locale, [
          {
            name: locale === "el" ? "Άρθρα" : "Articles",
            url: articlesUrl,
          },
          { name: copy.h1, url },
        ]),
      ],
    };
  }
  if (def.type === "articles" && isArticleDetail(def) && articleModule) {
    const slug = articleSlugFromDef(def);
    const article = articleModule.articleBySlug(locale, slug);
    if (article) {
      const headline = articleModule.articleHeadline(article);
      const homePath = locale === "el" ? "/el/" : "/";
      const articlesPath = locale === "el" ? "/el/articles/" : "/articles/";
      const logoUrl = `${origin}/images/omnidot-logo.svg`;
      return {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BlogPosting",
            headline,
            description: article.excerpt,
            datePublished: article.date,
            dateModified: article.dateModified ?? article.date,
            author: {
              "@type": "Organization",
              name: "omnidot",
              url: origin,
            },
            publisher: {
              "@type": "Organization",
              name: "omnidot",
              url: origin,
              logo: { "@type": "ImageObject", url: logoUrl },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            inLanguage: locale === "el" ? "el" : "en",
            articleSection: article.topic,
            image: `${origin}${article.image}`,
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: locale === "el" ? "Αρχική" : "Home",
                item: `${origin}${homePath}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: locale === "el" ? "Άρθρα" : "Articles",
                item: `${origin}${articlesPath}`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: url,
              },
            ],
          },
        ],
      };
    }
  }
  if (def.type === "articles") {
    return withCrumbs(
      locale,
      {
        "@type": "CollectionPage",
        name: copy.h1,
        description: copy.description,
        url,
        isPartOf: { "@type": "WebSite", name: "omnidot.", url: origin },
      },
      [{ name: copy.h1, url }],
    );
  }
  if (def.type === "privacy") {
    return withCrumbs(
      locale,
      {
        "@type": "WebPage",
        name: copy.h1,
        description: copy.description,
        url,
        isPartOf: { "@type": "WebSite", name: "omnidot.", url: origin },
      },
      [{ name: copy.h1, url }],
    );
  }
  const serviceLd = {
    "@type": "Service",
    name: def.serviceName[locale],
    description: (copy.description || copy.body).slice(0, 300),
    provider: {
      "@type": "ProfessionalService",
      name: "omnidot.",
      url: origin,
      telephone: phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Athens",
        addressRegion: "Attica",
        addressCountry: "GR",
      },
    },
    areaServed: "GR",
    url,
    image: def.image,
  };
  const primary = copy.guide?.faq?.length
    ? {
        "@graph": [
          serviceLd,
          {
            "@type": "FAQPage",
            mainEntity: copy.guide.faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.aLink
                  ? `${item.a}${item.aLink.label}${item.aLink.after ?? "."}`
                  : item.a,
              },
            })),
          },
        ],
      }
    : serviceLd;
  return withCrumbs(locale, primary, [
    { name: def.serviceName[locale], url },
  ]);
}

function articleRouteDefs() {
  return routeDefs.filter(
    (def) =>
      def.enPath.startsWith("/articles/") && def.enPath !== "/articles/",
  );
}

function crawlPoints(points) {
  if (!points?.length) return "";
  const items = points
    .map(
      (item) =>
        `<li><h3>${escapeHtml(item.name)}${
          item.detail ? ` — ${escapeHtml(item.detail)}` : ""
        }</h3><p>${escapeHtml(item.body)}</p></li>`,
    )
    .join("");
  return `<section aria-label="What we do"><ol>${items}</ol></section>`;
}

function crawlGuide(guide) {
  if (!guide) return "";
  const parts = [];
  if (guide.blocksTitle && guide.blocks?.length) {
    parts.push(
      `<section><h2>${escapeHtml(guide.blocksTitle)}</h2>${guide.blocks
        .map(
          (block) =>
            `<h3>${escapeHtml(block.title)}</h3><p>${escapeHtml(block.body)}</p>`,
        )
        .join("")}</section>`,
    );
  }
  if (guide.includesTitle && guide.includes?.length) {
    parts.push(
      `<section><h2>${escapeHtml(guide.includesTitle)}</h2><ul>${guide.includes
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("")}</ul></section>`,
    );
  }
  if (guide.audienceTitle) {
    parts.push(
      `<section><h2>${escapeHtml(guide.audienceTitle)}</h2><p>${escapeHtml(
        guide.audienceBody || "",
      )}</p>`,
    );
    if (guide.platformsTitle && guide.platforms?.length) {
      parts.push(
        `<h3>${escapeHtml(guide.platformsTitle)}</h3><ul>${guide.platforms
          .map((item) => {
            if (typeof item === "string") return `<li>${escapeHtml(item)}</li>`;
            const name = (item.name || "").replace(/:\s*$/, "");
            const detail = item.detail || "";
            if (name) {
              return `<li><strong>${escapeHtml(name)}: </strong>${escapeHtml(detail)}</li>`;
            }
            return `<li>${escapeHtml(detail)}</li>`;
          })
          .join("")}</ul>`,
      );
    }
    parts.push(`</section>`);
  }
  if (guide.processTitle && guide.process?.length) {
    parts.push(
      `<section><h2>${escapeHtml(guide.processTitle)}</h2><ol>${guide.process
        .map((item) => {
          if (typeof item === "string") return `<li>${escapeHtml(item)}</li>`;
          const title = (item.title || "").replace(/:\s*$/, "");
          const body = item.body || "";
          if (title && body) {
            return `<li><strong>${escapeHtml(title)}</strong>: ${escapeHtml(body)}</li>`;
          }
          if (title) return `<li><strong>${escapeHtml(title)}</strong></li>`;
          return `<li>${escapeHtml(body)}</li>`;
        })
        .join("")}</ol></section>`,
    );
  }
  if (guide.costTitle) {
    parts.push(
      `<section><h2>${escapeHtml(guide.costTitle)}</h2><p>${escapeHtml(
        guide.costBody || "",
      )}</p>${
        guide.costLinkHref
          ? `<p><a href="${escapeAttr(guide.costLinkHref)}">${escapeHtml(
              guide.costLinkLabel || guide.costLinkHref,
            )}</a></p>`
          : ""
      }</section>`,
    );
  }
  if (guide.faqTitle && guide.faq?.length) {
    parts.push(
      `<section><h2>${escapeHtml(guide.faqTitle)}</h2><dl>${guide.faq
            .map(
              (item) =>
            `<dt>${escapeHtml(item.q)}</dt><dd>${escapeHtml(item.a)}${
              item.aLink
                ? `<a href="${escapeAttr(item.aLink.href)}">${escapeHtml(item.aLink.label)}</a>${escapeHtml(item.aLink.after ?? ".")}`
                : ""
            }</dd>`,
        )
        .join("")}</dl></section>`,
    );
  }
  if (guide.readMoreTitle && guide.readMore) {
    parts.push(
      `<section><h2>${escapeHtml(guide.readMoreTitle)}</h2><p><a href="${escapeAttr(
        guide.readMore.href,
      )}">${escapeHtml(guide.readMore.label)}</a></p></section>`,
    );
  }
  if (guide.relatedTitle && guide.related?.length) {
    parts.push(
      `<section><h2>${escapeHtml(guide.relatedTitle)}</h2><ul>${guide.related
        .map(
          (item) =>
            `<li><a href="${escapeAttr(item.href)}">${escapeHtml(
              item.label,
            )}</a> — ${escapeHtml(item.blurb)}</li>`,
        )
        .join("")}</ul></section>`,
    );
  }
  if (guide.finalTitle) {
    parts.push(
      `<section><h2>${escapeHtml(guide.finalTitle)}</h2>${
        guide.cta ? `<p>${escapeHtml(guide.cta)}</p>` : ""
      }</section>`,
    );
  }
  return parts.join("");
}

function crawlCases(cases) {
  if (!cases?.length) return "";
  const items = cases
    .map((item) => {
      const link = item.href
        ? ` <a href="${escapeAttr(item.href)}">${escapeHtml(item.label || item.href)}</a>`
        : "";
      return `<li><strong>${escapeHtml(item.client)}</strong> — ${escapeHtml(
        item.story || item.value || "",
      )}${link}</li>`;
    })
    .join("");
  return `<section aria-label="Selected work"><ul>${items}</ul></section>`;
}

function crawlGuideWithCasesAfterCost(guide, cases) {
  // Insert client cases right after the cost section.
  const full = crawlGuide(guide);
  if (!cases?.length) return full;
  const casesHtml = crawlCases(cases);
  const costNeedle = guide.costTitle
    ? `<h2>${escapeHtml(guide.costTitle)}</h2>`
    : null;
  if (!costNeedle || !full.includes(costNeedle)) {
    return `${full}${casesHtml}`;
  }
  const idx = full.indexOf(costNeedle);
  const afterCostClose = full.indexOf("</section>", idx);
  if (afterCostClose < 0) return `${full}${casesHtml}`;
  const insertAt = afterCostClose + "</section>".length;
  return `${full.slice(0, insertAt)}${casesHtml}${full.slice(insertAt)}`;
}

function crawlArticleDetail(def, locale) {
  if (!articleModule) return "";
  const slug = articleSlugFromDef(def);
  const article = articleModule.articleBySlug(locale, slug);
  if (!article) return "";
  const prefix = locale === "el" ? "/el" : "";
  const others = articleModule
    .articlesFor(locale)
    .filter((item) => item.slug !== article.slug);
  return articleModule.articleDetailPrerenderHtml({
    title: article.title,
    subtitle: article.subtitle,
    topic: article.topic,
    date: article.date,
    dateModified: article.dateModified,
    dateLabel: articleModule.formatArticleDate(locale, article.date),
    dateModifiedLabel: article.dateModified
      ? articleModule.formatArticleDate(locale, article.dateModified)
      : undefined,
    readTime:
      locale === "el"
        ? `${article.readMinutes} λεπτά`
        : `${article.readMinutes} min read`,
    takeaways: article.takeaways,
    body: article.body,
    relatedServices: article.relatedServices,
    moreArticles: others.map((item) => ({
      title: item.title,
      topic: item.topic,
      excerpt: item.excerpt,
      href: withTrailingSlash(`${prefix}/articles/${item.slug}`),
    })),
    copy: {
      publishedLabel: locale === "el" ? "Δημοσιεύτηκε" : "Published",
      updatedLabel: locale === "el" ? "Ενημερώθηκε" : "Updated",
      glanceLabel: locale === "el" ? "Με μια ματιά" : "At a glance",
      tocLabel: locale === "el" ? "Περιεχόμενα" : "Contents",
      priceCta: locale === "el" ? "Δες πακέτα & τιμές" : "See packages & pricing",
      midCtaTitle:
        locale === "el"
          ? "Θες να δούμε τι χρειάζεται η επιχείρησή σου;"
          : "Want to see what your business needs?",
      midCta: locale === "el" ? "Κλείσε ένα σύντομο call" : "Book a short call",
      midCtaHref: withTrailingSlash(`${prefix}/about`),
      endCtaTitle:
        locale === "el"
          ? "Θες να δούμε τι χρειάζεται η επιχείρησή σου;"
          : "Want to see what your business needs?",
      endCta: locale === "el" ? "Κλείσε ένα σύντομο call" : "Book a short call",
      endCtaHref: withTrailingSlash(`${prefix}/about`),
      relatedServicesLabel:
        locale === "el" ? "Σχετικές υπηρεσίες" : "Related services",
      moreArticlesLabel:
        locale === "el" ? "Περισσότερα άρθρα" : "More articles",
      backLabel: locale === "el" ? "Όλα τα άρθρα" : "All articles",
      articlesIndexHref: withTrailingSlash(`${prefix}/articles`),
      homeLabel: locale === "el" ? "Αρχική" : "Home",
      homeHref: withTrailingSlash(prefix || "/"),
      articlesLabel: locale === "el" ? "Άρθρα" : "Articles",
    },
  });
}

function crawlBody(def, locale) {
  if (isArticleDetail(def)) {
    const html = crawlArticleDetail(def, locale);
    if (html) return html;
  }

  const copy = def[locale];
  const nav = locale === "el" ? navEl : navEn;
  const homeHref = locale === "el" ? "/el/" : "/";
  const homeText = locale === "el" ? "Αρχική" : "Home";
  const links = nav
    .map((item) => `<a href="${item.href}">${escapeHtml(item.label)}</a>`)
    .join(" · ");
  const story = copy.story
    ? `<p class="prerender-story">${escapeHtml(copy.story)}</p>`
    : "";
  const parts = [
    `<main id="prerender">`,
    `<header><a href="${homeHref}">${escapeHtml(homeText)} — omnidot.</a></header>`,
    `<h1>${escapeHtml(copy.h1)}</h1>`,
    copy.subtitle ? `<p>${escapeHtml(copy.subtitle)}</p>` : "",
    `<p>${escapeHtml(copy.body)}</p>`,
  ].filter(Boolean);

  // Home: full “what we do” service blurbs.
  if (def.id === "home" && copy.services?.length) {
    parts.push(
      `<section aria-label="${locale === "el" ? "Τι κάνουμε" : "What we do"}"><h2>${
        locale === "el" ? "Τι κάνουμε" : "What we do"
      }</h2><ul>${copy.services
        .map(
          (s) =>
            `<li><a href="${escapeAttr(s.href)}"><strong>${escapeHtml(s.name)}</strong></a> — ${escapeHtml(s.body)}</li>`,
        )
        .join("")}</ul></section>`,
    );
  }

  // Pricing: plans + principles + FAQ in HTML.
  if (def.id === "pricing") {
    if (copy.plans?.length) {
      parts.push(
        `<section aria-label="Packages">${copy.plans
          .map(
            (plan) =>
              `<section><h2>${escapeHtml(plan.name)}</h2><p>${escapeHtml(plan.price)}. ${escapeHtml(plan.blurb)}</p><ul>${(plan.items || [])
                .map((item) => `<li>${escapeHtml(item)}</li>`)
                .join("")}</ul>${
                  plan.note ? `<p>${escapeHtml(plan.note)}</p>` : ""
                }</section>`,
          )
          .join("")}</section>`,
      );
    }
    if (copy.principles?.length) {
      parts.push(
        `<section><h2>${escapeHtml(copy.principlesTitle || "Our principles")}</h2><ul>${copy.principles
          .map((line) => `<li>${escapeHtml(line)}</li>`)
          .join("")}</ul></section>`,
      );
    }
    if (copy.faq?.length) {
      parts.push(
        `<section aria-label="FAQ"><h2>${escapeHtml(
          copy.faqTitle || "FAQ",
        )}</h2><dl>${copy.faq
          .map(
            (item) =>
              `<dt>${escapeHtml(item.q)}</dt><dd>${escapeHtml(item.a)}</dd>`,
          )
          .join("")}</dl></section>`,
      );
    }
  }

  // About: verse (body) already emitted; then aboutBody + service links + contact.
  if (def.id === "about") {
    if (copy.extra) {
      parts.push(`<p>${escapeHtml(copy.extra)}</p>`);
    }
    if (copy.services?.length) {
      parts.push(
        `<ul>${copy.services
          .map(
            (s) =>
              `<li><a href="${escapeAttr(s.href)}">${escapeHtml(s.name)}</a></li>`,
          )
          .join("")}</ul>`,
      );
    }
    const contact =
      locale === "el"
        ? "info@omnidot.gr · Αθήνα"
        : "info@omnidot.gr · Athens";
    parts.push(`<p>${escapeHtml(contact)}</p>`);
  }

  // Privacy: sections.
  if (def.id === "privacy" && copy.sections?.length) {
    for (const section of copy.sections) {
      parts.push(`<section><h2>${escapeHtml(section.heading)}</h2>`);
      for (const para of section.paragraphs || []) {
        parts.push(`<p>${escapeHtml(para)}</p>`);
      }
      if (section.bullets?.length) {
        parts.push(
          `<ul>${section.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`,
        );
      }
      parts.push(`</section>`);
    }
  }

  const casesAfterCost =
    (def.id === "web" || def.id === "performance") &&
    copy.guide &&
    copy.cases?.length;
  if (copy.cases?.length && !casesAfterCost) {
    parts.push(crawlCases(copy.cases));
  } else if (story && !copy.cases?.length) {
    parts.push(story);
  }

  if (copy.guide) {
    parts.push(
      casesAfterCost
        ? crawlGuideWithCasesAfterCost(copy.guide, copy.cases)
        : crawlGuide(copy.guide),
    );
  } else if (copy.points) {
    parts.push(crawlPoints(copy.points));
  }

  parts.push(`<nav aria-label="Services">${links}</nav>`);

  if (def.id === "articles") {
    const prefix = locale === "el" ? "/el" : "";
    const items = articleRouteDefs()
      .map((article) => {
        const href = withTrailingSlash(
          `${prefix}/articles/${article.enPath.split("/").filter(Boolean).pop()}`,
        );
        const title = article[locale].h1;
        return `<li><a href="${href}">${escapeHtml(title)}</a></li>`;
      })
      .join("");
    parts.push(
      `<nav aria-label="${locale === "el" ? "Άρθρα" : "Articles"}"><ul>${items}</ul></nav>`,
    );
  }

  // Article detail: include full body paragraphs from route def when present.
  if (isArticleDetail(def) && copy.articleBody?.length) {
    parts.push(
      copy.articleBody
        .map((block) => {
          if (block.type === "h2") return `<h2>${escapeHtml(block.text)}</h2>`;
          if (block.type === "h3") return `<h3>${escapeHtml(block.text)}</h3>`;
          if (block.type === "ul" || block.type === "ol") {
            const tag = block.type;
            return `<${tag}>${block.items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</${tag}>`;
          }
          return `<p>${escapeHtml(block.text || block)}</p>`;
        })
        .join(""),
    );
  }

  parts.push(`</main>`);
  return parts.join("");
}

function patchHtml(html, def, locale) {
  const copy = def[locale];
  const path = withTrailingSlash(locale === "el" ? def.elPath : def.enPath);
  const file = locale === "el" ? def.elFile : def.enFile;
  const canonical = `${origin}${path}`;
  const enUrl = `${origin}${withTrailingSlash(def.enPath)}`;
  const elUrl = `${origin}${withTrailingSlash(def.elPath)}`;
  let out = stripPrior(html);

  out = out.replace(/<html[^>]*>/, `<html lang="${locale === "el" ? "el" : "en"}">`);
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(copy.title)}</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeAttr(copy.description)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapeAttr(copy.title)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeAttr(copy.description)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image" content="${escapeAttr(def.image)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:locale" content="${locale === "el" ? "el_GR" : "en_US"}" />`,
  );
  out = out.replace(
    /<meta\s+name="twitter:card"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:card" content="summary_large_image" />`,
  );
  out = out.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:image" content="${escapeAttr(def.image)}" />`,
  );

  const headExtras = [
    `    <link rel="canonical" href="${canonical}" />`,
    `    <link rel="alternate" hreflang="en" href="${enUrl}" />`,
    `    <link rel="alternate" hreflang="el" href="${elUrl}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${enUrl}" />`,
    `    <meta property="og:url" content="${canonical}" />`,
    `    <meta name="twitter:title" content="${escapeAttr(copy.title)}" />`,
    `    <meta name="twitter:description" content="${escapeAttr(copy.description)}" />`,
    `    <script id="omnidot-jsonld" type="application/ld+json">${JSON.stringify(jsonLdFor(def, locale))}</script>`,
  ].join("\n");

  out = out.replace("</head>", `${headExtras}\n  </head>`);
  out = out.replace(
    '<div id="root"></div>',
    `${crawlBody(def, locale)}\n    <div id="root"></div>`,
  );
  return { file, html: out };
}

function patch404(html) {
  let out = stripPrior(html);
  out = out.replace(/<title>[^<]*<\/title>/, `<title>Page not found - omnidot.</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="This URL is not a page on omnidot." />`,
  );
  const extras = [
    `    <meta name="robots" content="noindex, follow" />`,
    `    <link rel="canonical" href="${origin}/" />`,
  ].join("\n");
  out = out.replace("</head>", `${extras}\n  </head>`);
  out = out.replace(
    '<div id="root"></div>',
    `<main id="prerender"><h1>Page not found</h1><p>This URL isn’t a page on omnidot.</p><nav><a href="/">Home</a> · <a href="/el/">Αρχική</a></nav></main>\n    <div id="root"></div>`,
  );
  return out;
}

function absoluteUrl(path) {
  return `${origin}${withTrailingSlash(path)}`;
}

function sitemapPriority(def) {
  if (def.id === "home") return "1.0";
  if (def.type === "service" || def.type === "pricing") return "0.9";
  if (def.type === "about" || def.id === "articles") return "0.8";
  if (def.enPath.includes("/articles/") && def.enPath !== "/articles/") return "0.7";
  if (def.type === "privacy") return "0.3";
  return "0.5";
}

function sitemapChangefreq(def) {
  if (def.id === "home") return "weekly";
  if (def.type === "privacy") return "yearly";
  return "monthly";
}

function writeSitemap() {
  const buildDate = new Date().toISOString().slice(0, 10);
  const urls = [];
  for (const def of routeDefs) {
    for (const locale of ["en", "el"]) {
      const path = withTrailingSlash(locale === "el" ? def.elPath : def.enPath);
      const loc = absoluteUrl(path);
      const enUrl = absoluteUrl(def.enPath);
      const elUrl = absoluteUrl(def.elPath);
      const copy = def[locale];
      const lastmod =
        copy.dateModified || copy.date || def.lastmod || buildDate;
      urls.push({
        loc,
        enUrl,
        elUrl,
        lastmod,
        changefreq: sitemapChangefreq(def),
        priority: sitemapPriority(def),
      });
    }
  }

  const body = urls
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${entry.enUrl}" />
    <xhtml:link rel="alternate" hreflang="el" href="${entry.elUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${entry.enUrl}" />
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;

  writeFileSync(join(dist, "sitemap.xml"), xml, "utf8");
  writeFileSync(join(root, "public/sitemap.xml"), xml, "utf8");
  console.log(`sitemap: ${urls.length} URLs`);
  for (const entry of urls) console.log(`  ${entry.loc}`);
}

function writeRedirects() {
  // Explicit non-slash → slash 301s (no wildcards that could touch assets).
  const barePaths = new Set();
  for (const def of routeDefs) {
    for (const path of [def.enPath, def.elPath]) {
      const slashed = withTrailingSlash(path);
      if (slashed === "/") continue;
      barePaths.add(slashed.replace(/\/$/, ""));
    }
  }

  const lines = [
    "# Apex host: www → non-www (301), keep path.",
    "https://www.omnidot.gr/*  https://omnidot.gr/:splat  301",
    "",
    "# Trailing-slash canonicals — non-slash → slash (301).",
    "# Listed explicitly so asset URLs (e.g. /sitemap.xml) are never rewritten.",
  ];
  for (const bare of [...barePaths].sort()) {
    lines.push(`${bare}  ${bare}/  301`);
  }
  lines.push("");
  lines.push("# SPA fallback for client-side routes");
  lines.push("/*    /index.html   200");
  lines.push("");

  const text = lines.join("\n");
  writeFileSync(join(dist, "_redirects"), text, "utf8");
  writeFileSync(join(root, "public/_redirects"), text, "utf8");
  console.log(`redirects: ${barePaths.size} trailing-slash rules`);
}

async function main() {
  i18nModule = await loadI18nModule();
  hydrateRouteDefs();
  articleModule = await loadArticleModule();
  const template = stripPrior(readFileSync(join(dist, "index.html"), "utf8"));

  for (const def of routeDefs) {
    for (const locale of ["en", "el"]) {
      const { file, html } = patchHtml(template, def, locale);
      const outPath = join(dist, file);
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, html, "utf8");
      console.log(`prerender: ${file}`);
    }
  }

  writeFileSync(join(dist, "404.html"), patch404(template), "utf8");
  console.log("prerender: 404.html");

  writeSitemap();
  writeRedirects();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
