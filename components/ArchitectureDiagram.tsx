"use client";

import { motion } from "motion/react";
import { Target, Palette, Code, Rocket, Headset } from "lucide-react";
import { FadeIn } from "./anim/FadeIn";

export function ArchitectureDiagram() {
  return (
    <section className="relative w-full py-24 sm:py-32 overflow-hidden bg-transparent">
      <div className="container-koodby relative z-10 mx-auto">
        
        {/* Mobile View: Vertical Stack */}
        <div className="flex flex-col items-center gap-12 md:hidden">
          {/* Chaos */}
          <div className="flex flex-wrap justify-center gap-3 max-w-[280px]">
            {["Project Ideas", "Brand Logos", "Feature Requests", "Zoom Meetings", "Competitor Links", "Design Inspiration", "Budget & Time", "Feedback"].map((item, i) => (
              <span key={i} className="bg-[#F8F9FA] border border-gray-100 rounded-full px-4 py-2 shadow-sm text-[13px] font-medium text-black">
                {item}
              </span>
            ))}
          </div>

          {/* Arrow Down */}
          <div className="h-12 w-0 border-l-2 border-dashed border-gray-300 relative">
             <div className="absolute -bottom-1 -left-[5px] w-2 h-2 rounded-full bg-gray-300"></div>
          </div>

          {/* Hub */}
          <div className="flex flex-col items-center">
            <div className="w-[120px] h-[120px] rounded-[28px] bg-gradient-to-br from-[#FF8A00] to-[#FF4500] shadow-[0_20px_40px_rgba(255,138,0,0.3)] flex items-center justify-center">
              <span className="text-white font-display text-[22px] font-semibold tracking-tight">Koodby</span>
            </div>
            <span className="mt-4 font-medium text-ink text-[15px]">Your client hub</span>
          </div>

          {/* Arrow Down */}
          <div className="h-12 w-0 border-l-2 border-dashed border-gray-300 relative">
             <div className="absolute -bottom-1 -left-[5px] w-2 h-2 rounded-full bg-gray-300"></div>
          </div>

          {/* Order */}
          <div className="flex flex-col gap-4 w-full max-w-[300px]">
            <RightPill icon={<Target size={16} className="text-white" />} bg="bg-[#FF7A00]" text="Strategic Planning" />
            <RightPill icon={<Palette size={16} className="text-white" />} bg="bg-[#FF2E93]" text="Premium UI/UX Design" />
            <RightPill icon={<Code size={16} className="text-white" />} bg="bg-[#00C45A]" text="Robust Development" />
            <RightPill icon={<Rocket size={16} className="text-white" />} bg="bg-[#FF3B30]" text="App & Web Launch" />
            <RightPill icon={<Headset size={16} className="text-white" />} bg="bg-[#007AFF]" text="Ongoing Support" />
          </div>
        </div>

        {/* Desktop View: Fixed Aspect Ratio SVG Layout */}
        <FadeIn className="hidden md:block relative w-full max-w-[1200px] mx-auto aspect-[2.4/1] min-h-[500px]">
          
          {/* Connecting Lines */}
          <svg viewBox="0 0 1200 500" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            {/* Left Lines (Chaos to Hub) */}
            {/* Center is (600, 250). Hub Left Edge is ~530. */}
            
            {/* 1. To Files: (300, 75) */}
            <path d="M 530 250 C 450 250, 400 75, 300 75" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="6 6" fill="none" />
            
            {/* 2. To Links: (228, 125) */}
            <path d="M 530 250 C 400 250, 320 125, 228 125" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="6 6" fill="none" />
            
            {/* 3. To New message: (156, 175) */}
            <path d="M 530 250 C 350 250, 250 175, 156 175" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="6 6" fill="none" />
            
            {/* 4. To Meetings: (96, 225) */}
            <path d="M 530 250 C 350 250, 200 225, 96 225" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="6 6" fill="none" />
            
            {/* 5. To Emails: (96, 275) */}
            <path d="M 530 250 C 350 250, 200 275, 96 275" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="6 6" fill="none" />
            
            {/* 6. To Screenshot: (156, 325) */}
            <path d="M 530 250 C 350 250, 250 325, 156 325" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="6 6" fill="none" />
            
            {/* 7. To Invoices: (228, 375) */}
            <path d="M 530 250 C 400 250, 320 375, 228 375" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="6 6" fill="none" />
            
            {/* 8. To Feedback: (300, 425) */}
            <path d="M 530 250 C 450 250, 400 425, 300 425" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="6 6" fill="none" />

            {/* Right Lines (Hub to Order) */}
            {/* Hub Right Edge is ~670. Target X is 900. */}
            <path d="M 670 250 C 750 250, 800 75, 900 75" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="6 6" fill="none" />
            <path d="M 670 250 C 750 250, 800 162.5, 900 162.5" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="6 6" fill="none" />
            <path d="M 670 250 L 900 250" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="6 6" fill="none" />
            <path d="M 670 250 C 750 250, 800 337.5, 900 337.5" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="6 6" fill="none" />
            <path d="M 670 250 C 750 250, 800 425, 900 425" stroke="#D1D5DB" strokeWidth="2" strokeDasharray="6 6" fill="none" />
          </svg>

          {/* Left Chaotic Pills */}
          <LeftPill text="Project Ideas" top="15%" left="25%" rotate="4deg" />
          <LeftPill text="Brand Logos" top="25%" left="19%" rotate="-2deg" />
          <LeftPill text="Feature Requests" top="35%" left="13%" rotate="0deg" />
          <LeftPill text="Zoom Meetings" top="45%" left="8%" rotate="-4deg" />
          <LeftPill text="Competitor Links" top="55%" left="8%" rotate="2deg" />
          <LeftPill text="Design Inspiration" top="65%" left="13%" rotate="-3deg" />
          <LeftPill text="Budget & Time" top="75%" left="19%" rotate="5deg" />
          <LeftPill text="Feedback" top="85%" left="25%" rotate="-2deg" />

          {/* Center Hub */}
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center mt-4">
            <motion.div 
              className="flex flex-col items-center"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <div className="w-[140px] h-[140px] rounded-[32px] bg-gradient-to-br from-[#007AFF] to-[#0055FF] shadow-[0_20px_40px_rgba(0,122,255,0.3)] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                <span className="text-white font-display text-[26px] font-semibold tracking-tight relative z-10">Koodby</span>
              </div>
              <span className="mt-5 font-medium text-ink text-[16px]">Your client hub</span>
            </motion.div>
          </div>

          {/* Right Ordered Pills */}
          <RightPillDesktop top="15%" delay={0.2} icon={<Target size={18} className="text-white" />} bg="bg-[#FF7A00]" text="Strategic Planning" />
          <RightPillDesktop top="32.5%" delay={0.3} icon={<Palette size={18} className="text-white" />} bg="bg-[#FF2E93]" text="Premium UI/UX Design" />
          <RightPillDesktop top="50%" delay={0.4} icon={<Code size={18} className="text-white" />} bg="bg-[#00C45A]" text="Robust Development" />
          <RightPillDesktop top="67.5%" delay={0.5} icon={<Rocket size={18} className="text-white" />} bg="bg-[#FF3B30]" text="App & Web Launch" />
          <RightPillDesktop top="85%" delay={0.6} icon={<Headset size={18} className="text-white" />} bg="bg-[#007AFF]" text="Ongoing Support" />

        </FadeIn>
      </div>
    </section>
  );
}

