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

  const facts = [
    { label: "Category", value: project.category },
    { label: "Type", value: project.type },
    { label: "Location", value: project.location },
  ];

  return (
    <main className="flex flex-col gap-10 px-4 py-12 sm:px-10 sm:py-20">
      <header className="flex max-w-5xl flex-col items-start gap-5">
        <h1>{project.title}</h1>
        {project.award && (
          <p className="bg-accent px-3 py-1 text-sm sm:text-base">
            {project.award}
          </p>
        )}
      </header>

      {/* Project's key photo, or a placeholder until photography is supplied. */}
      <div className="frame relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden bg-accent">
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
          <span className="font-heading text-8xl">
            {String(project.index).padStart(2, "0")}
          </span>
        )}
      </div>

      {project.photoNote && (
        <p className="-mt-6 text-sm italic">{project.photoNote}</p>
      )}

      <dl className="plan max-w-4xl sm:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1 p-4 sm:p-5">
            <dt className="text-sm">{fact.label}</dt>
            <dd className="font-heading text-lg sm:text-xl">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <p className="max-w-[60ch] text-xl sm:text-2xl">{project.description}</p>

      {project.gallery && project.gallery.length > 0 && (
        <div className="columns-1 gap-4 sm:columns-2">
          {project.gallery.map((src) => (
            <div key={src} className="mb-4 w-full break-inside-avoid">
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
      <div className="frame relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-mist sm:aspect-[16/9]">
        {project.drawingImage ? (
          <Image
            src={project.drawingImage}
            alt={`${project.title} drawing`}
            fill
            sizes="(min-width: 1536px) 1536px, 100vw"
            className="object-contain"
          />
        ) : (
          <p className="text-base">Drawing coming soon</p>
        )}
      </div>

      {project.drawingNote && (
        <p className="-mt-6 text-sm italic">{project.drawingNote}</p>
      )}

      {project.additionalDrawings && project.additionalDrawings.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {project.additionalDrawings.map((src) => (
            <div
              key={src}
              className="frame relative aspect-[4/3] w-full overflow-hidden bg-paper"
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
