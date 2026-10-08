import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { openConsentPreferences } from "../consent";
import { useInViewOnce } from "../hooks/useInViewOnce";
import { formatPhoneDisplay, pages, phoneHref, site, socials } from "../site";
import { useLocale } from "../locale";
import { pathFromView } from "../routing";
import { BrandWord } from "./BrandWord";

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.5c-3.4 0-6.2 2.7-6.2 6.1 0 4.4 5.4 11.2 5.7 11.5a.7.7 0 0 0 1 0c.3-.3 5.7-7.1 5.7-11.5 0-3.4-2.8-6.1-6.2-6.1Zm0 8.4a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6Z"
      />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7.2 3.6c.4-.4 1-.5 1.5-.3l2.2 1c.5.2.8.7.8 1.2v2.3c0 .4-.2.8-.6 1l-1.3.7a11.4 11.4 0 0 0 5.1 5.1l.7-1.3c.2-.4.6-.6 1-.6h2.3c.5 0 1 .3 1.2.8l1 2.2c.2.5.1 1.1-.3 1.5l-1.2 1.2c-.4.4-1 .6-1.6.5-3.3-.4-6.4-2.2-8.8-4.6S4.1 9.4 3.7 6.1c-.1-.6.1-1.2.5-1.6l1-1Z"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Zm2.2.5 5.3 3.7c.3.2.7.2 1 0L18 7H6.2Zm12.3 1.7-5.5 3.8a2.2 2.2 0 0 1-2.4 0L5.1 8.7V17c0 .3.2.5.5.5h13c.3 0 .5-.2.5-.5V8.7Z"
      />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.5 8.5V6.8c0-.6.1-.9.9-.9h1.6V3h-2.2c-2.5 0-3.8 1.5-3.8 4v1.5H8.5V12h2.5v9h3.5v-9h2.4l.4-3.5h-2.8Z"
      />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm6.1-8.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 3.5c-2.3 0-2.6 0-3.5.1-2.2.1-3.9 1.8-4 4-.1.9-.1 1.2-.1 3.5s0 2.6.1 3.5c.1 2.2 1.8 3.9 4 4 .9.1 1.2.1 3.5.1s2.6 0 3.5-.1c2.2-.1 3.9-1.8 4-4 .1-.9.1-1.2.1-3.5s0-2.6-.1-3.5c-.1-2.2-1.8-3.9-4-4-.9-.1-1.2-.1-3.5-.1Zm0 1.5c2.2 0 2.5 0 3.4.1 1.6.1 2.9 1.4 3 3 .1.9.1 1.1.1 3.4s0 2.5-.1 3.4c-.1 1.6-1.4 2.9-3 3-.9.1-1.2.1-3.4.1s-2.5 0-3.4-.1c-1.6-.1-2.9-1.4-3-3-.1-.9-.1-1.1-.1-3.4s0-2.5.1-3.4c.1-1.6 1.4-2.9 3-3 .9-.1 1.2-.1 3.4-.1Z"
      />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.3 9.2H3.5V20h2.8V9.2ZM4.9 4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM20.5 13.2c0-3-1.6-4.4-3.7-4.4-1.7 0-2.5.9-2.9 1.6V9.2h-2.8c0 .8 0 10.8 0 10.8h2.8v-6c0-.3 0-.7.1-1 .3-.7.9-1.5 2-1.5 1.4 0 2 1.1 2 2.6V20h2.8v-6.8Z"
      />
    </svg>
  );
}

const socialIcons = {
  facebook: IconFacebook,
  instagram: IconInstagram,
  linkedin: IconLinkedIn,
} as const;

export function Footer() {
  const year = new Date().getFullYear();
  const { locale, t } = useLocale();
  const callHref = site.phone ? phoneHref(site.phone) : "";
  const callLabel = site.phone ? formatPhoneDisplay(site.phone) : "";
  const { ref, visible } = useInViewOnce<HTMLElement>();

  return (
    <footer
      ref={ref}
      className={`site-foot${visible ? " is-visible" : ""}`}
      data-chrome-tone="dark"
    >
      <div className="site-foot__inner">
        <div className="site-foot__brand" style={{ "--ri": 0 } as CSSProperties}>
          <Link
            to={pathFromView({ kind: "index" }, locale)}
            className="site-foot__mark"
            aria-label={site.brand}
          >
            <BrandWord />
          </Link>
          <p className="site-foot__tag">{t.footerStudio}</p>
        </div>

        <div className="site-foot__col" style={{ "--ri": 1 } as CSSProperties}>
          <h3 className="site-foot__heading">{t.footerMenu}</h3>
          <nav className="site-foot__list" aria-label={t.footerMenu}>
            <Link to={pathFromView({ kind: "index" }, locale)}>
              {t.footerHome}
            </Link>
            <Link to={pathFromView({ kind: "pricing" }, locale)}>{t.pricing}</Link>
            <Link to={pathFromView({ kind: "articles" }, locale)}>{t.articles}</Link>
            <Link to={pathFromView({ kind: "about" }, locale)}>{t.about}</Link>
            <Link to={pathFromView({ kind: "about" }, locale)}>
              {t.startBrief}
            </Link>
            <Link to={pathFromView({ kind: "privacy" }, locale)}>
              {t.privacyLink}
            </Link>
            <button type="button" className="site-foot__text-btn" onClick={openConsentPreferences}>
              {t.cookieSettings}
            </button>
          </nav>
        </div>

        <div className="site-foot__col" style={{ "--ri": 2 } as CSSProperties}>
          <h3 className="site-foot__heading">{t.footerServices}</h3>
          <nav className="site-foot__list" aria-label={t.footerServices}>
            {pages.map((page) => (
              <Link
                key={page.id}
                to={pathFromView({ kind: "page", id: page.id }, locale)}
              >
                {t.pages[page.id].title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="site-foot__col" style={{ "--ri": 3 } as CSSProperties}>
          <h3 className="site-foot__heading">{t.footerContact}</h3>
          <ul className="site-foot__contact">
            <li>
              <span className="site-foot__icon" aria-hidden="true">
                <IconPin />
              </span>
              <span>{t.location}</span>
            </li>
            {callHref ? (
              <li>
                <span className="site-foot__icon" aria-hidden="true">
                  <IconPhone />
                </span>
                <a href={`tel:${callHref}`}>{callLabel}</a>
              </li>
            ) : null}
            {site.email ? (
              <li>
                <span className="site-foot__icon" aria-hidden="true">
                  <IconMail />
                </span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            ) : null}
          </ul>

          <nav className="site-foot__social" aria-label={t.footerSocial}>
            {socials.map((social) => {
              const Icon = socialIcons[social.id];
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <Icon />
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      <p className="site-foot__copy" style={{ "--ri": 4 } as CSSProperties}>
        © {year} {site.brand}. {t.rights}
      </p>
    </footer>
  );
}
