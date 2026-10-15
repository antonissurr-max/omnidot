import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { Link } from "react-router-dom";
import { LazyVideo } from "./LazyVideo";
import { useInViewOnce } from "../hooks/useInViewOnce";
import { useLocale } from "../locale";
import { pathFromView } from "../routing";
import type { PageId } from "../types";

const DOT_TONES = ["blue", "pink", "green", "sand", "slate"] as const;
const OMNI_ID = "omnichannel" as const;

/**
 * Center-based coords (%). Top pair, mid sides, SEO under the title.
 * Omnichannel sits separately above the title (see OMNI_LAYOUT).
 */
const LAYOUT = [
  { x: 18, y: 36, s: 1 },
  { x: 82, y: 36, s: 1 },
  { x: 16, y: 64, s: 1 },
  { x: 84, y: 64, s: 1 },
  { x: 50, y: 88, s: 1 },
] as const;

/** Centered above the Packages & pricing title. */
const OMNI_LAYOUT = { x: 50, y: 14, s: 1 } as const;

const ORB_MEDIA: Record<
  string,
  { type: "image" | "video"; src: string; poster?: string }
> = {
  social: { type: "image", src: "/images/social.webp" },
  content: {
    type: "video",
    src: "/videos/pricing-orb-content-preview.mp4",
    poster: "/images/content.webp",
  },
  performance: {
    type: "video",
    src: "/videos/pricing-hero.mp4",
    poster: "/images/performance.webp",
  },
  web: { type: "image", src: "/images/web.webp" },
  seo: { type: "image", src: "/images/seo.webp" },
  omnichannel: { type: "image", src: "/images/omnichannel.webp" },
};

