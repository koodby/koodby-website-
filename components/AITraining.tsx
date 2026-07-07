"use client";

/**
 * AITraining — an interactive, looping visualization of an AI neural network
 * processing a Somali prompt. Three stages, left → right on desktop, stacked
 * top → bottom on mobile:
 *
 *   1. INPUT       — a chat bubble types a prompt character-by-character.
 *   2. PROCESSING  — data particles travel across a 4-layer network; nodes and
 *                    connections glow (#FFEB00, approved active-state accent).
 *   3. OUTPUT      — a response bubble reveals, holds ~2s, then the loop resets.
 *
 * Design system: black ink on the global white grid (section stays transparent),
 * `font-sans font-black uppercase` heading, ink/70 body. The yellow is confined
 * to active/glow states only. Respects prefers-reduced-motion by rendering a
 * static, motion-free version of the same diagram.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FadeIn } from "./anim/FadeIn";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const INPUT_TEXT = "Waxaan u baahanahay in la ii dhiso website iyo app casri ah.";
const OUTPUT_TEXT = "Dabcan! Koodby waxay kuu dhisaysaa nidaam dhamaystiran oo tayadiisu sarreyso.";

/* ------------------------------------------------------------------ */
/* Palette (SVG needs raw hex; these mirror the locked tokens)         */
/* ------------------------------------------------------------------ */

const YELLOW = "#FFEB00"; // approved active/glow accent — used sparingly
const INK = "#0A0A0A";
const HAIRLINE = "#E8E6DF";
const SURFACE = "#FFFFFF";

/* ------------------------------------------------------------------ */
/* Network geometry — computed once, purely from these constants       */
/* ------------------------------------------------------------------ */

const VB_W = 300;
const VB_H = 246;
const CY = VB_H / 2;
const V_GAP = 48;

/** 1 input layer → 2 hidden layers → 1 output layer. */
const LAYER_SIZES = [3, 4, 4, 2] as const;
const COLS = [20, 107, 193, 280] as const; // x per layer within the viewBox

/** Seconds a signal spends crossing one layer gap. */
const WAVE_S = 0.85;
/** Seconds a single particle takes to travel one connection. */
const PARTICLE_S = 0.9;

type NodeDef = {
  id: string;
  layer: number;
  index: number;
  x: number;
  y: number;
};

type EdgeDef = {
  id: string;
  from: NodeDef;
  to: NodeDef;
  fromLayer: number;
  /** Position within its layer transition, used to stagger the wave. */
  order: number;
};

const NODES: NodeDef[] = LAYER_SIZES.flatMap((count, layer) =>
  Array.from({ length: count }, (_, index) => ({
    id: `n-${layer}-${index}`,
    layer,
    index,
    x: COLS[layer],
    y: CY + (index - (count - 1) / 2) * V_GAP,
  }))
);

const EDGES: EdgeDef[] = (() => {
  const out: EdgeDef[] = [];
  for (let layer = 0; layer < LAYER_SIZES.length - 1; layer++) {
    const from = NODES.filter((n) => n.layer === layer);
    const to = NODES.filter((n) => n.layer === layer + 1);
    let order = 0;
    for (const f of from) {
      for (const t of to) {
        out.push({ id: `e-${f.id}-${t.id}`, from: f, to: t, fromLayer: layer, order });
        order += 1;
      }
    }
  }
  return out;
})();

/** Per-layer delay so glow and particles ripple left → right. */
const layerDelay = (layer: number) => layer * WAVE_S;

/* ------------------------------------------------------------------ */
/* Loop orchestration                                                  */
/* ------------------------------------------------------------------ */

type Stage = "idle" | "typing" | "processing" | "output" | "reset";

/**
 * Drives the endless input → process → output cycle. All timers are tracked and
 * rejected on unmount, so no callback fires (or setState runs) after teardown.
 * Under reduced motion the loop never starts — a static final frame is shown.
 */
