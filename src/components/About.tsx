import { useEffect, useRef, useState } from "react";
import { Contact } from "./Contact";
import { useLocale } from "../locale";
import type { PageId } from "../types";
import type { VerseWord } from "../i18n";
import { site } from "../site";

function VerseWordView({ word, revealed }: { word: VerseWord; revealed: boolean }) {
  if (word.kind === "stay") {
    const same = !word.close || word.close === word.open;
    if (same) {
      return <span className="about-verse__word about-verse__word--stay">{word.open}</span>;
    }
    // Only the active variant is in the DOM (fixes “a A” / «ένα Ένα» dual text).
    const text = revealed ? word.close! : word.open;
    return (
      <span className="about-verse__word about-verse__word--stay">
        <span
          className={`about-verse__swap${revealed ? " about-verse__swap--close" : " about-verse__swap--open"}`}
        >
          {text}
        </span>
      </span>
    );
  }

  if (word.kind === "go") {
    if (revealed) return null;
    return <span className="about-verse__word about-verse__word--go">{word.open}</span>;
  }

  if (!revealed) return null;
  return (
    <span className="about-verse__word about-verse__word--come">{word.close}</span>
  );
}

export function About({
  revealed,
  exiting = false,
  onGo,
  onToggleReveal,
  interest,
}: {
  revealed: boolean;
  exiting?: boolean;
  onClose: () => void;
  onGo: (id: PageId) => void;
  onToggleReveal: () => void;
  interest?: PageId;
}) {
  const { t } = useLocale();
  const pageIds = ["social", "content", "performance", "web"] as const;
  const layerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [spark] = useState(() => {
    const right = Math.random() > 0.5;
    return {
      top: `${18 + Math.random() * 36}%`,
      ...(right
        ? { right: `${2 + Math.random() * 10}%`, left: "auto" as const }
        : { left: `${2 + Math.random() * 10}%`, right: "auto" as const }),
    };
  });

  useEffect(() => {
    const layer = layerRef.current;
    const scroller = scrollRef.current;
    const stage = layer?.closest(".stage");
    if (!layer || !scroller || !stage) return;

    const mq = window.matchMedia("(max-width: 899px)");

    const update = () => {
      if (!mq.matches) {
        stage.classList.remove("is-about-end");
        return;
      }
      const atEnd =
        scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 56;
      stage.classList.toggle("is-about-end", atEnd);
    };

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    mq.addEventListener("change", update);

    return () => {
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", update);
      stage.classList.remove("is-about-end");
    };
  }, []);

  return (
    <div
      ref={layerRef}
      className={`about-layer${exiting ? " is-exit" : ""}`}
      data-chrome-tone="light"
      role="dialog"
      aria-modal="true"
      aria-label={t.about}
    >
      <div ref={scrollRef} className="about-layer__scroll">
        <div className={`about-layer__center ${revealed ? "is-revealed" : ""}`}>
          <div className="about-layer__intro">
            <button
              type="button"
              className="about-layer__spark"
              style={spark}
              aria-pressed={revealed}
              aria-label={revealed ? t.revealFull : t.revealShort}
              onClick={onToggleReveal}
            />

            <h1 className="about-layer__heading">{t.aboutHeading}</h1>

            <p className="about-layer__title about-verse" aria-live="polite">
              {t.aboutVerse.map((row) => (
                <span
                  key={row.id}
                  className={`about-verse__row${row.openOnly ? " about-verse__row--open-only" : ""}`}
                  style={{
                    ["--row-open" as string]: String(row.openRow),
                    ["--row-close" as string]: String(row.closeRow),
                  }}
                >
                  {row.words.map((word, i) => (
                    <VerseWordView key={`${row.id}-${i}`} word={word} revealed={revealed} />
                  ))}
                </span>
              ))}
            </p>

            <p className="about-layer__body">{t.aboutBody}</p>

            <ul className="about-layer__links">
              {pageIds.map((id) => (
                <li key={id}>
                  <button type="button" onClick={() => onGo(id)}>
                    {t.pages[id].title} ↗
                  </button>
                </li>
              ))}
            </ul>

            <p className="about-layer__contact-line">
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
              {" · "}
              <a href={`tel:${site.phone.replace(/\D/g, "")}`}>{site.phone}</a>
              {" · "}
              {t.location}
            </p>
          </div>

          <Contact tone="paper" interest={interest} />
        </div>
      </div>
    </div>
  );
}
