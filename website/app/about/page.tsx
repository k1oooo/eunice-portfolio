import Image from "next/image";
import EducationList from "../components/EducationList";

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

export default function About() {
  return (
    <main className="flex flex-col gap-10 px-4 py-12 sm:px-10 sm:py-20">
      <h1>Get to know me</h1>

      <div className="plan md:grid-cols-12">
        <section className="flex flex-col gap-6 p-5 sm:p-8 md:col-span-8">
          <h2 className="text-xl sm:text-2xl">About me</h2>
          <p className="max-w-[60ch] text-lg sm:text-xl">
            Based in Kuala Lumpur, Malaysia, I work across{" "}
            <span className="mark">architecture</span> and{" "}
            <span className="mark">interior design</span>, moving
            between the scale of a building and the scale of the room inside
            it. My work spans hospitality, residential, and memorial projects
            across the Klang Valley and Johor Bahru.
          </p>
          <div className="flex flex-row flex-wrap gap-3">
            <Image
              src="/images/eunice-pfp.png"
              width={200}
              height={200}
              alt="Portrait of Eunice Moh"
              className="frame h-24 w-24 object-cover sm:h-[200px] sm:w-[200px]"
            />
            <Image
              src="/images/eunice-pfp.png"
              width={200}
              height={200}
              alt=""
              className="frame h-24 w-24 object-cover sm:h-[200px] sm:w-[200px]"
            />
            <Image
              src="/images/eunice-pfp.png"
              width={200}
              height={200}
              alt=""
              className="frame h-24 w-24 object-cover sm:h-[200px] sm:w-[200px]"
            />
          </div>
        </section>

        <section className="flex flex-col gap-6 p-5 sm:p-8 md:col-span-4">
          <h2 className="text-xl sm:text-2xl">Software</h2>
          <ul className="columns-2 gap-6 text-lg">
            {software.map((item) => (
              <li key={item} className="break-inside-avoid py-0.5">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-6 p-5 sm:p-8 md:col-span-7">
          <h2 className="text-xl sm:text-2xl">Education</h2>
          <EducationList />
        </section>

        <section className="flex flex-col gap-6 p-5 sm:p-8 md:col-span-5">
          <h2 className="text-xl sm:text-2xl">Languages</h2>
          <ul className="flex flex-col gap-1 text-lg">
            {languages.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
