import { useEffect } from "react";

type Tone = "dark" | "light";

const DARK_LUMA = 0.52;

function parseRgba(input: string): { r: number; g: number; b: number; a: number } | null {
  const value = input.trim().toLowerCase();
  if (!value || value === "transparent") return null;

  const hex = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(value);
  if (hex) {
    let h = hex[1];
    if (h.length === 3 || h.length === 4) {
      h = h
        .split("")
        .map((c, i) => (i < (h.length === 3 ? 3 : 4) ? c + c : c + c))
        .join("")
        .slice(0, h.length === 3 ? 6 : 8);
    }
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
    return { r, g, b, a };
  }

  const rgb = /^rgba?\(\s*([.\d]+)\s*[,\s]\s*([.\d]+)\s*[,\s]\s*([.\d]+)(?:\s*[,/]\s*([.\d%]+))?\s*\)$/.exec(
    value,
  );
  if (!rgb) return null;
  const aRaw = rgb[4];
  const a =
    aRaw == null
      ? 1
      : aRaw.endsWith("%")
        ? Number.parseFloat(aRaw) / 100
        : Number.parseFloat(aRaw);
  return {
    r: Number.parseFloat(rgb[1]),
    g: Number.parseFloat(rgb[2]),
    b: Number.parseFloat(rgb[3]),
    a: Number.isFinite(a) ? a : 1,
  };
}

function relativeLuma(r: number, g: number, b: number) {
  const toLin = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
}

function toneFromColor(color: string): Tone | null {
  const rgba = parseRgba(color);
  if (!rgba || rgba.a < 0.35) return null;
  return relativeLuma(rgba.r, rgba.g, rgba.b) < DARK_LUMA ? "dark" : "light";
}

function toneFromNode(node: Element | null): Tone | null {
  let el: Element | null = node;
  while (el && el !== document.documentElement) {
    if (el instanceof HTMLElement) {
      const hint = el.dataset.chromeTone;
      if (hint === "dark" || hint === "light") return hint;
    }

    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS") return "dark";

    const style = getComputedStyle(el);
    if (style.visibility === "hidden" || style.display === "none") {
      el = el.parentElement;
      continue;
    }

    const fromBg = toneFromColor(style.backgroundColor);
    if (fromBg) return fromBg;

    if (style.backgroundImage && style.backgroundImage !== "none") {
      // Photo / gradient fills under the chrome — treat as dark for contrast.
      return "dark";
    }

    el = el.parentElement;
  }

  const root = toneFromColor(getComputedStyle(document.body).backgroundColor);
  return root ?? "light";
}

function sampleTone(chrome: HTMLElement): Tone {
  const marked: HTMLElement[] = [];
  const prev = new Map<HTMLElement, string>();
  const freeze = (el: HTMLElement) => {
    if (prev.has(el)) return;
    prev.set(el, el.style.pointerEvents);
    el.style.pointerEvents = "none";
    marked.push(el);
  };
  freeze(chrome);
  chrome.querySelectorAll<HTMLElement>("*").forEach(freeze);

  try {
    const rect = chrome.getBoundingClientRect();
    const y = Math.min(
      window.innerHeight - 2,
      Math.max(2, rect.top + Math.min(28, Math.max(12, rect.height * 0.55))),
    );
    const xs = [
      Math.max(8, rect.left + 28),
      rect.left + rect.width * 0.5,
      Math.min(window.innerWidth - 8, rect.right - 28),
    ];

    let darkVotes = 0;
    let lightVotes = 0;
    for (const x of xs) {
      const hit = document.elementFromPoint(x, y);
      const tone = toneFromNode(hit);
      if (tone === "dark") darkVotes += 1;
      else lightVotes += 1;
    }

    return darkVotes >= lightVotes ? "dark" : "light";
  } finally {
    for (const el of marked) {
      el.style.pointerEvents = prev.get(el) ?? "";
    }
  }
}

/**
 * Keeps `.stage.is-chrome-on-dark` in sync with whatever sits under the fixed header
 * (pages, panels, pricing modules, media).
 */
export function useChromeTone(active = true) {
  useEffect(() => {
    if (!active) return;

    const stage = document.querySelector(".stage");
    const chrome = document.querySelector<HTMLElement>(".chrome");
    if (!stage || !chrome) return;

    let raf = 0;
    let last: Tone | null = null;

    const apply = (tone: Tone) => {
      if (tone === last) return;
      last = tone;
      stage.classList.toggle("is-chrome-on-dark", tone === "dark");
    };

    const measure = () => {
      raf = 0;
      apply(sampleTone(chrome));
    };

    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(measure);
    };

    measure();

    const onScroll = () => schedule();
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", schedule, { passive: true });

    const mo = new MutationObserver(schedule);
    mo.observe(stage, {
      attributes: true,
      attributeFilter: ["class", "data-chrome-tone"],
      childList: true,
      subtree: true,
    });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", schedule);
      mo.disconnect();
      stage.classList.remove("is-chrome-on-dark");
    };
  }, [active]);
}
