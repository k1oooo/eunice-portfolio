import Link from "next/link";
import { Fade, SplitReveal } from "./components/Reveal";
import WorksList from "./components/WorksList";
import { projects } from "./lib/projects";

export default function Home() {
  return (
    <main>
      <section className="page flex min-h-[calc(100svh-var(--header-h))] flex-col justify-between pt-4 pb-6 md:pt-6">
        <Fade className="grid-12 text-[0.9375rem]" delay={0.5} y={12}>
          <p className="col-span-6 md:col-span-3">
            Assistant architect &amp;
            <br />
            interior designer
          </p>
          <p className="col-span-6 text-right md:col-span-3 md:col-start-10 md:text-left">
            Klang Valley &amp;
            <br />
            Johor Bahru
          </p>
        </Fade>

        <SplitReveal as="h1" className="statement py-16">
          I design the buildings and what fills them.
        </SplitReveal>

        <Fade className="self-start" delay={0.9} y={0} start="top 100%">
          {/* A hint, not a control: same grey as the header clock. */}
          <p className="text-[0.9375rem] text-faint select-none">
            [ Scroll down ]
          </p>
        </Fade>
      </section>

      <section
        id="about"
        className="page grid-12 gap-y-8 pt-24 md:pt-44"
        aria-labelledby="about-heading"
      >
        <Fade as="h2" className="label col-span-12 md:col-span-3" y={12}>
          <span id="about-heading">About</span>
        </Fade>
        <div className="col-span-12 md:col-span-9">
          <SplitReveal as="p" className="lede">
            Assistant architect and interior designer based in Kuala Lumpur,
            moving between the scale of a building and the scale of the room
            inside it.
          </SplitReveal>
          <Fade
            className="mt-10 flex flex-col items-start gap-6 md:mt-16 md:ml-auto md:w-1/2"
            delay={0.15}
          >
            <p className="max-w-[44ch]">
              My work spans restaurants, retail, homes and memorials across the
              Klang Valley and Johor Bahru.
            </p>
            <Link href="/about">
              [ About me ]
            </Link>
          </Fade>
        </div>
      </section>

      <section
        id="works"
        className="page pt-24 md:pt-44"
        aria-labelledby="works-heading"
      >
        <Fade className="grid-12 pb-6" y={12}>
          <h2 id="works-heading" className="label col-span-6 md:col-span-3">
            Selected Works
          </h2>
          <p className="label col-span-6 text-right md:col-span-9">
            ({String(projects.length).padStart(2, "0")})
          </p>
        </Fade>
        <WorksList projects={projects} />
      </section>
    </main>
  );
}
