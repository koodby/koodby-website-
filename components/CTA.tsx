"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "./anim/FadeIn";

export function CTA() {
  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-transparent">
      <FadeIn className="mx-auto max-w-7xl">
        <div className="relative w-full bg-[#161616] dark:bg-transparent rounded-[40px] overflow-hidden px-6 py-10 sm:py-14 md:py-16 flex flex-col items-center justify-center text-center shadow-2xl">
          
          {/* Dark Mode Sky Background */}
          <div className="hidden dark:block absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src="/sky-bg.png"
              alt=""
              className="w-full h-full object-cover object-top opacity-90"
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-page opacity-80" />
          </div>

          {/* Faint Grid Background (Light mode only) */}
          <div 
            className="absolute inset-0 opacity-[0.12] pointer-events-none dark:hidden z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #ffffff 1px, transparent 1px),
                linear-gradient(to bottom, #ffffff 1px, transparent 1px)
              `,
              backgroundSize: '120px 120px',
              backgroundPosition: 'center center',
              maskImage: 'radial-gradient(ellipse 70% 70% at center, black 30%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at center, black 30%, transparent 100%)',
            }}
          />
          
          <div className="relative z-10 max-w-[1000px] mx-auto">
            <h2 className="text-white font-display text-[28px] sm:text-[40px] md:text-[48px] lg:text-[56px] leading-[1.05] tracking-tight">
              <span className="block mb-2 md:mb-4">Ready to build your next</span>
              <span className="inline-flex items-center flex-wrap justify-center gap-y-4">
                <span className="mr-3 md:mr-5">big idea</span>
                
                {/* Inline Button */}
                <motion.button 
                  className="inline-flex items-center gap-2 sm:gap-3 bg-[#222222] border border-white/10 text-white rounded-[14px] py-1.5 pl-5 pr-1.5 sm:py-1.5 sm:pl-6 sm:pr-1.5 mx-2 sm:mx-3 align-middle shadow-lg group hover:bg-[#2A2A2A] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-sans font-medium text-[14px] sm:text-[16px] tracking-normal">
                    Get in Touch
                  </span>
                  <span className="relative overflow-hidden flex items-center justify-center bg-[#2B6DF0] text-white w-7 h-7 sm:w-9 sm:h-9 rounded-[10px] sm:rounded-[12px] shadow-sm group-hover:bg-[#1D4ED8] transition-colors">
                    <ArrowUpRight size={18} strokeWidth={2} className="transition-transform duration-0 group-hover:duration-500 ease-out group-hover:translate-x-6 group-hover:-translate-y-6" />
                    <ArrowUpRight size={18} strokeWidth={2} className="absolute transition-transform duration-0 group-hover:duration-500 ease-out -translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0" />
                  </span>
                </motion.button>
                
                <span className="ml-2 md:ml-4">in minutes</span>
              </span>
            </h2>
          </div>
          
        </div>
      </FadeIn>
    </section>
  );
}
