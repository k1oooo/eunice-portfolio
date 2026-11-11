import Image from "next/image";
import WorksPlan from "./components/WorksPlan";

export default function Home() {
  return (
    <main className="px-4 sm:px-10">
      <section className="flex flex-col gap-8 py-12 sm:flex-row sm:items-end sm:justify-between sm:gap-12 sm:py-20">
        <div className="flex max-w-4xl flex-col gap-6">
          <h1>
            <span className="block">I&apos;m Eunice Moh.</span>
            <span className="block">
              I design the buildings and what fills them.
            </span>
          </h1>
          <p className="max-w-[48ch]">
            Assistant architect and interior designer based in Kuala Lumpur,
            working across restaurants, retail, homes and memorials.
          </p>
        </div>

        <Image
          src="/images/eunice-pfp.png"
          width={224}
          height={224}
          alt="Portrait of Eunice Moh"
          priority
          className="frame h-36 w-36 shrink-0 object-cover sm:h-56 sm:w-56"
        />
      </section>

      <WorksPlan />
    </main>
  );
}
