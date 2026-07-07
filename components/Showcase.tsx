"use client";

import { BrainCircuit, Smartphone, Gauge } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LogoMark } from "./Logo";
import { FadeIn } from "./anim/FadeIn";

/**
 * "What is Koodby" showcase — a central Koodby badge branching to three
 * capability cards, each with a colourful illustrative mockup. These are
 * demonstrations of what we build, not claims of shipped client work: content
 * is generic on purpose (no invented clients, metrics, or testimonials).
 */

/* ---------- colourful mockups ---------- */

function ChatMock() {
  return (
    <div className="rounded-xl border bg-off-white p-3">
      <div className="max-w-[88%] rounded-2xl rounded-tl-md border bg-white px-3 py-2 text-[12px] leading-snug text-ink">
        Salaan! Sidee baan kaaga caawin karaa maanta?
      </div>
      <div className="ml-auto mt-2 max-w-[72%] rounded-2xl rounded-tr-md bg-[#6D28D9] px-3 py-2 text-right text-[12px] leading-snug text-white">
        Waxaan rabaa app cusub
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <span className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6D28D9]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#6D28D9]/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#6D28D9]/30" />
        </span>
        <span className="text-[11px] text-muted">Koodby AI wuu qorayaa…</span>
      </div>
    </div>
  );
}

function AppMock() {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="flex items-center justify-between bg-[#2563EB] px-3 py-2.5">
        <span className="text-[12px] font-medium text-white">Your app</span>
        <span className="flex gap-1" aria-hidden>
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
        </span>
      </div>
      <div className="space-y-2 p-3">
        {[
          { c: "#2563EB", w: "w-3/4" },
          { c: "#7C3AED", w: "w-1/2" },
          { c: "#F59E0B", w: "w-2/3" },
        ].map((r, i) => (
          <div key={i} className="flex items-center gap-2.5 rounded-lg border px-2.5 py-2">
            <span className="h-6 w-6 shrink-0 rounded-md" style={{ background: r.c }} />
            <span className="flex flex-1 flex-col gap-1">
              <span className={`h-1.5 rounded-full bg-ink/15 ${r.w}`} />
              <span className="h-1.5 w-1/3 rounded-full bg-ink/10" />
            </span>
          </div>
        ))}
        <button className="mt-1 w-full rounded-lg bg-[#2563EB] py-2 text-[12px] font-medium text-white">
          Continue
        </button>
      </div>
    </div>
  );
}

function DashMock() {
  const legend = [
    { label: "Spent", c: "#2563EB" },
    { label: "Projected", c: "#7C3AED" },
    { label: "Available", c: "#F59E0B" },
    { label: "Rollover", c: "#E8E6DF" },
  ];
  return (
    <div className="rounded-xl border bg-white p-3.5">
      <p className="text-[12px] font-medium text-ink">Hours usage</p>
      <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full">
        <span className="h-full bg-[#2563EB]" style={{ width: "32%" }} />
        <span className="h-full bg-[#7C3AED]" style={{ width: "26%" }} />
        <span className="h-full bg-[#F59E0B]" style={{ width: "24%" }} />
        <span className="h-full bg-[#E8E6DF]" style={{ width: "18%" }} />
      </div>
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
        {legend.map((l) => (
          <span key={l.label} className="inline-flex items-center gap-1.5 text-[11px] text-muted">
            <span className="h-2 w-2 rounded-full" style={{ background: l.c }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- cards ---------- */

type Card = {
  icon: LucideIcon;
  chipBg: string;
  chipFg: string;
  title: string;
  body: string;
  mockup: React.ReactNode;
  delay: number;
};

const cards: Card[] = [
  {
    icon: BrainCircuit,
    chipBg: "#EDE9FE",
    chipFg: "#6D28D9",
    title: "AI that speaks Somali",
    body: "Chatbots and models that understand your language and your business — helping customers day and night.",
    mockup: <ChatMock />,
    delay: 0,
  },
  {
    icon: Smartphone,
    chipBg: "#DBEAFE",
    chipFg: "#2563EB",
    title: "Apps people love to use",
    body: "Fast, clean mobile and web apps designed around your customers — not around us.",
    mockup: <AppMock />,
    delay: 0.08,
  },
  {
    icon: Gauge,
    chipBg: "#FEF3C7",
    chipFg: "#D97706",
    title: "Automation that saves hours",
    body: "Dashboards and automations that quietly remove the manual work eating your team's time.",
    mockup: <DashMock />,
    delay: 0.16,
  },
];

function Connector() {
  return (
    <div className="relative mx-auto hidden h-14 w-full md:block" aria-hidden>
      <svg viewBox="0 0 1000 56" preserveAspectRatio="none" className="h-full w-full">
        <g fill="none" stroke="#E8E6DF" strokeWidth="1" vectorEffect="non-scaling-stroke">
          <path d="M500 0 L500 28" />
          <path d="M167 28 L833 28" />
          <path d="M167 28 L167 56" />
          <path d="M500 28 L500 56" />
          <path d="M833 28 L833 56" />
        </g>
      </svg>
    </div>
  );
}

export function Showcase() {
  return (
    <section id="showcase" className="scroll-mt-24 bg-transparent">
      <div className="container-koodby py-24 sm:py-32">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">What is Koodby</p>
          <h2 className="mt-4 text-[34px] font-medium leading-[1.05] tracking-tight text-ink sm:text-[48px]">
            One studio to design, build, and ship what your business needs
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-muted sm:text-[17px]">
            From AI to apps to automation — we turn your idea into a real
            product your customers love, faster than you&apos;d expect.
          </p>
        </FadeIn>

        <FadeIn delay={0.05} className="mt-12 flex justify-center">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-white shadow-[0_14px_34px_-14px_rgba(10,10,10,0.55)]">
            <LogoMark size={20} />
            <span className="font-display text-[16px] font-medium tracking-tight">
              Koodby
            </span>
          </span>
        </FadeIn>

        <Connector />

        <div className="mt-5 grid grid-cols-1 gap-5 md:mt-0 md:grid-cols-3">
          {cards.map(({ icon: Icon, chipBg, chipFg, title, body, mockup, delay }) => (
            <FadeIn key={title} delay={delay} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-ink/15">
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: chipBg, color: chipFg }}
                >
                  <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-[19px] font-medium leading-snug text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{body}</p>
                <div className="mt-6">{mockup}</div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
