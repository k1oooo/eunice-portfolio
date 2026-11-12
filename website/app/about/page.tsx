import Image from "next/image";
import Link from "next/link";
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
    <main className="page">
      {/* Statement: tall quiet space above, big type low, like the project pages. */}
      <header className="flex min-h-[44svh] items-end pb-12 md:min-h-[52svh] md:pb-16">
        <SplitReveal
          as="h1"
          className="max-w-[20ch] text-[clamp(2.75rem,7.6vw,8rem)] leading-[0.94] tracking-[-0.055em]"
        >
          Architecture and interiors, from the building down to the room.
        </SplitReveal>
      </header>

      {/* Portrait and intro. */}
      <section className="grid-12 gap-y-12">
        <ImageReveal
          className="col-span-9 aspect-[3/4] sm:col-span-6 md:col-span-4"
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

        <div className="col-span-12 flex flex-col justify-between gap-16 md:col-span-6 md:col-start-7">
          <div>
            <p className="label">Eunice Moh Hau Yan</p>
            <SplitReveal as="p" className="lede mt-4" delay={0.1}>
              Assistant architect and interior designer based in Kuala Lumpur,
              moving between the scale of a building and the scale of the room
              inside it.
            </SplitReveal>
            <Fade as="p" className="mt-8 max-w-[44ch] text-mute" delay={0.2}>
              My work spans hospitality, residential, retail and memorial
              projects across the Klang Valley and Johor Bahru.
            </Fade>
          </div>

          <Fade className="flex flex-wrap gap-x-12 gap-y-6" delay={0.25}>
            <div>
              <p className="text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-[-0.05em]">
                {String(projects.length).padStart(2, "0")}
              </p>
              <p className="label mt-2">Selected projects</p>
            </div>
            <div>
              <p className="text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-[-0.05em]">
                {String(sectors.length).padStart(2, "0")}
              </p>
              <p className="label mt-2">{sectors.join(", ")}</p>
            </div>
          </Fade>
        </div>
      </section>

      {/* Details sit on soft tiles instead of ruled rows. */}
      <section className="mt-24 grid grid-cols-1 gap-4 md:mt-40 md:grid-cols-12">
        <Fade className="rounded-md bg-[#f3f3f1] p-6 md:col-span-6 md:p-10">
          <h2 className="label tracking-normal leading-normal">
            Education
          </h2>
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
          className="rounded-md bg-accent p-6 md:col-span-6 md:p-10"
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

        <Fade className="rounded-md bg-black p-6 text-white md:col-span-12 md:p-10">
          <div className="flex flex-col gap-16 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-[0.9375rem] tracking-normal leading-normal text-white/55">
                Languages
              </h2>
              <p className="mt-6 text-[clamp(2rem,4.6vw,4.5rem)] leading-[1] tracking-[-0.045em]">
                {languages.join(", ")}
              </p>
            </div>
            <Link
              href="/contact"
              className="self-start rounded-md bg-white px-4 py-3 leading-none text-black md:self-auto"
            >
              Get in touch
            </Link>
          </div>
        </Fade>
      </section>

      <div className="h-24 md:h-40" />
    </main>
  );
}
