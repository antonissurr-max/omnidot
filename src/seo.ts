import { articleBySlug, articlesFor } from "./articles";
import { copy, type Locale } from "./i18n";
import { phoneHref, site } from "./site";
import { pages } from "./site";
import { SITE_ORIGIN, pathFromView } from "./routing";
import type { PageId, View } from "./types";

export type RouteSeo = {
  title: string;
  description: string;
  path: string;
  canonical: string;
  image: string;
  robots?: string;
  jsonLd: Record<string, unknown>;
};

const DEFAULT_OG = `${SITE_ORIGIN}/images/work-omnidot.jpg`;
const ORG_PHONE = site.phone ? phoneHref(site.phone) : "";
const JSON_LD_ID = "omnidot-jsonld";

/** Keep in sync with scripts/prerender-shells.mjs titles (≤ ~60 chars). */
const PAGE_TITLES = {
  en: {
    home: "omnidot. — Marketing Agency Athens | Social, Ads & Web",
    about: "About & Contact — Marketing Agency Athens | omnidot.",
    pricing: "Marketing Agency Pricing — Packages | omnidot. Athens",
    articles: "Articles — omnidot.",
    privacy: "Website terms, privacy & cookies - omnidot.",
    social: "Social Media Management — Instagram & TikTok | omnidot.",
    content: "Content Creation — Photo, Video & Reels | omnidot.",
    performance: "Meta & Google Ads Management — omnidot. Athens",
    web: "Web Development & SEO — Athens | omnidot.",
    article:
      "Website creation in Athens: SEO and price — omnidot.",
  },
  el: {
    home: "omnidot. — Διαφημιστική στην Αθήνα | Social, Ads & Web",
    about: "Σχετικά & Επικοινωνία — Διαφημιστική στην Αθήνα | omnidot.",
    pricing: "Τιμές Διαφημιστικής — Πακέτα | omnidot. Αθήνα",
    articles: "Άρθρα — omnidot.",
    privacy: "Όροι χρήσης, πολιτική απορρήτου & cookies - omnidot.",
    social: "Διαχείριση Social Media στην Αθήνα | omnidot.",
    content: "Παραγωγή Περιεχομένου — Reels, Video & Φωτο | omnidot.",
    performance: "Google Ads & Meta Ads — Διαχείριση | omnidot. Αθήνα",
    web: "Κατασκευή Ιστοσελίδας στην Αθήνα | omnidot.",
    article: "Δημιουργία ιστοσελίδας στην Αθήνα: SEO και τιμή — omnidot.",
  },
} as const;

function coverFor(id: PageId): string {
  const page = pages.find((p) => p.id === id);
  return page ? `${SITE_ORIGIN}${page.cover}` : DEFAULT_OG;
}

function serviceDescription(locale: Locale, id: PageId): string {
  const page = copy[locale].pages[id];
  return page.seoDescription || `${page.title} — ${copy[locale].metaDescription}`;
}

