import type { MediaItem } from "./site";
import type { PageId } from "./types";

export type Locale = "en" | "el";

export type VerseWord =
  | { kind: "stay"; open: string; close?: string }
  | { kind: "go"; open: string }
  | { kind: "come"; close: string };

export type VerseRow = {
  id: string;
  openRow: number;
  closeRow: number;
  openOnly?: boolean;
  words: VerseWord[];
};

export type ServicePoint = {
  name: string;
  detail: string;
  body: string;
};

export type ProofClient = {
  client: string;
  story?: string;
  value: string;
  notes?: string[];
  links?: { label: string; href: string }[];
  /** Atmospheric hero backdrop behind the mood board */
  backdrop?: string;
  /** Short “what we did” line under the story (Advision-style) */
  did?: string;
  /** When set, gallery switches to these assets while this client is open */
  media?: MediaItem[];
};

export type Copy = {
  metaTitle: string;
  metaDescription: string;
  langLabel: string;
  homeAria: string;
  about: string;
  pricing: string;
  articles: string;
  articlesTitle: string;
  articlesEyebrow: string;
  articlesLede: string;
  articlesRead: string;
  articlesBack: string;
  articlesReadTime: string;
  articlesSeoDescription: string;
  close: string;
  previous: string;
  next: string;
  explore: string;
  zoom: string;
  prevPhoto: string;
  nextPhoto: string;
  gallery: string;
  sections: string;
  rights: string;
  location: string;
  footerMenu: string;
  footerServices: string;
  footerContact: string;
  footerSocial: string;
  footerHome: string;
  footerStudio: string;
  whatWeDo: string;
  howWeRun: string;
  revealShort: string;
  revealFull: string;
  aboutSub: string;
  aboutBody: string;
  landingLede: string;
  startBrief: string;
  contactUs: string;
  trustedBy: string;
  pricingTitle: string;
  pricingTitleLead: string;
  pricingTitleSub: string;
  pricingLede: string;
  pricingNote: string;
  pricingCta: string;
  pricingSetup: string;
  pricingReelLabel: string;
  pricingReelSoon: string;
  pricingReelHint: string;
  pricingPrinciplesEyebrow: string;
  pricingPrinciplesTitle: string;
  pricingPrinciples: string[];
  pricingFaqEyebrow: string;
  pricingFaqTitle: string;
  pricingFaq: { q: string; a: string }[];
  pricingSeoDescription: string;
  aboutSeoDescription: string;
  mediaSoon: string;
  caseCompany: string;
  caseTask: string;
  caseResult: string;
  caseDid: string;
  pricingPlans: {
    id: string;
    name: string;
    price: string;
    blurb: string;
    items: string[];
    note?: string;
  }[];
  homeMobileHeadline: string;
  homeMobileAboutTitle: string;
  homeMobileAboutBody: string;
  homeMobileServicesTitle: string;
  homeMobileProofKicker: string;
  homeMobileProofStory: string;
  homeMobileClose: string;
  aboutVerse: VerseRow[];
  contactThanks: string;
  contactError: string;
  contactSending: string;
  contactInterest: string;
  contactName: string;
  contactEmail: string;
  contactCompany: string;
  contactBrief: string;
  contactOptional: string;
  contactPlaceholder: string;
  contactSend: string;
  contactCall: string;
  contactFull: string;
  notFoundTitle: string;
  notFoundBody: string;
  notFoundHome: string;
  privacyLink: string;
  privacyEyebrow: string;
  privacyTitle: string;
  privacyUpdated: string;
  privacyIntro: string;
  privacyControllerLabel: string;
  privacyVatLabel: string;
  privacyDisclaimer: string;
  privacySeoDescription: string;
  cookieTitle: string;
  cookieBody: string;
  cookieAccept: string;
  cookieReject: string;
  cookieSettings: string;
  privacySections: {
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
  }[];
  pages: Record<
    PageId,
    {
      title: string;
      seoTitle?: string;
      seoDescription: string;
      meta: { label: string; value: string }[];
      proof?: {
        label: string;
        client?: string;
        story?: string;
        value: string;
        notes?: string[];
        href?: string;
        links?: { label: string; href: string }[];
        clients?: ProofClient[];
      };
      points: ServicePoint[];
    }
  >;
  performanceFacts: { place: string; detail: string; body: string }[];
  webWork: MediaItem[];
  socialWork: MediaItem[];
  contentWork: MediaItem[];
  performanceWork: MediaItem[];
};

const aboutVerseEn: VerseRow[] = [
  {
    id: "we",
    openRow: 0,
    closeRow: 0,
    words: [
      { kind: "go", open: "We are\u00A0" },
      { kind: "stay", open: "a\u00A0", close: "A\u00A0" },
      { kind: "stay", open: "focused\u00A0partner" },
    ],
  },
  {
    id: "builds",
    openRow: 1,
    closeRow: 1,
    words: [
      { kind: "stay", open: "that builds\u00A0" },
      { kind: "go", open: "growth" },
      { kind: "come", close: "brands" },
    ],
  },
  {
    id: "with",
    openRow: 2,
    closeRow: 1,
    openOnly: true,
    words: [{ kind: "stay", open: "with clean design" }],
  },
  {
    id: "across",
    openRow: 3,
    closeRow: 1,
    openOnly: true,
    words: [{ kind: "stay", open: "across web, social" }],
  },
  {
    id: "performance",
    openRow: 4,
    closeRow: 1,
    openOnly: true,
    words: [{ kind: "stay", open: "& performance" }],
  },
  {
    id: "outcomes",
    openRow: 5,
    closeRow: 1,
    openOnly: true,
    words: [{ kind: "stay", open: "and measurable ROI" }],
  },
];

const aboutVerseEl: VerseRow[] = [
  {
    id: "we",
    openRow: 0,
    closeRow: 0,
    words: [
      { kind: "go", open: "Είμαστε\u00A0" },
      { kind: "stay", open: "ένα\u00A0", close: "Ένα\u00A0" },
      { kind: "stay", open: "στούντιο" },
    ],
  },
  {
    id: "builds",
    openRow: 1,
    closeRow: 1,
    words: [
      { kind: "stay", open: "που χτίζει\u00A0" },
      { kind: "go", open: "ανάπτυξη" },
      { kind: "come", close: "brands" },
    ],
  },
  {
    id: "with",
    openRow: 2,
    closeRow: 1,
    openOnly: true,
    words: [{ kind: "stay", open: "με καθαρό design" }],
  },
  {
    id: "across",
    openRow: 3,
    closeRow: 1,
    openOnly: true,
    words: [{ kind: "stay", open: "σε web, social" }],
  },
  {
    id: "performance",
    openRow: 4,
    closeRow: 1,
    openOnly: true,
    words: [{ kind: "stay", open: "και performance" }],
  },
  {
    id: "outcomes",
    openRow: 5,
    closeRow: 1,
    openOnly: true,
    words: [{ kind: "stay", open: "και μετρήσιμο ROI" }],
  },
];

