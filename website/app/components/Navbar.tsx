"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** The nav doubles as the top wall of every page's plan. */
export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-solid border-ink bg-sand/90 px-4 py-3 backdrop-blur sm:px-10"
      style={{ borderBottomWidth: "var(--wall)" }}
    >
      <Link href="/" className="font-heading text-lg sm:text-xl">
        Eunice Moh
      </Link>

      <ul className="flex items-center gap-5 text-base sm:gap-8 sm:text-lg">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/" || pathname.startsWith("/work")
              : pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`underline-offset-4 hover:underline ${
                  isActive ? "mark-sky" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
