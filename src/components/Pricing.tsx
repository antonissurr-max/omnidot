import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { Link } from "react-router-dom";
import { useInViewOnce } from "../hooks/useInViewOnce";
import { useLocale } from "../locale";
import { pathFromView } from "../routing";
import type { PageId } from "../types";

const DOT_TONES = ["blue", "pink", "green", "sand"] as const;

/** Center-based coords (%). Top pair closer in, bottom pair wider. */
const LAYOUT = [
  { x: 28, y: 28, s: 1 },
  { x: 72, y: 28, s: 1 },
  { x: 22, y: 72, s: 1 },
  { x: 78, y: 72, s: 1 },
] as const;

const ORB_MEDIA: Record<
  string,
  { type: "image" | "video"; src: string; poster?: string }
> = {
  social: { type: "image", src: "/images/social.jpg" },
  content: {
    type: "video",
    src: "/videos/pricing-orb-content.mp4",
    poster: "/images/content.jpg",
  },
  performance: { type: "image", src: "/images/performance.jpg" },
  web: { type: "image", src: "/images/web.jpg" },
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
  const [openId, setOpenId] = useState<string | null>(null);
  /** Defer heavy orb mp4 until hover/focus — poster shows first. */
  const [orbVideoArmed, setOrbVideoArmed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { ref: bottomRef, visible: revealBottom } = useInViewOnce<HTMLElement>(
    0.18,
    "0px 0px -8% 0px",
  );
  const openPlan = openId ? plans.find((p) => p.id === openId) : null;

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
              <span className="pricing-hero__title-sub">{t.pricingTitleSub}</span>
            </h1>
          </div>

          <div className="pricing-field" aria-hidden={openId ? true : undefined}>
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
                      "--oi": index,
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
                      <span
                        className="pricing-orb__media"
                        aria-hidden="true"
                        onMouseEnter={() => {
                          if (media.type === "video") setOrbVideoArmed(true);
                        }}
                        onFocus={() => {
                          if (media.type === "video") setOrbVideoArmed(true);
                        }}
                      >
                        {media.type === "video" ? (
                          <>
                            {media.poster ? (
                              <img
                                src={media.poster}
                                alt=""
                                loading="lazy"
                                decoding="async"
                              />
                            ) : null}
                            {orbVideoArmed || isOpen ? (
                              <video
                                src={media.src}
                                poster={media.poster}
                                muted
                                loop
                                playsInline
                                autoPlay
                                preload="metadata"
                                title={plan.name}
                              />
                            ) : null}
                          </>
                        ) : (
                          <img
                            src={media.src}
                            alt=""
                            loading="lazy"
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
                <h2
                  id={`pricing-module-title-${openPlan.id}`}
                  className="pricing-module__title"
                >
                  {openPlan.name}
                </h2>
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
