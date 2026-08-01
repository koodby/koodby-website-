"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeIn } from "./anim/FadeIn";
import { formatPostDate, type ResearchPost } from "@/lib/research-data";

/**
 * Horizontal row used on the /researches index: text on the left, thumbnail on
 * the right, whole row links to the article. The full article body lives on
 * /researches/[slug] — this only ever shows a summary.
 */
export function ResearchListCard({
  post,
  delay = 0,
}: {
  post: ResearchPost;
  delay?: number;
}) {
  const { id, title, description, date, category, coverImage, coverAlt } = post;

  const categoryColor =
    category === "Behind the Code"
      ? "text-rose-500 bg-rose-500/10"
      : category === "AI & Data"
      ? "text-cyan-500 bg-cyan-500/10"
      : "text-indigo-400 bg-indigo-500/10";

  return (
    <FadeIn delay={delay}>
      <article className="group border-b border-hairline pb-10">
        <div className="flex flex-col-reverse md:flex-row items-start gap-8 md:gap-12">
          {/* Left: meta, title, summary, link */}
          <div className="min-w-0 flex-1 w-full">
            <div className="flex items-center gap-3 text-[14px]">
              <span className="font-semibold text-[#2B6DF0]">
                {category}
              </span>
              <span className="text-[#2B6DF0] opacity-40">|</span>
              <span className="text-[13px] text-muted">
                {formatPostDate(date)}
              </span>
            </div>

            <h2 className="mt-4 text-[20px] font-bold leading-[1.25] tracking-tight text-ink dark:text-white sm:text-[22px]">
              <Link
                href={`/researches/${id}`}
                className="transition-colors hover:text-muted dark:hover:text-white/70"
              >
                {title}
              </Link>
            </h2>

            <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-muted">
              {description}
            </p>

            <Link
              href={`/researches/${id}`}
              className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#2B6DF0] hover:underline"
            >
              Read article
              <ArrowRight
                size={16}
                strokeWidth={2}
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Right: thumbnail */}
          <Link
            href={`/researches/${id}`}
            aria-hidden="true"
            tabIndex={-1}
            className="relative h-[200px] w-full md:h-[220px] md:w-[360px] shrink-0 overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5"
          >
            {coverImage ? (
              <Image
                src={coverImage}
                alt={coverAlt ?? ""}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center font-mono text-[11px] font-bold uppercase tracking-wider text-ink/30 dark:text-white/30">
                {category}
              </span>
            )}
          </Link>
        </div>
      </article>
    </FadeIn>
  );
}
