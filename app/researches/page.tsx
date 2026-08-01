import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ResearchFeed } from "@/components/ResearchFeed";
import { getResearchPosts } from "@/lib/research-queries";

export const metadata = {
  title: "Research & Insights — Somali AI & Tech Articles",
  description: "Technical articles, AI research, design experiments, and tech insights from the Koodby studio. Exploring Somali language AI, machine learning, web architecture, and digital innovation in East Africa.",
  keywords: [
    "Somali AI research",
    "Somali tech articles",
    "AI research Somalia",
    "Somali language NLP research",
    "technology blog Somalia",
    "Somali engineering insights",
    "machine learning articles",
    "Koodby research",
  ],
  alternates: {
    canonical: "https://koodby.com/researches",
  },
  openGraph: {
    title: "Research & Insights — Koodby",
    description: "AI research, technical articles, and tech insights from Somalia's leading tech studio.",
    url: "https://koodby.com/researches",
  },
};

// Always render the latest posts from the database.
export const dynamic = "force-dynamic";

export default async function ResearchIndexPage() {
  const researchPosts = await getResearchPosts();

  return (
    <>
      <Nav />
      <main className="min-h-screen pb-24 pt-28">
        <div className="mx-auto w-full max-w-[820px] px-5 sm:px-8">
          <header className="mb-10">
            <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold leading-[1.1] tracking-tight text-ink dark:text-white">
              Sharing Koodby <span className="text-[#2B6DF0]">Collective experience:</span>
            </h1>
            <p className="mt-4 max-w-[62ch] text-[16px] leading-relaxed text-muted">
              Technical articles, AI experiments, and tech insights from the
              Koodby studio.
            </p>
          </header>

          <ResearchFeed initialPosts={researchPosts} />
        </div>
      </main>
      <Footer />
    </>
  );
}
