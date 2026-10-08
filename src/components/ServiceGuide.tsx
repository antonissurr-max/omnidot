import { FactRow } from "./ServicePanel";
import type { ServiceGuideCopy } from "../i18n";

export function ServiceGuide({
  guide,
  onBrief,
}: {
  guide: ServiceGuideCopy;
  onBrief: () => void;
}) {
  return (
    <div className="service-guide">
      <p className="service-guide__intro">{guide.intro}</p>
      <button className="work__brief" type="button" onClick={onBrief}>
        {guide.cta} ↗
      </button>

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

      <section className="service-guide__section" aria-labelledby="sg-audience">
        <h2 id="sg-audience" className="service-guide__h2">
          {guide.audienceTitle}
        </h2>
        <p className="service-guide__p">{guide.audienceBody}</p>
        <h3 className="service-guide__h3">{guide.platformsTitle}</h3>
        <ul className="service-guide__list service-guide__list--platforms">
          {guide.platforms.map((item) => (
            <li key={item.name}>
              <strong>{item.name}</strong>
              {item.detail}
            </li>
          ))}
        </ul>
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

      <section className="service-guide__section" aria-labelledby="sg-faq">
        <h2 id="sg-faq" className="service-guide__h2">
          {guide.faqTitle}
        </h2>
        <ol className="facts facts--on-dark">
          {guide.faq.map((item, i) => (
            <FactRow key={item.q} index={i + 1} title={item.q} body={item.a} />
          ))}
        </ol>
      </section>

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
