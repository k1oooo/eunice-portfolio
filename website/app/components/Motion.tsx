"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import {
  getLenis,
  gsap,
  prefersReducedMotion,
  ScrollTrigger,
  setLenis,
} from "../lib/motion";

/**
 * Site-wide motion setup: Lenis smooth scrolling driven by GSAP's ticker so
 * ScrollTrigger stays in sync, smooth in-page anchors, and a ScrollTrigger
 * refresh after route changes. Renders nothing.
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Smooth in-page anchors ([ Scroll down ], Back to top).
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;
      const hash = anchor.getAttribute("href") ?? "";
      const target =
        hash === "#top" ? 0 : document.querySelector<HTMLElement>(hash);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.6 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // New page: measurements are stale until its images and fonts settle.
  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true });
    const a = setTimeout(() => ScrollTrigger.refresh(), 150);
    const b = setTimeout(() => ScrollTrigger.refresh(), 900);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [pathname]);

  return null;
}
