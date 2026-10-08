import { useEffect, useRef, useState, type ReactNode } from "react";
import { BoxedTitle } from "./BoxedTitle";
import { CaseStudy } from "./CaseStudy";
import { ServiceGuide } from "./ServiceGuide";
import { mediaIsVideo } from "./ExhibitGallery";
import { pageOrder, type MediaItem, type PageId } from "../site";
import { useLocale } from "../locale";
import type { ProofClient } from "../i18n";

function resolveClients(
  proof:
    | {
        client?: string;
        story?: string;
        value: string;
        notes?: string[];
        links?: { label: string; href: string }[];
        clients?: ProofClient[];
      }
    | undefined,
): ProofClient[] {
  if (!proof) return [];
  if (proof.clients?.length) return proof.clients;
  if (proof.client) {
    return [
      {
        client: proof.client,
        story: proof.story,
        value: proof.value,
        notes: proof.notes,
        links: proof.links,
      },
    ];
  }
  return [];
}

function clientCover(
  item: ProofClient,
  fallback: MediaItem[],
): MediaItem | undefined {
  if (item.cover) return item.cover;
  const media = item.media && item.media.length > 0 ? item.media : fallback;
  return media.find((m) => mediaIsVideo(m)) ?? media[0];
}

function ProjectCover({ item }: { item: MediaItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const contain = item.fit === "contain";

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
        className={contain ? "is-contain" : undefined}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        aria-hidden="true"
      />
    );
  }

  return (
    <img
      className={contain ? "is-contain" : undefined}
      src={item.src}
      alt=""
      loading="lazy"
      decoding="async"
    />
  );
}

