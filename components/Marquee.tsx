"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-driven image marquee (layout + animation ported from the reference).
 * Two rows of real project screenshots that slide in opposite directions as the
 * page scrolls. Koodby light theme. Images live in /public.
 */
const shots = [
  { src: "/work-omar.png", alt: "Omar Hassan — filmmaker portfolio" },
  { src: "/work-gabax.png", alt: "Gabax — logistics & shipping platform" },
  { src: "/work-khalif.png", alt: "Khalif Rooble — consultant portfolio" },
  { src: "/tarzan.png", alt: "Tarzan — software engineering portfolio" },
];

// Tripled for a seamless loop.
const rowA = [...shots, ...shots, ...shots];
const rowB = [...[...shots].reverse(), ...[...shots].reverse(), ...[...shots].reverse()];

function Tile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-[168px] w-[260px] shrink-0 overflow-hidden rounded-2xl border bg-surface shadow-sm sm:h-[210px] sm:w-[330px] md:h-[270px] md:w-[420px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}

export function Marquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowARef = useRef<HTMLDivElement>(null);
  const rowBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      if (rowARef.current) rowARef.current.style.transform = `translate3d(${offset - 200}px,0,0)`;
      if (rowBRef.current) rowBRef.current.style.transform = `translate3d(${-(offset - 200)}px,0,0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Recent work"
      className="overflow-hidden bg-transparent py-16 sm:py-20"
    >
      <p className="eyebrow mb-8 text-center sm:mb-10">Recent work</p>
      <div className="flex flex-col gap-3">
        <div
          ref={rowARef}
          className="flex gap-3 will-change-transform"
          style={{ transform: "translate3d(-200px,0,0)" }}
        >
          {rowA.map((s, i) => (
            <Tile key={`a-${i}`} {...s} />
          ))}
        </div>
        <div
          ref={rowBRef}
          className="flex gap-3 will-change-transform"
          style={{ transform: "translate3d(200px,0,0)" }}
        >
          {rowB.map((s, i) => (
            <Tile key={`b-${i}`} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
