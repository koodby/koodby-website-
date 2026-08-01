"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/research");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-off-white px-6">
      <div className="w-full max-w-[400px] rounded-card border border-hairline bg-surface p-8 shadow-sm">
        <h1 className="text-[24px] font-bold tracking-tight text-ink">
          Koodby admin
        </h1>
        <p className="mt-2 text-[14px] text-muted">
          Sign in to manage research posts.
        </p>

        <form onSubmit={handleSignIn} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-[13px] font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-[10px] border border-hairline bg-off-white px-3 py-2.5 text-[15px] text-ink outline-none focus:border-teal"
              placeholder="you@koodby.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-[13px] font-medium text-ink">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-[10px] border border-hairline bg-off-white px-3 py-2.5 text-[15px] text-ink outline-none focus:border-teal"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-[13px] text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-[10px] bg-ink px-4 py-3 text-[15px] font-medium text-off-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
