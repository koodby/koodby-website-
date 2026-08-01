import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { mapRow, type ResearchRow } from "@/lib/research-data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "All";
    const q = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const supabase = await createClient();

    // Base query with exact count
    let query = supabase
      .from("research_posts")
      .select("*", { count: "exact" })
      .order("date", { ascending: false })
      .order("created_at", { ascending: false });

    // Apply category filter
    if (category && category !== "All") {
      query = query.eq("category", category);
    }

    // Apply search filter (ILIKE on title or description)
    if (q) {
      const searchTerm = `%${q}%`;
      query = query.or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`);
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("API /api/research GET error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const posts = (data as ResearchRow[]).map(mapRow);

    return NextResponse.json({
      data: posts,
      totalCount: count || 0,
      page,
      limit,
    });
  } catch (err) {
    console.error("API /api/research exception:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
