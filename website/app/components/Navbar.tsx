"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-end bg-sand/80 px-6 py-3 backdrop-blur sm:px-10">
      <ul className="flex items-center gap-6 font-body text-sm text-ink sm:gap-8 sm:text-xl">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-colors ${
                  isActive ? "text-ink" : "text-ink/40 hover:text-ink/70"
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
