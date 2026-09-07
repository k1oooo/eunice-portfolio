"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type NextProjectLinkProps = {
  slug: string;
  index: number;
  title: string;
  /** All available images for the project (hero, floor plan, drawings, gallery). */
  images: string[];
};

type TrailItem = {
  id: number;
  x: number;
  y: number;
  src: string;
};

// Minimum distance (px) the cursor must travel before another trail image
// spawns, so a slow hover doesn't flood the screen with copies.
const MIN_SPAWN_DISTANCE = 25;
// How long a single trail image stays mounted — must match the
// `trail-pop` keyframe duration in globals.css.
const TRAIL_LIFETIME_MS = 700;

export default function NextProjectLink({
  slug,
  index,
  title,
  images,
}: NextProjectLinkProps) {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const lastSpawnRef = useRef<{ x: number; y: number } | null>(null);
  const nextIdRef = useRef(0);
  // Cycles through every image for the project, one per spawned trail item,
  // instead of repeating a single image.
  const nextImageIndexRef = useRef(0);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (images.length === 0) return;

    const { clientX: x, clientY: y } = e;
    const last = lastSpawnRef.current;
    const distance = last ? Math.hypot(x - last.x, y - last.y) : Infinity;

    if (distance < MIN_SPAWN_DISTANCE) return;

    lastSpawnRef.current = { x, y };
    const id = nextIdRef.current++;
    const src = images[nextImageIndexRef.current % images.length];
    nextImageIndexRef.current += 1;

    setTrail((prev) => [...prev, { id, x, y, src }]);
    setTimeout(() => {
      setTrail((prev) => prev.filter((item) => item.id !== id));
    }, TRAIL_LIFETIME_MS);
  }

  function handleMouseLeave() {
    lastSpawnRef.current = null;
  }

  return (
    <>
      {trail.map((item) => (
        <div
          key={item.id}
          aria-hidden
          className="animate-trail-pop pointer-events-none fixed z-50 hidden aspect-[4/3] w-56 overflow-hidden border border-ink/10 bg-sand shadow-2xl sm:block"
          style={{ left: item.x, top: item.y }}
        >
          <Image
            src={item.src}
            alt={title}
            fill
            sizes="224px"
            className="object-contain"
          />
        </div>
      ))}

      <Link
        href={`/work/${slug}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative -mx-4 mt-8 flex items-center justify-between gap-6 border-t border-ink/10 px-4 py-10 transition-colors hover:bg-ink hover:text-sand sm:-mx-10 sm:px-10 sm:py-14"
      >
        <div className="flex flex-col gap-2">
          <span className="text-sm uppercase tracking-[0.2em] text-ink/50 group-hover:text-sand/60">
            Next Project &middot; {String(index).padStart(2, "0")}
          </span>
          <h2 className="text-3xl sm:text-5xl">{title}</h2>
        </div>
        <ArrowRight
          className="h-8 w-8 shrink-0 transition-transform duration-300 group-hover:translate-x-2 sm:h-10 sm:w-10"
          strokeWidth={1.5}
        />
      </Link>
    </>
  );
}
