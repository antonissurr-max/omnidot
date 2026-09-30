import type { CSSProperties } from "react";
import { partners } from "../site";
import { useInViewOnce } from "../hooks/useInViewOnce";
import { useLocale } from "../locale";

export function Partners() {
  const { t } = useLocale();
  const { ref, visible } = useInViewOnce<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`partners${visible ? " is-visible" : ""}`}
      data-chrome-tone="dark"
      aria-label={t.trustedBy}
    >
      <div className="partners__inner">
        <header className="partners__head">
          <h2 className="partners__title">{t.trustedBy}</h2>
        </header>
        <ul className="partners__list">
          {partners.map((partner, i) => (
            <li key={partner.name} style={{ "--ri": i } as CSSProperties}>
              <a
                className="partners__link"
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                title={partner.name}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  width={220}
                  height={56}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
