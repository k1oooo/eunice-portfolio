import Image from "next/image";
import Link from "next/link";
import { projects } from "../lib/projects";

// Alternating placeholder background for projects that don't have a photo yet.
const placeholderBg = ["bg-sky", "bg-butter"] as const;

export default function ProjectsGrid() {
  return (
    <section className="flex flex-col gap-10 mt-8">
      <h2 className="text-xs uppercase tracking-[0.2em] sm:text-sm">
        Selected Works
      </h2>

      <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group flex flex-col gap-4"
          >
            <div
              className={`relative aspect-[4/3] overflow-hidden border border-ink ${
                placeholderBg[i % placeholderBg.length]
              }`}
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105">
                  <span className="font-heading text-7xl sm:text-8xl">
                    {String(project.index).padStart(2, "0")}
                  </span>
                </div>
              )}

              <div className="absolute inset-0 flex items-end p-4">
                <span className="translate-y-2 bg-sand/90 px-3 py-1 text-xs uppercase tracking-[0.2em] text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:text-sm">
                  View Project &rarr;
                </span>
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-xl sm:text-2xl">{project.title}</h3>
              <span className="whitespace-nowrap text-xs uppercase tracking-[0.2em] text-black">
                {project.location}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