// --- Helper Components ---

function LeftPill({ text, top, left, rotate }: { text: string, top: string, left: string, rotate: string }) {
  return (
    <div 
      className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
      style={{ top, left }}
    >
      <motion.div 
        className="bg-[#F8F9FA] border border-gray-100 rounded-full px-5 py-2.5 shadow-sm flex items-center justify-center cursor-pointer"
        initial={{ opacity: 0, scale: 0.8, rotate }}
        whileInView={{ opacity: 1, scale: 1, rotate }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05, rotate: "0deg", zIndex: 20 }}
      >
        <span className="text-[14px] font-medium text-black">{text}</span>
      </motion.div>
    </div>
  );
}

function RightPillDesktop({ icon, bg, text, top, delay }: { icon: React.ReactNode, bg: string, text: string, top: string, delay: number }) {
  return (
    <div 
      className="absolute left-[75%] -translate-y-1/2 z-10 w-[280px]"
      style={{ top }}
    >
      <motion.div 
        className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-gray-50 flex items-center gap-3 p-2 pr-6 w-full"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
      >
        <div className={`w-9 h-9 rounded-[10px] ${bg} flex items-center justify-center shrink-0`}>
          {icon}
        </div>
        <span className="text-[14px] font-medium text-black">{text}</span>
      </motion.div>
    </div>
  );
}

function RightPill({ icon, bg, text }: { icon: React.ReactNode, bg: string, text: string }) {
  return (
    <div className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-gray-50 flex items-center gap-3 p-2 pr-6 w-full">
      <div className={`w-9 h-9 rounded-[10px] ${bg} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <span className="text-[14px] font-medium text-black">{text}</span>
    </div>
  );
}
