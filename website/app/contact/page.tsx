import type { Metadata } from "next";
import ContactSection from "../components/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  description:
    "Get in touch with Eunice Moh Hau Yan, Assistant Architect and Interior Designer based in Kuala Lumpur, Malaysia.",
};

export default function Contact() {
  return (
    <main>
      <ContactSection animated asHeading="h1" />
    </main>
  );
}
