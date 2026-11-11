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
    span: "md:col-span-5",
  },
  {
    label: "Email",
    value: "eunice.moh00@gmail.com",
    href: "mailto:eunice.moh00@gmail.com",
    Icon: Mail,
    span: "md:col-span-7",
  },
];

export default function Contact() {
  return (
    <main className="flex flex-col gap-12 px-4 py-12 sm:px-10 sm:py-20">
      <section className="flex max-w-3xl flex-col gap-6">
        <h1>Let&apos;s talk</h1>
        <p className="max-w-[48ch] text-lg sm:text-xl">
          Have a project in mind, or just want to say hello? I&apos;d love to
          hear from you.
        </p>
      </section>

      <div className="plan md:grid-cols-12">
        {contactMethods.map((method) => (
          <div
            key={method.label}
            className={`flex items-center gap-4 p-5 sm:p-8 ${method.span}`}
          >
            <method.Icon size={26} strokeWidth={2} className="shrink-0" />
            <a
              href={method.href}
              className="flex min-w-0 flex-1 flex-col items-start underline-offset-4 hover:underline"
            >
              <span className="text-sm">{method.label}</span>
              <span className="font-heading text-xl break-words mark-sky sm:text-3xl">
                {method.value}
              </span>
            </a>
            <CopyButton value={method.value} />
          </div>
        ))}

        <div className="flex items-center gap-4 p-5 sm:p-8 md:col-span-12">
          <MapPin size={26} strokeWidth={2} className="shrink-0" />
          <div className="flex min-w-0 flex-col items-start">
            <span className="text-sm">Location</span>
            <span className="font-heading text-xl mark-butter sm:text-3xl">
              Kuala Lumpur, Malaysia
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
