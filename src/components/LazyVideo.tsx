import { useEffect, useRef } from "react";

/** Muted looping video that plays only while in view; respects reduced motion. */
export function LazyVideo({
  src,
  poster,
  className,
  title,
  width,
  height,
}: {
  src: string;
  poster?: string;
  className?: string;
  title?: string;
  width?: number;
  height?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.pause();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          void el.play().catch(() => {
            /* autoplay may be blocked */
          });
        } else {
          el.pause();
        }
      },
      { threshold: [0, 0.25, 0.5] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      width={width}
      height={height}
      title={title}
      aria-hidden="true"
    />
  );
}
