"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "koodby-theme";

/**
 * Floating day/night switch. Persists to localStorage; the actual class is set
 * pre-paint by the inline script in layout.tsx (no flash), so here we only mirror
 * the current state and toggle it.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");

    // Suspend transitions across the swap — see `.theme-switching` in globals.css.
    root.classList.add("theme-switching");
    root.classList.toggle("dark", next);
    // Force a style flush so the new colours land before transitions come back.
    void root.offsetHeight;
    root.classList.remove("theme-switching");

    try {
      localStorage.setItem(KEY, next ? "dark" : "light");
    } catch {}
    setDark(next);
  };

  // Avoid rendering the wrong icon before we know the theme.
  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to day mode" : "Switch to night mode"}
      title={dark ? "Day mode" : "Night mode"}
      className="fixed bottom-6 right-8 z-50 flex h-[34px] w-[60px] items-center rounded-full bg-[#2563EB] px-1 transition-colors focus:outline-none shadow-sm cursor-pointer"
    >
      <span
        className={`flex h-[26px] w-[30px] transform items-center justify-center rounded-[13px] bg-white transition-transform duration-300 ease-in-out ${
          dark ? "translate-x-[22px]" : "translate-x-0"
        }`}
      >
        {dark ? (
          <Moon size={14} strokeWidth={2.5} className="text-[#2563EB]" aria-hidden />
        ) : (
          <Sun size={14} strokeWidth={2.5} className="text-[#2563EB]" aria-hidden />
        )}
      </span>
    </button>
  );
}
