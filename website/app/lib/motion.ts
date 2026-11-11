"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText };

/** Shared motion state. Module scope is shared by every client component. */
const state: { lenis: Lenis | null; ready: boolean } = {
  lenis: null,
  ready: false,
};
const listeners = new Set<() => void>();

export function setLenis(instance: Lenis | null) {
  state.lenis = instance;
}

export function getLenis() {
  return state.lenis;
}

/** Freeze or release page scrolling (loader, mobile menu). */
export function lockScroll(locked: boolean) {
  if (locked) state.lenis?.stop();
  else state.lenis?.start();
  document.body.style.overflow = locked ? "hidden" : "";
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Called by the loader when the page is about to be revealed. */
export function markReady() {
  if (state.ready) return;
  state.ready = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

/** Run `fn` once the loader has finished (immediately if it already has). */
export function onReady(fn: () => void) {
  if (state.ready) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/**
 * Create GSAP animations for one element after the loader and web fonts are
 * ready. Everything built inside `setup` is registered with a GSAP context, so
 * unmounting reverts tweens, ScrollTriggers and SplitText together. Skipped
 * entirely for reduced motion (content is never hidden in that case, see the
 * `data-js` gate in layout.tsx).
 */
export function useMotion<T extends HTMLElement>(
  setup: (el: T) => void,
  deps: unknown[] = [],
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {}, el);
    let dead = false;

    const off = onReady(() => {
      document.fonts.ready.then(() => {
        if (!dead) ctx.add(() => setup(el));
      });
    });

    return () => {
      dead = true;
      off();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
