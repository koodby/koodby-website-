import { Zap, Rocket, Globe, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeIn } from "./anim/FadeIn";

/**
 * Value strip — why teams choose Koodby. Honest value propositions (no project
 * claims, no invented metrics). Soft colour chips add life to the neutral page.
 */
type Value = { icon: LucideIcon; chipBg: string; chipFg: string; title: string; body: string };

const values: Value[] = [
  {
    icon: Zap,
    chipBg: "#EDE9FE",
    chipFg: "#6D28D9",
    title: "AI-first workflow",
    body: "We build faster without cutting corners.",
  },
  {
    icon: Rocket,
    chipBg: "#DBEAFE",
    chipFg: "#2563EB",
    title: "Idea to launch",
    body: "Design, build, and ship — one team.",
  },
  {
    icon: Globe,
    chipBg: "#FEF3C7",
    chipFg: "#D97706",
    title: "Somali + global",
    body: "Local understanding, world-class quality.",
  },
  {
    icon: ShieldCheck,
    chipBg: "#DCFCE7",
    chipFg: "#0F6E56",
    title: "Built for real",
    body: "Working products, not empty promises.",
  },
];

export function TrustStrip() {
  return (
    <section aria-label="Why teams choose Koodby" className="border-y bg-transparent">
      <div className="container-koodby py-14 sm:py-16">
        <FadeIn>
          <p className="eyebrow text-center">Why teams choose Koodby</p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, chipBg, chipFg, title, body }) => (
              <li key={title} className="flex items-start gap-3.5">
                <span
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: chipBg, color: chipFg }}
                >
                  <Icon size={19} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-[15px] font-medium text-ink">
                    {title}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-muted">
                    {body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
