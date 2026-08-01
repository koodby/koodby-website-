import "server-only";

import { createClient } from "@/lib/supabase/server";
import { mapRow, type ResearchPost, type ResearchRow } from "@/lib/research-data";

/** Fetch all research posts, newest first, mapped for the public UI. */
export async function getResearchPosts(): Promise<ResearchPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("research_posts")
    .select("*")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getResearchPosts:", error.message);
    return [];
  }
  return (data as ResearchRow[]).map(mapRow);
}

/** Fetch one post by its slug — the public URL segment. Null when missing. */
export async function getResearchPostBySlug(
  slug: string,
): Promise<ResearchPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("research_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("getResearchPostBySlug:", error.message);
    return null;
  }
  return data ? mapRow(data as ResearchRow) : null;
}

/** Slugs + dates only — used to list every article in the sitemap. */
export async function getResearchSlugs(): Promise<
  { slug: string; date: string }[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("research_posts")
    .select("slug, date")
    .order("date", { ascending: false });

  if (error) {
    console.error("getResearchSlugs:", error.message);
    return [];
  }
  return data as { slug: string; date: string }[];
}

/** Fetch raw rows (incl. uuid) for the admin list. */
export async function getResearchRows(): Promise<ResearchRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("research_posts")
    .select("*")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getResearchRows:", error.message);
    return [];
  }
  return data as ResearchRow[];
}
