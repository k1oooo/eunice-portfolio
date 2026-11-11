import Image from "next/image";
import type { ReactNode } from "react";
import EducationList from "../components/EducationList";

type Row = {
  id: string;
  label: string;
  bg: "bg-sand";
  content: ReactNode;
};

const rows: Row[] = [
  {
    id: "about-me",
    label: "About Me",
    bg: "bg-sand",
    content: (
      <div className="flex flex-col gap-8">
        <p className="text-xl sm:text-2xl max-w-3xl">
          Based in Kuala Lumpur, Malaysia, I work across{" "}
          <span className="mark-butter">architecture</span> and{" "}
          <span className="mark-butter">interior design</span>, moving between
          the scale of a building and the scale of the room inside it. My work
          spans hospitality, residential, and memorial projects across the Klang
          Valley and Johor Bahru.
        </p>
        <div className="flex flex-row flex-wrap gap-2">
          <Image
            src="/images/eunice-pfp.png"
            width={280}
            height={280}
            alt="eunice pfp"
            className="h-24 w-24 border border-sky object-cover sm:h-[280px] sm:w-[280px]"
          />
          <Image
            src="/images/eunice-pfp.png"
            width={280}
            height={280}
            alt="eunice pfp"
            className="h-24 w-24 border border-sky object-cover sm:h-[280px] sm:w-[280px]"
          />
          <Image
            src="/images/eunice-pfp.png"
            width={280}
            height={280}
            alt="eunice pfp"
            className="h-24 w-24 border border-sky object-cover sm:h-[280px] sm:w-[280px]"
          />
        </div>
      </div>
    ),
  },
  {
    id: "software",
    label: "Software Proficiency",
    bg: "bg-sand",
    content: (
      <div className="flex flex-col gap-2">
        {[
          "AutoCAD",
          "SketchUp",
          "Enscape",
          "Photoshop",
          "Illustrator",
          "Revit",
          "Acrobat",
          "Excel",
          "PowerPoint",
        ].map((item) => (
          <p key={item} className="text-xl sm:text-2xl">
            {item}
          </p>
        ))}
      </div>
    ),
  },
  {
    id: "education",
    label: "Education",
    bg: "bg-sand",
    content: <EducationList />,
  },
  {
    id: "language",
    label: "Language",
    bg: "bg-sand",
    content: (
      <div className="flex flex-col gap-2">
        {["English", "Bahasa Melayu", "Mandarin"].map((item) => (
          <p key={item} className="text-xl sm:text-2xl">
            {item}
          </p>
        ))}
      </div>
    ),
  },
];

export default function About() {
  return (
    <main className="flex flex-col gap-8">
      <h1 className="mx-4 sm:mx-10">
        Get To <span className="mark-butter">Know Me</span>
      </h1>
      <div className="flex flex-col divide-y divide-ink border-y border-ink w-full">
        {rows.map((row) => (
          <div
            key={row.id}
            className={`grid grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-[240px_1fr] sm:gap-10 sm:px-10 sm:py-12 ${row.bg}`}
          >
            <h2 className="text-xs uppercase tracking-[0.2em] sm:text-sm">
              {row.label}
            </h2>
            <div>{row.content}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
