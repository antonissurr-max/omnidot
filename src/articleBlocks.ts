/** Shared article body block types + helpers (used by React + prerender). */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "ol"; items: string[] }
  | { type: "ul"; items: string[] }
  | { type: "checklist"; items: string[] }
  | { type: "callout"; tone?: "info" | "warning"; text: string }
  | {
      type: "table";
      caption?: string;
      headers: string[];
      rows: string[][];
    }
  | {
      type: "priceCard";
      items: { label: string; price: string }[];
      href: string;
      note?: string;
    }
  | { type: "cover"; src: string; alt: string };

export function slugifyHeading(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9α-ωάέήίόύώϊϋΐΰ\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

/** Bold the lead-in when a paragraph starts with “Label. rest”. */
export function splitLeadIn(
  text: string,
): { lead: string; rest: string } | null {
  const match = text.match(/^([^.。]{2,48})\.\s+([\s\S]+)$/);
  if (!match) return null;
  const lead = match[1];
  // Skip numbered leads like "1" — those belong in lists
  if (/^\d+$/.test(lead.trim())) return null;
  return { lead: `${lead}.`, rest: match[2] };
}

export function extractH2s(
  body: ArticleBlock[],
): { id: string; text: string }[] {
  return body
    .filter((b): b is Extract<ArticleBlock, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: b.id, text: b.text }));
}

export function middleH2Index(body: ArticleBlock[]): number {
  const idxs = body
    .map((b, i) => (b.type === "h2" ? i : -1))
    .filter((i) => i >= 0);
  if (idxs.length === 0) return -1;
  return idxs[Math.floor((idxs.length - 1) / 2)];
}

/** Index after which to inject mid-article CTA (end of middle H2 section). */
export function midCtaAfterIndex(body: ArticleBlock[]): number {
  const midH2 = middleH2Index(body);
  if (midH2 < 0) return -1;
  let end = midH2;
  for (let i = midH2 + 1; i < body.length; i++) {
    if (body[i].type === "h2") break;
    end = i;
  }
  return end;
}

export function plainTextFromBlocks(body: ArticleBlock[]): string {
  const parts: string[] = [];
  for (const b of body) {
    switch (b.type) {
      case "p":
      case "h2":
      case "h3":
      case "callout":
        parts.push(b.text);
        break;
      case "ol":
      case "ul":
      case "checklist":
        parts.push(...b.items);
        break;
      case "table":
        if (b.caption) parts.push(b.caption);
        parts.push(b.headers.join(" "));
        for (const row of b.rows) parts.push(row.join(" "));
        break;
      case "priceCard":
        for (const item of b.items) parts.push(`${item.label} ${item.price}`);
        if (b.note) parts.push(b.note);
        break;
      default:
        break;
    }
  }
  return parts.join("\n");
}
