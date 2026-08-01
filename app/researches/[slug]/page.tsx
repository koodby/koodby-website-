import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ResearchCard } from "@/components/ResearchCard";
import { ResearchSidebar } from "@/components/ResearchSidebar";
import {
  getResearchPostBySlug,
  getResearchPosts,
} from "@/lib/research-queries";

// Posts are edited from /admin, so read them fresh on every request.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getResearchPostBySlug(params.slug);
  if (!post) return { title: "Article not found" };

  const url = `https://koodby.com/researches/${post.id}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function ResearchArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const [post, allPosts] = await Promise.all([
    getResearchPostBySlug(params.slug),
    getResearchPosts(),
  ]);

  if (!post) notFound();

  return (
    <>
      <Nav />
      <main className="min-h-screen pb-24 pt-28">
        <div className="w-full pl-4 pr-4 sm:pl-8 sm:pr-8 lg:pl-12 lg:pr-8">
          <div className="ml-auto grid max-w-[1480px] items-start gap-10 lg:grid-cols-[1fr_420px] lg:gap-14">
            {/* Left: the article itself */}
            <div className="mx-auto w-full max-w-[720px]">
              <Link
                href="/researches"
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-muted transition-colors hover:text-ink"
              >
                <ArrowLeft size={15} strokeWidth={2} aria-hidden />
                All research
              </Link>

              <div className="mt-6">
                <ResearchCard post={post} isFeatured delay={0.05} />
              </div>
            </div>

            {/* Right: sticky author / more-from / share rail */}
            <div className="mr-auto w-full max-w-[420px] self-start">
              <ResearchSidebar posts={allPosts} currentPostId={post.id} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
