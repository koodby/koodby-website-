import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/anim/SmoothScroll";
import { FixedClock } from "@/components/FixedClock";
import "./globals.css";

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
  title: "Koodby — Somali technology studio",
  description:
    "Koodby is a Somali technology studio building AI models, apps, and digital solutions — where Somali builders connect.",
  keywords: [
    "Koodby",
    "Somali tech studio",
    "AI models",
    "app development",
    "digital solutions",
    "Somalia",
  ],
  openGraph: {
    title: "Koodby — Somali technology studio",
    description:
      "Your ideas, built together. AI models, apps, and digital solutions.",
    url: "https://koodby.com",
    siteName: "Koodby",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll />
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
