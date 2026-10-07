import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const origin = "https://omnidot.gr";
const phone = "+306970862839";

const navEn = [
  { href: "/social", label: "Social Media Management" },
  { href: "/content", label: "Content Creation" },
  { href: "/performance", label: "Performance Marketing" },
  { href: "/web", label: "Web Development" },
  { href: "/pricing", label: "Packages & pricing" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About / Contact" },
  { href: "/privacy", label: "Privacy" },
];

const navEl = [
  { href: "/el/social", label: "Διαχείριση Social Media" },
  { href: "/el/content", label: "Δημιουργία Περιεχομένου" },
  { href: "/el/performance", label: "Performance Marketing" },
  { href: "/el/web", label: "Ανάπτυξη Ιστοσελίδων" },
  { href: "/el/pricing", label: "Πακέτα & τιμές" },
  { href: "/el/articles", label: "Άρθρα" },
  { href: "/el/about", label: "Σχετικά / Επικοινωνία" },
  { href: "/el/privacy", label: "Απόρρητο" },
];

/** Keep in sync with src/i18n.ts — build-time crawlable shells. */
const routeDefs = [
  {
    id: "home",
    enPath: "/",
    elPath: "/el",
    enFile: "index.html",
    elFile: "el/index.html",
    image: `${origin}/images/work-omnidot.jpg`,
    en: {
      title: "omnidot. — Marketing Agency Athens | Social, Ads & Web",
      description:
        "Athens marketing agency for social media management, content creation, Meta & Google Ads, and SEO websites. Clear packages, remote-friendly, measurable growth.",
      h1: "omnidot.",
      body: "Athens marketing agency for web, SEO, social media and performance ads — one partner for brands that want to grow. Founders and local brands, Athens and remote.",
      story: "",
    },
    el: {
      title: "omnidot. — Διαφημιστική στην Αθήνα | Social, Ads & Web",
      description:
        "Διαφημιστική στην Αθήνα για διαχείριση social media, παραγωγή περιεχομένου, Meta & Google Ads και ιστοσελίδες με SEO. Καθαρά πακέτα, remote, μετρήσιμη ανάπτυξη.",
      h1: "omnidot.",
      body: "Διαφημιστική στην Αθήνα για web, SEO, social media και performance ads — ένας συνεργάτης για brands που θέλουν να αναπτυχθούν. Αθήνα και remote.",
      story: "",
    },
    type: "org",
  },
  {
    id: "social",
    enPath: "/social",
    elPath: "/el/social",
    enFile: "social/index.html",
    elFile: "el/social/index.html",
    image: `${origin}/images/social.jpg`,
    en: {
      title: "Social Media Management — Instagram & TikTok | omnidot.",
      description:
        "Social media management for Instagram, TikTok, Facebook & LinkedIn: strategy, Reels, community and growth. Athens & remote. From €450/mo.",
      h1: "Social Media Management",
      body: "Instagram, TikTok, Facebook and LinkedIn management — strategy, publishing, growth and monthly reporting from omnidot. Athens & remote.",
      story:
        "Europatch sells cold asphalt to B2B buyers — a category that rarely goes viral. We built a steady organic presence around real product use and how-to content. In one year: 4.5M Facebook and 2.5M Instagram views, 100% organic.",
    },
    el: {
      title: "Διαχείριση Social Media & Instagram — omnidot. Αθήνα",
      description:
        "Διαχείριση Instagram, TikTok, Facebook & LinkedIn: στρατηγική, Reels, community και growth. Διαφημιστική στην Αθήνα & remote. Από €450/μήνα.",
      h1: "Διαχείριση Social Media",
      body: "Διαχείριση Instagram, TikTok, Facebook και LinkedIn — στρατηγική, δημοσίευση, ανάπτυξη και μηνιαίο reporting από το omnidot. Αθήνα & remote.",
      story:
        "Η Europatch πουλάει ψυχρή άσφαλτο σε B2B πελάτες — κατηγορία που σπάνια γίνεται viral online. Χτίσαμε σταθερή οργανική παρουσία γύρω από πραγματική χρήση προϊόντος και how-to περιεχόμενο. Σε έναν χρόνο: 4.5 εκ. views στο Facebook και 2.5 εκ. στο Instagram, 100% organic.",
    },
    type: "service",
    serviceName: { en: "Social Media Management", el: "Διαχείριση Social Media" },
  },
  {
    id: "content",
    enPath: "/content",
    elPath: "/el/content",
    enFile: "content/index.html",
    elFile: "el/content/index.html",
    image: `${origin}/images/content.jpg`,
    en: {
      title: "Content Creation — Photo, Video & Reels | omnidot.",
      description:
        "Content creation for Instagram Reels, ads and web: photo, video and edit from concept to ready-to-post. Shoot day €200. Packs from €350. Athens.",
      h1: "Content Creation",
      body: "Photo, video and Reels content creation — concept, capture, edit and assets ready to post for social, ads and web.",
      story:
        "Same Europatch partnership from the content side: how-to reels on the road, product in use, cuts built for feed and Reels. That library powered the organic reach — including one reel to 397.9K.",
    },
    el: {
      title: "Παραγωγή Περιεχομένου — Reels, Video & Φωτο | omnidot.",
      description:
        "Παραγωγή περιεχομένου για Instagram Reels, ads και web: φωτογραφία, video και μοντάζ από concept έως ανάρτηση. Γύρισμα €200. Πακέτα από €350. Αθήνα.",
      h1: "Δημιουργία Περιεχομένου",
      body: "Παραγωγή περιεχομένου — φωτογραφία, video και Reels από concept έως assets έτοιμα για ανάρτηση σε social, ads και web.",
      story:
        "Η ίδια συνεργασία Europatch από την πλευρά του content: how-to reels στον δρόμο, προϊόν σε χρήση, cuts για feed και Reels. Αυτή η βιβλιοθήκη στήριξε την οργανική εμβέλεια — με ένα reel στα 397.9K.",
    },
    type: "service",
    serviceName: { en: "Content Creation", el: "Δημιουργία Περιεχομένου" },
  },
  {
    id: "performance",
    enPath: "/performance",
    elPath: "/el/performance",
    enFile: "performance/index.html",
    elFile: "el/performance/index.html",
    image: `${origin}/images/performance.jpg`,
    en: {
      title: "Meta & Google Ads Management — omnidot. Athens",
      description:
        "Performance marketing with Meta Ads and Google Ads. Setup €200 once, management from €300/mo. Your ad spend stays yours. Conversion-focused for Greek brands.",
      h1: "Performance Marketing",
      body: "Meta Ads and Google Ads management with clear cost, return and next moves. Setup once, then monthly optimization.",
      story:
        "Pyrgiotis OE needed paid acquisition a founder could read without a deck. We ran Meta and Google with tight creative tests and a clean landing path. In 30 days on Meta: 1,791 landing-page views at €0.08 each on €148 spend — plus Google search at 3.23% CTR.",
    },
    el: {
      title: "Google Ads & Meta Ads — Διαχείριση | omnidot. Αθήνα",
      description:
        "Διαχείριση Google Ads και Meta Ads. Setup €200 μία φορά, management από €300/μήνα. Το ad spend μένει δικό σας. Διαφημίσεις με στόχο conversions.",
      h1: "Performance Marketing",
      body: "Διαχείριση Meta Ads και Google Ads με καθαρό κόστος, απόδοση και επόμενα βήματα. Setup μία φορά, μετά μηνιαία βελτιστοποίηση.",
      story:
        "Ο Πυργιώτης ΟΕ ήθελε paid acquisition που να διαβάζει ένας founder χωρίς 40σέλιδο deck. Τρέξαμε Meta και Google με σφιχτά creative tests και καθαρό landing path. Σε 30 ημέρες στο Meta: 1.791 landing-page views στα €0,08 το καθένα με €148 spend — και Google search με 3,23% CTR.",
    },
    type: "service",
    serviceName: { en: "Performance Marketing", el: "Performance Marketing" },
  },
  {
    id: "web",
    enPath: "/web",
    elPath: "/el/web",
    enFile: "web/index.html",
    elFile: "el/web/index.html",
    image: `${origin}/images/web.jpg`,
    en: {
      title: "Web Development & SEO — Athens | omnidot.",
      description:
        "Website development and SEO: fast sites, landing pages and Google-ready structure. Landing from €700, multi-page ≈ €700/page. Athens & remote.",
      h1: "Web Development",
      body: "Website development and SEO — fast, editorial sites and landing pages built to rank, load quickly and convert.",
      story: "",
    },
    el: {
      title: "Κατασκευή Ιστοσελίδας & SEO — Αθήνα | omnidot.",
      description:
        "Κατασκευή ιστοσελίδας και SEO: γρήγορα sites, landing pages και δομή για Google. Landing από €700, multi-page ≈ €700/σελίδα. Αθήνα & remote.",
      h1: "Ανάπτυξη Ιστοσελίδων",
      body: "Κατασκευή ιστοσελίδας και SEO — γρήγορα sites και landing pages φτιαγμένα να rankάρουν, να φορτώνουν γρήγορα και να μετατρέπουν.",
      story: "",
    },
    type: "service",
    serviceName: { en: "Web Development", el: "Ανάπτυξη Ιστοσελίδων" },
  },
  {
    id: "about",
    enPath: "/about",
    elPath: "/el/about",
    enFile: "about/index.html",
    elFile: "el/about/index.html",
    image: `${origin}/images/work-omnidot.jpg`,
    en: {
      title: "About & Contact — Marketing Agency Athens | omnidot.",
      description:
        "About omnidot. — Athens marketing agency for founders and local brands. Contact us for social media, content, Meta & Google Ads, and SEO websites.",
      h1: "About omnidot.",
      body: "Athens marketing agency for founders and local brands. From SEO websites to social media and Meta & Google Ads. Start a brief with omnidot.",
      story: "",
    },
    el: {
      title: "Σχετικά & Επικοινωνία — Διαφημιστική στην Αθήνα | omnidot.",
      description:
        "Σχετικά με την omnidot. — διαφημιστική στην Αθήνα για founders και τοπικά brands. Επικοινωνία για social media, content, Meta & Google Ads και ιστοσελίδες με SEO.",
      h1: "Σχετικά με το omnidot.",
      body: "Διαφημιστική στην Αθήνα για founders και τοπικά brands. Από ιστοσελίδες με SEO μέχρι social media και Meta & Google Ads. Ξεκίνα ένα brief με το omnidot.",
      story: "",
    },
    type: "about",
  },
  {
    id: "pricing",
    enPath: "/pricing",
    elPath: "/el/pricing",
    enFile: "pricing/index.html",
    elFile: "el/pricing/index.html",
    image: `${origin}/images/work-omnidot.jpg`,
    en: {
      title: "Marketing Agency Pricing — Packages | omnidot. Athens",
      description:
        "Marketing agency pricing in Athens: social media from €450/mo, content packs from €350, Meta & Google Ads from €300/mo, SEO websites from €700. Ad spend separate.",
      h1: "Packages & pricing",
      body: "Clear marketing agency packages for social, content, ads and web. Ad spend is always separate. Social from €450/mo, content from €350, performance from €300/mo, web from €700.",
      story: "",
    },
    el: {
      title: "Τιμές Διαφημιστικής — Πακέτα | omnidot. Αθήνα",
      description:
        "Τιμές διαφημιστικής στην Αθήνα: social media από €450/μήνα, content από €350, Meta & Google Ads από €300/μήνα, ιστοσελίδες SEO από €700. Ad spend ξεχωριστά.",
      h1: "Πακέτα & τιμές",
      body: "Καθαρά πακέτα διαφημιστικής για social, content, ads και web. Το ad spend είναι πάντα ξεχωριστά. Social από €450/μήνα, content από €350, performance από €300/μήνα, web από €700.",
      story: "",
    },
    type: "pricing",
  },
  {
    id: "articles",
    enPath: "/articles",
    elPath: "/el/articles",
    enFile: "articles/index.html",
    elFile: "el/articles/index.html",
    image: `${origin}/images/work-omnidot.jpg`,
    en: {
      title: "Articles — omnidot.",
      description:
        "Articles from omnidot. on Meta & Google Ads, social media, SEO websites and marketing for Athens brands.",
      h1: "Articles",
      body: "Short reads on social, ads, SEO and websites — practical notes from how we work with founders and local brands.",
      story: "",
    },
    el: {
      title: "Άρθρα — omnidot.",
      description:
        "Άρθρα από την omnidot. για Meta & Google Ads, social media, ιστοσελίδες με SEO και marketing για brands στην Αθήνα.",
      h1: "Άρθρα",
      body: "Σύντομα κείμενα για social, ads, SEO και ιστοσελίδες — πρακτικές σημειώσεις από τη δουλειά μας με founders και τοπικά brands.",
      story: "",
    },
    type: "articles",
  },
  {
    id: "privacy",
    enPath: "/privacy",
    elPath: "/el/privacy",
    enFile: "privacy/index.html",
    elFile: "el/privacy/index.html",
    image: `${origin}/images/work-omnidot.jpg`,
    en: {
      title: "Website terms, privacy & cookies - omnidot.",
      description:
        "Terms of use, privacy policy and cookies for omnidot. — how we process contact data under GDPR.",
      h1: "Website terms, privacy & cookies",
      body: "How omnidot. processes contact form data under GDPR. Data controller: Antonios Syrianos, sole proprietorship. Contact: info@omnidot.gr.",
      story: "",
    },
    el: {
      title: "Όροι χρήσης, πολιτική απορρήτου & cookies - omnidot.",
      description:
        "Όροι χρήσης, πολιτική απορρήτου και cookies του omnidot. — πώς επεξεργαζόμαστε δεδομένα επικοινωνίας βάσει GDPR.",
      h1: "Όροι χρήσης, πολιτική απορρήτου & cookies",
      body: "Πώς το omnidot. επεξεργάζεται δεδομένα φόρμας επικοινωνίας βάσει GDPR. Υπεύθυνος: Συριανός Αντώνιος, ατομική επιχείρηση. Επικοινωνία: info@omnidot.gr.",
      story: "",
    },
    type: "privacy",
  },
];

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

function jsonLdFor(def, locale) {
  const copy = def[locale];
  const path = locale === "el" ? def.elPath : def.enPath;
  const url = `${origin}${path === "/" ? "/" : path}`;
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
    return {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: locale === "el" ? "Σχετικά" : "About",
      url,
      isPartOf: { "@type": "WebSite", name: "omnidot.", url: origin },
    };
  }
  if (def.type === "pricing") {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: locale === "el" ? "Πακέτα & τιμές" : "Packages & pricing",
      description: copy.description,
      url,
      isPartOf: { "@type": "WebSite", name: "omnidot.", url: origin },
    };
  }
  if (def.type === "articles") {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: copy.h1,
      description: copy.description,
      url,
      isPartOf: { "@type": "WebSite", name: "omnidot.", url: origin },
    };
  }
  if (def.type === "privacy") {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: copy.h1,
      description: copy.description,
      url,
      isPartOf: { "@type": "WebSite", name: "omnidot.", url: origin },
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: def.serviceName[locale],
    description: (copy.story || copy.body).slice(0, 300),
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
}

