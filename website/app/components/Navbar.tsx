"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between gap-3 bg-sand/80 px-4 py-3 backdrop-blur sm:px-10">
      {isHome ? (
        <span />
      ) : (
        <Link
          href="/"
          aria-label="Back to Home"
          className="flex shrink-0 items-center gap-2 text-xs uppercase tracking-[0.2em] text-black underline-offset-4 hover:underline sm:text-sm"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">Back to Home</span>
        </Link>
      )}

      <ul className="flex items-center gap-4 font-body text-xs uppercase tracking-[0.2em] text-black sm:gap-10 sm:text-sm">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-black underline-offset-8 decoration-2 hover:underline ${
                  isActive ? "underline" : ""
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
