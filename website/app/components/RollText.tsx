import type { CSSProperties } from "react";

/**
 * Label whose letters roll up and are replaced from below on hover, one after
 * another. Pure CSS (see `.roll-word` in globals.css): put it inside any <a>
 * or <button> and the parent's hover/focus drives it. Words stay unbroken but
 * the label can wrap between words. Screen readers get the plain text; the
 * per-letter spans are hidden from them.
 */
export default function RollText({ children }: { children: string }) {
  let index = 0; // keeps the stagger running across words

  return (
    <span className="roll">
      <span className="sr-only">{children}</span>
      {children.split(" ").map((word, w) => (
        <span key={w} aria-hidden>
          {w > 0 && " "}
          <span className="roll-word">
            {Array.from(word).map((char, i) => (
              <span
                key={i}
                className="roll-char"
                style={{ "--i": index++ } as CSSProperties}
              >
                {char}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}