export const copy: Record<Locale, Copy> = {
  en: {
    metaTitle: "omnidot. — Marketing Agency Athens | Social, Ads & Web",
    metaDescription:
      "Athens marketing agency for social media management, content creation, Meta & Google Ads, and SEO websites. Clear packages, remote-friendly, measurable growth.",
    langLabel: "Language",
    homeAria: "omnidot — home",
    about: "About",
    pricing: "Pricing",
    articles: "Articles",
    articlesTitle: "Articles",
    articlesEyebrow: "Notes from the studio",
    articlesLede:
      "Practical notes from the studio — on social, ads, SEO and websites for founders and local brands.",
    articlesRead: "Read",
    articlesBack: "All articles",
    articlesReadTime: "{n} min read",
    articlesSeoDescription:
      "Articles from omnidot. on Meta & Google Ads, social media, SEO websites and marketing for Athens brands.",
    close: "Close",
    previous: "Previous",
    next: "Next",
    explore: "Explore",
    zoom: "Enlarge",
    prevPhoto: "Previous photo",
    nextPhoto: "Next photo",
    gallery: "Gallery",
    sections: "Sections",
    rights: "All rights reserved.",
    location: "Athens · Remote",
    footerMenu: "Menu",
    footerServices: "Services",
    footerContact: "Contact",
    footerSocial: "Follow",
    footerHome: "Home",
    footerStudio: "Marketing agency",
    whatWeDo: "What we do",
    howWeRun: "How we run it",
    revealShort: "Reveal shorter message",
    revealFull: "Show full message",
    aboutSub:
      "Athens marketing agency for web, SEO, social media and performance ads — one partner for brands that want to grow.",
    aboutBody:
      "For founders and local brands that want a clear next step — not another report. From a fast SEO website to social media management and Meta & Google Ads campaigns. We don't believe in noise. We believe in data, clean design, and strategies that turn visitors into loyal customers.",
    landingLede: "Athens · pick a service or start a brief",
    startBrief: "Start a brief",
    contactUs: "Contact us",
    trustedBy: "Trusted by",
    pricingTitle: "Packages & pricing",
    pricingTitleLead: "Packages",
    pricingTitleSub: "& pricing",
    pricingLede:
      "Clear marketing agency packages for social, content, ads and web. Ad spend is always separate. Scope is written down before we start.",
    pricingNote:
      "Prices in EUR, excl. VAT where applicable. Minimum 3 months on retainers. Creative production can be bundled or billed per asset.",
    pricingCta: "Start a brief",
    pricingSetup: "One-time setup",
    pricingReelLabel: "Hero reel",
    pricingReelSoon: "Hero reel soon",
    pricingReelHint: "Click for websites & digital — or scroll for how we work",
    pricingPrinciplesEyebrow: "How we work",
    pricingPrinciplesTitle: "Our principles",
    pricingPrinciples: [
      "Custom by default — every brand gets its own voice, not a template.",
      "Style first — we mirror your aesthetic, tone and audience before we scale.",
      "Creativity with intent — ideas that fit your world, not generic agency filler.",
      "Personal by design — we listen, adapt and build around your real needs.",
    ],
    pricingFaqEyebrow: "FAQ",
    pricingFaqTitle: "Before you brief us",
    pricingFaq: [
      {
        q: "Is ad spend included in the monthly fee?",
        a: "No. Management fees are ours; your Meta or Google ad budget stays yours and is paid directly to the platforms.",
      },
      {
        q: "Why a 3-month minimum on retainers?",
        a: "Social and paid need a learning window. Three months lets us set the system, test creatives and show a clear trend — not a one-week spike.",
      },
      {
        q: "Who owns the photos, videos and copy?",
        a: "You do. After delivery and payment, assets are yours to use on your channels, ads and site.",
      },
      {
        q: "Do you only work in Athens?",
        a: "We're based in Athens and work remote across Greece and abroad. Shoot days are planned where your product or place needs them.",
      },
      {
        q: "How do we start?",
        a: "Send a brief (goals, links, timeline). We reply with scope, package and first steps — no long decks before we know the job.",
      },
    ],
    pricingSeoDescription:
      "Marketing agency pricing in Athens: social media from €450/mo, content packs from €350, Meta & Google Ads from €300/mo, SEO websites from €700. Clear scope — ad spend separate.",
    aboutSeoDescription:
      "About omnidot. — Athens marketing agency for founders and local brands. Contact us for social media, content, Meta & Google Ads, and SEO websites built as one system.",
    mediaSoon: "Media soon",
    caseCompany: "Company",
    caseTask: "Task",
    caseResult: "Result",
    caseDid: "What we did",
    pricingPlans: [
      {
        id: "social",
        name: "Social Media Management",
        price: "From €450 / mo",
        blurb: "Setup once (€150–350 by platforms), then a monthly package that stays consistent.",
        items: [
          "Essential €450–650 · 1 platform · 8–12 posts · 8 basic stories · light community · report",
          "Standard €750–1,100 · 2 platforms · 12–16 posts/reels · community · report",
          "Premium €1,200–1,800 · 3 platforms · 16–20 posts/reels · community · report",
        ],
      },
      {
        id: "content",
        name: "Content Creation",
        price: "From €350 / pack",
        blurb: "Asset packs for feed, ads and web — concept through edit.",
        items: [
          "1 platform · 8–12 assets (posts/carousels) · €350–550",
          "2 platforms · 12–16 assets + 2–4 videos · €650–1,000",
        ],
        note: "Shoot day €200.",
      },
      {
        id: "performance",
        name: "Performance Marketing",
        price: "From €300 / mo",
        blurb: "Setup €200 once. Meta & Google management — your ad budget stays yours.",
        items: [
          "Ad spend €0–500 → management €300",
          "Ad spend €500–1,500 → management €500",
          "Ad spend €1,500+ → by agreement",
        ],
      },
      {
        id: "web",
        name: "Web Development",
        price: "From €700",
        blurb: "Sites and landings that load fast, rank cleanly, and stay yours.",
        items: [
          "Landing page €700–1,200",
          "4–6 page site ≈ €700 / page",
          "E-shop — by agreement",
        ],
      },
    ],
    homeMobileHeadline: "Agency in Athens for web, SEO, social and ads.",
    homeMobileAboutTitle: "One partner. Four crafts.",
    homeMobileAboutBody:
      "Web, SEO, social and performance — built as one system for founders who want the next move, not another deck.",
    homeMobileServicesTitle: "What we ship",
    homeMobileProofKicker: "Selected work",
    homeMobileProofStory:
      "Europatch — cold asphalt for B2B. Steady organic content turned a quiet category into 4.5M Facebook and 2.5M Instagram views in a year, with zero ads.",
    homeMobileClose: "Ready when you are.",
    aboutVerse: aboutVerseEn,
    contactThanks: "Thanks — we'll get back with next steps.",
    contactError: "Something went wrong — please try again or email us directly.",
    contactSending: "Sending…",
    contactInterest: "I'm interested in:",
    contactName: "Name",
    contactEmail: "Email",
    contactCompany: "Company",
    contactBrief: "Brief",
    contactOptional: "optional",
    contactPlaceholder: "Goals, timeline, links…",
    contactSend: "Send brief",
    contactCall: "Or call",
    contactFull: "Full partnership",
    notFoundTitle: "Page not found",
    notFoundBody: "This URL isn’t a page on omnidot. Head home or pick a service.",
    notFoundHome: "Back home",
    privacyLink: "Privacy",
    privacyEyebrow: "Legal",
    privacyTitle: "Website terms, privacy & cookies",
    privacyUpdated: "Last updated: September 2026",
    privacyIntro:
      "These terms cover the use of https://omnidot.gr, operated by {name} as a {form} under the brand omnidot. By browsing the site you accept these terms. If you disagree, please leave the site.",
    privacyControllerLabel: "Data controller",
    privacyVatLabel: "VAT / AFM",
    privacyDisclaimer:
      "This page is informational and reflects how we currently run the omnidot website and contact form. It is not legal advice. We may update it when our tools or processes change.",
    privacySeoDescription:
      "Terms of use, privacy policy and cookies for omnidot. — how we process contact data under GDPR.",
    cookieTitle: "Cookies & analytics",
    cookieBody:
      "We use essential cookies to run the site. With your OK we’ll also use analytics/marketing tags to measure visits and campaigns. You can change this anytime.",
    cookieAccept: "Accept",
    cookieReject: "Essential only",
    cookieSettings: "Cookies",
    privacySections: [
      {
        heading: "Use of the website",
        paragraphs: [
          "Visitors must use the site lawfully and in line with Greek, EU and international law. You may not copy, store, reproduce, transmit or modify any substantial part of the site without prior written permission.",
          "Information on the site is indicative and for general marketing information only. It does not create a professional engagement by itself. A project starts only after we agree scope in writing.",
          "We may update these terms at any time. Check this page periodically for changes.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "Cookies are small files stored by your browser. We use them only where needed for the site to work and, if enabled, to understand aggregate traffic.",
        ],
        bullets: [
          "Strictly necessary — required for basic navigation, language preference and form security. These cannot be switched off in our systems.",
          "Performance / analytics — with your consent we load Google Analytics 4 (gtag) to measure page views and form conversions. IP anonymisation is enabled. You can withdraw consent anytime via Cookies in the footer.",
          "We do not currently use third-party advertising cookies on this site.",
        ],
      },
      {
        heading: "Personal data (GDPR)",
        paragraphs: [
          "We process personal data in line with the EU General Data Protection Regulation (GDPR) and Greek law. Typical data: name, email, company and message content when you use the brief form or email us; technical logs (IP, browser) from hosting and security providers such as Cloudflare.",
          "Purpose: reply to enquiries, prepare proposals, deliver agreed marketing services, and keep the site secure. Legal bases: steps prior to a contract / contract performance, legitimate interest in running and securing the site, and consent where required for optional analytics.",
          "We keep enquiry data only as long as needed to handle your request and any follow-up, then delete or anonymise it unless a longer retention is required by law or an active project.",
          "Processors may include hosting and email infrastructure (e.g. Cloudflare Pages, Email Routing, Formspree) and, with consent, Google Analytics — in the EU/EEA or under appropriate safeguards.",
        ],
        bullets: [
          "Right of access",
          "Right to rectification",
          "Right to erasure",
          "Right to withdraw consent (where processing is based on consent)",
          "Right to data portability",
          "Right to restrict processing",
          "Right to object to processing",
          "Right to lodge a complaint with the Hellenic Data Protection Authority (www.dpa.gr)",
        ],
      },
      {
        heading: "Contact for privacy requests",
        paragraphs: [
          "For any question about this policy or your personal data, email info@omnidot.gr. We aim to reply within one month.",
        ],
      },
    ],
    pages: {
      social: {
        title: "Social Media Management",
        seoTitle: "Social Media Management — Instagram & TikTok | omnidot.",
        seoDescription:
          "Social media management for Instagram, TikTok, Facebook & LinkedIn: strategy, Reels, community and growth. Athens & remote. From €450/mo.",
        meta: [
          { label: "Goal", value: "Steady presence" },
          { label: "Channels", value: "IG · TikTok · LinkedIn" },
          { label: "You get", value: "Plan + posts" },
          { label: "Work with us", value: "Monthly" },
        ],
        proof: {
          label: "Selected",
          value: "",
          clients: [
            {
              client: "Europatch",
              backdrop: "/images/europatch-backdrop.jpg",
              did: "Social media, Reels, organic content",
              story:
                "Europatch sells cold asphalt to B2B buyers — a category that rarely goes viral. We built a steady organic presence around real product use and how-to content. In one year: 4.5M Facebook and 2.5M Instagram views, 100% organic.",
              value: "4.5M Facebook · 2.5M Instagram · 100% organic · 1 year",
              notes: [
                "1.2M unique viewers · 0 from ads",
                "Reel 397.9K · Facebook post 120.8K",
                "Last month: 96% of views from non-followers",
              ],
              media: [
                {
                  src: "/videos/europatch/timeline-1.mp4",
                  kind: "video",
                  title: "Europatch reel",
                  detail: "How-to on the road",
                },
                {
                  src: "/images/europatch-reels-grid-1.png",
                  title: "Reels performance",
                  detail: "Top organic reach",
                },
                {
                  src: "/images/europatch-reels-grid-2.jpg",
                  title: "Reels library",
                  detail: "Views across the feed",
                },
                {
                  src: "/images/proof-europatch-all.png",
                  title: "Europatch — all content",
                  detail: "4.5M views · 100% organic",
                },
                {
                  src: "/images/proof-europatch-ig.png",
                  title: "Europatch — Instagram",
                  detail: "2.5M organic views",
                },
                {
                  src: "/images/proof-europatch-fb.png",
                  title: "Facebook post",
                  detail: "120.8K views",
                },
                {
                  src: "/images/proof-europatch-month.png",
                  title: "Last month",
                  detail: "96% from non-followers",
                },
              ],
            },
            {
              client: "N4Sails",
              backdrop: "/images/n4sails-backdrop.jpg",
              did: "Instagram management, organic Reels",
              story:
                "Nafplio for Sails — we ran the Instagram account around summer catamaran stories. Publishing rhythm, Reels placement and organic reach — not ad spend — so the feed sells the feeling of being on board.",
              value: "Organic Instagram reach · lifestyle Reels",
              notes: [
                "Steady publishing for summer escapes",
                "Grid of top-performing organic cuts",
                "Reach built without paid boost",
              ],
              media: [
                {
                  src: "/videos/n4sails/escape-summer-story.mp4",
                  kind: "video",
                  title: "Escape summer story",
                  detail: "Dive into Nafplio blue",
                },
                {
                  src: "/images/n4sails-reels-grid.png",
                  title: "Reels grid",
                  detail: "Profile performance",
                },
              ],
            },
          ],
        },
        points: [
          {
            name: "Strategy",
            detail: "Positioning, pillars, calendar",
            body: "Social media strategy for Instagram, TikTok, Facebook and LinkedIn: brand voice, content pillars, posting calendar and community rules. We plan what to say, where it lives, and how often — so your social media management is consistent, not random posts.",
          },
          {
            name: "Publishing",
            detail: "Feed, stories, community",
            body: "We create and publish feed posts, Reels, Stories and carousels, and we reply in comments and DMs. Copy, visuals and timing stay on-brand so the account feels active and trustworthy to followers and new visitors from search or ads.",
          },
          {
            name: "Growth",
            detail: "Reels, UGC, collaborations",
            body: "Growth through short-form video, Reels, user-generated content and creator collaborations. We test formats that expand reach on Instagram and TikTok and bring in people who already care about your category — organic first, ads when it makes sense.",
          },
          {
            name: "Reporting",
            detail: "Monthly clarity, not vanity",
            body: "Monthly social media reporting with reach, engagement, saves, profile visits and what to change next. Plain language for founders and marketing leads — useful metrics, clear next steps, no vanity dashboards.",
          },
        ],
      },
      content: {
        title: "Content Creation",
        seoTitle: "Content Creation — Photo, Video & Reels | omnidot.",
        seoDescription:
          "Content creation for Instagram Reels, ads and web: photo, video and edit from concept to ready-to-post. Shoot day €200. Packs from €350. Athens.",
        meta: [
          { label: "Formats", value: "Photo · Video · Still" },
          { label: "Look", value: "Clean & editorial" },
          { label: "Used for", value: "Social + ads" },
          { label: "Delivery", value: "Ready to post" },
        ],
        proof: {
          label: "Selected",
          value: "",
          clients: [
            {
              client: "Europatch",
              backdrop: "/images/europatch-backdrop.jpg",
              did: "Content creation, Reels, how-to video",
              story:
                "Same Europatch partnership from the production side: how-to reels on the road, product in use, cuts built for feed and Reels. Concept, shoot and edit — the library that later drove organic reach.",
              value: "How-to Reels · product in use · feed-ready cuts",
              notes: [
                "On-road how-to and product demos",
                "Cuts sized for Reels and feed",
                "One production line feeding every channel",
              ],
              media: [
                {
                  src: "/videos/europatch/timeline-1.mp4",
                  kind: "video",
                  title: "Europatch reel",
                  detail: "How-to on the road",
                },
                {
                  src: "/videos/europatch/18.mp4",
                  kind: "video",
                  title: "Product in use",
                  detail: "Cold asphalt on site",
                },
              ],
            },
            {
              client: "N4Sails",
              backdrop: "/images/n4sails-backdrop.jpg",
              did: "Lifestyle Reels, guest stories, edit",
              story:
                "Nafplio for Sails — lifestyle Reels for catamaran escapes: dive shots, family moments, and guest stories cut for Instagram. Full content production that sells the feeling of being on board.",
              value: "Lifestyle Reels · Nafplio · feed-ready",
              notes: [
                "Escape / little moments / guest stories",
                "Dive, deck and onboard lifestyle cuts",
                "Edited for Instagram Reels length",
              ],
              media: [
                {
                  src: "/videos/n4sails/escape-summer-story.mp4",
                  kind: "video",
                  title: "Escape summer story",
                  detail: "Dive into Nafplio blue",
                },
                {
                  src: "/videos/n4sails/little-moments-family.mp4",
                  kind: "video",
                  title: "Little moments",
                  detail: "Family on deck",
                },
                {
                  src: "/videos/n4sails/description-3-words.mp4",
                  kind: "video",
                  title: "Description in 3 words",
                  detail: "Guest story · Konstantinos",
                },
                {
                  src: "/videos/n4sails/home-away-from-home.mp4",
                  kind: "video",
                  title: "Home away from home",
                  detail: "Onboard lifestyle",
                },
              ],
            },
          ],
        },
        points: [
          {
            name: "Concept",
            detail: "Ideas, scripts, shot lists",
            body: "Content creation starts with concept: creative ideas, scripts, shot lists and brand guidelines before the camera rolls. That keeps photo and video production fast and consistent for social media, ads and the website.",
          },
          {
            name: "Capture",
            detail: "Photo, video, on-site",
            body: "On-location photography and videography — product, people, space. We shoot for Instagram, TikTok, Facebook ads, Google campaigns and your site so one production day feeds every channel.",
          },
          {
            name: "Edit",
            detail: "Cuts for feed, ads, web",
            body: "Editing and post-production for each format: Reels, Stories, feed posts, YouTube cuts, paid ads and web hero videos. Same brand world, right length and aspect ratio for every placement.",
          },
          {
            name: "Assets",
            detail: "Stills, carousels, motion",
            body: "A usable content library: stills, carousels, motion graphics, titles and thumbnails ready to post or run as ads — organized files you can actually use.",
          },
        ],
      },
      performance: {
        title: "Performance Marketing",
        seoTitle: "Meta & Google Ads Management — omnidot. Athens",
        seoDescription:
          "Performance marketing with Meta Ads and Google Ads. Setup €200 once, management from €300/mo. Your ad spend stays yours. Conversion-focused for Greek brands.",
        meta: [
          { label: "Goal", value: "Conversion growth" },
          { label: "Channels", value: "Meta · Google" },
          { label: "How", value: "Test, then scale" },
          { label: "You see", value: "Clear numbers" },
        ],
        proof: {
          label: "Selected",
          client: "Pyrgiotis OE",
          story:
            "Pyrgiotis OE wanted ads a business owner could follow without a long presentation. We ran Meta and Google, testing a few creatives and a clear path to the website. In 30 days on Meta: 1,791 page visits at €0.08 each on €148 total — and on Google search, 3.23% of people who saw the ad clicked.",
          value: "Meta €0.08 CPLV · Google 3.23% CTR · 30 days",
          notes: [
            "Meta Ads — 1,791 landing page views · €0.08 · €148 · 30 days",
            "Google Ads — 298 clicks · 9.24K impressions · 3.23% CTR",
          ],
        },
        points: [
          {
            name: "Meta & Google",
            detail: "Acquisition that compounds",
            body: "Performance marketing on Meta Ads (Facebook & Instagram) and Google Ads: campaigns for traffic, leads and sales. Account structure, audiences, keywords and budgets built so you can grow when something clearly works — paid social and search together.",
          },
          {
            name: "Creative testing",
            detail: "Iterate what converts",
            body: "Ongoing A/B tests on hooks, creatives, copy and offers. We keep ads that convert, pause the rest, and refresh weekly so CPA and ROAS improve from data — not from one big launch.",
          },
          {
            name: "Funnel setup",
            detail: "Landing → lead → sale",
            body: "Ads need a clean path after the click: landing page, form, thank-you flow and conversion tracking (pixels, GA4, Google Ads tags). We align creative, landing and CRM follow-up so interest becomes a customer.",
          },
          {
            name: "Analytics",
            detail: "ROAS, CPA, clear next steps",
            body: "Clear reporting on spend, CPA, ROAS, CTR and conversions — in language a founder can use. Each week: what to keep, kill or scale. If a metric does not change a decision, we do not parade it.",
          },
        ],
      },
      web: {
        title: "Web Development",
        seoTitle: "Web Development & SEO — Athens | omnidot.",
        seoDescription:
          "Website development and SEO: fast sites, landing pages and Google-ready structure. Landing from €700, multi-page ≈ €700/page. Athens & remote.",
        meta: [
          { label: "Build", value: "Sites & landings" },
          { label: "SEO", value: "Findable on Google" },
          { label: "Speed", value: "Loads fast" },
          { label: "Ownership", value: "Stays yours" },
        ],
        proof: {
          label: "Some of our websites",
          value: "",
          links: [
            { label: "dotxi.app", href: "https://dotxi.app/" },
            { label: "pyrgiotisoe.com", href: "https://pyrgiotisoe.com/" },
          ],
        },
        points: [
          {
            name: "Websites",
            detail: "Corporate sites & brand pages",
            body: "We design and build corporate websites and brand sites that load fast, look clean on mobile and desktop, and guide visitors to contact, quote or purchase. Clear information architecture, strong calls to action, and pages written so Google and people can both understand what you offer.",
          },
          {
            name: "SEO",
            detail: "Technical SEO + content that ranks",
            body: "Search engine optimization from the ground up: site structure, title tags, meta descriptions, headings, internal links, Core Web Vitals, schema markup and crawlable pages. We combine technical SEO with content for the keywords your customers actually search — local SEO included when you serve a place or region.",
          },
          {
            name: "Landing pages",
            detail: "Campaign & ads landing pages",
            body: "Dedicated landing pages for Google Ads, Meta ads and email campaigns — one offer, one path, fast load. Built to turn paid traffic and organic search into leads or sales, with tracking (GA4, pixels) so you see which campaign and keyword convert.",
          },
          {
            name: "Care",
            detail: "Updates, speed & ongoing SEO",
            body: "After launch we keep the site healthy: content updates, performance and speed fixes, SEO improvements, security and small UX changes as campaigns and products evolve. A website is a channel, not a one-off brochure.",
          },
        ],
      },
    },
    performanceFacts: [
      {
        place: "Creative testing",
        detail: "Weekly experiments",
        body: "New hooks and formats go live every week so we learn from the market, not from opinions.",
      },
      {
        place: "Paid social",
        detail: "Meta · TikTok",
        body: "Prospecting and retargeting on the platforms where the audience already scrolls.",
      },
      {
        place: "Search",
        detail: "Google Ads · SEO",
        body: "We catch intent on Google — paid where it converts, organic where the pages can rank.",
      },
      {
        place: "Measurement",
        detail: "GA4 · pixels · CRM",
        body: "Pixels, analytics and, when it exists, CRM — so we know what a click became.",
      },
      {
        place: "Output",
        detail: "Clear weekly decisions",
        body: "A short weekly read: keep, kill, or scale. No 40-page decks.",
      },
    ],
    webWork: [],
    socialWork: [
      {
        src: "/images/proof-europatch-all.png",
        title: "Europatch — all content",
        detail: "4.5M views · 100% organic",
      },
      {
        src: "/images/proof-europatch-ig.png",
        title: "Europatch — Instagram",
        detail: "2.5M organic views",
      },
      {
        src: "/images/proof-europatch-reel.png",
        title: "Top reel",
        detail: "397.9K views",
      },
      {
        src: "/images/proof-europatch-fb.png",
        title: "Facebook post",
        detail: "120.8K views",
      },
      {
        src: "/images/proof-europatch-month.png",
        title: "Last month",
        detail: "96% from non-followers",
      },
    ],
    contentWork: [
      {
        src: "/videos/europatch/timeline-1.mp4",
        kind: "video",
        poster: "/images/proof-europatch-reel.png",
        title: "Europatch reel",
        detail: "How-to on the road",
      },
      {
        src: "/images/europatch-reels-grid-1.png",
        title: "Reels performance",
        detail: "Top organic reach",
      },
      {
        src: "/images/europatch-reels-grid-2.jpg",
        title: "Reels library",
        detail: "Views across the feed",
      },
    ],
    performanceWork: [
      {
        src: "/images/proof-pyrgiotis-meta.png",
        title: "Pyrgiotis OE — Meta Ads",
        detail: "1,791 LPV · €0.08 · €148",
      },
      {
        src: "/images/proof-pyrgiotis-google.png",
        title: "Pyrgiotis OE — Google Ads",
        detail: "298 clicks · 3.23% CTR",
      },
    ],
  },
  el: {
    metaTitle: "omnidot. — Διαφημιστική στην Αθήνα | Social, Ads & Web",
    metaDescription:
      "Διαφημιστική στην Αθήνα για διαχείριση social media, παραγωγή περιεχομένου, Meta & Google Ads και ιστοσελίδες με SEO. Καθαρά πακέτα, remote, μετρήσιμη ανάπτυξη.",
    langLabel: "Γλώσσα",
    homeAria: "omnidot — αρχική",
    about: "Σχετικά",
    pricing: "Τιμές",
    articles: "Άρθρα",
    articlesTitle: "Άρθρα",
    articlesEyebrow: "Σημειώσεις από το στούντιο",
    articlesLede:
      "Πρακτικές σημειώσεις από το στούντιο — για social, ads, SEO και ιστοσελίδες, για founders και τοπικά brands.",
    articlesRead: "Διάβασε",
    articlesBack: "Όλα τα άρθρα",
    articlesReadTime: "{n} λεπτά",
    articlesSeoDescription:
      "Άρθρα από την omnidot. για Meta & Google Ads, social media, ιστοσελίδες με SEO και marketing για brands στην Αθήνα.",
    close: "Κλείσιμο",
    previous: "Προηγούμενο",
    next: "Επόμενο",
    explore: "Δες περισσότερα",
    zoom: "Μεγέθυνση",
    prevPhoto: "Προηγούμενη φωτογραφία",
    nextPhoto: "Επόμενη φωτογραφία",
    gallery: "Γκαλερί",
    sections: "Ενότητες",
    rights: "Με επιφύλαξη παντός δικαιώματος.",
    location: "Αθήνα · Remote",
    footerMenu: "Μενού",
    footerServices: "Υπηρεσίες",
    footerContact: "Επικοινωνία",
    footerSocial: "Ακολούθησε",
    footerHome: "Αρχική",
    footerStudio: "Διαφημιστική εταιρεία",
    whatWeDo: "Τι κάνουμε",
    howWeRun: "Πώς το τρέχουμε",
    revealShort: "Σύντομο μήνυμα",
    revealFull: "Πλήρες μήνυμα",
    aboutSub:
      "Διαφημιστική στην Αθήνα για web, SEO, social media και performance ads — ένας συνεργάτης για brands που θέλουν να αναπτυχθούν.",
    aboutBody:
      "Για founders και τοπικά brands που θέλουν καθαρό επόμενο βήμα — όχι άλλη αναφορά. Από γρήγορη ιστοσελίδα με SEO μέχρι διαχείριση social media και καμπάνιες Meta & Google Ads. Δεν πιστεύουμε στον θόρυβο. Πιστεύουμε στα δεδομένα, στο καθαρό design και στις στρατηγικές που μετατρέπουν τους επισκέπτες σε πιστούς πελάτες.",
    landingLede: "Αθήνα · διάλεξε υπηρεσία ή ξεκίνα brief",
    startBrief: "Ξεκίνα ένα brief",
    contactUs: "Επικοινωνία",
    trustedBy: "Μας εμπιστεύονται",
    pricingTitle: "Πακέτα & τιμές",
    pricingTitleLead: "Πακέτα",
    pricingTitleSub: "& τιμές",
    pricingLede:
      "Καθαρά πακέτα διαφημιστικής για social, content, ads και web. Το ad spend μένει πάντα δικό σας. Το scope γράφεται πριν ξεκινήσουμε.",
    pricingNote:
      "Τιμές σε €, χωρίς ΦΠΑ όπου εφαρμόζεται. Minimum 3 μήνες στα retainers. Το creative μπορεί να μπει στο πακέτο ή ανά asset.",
    pricingCta: "Ξεκίνα brief",
    pricingSetup: "Setup μία φορά",
    pricingReelLabel: "Hero reel",
    pricingReelSoon: "Hero reel σύντομα",
    pricingReelHint: "Κλικ για websites & digital — ή σκρολάρισε για το πώς δουλεύουμε",
    pricingPrinciplesEyebrow: "Πώς δουλεύουμε",
    pricingPrinciplesTitle: "Οι αρχές μας",
    pricingPrinciples: [
      "Custom by default — κάθε brand παίρνει τη δική του φωνή, όχι template.",
      "Style first — ακολουθούμε την αισθητική σου και τον τόνο που επιθυμείς, πριν κλιμακώσουμε.",
      "Creativity με πρόθεση — έμφαση στη δημιουργικότητα, με ιδέες που ταιριάζουν και χτίζουν το brand σου, προσφέροντάς του αξία.",
      "Personal by design — ακούμε, προσαρμοζόμαστε και χτίζουμε γύρω από τις πραγματικές σου ανάγκες.",
    ],
    pricingFaqEyebrow: "FAQ",
    pricingFaqTitle: "Πριν το brief",
    pricingFaq: [
      {
        q: "Το ad spend περιλαμβάνεται στο μηνιαίο;",
        a: "Όχι. Τα management fees είναι δικά μας· το budget Meta ή Google μένει δικό σας και πληρώνεται απευθείας στις πλατφόρμες.",
      },
      {
        q: "Γιατί minimum 3 μήνες στα retainers;",
        a: "Social και paid χρειάζονται παράθυρο μάθησης. Σε τρεις μήνες στήνουμε σύστημα, δοκιμάζουμε creatives και δείχνουμε καθαρή τάση — όχι spike μιας εβδομάδας.",
      },
      {
        q: "Ποιος κατέχει φωτογραφίες, βίντεο και κείμενα;",
        a: "Εσύ. Μετά την παράδοση και την πληρωμή, τα assets είναι δικά σου για κανάλια, ads και site.",
      },
      {
        q: "Δουλεύετε μόνο στην Αθήνα;",
        a: "Βάση Αθήνα, remote σε Ελλάδα και εξωτερικό. Τα γυρίσματα προγραμματίζονται εκεί που χρειάζεται το προϊόν ή ο χώρος σου.",
      },
      {
        q: "Πώς ξεκινάμε;",
        a: "Στείλε brief (στόχοι, links, χρονοδιάγραμμα). Απαντάμε με scope, πακέτο και πρώτα βήματα — χωρίς μακριά decks πριν ξέρουμε τη δουλειά.",
      },
    ],
    pricingSeoDescription:
      "Τιμές διαφημιστικής στην Αθήνα: social media από €450/μήνα, content από €350, Meta & Google Ads από €300/μήνα, ιστοσελίδες SEO από €700. Καθαρό scope — ad spend ξεχωριστά.",
    aboutSeoDescription:
      "Σχετικά με την omnidot. — διαφημιστική στην Αθήνα για founders και τοπικά brands. Επικοινωνία για social media, content, Meta & Google Ads και ιστοσελίδες με SEO.",
    mediaSoon: "Media σύντομα",
    caseCompany: "Εταιρεία",
    caseTask: "Υπηρεσία",
    caseResult: "Αποτέλεσμα",
    caseDid: "Τι κάναμε",
    pricingPlans: [
      {
        id: "social",
        name: "Διαχείριση Social Media",
        price: "Από €450 / μήνα",
        blurb: "Setup μία φορά (€150–350 ανάλογα τις πλατφόρμες), μετά μηνιαίο πακέτο με σταθερή παρουσία.",
        items: [
          "Essential €450–650 · 1 πλατφόρμα · 8–12 posts · 8 basic stories · ελαφρύ community · report",
          "Standard €750–1.100 · 2 πλατφόρμες · 12–16 posts/reels · community · report",
          "Premium €1.200–1.800 · 3 πλατφόρμες · 16–20 posts/reels · community · report",
        ],
      },
      {
        id: "content",
        name: "Δημιουργία Περιεχομένου",
        price: "Από €350 / πακέτο",
        blurb: "Πακέτα assets για feed, ads και web — από concept έως edit.",
        items: [
          "1 πλατφόρμα · 8–12 assets (posts/carousels) · €350–550",
          "2 πλατφόρμες · 12–16 assets + 2–4 videos · €650–1.000",
        ],
        note: "Γύρισμα €200.",
      },
      {
        id: "performance",
        name: "Performance Marketing",
        price: "Από €300 / μήνα",
        blurb: "Setup €200 μία φορά. Διαχείριση Meta & Google — το budget μένει δικό σας.",
        items: [
          "Ad spend €0–500 → management €300",
          "Ad spend €500–1.500 → management €500",
          "Ad spend €1.500+ → κατόπιν συνεννόησης",
        ],
      },
      {
        id: "web",
        name: "Ανάπτυξη Ιστοσελίδων",
        price: "Από €700",
        blurb: "Sites και landings που φορτώνουν γρήγορα, rank-άρουν καθαρά και μένουν δικά σας.",
        items: [
          "Landing page €700–1.200",
          "4–6 σελίδες ≈ €700 / σελίδα",
          "E-shop — κατόπιν συνεννόησης",
        ],
      },
    ],
    homeMobileHeadline: "Διαφημιστική στην Αθήνα για web, SEO, social και ads.",
    homeMobileAboutTitle: "Ένας συνεργάτης. Τέσσερα crafts.",
    homeMobileAboutBody:
      "Web, SEO, social και performance — σαν ένα σύστημα για founders που θέλουν την επόμενη κίνηση, όχι άλλο deck.",
    homeMobileServicesTitle: "Τι παραδίδουμε",
    homeMobileProofKicker: "Επιλεγμένη δουλειά",
    homeMobileProofStory:
      "Europatch — ψυχρή άσφαλτος για B2B. Σταθερό organic content έκανε μια ήσυχη κατηγορία να φτάσει 4.5 εκ. views στο Facebook και 2.5 εκ. στο Instagram σε έναν χρόνο, χωρίς διαφημίσεις.",
    homeMobileClose: "Όποτε είσαι έτοιμος.",
    aboutVerse: aboutVerseEl,
    contactThanks: "Ευχαριστούμε — θα επιστρέψουμε με τα επόμενα βήματα.",
    contactError: "Κάτι πήγε στραβά — δοκίμασε ξανά ή στείλε μας απευθείας email.",
    contactSending: "Αποστολή…",
    contactInterest: "Ενδιαφέρομαι για:",
    contactName: "Όνομα",
    contactEmail: "Email",
    contactCompany: "Εταιρεία",
    contactBrief: "Σύντομο brief",
    contactOptional: "προαιρετικό",
    contactPlaceholder: "Στόχοι, χρονοδιάγραμμα, links…",
    contactSend: "Αποστολή",
    contactCall: "Ή κάλεσε",
    contactFull: "Πλήρης συνεργασία",
    notFoundTitle: "Η σελίδα δεν βρέθηκε",
    notFoundBody: "Αυτό το URL δεν αντιστοιχεί σε σελίδα του omnidot. Γύρνα στην αρχική ή διάλεξε υπηρεσία.",
    notFoundHome: "Αρχική",
    privacyLink: "Απόρρητο",
    privacyEyebrow: "Νομικά",
    privacyTitle: "Όροι χρήσης, πολιτική απορρήτου & cookies",
    privacyUpdated: "Τελευταία ενημέρωση: Σεπτέμβριος 2026",
    privacyIntro:
      "Οι παρόντες όροι ρυθμίζουν τη χρήση του https://omnidot.gr, που λειτουργεί ο/η {name} ως {form} υπό το brand omnidot. Με την περιήγηση στον ιστότοπο αποδέχεστε τους όρους. Σε περίπτωση διαφωνίας, παρακαλούμε αποχωρήστε από τον ιστότοπο.",
    privacyControllerLabel: "Υπεύθυνος επεξεργασίας",
    privacyVatLabel: "ΑΦΜ",
    privacyDisclaimer:
      "Η σελίδα είναι ενημερωτική και περιγράφει τον τρόπο λειτουργίας του site και της φόρμας επικοινωνίας. Δεν αποτελεί νομική συμβουλή. Μπορεί να ενημερωθεί όταν αλλάζουν εργαλεία ή διαδικασίες.",
    privacySeoDescription:
      "Όροι χρήσης, πολιτική απορρήτου και cookies του omnidot. — πώς επεξεργαζόμαστε δεδομένα επικοινωνίας βάσει GDPR.",
    cookieTitle: "Cookies & analytics",
    cookieBody:
      "Χρησιμοποιούμε απαραίτητα cookies για να λειτουργεί το site. Με την αποδοχή σου θα χρησιμοποιούμε και analytics/marketing tags για επισκεψιμότητα και καμπάνιες. Μπορείς να το αλλάξεις οποιαδήποτε στιγμή.",
    cookieAccept: "Αποδοχή",
    cookieReject: "Μόνο απαραίτητα",
    cookieSettings: "Cookies",
    privacySections: [
      {
        heading: "Χρήση του ιστοτόπου",
        paragraphs: [
          "Οι επισκέπτες οφείλουν να κάνουν σύννομη χρήση του ιστότοπου σύμφωνα με την ελληνική, ενωσιακή και διεθνή νομοθεσία. Απαγορεύεται η αντιγραφή, αποθήκευση, αναπαραγωγή, μετάδοση ή τροποποίηση ουσιώδους μέρους του περιεχομένου χωρίς προηγούμενη έγγραφη άδεια.",
          "Οι πληροφορίες στον ιστότοπο είναι ενδεικτικές και ενημερωτικού χαρακτήρα. Δεν συνιστούν από μόνες τους ανάθεση έργου. Η συνεργασία ξεκινά μόνο μετά από έγγραφη συμφωνία εύρους.",
          "Διατηρούμε το δικαίωμα τροποποίησης των όρων. Ελέγχετε περιοδικά την παρούσα σελίδα.",
        ],
      },
      {
        heading: "Πολιτική cookies",
        paragraphs: [
          "Τα cookies είναι μικρά αρχεία που αποθηκεύει ο browser σας. Τα χρησιμοποιούμε όπου χρειάζεται για τη λειτουργία του site και, αν ενεργοποιηθούν, για συγκεντρωτική ανάλυση επισκεψιμότητας.",
        ],
        bullets: [
          "Απολύτως απαραίτητα — για βασική πλοήγηση, προτίμηση γλώσσας και ασφάλεια φόρμας. Δεν απενεργοποιούνται από εμάς.",
          "Απόδοσης / analytics — με τη συγκατάθεσή σου φορτώνουμε Google Analytics 4 (gtag) για page views και conversions φόρμας. Η ανωνυμοποίηση IP είναι ενεργή. Μπορείς να ανακαλέσεις οποιαδήποτε στιγμή από Cookies στο footer.",
          "Δεν χρησιμοποιούμε προς το παρόν cookies τρίτων για διαφημίσεις σε αυτόν τον ιστότοπο.",
        ],
      },
      {
        heading: "Προστασία προσωπικών δεδομένων (GDPR)",
        paragraphs: [
          "Επεξεργαζόμαστε προσωπικά δεδομένα σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR) και την ελληνική νομοθεσία. Τυπικά δεδομένα: ονοματεπώνυμο, email, εταιρεία και περιεχόμενο μηνύματος όταν χρησιμοποιείτε τη φόρμα brief ή μας στέλνετε email· τεχνικά logs (IP, browser) από παρόχους φιλοξενίας και ασφάλειας όπως το Cloudflare.",
          "Σκοπός: απάντηση σε αιτήματα, προτάσεις συνεργασίας, παροχή συμφωνημένων υπηρεσιών marketing και ασφάλεια του ιστότοπου. Νομικές βάσεις: προσυμβατικά μέτρα / εκτέλεση σύμβασης, έννομο συμφέρον λειτουργίας και ασφάλειας του site, και συγκατάθεση όπου απαιτείται για προαιρετικά analytics.",
          "Διατηρούμε δεδομένα επικοινωνίας μόνο όσο χρειάζεται για τη διαχείριση του αιτήματος και τυχόν follow-up, και στη συνέχεια τα διαγράφουμε ή ανωνυμοποιούμε, εκτός αν απαιτείται μεγαλύτερη διατήρηση από τον νόμο ή ενεργό έργο.",
          "Εκτελούντες την επεξεργασία μπορεί να είναι υποδομές hosting και email (π.χ. Cloudflare Pages, Email Routing, Formspree) και, με συγκατάθεση, Google Analytics — εντός ΕΕ/ΕΟΧ ή με κατάλληλες εγγυήσεις.",
        ],
        bullets: [
          "Δικαίωμα πρόσβασης",
          "Δικαίωμα διόρθωσης",
          "Δικαίωμα διαγραφής",
          "Δικαίωμα ανάκλησης συγκατάθεσης (όταν η επεξεργασία βασίζεται σε συγκατάθεση)",
          "Δικαίωμα φορητότητας",
          "Δικαίωμα περιορισμού της επεξεργασίας",
          "Δικαίωμα εναντίωσης στην επεξεργασία",
          "Δικαίωμα καταγγελίας στην Αρχή Προστασίας Δεδομένων (www.dpa.gr)",
        ],
      },
      {
        heading: "Επικοινωνία για αιτήματα απορρήτου",
        paragraphs: [
          "Για οποιαδήποτε απορία σχετικά με την πολιτική ή τα δεδομένα σας, στείλτε μήνυμα στο info@omnidot.gr. Στοχεύουμε σε απάντηση εντός ενός μηνός.",
        ],
      },
    ],
    pages: {
      social: {
        title: "Διαχείριση Social Media",
        seoTitle: "Διαχείριση Social Media & Instagram — omnidot. Αθήνα",
        seoDescription:
          "Διαχείριση Instagram, TikTok, Facebook & LinkedIn: στρατηγική, Reels, community και growth. Διαφημιστική στην Αθήνα & remote. Από €450/μήνα.",
        meta: [
          { label: "Στόχος", value: "Σταθερή παρουσία" },
          { label: "Κανάλια", value: "IG · TikTok · LinkedIn" },
          { label: "Παίρνεις", value: "Πλάνο + posts" },
          { label: "Συνεργασία", value: "Μηνιαία" },
        ],
        proof: {
          label: "Επιλεγμένο",
          value: "",
          clients: [
            {
              client: "Europatch",
              backdrop: "/images/europatch-backdrop.jpg",
              did: "Social media, Reels, οργανικό content",
              story:
                "Η Europatch πουλάει ψυχρή άσφαλτο σε B2B πελάτες — κατηγορία που σπάνια γίνεται viral online. Χτίσαμε σταθερή οργανική παρουσία γύρω από πραγματική χρήση προϊόντος και how-to περιεχόμενο. Σε έναν χρόνο: 4.5 εκ. views στο Facebook και 2.5 εκ. στο Instagram, 100% organic.",
              value: "4.5 εκ. Facebook · 2.5 εκ. Instagram · 100% organic · 1 χρόνος",
              notes: [
                "1.2 εκ. unique viewers · 0 από ads",
                "Reel 397.9K · Facebook post 120.8K",
                "Τελευταίος μήνας: 96% των views από non-followers",
              ],
              media: [
                {
                  src: "/videos/europatch/timeline-1.mp4",
                  kind: "video",
                  title: "Europatch reel",
                  detail: "How-to στον δρόμο",
                },
                {
                  src: "/images/europatch-reels-grid-1.png",
                  title: "Απόδοση Reels",
                  detail: "Top organic reach",
                },
                {
                  src: "/images/europatch-reels-grid-2.jpg",
                  title: "Βιβλιοθήκη Reels",
                  detail: "Views στο feed",
                },
                {
                  src: "/images/proof-europatch-all.png",
                  title: "Europatch — όλο το content",
                  detail: "4.5 εκ. views · 100% organic",
                },
                {
                  src: "/images/proof-europatch-ig.png",
                  title: "Europatch — Instagram",
                  detail: "2.5 εκ. οργανικά views",
                },
                {
                  src: "/images/proof-europatch-fb.png",
                  title: "Facebook post",
                  detail: "120.8K views",
                },
                {
                  src: "/images/proof-europatch-month.png",
                  title: "Τελευταίος μήνας",
                  detail: "96% από non-followers",
                },
              ],
            },
            {
              client: "N4Sails",
              backdrop: "/images/n4sails-backdrop.jpg",
              did: "Διαχείριση Instagram, οργανικά Reels",
              story:
                "Nafplio for Sails — τρέξαμε τον λογαριασμό Instagram γύρω από καλοκαιρινές ιστορίες καταμαράν. Ρυθμός δημοσίευσης, τοποθέτηση Reels και οργανική εμβέλεια — όχι ad spend — ώστε το feed να πουλάει το αίσθημα του να είσαι πάνω στο σκάφος.",
              value: "Οργανική εμβέλεια Instagram · lifestyle Reels",
              notes: [
                "Σταθερό publishing για summer escapes",
                "Grid με top οργανικά cuts",
                "Reach χωρίς paid boost",
              ],
              media: [
                {
                  src: "/videos/n4sails/escape-summer-story.mp4",
                  kind: "video",
                  title: "Escape summer story",
                  detail: "Dive στο μπλε του Ναυπλίου",
                },
                {
                  src: "/images/n4sails-reels-grid.png",
                  title: "Grid Reels",
                  detail: "Απόδοση προφίλ",
                },
              ],
            },
          ],
        },
        points: [
          {
            name: "Στρατηγική",
            detail: "Θέση, πυλώνες, ημερολόγιο",
            body: "Στρατηγική social media για Instagram, TikTok, Facebook και LinkedIn: φωνή brand, πυλώνες περιεχομένου, ημερολόγιο δημοσιεύσεων και κανόνες κοινότητας. Ορίζουμε τι λέμε, πού ανεβαίνει και πόσο συχνά — ώστε η διαχείριση social media να είναι σταθερή, όχι τυχαία posts.",
          },
          {
            name: "Δημοσίευση",
            detail: "Feed, stories, κοινότητα",
            body: "Δημιουργούμε και ανεβάζουμε feed posts, Reels, Stories και carousels, και απαντάμε σε σχόλια και DMs. Κείμενα, εικόνες και timing μένουν on-brand ώστε ο λογαριασμός να φαίνεται ζωντανός σε followers και σε νέους επισκέπτες από αναζήτηση ή διαφημίσεις.",
          },
          {
            name: "Ανάπτυξη",
            detail: "Reels, UGC, συνεργασίες",
            body: "Ανάπτυξη μέσω short video, Reels, user-generated content και συνεργασιών με creators. Δοκιμάζουμε φόρμες που ανοίγουν reach σε Instagram και TikTok και φέρνουν κόσμο που ήδη νοιάζεται για την κατηγορία — πρώτα organic, ads όταν έχει νόημα.",
          },
          {
            name: "Reporting",
            detail: "Μηνιαία καθαρότητα, όχι vanity",
            body: "Μηνιαίο social media reporting με reach, engagement, αποθηκεύσεις, επισκέψεις προφίλ και τι αλλάζουμε μετά. Απλή γλώσσα για founders και marketing — χρήσιμα metrics, καθαρά επόμενα βήματα, χωρίς vanity dashboards.",
          },
        ],
      },
      content: {
        title: "Δημιουργία Περιεχομένου",
        seoTitle: "Παραγωγή Περιεχομένου — Reels, Video & Φωτο | omnidot.",
        seoDescription:
          "Παραγωγή περιεχομένου για Instagram Reels, ads και web: φωτογραφία, video και μοντάζ από concept έως ανάρτηση. Γύρισμα €200. Πακέτα από €350. Αθήνα.",
        meta: [
          { label: "Μορφές", value: "Φωτο · Video · Still" },
          { label: "Ύφος", value: "Καθαρό & editorial" },
          { label: "Χρήση", value: "Social + διαφημίσεις" },
          { label: "Παράδοση", value: "Έτοιμο για ανάρτηση" },
        ],
        proof: {
          label: "Επιλεγμένο",
          value: "",
          clients: [
            {
              client: "Europatch",
              backdrop: "/images/europatch-backdrop.jpg",
              did: "Content creation, Reels, how-to video",
              story:
                "Ίδια συνεργασία Europatch από την πλευρά της παραγωγής: how-to reels στον δρόμο, προϊόν σε χρήση, cuts για feed και Reels. Concept, γύρισμα και μοντάζ — η βιβλιοθήκη που μετά έφερε οργανική εμβέλεια.",
              value: "How-to Reels · προϊόν σε χρήση · ready-to-post cuts",
              notes: [
                "How-to στον δρόμο και demos προϊόντος",
                "Cuts για Reels και feed",
                "Μία γραμμή παραγωγής για όλα τα κανάλια",
              ],
              media: [
                {
                  src: "/videos/europatch/timeline-1.mp4",
                  kind: "video",
                  title: "Europatch reel",
                  detail: "How-to στον δρόμο",
                },
                {
                  src: "/videos/europatch/18.mp4",
                  kind: "video",
                  title: "Προϊόν σε χρήση",
                  detail: "Ψυχρή άσφαλτος on site",
                },
              ],
            },
            {
              client: "N4Sails",
              backdrop: "/images/n4sails-backdrop.jpg",
              did: "Lifestyle Reels, guest stories, μοντάζ",
              story:
                "Nafplio for Sails — lifestyle Reels για καταμαράν: dive shots, οικογενειακές στιγμές και guest stories για Instagram. Πλήρης παραγωγή περιεχομένου που πουλάει το αίσθημα του να είσαι πάνω στο σκάφος.",
              value: "Lifestyle Reels · Ναύπλιο · ready-to-post",
              notes: [
                "Escape / little moments / guest stories",
                "Dive, κατάστρωμα και onboard lifestyle",
                "Μοντάζ για μήκος Instagram Reels",
              ],
              media: [
                {
                  src: "/videos/n4sails/escape-summer-story.mp4",
                  kind: "video",
                  title: "Escape summer story",
                  detail: "Dive στο μπλε του Ναυπλίου",
                },
                {
                  src: "/videos/n4sails/little-moments-family.mp4",
                  kind: "video",
                  title: "Little moments",
                  detail: "Οικογένεια στο κατάστρωμα",
                },
                {
                  src: "/videos/n4sails/description-3-words.mp4",
                  kind: "video",
                  title: "Description in 3 words",
                  detail: "Guest story · Konstantinos",
                },
                {
                  src: "/videos/n4sails/home-away-from-home.mp4",
                  kind: "video",
                  title: "Home away from home",
                  detail: "Lifestyle στο σκάφος",
                },
              ],
            },
          ],
        },
        points: [
          {
            name: "Concept",
            detail: "Ιδέες, σενάρια, shot lists",
            body: "Η δημιουργία περιεχομένου ξεκινά από το concept: ιδέες, σενάρια, shot lists και brand guidelines πριν γυρίσει κάμερα. Έτσι η παραγωγή φωτογραφίας και video μένει γρήγορη και σταθερή για social media, διαφημίσεις και την ιστοσελίδα.",
          },
          {
            name: "Λήψη",
            detail: "Φωτογραφία, video, on-site",
            body: "Φωτογράφιση και βιντεοσκόπηση on-location — προϊόν, άνθρωποι, χώρος. Γυρίζουμε για Instagram, TikTok, Facebook ads, Google καμπάνιες και το site σας, ώστε μία μέρα παραγωγής να τροφοδοτεί όλα τα κανάλια.",
          },
          {
            name: "Μοντάζ",
            detail: "Cuts για feed, ads, web",
            body: "Μοντάζ και post-production για κάθε μορφή: Reels, Stories, feed posts, YouTube, paid ads και hero videos για το web. Ίδιος κόσμος brand, σωστό μήκος και αναλογία για κάθε placement.",
          },
          {
            name: "Assets",
            detail: "Stills, carousels, motion",
            body: "Χρήσιμη βιβλιοθήκη περιεχομένου: stills, carousels, motion graphics, τίτλοι και thumbnails έτοιμα για ανάρτηση ή διαφήμιση — τακτοποιημένα αρχεία που χρησιμοποιούνται πραγματικά.",
          },
        ],
      },
      performance: {
        title: "Performance Marketing",
        seoTitle: "Google Ads & Meta Ads — Διαχείριση | omnidot. Αθήνα",
        seoDescription:
          "Διαχείριση Google Ads και Meta Ads. Setup €200 μία φορά, management από €300/μήνα. Το ad spend μένει δικό σας. Διαφημίσεις με στόχο conversions.",
        meta: [
          { label: "Στόχος", value: "Αύξηση conversions" },
          { label: "Κανάλια", value: "Meta · Google" },
          { label: "Τρόπος", value: "Δοκιμή, μετά scale" },
          { label: "Βλέπεις", value: "Καθαρούς αριθμούς" },
        ],
        proof: {
          label: "Επιλεγμένο",
          client: "Πυργιώτης ΟΕ",
          story:
            "Ο Πυργιώτης ΟΕ ήθελε διαφημίσεις που να καταλαβαίνει εύκολα ο ιδιοκτήτης — χωρίς μακροσκελή παρουσίαση. Τρέξαμε Meta και Google, δοκιμάζοντας λίγες εικόνες/κείμενα και καθαρή διαδρομή προς την ιστοσελίδα. Σε 30 ημέρες στο Meta: 1.791 επισκέψεις στη σελίδα με €0,08 η καθεμία και συνολικά €148 — και στο Google, το 3,23% όσων είδαν την αγγελία πάτησαν.",
          value: "Meta €0,08 CPLV · Google 3,23% CTR · 30 ημέρες",
          notes: [
            "Meta Ads — 1.791 landing page views · €0,08 · €148 · 30 ημέρες",
            "Google Ads — 298 κλικ · 9.24 χιλ. εμφανίσεις · 3,23% CTR",
          ],
        },
        points: [
          {
            name: "Meta & Google",
            detail: "Acquisition που συσσωρεύεται",
            body: "Performance marketing σε Meta Ads (Facebook & Instagram) και Google Ads: καμπάνιες για traffic, leads και πωλήσεις. Δομή λογαριασμών, κοινά, λέξεις-κλειδιά και budgets ώστε να μεγαλώνετε όταν κάτι δουλεύει ξεκάθαρα — paid social και search μαζί.",
          },
          {
            name: "Creative testing",
            detail: "Επαναλαμβάνουμε ό,τι πουλάει",
            body: "Συνεχή A/B tests σε hooks, creatives, κείμενα και προσφορές. Κρατάμε ό,τι μετατρέπει, σταματάμε τα υπόλοιπα και ανανεώνουμε κάθε εβδομάδα ώστε CPA και ROAS να βελτιώνονται από δεδομένα — όχι από ένα μεγάλο launch.",
          },
          {
            name: "Funnel",
            detail: "Landing → lead → πώληση",
            body: "Οι διαφημίσεις χρειάζονται καθαρή διαδρομή μετά το κλικ: landing page, φόρμα, thank-you και conversion tracking (pixels, GA4, Google Ads tags). Δένουμε creative, landing και follow-up ώστε το ενδιαφέρον να γίνει πελάτης.",
          },
          {
            name: "Analytics",
            detail: "ROAS, CPA, επόμενα βήματα",
            body: "Καθαρό reporting σε spend, CPA, ROAS, CTR και conversions — σε γλώσσα που χρησιμοποιεί ένας founder. Κάθε εβδομάδα: τι κρατάμε, κόβουμε ή μεγαλώνουμε. Αν ένας αριθμός δεν αλλάζει απόφαση, δεν τον κάνουμε παράσταση.",
          },
        ],
      },
      web: {
        title: "Ανάπτυξη Ιστοσελίδων",
        seoTitle: "Κατασκευή Ιστοσελίδας & SEO — Αθήνα | omnidot.",
        seoDescription:
          "Κατασκευή ιστοσελίδας και SEO: γρήγορα sites, landing pages και δομή για Google. Landing από €700, multi-page ≈ €700/σελίδα. Αθήνα & remote.",
        meta: [
          { label: "Κατασκευή", value: "Sites & landings" },
          { label: "SEO", value: "Εμφανίσιμο στο Google" },
          { label: "Ταχύτητα", value: "Γρήγορο φόρτωμα" },
          { label: "Ιδιοκτησία", value: "Μένει δικό σου" },
        ],
        proof: {
          label: "Μερικές ιστοσελίδες μας",
          value: "",
          links: [
            { label: "dotxi.app", href: "https://dotxi.app/" },
            { label: "pyrgiotisoe.com", href: "https://pyrgiotisoe.com/" },
          ],
        },
        points: [
          {
            name: "Ιστοσελίδες",
            detail: "Εταιρικά sites & brand pages",
            body: "Σχεδιάζουμε και κατασκευάζουμε εταιρικές ιστοσελίδες και brand sites που φορτώνουν γρήγορα, δουλεύουν σωστά σε κινητό και desktop και οδηγούν τον επισκέπτη σε επικοινωνία, προσφορά ή αγορά. Καθαρή δομή σελίδων, δυνατά calls to action και κείμενα γραμμένα ώστε να τα καταλαβαίνουν και οι άνθρωποι και η Google.",
          },
          {
            name: "SEO",
            detail: "Τεχνικό SEO + περιεχόμενο που rankάρει",
            body: "Βελτιστοποίηση για μηχανές αναζήτησης από τη βάση: δομή site, title tags, meta descriptions, επικεφαλίδες, εσωτερικά links, Core Web Vitals, schema markup και σελίδες που το Googlebot διαβάζει εύκολα. Συνδυάζουμε τεχνικό SEO με περιεχόμενο για τις λέξεις-κλειδιά που πραγματικά ψάχνουν οι πελάτες σας — και τοπικό SEO όταν εξυπηρετείτε περιοχή ή πόλη.",
          },
          {
            name: "Landing pages",
            detail: "Σελίδες για καμπάνιες & διαφημίσεις",
            body: "Ξεχωριστές landing pages για Google Ads, Meta ads και email — μία προσφορά, μία διαδρομή, γρήγορο φόρτωμα. Φτιαγμένες να μετατρέπουν paid traffic και organic search σε leads ή πωλήσεις, με μέτρηση (GA4, pixels) ώστε να βλέπετε ποια καμπάνια και ποια λέξη-κλειδί φέρνουν αποτέλεσμα.",
          },
          {
            name: "Φροντίδα",
            detail: "Ενημερώσεις, ταχύτητα & συνεχές SEO",
            body: "Μετά το launch κρατάμε την ιστοσελίδα υγιή: ενημερώσεις περιεχομένου, βελτιώσεις ταχύτητας και απόδοσης, SEO fixes, ασφάλεια και μικρές αλλαγές UX όσο εξελίσσονται προϊόντα και καμπάνιες. Το site είναι κανάλι πωλήσεων, όχι brochure μιας χρήσης.",
          },
        ],
      },
    },
    performanceFacts: [
      {
        place: "Creative testing",
        detail: "Εβδομαδιαία πειράματα",
        body: "Νέα hooks και φόρμες μπαίνουν κάθε εβδομάδα, ώστε να μαθαίνουμε από την αγορά, όχι από γνώμες.",
      },
      {
        place: "Paid social",
        detail: "Meta · TikTok",
        body: "Prospecting και retargeting εκεί που το κοινό ήδη σκρολάρει.",
      },
      {
        place: "Search",
        detail: "Google Ads · SEO",
        body: "Πιάνομε πρόθεση στο Google — paid εκεί που μετατρέπει, organic εκεί που οι σελίδες μπορούν να rankάρουν.",
      },
      {
        place: "Μέτρηση",
        detail: "GA4 · pixels · CRM",
        body: "Pixels, analytics και, όταν υπάρχει, CRM — ώστε να ξέρουμε τι έγινε ένα κλικ.",
      },
      {
        place: "Αποτέλεσμα",
        detail: "Καθαρές εβδομαδιαίες αποφάσεις",
        body: "Σύντομη εβδομαδιαία ανάγνωση: κρατάμε, κόβουμε ή μεγαλώνουμε. Όχι decks 40 σελίδων.",
      },
    ],
    webWork: [],
    socialWork: [
      {
        src: "/images/proof-europatch-all.png",
        title: "Europatch — όλο το content",
        detail: "4.5M views · 100% organic",
      },
      {
        src: "/images/proof-europatch-ig.png",
        title: "Europatch — Instagram",
        detail: "2.5M organic views",
      },
      {
        src: "/images/proof-europatch-reel.png",
        title: "Top reel",
        detail: "397.9K views",
      },
      {
        src: "/images/proof-europatch-fb.png",
        title: "Facebook post",
        detail: "120.8K views",
      },
      {
        src: "/images/proof-europatch-month.png",
        title: "Τελευταίος μήνας",
        detail: "96% από non-followers",
      },
    ],
    contentWork: [
      {
        src: "/videos/europatch/timeline-1.mp4",
        kind: "video",
        poster: "/images/proof-europatch-reel.png",
        title: "Europatch reel",
        detail: "How-to στον δρόμο",
      },
      {
        src: "/images/europatch-reels-grid-1.png",
        title: "Απόδοση Reels",
        detail: "Top organic reach",
      },
      {
        src: "/images/europatch-reels-grid-2.jpg",
        title: "Βιβλιοθήκη Reels",
        detail: "Views στο feed",
      },
    ],
    performanceWork: [
      {
        src: "/images/proof-pyrgiotis-meta.png",
        title: "Πυργιώτης ΟΕ — Meta Ads",
        detail: "1.791 LPV · €0,08 · €148",
      },
      {
        src: "/images/proof-pyrgiotis-google.png",
        title: "Πυργιώτης ΟΕ — Google Ads",
        detail: "298 κλικ · 3,23% CTR",
      },
    ],
  },
};
