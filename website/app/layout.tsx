import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Motion from "./components/Motion";
import PageShell from "./components/PageShell";
import { site } from "./lib/site";
import "./globals.css";

// One family at a heavier weight: General Sans Medium for display and body,
// matching the reference's tight, medium-weight grotesk.
const sans = localFont({
  src: "../public/fonts/GeneralSans-Medium.otf",
  variable: "--font-general-sans",
  weight: "500",
  style: "normal",
  display: "swap",
});

// Runs before first paint. `data-js` switches on the hidden initial states that
// GSAP reveals (skipped for reduced motion, so content is never hidden then);
// `data-loader="skip"` hides the loader on repeat visits this session.
const motionGate = `try{var d=document.documentElement,r=matchMedia("(prefers-reduced-motion: reduce)").matches;if(!r)d.dataset.js="1";if(r||sessionStorage.getItem("loader-seen"))d.dataset.loader="skip"}catch(e){}`;

const title = `${site.name} | ${site.role}`;
const description =
  "Portfolio of Eunice Moh Hau Yan, Assistant Architect and Interior Designer based in Kuala Lumpur, Malaysia. Selected works spanning architecture, interior design, and spatial storytelling.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  keywords: [
    "Eunice Moh Hau Yan",
    "architect Kuala Lumpur",
    "interior designer Malaysia",
    "architectural portfolio",
    "assistant architect Malaysia",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  // Share images come from app/opengraph-image.tsx and app/twitter-image.tsx.
  openGraph: {
    title,
    description,
    url: "/",
    type: "website",
    locale: "en_MY",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressCountry: site.country,
  },
  knowsAbout: ["Architecture", "Interior design"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <noscript>
          <style>{".loader{display:none!important}"}</style>
        </noscript>
      </head>
      <body id="top" className="min-h-full">
        <Motion />
        <Loader />
        <Navbar />
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
