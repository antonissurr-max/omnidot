import type { ReactNode } from "react";
import { FactRow } from "./ServicePanel";
import type { ServiceGuideCopy } from "../i18n";

export function ServiceGuide({
  guide,
  onBrief,
  afterCost,
}: {
  guide: ServiceGuideCopy;
  onBrief: () => void;
  /** Optional block rendered right after the cost section (e.g. client cards on /web/). */
  afterCost?: ReactNode;
}) {
  return (
    <div className="service-guide">
      <p className="service-guide__intro">{guide.intro}</p>
      <button className="work__brief" type="button" onClick={onBrief}>
        {guide.cta} ↗
      </button>

      {guide.blocksTitle && guide.blocks?.length ? (
        <section className="service-guide__section" aria-labelledby="sg-blocks">
          <h2 id="sg-blocks" className="service-guide__h2">
            {guide.blocksTitle}
          </h2>
          <div className="service-guide__blocks">
            {guide.blocks.map((block) => (
              <article key={block.title} className="service-guide__block">
                <h3 className="service-guide__h3">{block.title}</h3>
                <p className="service-guide__p">{block.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {guide.includesTitle && guide.includes?.length ? (
        <section className="service-guide__section" aria-labelledby="sg-includes">
          <h2 id="sg-includes" className="service-guide__h2">
            {guide.includesTitle}
          </h2>
          <ul className="service-guide__list">
            {guide.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="service-guide__section" aria-labelledby="sg-audience">
        <h2 id="sg-audience" className="service-guide__h2">
          {guide.audienceTitle}
        </h2>
        <p className="service-guide__p">{guide.audienceBody}</p>
        {guide.platformsTitle && guide.platforms?.length ? (
          <>
            <h3 className="service-guide__h3">{guide.platformsTitle}</h3>
            <ul className="service-guide__list service-guide__list--platforms">
              {guide.platforms.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}</strong>
                  {item.detail}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </section>

      <section className="service-guide__section" aria-labelledby="sg-process">
        <h2 id="sg-process" className="service-guide__h2">
          {guide.processTitle}
        </h2>
        <ol className="service-guide__steps">
          {guide.process.map((step, i) => (
            <li key={step.title}>
              <span className="service-guide__step-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <strong>{step.title}</strong>
                {step.body}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="service-guide__section" aria-labelledby="sg-cost">
        <h2 id="sg-cost" className="service-guide__h2">
          {guide.costTitle}
        </h2>
        <p className="service-guide__p">{guide.costBody}</p>
        <a className="service-guide__link" href={guide.costLinkHref}>
          {guide.costLinkLabel}
        </a>
      </section>

      {afterCost ? (
        <div className="service-guide__section service-guide__after-cost">
          {afterCost}
        </div>
      ) : null}

      <section className="service-guide__section" aria-labelledby="sg-faq">
        <h2 id="sg-faq" className="service-guide__h2">
          {guide.faqTitle}
        </h2>
        <ol className="facts facts--on-dark">
          {guide.faq.map((item, i) => (
            <FactRow
              key={item.q}
              index={i + 1}
              title={item.q}
              body={
                item.aLink ? (
                  <>
                    {item.a}
                    <a href={item.aLink.href}>{item.aLink.label}</a>.
                  </>
                ) : (
                  item.a
                )
              }
            />
          ))}
        </ol>
      </section>

      {guide.readMoreTitle && guide.readMore ? (
        <section className="service-guide__section" aria-labelledby="sg-readmore">
          <h2 id="sg-readmore" className="service-guide__h2">
            {guide.readMoreTitle}
          </h2>
          <a className="service-guide__link" href={guide.readMore.href}>
            {guide.readMore.label}
          </a>
        </section>
      ) : null}

      <section className="service-guide__section" aria-labelledby="sg-related">
        <h2 id="sg-related" className="service-guide__h2">
          {guide.relatedTitle}
        </h2>
        <ul className="service-guide__related">
          {guide.related.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
              <span>{item.blurb}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="service-guide__final" aria-labelledby="sg-final">
        <h2 id="sg-final" className="service-guide__h2">
          {guide.finalTitle}
        </h2>
        <button className="work__brief" type="button" onClick={onBrief}>
          {guide.cta} ↗
        </button>
      </section>
    </div>
  );
}
