/** omnidot. — marketing agency site content. */

/** Public profiles — footer icons + schema.org sameAs */
export const socials = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61594988901400",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/omnidotgr/",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/omnidotagency/",
  },
] as const;

export const site = {
  brand: "omnidot",
  tagline: "Marketing that shapes brands",
  email: "info@omnidot.gr",
  contactEmail: "contact@omnidot.gr",
  phone: "6970862839",
  whatsapp: "",
  location: "Athens",
  /** Formspree endpoint, e.g. https://formspree.io/f/xxxxxxxx */
  formspreeEndpoint: "https://formspree.io/f/maenvbbb",
  /** GA4 Measurement ID — loaded only after cookie consent */
  gaMeasurementId: "G-84BQG2BT9N",
  address: {
    locality: "Athens",
    region: "Attica",
    country: "GR",
  },
  sameAs: socials.map((s) => s.href) as string[],
  legal: {
    nameEl: "Συριανός Αντώνιος",
    nameEn: "Antonios Syrianos",
    vat: "162731235",
    formEl: "ατομική επιχείρηση",
    formEn: "sole proprietorship",
  },
};

export function phoneHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  return digits.startsWith("30") ? `+${digits}` : `+30${digits}`;
}

export function formatPhoneDisplay(phone: string) {
  const digits = phone.replace(/\D/g, "").replace(/^30/, "");
  if (digits.length === 10) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }
  return phone;
}

export type PageId = "social" | "content" | "performance" | "web";

export type MediaItem = {
  src: string;
  title: string;
  detail: string;
  /** Defaults to image; use video for mp4/webm clips */
  kind?: "image" | "video";
  poster?: string;
  /** Logo/mark thumbs: contain + padding instead of cover-crop */
  fit?: "cover" | "contain";
};

/** Homepage “Trusted by” strip — logos link out (partner backlinks). */
export type Partner = {
  name: string;
  href: string;
  logo: string;
};

export const partners: Partner[] = [
  {
    name: "DotXI",
    href: "https://dotxi.app/",
    logo: "/images/partners/dotxi.svg",
  },
  {
    name: "Nafplio4Sail",
    href: "https://nafplio4sail.com/",
    logo: "/images/partners/nafplio4sail.webp",
  },
  {
    name: "Europatch",
    href: "https://europatch.gr/",
    logo: "/images/partners/europatch.webp",
  },
  {
    name: "Pyrgiotis OE",
    href: "https://pyrgiotisoe.com/",
    logo: "/images/partners/pyrgiotis.webp",
  },
];

export const pages: {
  id: PageId;
  kicker: string;
  cover: string;
}[] = [
  { id: "social", kicker: "01", cover: "/images/social.webp" },
  { id: "content", kicker: "02", cover: "/images/content.webp" },
  { id: "performance", kicker: "03", cover: "/images/performance.webp" },
  { id: "web", kicker: "04", cover: "/images/web.webp" },
];

export const pageOrder: PageId[] = pages.map((p) => p.id);
