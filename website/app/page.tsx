import Image from "next/image";
import ProjectsGrid from "./components/ProjectsGrid";

export default function Home() {
  return (
    <main className="flex flex-col mx-4">
      <section className=" flex min-h-[90svh] flex-col justify-end gap-4 pb-12">
        <Image
          src="/images/eunice-pfp.png"
          width={300}
          height={300}
          alt="eunice pfp"
          className="border border-sky "
        />
        <p className="text-sm uppercase tracking-[0.2em]">
          Assistant Architect · Interior Designer
        </p>

        <h1>
          I&apos;m <span className="mark-sky">Eunice Moh</span>, I{" "}
          <span className="mark-butter">design</span> the buildings and what
          fills them.
        </h1>
      </section>

      <ProjectsGrid />
    </main>
  );
}
