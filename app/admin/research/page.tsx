"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, Trash2, Plus, Loader2 } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import {
  RESEARCH_CATEGORIES,
  formatPostDate,
  type ResearchCategory,
  type ResearchRow,
} from "@/lib/research-data";

const BUCKET = "research-images";

/** Turn a title into a URL-safe slug. */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  date: new Date().toISOString().slice(0, 10),
  category: "Notes" as ResearchCategory,
  coverAlt: "",
  tags: "",
  externalUrl: "",
  externalLabel: "",
  codeLanguage: "",
  codeSnippet: "",
};

export default function AdminResearchPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [posts, setPosts] = useState<ResearchRow[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const loadPosts = useCallback(async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from("research_posts")
      .select("*")
      .order("date", { ascending: false })
      .order("created_at", { ascending: false });
    if (!error && data) setPosts(data as ResearchRow[]);
    setLoadingList(false);
  }, [supabase]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onTitleChange(value: string) {
    setForm((f) => ({
      ...f,
      title: value,
      slug: slugTouched ? f.slug : slugify(value),
    }));
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    const slug = form.slug.trim() || slugify(form.title);
    if (!slug) {
      setMessage({ type: "err", text: "Title or slug is required." });
      return;
    }
    if (file && !form.coverAlt.trim()) {
      setMessage({ type: "err", text: "Please add alt text for the image." });
      return;
    }

    setSaving(true);
    try {
      let coverImage: string | null = null;

      if (file) {
        const ext = file.name.split(".").pop()?.toLowerCase() || "png";
        const path = `${slug}-${Date.now()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from(BUCKET)
          .upload(path, file, { cacheControl: "3600", upsert: false });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
        coverImage = pub.publicUrl;
      }

      const tags = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const { error: insErr } = await supabase.from("research_posts").insert({
        slug,
        title: form.title.trim(),
        description: form.description.trim(),
        date: form.date,
        category: form.category,
        cover_image: coverImage,
        cover_alt: form.coverAlt.trim() || null,
        code_language: form.codeLanguage.trim() || null,
        code_snippet: form.codeSnippet.trim() || null,
        external_url: form.externalUrl.trim() || null,
        external_label: form.externalLabel.trim() || null,
        tags,
      });

      if (insErr) {
        throw new Error(
          insErr.code === "23505"
            ? "A post with this slug already exists — choose a different slug."
            : insErr.message,
        );
      }

      setMessage({ type: "ok", text: "Post published." });
      setForm(emptyForm);
      setSlugTouched(false);
      setFile(null);
      setPreview(null);
      await loadPosts();
    } catch (err) {
      setMessage({ type: "err", text: err instanceof Error ? err.message : "Something went wrong." });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(post: ResearchRow) {
    if (!confirm(`Delete “${post.title}”? This cannot be undone.`)) return;

    // Remove the stored image first, if it lives in our bucket.
    if (post.cover_image?.includes(`/${BUCKET}/`)) {
      const path = post.cover_image.split(`/${BUCKET}/`)[1];
      if (path) await supabase.storage.from(BUCKET).remove([path]);
    }
    const { error } = await supabase.from("research_posts").delete().eq("id", post.id);
    if (error) {
      setMessage({ type: "err", text: error.message });
      return;
    }
    await loadPosts();
  }

  const inputCls =
    "mt-1.5 w-full rounded-[10px] border border-hairline bg-off-white px-3 py-2.5 text-[15px] text-ink outline-none focus:border-teal";
  const labelCls = "block text-[13px] font-medium text-ink";

  return (
    <main className="min-h-screen bg-off-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-hairline bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-[18px] font-bold tracking-tight text-ink">
              Research admin
            </h1>
            <p className="text-[13px] text-muted">Publish and manage Koodby research posts.</p>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-[10px] border border-hairline bg-surface px-4 py-2 text-[14px] font-medium text-ink hover:bg-off-white"
          >
            <LogOut size={16} strokeWidth={1.9} /> Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1100px] gap-10 px-6 pt-8 lg:grid-cols-[1fr_380px]">
        {/* Create form */}
        <section className="rounded-card border border-hairline bg-surface p-6 sm:p-8">
          <h2 className="text-[20px] font-bold tracking-tight text-ink">New research post</h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className={labelCls} htmlFor="title">Title</label>
              <input
                id="title"
                required
                value={form.title}
                onChange={(e) => onTitleChange(e.target.value)}
                className={inputCls}
                placeholder="Notes on training a Somali language model"
              />
            </div>

            <div>
              <label className={labelCls} htmlFor="slug">Slug (URL anchor)</label>
              <input
                id="slug"
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  update("slug", slugify(e.target.value));
                }}
                className={`${inputCls} font-mono text-[14px]`}
                placeholder="somali-language-models"
              />
            </div>

            <div>
              <label className={labelCls} htmlFor="description">Description</label>
              <textarea
                id="description"
                required
                rows={4}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                className={`${inputCls} resize-y`}
                placeholder="1–3 sentence summary shown on the card."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls} htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="category">Category</label>
                <select
                  id="category"
                  value={form.category}
                  onChange={(e) => update("category", e.target.value as ResearchCategory)}
                  className={inputCls}
                >
                  {RESEARCH_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image upload */}
            <div>
              <label className={labelCls} htmlFor="image">Cover image</label>
              <input
                id="image"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                onChange={onFileChange}
                className="mt-1.5 block w-full text-[14px] text-muted file:mr-3 file:rounded-[8px] file:border-0 file:bg-ink file:px-4 file:py-2 file:text-off-white hover:file:opacity-90"
              />
              {preview && (
                <div className="relative mt-3 h-40 w-full overflow-hidden rounded-[12px] border border-hairline">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className={labelCls} htmlFor="coverAlt">
                Image alt text {file && <span className="text-red-600">*</span>}
              </label>
              <input
                id="coverAlt"
                value={form.coverAlt}
                onChange={(e) => update("coverAlt", e.target.value)}
                className={inputCls}
                placeholder="Describe the image for accessibility"
              />
            </div>

            <div>
              <label className={labelCls} htmlFor="tags">Tags (comma-separated)</label>
              <input
                id="tags"
                value={form.tags}
                onChange={(e) => update("tags", e.target.value)}
                className={inputCls}
                placeholder="LLMs, Somali NLP, Tokenizers"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls} htmlFor="externalUrl">Link URL (optional)</label>
                <input
                  id="externalUrl"
                  type="url"
                  value={form.externalUrl}
                  onChange={(e) => update("externalUrl", e.target.value)}
                  className={inputCls}
                  placeholder="https://github.com/…"
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="externalLabel">Link label</label>
                <input
                  id="externalLabel"
                  value={form.externalLabel}
                  onChange={(e) => update("externalLabel", e.target.value)}
                  className={inputCls}
                  placeholder="View on GitHub"
                />
              </div>
            </div>

            {message && (
              <p
                className={`text-[14px] ${message.type === "ok" ? "text-teal" : "text-red-600"}`}
                role="alert"
              >
                {message.text}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-[10px] bg-teal px-5 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {saving ? <Loader2 size={17} className="animate-spin" /> : <Plus size={17} />}
              {saving ? "Publishing…" : "Publish post"}
            </button>
          </form>
        </section>

        {/* Existing posts */}
        <section>
          <h2 className="text-[16px] font-bold tracking-tight text-ink">
            Published ({posts.length})
          </h2>
          <div className="mt-4 space-y-3">
            {loadingList ? (
              <p className="text-[14px] text-muted">Loading…</p>
            ) : posts.length === 0 ? (
              <p className="text-[14px] text-muted">No posts yet.</p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start gap-3 rounded-[12px] border border-hairline bg-surface p-3"
                >
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-[8px] border border-hairline bg-off-white">
                    {post.cover_image ? (
                      <Image
                        src={post.cover_image}
                        alt={post.cover_alt || post.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] font-mono uppercase text-muted">
                        {post.category}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold text-ink">{post.title}</p>
                    <p className="text-[12px] text-muted">
                      {formatPostDate(post.date)} · {post.category}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(post)}
                    aria-label={`Delete ${post.title}`}
                    className="shrink-0 rounded-[8px] p-2 text-muted hover:bg-off-white hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
