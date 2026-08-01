"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { ResearchListCard } from "./ResearchListCard";
import type { ResearchPost } from "@/lib/research-data";
import { RESEARCH_CATEGORIES } from "@/lib/research-data";

export function ResearchFeed({ initialPosts }: { initialPosts: ResearchPost[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [posts, setPosts] = useState<ResearchPost[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch posts when category or debounced query changes
  useEffect(() => {
    // Skip the first fetch if filters are default (use initial server-rendered data)
    if (activeCategory === "All" && debouncedQuery === "") {
      setPosts(initialPosts);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    const fetchPosts = async () => {
      try {
        const params = new URLSearchParams();
        if (activeCategory !== "All") params.set("category", activeCategory);
        if (debouncedQuery) params.set("q", debouncedQuery);
        
        const res = await fetch(`/api/research?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch");
        
        const data = await res.json();
        if (isMounted) {
          setPosts(data.data || []);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [activeCategory, debouncedQuery, initialPosts]);

  return (
    <div className="mt-8 flex flex-col gap-10">
      {/* Categories with full-width bottom border */}
      <div className="relative w-full border-b border-black/10 dark:border-white/10">
        <div className="flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <button
            onClick={() => setActiveCategory("All")}
            className={`whitespace-nowrap pb-3 text-[14px] font-medium transition-colors border-b-2 -mb-[1px] ${
              activeCategory === "All"
                ? "border-[#2B6DF0] text-[#2B6DF0]"
                : "border-transparent text-ink dark:text-white hover:text-muted dark:hover:text-white/70"
            }`}
          >
            All
          </button>
          {RESEARCH_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap pb-3 text-[14px] font-medium transition-colors border-b-2 -mb-[1px] ${
                activeCategory === cat
                  ? "border-[#2B6DF0] text-[#2B6DF0]"
                  : "border-transparent text-ink dark:text-white hover:text-muted dark:hover:text-white/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="min-h-[400px]">
        {isLoading ? (
          <div className="flex h-40 flex-col items-center justify-center gap-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-black/20 border-t-ink dark:border-white/20 dark:border-t-white" />
            <p className="text-sm text-muted">Searching insights...</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-10">
            {posts.map((post, i) => (
              <ResearchListCard
                key={post.id}
                post={post}
                delay={0.05 + i * 0.06}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-40 flex-col items-center justify-center gap-3 text-center">
            <p className="text-lg font-medium text-ink dark:text-white">No insights found</p>
            <p className="text-sm text-muted">Try adjusting your category or search term.</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-2 text-sm font-medium text-[#2B6DF0] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
