"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { FadeIn } from "./anim/FadeIn";
import { WordReveal } from "./anim/WordReveal";
import { site } from "@/lib/site";

/**
 * FAQ — honest answers, no invented numbers. Accordion with smooth height
 * animation; one item open at a time.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    q: "How much does a project cost?",
    a: "It depends on scope — a landing page and a full app are very different projects. After one discovery call we send a clear, fixed quote. No hourly surprises, no hidden fees.",
  },
  {
    q: "How long will my project take?",
    a: "We tell you upfront, before we start. Smaller sites ship in weeks; bigger apps take longer. Either way you see a working preview every week, so there are no surprises at the end.",
  },
  {
    q: "Do you work with clients outside Somalia?",
    a: "Yes. We work remotely with clients anywhere, in Somali or English. Somali market understanding, global standards.",
  },
  {
    q: "Who owns the code and the design?",
    a: "You do — fully. When the project ends you get the complete source code, design files, and accounts. No lock-in.",
  },
  {
    q: "How do we communicate during the project?",
    a: `One point of contact, on WhatsApp or email — whichever you prefer. Weekly demo links, and you can reach us at ${site.email} any time.`,
  },
];

function FaqItem({
  item,
  open,
  onToggle,
  index,
}: {
  item: (typeof faqs)[number];
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <li className="border-b border-hairline">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
        >
          <span className="font-display text-[22px] leading-snug text-ink transition-colors group-hover:text-muted sm:text-[28px]">
            {item.q}
          </span>
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
              open ? "border-ink bg-ink text-off-white" : "border-ink/20 text-ink"
            }`}
          >
            <Plus size={16} strokeWidth={2} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-[62ch] pb-7 text-[16px] leading-relaxed text-muted sm:text-[18px]">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 border-t bg-transparent">
      <div className="container-koodby grid grid-cols-1 gap-12 py-24 sm:py-32 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <FadeIn>
            <p className="eyebrow">FAQ</p>
          </FadeIn>
          <WordReveal
            lines={[
              { text: "Before", className: "text-ink" },
              { text: "you ask.", className: "italic text-muted" },
            ]}
            className="mt-4 font-display text-[40px] leading-[1.06] tracking-tight sm:text-[60px]"
          />
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-sm text-[16px] leading-relaxed text-muted">
              Anything else on your mind? Ask us directly — no commitment, just
              a conversation.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <ul className="border-t border-hairline">
            {faqs.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                index={i}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
