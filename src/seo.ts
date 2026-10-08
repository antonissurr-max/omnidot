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

function coverFor(id: PageId): string {
  const page = pages.find((p) => p.id === id);
  return page ? `${SITE_ORIGIN}${page.cover}` : DEFAULT_OG;
}

function serviceDescription(locale: Locale, id: PageId): string {
  const page = copy[locale].pages[id];
  return page.seoDescription || `${page.title} — ${copy[locale].metaDescription}`;
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
    knowsAbout: [
      "Social media management",
      "Content creation",
      "Performance marketing",
      "Web development",
      "SEO",
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
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

export function getRouteSeo(locale: Locale, view: View): RouteSeo {
  const t = copy[locale];
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
      title: `${t.about} — omnidot.`,
      description: t.aboutSeoDescription.slice(0, 160),
      path,
      canonical,
      image: DEFAULT_OG,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: t.about,
        description: t.aboutSeoDescription,
        url: canonical,
        isPartOf: { "@type": "WebSite", name: "omnidot.", url: SITE_ORIGIN },
      },
    };
  }

  if (view.kind === "pricing") {
    return {
      title: `${t.pricingTitle} — omnidot.`,
      description: t.pricingSeoDescription.slice(0, 160),
      path,
      canonical,
      image: DEFAULT_OG,
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            name: t.pricingTitle,
            description: t.pricingSeoDescription,
            url: canonical,
            isPartOf: { "@type": "WebSite", name: "omnidot.", url: SITE_ORIGIN },
          },
          {
            "@type": "FAQPage",
            mainEntity: t.pricingFaq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          },
        ],
      },
    };
  }

  if (view.kind === "articles") {
    const list = articlesFor(locale);
    return {
      title: `${t.articlesTitle} — omnidot.`,
      description: t.articlesSeoDescription.slice(0, 160),
      path,
      canonical,
      image: DEFAULT_OG,
      jsonLd: {
        "@context": "https://schema.org",
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
    const headline = article.subtitle
      ? `${article.title}: ${article.subtitle}`
      : article.title;
    return {
      title: `${headline} — omnidot.`,
      description: article.excerpt.slice(0, 160),
      path,
      canonical,
      image: DEFAULT_OG,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline,
        description: article.excerpt,
        datePublished: article.date,
        author: { "@type": "Organization", name: "omnidot.", url: SITE_ORIGIN },
        publisher: {
          "@type": "Organization",
          name: "omnidot.",
          url: SITE_ORIGIN,
          logo: { "@type": "ImageObject", url: `${SITE_ORIGIN}/images/omnidot-logo.svg` },
        },
        mainEntityOfPage: canonical,
        articleSection: article.topic,
        inLanguage: locale === "el" ? "el" : "en",
      },
    };
  }

  if (view.kind === "privacy") {
    return {
      title: `${t.privacyTitle} — omnidot.`,
      description: t.privacySeoDescription.slice(0, 160),
      path,
      canonical,
      image: DEFAULT_OG,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: t.privacyTitle,
        description: t.privacySeoDescription,
        url: canonical,
        isPartOf: { "@type": "WebSite", name: "omnidot.", url: SITE_ORIGIN },
      },
    };
  }

  if (view.kind === "page") {
    const page = t.pages[view.id];
    const description = serviceDescription(locale, view.id);
    const image = coverFor(view.id);
    const story = page.proof?.story;
    const serviceLd = {
      "@type": "Service",
      name: page.title,
      description: (story ?? description).slice(0, 300),
      provider: providerLd(),
      areaServed: "GR",
      url: canonical,
      image,
    };
    const faq = page.serviceGuide?.faq;
    const jsonLd = faq?.length
      ? {
          "@context": "https://schema.org",
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
      : {
          "@context": "https://schema.org",
          ...serviceLd,
        };
    return {
      title: page.seoTitle ?? `${page.title} — omnidot.`,
      description: description.slice(0, 170),
      path,
      canonical,
      image,
      jsonLd,
    };
  }

  return {
    title: t.metaTitle,
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
  const id = "omnidot-jsonld";
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
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