function useTrainingLoop(text: string, reduced: boolean | null) {
  const [stage, setStage] = useState<Stage>("idle");
  const [typed, setTyped] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduced) {
      // Static "finished" frame: full prompt + answer, no animation.
      setStage("output");
      setTyped(text.length);
      setCycle(1);
      return;
    }

    let aborted = false;
    // Pending sleep-cancellers; invoked on unmount to reject in-flight waits.
    const pending = new Set<() => void>();

    const sleep = (ms: number) =>
      new Promise<void>((resolve, reject) => {
        const id = setTimeout(() => {
          pending.delete(cancel);
          resolve();
        }, ms);
        const cancel = () => {
          clearTimeout(id);
          reject(new Error("aborted"));
        };
        pending.add(cancel);
      });

    async function run() {
      try {
        while (!aborted) {
          // Stage 1 — type the prompt out.
          setStage("typing");
          setTyped(0);
          for (let i = 1; i <= text.length; i++) {
            await sleep(70);
            setTyped(i);
          }
          await sleep(500);

          // Stage 2 — propagate a signal wave through the network.
          setCycle((c) => c + 1); // re-keys the one-shot SVG animations
          setStage("processing");
          await sleep(WAVE_S * 1000 * LAYER_SIZES.length + 300);

          // Stage 3 — reveal the answer and hold.
          setStage("output");
          await sleep(4500);

          // Reset and loop.
          setStage("reset");
          setTyped(0);
          await sleep(500);
        }
      } catch {
        /* aborted during a sleep — exit quietly */
      }
    }

    run();

    return () => {
      aborted = true;
      pending.forEach((cancel) => cancel());
    };
  }, [text, reduced]);

  return { stage, typed, cycle };
}

/* ------------------------------------------------------------------ */
/* Sub-component: InputBubble                                          */
/* ------------------------------------------------------------------ */

