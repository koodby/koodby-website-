import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/anim/FadeIn";
import { WordReveal } from "@/components/anim/WordReveal";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

export const metadata = {
  title: "Community — Koodby",
  description:
    "The Koodby community — a hub for Somali engineers, programmers, and researchers. Coming soon.",
};

const waitlistLink = `mailto:${site.email}?subject=${encodeURIComponent(
  "Community waiting list"
)}&body=${encodeURIComponent(
  "Salaan! I'd like to join the Koodby community when it opens.\n\nName:\nWhat I build:"
)}`;

export default function CommunityPage() {
  return (
    <>
      <Nav />
      <main
        id="content"
        className="flex min-h-[100dvh] flex-col items-center justify-center bg-white px-6 py-32 text-center"
      >
        <FadeIn>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-surface px-4 py-1.5 text-[13px] font-medium tracking-wide text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
            Community · in the works
          </span>
        </FadeIn>

        <WordReveal
          as="h1"
          lines={[
            { text: "Dhawaan.", className: "text-ink" },
            { text: "Coming soon.", className: "italic text-muted" },
          ]}
          delay={0.15}
          className="mt-8 font-display text-[56px] leading-[1.02] tracking-tight sm:text-[104px]"
        />

        <FadeIn delay={0.45}>
          <p className="mx-auto mt-8 max-w-[52ch] text-[18px] leading-relaxed text-muted sm:text-[20px]">
            We&apos;re building a hub that unites Somali engineers, programmers,
            and researchers — profiles, projects, and opportunities. It
            isn&apos;t open yet. Want to be first in when it is? Join the
            waiting list.
          </p>
        </FadeIn>

        <FadeIn delay={0.55} className="mt-11 flex flex-wrap items-center justify-center gap-3">
          <a
            href={waitlistLink}
            className="inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-[16px] font-medium text-off-white transition-transform hover:scale-105 active:scale-95"
          >
            Ku biir liiska
            <ArrowUpRight size={17} strokeWidth={2} aria-hidden />
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 text-[16px] font-medium text-ink transition-colors hover:bg-surface"
          >
            <ArrowLeft size={16} strokeWidth={2} aria-hidden />
            Back to home
          </a>
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
