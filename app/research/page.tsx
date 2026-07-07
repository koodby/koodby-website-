import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/anim/FadeIn";
import { BookOpen, Lightbulb, TrendingUp, Search, Activity, Cpu } from "lucide-react";

export const metadata = {
  title: "Research — Koodby",
  description: "Insights, findings, and experiments from the Koodby team.",
};

export default function ResearchPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-white pt-24 pb-24">
        <div className="container-koodby">
          <FadeIn>
            <p className="eyebrow text-muted">Our Research</p>
            <h1 className="mt-4 text-[48px] font-display font-medium leading-[1.05] tracking-tight text-ink sm:text-[72px] max-w-4xl">
              Pioneering the future of digital experiences.
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted sm:text-[19px]">
              We don't just build products; we investigate, analyze, and discover new ways to interact with technology. Our research division focuses on human-computer interaction, scalable architecture, and design psychology, ensuring everything we build is backed by solid data.
            </p>
          </FadeIn>

          <div className="mt-24 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <FadeIn delay={0.1}>
              <div className="flex h-full flex-col rounded-[28px] border border-hairline bg-surface p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-off-white border border-hairline">
                  <Search className="text-ink" size={24} />
                </div>
                <h3 className="mt-8 text-[22px] font-display font-medium text-ink">User Behavior Analysis</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-muted">
                  We conduct extensive studies on how users navigate interfaces, allowing us to build more intuitive, frictionless, and accessible digital products for a global audience.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex h-full flex-col rounded-[28px] border border-hairline bg-surface p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-off-white border border-hairline">
                  <Cpu className="text-ink" size={24} />
                </div>
                <h3 className="mt-8 text-[22px] font-display font-medium text-ink">Emerging Technologies</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-muted">
                  From large language models to next-generation frameworks, we are constantly prototyping and evaluating new tools to see how they can provide value to our clients.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex h-full flex-col rounded-[28px] border border-hairline bg-surface p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-off-white border border-hairline">
                  <Activity className="text-ink" size={24} />
                </div>
                <h3 className="mt-8 text-[22px] font-display font-medium text-ink">Performance Optimization</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-muted">
                  We research advanced caching strategies, state management, and edge computing to ensure our applications run at lightning speed, regardless of network conditions.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.4} className="mt-32 rounded-[40px] bg-ink px-6 py-16 sm:px-12 sm:py-24 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-[32px] font-display font-medium leading-tight text-off-white sm:text-[48px]">
                Want to read our latest whitepapers?
              </h2>
              <p className="mt-6 text-[17px] text-muted sm:text-[19px]">
                Join our newsletter to get monthly insights into our research, design experiments, and technical deep-dives directly to your inbox.
              </p>
            </div>
            <div className="mt-10 lg:mt-0 lg:ml-8 shrink-0">
              <a href="/#contact-us" className="btn-teal whitespace-nowrap">
                Subscribe to updates
              </a>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  );
}
