import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  articleBySlug,
  articlesFor,
  extractH2s,
  formatArticleDate,
  midCtaAfterIndex,
  splitLeadIn,
  type ArticleBlock,
} from "../articles";
import { useLocale } from "../locale";
import { pathFromView } from "../routing";

function ParagraphText({ text }: { text: string }) {
  const lead = splitLeadIn(text);
  if (!lead) return <>{text}</>;
  return (
    <>
      <strong className="articles__lead">{lead.lead}</strong> {lead.rest}
    </>
  );
}

function BlockView({
  block,
  priceCta,
}: {
  block: ArticleBlock;
  priceCta: string;
}) {
  switch (block.type) {
    case "p":
      return (
        <p>
          <ParagraphText text={block.text} />
        </p>
      );
    case "h2":
      return <h2 id={block.id}>{block.text}</h2>;
    case "h3":
      return <h3 id={block.id}>{block.text}</h3>;
    case "ol":
      return (
        <ol className="articles__points">
          {block.items.map((item) => (
            <li key={item.slice(0, 48)}>
              <ParagraphText text={item} />
            </li>
          ))}
        </ol>
      );
    case "ul":
      return (
        <ul className="articles__bullets">
          {block.items.map((item) => (
            <li key={item.slice(0, 48)}>{item}</li>
          ))}
        </ul>
      );
    case "checklist":
      return (
        <ul className="articles__check">
          {block.items.map((item) => (
            <li key={item.slice(0, 48)}>
              <span className="articles__check-mark" aria-hidden="true">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside
          className={`articles__callout articles__callout--${block.tone ?? "info"}`}
        >
          <p>{block.text}</p>
        </aside>
      );
    case "table":
      return (
        <div className="articles__table-wrap">
          <table className="articles__table">
            {block.caption ? <caption>{block.caption}</caption> : null}
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th key={`${h}-${i}`} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) =>
                    ci === 0 ? (
                      <th key={ci} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={ci}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "priceCard":
      return (
        <aside className="articles__price">
          <ul>
            {block.items.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <strong>{item.price}</strong>
              </li>
            ))}
          </ul>
          {block.note ? <p className="articles__price-note">{block.note}</p> : null}
          <a className="articles__price-link" href={block.href}>
            {priceCta} →
          </a>
        </aside>
      );
    case "cover":
      return (
        <figure className="articles__cover">
          <img
            src={block.src}
            alt={block.alt}
            width={1600}
            height={900}
            loading="lazy"
            decoding="async"
          />
        </figure>
      );
    default:
      return null;
  }
}

function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.querySelector(".articles--detail");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setPct(total > 0 ? (scrolled / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="articles__progress" aria-hidden="true">
      <div className="articles__progress-bar" style={{ width: `${pct}%` }} />
    </div>
  );
}

function Toc({
  items,
  label,
}: {
  items: { id: string; text: string }[];
  label: string;
}) {
  const [open, setOpen] = useState(false);
  if (items.length === 0) return null;
  return (
    <nav className="articles__toc" aria-label={label}>
      <button
        type="button"
        className="articles__toc-toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
      </button>
      <ol className={`articles__toc-list${open ? " is-open" : ""}`}>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} onClick={() => setOpen(false)}>
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function CtaCard({
  title,
  cta,
  href,
}: {
  title: string;
  cta: string;
  href: string;
}) {
  return (
    <aside className="articles__cta">
      <p className="articles__cta-title">{title}</p>
      <Link className="articles__cta-btn" to={href}>
        {cta} ↗
      </Link>
    </aside>
  );
}

function ArticleBody({
  blocks,
  indexOffset,
  midAfter,
  priceCta,
  midCta,
  aboutHref,
}: {
  blocks: ArticleBlock[];
  indexOffset: number;
  midAfter: number;
  priceCta: string;
  midCta: { title: string; cta: string };
  aboutHref: string;
}) {
  const nodes: ReactNode[] = [];
  blocks.forEach((block, i) => {
    nodes.push(
      <BlockView
        key={`${block.type}-${indexOffset + i}`}
        block={block}
        priceCta={priceCta}
      />,
    );
    if (indexOffset + i === midAfter) {
      nodes.push(
        <CtaCard
          key="mid-cta"
          title={midCta.title}
          cta={midCta.cta}
          href={aboutHref}
        />,
      );
    }
  });
  return <>{nodes}</>;
}

export function Articles({ slug }: { slug?: string }) {
  const { locale, t } = useLocale();
  const articles = articlesFor(locale);
  const article = slug ? articleBySlug(locale, slug) : undefined;
  const aboutHref = pathFromView({ kind: "about" }, locale);
  const toc = useMemo(
    () => (article ? extractH2s(article.body) : []),
    [article],
  );

  if (slug && !article) {
    return (
      <article className="articles" data-chrome-tone="light" aria-labelledby="articles-title">
        <header className="articles__head">
          <p className="articles__eyebrow">{t.articlesEyebrow}</p>
          <h1 id="articles-title" className="articles__title">
            {t.notFoundTitle}
          </h1>
          <p className="articles__lede">{t.notFoundBody}</p>
        </header>
        <p className="articles__back">
          <Link to={pathFromView({ kind: "articles" }, locale)}>
            {t.articlesBack} ↗
          </Link>
        </p>
      </article>
    );
  }

  if (article) {
    const showUpdated =
      article.dateModified && article.dateModified !== article.date;
    const others = articles.filter((a) => a.slug !== article.slug);
    const firstH2 = article.body.findIndex((b) => b.type === "h2");
    const intro = firstH2 < 0 ? article.body : article.body.slice(0, firstH2);
    const rest = firstH2 < 0 ? [] : article.body.slice(firstH2);
    const midAfter = midCtaAfterIndex(article.body);
    const bodyProps = {
      priceCta: t.articlePriceCta,
      midCta: { title: t.articleMidCtaTitle, cta: t.articleMidCta },
      aboutHref,
      midAfter,
    };

    return (
      <>
        <ReadingProgress />
        <article
          className="articles articles--detail"
          data-chrome-tone="light"
          lang={locale}
          aria-labelledby="article-title"
        >
          <div className="articles__layout">
            <div className="articles__main">
              <header className="articles__head">
                <p className="articles__eyebrow">
                  <span>{article.topic}</span>
                  <span aria-hidden="true"> · </span>
                  <span>
                    {t.articlesReadTime.replace(
                      "{n}",
                      String(article.readMinutes),
                    )}
                  </span>
                </p>
                <h1 id="article-title" className="articles__title">
                  {article.title}
                </h1>
                {article.subtitle ? (
                  <p className="articles__subtitle">{article.subtitle}</p>
                ) : null}
                <p className="articles__dates">
                  <span>
                    {t.articlePublished}{" "}
                    <time dateTime={article.date}>
                      {formatArticleDate(locale, article.date)}
                    </time>
                  </span>
                  {showUpdated ? (
                    <span>
                      {t.articleUpdated}{" "}
                      <time dateTime={article.dateModified}>
                        {formatArticleDate(locale, article.dateModified!)}
                      </time>
                    </span>
                  ) : null}
                </p>
              </header>

              <div className="articles__body">
                <ArticleBody
                  blocks={intro}
                  indexOffset={0}
                  {...bodyProps}
                />
              </div>

              {article.takeaways?.length ? (
                <aside className="articles__glance" aria-labelledby="article-glance">
                  <p id="article-glance" className="articles__glance-title">
                    {t.articleGlance}
                  </p>
                  <ul>
                    {article.takeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </aside>
              ) : null}

              <Toc items={toc} label={t.articleToc} />

              <div className="articles__body">
                <ArticleBody
                  blocks={rest}
                  indexOffset={firstH2 < 0 ? 0 : firstH2}
                  {...bodyProps}
                />
              </div>

              <CtaCard
                title={t.articleEndCtaTitle}
                cta={t.articleEndCta}
                href={aboutHref}
              />

              {article.relatedServices?.length ? (
                <section
                  className="articles__related"
                  aria-labelledby="article-related"
                >
                  <h2 id="article-related" className="articles__related-heading">
                    {t.articleRelatedServices}
                  </h2>
                  <ul className="articles__related-list">
                    {article.relatedServices.map((item) => (
                      <li key={item.href}>
                        <a href={item.href}>{item.label}</a>
                        <span>{item.blurb}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {others.length > 0 ? (
                <section
                  className="articles__more-block"
                  aria-labelledby="article-more"
                >
                  <h2 id="article-more" className="articles__related-heading">
                    {t.articleMoreArticles}
                  </h2>
                  <ul className="articles__more-list">
                    {others.map((item) => (
                      <li key={item.slug}>
                        <Link
                          to={pathFromView(
                            { kind: "article", slug: item.slug },
                            locale,
                          )}
                        >
                          <span className="articles__more-topic">{item.topic}</span>
                          <span className="articles__more-title">{item.title}</span>
                          <span className="articles__more-excerpt">
                            {item.excerpt}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <p className="articles__back">
                <Link to={pathFromView({ kind: "articles" }, locale)}>
                  {t.articlesBack} ↗
                </Link>
              </p>
            </div>

            <aside className="articles__rail" aria-label={t.articleToc}>
              <p className="articles__rail-label">{t.articleToc}</p>
              <ol>
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </article>
      </>
    );
  }

  return (
    <section className="articles" data-chrome-tone="light" aria-labelledby="articles-title">
      <header className="articles__head">
        <p className="articles__eyebrow">{t.articlesEyebrow}</p>
        <h1 id="articles-title" className="articles__title">
          {t.articlesTitle}
        </h1>
        <p className="articles__lede">{t.articlesLede}</p>
      </header>

      <ul className="articles__list">
        {articles.map((item) => (
          <li key={item.slug} className="articles__item">
            <Link
              className="articles__link"
              to={pathFromView({ kind: "article", slug: item.slug }, locale)}
            >
              <span className="articles__thumb">
                <img
                  src={item.image}
                  alt=""
                  width={160}
                  height={120}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="articles__copy">
                <span className="articles__meta">
                  <span className="articles__topic">{item.topic}</span>
                  <time dateTime={item.date}>
                    {formatArticleDate(locale, item.date)}
                  </time>
                  <span>
                    {t.articlesReadTime.replace("{n}", String(item.readMinutes))}
                  </span>
                </span>
                <h2 className="articles__item-title">{item.title}</h2>
                <p className="articles__excerpt">{item.excerpt}</p>
                <span className="articles__more">{t.articlesRead} ↗</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
