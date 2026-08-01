"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedLogo } from "./AnimatedLogo";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "/researches", label: "Insights" },
];

export function Nav({ logo }: { logo?: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || isMobileMenuOpen
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
            <a href="/" className="flex items-center" aria-label="Koodby — Home" onClick={() => setIsMobileMenuOpen(false)}>
              {logo ?? <AnimatedLogo />}
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
              className="hidden lg:inline-flex group items-center gap-4 rounded-xl bg-[#1c1c1c] p-1.5 pl-5 border border-white/10 transition-transform hover:scale-[1.02] shadow-sm"
            >
              <span className="text-[14.5px] font-medium text-white">See our links</span>
              <div className="relative flex h-[34px] w-[42px] items-center justify-center overflow-hidden rounded-lg bg-[#2563EB] transition-colors group-hover:bg-[#1D4ED8]">
                <ArrowUpRight size={18} strokeWidth={2.5} className="text-white transition-transform duration-0 group-hover:duration-500 ease-out group-hover:translate-x-6 group-hover:-translate-y-6" aria-hidden />
                <ArrowUpRight size={18} strokeWidth={2.5} className="absolute text-white transition-transform duration-0 group-hover:duration-500 ease-out -translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0" aria-hidden />
              </div>
            </a>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex lg:hidden items-center justify-center h-10 w-10 rounded-full bg-surface border border-hairline text-ink transition-colors hover:bg-off-white"
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} strokeWidth={2.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} strokeWidth={2.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 w-full z-40 bg-white dark:bg-[#0a0a0c] overflow-hidden flex flex-col pt-[88px] px-6 pb-8 shadow-md"
          >
            <div className="flex flex-col h-full justify-between">
              <ul className="flex flex-col gap-6 mt-8">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-[36px] font-black tracking-tight text-ink"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12 mb-safe"
              >
                <a
                  href="/links"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex w-full items-center justify-between gap-4 rounded-2xl bg-[#1c1c1c] p-2 pl-6 shadow-md"
                >
                  <span className="text-[17px] font-medium text-white">See our links</span>
                  <div className="relative flex h-[50px] w-[60px] items-center justify-center overflow-hidden rounded-xl bg-[#2563EB] transition-colors group-hover:bg-[#1D4ED8]">
                    <ArrowUpRight size={24} strokeWidth={2.5} className="text-white" />
                  </div>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
