import Navbar from "./components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col max-w-7xl mx-2 ">
        <section className="flex flex-1 flex-col justify-end gap-4">
          <Image
            src="/images/eunice-pfp.png"
            width={300}
            height={300}
            alt="eunice pfp"
            className="border border-sky"
          />
          <p className="text-sm uppercase tracking-[0.2em]">
            Assistant Architect · Interior Designer
          </p>

          <h1>
            I am{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Eunice Moh</span>
              <span className="absolute bottom-0 left-0 h-[50%] w-full bg-butter" />
            </span>
            , I{" "}
            <span className="relative inline-block">
              <span className="relative z-10">design</span>
              <span className="absolute bottom-0 left-0 h-[50%] w-full bg-sky" />
            </span>{" "}
            the buildings and what fills them.
          </h1>
        </section>
      </main>
    </>
  );
}
