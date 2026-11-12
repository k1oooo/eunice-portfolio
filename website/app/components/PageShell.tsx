"use client";

import { usePathname } from "next/navigation";
import ContactReveal from "./ContactReveal";

/**
 * Wraps every page. Regular pages sit above a fixed contact panel with a
 * viewport-high bottom margin, so scrolling to the end slides the page up and
 * reveals the panel. /contact is that panel as a page, so it gets no wrapper.
 */
export default function PageShell({ children }: { children: React.ReactNode }) {
  const isContact = usePathname() === "/contact";

  return (
    <>
      <div
        id="page-shell"
        className={
          isContact
            ? ""
            : "relative z-10 bg-paper pt-(--header-h) md:mb-[100svh]"
        }
      >
        {children}
      </div>
      <ContactReveal />
    </>
  );
}
