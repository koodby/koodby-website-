import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  Facebook,
  Github,
  Globe,
  Lightbulb,
  Linkedin,
  Mail,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { siTiktok } from "simple-icons";

import { DarkBody } from "@/components/DarkBody";
import { FadeIn } from "@/components/anim/FadeIn";
import { site, whatsappLink, mailtoLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Links — Connect with Koodby | Somali Tech Studio",
  description:
    "All Koodby links in one place — connect with Somalia's leading technology studio. Find our GitHub, LinkedIn, email, and project resources.",
  keywords: [
    "Koodby links",
    "Koodby contact",
    "Koodby GitHub",
    "Koodby LinkedIn",
    "Somali tech studio contact",
    "hire Somali developers",
  ],
  openGraph: {
    title: "Koodby — Links",
    description: "Every Koodby link in one place. Discover our resources, stay informed, and connect.",
    url: "https://koodby.com/links",
  },
};

/** One link row: icon tile + title + subtitle, hairline under, hover lift. */
type Row = {
  title: string;
  subtitle: string;
  href: string;
  icon: any;
  /** Icon-tile background; defaults to white with ink icon. */
  tint?: string;
  /** Icon color; defaults to ink on the white tile. */
  iconColor?: string;
};

function TiktokIcon({ size, ...props }: any) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d={siTiktok.path} />
    </svg>
  );
}


const community: Row[] = [
  {
    title: "Insights",
    subtitle: "Read our latest researches",
    href: "/researches",
    icon: Lightbulb,
    tint: "#1A1A1A",
    iconColor: "#FFFFFF",
  },
  {
    title: "Facebook",
    subtitle: "Koodby",
    href: "https://www.facebook.com/profile.php?id=61592602497132",
    icon: Facebook,
    tint: "#1877F2",
    iconColor: "#FFFFFF",
  },
  {
    title: "WhatsApp",
    subtitle: "+252 618 450 410",
    href: "https://wa.me/252618450410",
    icon: MessageCircle,
    tint: "#25D366",
    iconColor: "#FFFFFF",
  },
  {
    title: "TikTok",
    subtitle: "@koodby1",
    href: "https://www.tiktok.com/@koodby1?is_from_webapp=1&sender_device=pc",
    icon: TiktokIcon,
    tint: "#000000",
    iconColor: "#FFFFFF",
  },
  {
    title: "Email",
    subtitle: site.email,
    href: mailtoLink,
    icon: Mail,
    tint: "#0F6E56",
    iconColor: "#FFFFFF",
  },
];

function LinkRow({ row, delay }: { row: Row; delay: number }) {
  const { title, subtitle, href, icon: Icon, tint, iconColor } = row;
  const external = href.startsWith("http");

  return (
    <FadeIn delay={delay} y={16} duration={0.6}>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group flex items-center gap-4 border-b border-white/10 py-5 transition-colors hover:border-white/25"
      >
        <span
          className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-white text-ink transition-transform duration-200 group-hover:scale-105"
          style={tint ? { backgroundColor: tint, color: iconColor } : undefined}
        >
          <Icon size={20} strokeWidth={2} aria-hidden />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[17px] font-semibold leading-tight text-white">
            {title}
          </span>
          <span className="block truncate text-[14px] text-white/45">
            {subtitle}
          </span>
        </span>

        <ArrowUpRight
          size={18}
          strokeWidth={2}
          aria-hidden
          className="flex-none text-white/30 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
        />
      </a>
    </FadeIn>
  );
}

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <DarkBody />
      <div className="mx-auto w-full max-w-[600px] px-6 py-16 sm:py-24">
        {/* brand */}
        <FadeIn y={12} duration={0.6}>
          <Link
            href="/"
            className="inline-flex items-center gap-3"
            aria-label="Koodby home"
          >
            <Image
              src="/narbar-logo.png"
              alt="Koodby"
              width={40}
              height={40}
              className="h-10 w-10 object-contain opacity-95 mix-blend-screen invert"
              priority
            />
            <span className="text-[20px] font-black uppercase tracking-tight text-white">
              Koodby
            </span>
          </Link>
        </FadeIn>




        {/* community */}
        <section className="mt-16">
          <FadeIn y={16}>
            <h2 className="text-[26px] font-medium normal-case tracking-tight text-white sm:text-[30px]">
              Join the community
            </h2>
            <p className="mt-2 text-[15px] text-white/45">
              Stay tuned for the latest updates, announcements, and projects.
            </p>
          </FadeIn>

          <div className="mt-6">
            {community.map((row, i) => (
              <LinkRow key={row.title} row={row} delay={0.1 + i * 0.06} />
            ))}
          </div>
        </section>

        {/* footer */}
        <FadeIn delay={0.1} y={12}>
          <p className="mt-16 text-[13px] text-white/35">
            © 2026 Koodby — built in Somalia, made for the world.
          </p>
        </FadeIn>
      </div>
    </main>
  );
}
