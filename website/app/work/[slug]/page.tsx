import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNextProject, getProjectBySlug, projects } from "../../lib/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(slug);

  return (
    <main className="flex flex-col gap-8 px-4 py-16 sm:px-10 sm:py-24">
      <div className="flex flex-col gap-4">
        <span className="text-sm uppercase tracking-[0.2em] text-ink/50">
          {project.category} &middot; {project.location}
        </span>
        <h1>{project.title}</h1>
        {project.award && (
          <span className="w-fit rounded-full border border-ink/20 px-3 py-1 text-xs uppercase tracking-[0.15em] text-ink/70 sm:text-sm">
            {project.award}
          </span>
        )}
      </div>

      {/* Placeholder for the project's key photo. Swap for a real <Image> once photography is supplied. */}
      <div className="flex aspect-[16/9] w-full items-center justify-center border border-ink/10 bg-sky">
        <span className="font-heading text-8xl text-ink/25">
          {String(project.index).padStart(2, "0")}
        </span>
      </div>

      {project.photoNote && (
        <span className="-mt-4 text-sm italic text-ink/50">
          {project.photoNote}
        </span>
      )}

      <div className="grid max-w-3xl grid-cols-2 gap-x-8 gap-y-3 border-y border-ink/10 py-6 sm:grid-cols-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-[0.2em] text-ink/40">
            Category
          </span>
          <span className="text-base sm:text-lg">{project.category}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-[0.2em] text-ink/40">
            Type
          </span>
          <span className="text-base sm:text-lg">{project.type}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-[0.2em] text-ink/40">
            Location
          </span>
          <span className="text-base sm:text-lg">{project.location}</span>
        </div>
      </div>

      <p className="max-w-3xl text-xl sm:text-2xl">{project.description}</p>

      {/* Placeholder for the project's architectural drawing. Swap for a real <Image> once available. */}
      <div className="flex aspect-[4/3] w-full items-center justify-center border border-ink/10 bg-butter sm:aspect-[16/9]">
        <span className="text-sm uppercase tracking-[0.2em] text-ink/50">
          Drawing coming soon
        </span>
      </div>

      {nextProject && (
        <Link
          href={`/work/${nextProject.slug}`}
          className="group -mx-4 mt-8 flex items-center justify-between gap-6 border-t border-ink/10 px-4 py-10 transition-colors hover:bg-ink hover:text-sand sm:-mx-10 sm:px-10 sm:py-14"
        >
          <div className="flex flex-col gap-2">
            <span className="text-sm uppercase tracking-[0.2em] text-ink/50 group-hover:text-sand/60">
              Next Project &middot; {String(nextProject.index).padStart(2, "0")}
            </span>
            <h2 className="text-3xl sm:text-5xl">{nextProject.title}</h2>
          </div>
          <ArrowRight
            className="h-8 w-8 shrink-0 transition-transform duration-300 group-hover:translate-x-2 sm:h-10 sm:w-10"
            strokeWidth={1.5}
          />
        </Link>
      )}
    </main>
  );
}
