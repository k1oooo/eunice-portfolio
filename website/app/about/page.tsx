import Image from "next/image";
import type { Metadata } from "next";
import { Fade, ImageReveal, SplitReveal } from "../components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Eunice Moh Hau Yan is an assistant architect and interior designer based in Kuala Lumpur, working across hospitality, residential, retail and memorial projects.",
};

const education = [
  {
    years: "2021 – 2023",
    what: "Bachelor of Science (Hons) in Architecture, UCSI University",
  },
  {
    years: "2018 – 2020",
    what: "Diploma in Architectural Studies, UCSI University",
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

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 border-t border-line py-6 md:grid-cols-[10rem_1fr] md:gap-8">
      <dt className="label">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default function About() {
  return (
    <main className="page pt-8 md:pt-16">
      <SplitReveal as="h1" className="title">
        Get to know me
      </SplitReveal>

      <div className="grid-12 mt-16 gap-y-12 md:mt-28">
        <ImageReveal
          className="col-span-8 aspect-[3/4] md:col-span-4"
          delay={0.15}
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

        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <SplitReveal as="p" className="lede" delay={0.1}>
            Based in Kuala Lumpur, I work across architecture and interior
            design, moving between the scale of a building and the scale of the
            room inside it.
          </SplitReveal>
          <Fade as="p" className="mt-8 max-w-[48ch]" delay={0.2}>
            My work spans hospitality, residential, and memorial projects across
            the Klang Valley and Johor Bahru.
          </Fade>

          <Fade as="dl" className="mt-16 border-b border-line md:mt-24">
            <Row label="Education">
              <ul className="flex flex-col gap-4">
                {education.map((item) => (
                  <li key={item.years}>
                    <span className="block text-mute">{item.years}</span>
                    {item.what}
                  </li>
                ))}
              </ul>
            </Row>
            <Row label="Software">{software.join(", ")}</Row>
            <Row label="Languages">{languages.join(", ")}</Row>
          </Fade>
        </div>
      </div>
    </main>
  );
}
