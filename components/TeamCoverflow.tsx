"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import { FadeIn } from "./anim/FadeIn";
import { WordReveal } from "./anim/WordReveal";

/* ─── team data ─────────────────────────────────────────────────── */

interface TeamMember {
  image: string;
  name: string;
  role: string;
  href: string;
  focusY?: number;
}

const FOUNDER: TeamMember = {
  image: "/tarzan_founder.png",
  name: "Tarzan Abdirizak",
  role: "Founder & Software and AI Engineer",
  href: "https://cfo.koodby.com/",
  focusY: 50,
};

/* ─── card config ───────────────────────────────────────────────── */

const PERSPECTIVE = 900;

const TILT = {
  effect: "repel" as const,
  tiltLimit: 15,
  scale: 1.03,
};

const CARD_WIDTH = 300;
const CARD_HEIGHT = 340;
const CARD_RADIUS = 16;

const clampFocus = (member?: TeamMember) =>
  Math.min(100, Math.max(0, typeof member?.focusY === "number" ? member.focusY : 50));

/* ─── component ─────────────────────────────────────────────────── */

export function TeamCoverflow() {
  const tiltRef = useRef<HTMLAnchorElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const posRef = useRef({ x: 0, y: 0 });

  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const syncCursorPosition = (x: number, y: number) => {
    posRef.current = { x, y };
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  };

  const resetTilt = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  useEffect(() => {
    if (!isHovering) return;

    const reset = () => {
      setIsHovering(false);
      setIsPressed(false);
      resetTilt();
    };

    const handleScroll = () => {
      const el = tiltRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const { x, y } = posRef.current;
      if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
        reset();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("blur", reset);
    };
  }, [isHovering]);

  const onPointerEnter = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    syncCursorPosition(e.clientX, e.clientY);
    setIsHovering(true);
  };

  const onPointerMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType === "mouse") {
      syncCursorPosition(e.clientX, e.clientY);
      if (!isHovering) setIsHovering(true);
    }
    const el = tiltRef.current;
    if (!el) return;
    const { width, height, top, left } = el.getBoundingClientRect();
    const mult = TILT.effect === "repel" ? -1 : 1;
    const tiltX = ((e.clientY - top) / height - 0.5) * (TILT.tiltLimit * 2) * mult;
    const tiltY = ((e.clientX - left) / width - 0.5) * -(TILT.tiltLimit * 2) * mult;
    el.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${TILT.scale}, ${TILT.scale}, ${TILT.scale})`;
  };

  const onPointerLeave = () => {
    setIsHovering(false);
    setIsPressed(false);
    resetTilt();
  };

  const onPointerDown = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType === "mouse") setIsPressed(true);
  };

  const onPointerUp = () => {
    setIsPressed(false);
  };

  return (
    <section
      id="team"
      className="scroll-mt-24 border-t bg-transparent py-24 sm:py-32 overflow-hidden"
    >
      {/* header */}
      <div className="container-koodby">
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <FadeIn>
            <p className="eyebrow">Our Team</p>
          </FadeIn>
          <WordReveal
            lines={[
              { text: "Meet the", className: "text-ink" },
              { text: "builders.", className: "italic text-muted" },
            ]}
            className="mt-4 font-display text-[40px] leading-[1.06] tracking-tight sm:text-[60px]"
          />
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-md mx-auto text-[16px] leading-relaxed text-muted sm:text-[17px]">
              A small, focused crew of Somali engineers and designers who care
              deeply about craft.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* founder card */}
      <FadeIn delay={0.15}>
        <div className="flex flex-col items-center justify-center gap-6">
          <div
            style={{
              position: "relative",
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              perspective: `${PERSPECTIVE}px`,
            }}
          >
            <a
              ref={tiltRef}
              href={FOUNDER.href}
              target="_blank"
              rel="noopener noreferrer"
              onPointerEnter={onPointerEnter}
              onPointerMove={onPointerMove}
              onPointerLeave={onPointerLeave}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerLeave}
              aria-label={`${FOUNDER.name} — visit ${FOUNDER.href}`}
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4"
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: CARD_RADIUS,
                transformStyle: "preserve-3d",
                transition: "transform 0.2s ease-out",
                willChange: "transform",
                cursor: isHovering ? "none" : "pointer",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FOUNDER.image}
                alt={FOUNDER.name}
                draggable={false}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: `center ${clampFocus(FOUNDER)}%`,
                  borderRadius: CARD_RADIUS,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              />
            </a>
          </div>

          {/* Name + role label */}
          <div style={{ textAlign: "center", maxWidth: "100%" }}>
            <span
              className="font-display text-ink block"
              style={{
                fontSize: 26,
                fontWeight: 700,
                lineHeight: "1.2em",
                letterSpacing: "-0.02em",
              }}
            >
              {FOUNDER.name}
            </span>
            <span
              className="text-muted block mt-1"
              style={{
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              {FOUNDER.role}
            </span>
          </div>
        </div>
      </FadeIn>

      {/* custom hover cursor for founder image */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isHovering && (
              <motion.div
                key="founder-cursor"
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.14 }}
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 9999,
                  pointerEvents: "none",
                }}
              >
                <div
                  ref={cursorRef}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    willChange: "transform",
                    transform: `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0.65 }}
                    animate={{ scale: isPressed ? 0.9 : 1 }}
                    exit={{ scale: 0.65 }}
                    transition={{
                      type: "spring",
                      stiffness: 520,
                      damping: 32,
                      mass: 0.6,
                    }}
                    style={{
                      position: "relative",
                      transformOrigin: "0 0",
                    }}
                  >
                    {/* Pointer arrow */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{
                        position: "absolute",
                        top: -2,
                        left: -2,
                        display: "block",
                        filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.28))",
                      }}
                    >
                      <path
                        d="M3.5 2.5L20.5 10.2C21.25 10.55 21.15 11.68 20.32 11.9L13.2 13.75L10.35 20.3C9.98 21.12 8.82 20.98 8.62 20.12L3.5 2.5Z"
                        fill="#F59E0B"
                        stroke="#B45309"
                        strokeOpacity="0.3"
                        strokeWidth="0.9"
                        strokeLinejoin="round"
                      />
                    </svg>

                    {/* "Click" pill */}
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        left: 11,
                        transform: "rotate(-5deg)",
                        backgroundColor: "#F59E0B",
                        color: "#FFFFFF",
                        fontSize: 13,
                        fontWeight: 700,
                        lineHeight: 1,
                        letterSpacing: "-0.01em",
                        padding: "7px 14px",
                        borderRadius: 9999,
                        whiteSpace: "nowrap",
                        boxShadow:
                          "0 6px 16px rgba(245, 158, 11, 0.35), 0 2px 6px rgba(0, 0, 0, 0.18)",
                        userSelect: "none",
                      }}
                    >
                      Click
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
