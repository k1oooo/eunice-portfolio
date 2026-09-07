import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NextProjectLink from "../../components/NextProjectLink";
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

      {/* Project's key photo, or a placeholder until photography is supplied. */}
      <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden border border-ink/10 bg-sky">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1536px) 1536px, 100vw"
            priority
            className="object-cover"
          />
        ) : (
          <span className="font-heading text-8xl text-ink/25">
            {String(project.index).padStart(2, "0")}
          </span>
        )}
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

      {project.gallery && project.gallery.length > 0 && (
        <div className="columns-1 gap-4 sm:columns-2">
          {project.gallery.map((src) => (
            <div
              key={src}
              className="mb-4 w-full break-inside-avoid overflow-hidden border border-ink/10 bg-sand"
            >
              {/* Plain img (not next/image) so each photo keeps its own
                  natural aspect ratio for the masonry gallery layout,
                  instead of being forced into a uniform cropped box. */}
              <img
                src={src}
                alt={project.title}
                loading="lazy"
                className="block h-auto w-full"
              />
            </div>
          ))}
        </div>
      )}

      {/* Project's architectural drawing / floor plan, or a placeholder until available. */}
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden border border-ink/10 bg-butter sm:aspect-[16/9]">
        {project.drawingImage ? (
          <Image
            src={project.drawingImage}
            alt={`${project.title} drawing`}
            fill
            sizes="(min-width: 1536px) 1536px, 100vw"
            className="object-contain"
          />
        ) : (
          <span className="text-sm uppercase tracking-[0.2em] text-ink/50">
            Drawing coming soon
          </span>
        )}
      </div>

      {project.drawingNote && (
        <span className="-mt-4 text-sm italic text-ink/50">
          {project.drawingNote}
        </span>
      )}

      {project.additionalDrawings && project.additionalDrawings.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {project.additionalDrawings.map((src) => (
            <div
              key={src}
              className="relative aspect-[4/3] w-full overflow-hidden border border-ink/10 bg-sand"
            >
              <Image
                src={src}
                alt={`${project.title} technical drawing`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      )}

      {nextProject && (
        <NextProjectLink
          slug={nextProject.slug}
          index={nextProject.index}
          title={nextProject.title}
          images={[
            nextProject.image,
            nextProject.drawingImage,
            ...(nextProject.additionalDrawings ?? []),
            ...(nextProject.gallery ?? []),
          ].filter((src): src is string => Boolean(src))}
        />
      )}
    </main>
  );
}
