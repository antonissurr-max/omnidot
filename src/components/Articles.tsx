import { Link } from "react-router-dom";
import {
  articleBySlug,
  articlesFor,
  formatArticleDate,
} from "../articles";
import { useLocale } from "../locale";
import { pathFromView } from "../routing";

function formatArticleIndex(index: number): string {
  return String(index + 1).padStart(3, "0");
}

export function Articles({ slug }: { slug?: string }) {
  const { locale, t } = useLocale();
  const articles = articlesFor(locale);
  const article = slug ? articleBySlug(locale, slug) : undefined;

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
    return (
      <article
        className="articles articles--detail"
        data-chrome-tone="light"
        aria-labelledby="article-title"
      >
        <header className="articles__head">
          <p className="articles__eyebrow">
            <span>{article.topic}</span>
            <span aria-hidden="true"> · </span>
            <time dateTime={article.date}>
              {formatArticleDate(locale, article.date)}
            </time>
            <span aria-hidden="true"> · </span>
            <span>
              {t.articlesReadTime.replace("{n}", String(article.readMinutes))}
            </span>
          </p>
          <h1 id="article-title" className="articles__title articles__title--detail">
            {article.title}
          </h1>
        </header>

        <div className="articles__body">
          {article.body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <p className="articles__back">
          <Link to={pathFromView({ kind: "articles" }, locale)}>
            {t.articlesBack} ↗
          </Link>
        </p>
      </article>
    );
  }

  return (
    <section className="articles articles--journal" data-chrome-tone="light" aria-labelledby="articles-title">
      <header className="articles__head articles__head--journal">
        <p className="articles__eyebrow">{t.articlesTitle}</p>
        <h1 id="articles-title" className="articles__intro">
          {t.articlesLede}
        </h1>
      </header>

      <ol className="articles__list" start={1}>
        {articles.map((item, index) => (
          <li key={item.slug} className="articles__item">
            <Link
              className="articles__link"
              to={pathFromView({ kind: "article", slug: item.slug }, locale)}
            >
              <span className="articles__index" aria-hidden="true">
                {formatArticleIndex(index)}
              </span>
              <span className="articles__copy">
                <h2 className="articles__item-title">{item.title}</h2>
                <span className="articles__meta">
                  <span className="articles__topic">{item.topic}</span>
                  <time dateTime={item.date}>
                    {formatArticleDate(locale, item.date)}
                  </time>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
