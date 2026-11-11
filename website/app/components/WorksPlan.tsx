import Image from "next/image";
import Link from "next/link";
import { projects } from "../lib/projects";

/*
  The home page draws the projects as rooms of one floor plan. The grid areas
  for each room code live in globals.css (.room-a ... .room-g); the order here
  matches the order of `projects`.
*/
const roomCodes = ["a", "b", "c", "d", "e", "f", "g"] as const;

/** Which wall each room's door is cut into, so the plan reads as connected. */
const doors: Partial<Record<(typeof roomCodes)[number], "right" | "bottom">> = {
  a: "right",
  b: "right",
  c: "bottom",
  d: "right",
  f: "right",
  g: "right",
};

export default function WorksPlan() {
  return (
    <section aria-labelledby="works-heading" className="flex flex-col gap-4">
      <h2 id="works-heading" className="sr-only">
        Selected works
      </h2>

      <div className="plan plan-works">
        {projects.map((project, i) => {
          const code = roomCodes[i];

          return (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className={`room ${code ? `room-${code}` : ""} ${
                project.image ? "room-photo" : ""
              }`}
              data-door={code ? doors[code] : undefined}
            >
              {project.image ? (
                <>
                  <div className="room-media" aria-hidden>
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="room-chip">
                    <h3 className="room-title">{project.title}</h3>
                    <p className="room-meta mt-1">
                      {project.category}
                      <br />
                      {project.location}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="room-title">{project.title}</h3>
                  <p className="room-meta">
                    {project.category}
                    <br />
                    {project.location}
                  </p>
                </>
              )}
            </Link>
          );
        })}
      </div>

      <p className="max-w-[60ch] text-sm">
        Selected works, drawn as a plan. Choose a room to open the project.
      </p>
    </section>
  );
}
