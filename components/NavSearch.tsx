"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { type ResearchRow } from "@/lib/research-data";

type Result = {
  label: string;
  hint: string;
  href: string;
};

/** Static destinations, plus every research post, all searchable in one list. */
const pages: Result[] = [
  { label: "Home", hint: "Page", href: "/" },
  { label: "Work", hint: "Section", href: "/#work" },
  { label: "Services", hint: "Section", href: "/#services" },
  { label: "Process", hint: "Section", href: "/#process" },
  { label: "About us", hint: "Section", href: "/#about-us" },
  { label: "FAQ", hint: "Section", href: "/#faq" },
  { label: "Research", hint: "Page", href: "/researches" },
  { label: "Community", hint: "Page", href: "/community" },
  { label: "Links", hint: "Page", href: "/links" },
  { label: "Contact us", hint: "Section", href: "/#contact-us" },
];

function buildIndex(posts: Result[]): Result[] {
  return [...pages, ...posts];
}

/**
 * Navbar search. Filters site sections, pages, and research posts client-side —
 * no backend, no index to keep in sync beyond `pages` above and the post data.
 * Opens on click or "/", closes on Escape or outside click.
 */
export function NavSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [postResults, setPostResults] = useState<Result[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load research posts once for the search index (client-side from Supabase).
  useEffect(() => {
    let alive = true;
    createClient()
      .from("research_posts")
      .select("slug, title, category")
      .order("date", { ascending: false })
      .then(({ data }) => {
        if (!alive || !data) return;
        setPostResults(
          (data as Pick<ResearchRow, "slug" | "title" | "category">[]).map(
            (p) => ({
              label: p.title,
              hint: `Research · ${p.category}`,
              href: `/researches/${p.slug}`,
            }),
          ),
        );
      });
    return () => {
      alive = false;
    };
  }, []);

  const index = useMemo(() => buildIndex(postResults), [postResults]);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, 6);
    return index
      .filter(
        (r) =>
          r.label.toLowerCase().includes(q) || r.hint.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [index, query]);

  // Focus the field whenever the search opens, however it was opened.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // "/" focuses search from anywhere (ignored while typing in a field).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing =
        el?.tagName === "INPUT" ||
        el?.tagName === "TEXTAREA" ||
        el?.isContentEditable;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => setActive(0), [query]);

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    window.location.href = href;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].href);
    }
  };

  return (
    <div ref={wrapRef} className={`relative ${className ?? ""}`}>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Search the site"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink hover:bg-off-white"
        >
          <Search size={16} strokeWidth={1.9} aria-hidden />
        </button>
      ) : (
        <div className="flex h-9 items-center gap-2 rounded-pill border border-hairline bg-surface px-3">
          <Search size={15} strokeWidth={1.9} className="text-muted" aria-hidden />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search pages and research…"
            aria-label="Search pages and research"
            className="w-[190px] bg-transparent text-[14px] text-ink outline-none placeholder:text-muted lg:w-[230px]"
          />
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            aria-label="Close search"
            className="text-muted hover:text-ink"
          >
            <X size={15} strokeWidth={2} aria-hidden />
          </button>
        </div>
      )}

      {open && (
        <div className="absolute right-0 top-11 z-50 w-[280px] overflow-hidden rounded-card border border-hairline bg-surface py-2 shadow-float lg:w-[320px]">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-[14px] text-muted">
              Nothing matches “{query}”.
            </p>
          ) : (
            <ul>
              {results.map((r, i) => (
                <li key={r.href + r.label}>
                  <a
                    href={r.href}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between gap-3 px-4 py-2.5 text-[14px] ${
                      i === active ? "bg-off-white text-ink" : "text-ink"
                    }`}
                  >
                    <span className="truncate">{r.label}</span>
                    <span className="shrink-0 text-[12px] text-muted">
                      {r.hint}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
