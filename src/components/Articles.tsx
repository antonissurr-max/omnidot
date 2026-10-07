import { Link } from "react-router-dom";
import {
  articleBySlug,
  articlesFor,
  formatArticleDate,
} from "../articles";
import { useLocale } from "../locale";
import { pathFromView } from "../routing";

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
          <h1 id="article-title" className="articles__title">
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
