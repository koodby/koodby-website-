"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "/researches", label: "Insights" },
  { href: "#contact", label: "Contact" },
];

export function Nav({ logo }: { logo?: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-[#0a0a0c]/80 backdrop-blur-md border-b border-hairline/50 dark:border-white/10 shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12 flex h-[72px] items-center justify-between"
      >
        {/* Left side: Logo */}
        <div className="flex-1 flex justify-start">
          <a href="/" className="flex items-center" aria-label="Koodby — Home">
            {logo ?? (
              <div className="bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/50 dark:border-white/20 text-ink px-5 py-2 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-[24px] font-black tracking-tight leading-none pt-0.5 -translate-x-1">koodby</span>
              </div>
            )}
          </a>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative flex overflow-hidden text-[14px] font-medium text-ink"
                >
                  <span className="transition-transform duration-0 group-hover:duration-500 ease-out group-hover:-translate-y-full">{l.label}</span>
                  <span className="absolute inset-0 transition-transform duration-0 group-hover:duration-500 ease-out translate-y-full group-hover:translate-y-0">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: CTAs */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <a
            href="/links"
            className="group inline-flex items-center gap-4 rounded-xl bg-[#1c1c1c] p-1.5 pl-5 border border-white/10 transition-transform hover:scale-[1.02] shadow-sm"
          >
            <span className="text-[14.5px] font-medium text-white">See our links</span>
            <div className="relative flex h-[34px] w-[42px] items-center justify-center overflow-hidden rounded-lg bg-[#2563EB] transition-colors group-hover:bg-[#1D4ED8]">
              <ArrowUpRight size={18} strokeWidth={2.5} className="text-white transition-transform duration-0 group-hover:duration-500 ease-out group-hover:translate-x-6 group-hover:-translate-y-6" aria-hidden />
              <ArrowUpRight size={18} strokeWidth={2.5} className="absolute text-white transition-transform duration-0 group-hover:duration-500 ease-out -translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0" aria-hidden />
            </div>
          </a>
        </div>
      </nav>
    </header>
  );
}
