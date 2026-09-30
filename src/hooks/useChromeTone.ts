import { useEffect } from "react";

type Tone = "dark" | "light";

function stageFallbackTone(stage: Element): Tone {
  if (stage.classList.contains("is-work")) return "dark";
  if (
    stage.classList.contains("is-about") ||
    stage.classList.contains("is-privacy")
  ) {
    return "light";
  }
  // Pricing hero is light; dark principles/faq declare data-chrome-tone themselves.
  if (stage.classList.contains("is-pricing")) return "light";
  return "light";
}

/**
 * Keeps `.stage.is-chrome-on-dark` in sync with `[data-chrome-tone]` surfaces
 * that sit under the fixed header band (pages, panels, modules, media strips).
 */
export function useChromeTone(active = true) {
  useEffect(() => {
    if (!active) return;

    const stage = document.querySelector(".stage");
    const chrome = document.querySelector<HTMLElement>(".chrome");
    if (!stage || !chrome) return;

    const hits = new Map<Element, { tone: Tone; ratio: number; top: number }>();
    let io: IntersectionObserver | null = null;
    let raf = 0;
    let last: Tone | null = null;

    const apply = (tone: Tone) => {
      if (tone === last) return;
      last = tone;
      stage.classList.toggle("is-chrome-on-dark", tone === "dark");
    };

    const pickTone = (): Tone => {
      // Service panels are always dark — don't let ghost home sections win.
      if (stage.classList.contains("is-work")) return "dark";

      if (hits.size === 0) return stageFallbackTone(stage);

      let best: { tone: Tone; ratio: number; top: number } | null = null;
      for (const entry of hits.values()) {
        if (
          !best ||
          entry.ratio > best.ratio + 0.02 ||
          (Math.abs(entry.ratio - best.ratio) <= 0.02 && entry.top < best.top)
        ) {
          best = entry;
        }
      }
      return best?.tone ?? stageFallbackTone(stage);
    };

    const flush = () => {
      raf = 0;
      apply(pickTone());
    };

    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(flush);
    };

    const observeAll = () => {
      io?.disconnect();
      hits.clear();
      const band = Math.max(64, Math.ceil(chrome.getBoundingClientRect().bottom + 12));
      const bottomClip = Math.max(0, window.innerHeight - band);
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const toneAttr = (entry.target as HTMLElement).dataset.chromeTone;
            if (toneAttr !== "dark" && toneAttr !== "light") {
              hits.delete(entry.target);
              continue;
            }
            if (!entry.isIntersecting || entry.intersectionRatio <= 0) {
              hits.delete(entry.target);
              continue;
            }
            hits.set(entry.target, {
              tone: toneAttr,
              ratio: entry.intersectionRatio,
              top: entry.boundingClientRect.top,
            });
          }
          schedule();
        },
        {
          root: null,
          rootMargin: `0px 0px ${-bottomClip}px 0px`,
          threshold: [0, 0.05, 0.15, 0.3, 0.5, 0.75, 1],
        },
      );

      stage.querySelectorAll<HTMLElement>("[data-chrome-tone]").forEach((el) => {
        // Skip collapsed / invisible surfaces (dimmed home under work panels, etc.)
        const style = getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") return;
        if (Number.parseFloat(style.opacity || "1") < 0.05) return;
        io?.observe(el);
      });
      schedule();
    };

    // Apply route fallback immediately (covers service pages before IO settles).
    apply(stageFallbackTone(stage));
    observeAll();

    const onResize = () => observeAll();
    window.addEventListener("resize", onResize, { passive: true });

    const mo = new MutationObserver((records) => {
      let rescan = false;
      for (const record of records) {
        if (record.type === "attributes") {
          if (record.attributeName === "data-chrome-tone") rescan = true;
          if (record.attributeName === "class" && record.target === stage) {
            apply(pickTone());
            rescan = true;
          }
        }
        if (record.type === "childList") rescan = true;
      }
      if (rescan) observeAll();
    });
    mo.observe(stage, {
      attributes: true,
      attributeFilter: ["class", "data-chrome-tone"],
      childList: true,
      subtree: true,
    });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      io?.disconnect();
      mo.disconnect();
      stage.classList.remove("is-chrome-on-dark");
    };
  }, [active]);
}
