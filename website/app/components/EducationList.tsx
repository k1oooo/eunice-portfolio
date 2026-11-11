"use client";

import Image from "next/image";
import { useState } from "react";

type EducationItem = {
  id: string;
  text: string;
  image: string;
};

const educationItems: EducationItem[] = [
  {
    id: "bsc",
    text: "2021 – 2023 — Bachelor of Science (Hons) in Architecture, UCSI University",
    image: "/images/eunice-pfp.png",
  },
  {
    id: "diploma",
    text: "2018 – 2020 — Diploma in Architectural Studies, UCSI University",
    image: "/images/eunice-pfp.png",
  },
];

export default function EducationList() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const activeItem = educationItems.find((item) => item.id === hovered);

  return (
    <div
      className="flex flex-col gap-8"
      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
    >
      {educationItems.map((item) => (
        <p
          key={item.id}
          className="text-xl sm:text-2xl cursor-default"
          onMouseEnter={() => setHovered(item.id)}
          onMouseLeave={() => setHovered(null)}
        >
          {item.text}
        </p>
      ))}

      {activeItem && (
        <div
          className="pointer-events-none fixed z-50 h-40 w-40 -translate-x-1/2 -translate-y-1/2 overflow-hidden sm:h-48 sm:w-48"
          style={{ left: pos.x, top: pos.y }}
        >
          <Image
            src={activeItem.image}
            alt=""
            fill
            sizes="192px"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
