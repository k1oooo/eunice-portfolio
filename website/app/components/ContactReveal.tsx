"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, prefersReducedMotion } from "../lib/motion";
import ContactSection from "./ContactSection";

/**
 * End-of-page contact reveal. On desktop the panel is fixed behind the page;
 * the page (which has a viewport-high bottom margin) lifts away as you reach
 * the end, and the panel's content slides up into place as you scroll. On
 * small screens it is just the last section of the page.
 */
export default function ContactReveal() {
  const pathname = usePathname();
  const aside = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = aside.current;
    if (!el || !window.matchMedia("(min-width: 48rem)").matches) return;

    // Behind the page until it is actually revealed: keep it out of the tab order.
    el.inert = true;

    if (prefersReducedMotion()) {
      return () => {
        el.inert = false;
      };
    }

    // A selector string would be searched only inside this aside (the context's
    // scope), so hand the trigger the element itself.
    const shell = document.getElementById("page-shell");
    if (!shell) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner.current,
        { yPercent: 35 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: shell,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              el.inert = self.progress < 0.6;
            },
          },
        },
      );
    }, el);

    return () => {
      ctx.revert();
      el.inert = false;
    };
  }, [pathname]);

  if (pathname === "/contact") return null;

  return (
    <aside
      ref={aside}
      aria-label="Contact"
      className="relative z-0 md:fixed md:inset-x-0 md:bottom-0 md:h-svh md:overflow-hidden"
    >
      <div ref={inner} className="md:h-full">
        <ContactSection className="md:h-full" />
      </div>
    </aside>
  );
}
