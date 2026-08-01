"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  useVelocity,
} from "motion/react";
import { usePreloadReady } from "@/components/anim/usePreloadReady";
import { ROPE_LANDED_EVENT } from "@/components/anim/useRopeLanded";

/**
 * The pill arrives on a rope. Once the preloader curtain is up, a rope lowers
 * it in, it makes a run for it and gets yanked back, then the rope sets it down
 * in the hero's slot, lets go, and springs back out of frame.
 *
 * The rope is a cubic curve whose control points lag behind the pill's velocity,
 * so it bows, drags and whips instead of behaving like a stick.
 */

const ENTRY_DELAY = 3500; // let the visitor read the headline first
const START_Y = -200; // above the viewport
const FALLBACK_REST = 168; // if the hero slot cannot be measured
const HANG_LIFT = 26; // how far above the slot it hangs before release
const ANCHOR_Y = -56; // rope origin, just off-screen
const ESCAPE_X = 300; // how far it gets before the rope goes taut
const ESCAPE_DIP = 90; // and how far it sags while straining

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v));

export function RopeTag() {
  const ready = usePreloadReady();
  const [gone, setGone] = useState(false);
  const [width, setWidth] = useState(0);
  const hostRef = useRef<HTMLDivElement>(null);
  // Mirrored, so a resize mid-sequence doesn't restart the animation.
  const widthRef = useRef(0);

  const x = useMotionValue(0);
  const y = useMotionValue(START_Y);
  const rot = useMotionValue(0);
  // 0 = rope holds the pill, 1 = rope has sprung all the way back to the anchor.
  const recoil = useMotionValue(0);
  // Idle sway, so a still rope still reads as rope and not as a drawn line.
  const wave = useMotionValue(0);

  const vx = useVelocity(x);
  const vy = useVelocity(y);

  const knotOpacity = useTransform(recoil, [0, 0.12], [1, 0]);

  const d = useTransform(
    [x, y, vx, vy, recoil, wave],
    ([bx, by, vX, vY, r, w]: number[]) => {
      const ax = width / 2;
      // On release the rope end leaves the pill and travels back to the anchor.
      const endX = ax + bx * (1 - r);
      const endY = by + (ANCHOR_Y - by) * r;
      const span = endY - ANCHOR_Y;

      // Slack: bows while the pill is close, straightens as it pulls away.
      const dist = Math.hypot(endX - ax, span);
      const slack = Math.max(0, 300 - dist) * 0.45;
      // Drag: the rope trails whatever the end is doing — this is the whip.
      const dragX = clamp(-vX * 0.045, 150);
      const dragY = clamp(-vY * 0.03, 90);

      // Sway bends the two halves opposite ways — a slack S, not a stick.
      const swayScale = (1 - r) * Math.min(1, span / 180);
      const c1x =
        ax + (endX - ax) * 0.33 + dragX * 0.55 + w * 14 * swayScale;
      const c1y = ANCHOR_Y + span * 0.33 + slack * 0.5 + dragY * 0.45;
      const c2x = ax + (endX - ax) * 0.66 + dragX - w * 18 * swayScale;
      const c2y = ANCHOR_Y + span * 0.66 + slack + dragY;

      return `M ${ax} ${ANCHOR_Y} C ${c1x} ${c1y} ${c2x} ${c2y} ${endX} ${endY}`;
    },
  );

  // Claim the delivery before the hero's stop-gap timer can fire.
  useEffect(() => {
    window.__koodbyRopeActive = true;
  }, []);

  useEffect(() => {
    const sway = animate(wave, [-1, 1], {
      duration: 2.4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    });
    return () => sway.stop();
  }, [wave]);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const measure = () => {
      widthRef.current = el.clientWidth;
      setWidth(el.clientWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!ready || gone) return;

    const land = () => {
      window.__koodbyRopeLanded = true;
      window.dispatchEvent(new Event(ROPE_LANDED_EVENT));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      land();
      setGone(true);
      return;
    }

    let alive = true;
    const running: { stop: () => void }[] = [];
    const play = (controls: ReturnType<typeof animate>) => {
      running.push(controls);
      return controls.finished;
    };

    // Where the hero keeps the pill's seat, in viewport coordinates.
    const slot = () => document.querySelector("[data-rope-slot]");
    const slotTop = () => {
      const top = slot()?.getBoundingClientRect().top;
      return typeof top === "number" && top > 0 ? top : FALLBACK_REST;
    };

    // The whole point is that the visitor sees it arrive, so it only plays
    // while the hero is on screen — otherwise it waits for them to come back.
    const onHero = () => {
      const r = slot()?.getBoundingClientRect();
      if (!r) return true;
      return r.bottom > 0 && r.top < window.innerHeight * 0.75;
    };
    const waitForHero = async () => {
      for (let i = 0; i < 150 && alive; i++) {
        if (onHero()) return true;
        await wait(400);
      }
      return false;
    };
    // Scrolled off mid-flight: put the pill in its seat and clear the overlay.
    const giveUp = () => {
      land();
      setGone(true);
    };

    const run = async () => {
      await wait(ENTRY_DELAY);
      if (!alive) return;
      if (!onHero() && !(await waitForHero())) return giveUp();
      if (!alive) return;

      // 1. The rope lowers it in, and it swings on the way down.
      play(animate(x, [0, 18, -12, 7, -3, 0], { duration: 1.7, ease: "easeOut" }));
      play(animate(rot, [0, 4, -3, 1.5, 0], { duration: 1.7, ease: "easeOut" }));
      await play(
        animate(y, slotTop() - HANG_LIFT, {
          type: "spring",
          stiffness: 95,
          damping: 11,
          mass: 1.1,
        }),
      );
      if (!alive) return;
      if (!onHero()) return giveUp();
      await wait(360);
      if (!alive) return;

      // 2. A twitch the other way — it is sizing up the escape.
      await play(animate(x, -42, { duration: 0.22, ease: "easeOut" }));
      if (!alive) return;

      // The run. Distance is capped by the viewport so it never bolts off a phone.
      const reach = Math.min(
        ESCAPE_X,
        Math.max(70, (widthRef.current || 1280) * 0.22),
      );
      const rest = slotTop() - HANG_LIFT;
      animate(rot, 15, { duration: 0.7, ease: [0.2, 0, 0.5, 1] });
      animate(y, rest + ESCAPE_DIP, { duration: 0.7, ease: [0.2, 0, 0.6, 1] });
      await play(animate(x, reach, { duration: 0.7, ease: [0.12, 0.6, 0.35, 1] }));
      if (!alive) return;

      // 3. Caught. The rope snaps it back over its slot and steadies it.
      animate(rot, 0, { type: "spring", stiffness: 200, damping: 9 });
      animate(y, rest, { type: "spring", stiffness: 260, damping: 15 });
      await play(animate(x, 0, { type: "spring", stiffness: 300, damping: 12 }));
      if (!alive) return;
      if (!onHero()) return giveUp();
      await wait(260);
      if (!alive) return;

      // 4. Let go: the pill drops the last stretch on its own, the rope springs back.
      const recoiling = animate(recoil, 1, {
        type: "spring",
        stiffness: 150,
        damping: 12,
        mass: 0.7,
      });
      running.push(recoiling);
      animate(rot, 0, { duration: 0.3, ease: "easeOut" });
      await play(
        animate(y, slotTop(), {
          type: "spring",
          stiffness: 230,
          damping: 17,
          mass: 0.9,
        }),
      );
      if (!alive) return;

      // Hand the pill over to the hero, then clear the overlay away.
      land();
      await recoiling.finished;
      if (!alive) return;
      await wait(120);
      if (!alive) return;
      setGone(true);
    };

    run();
    return () => {
      alive = false;
      running.forEach((c) => c.stop());
    };
  }, [ready, gone, x, y, rot, recoil]);

  if (gone) return null;

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full text-ink/25"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          data-rope="line"
          d={d}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>

      <motion.div
        className="absolute inset-x-0 top-0 flex justify-center"
        style={{ y }}
      >
        <motion.div
          data-rope="tag"
          style={{ x, rotate: rot }}
          className="relative origin-top"
        >
          {/* Knot where the rope meets the pill — goes with the rope. */}
          <motion.span
            className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-ink/40"
            style={{ opacity: knotOpacity }}
          />
          {/* Same pill the hero holds a seat for. */}
          <div className="inline-flex items-center gap-2.5 rounded-xl border border-hairline bg-surface px-5 py-1.5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-[13px] font-medium tracking-wide text-ink">
              We are waiting for you
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
