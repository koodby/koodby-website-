"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#about-us", label: "About us" },
  { href: "/research", label: "Research" },
  { href: "/community", label: "Community" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-white/85 backdrop-blur-sm transition-colors ${
        scrolled ? "border-b" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12 flex h-[68px] items-center justify-between"
      >
        <a href="/" className="rounded-btn" aria-label="Koodby — Home">
          <Logo />
        </a>

        {/* desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[16px] text-muted transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="/#contact-us" className="btn-primary !py-2.5 !px-5 text-sm">
            Contact us
          </a>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-btn border text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
        </button>
      </nav>

      {/* mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t bg-white md:hidden">
          <ul className="container-koodby flex flex-col gap-1 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-btn px-2 py-3 text-base text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="/#contact-us"
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                Contact us
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
