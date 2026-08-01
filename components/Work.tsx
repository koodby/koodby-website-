"use client";

import { motion } from "motion/react";
import { FadeIn } from "./anim/FadeIn";
import { Zap, MessageSquare, FileText, CheckCircle2, Utensils, Bike, CreditCard, TrendingUp } from "lucide-react";

export function Work() {
  return (
    <section id="work" className="relative w-full overflow-hidden bg-transparent py-24 sm:py-32">
      
      {/* Background soft gradient similar to the reference image */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-gradient-to-tl from-[#FF8B45]/20 via-[#FF8B45]/5 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container-koodby relative z-10 mx-auto max-w-5xl text-center flex flex-col items-center">
        
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
            <p className="eyebrow text-center w-full">Featured Case Study</p>
            <h2 className="mt-4 max-w-[20ch] text-[40px] font-display font-medium leading-[1.05] tracking-tight text-ink sm:text-[56px] normal-case">
              Real products, built for real growth
            </h2>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted sm:text-[19px]">
              We don't just design concepts. We engineer market-ready mobile applications. Watch how we built a seamless, high-performance food delivery app for a local restaurant.
            </p>
          </div>
        </FadeIn>

        <div className="mt-24 relative w-full flex justify-center items-center">
          
          {/* Floating Pills - Left */}
          <motion.div
            className="hidden md:flex absolute top-[15%] left-[10%] lg:left-[18%] items-center gap-3 bg-white pl-3 pr-6 py-3 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.1)] border border-black/5 z-20"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-10 h-10 rounded-[12px] bg-[#6B4DFF] flex items-center justify-center shadow-inner">
              <Utensils size={20} className="text-white fill-transparent" />
            </div>
            <span className="text-[16px] font-medium text-black tracking-tight">Seamless ordering</span>
          </motion.div>

          <motion.div
            className="hidden md:flex absolute top-[60%] left-[2%] lg:left-[12%] items-center gap-3 bg-white pl-3 pr-6 py-3 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.1)] border border-black/5 z-20"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-10 h-10 rounded-[12px] bg-[#2563EB] flex items-center justify-center shadow-inner">
              <Bike size={20} className="text-white fill-transparent" />
            </div>
            <span className="text-[16px] font-medium text-black tracking-tight">Live tracking</span>
          </motion.div>

          {/* Floating Pills - Right */}
          <motion.div
            className="hidden md:flex absolute top-[25%] right-[5%] lg:right-[15%] items-center gap-3 bg-white pl-3 pr-6 py-3 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.1)] border border-black/5 z-20"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-10 h-10 rounded-[12px] bg-[#10B981] flex items-center justify-center shadow-inner">
              <CreditCard size={20} className="text-white fill-transparent" />
            </div>
            <span className="text-[16px] font-medium text-black tracking-tight">Instant payments</span>
          </motion.div>

          <motion.div
            className="hidden md:flex absolute top-[70%] right-[8%] lg:right-[18%] items-center gap-3 bg-white pl-3 pr-6 py-3 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.1)] border border-black/5 z-20"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="w-10 h-10 rounded-[12px] bg-[#FF453A] flex items-center justify-center shadow-inner">
              <TrendingUp size={20} className="text-white fill-transparent" />
            </div>
            <span className="text-[16px] font-medium text-black tracking-tight">High conversion</span>
          </motion.div>

          {/* Central iPhone 16 Pro Max Mockup */}
          <FadeIn delay={0.1} className="relative z-10">
            <div className="relative aspect-[9/19.5] w-[320px] sm:w-[360px] md:w-[400px] overflow-hidden rounded-[56px] sm:rounded-[64px] border-[14px] border-[#1c1c1e] shadow-[0_32px_80px_rgba(0,0,0,0.15)] bg-black ring-1 ring-black/10">
              
              {/* Dynamic Island (iPhone 16 Pro Style) */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[125px] h-[36px] bg-black rounded-full z-20 flex justify-between items-center px-3 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                <div className="w-3.5 h-3.5 rounded-full bg-[#121212] ml-1 shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#0a0a0a] shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]" />
              </div>

              {/* Screen Content (Video Placeholder) */}
              <div className="absolute inset-0 z-0 bg-surface flex flex-col items-center justify-center overflow-hidden">
                
                {/* This video tag is ready for when you upload the video */}
                <video 
                  id="app-demo-video"
                  className="w-full h-full object-cover"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src="/mobile-video/app-demo.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Glossy Overlay */}
              <div className="pointer-events-none absolute inset-0 z-30 rounded-[42px] sm:rounded-[50px] bg-gradient-to-tr from-white/0 via-white/5 to-white/0 ring-1 ring-inset ring-white/10" />
            </div>
          </FadeIn>
          
        </div>
      </div>
    </section>
  );
}
