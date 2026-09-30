import { Link } from "react-router-dom";
import { useLocale } from "../locale";
import { SITE_ORIGIN, pathFromView } from "../routing";
import { site } from "../site";

export function Privacy() {
  const { locale, t } = useLocale();
  const legalName = locale === "el" ? site.legal.nameEl : site.legal.nameEn;
  const legalForm = locale === "el" ? site.legal.formEl : site.legal.formEn;

  return (
    <article className="legal" data-chrome-tone="light" aria-labelledby="privacy-title">
      <header className="legal__head">
        <p className="legal__eyebrow">{t.privacyEyebrow}</p>
        <h1 id="privacy-title" className="legal__title">
          {t.privacyTitle}
        </h1>
        <p className="legal__meta">{t.privacyUpdated}</p>
      </header>

      <div className="legal__body">
        <p>
          {t.privacyIntro.replace("{name}", legalName).replace("{form}", legalForm)}
        </p>
        <p>
          <strong>{t.privacyControllerLabel}</strong>
          <br />
          {legalName} ({legalForm})
          <br />
          {t.privacyVatLabel}: {site.legal.vat}
          <br />
          {t.location}
          <br />
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {site.phone ? (
            <>
              <br />
              <a href={`tel:+30${site.phone.replace(/\D/g, "")}`}>{site.phone}</a>
            </>
          ) : null}
          <br />
          <a href={SITE_ORIGIN}>{SITE_ORIGIN.replace(/^https:\/\//, "")}</a>
        </p>

        {t.privacySections.map((section) => (
          <section key={section.heading} className="legal__section">
            <h2>{section.heading}</h2>
            {section.paragraphs?.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
            {section.bullets?.length ? (
              <ul>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <p className="legal__note">{t.privacyDisclaimer}</p>
      </div>

      <p className="legal__back">
        <Link to={pathFromView({ kind: "index" }, locale)}>{t.notFoundHome} ↗</Link>
      </p>
    </article>
  );
}
