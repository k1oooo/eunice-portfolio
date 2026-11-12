import Image from "next/image";
import type { ElementType, ReactNode } from "react";
import { contact } from "../lib/contact";
import CopyButton from "./CopyButton";
import { Fade, ImageReveal, SplitReveal } from "./Reveal";

type PlainProps = {
  start?: string;
  as?: ElementType;
  className?: string;
  children: ReactNode;
  delay?: number;
  y?: number;
};

/** Same shape as the animated wrappers, without any animation or hidden state. */
function Plain({ as: Tag = "div", className, children }: PlainProps) {
  return <Tag className={className}>{children}</Tag>;
}

function PlainPicture({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
  delay?: number;
}) {
  return <div className={className}>{children}</div>;
}

/**
 * The contact layout from the reference: big statement on the left, labelled
 * details and a photo on the right, social links bottom-left.
 *
 * `animated` runs the entrance reveals (the /contact page). The end-of-page
 * reveal panel is fixed in place and driven by scroll instead, so it renders
 * plain.
 */
export default function ContactSection({
  animated = false,
  asHeading = "h2",
  className = "",
}: {
  animated?: boolean;
  asHeading?: "h1" | "h2";
  className?: string;
}) {
  const Split = animated ? SplitReveal : Plain;
  const Rise = animated ? Fade : Plain;
  const Picture = animated ? ImageReveal : PlainPicture;

  return (
    <section
      className={`page flex min-h-svh flex-col bg-contact pt-[calc(var(--header-h)+2.5rem)] pb-[var(--gutter)] ${className}`}
    >
      <div className="grid-12 flex-1 gap-y-14 md:min-h-0 md:pt-[min(12svh,8rem)]">
        <div className="col-span-12 flex flex-col justify-between gap-16 md:col-span-7">
          <Split
            as={asHeading}
            className="text-[clamp(2.5rem,4.7vw,6rem)] leading-[0.96] tracking-[-0.05em]"
          >
            {contact.statement}
          </Split>

          {/* start: this sits right at the bottom edge of the screen */}
          <Rise
            className="text-[1.0625rem]"
            delay={0.3}
            y={12}
            start="top 100%"
          >
            {contact.socials.map((social, i) => (
              <span key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label}
                </a>
                {i < contact.socials.length - 1 && ", "}
              </span>
            ))}
          </Rise>
        </div>

        <div className="col-span-12 flex flex-col md:col-span-5 md:min-h-0">
          <dl className="grid grid-cols-1 items-baseline gap-x-[var(--gutter)] gap-y-1 md:grid-cols-[1.4fr_3fr] md:gap-y-5 text-[clamp(1.25rem,1.7vw,1.75rem)] leading-tight tracking-[-0.03em]">
            <Rise as="div" className="contents" delay={0.15} y={12}>
              <dt className="text-[0.9375rem] tracking-normal uppercase max-md:mt-5 max-md:first:mt-0">
                Email
              </dt>
              <dd className="flex flex-wrap items-baseline gap-x-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="link break-words"
                >
                  {contact.email}
                </a>
                <CopyButton value={contact.email} />
              </dd>
              <dt className="text-[0.9375rem] tracking-normal uppercase max-md:mt-5 max-md:first:mt-0">
                Phone
              </dt>
              <dd className="flex flex-wrap items-baseline gap-x-3">
                <a href={contact.phoneHref} className="link">
                  {contact.phone}
                </a>
                <CopyButton value={contact.phone} />
              </dd>
              <dt className="text-[0.9375rem] tracking-normal uppercase max-md:mt-5 max-md:first:mt-0">
                Resume
              </dt>
              <dd>
                <a href={contact.resumeHref} download className="link">
                  Download PDF
                </a>
              </dd>
            </Rise>
          </dl>

          <Picture
            className="relative mt-14 aspect-[4/5] w-full md:mt-12 md:ml-[31.8%] md:aspect-auto md:min-h-0 md:w-[68.2%] md:flex-1"
            delay={0.2}
          >
            <Image
              src="/images/eunice-pfp.png"
              alt="Portrait of Eunice Moh"
              fill
              sizes="(min-width: 768px) 25vw, 100vw"
              className="object-cover object-[50%_70%]"
            />
          </Picture>
        </div>
      </div>
    </section>
  );
}
