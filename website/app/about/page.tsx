import Image from "next/image";
import type { Metadata } from "next";
import { Fade, ImageReveal, SplitReveal } from "../components/Reveal";
import { projects } from "../lib/projects";

export const metadata: Metadata = {
  title: "About",
  description:
    "Eunice Moh Hau Yan is an assistant architect and interior designer based in Kuala Lumpur, working across hospitality, residential, retail and memorial projects.",
};

const education = [
  {
    years: "2021 – 2023",
    what: "Bachelor of Science (Hons) in Architecture",
    where: "UCSI University",
  },
  {
    years: "2018 – 2020",
    what: "Diploma in Architectural Studies",
    where: "UCSI University",
  },
];

const software = [
  "AutoCAD",
  "SketchUp",
  "Enscape",
  "Photoshop",
  "Illustrator",
  "Revit",
  "Acrobat",
  "Excel",
  "PowerPoint",
];

const languages = ["English", "Bahasa Melayu", "Mandarin"];

const sectors = ["Hospitality", "Residential", "Retail", "Memorial"];

export default function About() {
  return (
    <main className="page pt-10 pb-24 md:pt-24 md:pb-40">
      {/* Elements are deliberately staggered across the 12 columns. */}
      <div className="grid-12 gap-y-10 md:gap-y-0">
        <ImageReveal
          className="col-span-8 col-start-1 aspect-[3/4] sm:col-span-6 md:col-span-4 md:col-start-2"
          delay={0.1}
        >
          <Image
            src="/images/eunice-pfp.png"
            width={567}
            height={756}
            alt="Portrait of Eunice Moh"
            priority
            className="h-full w-full object-cover"
          />
        </ImageReveal>

        <div className="col-span-11 col-start-2 md:col-span-4 md:col-start-8 md:mt-56">
          <p className="label">Eunice Moh Hau Yan</p>
          <SplitReveal as="p" className="lede mt-4" delay={0.1}>
            Assistant architect and interior designer based in Kuala Lumpur,
            moving between the scale of a building and the scale of the room
            inside it.
          </SplitReveal>
          <Fade as="p" className="mt-8 max-w-[40ch] text-mute" delay={0.2}>
            My work spans hospitality, residential, retail and memorial
            projects across the Klang Valley and Johor Bahru.
          </Fade>
        </div>

        <Fade
          className="col-span-10 col-start-1 md:col-span-4 md:col-start-6 md:mt-10"
          delay={0.1}
        >
          <p className="text-[clamp(4rem,9vw,9rem)] leading-none tracking-[-0.055em]">
            {String(projects.length).padStart(2, "0")}
          </p>
          <p className="label mt-2">Selected projects</p>
        </Fade>

        <Fade
          className="col-span-10 col-start-3 md:col-span-3 md:col-start-10 md:mt-24"
          delay={0.15}
        >
          <p className="text-[clamp(4rem,9vw,9rem)] leading-none tracking-[-0.055em]">
            {String(sectors.length).padStart(2, "0")}
          </p>
          <p className="label mt-2">{sectors.join(", ")}</p>
        </Fade>

        <Fade className="col-span-12 rounded-md bg-[#f3f3f1] p-6 md:col-span-5 md:col-start-1 md:mt-40 md:p-10">
          <h2 className="label tracking-normal leading-normal">Education</h2>
          <ul className="mt-16 flex flex-col gap-10 md:mt-28">
            {education.map((item) => (
              <li key={item.years}>
                <p className="text-[clamp(2rem,3.4vw,3.25rem)] leading-none tracking-[-0.045em] text-mute">
                  {item.years}
                </p>
                <p className="mt-3 text-[1.25rem] leading-tight tracking-[-0.02em]">
                  {item.what}
                </p>
                <p className="text-mute">{item.where}</p>
              </li>
            ))}
          </ul>
        </Fade>

        <Fade
          className="col-span-11 col-start-2 rounded-md bg-accent p-6 md:col-span-5 md:col-start-8 md:mt-72 md:p-10"
          delay={0.1}
        >
          <h2 className="text-[0.9375rem] tracking-normal leading-normal">
            Software
          </h2>
          <ul className="mt-16 flex flex-wrap gap-2 md:mt-28">
            {software.map((name) => (
              <li
                key={name}
                className="rounded-full bg-paper px-4 py-2 text-[1.0625rem] leading-none"
              >
                {name}
              </li>
            ))}
          </ul>
        </Fade>

        <Fade className="col-span-12 rounded-md bg-black p-6 text-white md:col-span-7 md:col-start-3 md:mt-16 md:p-10">
          <h2 className="text-[0.9375rem] tracking-normal leading-normal text-white/55">
            Languages
          </h2>
          <p className="mt-6 text-[clamp(2rem,4.6vw,4.5rem)] leading-[1] tracking-[-0.045em]">
            {languages.join(", ")}
          </p>
        </Fade>
      </div>
    </main>
  );
}
