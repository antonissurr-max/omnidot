import { Fragment } from "react";

/** Word-level boxed title — like A M PHOTOGRAPHER */
export function BoxedTitle({ text }: { text: string }) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <h1 className="boxed-title" aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            className="boxed-title__word"
            style={{ ["--d" as string]: `${i * 120}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h1>
  );
}
