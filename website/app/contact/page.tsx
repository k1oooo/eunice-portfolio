import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import CopyButton from "../components/CopyButton";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Eunice Moh Hau Yan, Assistant Architect and Interior Designer based in Kuala Lumpur, Malaysia.",
};

const contactMethods = [
  {
    label: "Phone",
    value: "+6017-7288268",
    href: "tel:+60177288268",
    Icon: Phone,
  },
  {
    label: "Email",
    value: "eunice.moh00@gmail.com",
    href: "mailto:eunice.moh00@gmail.com",
    Icon: Mail,
  },
];

export default function Contact() {
  return (
    <main className="flex min-h-screen flex-1 flex-col gap-16 mx-4 py-16 sm:mx-10 sm:py-24">
      <section className="max-w-3xl">
        <h1>Let&apos;s Talk</h1>
        <p className="mt-6 text-xl sm:text-2xl">
          Have a project in mind, or just want to say hello? I&apos;d love to
          hear from you.
        </p>
      </section>

      <section className="flex flex-col gap-8">
        {contactMethods.map((method) => (
          <div
            key={method.label}
            className="flex items-center gap-3 border-b border-ink/10 pb-6 sm:gap-4"
          >
            <method.Icon
              size={24}
              strokeWidth={2}
              className="shrink-0 sm:h-7 sm:w-7"
            />
            <a
              href={method.href}
              className="flex min-w-0 flex-1 flex-col items-start transition-colors hover:text-ink/60"
            >
              <span className="text-xs uppercase tracking-[0.2em]">
                {method.label}
              </span>
              <span className="font-heading text-lg break-words mark-sky sm:text-3xl">
                {method.value}
              </span>
            </a>
            <CopyButton value={method.value} />
          </div>
        ))}

        <div className="flex items-center gap-3 sm:gap-4">
          <MapPin
            size={24}
            strokeWidth={2}
            className="shrink-0 sm:h-7 sm:w-7"
          />
          <div className="flex min-w-0 flex-col items-start">
            <span className="text-xs uppercase tracking-[0.2em]">Location</span>
            <span className="font-heading text-lg mark-butter sm:text-3xl">
              Kuala Lumpur, Malaysia
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
