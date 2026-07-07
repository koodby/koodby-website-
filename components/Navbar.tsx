"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { label: "Services", href: "#services", chevron: true },
  { label: "Work", href: "#work", chevron: false },
  { label: "About", href: "#about-us", chevron: false },
];

/** In-hero navbar (sits on the background image, non-sticky per the design). */
export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="animate-fade-down relative z-20">
      <nav
        aria-label="Main navigation"
        className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5 lg:px-10"
      >
        <a href="#top" aria-label="Koodby — top of page" className="text-gray-900">
          <Logo size={22} />
        </a>

        {/* desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-1 text-[13px] text-gray-700 transition-colors hover:text-gray-900"
            >
              {l.label}
              {l.chevron && <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#contact-us"
            className="rounded-full bg-gray-900 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-gray-800 sm:px-5"
          >
            Contact us
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-900 hover:bg-gray-900/10 md:hidden"
            aria-expanded={open}
            aria-controls="hero-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="hero-mobile-menu"
          className="animate-fade-up absolute left-4 right-4 top-full rounded-2xl bg-white/80 px-5 py-3 ring-1 ring-gray-200 backdrop-blur-xl md:hidden"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-gray-200 py-3 text-[15px] text-gray-700 last:border-b-0 hover:text-gray-900"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
