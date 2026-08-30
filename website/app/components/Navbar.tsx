import Link from "next/link";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex  items-center justify-end  bg-sand/80 px-6 py-3 backdrop-blur sm:px-10">
      <ul className="flex items-center gap-6 font-body text-sm text-ink sm:gap-8 sm:text-2xl">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="transition-colors hover:text-ink/60"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
