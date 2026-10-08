import { useEffect, useRef, useState, type ReactNode } from "react";
import type { MediaItem } from "../site";
import { ExhibitGallery, mediaIsVideo } from "./ExhibitGallery";

function thumbSrc(item: MediaItem) {
  if (mediaIsVideo(item)) return item.poster ?? item.src;
  return item.src;
}

/** Videos first so the carousel opens on a clip; stills keep their relative order. */
function orderSlides(media: MediaItem[]): MediaItem[] {
  const videos = media.filter((item) => mediaIsVideo(item));
  const stills = media.filter((item) => !mediaIsVideo(item));
  return [...videos, ...stills];
}

function RelatedCover({ item }: { item: MediaItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!mediaIsVideo(item)) return;
    const el = videoRef.current;
    if (!el) return;
    const tryPlay = () => {
      void el.play().catch(() => {
        /* autoplay may be blocked */
      });
    };
    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("canplay", tryPlay);
    return () => {
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
    };
  }, [item.src]);

  if (mediaIsVideo(item)) {
    return (
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-hidden="true"
      />
    );
  }

  return <img src={item.src} alt="" loading="lazy" decoding="async" />;
}

export function CaseStudy({
  title,
  story,
  value,
  notes,
  links,
  media,
  backdrop,
  did,
  task,
  metaLabels,
  related,
  onSelectRelated,
  onBack,
  backLabel,
  onZoom,
  zoomLabel,
  prevLabel,
  nextLabel,
  brief,
}: {
  title: string;
  story?: string;
  value?: string;
  notes?: string[];
  links?: { label: string; href: string }[];
  media: MediaItem[];
  backdrop?: string;
  did?: string;
  task: string;
  metaLabels: {
    company: string;
    task: string;
    result: string;
    did: string;
  };
  related?: { name: string; cover?: MediaItem }[];
  onSelectRelated?: (name: string) => void;
  onBack: () => void;
  backLabel: string;
  onZoom: (index: number) => void;
  zoomLabel: string;
  prevLabel: string;
  nextLabel: string;
  brief?: ReactNode;
}) {
  const slides = orderSlides(media);
  const [active, setActive] = useState(0);
  const heroBg =
    backdrop ?? (slides[0] ? thumbSrc(slides[0]) : undefined);

  useEffect(() => {
    setActive(0);
  }, [media]);

  useEffect(() => {
    if (active >= slides.length) setActive(0);
  }, [active, slides.length]);

  const zoomOriginal = (slideIndex: number) => {
    const item = slides[slideIndex];
    if (!item) return;
    const original = media.findIndex((m) => m.src === item.src);
    onZoom(original >= 0 ? original : slideIndex);
  };

  return (
    <article className="case" aria-label={title}>
      <button className="case__back" type="button" onClick={onBack}>
        ← {backLabel}
      </button>

      <section className={`case__stage${heroBg ? " has-bg" : ""}`}>
        {heroBg ? (
          <img
            className="case__stage-bg"
            src={heroBg}
            alt=""
            aria-hidden="true"
            decoding="async"
          />
        ) : null}
        <div className="case__stage-veil" aria-hidden="true" />

        <div className="case__stage-inner">
          {slides.length > 0 ? (
            <div className="case__carousel">
              <ExhibitGallery
                items={slides}
                active={active}
                onSelect={setActive}
                onZoom={zoomOriginal}
                zoomLabel={zoomLabel}
                prevLabel={prevLabel}
                nextLabel={nextLabel}
              />
            </div>
          ) : null}

          <h2 className="case__title">{title}</h2>
        </div>
      </section>

      <div className="case__copy">
        <h2 className="case__copy-title">{title}</h2>
        <div className="case__copy-body">
          {story ? <p>{story}</p> : null}
          {notes?.map((note) => (
            <p key={note} className="case__copy-note">
              {note}
            </p>
          ))}
          {did ? (
            <p className="case__copy-did">
              <span>{metaLabels.did}:</span> {did}
            </p>
          ) : null}
          {links?.map((link) => (
            <a
              key={link.href}
              className="case__link"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
        <dl className="case__meta">
          <div>
            <dt>{metaLabels.company}</dt>
            <dd>{title}</dd>
          </div>
          <div>
            <dt>{metaLabels.task}</dt>
            <dd>{task}</dd>
          </div>
          {value ? (
            <div>
              <dt>{metaLabels.result}</dt>
              <dd>{value}</dd>
            </div>
          ) : null}
        </dl>
      </div>

      {related && related.length > 0 && onSelectRelated ? (
        <div className="case__related">
          {related.map((item) => (
            <button
              key={item.name}
              type="button"
              className="case__related-card"
              onClick={() => onSelectRelated(item.name)}
            >
              {item.cover ? (
                <RelatedCover item={item.cover} />
              ) : (
                <span className="case__related-fallback" aria-hidden="true" />
              )}
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      ) : null}

      {brief ? <div className="case__brief">{brief}</div> : null}
    </article>
  );
}