function providerLd() {
  return {
    "@type": "ProfessionalService",
    name: "omnidot.",
    url: SITE_ORIGIN,
    ...(ORG_PHONE ? { telephone: ORG_PHONE } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
  };
}

function organizationLd(locale: Locale) {
  const sameAs = site.sameAs.filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "omnidot.",
    legalName: site.legal.nameEn,
    url: SITE_ORIGIN,
    description: copy[locale].metaDescription,
    image: DEFAULT_OG,
    logo: `${SITE_ORIGIN}/images/omnidot-logo.svg`,
    email: site.email,
    ...(ORG_PHONE ? { telephone: ORG_PHONE } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: [
      { "@type": "City", name: "Athens" },
      { "@type": "Country", name: "Greece" },
    ],
    priceRange: "€€",
    ...(sameAs.length ? { sameAs } : {}),
  };
}

function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function homeCrumb(locale: Locale) {
  return {
    name: copy[locale].footerHome,
    url: `${SITE_ORIGIN}${pathFromView({ kind: "index" }, locale)}`,
  };
}

function withBreadcrumbs(
  _locale: Locale,
  primary: Record<string, unknown>,
  crumbs: { name: string; url: string }[],
): Record<string, unknown> {
  const graph = Array.isArray(primary["@graph"])
    ? [...(primary["@graph"] as unknown[])]
    : [{ ...primary, "@context": undefined }];
  // Normalize items without nested @context
  const cleaned = graph.map((item) => {
    if (item && typeof item === "object" && "@context" in item) {
      const { "@context": _c, ...rest } = item as Record<string, unknown>;
      return rest;
    }
    return item;
  });
  return {
    "@context": "https://schema.org",
    "@graph": [...cleaned, breadcrumbLd(crumbs)],
  };
}

export function getRouteSeo(locale: Locale, view: View): RouteSeo {
  const t = copy[locale];
  const titles = PAGE_TITLES[locale];
  const path = pathFromView(view, locale).split("?")[0];
  const canonical = `${SITE_ORIGIN}${path}`;

  if (view.kind === "notfound") {
    return {
      title: `${t.notFoundTitle} — omnidot.`,
      description: t.notFoundBody,
      path,
      canonical,
      image: DEFAULT_OG,
      robots: "noindex, follow",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: t.notFoundTitle,
        url: canonical,
      },
    };
  }

  if (view.kind === "about") {
    return {
      title: titles.about,
      description: t.aboutSeoDescription.slice(0, 160),
      path,
      canonical,
      image: DEFAULT_OG,
      jsonLd: withBreadcrumbs(
        locale,
        {
          "@type": "AboutPage",
          name: t.about,
          description: t.aboutSeoDescription,
          url: canonical,
          isPartOf: { "@type": "WebSite", name: "omnidot.", url: SITE_ORIGIN },
        },
        [homeCrumb(locale), { name: t.about, url: canonical }],
      ),
    };
  }

  if (view.kind === "pricing") {
    return {
      title: titles.pricing,
      description: t.pricingSeoDescription.slice(0, 160),
      path,
      canonical,
      image: DEFAULT_OG,
      jsonLd: withBreadcrumbs(
        locale,
        {
          "@graph": [
            {
              "@type": "WebPage",
              name: t.pricingTitle,
              description: t.pricingSeoDescription,
              url: canonical,
              isPartOf: {
                "@type": "WebSite",
                name: "omnidot.",
                url: SITE_ORIGIN,
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: t.pricingFaq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ],
        },
        [homeCrumb(locale), { name: t.pricingTitle, url: canonical }],
      ),
    };
  }

  if (view.kind === "articles") {
    const list = articlesFor(locale);
    return {
      title: titles.articles,
      description: t.articlesSeoDescription.slice(0, 160),
      path,
      canonical,
      image: DEFAULT_OG,
      jsonLd: withBreadcrumbs(
        locale,
        {
          "@type": "CollectionPage",
          name: t.articlesTitle,
          description: t.articlesSeoDescription,
          url: canonical,
          isPartOf: { "@type": "WebSite", name: "omnidot.", url: SITE_ORIGIN },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: list.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${SITE_ORIGIN}${pathFromView({ kind: "article", slug: item.slug }, locale)}`,
              name: item.title,
            })),
          },
        },
        [homeCrumb(locale), { name: t.articlesTitle, url: canonical }],
      ),
    };
  }

  if (view.kind === "article") {
    const article = articleBySlug(locale, view.slug);
    if (!article) {
      return {
        title: `${t.notFoundTitle} — omnidot.`,
        description: t.notFoundBody,
        path,
        canonical,
        image: DEFAULT_OG,
        robots: "noindex, follow",
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: t.notFoundTitle,
          url: canonical,
        },
      };
    }
    const articlesPath = pathFromView({ kind: "articles" }, locale);
    const logoUrl = `${SITE_ORIGIN}/images/omnidot-logo.svg`;
    return {
      title: titles.article,
      description: article.excerpt.slice(0, 160),
      path,
      canonical,
      image: article.image.startsWith("http")
        ? article.image
        : `${SITE_ORIGIN}${article.image}`,
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BlogPosting",
            headline: article.subtitle
              ? `${article.title}: ${article.subtitle}`
              : article.title,
            description: article.excerpt,
            datePublished: article.date,
            dateModified: article.date,
            author: {
              "@type": "Organization",
              name: "omnidot",
              url: SITE_ORIGIN,
            },
            publisher: {
              "@type": "Organization",
              name: "omnidot",
              url: SITE_ORIGIN,
              logo: { "@type": "ImageObject", url: logoUrl },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
            inLanguage: locale === "el" ? "el" : "en",
            articleSection: article.topic,
          },
          breadcrumbLd([
            homeCrumb(locale),
            {
              name: t.articlesTitle,
              url: `${SITE_ORIGIN}${articlesPath}`,
            },
            { name: article.title, url: canonical },
          ]),
        ],
      },
    };
  }

  if (view.kind === "privacy") {
    return {
      title: titles.privacy,
      description: t.privacySeoDescription.slice(0, 160),
      path,
      canonical,
      image: DEFAULT_OG,
      jsonLd: withBreadcrumbs(
        locale,
        {
          "@type": "WebPage",
          name: t.privacyTitle,
          description: t.privacySeoDescription,
          url: canonical,
          isPartOf: { "@type": "WebSite", name: "omnidot.", url: SITE_ORIGIN },
        },
        [homeCrumb(locale), { name: t.privacyTitle, url: canonical }],
      ),
    };
  }

  if (view.kind === "page") {
    const page = t.pages[view.id];
    const description = serviceDescription(locale, view.id);
    const image = coverFor(view.id);
    const serviceLd = {
      "@type": "Service",
      name: page.title,
      description: description.slice(0, 300),
      provider: providerLd(),
      areaServed: "GR",
      url: canonical,
      image,
    };
    const faq = page.serviceGuide?.faq;
    const primary = faq?.length
      ? {
          "@graph": [
            serviceLd,
            {
              "@type": "FAQPage",
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.aLink
                    ? `${item.a}${item.aLink.label}.`
                    : item.a,
                },
              })),
            },
          ],
        }
      : serviceLd;
    return {
      title: titles[view.id],
      description: description.slice(0, 170),
      path,
      canonical,
      image,
      jsonLd: withBreadcrumbs(locale, primary, [
        homeCrumb(locale),
        { name: page.title, url: canonical },
      ]),
    };
  }

  return {
    title: titles.home,
    description: t.metaDescription,
    path,
    canonical,
    image: DEFAULT_OG,
    jsonLd: organizationLd(locale),
  };
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(data: Record<string, unknown>) {
  // One block only: reuse prerendered script or create a single identified one.
  let el = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
  if (!el) {
    const existing = document.head.querySelector(
      'script[type="application/ld+json"]',
    ) as HTMLScriptElement | null;
    if (existing) {
      el = existing;
      el.id = JSON_LD_ID;
    } else {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = JSON_LD_ID;
      document.head.appendChild(el);
    }
  }
  // Remove any extra JSON-LD scripts so only one remains.
  document.head
    .querySelectorAll('script[type="application/ld+json"]')
    .forEach((node) => {
      if (node !== el) node.remove();
    });
  el.textContent = JSON.stringify(data);
}

export function applyDocumentSeo(locale: Locale, view: View) {
  const seo = getRouteSeo(locale, view);
  document.title = seo.title;
  document.documentElement.lang = locale === "el" ? "el" : "en";

  upsertMeta("name", "description", seo.description);
  upsertMeta("property", "og:title", seo.title);
  upsertMeta("property", "og:description", seo.description);
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:site_name", "omnidot.");
  upsertMeta("property", "og:url", seo.canonical);
  upsertMeta("property", "og:image", seo.image);
  upsertMeta("property", "og:locale", locale === "el" ? "el_GR" : "en_US");
  upsertMeta("property", "og:locale:alternate", locale === "el" ? "en_US" : "el_GR");
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", seo.title);
  upsertMeta("name", "twitter:description", seo.description);
  upsertMeta("name", "twitter:image", seo.image);

  if (seo.robots) {
    upsertMeta("name", "robots", seo.robots);
  } else {
    document.head.querySelector('meta[name="robots"]')?.remove();
  }

  upsertLink("canonical", seo.canonical);

  if (view.kind !== "notfound") {
    const enPath = pathFromView(view, "en").split("?")[0];
    const elPath = pathFromView(view, "el").split("?")[0];
    const enUrl = `${SITE_ORIGIN}${enPath}`;
    const elUrl = `${SITE_ORIGIN}${elPath}`;
    upsertLink("alternate", enUrl, "en");
    upsertLink("alternate", elUrl, "el");
    upsertLink("alternate", enUrl, "x-default");
  }

  upsertJsonLd(seo.jsonLd);
}
