"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, Copy, Check, Code } from "lucide-react";
import { useState } from "react";

import { type ResearchPost } from "@/lib/research-data";
import { site } from "@/lib/site";

function XIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ResearchSidebar({
  posts = [],
  currentPostId,
}: {
  posts?: ResearchPost[];
  currentPostId?: string;
}) {
  const [copied, setCopied] = useState(false);
  const morePosts = posts.filter((p) => p.id !== currentPostId).slice(0, 4);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full flex justify-end lg:fixed lg:top-24 lg:right-8 xl:right-12 lg:w-[420px] lg:z-40">
      <aside className="w-full max-w-[420px] ml-auto rounded-3xl border border-white/10 bg-[#0a0a0a] text-white p-7 sm:p-8 shadow-2xl">
        {/* Author info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white/10 bg-white shrink-0 shadow-sm">
            <Image
              src="/tarzan_founder.png"
              alt="Tarzan Abdirizak"
              fill
              sizes="64px"
              className="object-cover scale-90 translate-y-1"
            />
          </div>
          <div className="pt-0.5">
            <h4 className="text-xl font-bold tracking-tight text-white">
              Tarzan Abdirizak
            </h4>
            <p className="mt-1 text-[14.5px] leading-relaxed text-gray-400 font-normal">
              CEO at Koodby and software engineer with 10+ years of web development experience.
            </p>
          </div>
        </div>

        {/* Follow button */}
        <div className="mt-5">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white text-black px-5 py-2.5 text-[14.5px] font-bold shadow-sm pointer-events-none opacity-50"
          >
            <XIcon className="h-4 w-4" />
            <span>Follow</span>
          </a>
        </div>

        {/* Currently Building */}
        <div className="mt-7 border-t border-white/10 pt-7">
          <h4 className="text-[15px] font-bold tracking-tight text-white mb-4 flex items-center gap-2">
             <Code size={18} className="text-teal" /> Currently Building
          </h4>
          <div className="space-y-3">
             {/* KahelSuuq Card */}
             <a href="#" className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-[#141414] p-3 transition-all hover:bg-[#1f1f1f] hover:shadow-sm">
                <div className="relative flex h-11 w-20 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-white/10 overflow-hidden">
                   <Image src="/kahelsuuq-logo.png" alt="KahelSuuq" fill className="object-contain p-1" />
                </div>
                <div className="flex-1">
                   <h5 className="text-[14px] font-bold text-white flex items-center justify-between">
                      KahelSuuq
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 opacity-0 transition-opacity group-hover:opacity-100"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                   </h5>
                   <p className="text-[12.5px] leading-tight text-gray-400 mt-0.5">B2B Wholesale Marketplace</p>
                </div>
             </a>

             {/* Koodby Card */}
             <a href="/" className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-[#141414] p-3 transition-all hover:bg-[#1f1f1f] hover:shadow-sm">
                <div className="relative flex h-11 w-20 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-white/10 overflow-hidden">
                   <Image src="/narbar-logo.png" alt="Koodby" fill className="object-contain p-1.5" />
                </div>
                <div className="flex-1">
                   <h5 className="text-[14px] font-bold text-white flex items-center justify-between">
                      Koodby
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 opacity-0 transition-opacity group-hover:opacity-100"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                   </h5>
                   <p className="text-[12.5px] leading-tight text-gray-400 mt-0.5">Enterprise Software Solutions</p>
                </div>
             </a>
          </div>
        </div>

        {/* More from Koodby — hidden until there is something else to read */}
        <div
          className={`mt-7 border-t border-white/10 pt-7 ${
            morePosts.length ? "" : "hidden"
          }`}
        >
          <h4 className="text-[17px] font-bold tracking-tight text-white mb-4">
            More from Koodby
          </h4>
          <div className="space-y-4">
            {morePosts.map((post) => (
              <Link
                key={post.id}
                href={`/researches/${post.id}`}
                className="group flex items-center gap-4 rounded-xl p-1.5 -mx-1.5 transition-colors hover:bg-white/5"
              >
                <div className="relative w-[80px] h-[50px] overflow-hidden rounded-xl border border-white/10 bg-[#141414] shrink-0">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] font-mono font-bold text-white/40 uppercase">
                      {post.category}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h5 className="text-[14.5px] font-semibold leading-snug text-white transition-colors group-hover:text-gray-300 line-clamp-2">
                    {post.title}
                  </h5>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Share this article */}
        <div className="mt-7 border-t border-white/10 pt-7">
          <p className="text-[13px] font-semibold text-gray-400 mb-3">
            Share this article:
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/abubakar-abdirsak-993010372"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1c1c1c] text-white border border-white/10 transition-opacity hover:bg-[#2a2a2a] shadow-xs"
            >
              <Linkedin size={17} aria-hidden />
            </a>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1c1c1c] text-white border border-white/10 shadow-xs pointer-events-none opacity-50"
            >
              <Facebook size={17} aria-hidden />
            </a>
            <button
              onClick={handleCopyLink}
              aria-label="Copy article link"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#1c1c1c] text-white transition-colors hover:bg-[#2a2a2a] shadow-xs"
            >
              {copied ? <Check size={17} className="text-emerald-500" /> : <Copy size={17} />}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
