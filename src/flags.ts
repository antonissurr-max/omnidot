/**
 * Temporary kill-switch for packages & pricing on the live site.
 * Set to `true` to restore the /pricing page, nav links, and price CTAs.
 */
export const SHOW_PRICING = false;

/**
 * True when a string still names package tiers or euro fees — hide while
 * SHOW_PRICING is false. Case-study metrics (€0.08 CPLV) stay visible.
 */
export function isPricingSensitiveCopy(...parts: string[]): boolean {
  if (SHOW_PRICING) return false;
  const text = parts.join(" ");
  return /(?:^|[^\d.,])€\s?\d{2,}|\bfrom €|\bαπό €|πακέτ(?:ο|α|ων)?\b|\bpackages?\b|Essential\s*:|Standard\s*:|Premium\s*:|See all packages|Δες όλα τα πακέτα|How much does a (?:shoot|site)|Πόσο κοστίζει/i.test(
    text,
  );
}
