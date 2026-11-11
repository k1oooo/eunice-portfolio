import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Motion from "./components/Motion";
import "./globals.css";

// One family: Switzer Light for display and body.
const switzer = localFont({
  src: "../public/fonts/Switzer-Light.otf",
  variable: "--font-switzer",
  weight: "300",
  style: "normal",
  display: "swap",
});

// Runs before first paint. `data-js` switches on the hidden initial states that
// GSAP reveals (skipped for reduced motion, so content is never hidden then);
// `data-loader="skip"` hides the loader on repeat visits this session.
const motionGate = `try{var d=document.documentElement,r=matchMedia("(prefers-reduced-motion: reduce)").matches;if(!r)d.dataset.js="1";if(r||sessionStorage.getItem("loader-seen"))d.dataset.loader="skip"}catch(e){}`;

const title = "Eunice Moh Hau Yan | Architect & Interior Designer";
const description =
  "Portfolio of Eunice Moh Hau Yan, Assistant Architect and Interior Designer based in Kuala Lumpur, Malaysia. Selected works spanning architecture, interior design, and spatial storytelling.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | Eunice Moh Hau Yan",
  },
  description,
  keywords: [
    "Eunice Moh Hau Yan",
    "architect Kuala Lumpur",
    "interior designer Malaysia",
    "architectural portfolio",
    "assistant architect Malaysia",
  ],
  authors: [{ name: "Eunice Moh Hau Yan" }],
  creator: "Eunice Moh Hau Yan",
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_MY",
    siteName: "Eunice Moh Hau Yan",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${switzer.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
        <noscript>
          <style>{".loader{display:none!important}"}</style>
        </noscript>
      </head>
      <body id="top" className="flex min-h-full flex-col">
        <Motion />
        <Loader />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
