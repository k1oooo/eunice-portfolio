import Navbar from "./components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col mx-4 ">
        <section className="flex flex-1 flex-col justify-end gap-4">
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
            I'm <span className="mark-sky">Eunice Moh</span>, I{" "}
            <span className="mark-butter">design</span> the buildings and what
            fills them.
          </h1>
        </section>
      </main>
    </>
  );
}
