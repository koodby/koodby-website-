"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Logo } from "@/components/Logo";

function AnimatedNavbarLogo() {
  const [isText, setIsText] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsText((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      layout
      className="relative flex items-center justify-center bg-[#FFEB00] rounded-full overflow-hidden"
      initial={{ width: 48, height: 48 }}
      animate={{ width: isText ? 130 : 48, height: 48 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <AnimatePresence mode="wait">
        {!isText ? (
          <motion.img
            key="logo"
            src="/narbar-logo.png"
            alt="Koodby"
            className="absolute w-full h-full object-contain p-1.5"
            initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <motion.span
            key="text"
            className="absolute font-sans font-black text-[22px] tracking-tight text-ink flex"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
              exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } }
            }}
          >
            {"koodby".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, display: "none" },
                  visible: { opacity: 1, display: "inline-block" },
                  exit: { opacity: 0, display: "none" }
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative w-full h-screen min-h-[620px] md:min-h-[800px] bg-transparent overflow-hidden text-black font-sans"
    >
      {/* Decorative Floating Dots */}
      <div className="absolute top-[30%] left-[40%] w-1.5 h-1.5 bg-black rounded-full z-10" />
      <div className="absolute top-[60%] left-[35%] w-1 h-1 bg-black rounded-full z-10" />
      <div className="absolute top-[50%] right-[15%] w-1 h-1 bg-black rounded-full z-10" />
      <div className="absolute top-[55%] right-[17%] w-1.5 h-1.5 bg-black rounded-full z-10" />
      <div className="absolute bottom-[20%] left-[48%] w-1.5 h-1.5 bg-black rounded-full z-10" />

      {/* Top Navigation Bar */}
      <header className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center px-6 py-6 md:px-12 md:py-10">
        {/* Logo */}
        <div className="flex items-center">
          <AnimatedNavbarLogo />
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium tracking-wide">
          <a href="#top" className="hover:opacity-70 transition-opacity">home</a>
          <a href="#services" className="hover:opacity-70 transition-opacity">expertise</a>
          <a href="#work" className="hover:opacity-70 transition-opacity">work</a>
        </nav>
      </header>

      {/* Main Content */}
      <div className="relative z-20 w-full h-full flex flex-col justify-center px-6 md:px-[16.666%]">

        {/* Giant Typography */}
        <motion.div
          className="relative mt-0 md:mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >


          <h1 className="text-[11vw] md:text-[130px] lg:text-[150px] leading-[0.85] font-black tracking-tighter text-black uppercase relative z-10">
            DIGITAL<br />
            BUILDERS
          </h1>
        </motion.div>

        {/* Italic Text — stacks under the headline on mobile, right-aligned on desktop */}
        <motion.div
          className="flex justify-start md:justify-end w-full pr-0 md:pr-[5%]"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-[8vw] md:text-[90px] lg:text-[110px] leading-none font-serif italic text-black mt-2 md:mt-[-10px]">
            - software
          </h2>
        </motion.div>

        {/* Bottom Left Descriptive Text */}
        <motion.div
          className="absolute bottom-16 left-6 right-6 md:bottom-20 md:left-[16.666%] md:right-auto max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="font-bold text-[15px] mb-2">We believe in shipping real products.</h3>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            Specializing in full-stack engineering. <br />
            We build robust digital solutions.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
