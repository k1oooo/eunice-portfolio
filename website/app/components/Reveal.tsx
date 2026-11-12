"use client";

import { createElement } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText, useMotion } from "../lib/motion";

type BaseProps = {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  /** Seconds to wait before this element animates. */
  delay?: number;
};

/**
 * Text that rises line by line out of a mask when it scrolls into view.
 * Re-splits on resize (autoSplit) without replaying the reveal.
 * Hidden by CSS (`[data-split]`) until the split exists, so there is no flash.
 */
export function SplitReveal({
  as = "div",
  className,
  style,
  children,
  delay = 0,
}: BaseProps) {
  const ref = useMotion<HTMLElement>((el) => {
    let played = false;

    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        // Keep descenders (g, p, y) from being clipped by the tight line-height.
        self.masks.forEach((m) => {
          (m as HTMLElement).style.overflowClipMargin = "0.25em";
        });
        gsap.set(el, { visibility: "visible" });
        if (played) return;

        return gsap.from(self.lines, {
          yPercent: 135,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.09,
          delay,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onComplete: () => {
            played = true;
          },
        });
      },
    });
  });

  return createElement(
    as,
    { ref, className, style, "data-split": "" },
    children,
  );
}

/** Block that fades up when it scrolls into view. */
export function Fade({
  as = "div",
  className,
  style,
  children,
  delay = 0,
  y = 24,
  start = "top 92%",
}: BaseProps & { y?: number; start?: string }) {
  const ref = useMotion<HTMLElement>((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        delay,
        // A lingering transform would turn this into a containing block for
        // any position:fixed descendants.
        clearProps: "transform",
        scrollTrigger: { trigger: el, start, once: true },
      },
    );
  });

  return createElement(
    as,
    { ref, className, style, "data-fade": "" },
    children,
  );
}

/**
 * Image that opens like a shutter (clip-path wipe) while the picture inside
 * settles from a slight zoom. Give it the sizing classes; children fill it.
 */
export function ImageReveal({
  className,
  children,
  delay = 0,
}: Omit<BaseProps, "as" | "style">) {
  const ref = useMotion<HTMLDivElement>((el) => {
    const inner = el.querySelector<HTMLElement>("[data-image-inner]");

    // Un-sized <img>s change the page height once they load.
    el.querySelectorAll("img").forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", () => ScrollTrigger.refresh(), {
          once: true,
        });
      }
    });

    const tl = gsap.timeline({
      delay,
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
    tl.fromTo(
      el,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" },
    );
    if (inner) {
      tl.fromTo(
        inner,
        { scale: 1.25 },
        { scale: 1, duration: 1.7, ease: "power3.out" },
        0,
      );
    }
  });

  return (
    <div ref={ref} className={className} data-image-reveal="">
      <div data-image-inner="" className="h-full w-full">
        {children}
      </div>
    </div>
  );
}
