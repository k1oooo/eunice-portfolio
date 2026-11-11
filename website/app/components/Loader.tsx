"use client";

import { useEffect, useRef, useState } from "react";
import {
  gsap,
  lockScroll,
  markReady,
  prefersReducedMotion,
} from "../lib/motion";

/**
 * Percent counter shown once per session on first load, then the white sheet
 * lifts away and the page reveals underneath. The inline script in layout.tsx
 * hides it via CSS (repeat visit / reduced motion), in which case we just
 * signal "ready" straight away.
 */
export default function Loader() {
  const [gone, setGone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const number = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const skip =
      document.documentElement.dataset.loader === "skip" ||
      prefersReducedMotion();
    if (skip) {
      markReady();
      return;
    }

    lockScroll(true);
    try {
      sessionStorage.setItem("loader-seen", "1");
    } catch {
      // storage unavailable: loader simply shows again next visit
    }

    const ctx = gsap.context(() => {
      const count = { v: 0 };

      gsap
        .timeline({
          onComplete: () => {
            lockScroll(false);
            setGone(true);
          },
        })
        .from("[data-loader-meta]", {
          opacity: 0,
          y: 8,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
        })
        .to(
          count,
          {
            v: 100,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => {
              if (number.current) {
                number.current.textContent = `${Math.round(count.v)}%`;
              }
            },
          },
          0,
        )
        // the number slides off as the sheet lifts
        .to(
          number.current,
          { yPercent: -30, opacity: 0, duration: 0.5, ease: "power2.in" },
          "+=0.1",
        )
        .to(
          root.current,
          { yPercent: -100, duration: 1.1, ease: "power4.inOut" },
          "<0.15",
        )
        // start the hero reveal while the sheet is still leaving
        .add(markReady, "-=0.55");
    }, root);

    return () => {
      ctx.revert();
      lockScroll(false);
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={root} className="loader" role="status">
      <span className="sr-only">Loading</span>

      <div
        aria-hidden
        className="flex items-start justify-between text-[0.9375rem]"
      >
        <p data-loader-meta>
          Eunice Moh
          <br />
          <span className="text-mute">Architecture &amp; interior</span>
        </p>
        <p data-loader-meta className="text-right">
          Kuala Lumpur
          <br />
          <span className="text-mute">Malaysia</span>
        </p>
      </div>

      <div aria-hidden className="flex items-end justify-between">
        <p data-loader-meta className="text-[0.9375rem]">
          Loading
        </p>
        <p ref={number} className="statement tabular-nums">
          0%
        </p>
      </div>
    </div>
  );
}
