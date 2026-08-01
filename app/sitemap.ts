import type { MetadataRoute } from "next";

import { getResearchSlugs } from "@/lib/research-queries";

export const dynamic = "force-dynamic";

/**
 * Dynamic sitemap generator — Next.js produces `/sitemap.xml` from this at
 * build-time (static) and on each request (dynamic). Google, Bing, and other
 * crawlers use it to discover every public page on koodby.com, including one
 * entry per research article.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://koodby.com";
  const posts = await getResearchSlugs();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/researches`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/researches/${post.slug}`,
      lastModified: new Date(`${post.date}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/community`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/links`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
