import type { Metadata } from "next";
import CopyButton from "../components/CopyButton";
import { Fade, SplitReveal } from "../components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Eunice Moh Hau Yan, Assistant Architect and Interior Designer based in Kuala Lumpur, Malaysia.",
};

const methods = [
  {
    label: "Email",
    value: "eunice.moh00@gmail.com",
    href: "mailto:eunice.moh00@gmail.com",
  },
  {
    label: "Phone",
    value: "+6017-7288268",
    href: "tel:+60177288268",
  },
];

export default function Contact() {
  return (
    <main className="page pt-8 md:pt-16">
      <SplitReveal as="h1" className="title">
        Let&apos;s talk
      </SplitReveal>

      <div className="grid-12 mt-16 gap-y-12 md:mt-28">
        <SplitReveal
          as="p"
          className="col-span-12 max-w-[32ch] md:col-span-9 md:col-start-4 lede"
          delay={0.1}
        >
          Have a project in mind, or just want to say hello? I&apos;d love to
          hear from you.
        </SplitReveal>

        <dl className="col-span-12 border-b border-line">
          {methods.map((method, i) => (
            <Fade
              key={method.label}
              delay={0.1 * i}
              className="grid-12 items-baseline gap-y-2 border-t border-line py-6 md:py-8"
            >
              <dt className="label col-span-12 md:col-span-3">
                {method.label}
              </dt>
              <dd className="col-span-9 break-words text-[clamp(1.5rem,4.2vw,4rem)] leading-[1.05] tracking-[-0.035em] md:col-span-7">
                <a href={method.href} className="link">
                  {method.value}
                </a>
              </dd>
              <dd className="col-span-3 text-right md:col-span-2 md:col-start-11">
                <CopyButton value={method.value} />
              </dd>
            </Fade>
          ))}
          <Fade
            className="grid-12 items-baseline gap-y-2 border-t border-line py-6 md:py-8"
            delay={0.2}
          >
            <dt className="label col-span-12 md:col-span-3">Location</dt>
            <dd className="col-span-12 text-[clamp(1.5rem,4.2vw,4rem)] leading-[1.05] tracking-[-0.035em] md:col-span-9">
              Kuala Lumpur, Malaysia
            </dd>
          </Fade>
        </dl>
      </div>
    </main>
  );
}
