import Image from "next/image";
import Link from "next/link";

type NextProjectLinkProps = {
  slug: string;
  title: string;
  index: number;
  /** Thumbnail; projects without photography get an accent tile with their number. */
  image?: string;
};

/** Centred black card at the end of a project: thumbnail, title, "Go to next project". */
export default function NextProjectLink({
  slug,
  title,
  index,
  image,
}: NextProjectLinkProps) {
  return (
    <div className="flex justify-center py-28 md:py-40">
      <Link
        href={`/work/${slug}`}
        className="flex w-full max-w-[22rem] items-center gap-4 rounded-md bg-black p-2 pr-5 text-white"
      >
        <span className="relative aspect-[5/4] w-28 shrink-0 overflow-hidden rounded-[3px] bg-accent text-black">
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              sizes="112px"
              className="object-cover"
            />
          ) : (
            <span className="absolute bottom-1 left-2 text-3xl tracking-[-0.045em]">
              {String(index).padStart(2, "0")}
            </span>
          )}
        </span>

        <span className="min-w-0 text-[1.125rem] leading-tight tracking-[-0.02em]">
          <span className="block">
            {title}
          </span>
          <span className="block text-white/55">
            Go to next project
          </span>
        </span>
      </Link>
    </div>
  );
}
