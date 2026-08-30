import Navbar from "./components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="max-w-7xl mx-2 ">
        <section>
          <div className="flex flex-col justify-end min-h-screen">
            <Image
              src="/images/eunice-pfp.png"
              width={300}
              height={100}
              alt="eunice pfp"
            />
            <h1>
              I am Eunice Moh, I design the buildings and what fills them.
            </h1>
          </div>
        </section>
      </main>
    </>
  );
}