function crawlBody(def, locale) {
  const copy = def[locale];
  const nav = locale === "el" ? navEl : navEn;
  const links = nav
    .map((item) => `<a href="${item.href}">${escapeHtml(item.label)}</a>`)
    .join(" · ");
  const story = copy.story
    ? `<p class="prerender-story">${escapeHtml(copy.story)}</p>`
    : "";
  return [
    `<main id="prerender">`,
    `<h1>${escapeHtml(copy.h1)}</h1>`,
    `<p>${escapeHtml(copy.body)}</p>`,
    story,
    `<nav aria-label="Services">${links}</nav>`,
    `</main>`,
  ].join("");
}

function patchHtml(html, def, locale) {
  const copy = def[locale];
  const path = locale === "el" ? def.elPath : def.enPath;
  const file = locale === "el" ? def.elFile : def.enFile;
  const canonical = `${origin}${path === "/" ? "/" : path}`;
  const enUrl = `${origin}${def.enPath === "/" ? "/" : def.enPath}`;
  const elUrl = `${origin}${def.elPath}`;
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
    `    <script type="application/ld+json">${JSON.stringify(jsonLdFor(def, locale))}</script>`,
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
    `<main id="prerender"><h1>Page not found</h1><p>This URL isn’t a page on omnidot.</p><nav><a href="/">Home</a> · <a href="/el">Αρχική</a></nav></main>\n    <div id="root"></div>`,
  );
  return out;
}

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
