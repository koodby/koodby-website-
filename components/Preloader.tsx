"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { PRELOAD_DONE_EVENT } from "@/components/anim/usePreloadReady";

/**
 * Intro curtain. Black full-screen overlay with a 0 → 100 counter while the
 * page loads its fonts and images behind it, then slides up to reveal the hero.
 *
 * Mounted in the root layout, so it runs once per document load — a hard visit
 * or a refresh shows it; client-side navigation between routes does not.
 */

const MIN_MS = 1500; // floor, so the counter stays readable on a fast connection
const MAX_MS = 6000; // failsafe: never trap the visitor behind one slow asset

// Somali captions, one per quarter of the count.
const STEPS = [
  { until: 25, label: "Soo dhawoow" },
  { until: 50, label: "Koodby Studio" },
  { until: 75, label: "Somali digital builders" },
  { until: 101, label: "Diyaar" },
];

const stepFor = (p: number) => {
  const i = STEPS.findIndex((s) => p < s.until);
  return i === -1 ? STEPS.length - 1 : i;
};

export function Preloader() {
  // Only show the preloader on the home page. Skip it everywhere else.
  const pathname = usePathname();
  const skip = pathname !== "/";
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">(
    skip ? "done" : "loading",
  );
  const loadedRef = useRef(false);

  // Real readiness: webfonts settled + every sub-resource of the document loaded.
  useEffect(() => {
    let alive = true;
    const documentLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    Promise.all([documentLoaded, document.fonts?.ready ?? Promise.resolve()])
      .catch(() => undefined)
      .then(() => {
        if (alive) loadedRef.current = true;
      });
    return () => {
      alive = false;
    };
  }, []);

  // Reduced motion: skip the whole intro rather than animate at someone.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
    }
  }, []);

  // Counter. Time-driven to 92 so it reads evenly, then races to 100 once the
  // page is actually ready.
  useEffect(() => {
    if (phase !== "loading") return;

    // Count from navigation, not from hydration: a slow device that takes a
    // second to boot React shouldn't add that second on top of the intro.
    // Capped, so the counter is always visibly counting rather than teleporting.
    const headStart = Math.min(performance.now(), MIN_MS * 0.6);
    const start = performance.now() - headStart;
    let value = 0;
    let raf = 0;
    let hold = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const ready = loadedRef.current || elapsed >= MAX_MS;

      if (ready && elapsed >= MIN_MS) {
        value += (100 - value) * 0.14;
        if (value > 99.4) value = 100;
      } else {
        value = Math.max(value, Math.min(92, (elapsed / MIN_MS) * 92));
      }

      setProgress(Math.round(value));

      if (value >= 100) {
        hold = window.setTimeout(() => setPhase("reveal"), 320);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(hold);
    };
  }, [phase]);

  // Scroll stays locked under the curtain; gated sections start as it lifts.
  useEffect(() => {
    const html = document.documentElement;
    if (phase === "loading") {
      html.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
      return;
    }
    if (phase === "reveal") {
      window.__koodbyPreloadDone = true;
      window.dispatchEvent(new Event(PRELOAD_DONE_EVENT));
      return;
    }
    window.__koodbyPreloadDone = true;
    window.dispatchEvent(new Event(PRELOAD_DONE_EVENT));
    html.style.overflow = "";
    document.body.style.overflow = "";
  }, [phase]);

  const step = stepFor(progress);

  if (phase === "done") return null;

  return (
    <>
      {/* Without JS the counter never runs, so the curtain must not exist. */}
      <noscript>
        <style>{`#preloader{display:none!important}`}</style>
      </noscript>

      <motion.div
        id="preloader"
        aria-hidden="true"
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A] text-[#FAFAF7]"
        initial={false}
        animate={{ y: phase === "reveal" ? "-100%" : "0%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => {
          if (phase === "reveal") setPhase("done");
        }}
      >
        <div className="flex items-baseline font-sans font-black tracking-tighter tabular-nums">
          <span className="text-[22vw] leading-none md:text-[160px]">
            {progress}
          </span>
          <span className="ml-1 text-[6vw] leading-none text-white/40 md:text-[40px]">
            %
          </span>
        </div>

        {/* All four captions are stacked and cross-faded by index — swapping a
            single keyed node drops steps when the counter jumps. */}
        <div className="relative mt-6 h-5 w-full overflow-hidden">
          {STEPS.map((s, i) => {
            const active = i === step;
            return (
              <motion.p
                key={s.label}
                className="absolute inset-x-0 text-center text-[11px] uppercase tracking-[0.28em] text-white/45 md:text-[13px]"
                initial={{ opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 12 }}
                animate={{
                  opacity: active ? 1 : 0,
                  y: active ? 0 : i < step ? -12 : 12,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {s.label}
              </motion.p>
            );
          })}
        </div>

        {/* Hairline that fills with the count. */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10">
          <div
            className="h-full origin-left bg-white/60"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </motion.div>
    </>
  );
}
