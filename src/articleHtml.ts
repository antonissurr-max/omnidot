/** Serialize article blocks to HTML for prerender shells (no React). */

import {
  type ArticleBlock,
  midCtaAfterIndex,
  splitLeadIn,
} from "./articleBlocks";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function paragraphHtml(text: string): string {
  const lead = splitLeadIn(text);
  if (!lead) return `<p>${escapeHtml(text)}</p>`;
  return `<p><strong>${escapeHtml(lead.lead)}</strong> ${escapeHtml(lead.rest)}</p>`;
}

function blockToHtml(block: ArticleBlock, priceCta: string): string {
  switch (block.type) {
    case "p":
      return paragraphHtml(block.text);
    case "h2":
      return `<h2 id="${escapeHtml(block.id)}">${escapeHtml(block.text)}</h2>`;
    case "h3":
      return `<h3 id="${escapeHtml(block.id)}">${escapeHtml(block.text)}</h3>`;
    case "ol":
      return `<ol>${block.items
        .map((item) => {
          const lead = splitLeadIn(item);
          if (!lead) return `<li>${escapeHtml(item)}</li>`;
          return `<li><strong>${escapeHtml(lead.lead)}</strong> ${escapeHtml(lead.rest)}</li>`;
        })
        .join("")}</ol>`;
    case "ul":
      return `<ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
    case "checklist":
      return `<ul class="articles__check">${block.items
        .map(
          (item) =>
            `<li><span aria-hidden="true">✓</span> ${escapeHtml(item)}</li>`,
        )
        .join("")}</ul>`;
    case "callout":
      return `<aside class="articles__callout articles__callout--${block.tone ?? "info"}"><p>${escapeHtml(block.text)}</p></aside>`;
    case "table": {
      const caption = block.caption
        ? `<caption>${escapeHtml(block.caption)}</caption>`
        : "";
      const head = `<thead><tr>${block.headers
        .map((h) => `<th scope="col">${escapeHtml(h)}</th>`)
        .join("")}</tr></thead>`;
      const body = `<tbody>${block.rows
        .map(
          (row) =>
            `<tr>${row
              .map((cell, i) =>
                i === 0
                  ? `<th scope="row">${escapeHtml(cell)}</th>`
                  : `<td>${escapeHtml(cell)}</td>`,
              )
              .join("")}</tr>`,
        )
        .join("")}</tbody>`;
      return `<div class="articles__table-wrap"><table>${caption}${head}${body}</table></div>`;
    }
    case "priceCard": {
      const items = block.items
        .map(
          (item) =>
            `<li><span>${escapeHtml(item.label)}</span> <strong>${escapeHtml(item.price)}</strong></li>`,
        )
        .join("");
      const note = block.note
        ? `<p>${escapeHtml(block.note)}</p>`
        : "";
      return `<aside class="articles__price"><ul>${items}</ul>${note}<a href="${escapeHtml(block.href)}">${escapeHtml(priceCta)}</a></aside>`;
    }
    case "cover":
      return `<figure class="articles__cover"><img src="${escapeHtml(block.src)}" alt="${escapeHtml(block.alt)}" width="1600" height="900" loading="lazy" decoding="async" /></figure>`;
    default:
      return "";
  }
}

export type ArticlePrerenderCopy = {
  publishedLabel: string;
  updatedLabel: string;
  glanceLabel: string;
  tocLabel: string;
  priceCta: string;
  midCtaTitle: string;
  midCta: string;
  midCtaHref: string;
  endCtaTitle: string;
  endCta: string;
  endCtaHref: string;
  relatedServicesLabel: string;
  moreArticlesLabel: string;
  backLabel: string;
  articlesIndexHref: string;
  homeLabel: string;
  homeHref: string;
  articlesLabel: string;
};

export function articleDetailPrerenderHtml(input: {
  title: string;
  subtitle?: string;
  topic: string;
  date: string;
  dateModified?: string;
  dateLabel: string;
  dateModifiedLabel?: string;
  readTime: string;
  takeaways?: string[];
  body: ArticleBlock[];
  relatedServices?: { label: string; href: string; blurb: string }[];
  moreArticles?: { title: string; href: string; topic: string; excerpt: string }[];
  copy: ArticlePrerenderCopy;
}): string {
  const { copy } = input;
  const after = midCtaAfterIndex(input.body);
  const firstH2 = input.body.findIndex((b) => b.type === "h2");
  const intro = firstH2 < 0 ? input.body : input.body.slice(0, firstH2);
  const rest = firstH2 < 0 ? [] : input.body.slice(firstH2);

  const renderBlocks = (blocks: ArticleBlock[], indexOffset: number) => {
    const parts: string[] = [];
    blocks.forEach((block, i) => {
      parts.push(blockToHtml(block, copy.priceCta));
      if (indexOffset + i === after) {
        parts.push(
          `<aside class="articles__cta"><p>${escapeHtml(copy.midCtaTitle)}</p><a href="${escapeHtml(copy.midCtaHref)}">${escapeHtml(copy.midCta)}</a></aside>`,
        );
      }
    });
    return parts.join("");
  };

  const tocItems = input.body
    .filter((b): b is Extract<ArticleBlock, { type: "h2" }> => b.type === "h2")
    .map((b) => `<li><a href="#${escapeHtml(b.id)}">${escapeHtml(b.text)}</a></li>`)
    .join("");

  const takeaways =
    input.takeaways?.length
      ? `<aside aria-labelledby="article-glance"><p id="article-glance">${escapeHtml(copy.glanceLabel)}</p><ul>${input.takeaways.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul></aside>`
      : "";

  const updated =
    input.dateModified &&
    input.dateModified !== input.date &&
    input.dateModifiedLabel
      ? `<span>${escapeHtml(copy.updatedLabel)} <time datetime="${escapeHtml(input.dateModified)}">${escapeHtml(input.dateModifiedLabel)}</time></span>`
      : "";

  const related =
    input.relatedServices?.length
      ? `<section aria-labelledby="article-related"><h2 id="article-related">${escapeHtml(copy.relatedServicesLabel)}</h2><ul>${input.relatedServices
          .map(
            (item) =>
              `<li><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a><span>${escapeHtml(item.blurb)}</span></li>`,
          )
          .join("")}</ul></section>`
      : "";

  const more =
    input.moreArticles?.length
      ? `<section aria-labelledby="article-more"><h2 id="article-more">${escapeHtml(copy.moreArticlesLabel)}</h2><ul>${input.moreArticles
          .map(
            (item) =>
              `<li><a href="${escapeHtml(item.href)}"><span>${escapeHtml(item.topic)}</span><span>${escapeHtml(item.title)}</span><span>${escapeHtml(item.excerpt)}</span></a></li>`,
          )
          .join("")}</ul></section>`
      : "";

  return [
    `<main id="prerender" class="articles articles--detail">`,
    `<nav aria-label="Breadcrumb"><ol><li><a href="${escapeHtml(copy.homeHref)}">${escapeHtml(copy.homeLabel)}</a></li><li><a href="${escapeHtml(copy.articlesIndexHref)}">${escapeHtml(copy.articlesLabel)}</a></li><li>${escapeHtml(input.title)}</li></ol></nav>`,
    `<header>`,
    `<p>${escapeHtml(input.topic)} · ${escapeHtml(input.readTime)}</p>`,
    `<h1>${escapeHtml(input.title)}</h1>`,
    input.subtitle ? `<p>${escapeHtml(input.subtitle)}</p>` : "",
    `<p><span>${escapeHtml(copy.publishedLabel)} <time datetime="${escapeHtml(input.date)}">${escapeHtml(input.dateLabel)}</time></span>${updated}</p>`,
    `</header>`,
    renderBlocks(intro, 0),
    takeaways,
    tocItems
      ? `<nav aria-label="${escapeHtml(copy.tocLabel)}"><p>${escapeHtml(copy.tocLabel)}</p><ol>${tocItems}</ol></nav>`
      : "",
    renderBlocks(rest, firstH2 < 0 ? 0 : firstH2),
    `<aside class="articles__cta"><p>${escapeHtml(copy.endCtaTitle)}</p><a href="${escapeHtml(copy.endCtaHref)}">${escapeHtml(copy.endCta)}</a></aside>`,
    related,
    more,
    `<p><a href="${escapeHtml(copy.articlesIndexHref)}">${escapeHtml(copy.backLabel)}</a></p>`,
    `</main>`,
  ]
    .filter(Boolean)
    .join("");
}
