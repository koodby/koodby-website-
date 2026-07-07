"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn } from "./anim/FadeIn";
import Image from "next/image";

// App 1: The new SVGs from 'mobile iphone'
const app1Screens = [
  { id: 1, src: "/mobile iphone/iPhone 14 Pro - 1.svg", title: "App 1 Screen 1" },
  { id: 2, src: "/mobile iphone/iPhone 14 Pro - 2.svg", title: "App 1 Screen 2" },
  { id: 3, src: "/mobile iphone/iPhone 14 Pro - 3.svg", title: "App 1 Screen 3" },
  { id: 4, src: "/mobile iphone/iPhone 14 Pro - 5.svg", title: "App 1 Screen 4" },
];

// App 2: Event App screens
const app2Screens = [
  { id: 4, src: "/event app/14 Home Page.png", title: "Home" },
  { id: 5, src: "/event app/15 Search.png", title: "Search" },
  { id: 6, src: "/event app/16 Map View.png", title: "Map View" },
  { id: 7, src: "/event app/17 Event Detail.png", title: "Event Detail" },
];

// App 3: Screens from mobile-apps (Checkout)
const app3Screens = [
  { id: 7, src: "/mobile-apps/app3.png", title: "Cart" },
  { id: 8, src: "/mobile-apps/app2.png", title: "Checkout" },
  { id: 9, src: "/mobile-apps/app1.png", title: "Confirmation" },
];

function InteractivePhone({ 
  screens, 
  delay = 0 
}: { 
  screens: { id: number, src: string, title: string }[], 
  delay?: number
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % screens.length);
      
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % screens.length);
      }, 7000); // 7 seconds between changes
      
      return () => clearInterval(timer);
    }, 7000 + delay);
    
    return () => clearTimeout(initialTimeout);
  }, [screens.length, delay]);

  return (
    <div className="relative aspect-[9/19.5] w-[280px] sm:w-[320px] overflow-hidden rounded-[40px] sm:rounded-[48px] border-[12px] border-[#1c1c1e] shadow-[0_24px_60px_rgba(0,0,0,0.2)] bg-black ring-1 ring-black/10">
      
      {/* Dynamic Island / Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-[#1c1c1e] rounded-b-[20px] z-20 flex justify-center items-center">
        <div className="w-[60px] h-[6px] bg-black/40 rounded-full" />
      </div>

      {/* Screens sliding in and out */}
      <div className="absolute inset-0 z-0 bg-white">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <Image
              src={screens[currentIndex].src}
              alt={screens[currentIndex].title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Simulated Tap Pointer */}
      <motion.div 
        key={currentIndex + "pointer"}
        className="absolute w-12 h-12 z-20 pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0, scale: 1.2, y: 120 }}
        animate={{ 
          opacity: [0, 1, 1, 1, 0], 
          scale: [1.2, 1, 1, 0.8, 1.2],
          y: [120, 0, 0, 0, 0]
        }}
        transition={{ 
          duration: 7, // Matched with the 7 second interval
          times: [0, 0.1, 0.85, 0.9, 1], 
          ease: "easeOut",
        }}
        style={{ top: "60%", left: "50%", x: "-50%", y: "-50%" }}
      >
        <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border-[2px] border-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-white/90" />
        </div>
      </motion.div>

      {/* Glossy Overlay */}
      <div className="pointer-events-none absolute inset-0 z-30 rounded-[30px] sm:rounded-[36px] bg-gradient-to-tr from-white/0 via-white/5 to-white/0 ring-1 ring-inset ring-white/10" />
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="scroll-mt-24 border-t bg-transparent py-24 sm:py-32 overflow-hidden">
      <div className="container-koodby">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
            <p className="eyebrow text-center w-full">Mobile Experiences</p>
            <h2 className="mt-4 max-w-[20ch] text-[40px] font-display font-medium leading-[1.05] tracking-tight text-ink sm:text-[56px]">
              See our apps in action
            </h2>
            <p className="mt-5 max-w-measure text-[17px] leading-relaxed text-muted sm:text-[19px]">
              We build intuitive experiences that feel right in your hands. Watch these automated simulations of actual app journeys we've created.
            </p>
          </div>
        </FadeIn>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start justify-items-center">
          
          <div className="w-full flex justify-center">
            <FadeIn delay={0.1}>
              <InteractivePhone screens={app1Screens} delay={0} />
            </FadeIn>
          </div>

          <div className="w-full flex justify-center lg:mt-16">
            <FadeIn delay={0.2}>
              <InteractivePhone screens={app2Screens} delay={1500} />
            </FadeIn>
          </div>

          <div className="w-full flex justify-center lg:mt-32">
            <FadeIn delay={0.3}>
              <InteractivePhone screens={app3Screens} delay={3000} />
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