export function Pricing({
  ready = true,
  exiting = false,
  onClose,
  onBrief,
  onModuleOpenChange,
}: {
  ready?: boolean;
  exiting?: boolean;
  onClose: () => void;
  onBrief: (interest?: PageId) => void;
  onModuleOpenChange?: (open: boolean) => void;
}) {
  const { locale, t } = useLocale();
  const plans = t.pricingPlans;
  const omni = t.pricingOmnichannel;
  const [openId, setOpenId] = useState<string | null>(null);
  // Match first client paint to viewport so mobile never mounts LazyVideo (CLS 0).
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 799px)").matches
      : false,
  );
  const [saveData, setSaveData] = useState(() =>
    typeof navigator !== "undefined" &&
    Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData,
    ),
  );
  const { ref: bottomRef, visible: revealBottom } = useInViewOnce<HTMLElement>(
    0.18,
    "0px 0px -8% 0px",
  );
  const openPlan = openId ? plans.find((p) => p.id === openId) : null;
  const omniOpen = openId === OMNI_ID;
  const preferOrbPoster = isMobile || saveData;

  const closeModule = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    onModuleOpenChange?.(Boolean(openId));
  }, [openId, onModuleOpenChange]);

  useEffect(() => {
    return () => onModuleOpenChange?.(false);
  }, [onModuleOpenChange]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 799px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setSaveData(
      Boolean(
        (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection?.saveData,
      ),
    );
  }, []);

  useEffect(() => {
    if (!ready || exiting) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openId) {
        e.preventDefault();
        e.stopPropagation();
        setOpenId(null);
        return;
      }
      onClose();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [ready, exiting, openId, onClose]);

  useEffect(() => {
    if (openId) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [openId]);

  const onFieldClick = (e: ReactMouseEvent<HTMLElement>) => {
    if (!openId) return;
    if ((e.target as HTMLElement).closest("[data-pricing-module]")) return;
    if ((e.target as HTMLElement).closest("[data-pricing-dot]")) return;
    closeModule();
  };

  const omniDimmed = openId != null && !omniOpen;

  return (
    <div
      className={`pricing-page${exiting ? " is-exit" : ""}${ready ? " is-ready" : ""}${
        openId ? " is-module-open" : ""
      }${isMobile ? " is-mobile" : ""}`}
      data-chrome-tone="light"
      aria-label={t.pricingTitle}
    >
      <section className="pricing-track">
        <div className="pricing-pin" data-chrome-tone="light" onClick={onFieldClick}>
          <div className="pricing-hero__title-wrap">
            <h1 className="pricing-hero__title">
              <span className="pricing-hero__title-lead">{t.pricingTitleLead}</span>
              {" "}
              <span className="pricing-hero__title-sub">{t.pricingTitleSub}</span>
            </h1>
          </div>

          <div className="pricing-field" aria-hidden={openId ? true : undefined}>
            <button
              type="button"
              data-pricing-dot
              className={`pricing-orb pricing-orb--omni${omniOpen ? " is-open" : ""}${
                omniDimmed ? " is-dimmed" : ""
              }`}
              style={
                {
                  "--ox": `${OMNI_LAYOUT.x}%`,
                  "--oy": `${OMNI_LAYOUT.y}%`,
                  "--os": OMNI_LAYOUT.s,
                  "--oi": 0,
                } as CSSProperties
              }
              onClick={(e) => {
                e.stopPropagation();
                setOpenId(OMNI_ID);
              }}
              aria-expanded={omniOpen}
              aria-controls={`pricing-module-${OMNI_ID}`}
            >
              <span className="pricing-orb__ring">
                <span className="pricing-orb__media" aria-hidden="true">
                  <img
                    src={ORB_MEDIA.omnichannel.src}
                    alt=""
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </span>
                <span className="pricing-orb__shade" aria-hidden="true" />
                <span className="pricing-orb__copy">
                  <span className="pricing-orb__name">{omni.name}</span>
                </span>
              </span>
            </button>

            {plans.map((plan, index) => {
              const layout = LAYOUT[index % LAYOUT.length];
              const tone = DOT_TONES[index % DOT_TONES.length];
              const media = ORB_MEDIA[plan.id];
              const isOpen = openId === plan.id;
              const dimmed = openId != null && !isOpen;
              return (
                <button
                  key={plan.id}
                  type="button"
                  data-pricing-dot
                  className={`pricing-orb pricing-orb--${tone}${isOpen ? " is-open" : ""}${
                    dimmed ? " is-dimmed" : ""
                  }`}
                  style={
                    {
                      "--ox": `${layout.x}%`,
                      "--oy": `${layout.y}%`,
                      "--os": layout.s,
                      "--oi": index + 1,
                    } as CSSProperties
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenId(plan.id);
                  }}
                  aria-expanded={isOpen}
                  aria-controls={`pricing-module-${plan.id}`}
                >
                  <span className="pricing-orb__ring">
                    {media ? (
                      <span className="pricing-orb__media" aria-hidden="true">
                        {media.type === "video" &&
                        !preferOrbPoster &&
                        index >= 2 ? (
                          <LazyVideo
                            src={media.src}
                            poster={media.poster}
                            title={plan.name}
                            width={540}
                            height={540}
                          />
                        ) : (
                          <img
                            src={
                              media.type === "video"
                                ? (media.poster ?? media.src)
                                : media.src
                            }
                            alt=""
                            loading={index < 2 ? "eager" : "lazy"}
                            decoding="async"
                          />
                        )}
                      </span>
                    ) : null}
                    <span className="pricing-orb__shade" aria-hidden="true" />
                    <span className="pricing-orb__copy">
                      <span className="pricing-orb__name">{plan.name}</span>
                      <span className="pricing-orb__price">{plan.price}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {omniOpen ? (
            <div
              className="pricing-module"
              data-pricing-module
              data-chrome-tone="light"
              id={`pricing-module-${OMNI_ID}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`pricing-module-title-${OMNI_ID}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="pricing-module__close"
                onClick={closeModule}
                aria-label={t.close}
              >
                ×
              </button>
              <div className="pricing-module__body pricing-module__body--omni">
                <p className="pricing-module__kicker">{t.pricing}</p>
                <h3
                  id={`pricing-module-title-${OMNI_ID}`}
                  className="pricing-module__title"
                >
                  {omni.name}
                </h3>
                <p className="pricing-module__subtitle">{omni.subtitle}</p>
                <p className="pricing-module__blurb">{omni.body}</p>
                <p className="pricing-module__includes">{omni.includesHeading}</p>
                <ul className="pricing-module__list">
                  {omni.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="pricing-module__includes">{omni.howHeading}</p>
                <p className="pricing-module__blurb pricing-module__blurb--tight">
                  {omni.howBody}
                </p>
                <button
                  type="button"
                  className="pricing-module__cta"
                  onClick={() => onBrief()}
                >
                  {omni.cta} ↗
                </button>
              </div>
            </div>
          ) : null}

          {openPlan ? (
            <div
              className="pricing-module"
              data-pricing-module
              data-chrome-tone="light"
              id={`pricing-module-${openPlan.id}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`pricing-module-title-${openPlan.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="pricing-module__close"
                onClick={closeModule}
                aria-label={t.close}
              >
                ×
              </button>
              <div className="pricing-module__body">
                <p className="pricing-module__kicker">{t.pricing}</p>
                <h3
                  id={`pricing-module-title-${openPlan.id}`}
                  className="pricing-module__title"
                >
                  {openPlan.name}
                </h3>
                <p className="pricing-module__price">{openPlan.price}</p>
                <p className="pricing-module__blurb">{openPlan.blurb}</p>
                <ul className="pricing-module__list">
                  {openPlan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {openPlan.note ? (
                  <p className="pricing-module__important">{openPlan.note}</p>
                ) : null}
                <p className="pricing-module__note">{t.pricingNote}</p>
                <button
                  type="button"
                  className="pricing-module__cta"
                  onClick={() => onBrief(openPlan.id as PageId)}
                >
                  {t.pricingCta} ↗
                </button>
              </div>
            </div>
          ) : null}

          {openId ? (
            <button
              type="button"
              className="pricing-backdrop"
              aria-label={t.close}
              onClick={closeModule}
            />
          ) : null}
        </div>
      </section>

      <section className="pricing-plans" aria-label={t.pricingTitle} data-chrome-tone="dark">
        <p className="pricing-plans__intro">{t.pricingIntro}</p>
        {plans.map((plan) => (
          <section key={plan.id} className="pricing-plans__plan">
            <h2 className="pricing-plans__name">{plan.name}</h2>
            <p className="pricing-plans__lede">
              {plan.price}. {plan.blurb}
            </p>
            <ul className="pricing-plans__list">
              {plan.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {plan.note ? <p className="pricing-plans__note">{plan.note}</p> : null}
          </section>
        ))}
      </section>

      <section
        className="pricing-omni"
        aria-labelledby="pricing-omni-title"
        data-chrome-tone="dark"
      >
        <h2 id="pricing-omni-title" className="pricing-omni__name">
          {omni.name}
        </h2>
        <p className="pricing-omni__subtitle">{omni.subtitle}</p>
        <p className="pricing-omni__body">{omni.body}</p>
        <h3 className="pricing-omni__subhead">{omni.includesHeading}</h3>
        <ul className="pricing-omni__list">
          {omni.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3 className="pricing-omni__subhead">{omni.howHeading}</h3>
        <p className="pricing-omni__body">{omni.howBody}</p>
        <Link
          className="pricing-omni__cta"
          to={pathFromView({ kind: "about" }, locale)}
        >
          {omni.cta} ↗
        </Link>
      </section>

      <section
        className={`pricing-principles${revealBottom ? " is-visible" : ""}`}
        ref={bottomRef}
        data-chrome-tone="dark"
      >
        <p className="pricing-principles__eyebrow">{t.pricingPrinciplesEyebrow}</p>
        <h2 className="pricing-principles__title">{t.pricingPrinciplesTitle}</h2>
        <ul className="pricing-principles__list">
          {t.pricingPrinciples.map((line, i) => (
            <li key={line} style={{ "--ri": i } as CSSProperties}>
              {line}
            </li>
          ))}
        </ul>
      </section>

      <section
        className={`pricing-faq${revealBottom ? " is-visible" : ""}`}
        aria-labelledby="pricing-faq-title"
        data-chrome-tone="dark"
      >
        <p className="pricing-faq__eyebrow">{t.pricingFaqEyebrow}</p>
        <h2 id="pricing-faq-title" className="pricing-faq__title">
          {t.pricingFaqTitle}
        </h2>
        <dl className="pricing-faq__list">
          {t.pricingFaq.map((item, i) => (
            <div
              key={item.q}
              className="pricing-faq__item"
              style={{ "--ri": i } as CSSProperties}
            >
              <dt>{item.q}</dt>
              <dd>{item.a}</dd>
            </div>
          ))}
        </dl>
        <div className="pricing-principles__foot">
          <button
            type="button"
            className="pricing-principles__brief"
            onClick={() => onBrief()}
          >
            {t.startBrief} ↗
          </button>
          <Link
            className="pricing-principles__home"
            to={pathFromView({ kind: "index" }, locale)}
          >
            {t.footerHome}
          </Link>
        </div>
      </section>
    </div>
  );
}
