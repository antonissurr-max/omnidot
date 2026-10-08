import { useLayoutEffect, useRef } from "react";

/** Word-level title — one line on guide pages, scaled to the meta περασιά */
export function BoxedTitle({ text }: { text: string }) {
  const words = text.split(/\s+/).filter(Boolean);
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      el.style.fontSize = "";
      const guideEl = el.closest(".work--guide");
      if (!guideEl) return;

      if (window.matchMedia("(max-width: 899px)").matches) {
        (guideEl as HTMLElement).style.removeProperty("--guide-peirasia");
        (guideEl as HTMLElement).style.removeProperty("--guide-card");
        return;
      }

      const head = el.closest(".work__head");
      const lastMeta = head?.querySelector(".work__meta-item:last-child");
      let maxW = el.clientWidth;

      if (head instanceof HTMLElement && lastMeta instanceof HTMLElement) {
        const headLeft = head.getBoundingClientRect().left;
        let textRight = headLeft;
        lastMeta.querySelectorAll("span, strong").forEach((node) => {
          textRight = Math.max(textRight, node.getBoundingClientRect().right);
        });
        maxW = Math.max(0, textRight - headLeft);
        const colW = head.clientWidth;
        (guideEl as HTMLElement).style.setProperty(
          "--guide-peirasia",
          `${maxW}px`,
        );
        (guideEl as HTMLElement).style.setProperty(
          "--guide-card",
          `${Math.max(0, (colW * 0.7 - 14) / 2)}px`,
        );
      }

      let size = parseFloat(getComputedStyle(el).fontSize);
      const min = 14;
      while (el.scrollWidth > maxW + 1 && size > min) {
        size -= 0.5;
        el.style.fontSize = `${size}px`;
      }
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);
    const head = el.closest(".work__head");
    if (head) ro.observe(head);
    const meta = head?.querySelector(".work__meta");
    if (meta) ro.observe(meta);
    window.addEventListener("resize", fit);
    document.fonts?.ready?.then(() => fit()).catch(() => {});
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [text]);

  return (
    <h1 ref={ref} className="boxed-title" aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="boxed-title__word"
          style={{ ["--d" as string]: `${i * 120}ms` }}
        >
          {word}
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </h1>
  );
}
