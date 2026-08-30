import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "./components/Navbar";
import "./globals.css";

const gambarino = localFont({
  src: "./fonts/Gambarino-Regular.otf",
  variable: "--font-gambarino",
  weight: "400",
  style: "normal",
  display: "swap",
});

const switzer = localFont({
  src: "./fonts/Switzer-Light.otf",
  variable: "--font-switzer",
  weight: "300",
  style: "normal",
  display: "swap",
});

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
      className={`${gambarino.variable} ${switzer.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col  ">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
