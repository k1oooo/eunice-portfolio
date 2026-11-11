import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fade, ImageReveal, SplitReveal } from "../../components/Reveal";
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
  const number = String(project.index).padStart(2, "0");

  const facts = [
    { label: "Category", value: project.category },
    { label: "Type", value: project.type },
    { label: "Location", value: project.location },
  ];

  return (
    <main className="page pt-8 md:pt-16">
      <header className="flex flex-col items-start gap-6">
        <SplitReveal as="h1" className="title max-w-[14ch]">
          {project.title}
        </SplitReveal>
        {project.award && (
          <p className="bg-accent px-3 py-1 text-[0.9375rem]">
            {project.award}
          </p>
        )}
      </header>

      <Fade
        as="dl"
        className="grid-12 mt-12 gap-y-6 border-t border-line pt-5 md:mt-20"
        delay={0.15}
      >
        {facts.map((fact) => (
          <div key={fact.label} className="col-span-12 sm:col-span-4">
            <dt className="label">{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </Fade>

      <SplitReveal
        as="p"
        className="lede mt-16 md:mt-28 md:ml-[calc(25%+var(--gutter)/4)] md:max-w-[30ch]"
      >
        {project.description}
      </SplitReveal>

      {/* Key photo, or an accent tile with the project number until photography is supplied. */}
      <ImageReveal className="relative mt-16 aspect-[16/9] w-full bg-accent md:mt-28">
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
          <span className="absolute bottom-4 left-5 text-[clamp(4rem,14vw,14rem)] leading-none tracking-[-0.045em]">
            {number}
          </span>
        )}
      </ImageReveal>

      {project.photoNote && (
        <p className="mt-3 text-[0.9375rem] text-mute">{project.photoNote}</p>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <div className="mt-4 columns-1 gap-4 sm:columns-2">
          {project.gallery.map((src) => (
            <ImageReveal key={src} className="mb-4 w-full break-inside-avoid">
              {/* Plain img (not next/image) so each photo keeps its own
                  natural aspect ratio in the masonry gallery instead of
                  being cropped to a uniform box. */}
              <img
                src={src}
                alt={project.title}
                loading="lazy"
                className="block h-auto w-full"
              />
            </ImageReveal>
          ))}
        </div>
      )}

      {/* Drawing / floor plan, or a placeholder until available. */}
      <ImageReveal className="relative mt-4 aspect-[4/3] w-full border border-line sm:aspect-[16/9]">
        <div className="relative flex h-full w-full items-center justify-center">
          {project.drawingImage ? (
            <Image
              src={project.drawingImage}
              alt={`${project.title} drawing`}
              fill
              sizes="(min-width: 1536px) 1536px, 100vw"
              className="object-contain"
            />
          ) : (
            <p className="text-mute">Drawing coming soon</p>
          )}
        </div>
      </ImageReveal>

      {project.drawingNote && (
        <p className="mt-3 text-[0.9375rem] text-mute">{project.drawingNote}</p>
      )}

      {project.additionalDrawings && project.additionalDrawings.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {project.additionalDrawings.map((src) => (
            <ImageReveal
              key={src}
              className="relative aspect-[4/3] w-full border border-line"
            >
              <Image
                src={src}
                alt={`${project.title} technical drawing`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-contain"
              />
            </ImageReveal>
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
