"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "./anim/FadeIn";
import { useReveal } from "./anim/useReveal";
import { WordReveal } from "./anim/WordReveal";

/**
 * Projects — minimalist 100vh list layout (editorial style).
 * Left side: large serif heading. Right side: project list with tags.
 */
const EASE = [0.25, 0.1, 0.25, 1] as const;

type Project = {
  name: string;
  category: string;
  tags: string[];
  href: string;
  img: string;
};

const projects: Project[] = [
  {
    name: "Omar Hassan",
    category: "Filmmaker portfolio",
    tags: ["Web Design", "Branding", "Responsive"],
    href: "#",
    img: "/work-omar.png",
  },
  {
    name: "Gabax",
    category: "Logistics & shipping platform",
    tags: ["App Design", "Dashboard", "UX/UI"],
    href: "#",
    img: "/work-gabax.png",
  },
  {
    name: "Khalif Rooble",
    category: "Consultant portfolio",
    tags: ["Web Design", "Branding", "One-pager"],
    href: "#",
    img: "/work-khalif.png",
  },
];

function ProjectRow({
  project,
  index,
  onHover,
}: {
  project: Project;
  index: number;
  onHover: () => void;
}) {
  const { ref, shown } = useReveal<HTMLLIElement>();

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 20 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      className="border-b border-hairline last:border-b-0"
    >
      <a
        href={project.href}
        target={project.href.startsWith("http") ? "_blank" : undefined}
        rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
        onMouseEnter={onHover}
        onFocus={onHover}
        className="group flex flex-col gap-4 py-6 sm:py-8 lg:py-10 transition-colors"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span
              className="font-display text-[28px] sm:text-[36px] lg:text-[44px] font-light leading-none text-muted/25"
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-xl sm:text-2xl lg:text-[28px] text-ink transition-colors group-hover:text-muted">
                {project.name}
              </h3>
              <p className="mt-0.5 text-[13px] sm:text-[14px] text-muted">
                {project.category}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-medium text-ink transition-colors group-hover:bg-ink group-hover:text-off-white">
              Visit site
              <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
            </span>
            <ArrowUpRight
              size={20}
              className="sm:hidden text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 sm:pl-[72px] pl-[52px]">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white px-3 sm:px-4 py-1 sm:py-1.5 text-[12px] sm:text-[13px] font-medium text-ink border border-hairline shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </a>
    </motion.li>
  );
}

export function Projects() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="work"
      className="bg-off-white min-h-[100dvh] flex items-center justify-center py-16 lg:py-20 overflow-hidden"
    >
      <div className="container-koodby w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 xl:gap-24 items-center">

          {/* Left Column — Large heading */}
          <div className="flex flex-col h-full lg:py-10">
            <FadeIn>
              <p className="eyebrow mb-5">Selected work</p>
            </FadeIn>
            <WordReveal
              lines={[
                { text: "Projects", className: "text-ink" },
                { text: "we've", className: "text-ink" },
                { text: "shipped for", className: "text-muted mt-1 lg:mt-2" },
                { text: "real clients", className: "text-muted" },
              ]}
              className="text-[44px] sm:text-[56px] lg:text-[64px] xl:text-[76px] font-display leading-[1.05] tracking-tight"
            />

            {/* Live preview — crossfades to the hovered project */}
            <FadeIn delay={0.2} className="hidden lg:block mt-12 lg:mt-20 xl:mt-28">
              <div className="relative w-[280px] xl:w-[320px] aspect-[16/10] rounded-xl overflow-hidden border border-hairline shadow-sm">
                {projects.map((p, i) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={p.name}
                    src={p.img}
                    alt={active === i ? `${p.name} preview` : ""}
                    aria-hidden={active !== i}
                    className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${
                      active === i ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right Column — Project list */}
          <div className="flex flex-col w-full">
            <ul className="flex flex-col border-t border-hairline w-full">
              {projects.map((project, i) => (
                <ProjectRow
                  key={project.name}
                  project={project}
                  index={i}
                  onHover={() => setActive(i)}
                />
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