export function WorkShow({
  id,
  media,
  children,
  exiting = false,
  onClose,
  onNavigate,
  onBrief,
}: {
  id: PageId;
  media?: MediaItem[];
  children?: ReactNode;
  exiting?: boolean;
  onClose: () => void;
  onNavigate: (id: PageId) => void;
  onBrief: () => void;
}) {
  const { t } = useLocale();
  const copy = t.pages[id];
  const pageGallery =
    media && media.length > 0
      ? media
      : id === "social"
        ? t.socialWork
        : id === "content"
          ? t.contentWork
          : id === "performance"
            ? t.performanceWork
            : id === "web"
              ? t.webWork
              : [];
  const clients = resolveClients(copy.proof);
  const isFolder = clients.length > 0;
  const [lightbox, setLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [openClient, setOpenClient] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeCase = clients.find((c) => c.client === openClient);
  const gallery = !isFolder
    ? pageGallery
    : !openClient
      ? []
      : activeCase?.media !== undefined
        ? activeCase.media
        : pageGallery;

  const viewingCase = Boolean(openClient && activeCase) || (!isFolder && gallery.length > 0);

  const i = pageOrder.indexOf(id);
  const prev = pageOrder[(i - 1 + pageOrder.length) % pageOrder.length];
  const next = pageOrder[(i + 1) % pageOrder.length];
  const current = gallery[lightboxIndex];

  useEffect(() => {
    setLightbox(false);
    setLightboxIndex(0);
    setOpenClient(null);
  }, [id]);

  useEffect(() => {
    setLightbox(false);
    setLightboxIndex(0);
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [openClient]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox) setLightbox(false);
        else if (openClient) setOpenClient(null);
        else onClose();
        return;
      }
      if (lightbox) return;
      if (e.key === "ArrowLeft") onNavigate(prev);
      if (e.key === "ArrowRight") onNavigate(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, openClient, onClose, onNavigate, prev, next]);

  const openZoom = (idx: number) => {
    setLightboxIndex(idx);
    setLightbox(true);
  };

  const guide = copy.serviceGuide;
  const briefLabel = guide?.cta ?? t.startBrief;
  const briefBtn = (
    <button className="work__brief" type="button" onClick={onBrief}>
      {briefLabel} ↗
    </button>
  );

  const related =
    isFolder && openClient
      ? clients
          .filter((c) => c.client !== openClient)
          .map((c) => {
            const media = clientCover(c, pageGallery);
            const cover =
              media && mediaIsVideo(media) && !media.poster && c.backdrop
                ? { ...media, poster: c.backdrop }
                : media;
            return { name: c.client, cover };
          })
      : undefined;

  const caseBlock = viewingCase ? (
    <CaseStudy
      title={activeCase?.client ?? copy.title}
      story={activeCase?.story}
      value={activeCase?.value}
      notes={activeCase?.notes}
      links={activeCase?.links}
      media={gallery}
      backdrop={activeCase?.backdrop}
      did={activeCase?.did}
      task={copy.title}
      metaLabels={{
        company: t.caseCompany,
        task: t.caseTask,
        result: t.caseResult,
        did: t.caseDid,
      }}
      related={related}
      onSelectRelated={(name) => setOpenClient(name)}
      onBack={() => {
        if (openClient) setOpenClient(null);
        else onClose();
      }}
      backLabel={openClient ? copy.title : t.close}
      onZoom={openZoom}
      zoomLabel={t.zoom}
      prevLabel={t.prevPhoto}
      nextLabel={t.nextPhoto}
      brief={briefBtn}
    />
  ) : null;

  const folderProof =
    isFolder ? (
      <div className="work__proof work__proof--folder">
        <span className="work__proof-label">{copy.proof?.label}</span>
        <div className="work__projects">
          {clients.map((item) => {
            const media = clientCover(item, pageGallery);
            const cover =
              media && mediaIsVideo(media) && !media.poster && item.backdrop
                ? { ...media, poster: item.backdrop }
                : media;
            return (
              <button
                key={item.client}
                className="work__project"
                type="button"
                onClick={() => setOpenClient(item.client)}
              >
                <span className="work__project-media">
                  {cover ? (
                    <ProjectCover item={cover} />
                  ) : (
                    <span className="work__project-empty" aria-hidden="true" />
                  )}
                </span>
                <span className="work__project-copy">
                  <span className="work__project-name">{item.client}</span>
                  {item.value ? (
                    <span className="work__project-value">{item.value}</span>
                  ) : item.media && item.media.length === 0 ? (
                    <span className="work__project-value">{t.mediaSoon}</span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    ) : null;

  const simpleProof =
    !isFolder && copy.proof ? (
      <div className="work__proof">
        <span className="work__proof-label">{copy.proof.label}</span>
        {copy.proof.links && copy.proof.links.length > 0 ? (
          <div className="work__proof-lines">
            {copy.proof.links.map((link) => (
              <a
                key={link.href}
                className="work__proof-line"
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : copy.proof.href ? (
          <a
            className="work__proof-line"
            href={copy.proof.href}
            target="_blank"
            rel="noreferrer"
          >
            {copy.proof.value}
          </a>
        ) : (
          <strong className="work__proof-line">{copy.proof.value}</strong>
        )}
      </div>
    ) : null;

  return (
    <div
      className={`work is-open${
        !viewingCase && gallery.length === 0 ? " work--text" : ""
      }${viewingCase ? " work--case" : ""}${guide ? " work--guide" : ""}${
        exiting ? " is-exit" : ""
      }`}
      data-chrome-tone="dark"
      role="dialog"
      aria-modal="true"
      aria-label={openClient ?? copy.title}
    >
      <div className="work__scroll" key={`${id}-${openClient ?? "list"}`} ref={scrollRef}>
        {viewingCase ? (
          caseBlock
        ) : (
          <>
            <header className="work__head">
              <div className="work__lead">
                <BoxedTitle text={copy.title} />

                <div className="work__meta">
                  {copy.meta.map((item) => (
                    <div key={item.label} className="work__meta-item">
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {folderProof}
              {simpleProof}
              {guide ? null : briefBtn}
            </header>
            {guide ? (
              <div className="work__body">
                <ServiceGuide guide={guide} onBrief={onBrief} />
              </div>
            ) : (
              children && <div className="work__body">{children}</div>
            )}
          </>
        )}
      </div>

      <button
        className="work__edge is-prev"
        type="button"
        onClick={() => onNavigate(prev)}
        aria-label={`${t.previous}: ${t.pages[prev].title}`}
      >
        <span>←</span>
        <span>{t.previous}</span>
      </button>
      <button
        className="work__edge is-next"
        type="button"
        onClick={() => onNavigate(next)}
        aria-label={`${t.next}: ${t.pages[next].title}`}
      >
        <span>→</span>
        <span>{t.next}</span>
      </button>

      {lightbox && current ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={() => setLightbox(false)}
        >
          {mediaIsVideo(current) ? (
            <video
              className="lightbox__media"
              src={current.src}
              controls
              autoPlay
              playsInline
              muted={false}
              title={current.title}
              aria-label={`${current.title}${current.detail ? ` — ${current.detail}` : ""}`}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              className="lightbox__media"
              src={current.src}
              alt={`${current.title}${current.detail ? ` — ${current.detail}` : ""}`}
              decoding="async"
            />
          )}
          <button
            className="lightbox__close"
            type="button"
            onClick={() => setLightbox(false)}
          >
            {t.close}
          </button>
        </div>
      ) : null}
    </div>
  );
}
