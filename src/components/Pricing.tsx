import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../locale";
import { pathFromView } from "../routing";
import type { PageId } from "../types";

const DOT_TONES = ["blue", "pink", "green", "sand"] as const;

/** Center-based coords (%). Top pair closer in, bottom pair wider. */
const LAYOUT = [
  { x: 28, y: 20, s: 1 },
  { x: 72, y: 20, s: 1 },
  { x: 20, y: 72, s: 1 },
  { x: 80, y: 72, s: 1 },
] as const;

const HERO_VIDEO = "/videos/pricing-hero.mp4";

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

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function smootherstep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

export function Pricing({
  ready = true,
  exiting = false,
  onClose,
  onBrief,
}: {
  ready?: boolean;
  exiting?: boolean;
  onClose: () => void;
  onBrief: (interest?: PageId) => void;
}) {
  const { locale, t } = useLocale();
  const plans = t.pricingPlans;
  const trackRef = useRef<HTMLElement>(null);
  const targetProgress = useRef(0);
  const animProgress = useRef(0);
  const rafId = useRef(0);
  const [openId, setOpenId] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [viewport, setViewport] = useState({ w: 1200, h: 800 });
  const openPlan = openId ? plans.find((p) => p.id === openId) : null;

  const closeModule = useCallback(() => setOpenId(null), []);

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

  useEffect(() => {
    if (!ready || exiting) return;

    let alive = true;
    let lastW = 0;
    let lastH = 0;

    const loop = () => {
      if (!alive) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w !== lastW || h !== lastH) {
        lastW = w;
        lastH = h;
        setViewport({ w, h });
      }

      const track = trackRef.current;
      if (track) {
        const rect = track.getBoundingClientRect();
        const range = Math.max(1, track.offsetHeight - h);
        const tgt = clamp(-rect.top / range, 0, 1);
        targetProgress.current = tgt;
        const cur = animProgress.current;
        const next =
          Math.abs(tgt - cur) < 0.0006 ? tgt : cur + (tgt - cur) * 0.16;
        if (next !== animProgress.current) {
          animProgress.current = next;
          setProgress(next);
        }
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);
    return () => {
      alive = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [ready, exiting]);

  useEffect(() => {
    const stage = document.querySelector(".stage");
    if (!stage) return;
    const dark = progress > 0.1;
    stage.classList.toggle("is-pricing-dark", dark);
    return () => {
      stage.classList.remove("is-pricing-dark");
    };
  }, [progress]);

  const onFieldClick = (e: ReactMouseEvent<HTMLElement>) => {
    if (!openId) return;
    if ((e.target as HTMLElement).closest("[data-pricing-module]")) return;
    if ((e.target as HTMLElement).closest("[data-pricing-dot]")) return;
    if ((e.target as HTMLElement).closest("[data-pricing-reel]")) return;
    closeModule();
  };

  const ease = smootherstep(progress);
  const circle = Math.min(280, Math.max(190, viewport.w * 0.22));
  const finalW = viewport.w;
  const finalH = viewport.h;
  const frameW = circle + (finalW - circle) * ease;
  const frameH = circle + (finalH - circle) * ease;
  const frameR = (1 - ease) * (Math.min(frameW, frameH) / 2);
  const frameTop = 78 - ease * 28;

  return (
    <div
      className={`pricing-page${exiting ? " is-exit" : ""}${ready ? " is-ready" : ""}${
        progress > 0.06 ? " is-past-hero" : ""
      }${progress > 0.45 ? " is-reel-open" : ""}${
        progress > 0.92 ? " is-reel-full" : ""
      }${openId ? " is-module-open" : ""}`}
      aria-label={t.pricingTitle}
      style={{ "--reel-p": String(progress) } as CSSProperties}
    >
      <section ref={trackRef} className="pricing-track">
        <div className="pricing-pin" onClick={onFieldClick}>
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
                        {media.type === "video" ? (
                          <>
                            {media.poster ? (
                              <img src={media.poster} alt="" />
                            ) : null}
                            <video
                              src={media.src}
                              poster={media.poster}
                              muted
                              loop
                              playsInline
                              autoPlay
                              preload="auto"
                              title={plan.name}
                            />
                          </>
                        ) : (
                          <img src={media.src} alt="" />
                        )}
                      </span>
                    ) : null}
                    <span className="pricing-orb__shade" aria-hidden="true" />
                    <span className="pricing-orb__copy">
                      <span className="pricing-orb__kicker">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="pricing-orb__name">{plan.name}</span>
                      <span className="pricing-orb__price">{plan.price}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className="pricing-reel"
            data-pricing-reel
            aria-label={t.pricingReelLabel}
            style={
              {
                "--fw": `${frameW}px`,
                "--fh": `${frameH}px`,
                "--fr": `${frameR}px`,
                "--ft": `${frameTop}%`,
              } as CSSProperties
            }
          >
            <div className="pricing-reel__frame">
              {videoReady ? (
                <video
                  className="pricing-reel__video"
                  src={HERO_VIDEO}
                  autoPlay
                  muted
                  loop
                  playsInline
                  title={t.pricingReelLabel}
                  aria-label={t.pricingReelHint}
                  onClick={(e) => {
                    e.stopPropagation();
                    onBrief("web");
                  }}
                />
              ) : (
                <button
                  type="button"
                  className="pricing-reel__placeholder"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBrief("web");
                  }}
                >
                  <span className="pricing-reel__placeholder-label">
                    {t.pricingReelSoon}
                  </span>
                  <span className="pricing-reel__placeholder-hint">
                    {t.pricingReelHint}
                  </span>
                </button>
              )}
              <video
                className="sr-only"
                src={HERO_VIDEO}
                muted
                playsInline
                preload="metadata"
                onLoadedData={() => setVideoReady(true)}
                onError={() => setVideoReady(false)}
              />
            </div>
          </div>

          {openPlan ? (
            <div
              className="pricing-module"
              data-pricing-module
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

      <section className="pricing-principles">
        <p className="pricing-principles__eyebrow">{t.pricingPrinciplesEyebrow}</p>
        <h2 className="pricing-principles__title">{t.pricingPrinciplesTitle}</h2>
        <ul className="pricing-principles__list">
          {t.pricingPrinciples.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
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
