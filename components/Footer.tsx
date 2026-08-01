"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowUp, Facebook, Mail, MessageCircle } from "lucide-react";
import { siTiktok } from "simple-icons";
import { FadeIn } from "./anim/FadeIn";
import { Magnet } from "./anim/Magnet";
import { site, whatsappLink, mailtoLink } from "@/lib/site";

/**
 * Editorial footer — giant serif wordmark, sitemap, socials, live Mogadishu
 * clock, back-to-top. The wordmark doubles as the site's closing statement.
 */

function MogadishuClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Mogadishu",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums text-muted" suppressHydrationWarning>
      Mogadishu {time ?? "--:--:--"} EAT
    </span>
  );
}

const sitemap = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

function TiktokIcon({ size, ...props }: any) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d={siTiktok.path} />
    </svg>
  );
}

const elsewhere = [
  { label: "Facebook", href: site.facebook, icon: Facebook },
  { label: "TikTok", href: site.tiktok, icon: TiktokIcon },
  { label: "Email", href: mailtoLink, icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t bg-transparent" aria-label="Koodby — Somali AI and technology studio footer">
      <div className="container-koodby pt-16 sm:pt-20">
        {/* top row: invitation + columns */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <FadeIn>
            <p className="max-w-[24ch] font-sans font-black uppercase tracking-tighter text-[30px] leading-snug text-ink sm:text-[38px]">
              Where Somali builders build{" "}
              <span className="italic font-serif lowercase text-muted">the future.</span>
            </p>
            <a
              href={mailtoLink}
              className="group mt-6 inline-flex items-center gap-2 text-[18px] font-medium text-ink underline-offset-4 hover:underline"
            >
              {site.email}
              <ArrowUpRight
                size={17}
                strokeWidth={2}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="eyebrow">Menu</p>
            <ul className="mt-5 space-y-2.5">
              {sitemap.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[16px] text-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-5 space-y-2.5">
              {elsewhere.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-2.5 text-[16px] text-muted transition-colors hover:text-ink"
                  >
                    <Icon size={15} strokeWidth={1.75} aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        {/* giant wordmark — clipped flush at the bottom border */}
        <FadeIn delay={0.1} y={40} className="mt-16 sm:mt-20">
          <div className="overflow-hidden" aria-hidden>
            <p className="-mb-[0.24em] select-none text-center font-sans font-black text-[14vw] md:text-[13vw] leading-[0.85] tracking-tighter text-ink lg:text-[12vw]">
              Koodby
            </p>
          </div>
        </FadeIn>
      </div>

      {/* bottom bar */}
      <div className="border-t">
        <div className="container-koodby flex flex-col items-center gap-4 py-6 text-[14px] sm:flex-row sm:justify-between">
          <span className="text-muted">© 2026 Koodby — Somali AI & technology studio. Built in Mogadishu, Somalia. Made for the world.</span>
          <MogadishuClock />
          <Magnet padding={70} strength={5}>
            <a
              href="#top"
              aria-label="Back to top"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-off-white"
            >
              <ArrowUp size={16} strokeWidth={2} aria-hidden />
            </a>
          </Magnet>
        </div>
      </div>
    </footer>
  );
}
