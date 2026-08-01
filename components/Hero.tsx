"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Cloud, Cpu, LayoutGrid, Smartphone } from "lucide-react";
import { usePreloadReady } from "@/components/anim/usePreloadReady";
import { useRopeLanded } from "@/components/anim/useRopeLanded";

/* ---------- Bottom feature strip ---------- */
const features = [
  { icon: LayoutGrid, label: "Web Development" },
  { icon: Smartphone, label: "Mobile Apps" },
  { icon: Cpu, label: "AI Solutions" },
  { icon: Cloud, label: "Cloud & DevOps" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ready = usePreloadReady();
  const landed = useRopeLanded();

  return (
    <section
      id="top"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ───── Sky Background Image ───── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none dark:hidden">
        <img
          src="/sky-bg.png"
          alt=""
          className="w-full h-full object-cover object-top opacity-90"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-page opacity-80" />
      </div>

      {/* ───── Content ───── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 sm:px-8 max-w-[920px]">

        {/* ① Status pill. It arrives on a rope (components/RopeTag.tsx); this
            copy holds the seat so nothing shifts, then fades in on landing. */}
        <div
          data-rope-slot
          className={`mb-6 sm:mb-8 transition-opacity duration-200 ${
            landed ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2.5 rounded-xl border border-hairline bg-surface px-5 py-1.5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[13px] font-medium tracking-wide text-ink">We are waiting for you</span>
          </div>
        </div>

        {/* ② Giant editorial headline — serif, mixed weights */}
        <motion.h1
          className="font-display leading-[1.05] tracking-tight"
          initial={{ opacity: 0, y: 44, filter: "blur(6px)" }}
          animate={
            ready
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 44, filter: "blur(6px)" }
          }
          transition={{ duration: 1.2, delay: 0.12, ease: EASE }}
        >
          <span
            className="block text-[36px] sm:text-[52px] md:text-[68px] lg:text-[80px] font-medium normal-case text-ink"
            style={{ fontStyle: "normal" }}
          >
            Building AI & Software
          </span>
          <span
            className="block text-[40px] sm:text-[58px] md:text-[74px] lg:text-[88px] normal-case text-ink mt-1"
            style={{ fontWeight: 400 }}
          >
            <span className="italic">for </span>
            <span className="italic text-[#2563EB]">Africa.</span>
          </span>
        </motion.h1>

        {/* ③ Sub-headline — clean gray description */}
        <motion.p
          className="mx-auto mt-6 sm:mt-8 max-w-[62ch] text-[15px] sm:text-[17px] leading-relaxed text-muted font-sans"
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
        >
          Empowering your business with beautifully designed, high performance software and AI that deliver real results. Let's turn your vision into engaging digital platforms that attract users and scale your business globally.
        </motion.p>

        {/* ④ CTA buttons — primary & secondary */}
        <motion.div
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
        >
          <a
            href="https://wa.me/252618450410"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-[14px] bg-[#222222] border border-white/10 p-1.5 pl-5 transition-transform hover:bg-[#2A2A2A] hover:scale-[1.02] shadow-sm"
          >
            <span className="text-[14.5px] font-medium tracking-normal text-white">Get in Touch</span>
            <div className="relative flex h-[34px] w-[42px] items-center justify-center overflow-hidden rounded-[10px] bg-[#2B6DF0] transition-colors group-hover:bg-[#1D4ED8]">
              <ArrowUpRight size={18} strokeWidth={2} className="text-white transition-transform duration-0 group-hover:duration-500 ease-out group-hover:translate-x-6 group-hover:-translate-y-6" aria-hidden />
              <ArrowUpRight size={18} strokeWidth={2} className="absolute text-white transition-transform duration-0 group-hover:duration-500 ease-out -translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0" aria-hidden />
            </div>
          </a>
        </motion.div>


      </div>
    </section>
  );
}
