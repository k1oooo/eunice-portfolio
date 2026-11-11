"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type NextProjectLinkProps = {
  slug: string;
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
// How long a single trail image stays mounted. Must match the `trail-pop`
// keyframe duration in globals.css.
const TRAIL_LIFETIME_MS = 700;

export default function NextProjectLink({
  slug,
  title,
  images,
}: NextProjectLinkProps) {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const lastSpawnRef = useRef<{ x: number; y: number } | null>(null);
  const nextIdRef = useRef(0);
  // Cycles through every image for the project, one per spawned trail item.
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
          className="animate-trail-pop pointer-events-none fixed z-50 hidden aspect-[4/3] w-56 overflow-hidden border border-line bg-paper sm:block"
          style={{ left: item.x, top: item.y }}
        >
          <Image
            src={item.src}
            alt=""
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
        className="grid-12 mt-24 gap-y-4 border-t border-line pt-6 pb-4 md:mt-40"
      >
        <span className="label col-span-12 md:col-span-3">Next project</span>
        <span className="title col-span-12 md:col-span-9">
          <span aria-hidden className="text-mute">
            [{" "}
          </span>
          {title}
          <span aria-hidden className="text-mute">
            {" "}
            ]
          </span>
        </span>
      </Link>
    </>
  );
}
