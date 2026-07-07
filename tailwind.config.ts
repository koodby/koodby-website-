import type { Config } from "tailwindcss";

/**
 * Koodby design tokens — LOCKED (see CLAUDE.md §3).
 * Do not add colors/fonts here without approval. Change how a token is used,
 * not the token itself.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        "off-white": "#F4F2EC",
        surface: "#FFFFFF",
        muted: "#6B6B66",
        hairline: "#E8E6DF",
        teal: "#0F6E56",
        "teal-tint": "#E1F5EE",
        // Teal alias — points at the locked teal accent.
        primary: "#0F6E56",
        // Hero (reference-style) accent — used for the brand mark + subtle arcs.
        iris: "#6E56F0",
        "iris-tint": "#EEEBFD",
      },
      boxShadow: {
        // Soft, flat-ish elevation for the reference-style hero (cards, buttons).
        soft: "0 12px 32px -14px rgba(15, 15, 20, 0.18)",
        float: "0 8px 24px -10px rgba(15, 15, 20, 0.16)",
        demo: "0 40px 80px -32px rgba(15, 15, 20, 0.28)",
      },
      borderColor: {
        DEFAULT: "#E8E6DF",
      },
      fontFamily: {
        // Display / headings — Bricolage Grotesque (next/font, self-hosted).
        display: ["var(--font-display)", "'Segoe UI'", "Helvetica", "Arial", "sans-serif"],
        // Body — Inter (next/font, self-hosted).
        sans: ["var(--font-body)", "'Segoe UI'", "Helvetica", "Arial", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
        btn: "10px",
        pill: "20px",
      },
      maxWidth: {
        container: "1100px",
        measure: "560px",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
