"use client";

import { useRef, type MouseEvent } from "react";
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

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const { width, height, top, left } = el.getBoundingClientRect();
    const mult = TILT.effect === "repel" ? -1 : 1;
    const tiltX = ((e.clientY - top) / height - 0.5) * (TILT.tiltLimit * 2) * mult;
    const tiltY = ((e.clientX - left) / width - 0.5) * -(TILT.tiltLimit * 2) * mult;
    el.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${TILT.scale}, ${TILT.scale}, ${TILT.scale})`;
  };

  const onLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
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
              onMouseMove={onMove}
              onMouseLeave={onLeave}
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
                cursor: "pointer",
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
    </section>
  );
}
