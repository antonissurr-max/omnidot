/** Bundled by prerender-shells.mjs so crawlable HTML stays in sync with React. */
export { copy, type Locale, type VerseRow } from "../src/i18n";
export { PAGE_TITLES } from "../src/seo";

import type { VerseRow } from "../src/i18n";

/** Flatten aboutVerse open-state words into one crawlable sentence. */
export function verseOpenText(rows: VerseRow[]): string {
  return rows
    .map((row) =>
      row.words
        .map((word) => {
          if (word.kind === "come") return "";
          return word.open;
        })
        .join(""),
    )
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
