import { Link, useLocation, useNavigate } from "react-router-dom";
import { BrandWord } from "./BrandWord";
import { Logo } from "./Logo";
import { useChromeTone } from "../hooks/useChromeTone";
import { useLocale } from "../locale";
import { pathForLocale, pathFromView } from "../routing";
import type { View } from "../types";

export function Chrome({
  view,
  onGo,
  aboutRevealed,
  onToggleAbout,
  hideClose = false,
}: {
  view: View;
  onGo: (next: View) => void;
  aboutRevealed: boolean;
  onToggleAbout: () => void;
  hideClose?: boolean;
}) {
  const { locale, t } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const onAbout = view.kind === "about";
  const onPricing = view.kind === "pricing";
  const onArticles = view.kind === "articles" || view.kind === "article";
  const onIndex = view.kind === "index";
  const BrandTag = onIndex ? "h1" : "p";
  const showBrand = onIndex || onAbout || onPricing;
  const onPanelClose = onAbout || onPricing || onArticles;

  useChromeTone(true);

  return (
    <header className="chrome">
      <div className="chrome__start">
        <Link
          className="chrome__logo"
          to={pathFromView({ kind: "index" }, locale)}
          aria-label={t.homeAria}
        >
          <Logo />
          <span className="chrome__word">
            <BrandWord />
          </span>
        </Link>

        <button
          className="chrome__lang"
          type="button"
          onClick={() => {
            const next = locale === "en" ? "el" : "en";
            navigate(pathForLocale(location.pathname, location.search, next));
          }}
          aria-label={t.langLabel}
        >
          {locale === "en" ? "EN" : "EL"}
        </button>
      </div>

      {onPanelClose && !hideClose ? (
        <button
          className="chrome__about"
          type="button"
          onClick={() => onGo({ kind: "index" })}
        >
          {t.close}
        </button>
      ) : !onPanelClose ? (
        <div className="chrome__end">
          {!onIndex ? (
            <Link
              className="chrome__home"
              to={pathFromView({ kind: "index" }, locale)}
            >
              {t.footerHome}
            </Link>
          ) : null}
          <Link
            className="chrome__pricing"
            to={pathFromView({ kind: "pricing" }, locale)}
          >
            {t.pricing}
          </Link>
          <Link
            className="chrome__articles"
            to={pathFromView({ kind: "articles" }, locale)}
          >
            {t.articles}
          </Link>
          <Link
            className="chrome__about"
            to={pathFromView({ kind: "about" }, locale)}
          >
            {onIndex || view.kind === "notfound" ? t.contactUs : t.about}
          </Link>
        </div>
      ) : null}

      {showBrand && (
        <BrandTag className={`chrome__brand${onAbout ? " is-about" : ""}`}>
          <BrandWord
            live={onAbout}
            revealed={aboutRevealed}
            onToggle={onToggleAbout}
          />
        </BrandTag>
      )}
    </header>
  );
}
