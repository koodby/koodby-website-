"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

/**
 * Character-by-character scroll reveal (ported from the reference "AnimatedText"
 * — animation only). Each character fades from faint to full ink as the
 * paragraph passes through the viewport. Words stay unbreakable; the real
 * sentence is exposed to screen readers via aria-label.
 */

function Char({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} aria-hidden>
      {children}
    </motion.span>
  );
}

export function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = text.split(" ");
  const total = text.length;
  let cursor = 0;

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => {
        const node = (
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((ch) => {
              const start = cursor / total;
              const end = (cursor + 1) / total;
              cursor += 1;
              return (
                <Char key={cursor} progress={scrollYProgress} range={[start, end]}>
                  {ch}
                </Char>
              );
            })}
          </span>
        );
        cursor += 1; // account for the space that follows this word
        return (
          <span key={wi}>
            {node}
            {wi < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </p>
  );
}
