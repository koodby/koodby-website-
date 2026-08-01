"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { FadeIn } from "./anim/FadeIn";
import { WordReveal } from "./anim/WordReveal";

/* ─── team data ─────────────────────────────────────────────────── */

interface TeamMember {
  image: string;
  name: string;
  role: string;
  focusY?: number;
}

const TEAM: TeamMember[] = [
  {
    image: "/tarzan_founder.png",
    name: "Tarzan Abdirizak",
    role: "Founder & Software and AI Engineer",
    focusY: 50,
  },
  {
    image: "/cofounder_marketer.png",
    name: "Co-Founder",
    role: "Co-Founder & Marketer",
    focusY: 50,
  },
];

/* ─── flip config ───────────────────────────────────────────────── */

const HALF_TURN = 180;
const PERSPECTIVE = 900;

const FLIP_TRANSITION = {
  type: "tween" as const,
  duration: 0.6,
  ease: "easeInOut" as const,
};

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
  const list = TEAM;
  const urls = useMemo(() => list.map((m) => m.image), [list]);

  const tiltRef = useRef<HTMLDivElement | null>(null);

  const [angle, setAngle] = useState(0);
  const [index, setIndex] = useState(0);
  const [faces, setFaces] = useState({ a: 0, b: 0 });

  const facing = (deg: number) =>
    Math.abs(Math.round(deg / HALF_TURN)) % 2 === 0 ? "a" : "b";

  const flip = (dir: 1 | -1) => {
    const n = urls.length;
    if (n < 2) return;

    const next = (index + dir + n) % n;
    const nextAngle = angle + dir * HALF_TURN;
    const incoming = facing(nextAngle);

    setFaces((f) => ({ ...f, [incoming]: next }));
    setIndex(next);
    setAngle(nextAngle);
  };

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isLeft = e.clientX - rect.left < rect.width / 2;
    flip(isLeft ? -1 : 1);
  };

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
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

  const faceStyle = (slot: number): CSSProperties => ({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: `center ${clampFocus(list[slot % list.length])}%`,
    borderRadius: CARD_RADIUS,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    userSelect: "none",
    pointerEvents: "none",
  });

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

      {/* flip gallery */}
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
              cursor: urls.length > 1 ? "pointer" : "default",
            }}
          >
            <div
              ref={tiltRef}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              onClick={onClick}
              role="button"
              tabIndex={0}
              aria-label={`Team member ${list[index]?.name} — click to flip`}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") flip(-1);
                if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  flip(1);
                }
              }}
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
                transition: "transform 0.2s ease-out",
                willChange: "transform",
              }}
            >
              <motion.div
                animate={{ rotateY: angle }}
                transition={FLIP_TRANSITION}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={urls[faces.a % urls.length]}
                  alt={list[faces.a % list.length]?.name ?? ""}
                  draggable={false}
                  style={faceStyle(faces.a)}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={urls[faces.b % urls.length]}
                  alt={list[faces.b % list.length]?.name ?? ""}
                  draggable={false}
                  style={{
                    ...faceStyle(faces.b),
                    transform: "rotateY(180deg)",
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Name + role label */}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`label-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: "center", maxWidth: "100%" }}
            >
              <span
                className="font-display text-ink block"
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  lineHeight: "1.2em",
                  letterSpacing: "-0.02em",
                }}
              >
                {list[index]?.name ?? ""}
              </span>
              <span
                className="text-muted block mt-1"
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                }}
              >
                {list[index]?.role ?? ""}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </FadeIn>
    </section>
  );
}
