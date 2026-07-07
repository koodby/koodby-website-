"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReveal } from "./useReveal";

/**
 * Scroll-reveal wrapper. Reveals once as it enters the viewport, using a manual
 * IntersectionObserver (see useReveal) so content never gets stuck hidden.
 * Renders a plain <div>; wrap headings or groups and the reveal applies to them.
 */
const EASE = [0.25, 0.1, 0.25, 1] as const;

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
}: FadeInProps) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: shown ? 1 : 0, x: shown ? 0 : x, y: shown ? 0 : y }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