function InputBubble({
  typed,
  typing,
  reduced,
}: {
  typed: number;
  typing: boolean;
  reduced: boolean | null;
}) {
  const shown = INPUT_TEXT.slice(0, typed);
  return (
    <div className="w-full max-w-[260px] lg:max-w-none">
      <span className="mb-3 block font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-ink/40">
        Su&apos;aal
      </span>
      <div className="flex justify-start">
        <div className="min-h-[52px] max-w-full rounded-2xl rounded-tl-md bg-gradient-to-br from-indigo-500 to-blue-600 px-5 py-3.5 text-[16px] leading-snug text-white shadow-sm border border-white/10">
          <span>{shown || " "}</span>
          {typing && !reduced && (
            <motion.span
              aria-hidden
              className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-white/80"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-component: NetworkSVG                                           */
/* ------------------------------------------------------------------ */

function NetworkSVG({
  cycle,
  active,
  reduced,
}: {
  cycle: number;
  active: boolean; // signal is propagating (processing or output stage)
  reduced: boolean | null;
}) {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Neural network processing the prompt, layer by layer"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Base connections — always-visible hairlines. */}
      {EDGES.map((e) => (
        <line
          key={e.id}
          x1={e.from.x}
          y1={e.from.y}
          x2={e.to.x}
          y2={e.to.y}
          stroke={HAIRLINE}
          strokeWidth={0.9}
        />
      ))}

      {/* Base nodes. */}
      {NODES.map((n) => (
        <circle
          key={n.id}
          cx={n.x}
          cy={n.y}
          r={6}
          fill={SURFACE}
          stroke={HAIRLINE}
          strokeWidth={1.3}
        />
      ))}

      {/* Animated signal overlay. Re-keyed by `cycle` so the one-shot
          animations replay from the start on every loop. */}
      {reduced ? (
        <StaticSignal />
      ) : (
        active && (
          <g key={cycle}>
            {/* Glow that races along each connection. */}
            {EDGES.map((e) => (
              <motion.line
                key={`g-${e.id}`}
                x1={e.from.x}
                y1={e.from.y}
                x2={e.to.x}
                y2={e.to.y}
                stroke={YELLOW}
                strokeWidth={1.9}
                strokeLinecap="round"
                initial={{ pathLength: 0, strokeOpacity: 0 }}
                animate={{ pathLength: 1, strokeOpacity: [0, 0.9, 0] }}
                transition={{
                  duration: PARTICLE_S + 0.15,
                  delay: layerDelay(e.fromLayer) + e.order * 0.02,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Data particles travelling from node to node. */}
            {EDGES.map((e) => (
              <motion.circle
                key={`p-${e.id}`}
                r={3.2}
                fill={YELLOW}
                initial={{ cx: e.from.x, cy: e.from.y, opacity: 0 }}
                animate={{
                  cx: [e.from.x, e.to.x],
                  cy: [e.from.y, e.to.y],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: PARTICLE_S,
                  delay: layerDelay(e.fromLayer) + e.order * 0.02,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Nodes flash as their layer's wave arrives. Radius (not scale)
                is animated so there is no SVG transform-origin ambiguity. */}
            {NODES.map((n) => (
              <motion.circle
                key={`n-glow-${n.id}`}
                cx={n.x}
                cy={n.y}
                fill={YELLOW}
                initial={{ r: 6, opacity: 0 }}
                animate={{ r: [6, 10, 6], opacity: [0, 1, 0] }}
                transition={{
                  duration: 0.6,
                  delay: layerDelay(n.layer),
                  ease: "easeOut",
                }}
              />
            ))}
          </g>
        )
      )}
    </svg>
  );
}

/** Motion-free "active" frame for prefers-reduced-motion. */
function StaticSignal() {
  return (
    <g>
      {EDGES.map((e) => (
        <line
          key={`sg-${e.id}`}
          x1={e.from.x}
          y1={e.from.y}
          x2={e.to.x}
          y2={e.to.y}
          stroke={YELLOW}
          strokeWidth={1.2}
          strokeOpacity={0.35}
        />
      ))}
      {NODES.map((n) => (
        <circle
          key={`sn-${n.id}`}
          cx={n.x}
          cy={n.y}
          r={6}
          fill={YELLOW}
          fillOpacity={0.45}
          stroke={INK}
          strokeWidth={1}
        />
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-component: OutputBubble                                         */
/* ------------------------------------------------------------------ */

function OutputBubble({
  stage,
  reduced,
}: {
  stage: Stage;
  reduced: boolean | null;
}) {
  const answered = stage === "output" || !!reduced;
  const thinking = stage === "processing";
  const visible = answered || thinking;

  return (
    <div className="w-full max-w-[260px] lg:max-w-none">
      <span className="mb-3 block font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-ink/40">
        Jawaab
      </span>
      <div className="flex justify-end lg:justify-start">
        <motion.div
          className="flex min-h-[52px] items-center rounded-2xl rounded-tr-md bg-[#FFEB00] px-5 py-3.5 text-[16px] font-medium leading-snug text-black shadow-sm lg:rounded-tr-2xl lg:rounded-tl-md border border-black/5"
          initial={false}
          animate={
            reduced
              ? { opacity: 1, y: 0, scale: 1 }
              : {
                  opacity: visible ? 1 : 0,
                  y: visible ? 0 : 8,
                  scale: visible ? 1 : 0.96,
                }
          }
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {answered ? (
            <span>{OUTPUT_TEXT}</span>
          ) : (
            <ThinkingDots reduced={reduced} />
          )}
        </motion.div>
      </div>
    </div>
  );
}

/** Three pulsing dots shown while the network is "thinking". */
function ThinkingDots({ reduced }: { reduced: boolean | null }) {
  return (
    <span className="flex items-center gap-1.5" aria-label="Thinking">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block h-1.5 w-1.5 rounded-full bg-black/50"
          animate={reduced ? undefined : { opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function AITraining() {
  const reduced = useReducedMotion();
  const { stage, typed, cycle } = useTrainingLoop(INPUT_TEXT, reduced);
  const signalActive = stage === "processing" || stage === "output";

  // Keep the SVG mounted once activated so it never remounts mid-loop.
  const hasRun = useRef(false);
  if (signalActive) hasRun.current = true;

  return (
    <section className="relative overflow-hidden bg-transparent py-24 sm:py-32">
      <div className="container-koodby">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="font-sans text-[13px] font-bold uppercase tracking-widest text-ink/50">
              AI Training
            </span>
          </FadeIn>
          <FadeIn>
            <h2 className="mt-4 text-[40px] font-sans font-black uppercase leading-[1.05] tracking-tighter text-ink sm:text-[56px]">
              AI Training
            </h2>
          </FadeIn>
          <FadeIn>
            <p className="mx-auto mt-6 max-w-xl text-[18px] leading-relaxed text-ink/70">
              Daawo sida moodalka Koodby u qaato su&apos;aal, uga fikiro
              shabakad neurons ah, kolkaana afka Soomaaliga kuugu jawaabo.
            </p>
          </FadeIn>
        </div>

      </div>

      {/* Interactive flow: input → network → output. This wrapper is wider than
          the text column above so the network reads large and present. */}
      <FadeIn className="mx-auto mt-14 w-full max-w-[1200px] px-6 sm:mt-16 sm:px-8">
        <div className="flex flex-col items-stretch gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-8">
          <div className="flex justify-center lg:w-[200px] lg:shrink-0 lg:justify-end">
            <InputBubble typed={typed} typing={stage === "typing"} reduced={reduced} />
          </div>

          <div className="mx-auto w-full max-w-[560px] flex-1 lg:mx-0 lg:max-w-[720px]">
            <NetworkSVG
              cycle={cycle}
              active={signalActive || hasRun.current}
              reduced={reduced}
            />
          </div>

          <div className="flex justify-center lg:w-[200px] lg:shrink-0 lg:justify-start">
            <OutputBubble stage={stage} reduced={reduced} />
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
