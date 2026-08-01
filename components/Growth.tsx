"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { FadeIn } from "./anim/FadeIn";
import { LayoutGrid, PenTool, Search, PlayCircle, Star, Target } from "lucide-react";

function Word({ children, progress, range, className }: { children: string, progress: MotionValue<number>, range: [number, number], className: string }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={`inline-block mr-[0.25em] ${className}`}>
      {children}
    </motion.span>
  );
}

function AnimatedText() {
  const container = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 85%", "end 45%"],
  });

  const words = [
    "We", "research", "everyday", "problems", "<br>", 
    "to", "craft", "intelligent", "AI", "systems", "<br>",
    "and", "digital", "platforms", "that", "drive", "meaningful", "growth."
  ];

  const totalWords = words.length;
  let wordCount = 0;

  return (
    <h2
      ref={container}
      className="text-[18px] sm:text-[24px] lg:text-[32px] max-w-4xl font-display font-light leading-[1.3] tracking-tight mx-auto text-center normal-case"
    >
      {words.map((word, i) => {
        if (word === "<br>") {
          return <br key={i} className="hidden sm:block" />;
        }

        const start = wordCount / totalWords;
        const end = start + (1 / totalWords);
        wordCount++;

        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} className="text-ink">
            {word}
          </Word>
        );
      })}
    </h2>
  );
}

export function Growth() {
  return (
    <section className="relative w-full overflow-hidden bg-transparent py-32 sm:py-48 flex items-center justify-center min-h-[80vh]">
      <div className="container-koodby relative z-10 mx-auto max-w-5xl text-center flex flex-col items-center">

        <FadeIn delay={0.1}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-muted/30" />
            <span className="font-display italic text-muted text-[16px]">Our Mission</span>
            <div className="h-[1px] w-12 bg-muted/30" />
          </div>
        </FadeIn>

        <AnimatedText />
      </div>

      {/* Floating Pills - Hidden on small screens, visible on large screens */}
      {/* Design Systems - Orange */}
      <motion.div
        className="hidden lg:flex absolute top-[36%] left-[2%] xl:left-[6%] items-center gap-6 bg-white pl-2 pr-8 py-2 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#2563EB]">
          <LayoutGrid size={26} className="text-white" />
        </div>
        <span className="text-[18px] font-medium text-black">Local Research</span>
      </motion.div>

      {/* UX Design - Dark Green */}
      <motion.div
        className="hidden lg:flex absolute top-[48%] left-[6%] xl:left-[12%] items-center gap-6 bg-white pl-2 pr-8 py-2 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      >
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#2E4A3F]">
          <PenTool size={26} className="text-white" />
        </div>
        <span className="text-[18px] font-medium text-black">AI Systems</span>
      </motion.div>

      {/* Research - Blue */}
      <motion.div
        className="hidden lg:flex absolute top-[60%] left-[3%] xl:left-[8%] items-center gap-6 bg-white pl-2 pr-8 py-2 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      >
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#0085FF]">
          <Search size={26} className="text-white" />
        </div>
        <span className="text-[18px] font-medium text-black">Digital Platforms</span>
      </motion.div>

      {/* Animation - Light Green */}
      <motion.div
        className="hidden lg:flex absolute top-[36%] right-[6%] xl:right-[12%] items-center gap-6 bg-white pl-2 pr-8 py-2 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#00D97E]">
          <PlayCircle size={26} className="text-white" />
        </div>
        <span className="text-[18px] font-medium text-black">Product Strategy</span>
      </motion.div>

      {/* Branding - Pink */}
      <motion.div
        className="hidden lg:flex absolute top-[48%] right-[4%] xl:right-[8%] items-center gap-6 bg-white pl-2 pr-8 py-2 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      >
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#FF2E93]">
          <Star size={26} className="text-white" />
        </div>
        <span className="text-[18px] font-medium text-black">UX / UI Design</span>
      </motion.div>

      {/* Strategy - Yellow */}
      <motion.div
        className="hidden lg:flex absolute top-[60%] right-[7%] xl:right-[14%] items-center gap-6 bg-white pl-2 pr-8 py-2 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      >
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#FFC700]">
          <Target size={26} className="text-white" />
        </div>
        <span className="text-[18px] font-medium text-black">Scalable Solutions</span>
      </motion.div>

    </section>
  );
}
