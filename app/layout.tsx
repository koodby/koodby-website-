import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/anim/SmoothScroll";
import { FixedClock } from "@/components/FixedClock";
import { ThemeToggle } from "@/components/ThemeToggle";
import { JsonLd } from "@/components/JsonLd";
import { Preloader } from "@/components/Preloader";
import "./globals.css";

// Set the theme class before first paint to avoid a flash of the wrong theme. Default to Day mode.
const themeScript = `(function(){try{var t=localStorage.getItem('koodby-theme');if(t==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`;

// Display / headings — elegant serif.
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Body — clean, highly readable.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://koodby.com"),
  title: {
    default: "Koodby — Somali AI & Technology Studio | Web, Apps & AI Solutions",
    template: "%s | Koodby",
  },
  description:
    "Koodby is Somalia's leading technology studio building AI models, Somali language AI, web applications, mobile apps, and digital products. We specialize in Somali AI, machine learning, and custom software development. Built in Mogadishu, made for the world.",
  icons: {
    icon: "/favicon-logo.png",
    shortcut: "/favicon-logo.png",
    apple: "/favicon-logo.png",
  },
  keywords: [
    // Brand
    "Koodby",
    "Koodby tech",
    "Koodby studio",
    "Koodby Somalia",
    // Somali AI — primary targets
    "Somali AI",
    "Soomaali AI",
    "AI Soomaaliyeed",
    "Somali artificial intelligence",
    "Somali language AI",
    "Somali NLP",
    "Somali language model",
    "AI af Soomaali",
    // Somali Technology
    "Somali technology",
    "Somali tech",
    "Somali tech company",
    "Somalia technology company",
    "East Africa tech",
    "African tech startup",
    "Mogadishu tech",
    "technology Somalia",
    "tiknolojiyada Soomaaliya",
    // Software & Development
    "Somali software company",
    "Somali web developer",
    "Somali website builder",
    "Somali app development",
    "Somali mobile app",
    "Somalia software development",
    "web development Somalia",
    "app development Somalia",
    "React developer Somalia",
    "Next.js developer Somalia",
    "full-stack developer Somalia",
    // AI & ML
    "AI model training",
    "machine learning Somalia",
    "neural networks",
    "LLM training",
    "natural language processing",
    "custom AI solutions",
    "AI chatbot Somali",
    // Digital & Content
    "Somali digital solutions",
    "Somali content creator website",
    "digital products Somalia",
    "Somali brand design",
    "Somali startup",
    "Somali engineers",
    "Somali developers community",
    "Somali programmers",
  ],
  authors: [{ name: "Koodby", url: "https://koodby.com" }],
  creator: "Koodby",
  publisher: "Koodby",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://koodby.com",
    languages: {
      "en-US": "https://koodby.com",
      "so-SO": "https://koodby.com",
    },
  },
  openGraph: {
    title: "Koodby — Somali AI & Technology Studio",
    description:
      "Somalia's leading technology studio. We build AI models, Somali language AI, web apps, mobile apps, and digital products. Where Somali builders connect.",
    url: "https://koodby.com",
    siteName: "Koodby",
    locale: "en_US",
    alternateLocale: ["so_SO"],
    type: "website",
    images: [
      {
        url: "/favicon-logo.png",
        width: 512,
        height: 512,
        alt: "Koodby — Somali AI & Technology Studio logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Koodby — Somali AI & Technology Studio",
    description:
      "Building AI models, Somali language AI, web & mobile apps. Somalia's leading technology studio.",
    images: ["/favicon-logo.png"],
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: the inline theme script adds `dark` to <html>
    // before hydration, so the client class list intentionally differs.
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd />
      </head>
      <body>
        <Preloader />
        <SmoothScroll />
        <ThemeToggle />
        <FixedClock />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-btn focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-off-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
