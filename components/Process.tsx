"use client";

import { motion } from "motion/react";
import { FadeIn } from "./anim/FadeIn";
import { useReveal } from "./anim/useReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "One conversation. We listen to your idea, your users, and your goals — no jargon, no commitment.",
  },
  {
    n: "02",
    title: "Design",
    body: "We shape the experience first — flows, wireframes, and a look that fits your brand. You see it before we build it.",
  },
  {
    n: "03",
    title: "Build",
    body: "Short build cycles with weekly previews. Our AI-first workflow keeps it fast without cutting corners.",
  },
  {
    n: "04",
    title: "Launch & support",
    body: "We ship, measure, and stay with you — fixes, improvements, and honest advice long after day one.",
  },
];

function BlurWordReveal({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const words = text.split(" ");
  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="mr-[0.25em] inline-block"
          initial={{ filter: "blur(12px)", opacity: 0, y: 20 }}
          animate={shown ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: delay + i * 0.08, ease: EASE }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

function Step({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const { ref, shown } = useReveal<HTMLLIElement>();
  return (
    <li ref={ref} className="flex flex-col relative">
      <motion.span
        aria-hidden
        className="block h-[2px] w-full origin-left bg-ink/10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: shown ? 1 : 0 }}
        transition={{ duration: 1.5, delay: index * 0.15, ease: EASE }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={shown ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 1.2, delay: index * 0.15 + 0.1, ease: EASE }}
        className="pt-6"
      >
        <span className="block font-sans font-bold text-[14px] text-ink/40" aria-hidden>
          {step.n}
        </span>
        <h3 className="mt-4 font-sans font-black uppercase text-[24px] leading-none text-ink sm:text-[32px]">
          {step.title}
        </h3>
        <p className="mt-4 text-[16px] leading-relaxed text-ink/70">{step.body}</p>
      </motion.div>
    </li>
  );
}

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 bg-transparent py-24 sm:py-32">
      <div className="container-koodby">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <FadeIn>
              <p className="font-sans font-bold uppercase tracking-widest text-[13px] text-ink/50 mb-6">How we work</p>
            </FadeIn>
            <BlurWordReveal
              text="FROM FIRST CALL TO LAUNCH DAY."
              className="font-sans font-black uppercase text-[40px] leading-[0.9] tracking-tighter sm:text-[64px] text-ink"
            />
          </div>
          <FadeIn delay={0.3}>
            <p className="max-w-sm text-[18px] leading-relaxed text-ink/70 lg:text-right">
              A simple, honest process. You always know where your project
              stands — and you see it working every week.
            </p>
          </FadeIn>
        </div>

        <ol className="mt-20 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Step key={step.n} step={step} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
