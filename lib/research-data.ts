/**
 * Research post types + pure helpers.
 *
 * Posts live in Supabase (table `public.research_posts`) and are created from
 * the admin panel at /admin/research. This file is client-safe: it holds only
 * the shared type, the display mapper, and date formatting — no server imports.
 * Server-side fetching lives in `lib/research-queries.ts`.
 */

export type ResearchCategory =
  | "AI & Data"
  | "Behind the Code"
  | "Local Insights"
  | "Problem Solved"
  | "Vision";

export const RESEARCH_CATEGORIES: ResearchCategory[] = [
  "AI & Data",
  "Behind the Code",
  "Local Insights",
  "Problem Solved",
  "Vision",
];

export type ResearchPost = {
  /** Human slug — used as the anchor id on the page. */
  id: string;
  title: string;
  /** 1–3 sentence summary shown on the card. */
  description: string;
  /** ISO date (YYYY-MM-DD) — formatted for display automatically. */
  date: string;
  category: ResearchCategory;
  coverImage?: string;
  coverAlt?: string;
  codeSnippet?: string;
  codeLanguage?: string;
  externalUrl?: string;
  externalLabel?: string;
  tags?: string[];
  featuredPills?: string[];
};

/** Raw row shape as stored in Postgres (snake_case). */
export type ResearchRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  category: ResearchCategory;
  cover_image: string | null;
  cover_alt: string | null;
  code_snippet: string | null;
  code_language: string | null;
  external_url: string | null;
  external_label: string | null;
  tags: string[] | null;
  featured_pills: string[] | null;
  created_at?: string;
};

/** Map a DB row into the camelCase shape the UI components expect. */
export function mapRow(row: ResearchRow): ResearchPost {
  return {
    id: row.slug,
    title: row.title,
    description: row.description,
    date: row.date,
    category: row.category,
    coverImage: row.cover_image ?? undefined,
    coverAlt: row.cover_alt ?? undefined,
    codeSnippet: row.code_snippet ?? undefined,
    codeLanguage: row.code_language ?? undefined,
    externalUrl: row.external_url ?? undefined,
    externalLabel: row.external_label ?? undefined,
    tags: row.tags ?? undefined,
    featuredPills: row.featured_pills ?? undefined,
  };
}

/** Human-readable date for cards, e.g. "June 22, 2023". */
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
