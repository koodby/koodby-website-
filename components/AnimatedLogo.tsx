"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Koodby brand mark that alternates between the icon and the wordmark inside a
 * yellow pill. The pill colour is fixed, so its text is fixed dark too — a
 * themed token would turn near-white in night mode and vanish on the yellow.
 */
export function AnimatedLogo() {
  const [isText, setIsText] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setIsText((prev) => !prev), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      layout
      className="relative flex items-center justify-center overflow-hidden rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/50 dark:border-white/20 shadow-sm"
      initial={{ width: 44, height: 44 }}
      animate={{ width: isText ? 134 : 44, height: 44 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <AnimatePresence mode="wait">
        {!isText ? (
          <motion.img
            key="logo"
            src="/narbar-logo.png"
            alt="Koodby"
            className="absolute h-full w-full object-contain p-1.5"
            initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <motion.span
            key="text"
            className="absolute flex font-sans text-[24px] font-black tracking-tight text-ink -translate-x-1"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
              exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
            }}
          >
            {"koodby".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, display: "none" },
                  visible: { opacity: 1, display: "inline-block" },
                  exit: { opacity: 0, display: "none" },
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
