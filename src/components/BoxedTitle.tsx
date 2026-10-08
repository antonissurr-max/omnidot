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
      if (!el.closest(".work--guide")) return;
      if (window.matchMedia("(max-width: 899px)").matches) return;

      const max = parseFloat(getComputedStyle(el).fontSize);
      let size = max;
      const min = 14;
      while (el.scrollWidth > el.clientWidth + 1 && size > min) {
        size -= 0.5;
        el.style.fontSize = `${size}px`;
      }
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);
    window.addEventListener("resize", fit);
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
        </span>
      ))}
    </h1>
  );
}
