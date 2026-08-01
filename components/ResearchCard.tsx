"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { FadeIn } from "./anim/FadeIn";
import { formatPostDate, type ResearchPost } from "@/lib/research-data";

export function ResearchCard({
  post,
  delay = 0,
  isFeatured = false,
}: {
  post: ResearchPost;
  delay?: number;
  isFeatured?: boolean;
}) {
  const {
    id,
    title,
    description,
    date,
    category,
    coverImage,
    coverAlt,
    codeSnippet,
    codeLanguage,
    externalUrl,
    externalLabel,
    tags,
    featuredPills,
  } = post;

  const categoryColor =
    category === "Behind the Code"
      ? "text-rose-500 bg-rose-500/10"
      : category === "AI & Data"
      ? "text-cyan-500 bg-cyan-500/10"
      : "text-indigo-400 bg-indigo-500/10";

  return (
    <FadeIn delay={delay}>
      <article
        id={id}
        className="group relative overflow-hidden"
      >
        {/* Category & Date */}
        <div className="flex items-center gap-3 text-[14px]">
          <span className={`rounded-md px-2.5 py-0.5 font-semibold ${categoryColor}`}>
            {category}
          </span>
          <span className="text-muted/70 text-[13px]">{formatPostDate(date)}</span>
        </div>

        {/* Title */}
        <h2 className="mt-3 text-[28px] font-bold tracking-tight text-ink sm:text-[36px] lg:text-[40px] leading-[1.15]">
          {title}
        </h2>

        {/* Custom Pixel-Point style visual graphic banner for Next Image */}
        {id === "next-image-notes" ? (
          <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#0f172a] p-6 sm:p-10 flex flex-col items-center justify-center shadow-lg">
            {/* Grid dot pattern background */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
            
            {/* Logo circle */}
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-2xl shadow-inner mb-3">
              N
            </div>
            
            {/* Center title */}
            <div className="relative z-10 font-bold text-white text-3xl sm:text-5xl lg:text-6xl tracking-tight text-center drop-shadow-md">
              next/image
            </div>

            {/* Pill badges */}
            <div className="relative z-10 mt-6 flex flex-wrap justify-center gap-2.5 sm:gap-3.5">
              {(featuredPills || ["React Component", "Image API", "Image Optimizer"]).map((pill) => (
                <span
                  key={pill}
                  className="rounded-full bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-slate-900 shadow-md"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        ) : coverImage ? (
          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-hairline bg-surface shadow-sm">
            <Image
              src={coverImage}
              alt={coverAlt ?? ""}
              fill
              sizes="(max-width: 1024px) 100vw, 750px"
              className="object-cover transition-transform duration-500 group-hover:scale-102"
            />
          </div>
        ) : codeSnippet ? (
          <div className="mt-6 overflow-hidden rounded-2xl border border-hairline bg-surface shadow-sm">
            {codeLanguage && (
              <p className="border-b border-hairline px-5 py-2.5 font-mono text-[12px] uppercase tracking-wider text-muted">
                {codeLanguage}
              </p>
            )}
            <pre className="overflow-x-auto px-5 py-4">
              <code className="font-mono text-[13px] leading-relaxed text-ink">
                {codeSnippet}
              </code>
            </pre>
          </div>
        ) : null}

        {/* Lead description body */}
        <div className="mt-6 text-[16px] sm:text-[17px] leading-relaxed text-muted font-normal whitespace-pre-wrap">
          {description.split(/(\*\*.*?\*\*)/g).map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
              return (
                <strong key={i} className="font-semibold text-teal">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={i}>{part}</span>;
          })}
        </div>

        {/* Tags & Links */}
        {(tags?.length || externalUrl) && (
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2.5">
            {tags?.map((tag) => (
              <span key={tag} className="text-[13px] font-medium text-muted/70">
                #{tag}
              </span>
            ))}

            {externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link ml-auto inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink hover:underline"
              >
                {externalLabel ?? "Read more"}
                <ArrowUpRight
                  size={15}
                  strokeWidth={2}
                  aria-hidden
                  className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
              </a>
            )}
          </div>
        )}
      </article>
    </FadeIn>
  );
}
