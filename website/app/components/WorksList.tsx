"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "../lib/projects";
import {
  gsap,
  prefersReducedMotion,
  ScrollTrigger,
  useMotion,
} from "../lib/motion";

const PREVIEW_W = 240;
const PREVIEW_H = 360; // 2:3 portrait, like the reference's thumbnail

/**
 * Project index. Each row is a bracketed name with category and location; on
 * pointer devices a portrait preview glides after the cursor. Projects without
 * photography preview as an accent tile with their number, so the list reads
 * the same whether or not a project has images yet.
 */
export default function WorksList({ projects }: { projects: Project[] }) {
  const [shown, setShown] = useState(0); // which project the preview displays
  const list = useRef<HTMLUListElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const move = useRef<{ x: (v: number) => void; y: (v: number) => void }>(null);

  // Rows rise in, staggered, as they enter the viewport.
  const scope = useMotion<HTMLUListElement>((el) => {
    ScrollTrigger.batch(el.querySelectorAll("[data-row]"), {
      start: "top 92%",
      once: true,
      onEnter: (rows) =>
        gsap.fromTo(
          rows,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.08,
            clearProps: "transform",
          },
        ),
    });
  });

  // Preview: starts hidden, follows the cursor with a soft lag.
  useEffect(() => {
    const el = preview.current;
    if (!el) return;
    gsap.set(el, { autoAlpha: 0, scale: 0.9 });
    move.current = {
      x: gsap.quickTo(el, "x", { duration: 0.7, ease: "power3" }),
      y: gsap.quickTo(el, "y", { duration: 0.7, ease: "power3" }),
    };
    return () => {
      gsap.killTweensOf(el);
    };
  }, []);

  function target(e: React.MouseEvent) {
    const flip = e.clientX + 40 + PREVIEW_W > window.innerWidth;
    return {
      x: flip ? e.clientX - 40 - PREVIEW_W : e.clientX + 40,
      y: Math.min(
        Math.max(e.clientY - PREVIEW_H / 2, 72),
        window.innerHeight - PREVIEW_H - 16,
      ),
    };
  }

  function onEnterList(e: React.MouseEvent) {
    const el = preview.current;
    if (!el) return;
    const t = target(e);
    // jump to the cursor first so it doesn't fly in from the corner
    gsap.set(el, { x: t.x, y: t.y });
    gsap.to(el, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
  }

  function onMoveList(e: React.MouseEvent) {
    const t = target(e);
    move.current?.x(t.x);
    move.current?.y(t.y);
  }

  function onLeaveList() {
    dim(null);
    gsap.to(preview.current, {
      autoAlpha: 0,
      scale: 0.9,
      duration: 0.4,
      ease: "power2.in",
      overwrite: "auto",
    });
  }

  // Dim every row except the one being pointed at.
  function dim(active: number | null) {
    const rows = list.current?.querySelectorAll("[data-row-link]");
    if (!rows) return;
    gsap.to(rows, {
      opacity: (i: number) => (active === null || active === i ? 1 : 0.28),
      duration: prefersReducedMotion() ? 0 : 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  const current = projects[shown];

  return (
    <>
      <ul
        ref={(node) => {
          list.current = node;
          scope.current = node;
        }}
        className="border-b border-line"
        onMouseEnter={onEnterList}
        onMouseMove={onMoveList}
        onMouseLeave={onLeaveList}
      >
        {projects.map((project, i) => (
          <li key={project.slug} data-row="" className="border-t border-line">
            <Link
              href={`/work/${project.slug}`}
              data-row-link=""
              onMouseEnter={() => {
                setShown(i);
                dim(i);
              }}
              onFocus={() => {
                setShown(i);
                dim(i);
              }}
              onBlur={() => dim(null)}
              className="group grid-12 gap-y-2 py-5 md:items-start md:py-7"
            >
              <span className="col-span-12 text-[clamp(1.75rem,4.2vw,4rem)] leading-[1.02] tracking-[-0.035em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 md:col-span-7 md:group-hover:translate-x-5">
                <span aria-hidden className="text-mute">
                  [{" "}
                </span>
                {project.title}
                <span aria-hidden className="text-mute">
                  {" "}
                  ]
                </span>
              </span>
              <span className="col-span-6 text-mute md:col-span-2 md:pt-[0.7rem]">
                {project.category}
              </span>
              <span className="col-span-6 text-right text-mute md:col-span-3 md:pt-[0.7rem]">
                {project.location}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-40 hidden md:block"
        style={{ width: PREVIEW_W, height: PREVIEW_H }}
      >
        <div className="relative h-full w-full overflow-hidden bg-accent">
          {current.image ? (
            <Image
              src={current.image}
              alt=""
              fill
              sizes={`${PREVIEW_W}px`}
              className="object-cover"
            />
          ) : (
            <span className="absolute bottom-3 left-4 text-7xl tracking-[-0.045em]">
              {String(current.index).padStart(2, "0")}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
