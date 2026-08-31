import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "../../lib/projects";

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

  return (
    <main className="flex flex-col gap-8 px-4 py-16 sm:px-10 sm:py-24">
      <Link
        href="/"
        className="w-fit text-sm uppercase tracking-[0.2em] text-ink/50 transition-colors hover:text-ink"
      >
        &larr; Back to Work
      </Link>

      <div className="flex flex-col gap-2">
        <span className="text-sm uppercase tracking-[0.2em] text-ink/50">
          {project.category} &middot; {project.location}
        </span>
        <h1>{project.title}</h1>
      </div>

      {/* Placeholder for the project's key photo. Swap for a real <Image> once photography is supplied. */}
      <div className="flex aspect-[16/9] w-full items-center justify-center border border-ink/10 bg-sky">
        <span className="font-heading text-8xl text-ink/25">
          {String(project.index).padStart(2, "0")}
        </span>
      </div>

      <p className="max-w-3xl text-xl sm:text-2xl">{project.description}</p>

      {/* Placeholder for the project's architectural drawing. Swap for a real <Image> once available. */}
      <div className="flex aspect-[4/3] w-full items-center justify-center border border-ink/10 bg-butter sm:aspect-[16/9]">
        <span className="text-sm uppercase tracking-[0.2em] text-ink/50">
          Drawing coming soon
        </span>
      </div>
    </main>
  );
}
