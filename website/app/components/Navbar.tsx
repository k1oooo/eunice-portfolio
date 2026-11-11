"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, lockScroll, prefersReducedMotion } from "../lib/motion";

const links = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
];

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(root.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.7,
        ease: "power4.inOut",
      });
      gsap.from("[data-menu-link]", {
        yPercent: 110,
        duration: 1,
        ease: "power4.out",
        stagger: 0.07,
        delay: 0.2,
      });
      gsap.from("[data-menu-foot]", {
        opacity: 0,
        duration: 0.6,
        delay: 0.6,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div
      id="menu"
      ref={root}
      className="page fixed inset-x-0 top-(--header-h) bottom-0 z-40 flex flex-col justify-between bg-paper pb-8 md:hidden"
    >
      <ul className="flex flex-col pt-6">
        {menuItems.map((item) => (
          <li key={item.href} className="overflow-hidden py-1">
            <Link
              href={item.href}
              onClick={onNavigate}
              data-menu-link
              className="statement block"
              style={{ fontSize: "clamp(3rem, 16vw, 6rem)" }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <p data-menu-foot className="text-mute">
        Kuala Lumpur, Malaysia
      </p>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);

  const isWork = pathname === "/" || pathname.startsWith("/work");

  // Mobile menu: lock scroll, close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    lockScroll(true);
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Slide away when scrolling down, return as soon as the visitor scrolls up.
  useEffect(() => {
    const el = header.current;
    if (!el || prefersReducedMotion()) return;

    let lastY = window.scrollY;
    let hidden = false;
    const toggle = (hide: boolean) => {
      if (hide === hidden) return;
      hidden = hide;
      gsap.to(el, {
        yPercent: hide ? -100 : 0,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
        onComplete: () => {
          if (!hide) gsap.set(el, { clearProps: "transform" });
        },
      });
    };

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      if (Math.abs(dy) < 6) return;
      toggle(dy > 0 && y > 160);
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header ref={header} className="page sticky top-0 z-50 bg-paper">
        <nav
          aria-label="Main"
          className="grid-12 h-(--header-h) items-center text-[0.9375rem]"
        >
          <Link href="/" onClick={close} className="col-span-6 md:col-span-3">
            Eunice Moh
          </Link>

          <p className="col-span-4 hidden md:block">
            {links.map((link, i) => {
              const current =
                link.href === "/" ? isWork : pathname === link.href;
              return (
                <span key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    className="link"
                  >
                    {link.label}
                  </Link>
                  {i < links.length - 1 && ", "}
                </span>
              );
            })}
          </p>

          <p className="col-span-3 hidden text-mute md:block">
            : Kuala Lumpur, MY
          </p>

          <div className="col-span-6 text-right md:col-span-2">
            <Link
              href="/contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
              className="link hidden md:inline"
            >
              Contact
            </Link>
            <button
              type="button"
              className="md:hidden"
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </header>
      {/* Outside the header: its transform would otherwise contain this fixed overlay. */}
      {open && <MobileMenu onNavigate={close} />}
    </>
  );
}
