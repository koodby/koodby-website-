"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReveal } from "./useReveal";

/**
 * Masked word-by-word rise for headings. Each word slides up out of an
 * overflow-hidden clip as the heading enters the viewport. Screen readers get
 * the plain sentence via aria-label. Reveal trigger = useReveal (reliable).
 */
const EASE = [0.22, 1, 0.36, 1] as const;

type Line = string | { text: string; className?: string };

export function WordReveal({
  lines,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.055,
  duration = 0.9,
}: {
  /** Each entry renders as its own block line; style a line via {text, className}. */
  lines: Line[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}) {
  const { ref, shown } = useReveal<HTMLSpanElement>();
  const plain = lines
    .map((l) => (typeof l === "string" ? l : l.text))
    .join(" ");

  let w = 0; // running word index across all lines, for a continuous stagger

  return (
    <Tag className={className} aria-label={plain}>
      <span ref={ref} aria-hidden className="block">
        {lines.map((line, li) => {
          const text = typeof line === "string" ? line : line.text;
          const lineClass = typeof line === "string" ? undefined : line.className;
          return (
            <span key={li} className={`block ${lineClass ?? ""}`}>
              {text.split(" ").map((word, wi) => {
                const idx = w++;
                return (
                  <span
                    key={wi}
                    className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
                  >
                    <motion.span
                      className="inline-block will-change-transform"
                      initial={{ y: "110%" }}
                      animate={{ y: shown ? "0%" : "110%" }}
                      transition={{
                        duration,
                        delay: delay + idx * stagger,
                        ease: EASE,
                      }}
                    >
                      {word}
                    </motion.span>
                    {wi < text.split(" ").length - 1 ? " " : null}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
