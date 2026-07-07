# CLAUDE.md — Koodby Website (koodby.com)

This file is the single source of truth for the Koodby marketing website.
Read it fully before writing or changing any code. Do not deviate from the
locked design system or layout without explicit approval from Tarzan.

---

## 1. Project

**Koodby** is a Somali technology studio and (later) community. It builds AI
models, apps, and digital solutions, and aims to become a hub that unites
Somali engineers, programmers, and researchers.

**Goal of this site (V1):** a single-page marketing site that makes Koodby
feel real, professional, and human — leading a visitor to trust Koodby and
then contact us. It is NOT a generic SaaS landing page.

The site must achieve four things:
1. Credibility — feels like a real, established studio.
2. Leads — moves the visitor to contact Koodby.
3. Proof — shows real projects (Near, DaawoCheck, Ziko).
4. Foundation — built so a `/community` area can be added later without a rebuild.

**V1 scope (build now):** single landing page with the sections in §4.
**V2 scope (DO NOT build now):** community hub, builder profiles, project
directory, opportunities board, accounts/login. Structure the code so these
can be added later, but do not implement them.

---

## 2. Tech stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS (map the locked tokens into `tailwind.config` and
  a small set of CSS variables)
- **Fonts:** `next/font/google` — Space Grotesk + Inter (self-hosted via next/font)
- **Deploy:** Vercel (Cloud Run is acceptable if preferred)
- **Icons:** lucide-react (outline, thin) — keep icon use minimal
- Mobile-first, fully responsive. Test at 375px, 768px, 1280px.

---

## 3. Design system — can ask you to change by tarzan

Do not change these values or introduce new colors/fonts without explicit
approval. The whole point of this section is to stop restyling churn: when
something feels off, change how a token is *used*, not the token itself.

### Colors

| Token          | Hex       | Use                                             |
|----------------|-----------|-------------------------------------------------|
| `ink`          | `#0A0A0A` | Primary text, primary buttons, logo mark        |
| `off-white`    | `#FAFAF7` | Page background (warm, not pure white)          |
| `surface`      | `#FFFFFF` | Cards, panels, elevated surfaces                |
| `muted`        | `#6B6B66` | Secondary text, captions                        |
| `border`       | `#E8E6DF` | Hairline borders, dividers                      |
| `teal`         | `#0F6E56` | The ONE accent — buttons, links, tags, emphasis |
| `teal-tint`    | `#E1F5EE` | Accent backgrounds (pills, highlight cards)     |

**Accent rule:** teal is used *sparingly* — links, one tag/pill, one
highlighted stat, small emphasis. Never large teal fills, never teal
backgrounds on whole sections except the single CTA band (§4.7).
If the accent is ever swapped, change ONLY `teal`/`teal-tint`
(alternative approved: coral `#D85A30` / tint `#FAECE7`). Nothing else moves.

### Typography

- **Headings / display:** Space Grotesk — weights 500, 600, 700.
- **Body:** Inter — weights 400, 500. Only these two weights.
- **Scale (desktop):** h1 40–44px / h2 28–32px / h3 20px / body 16px /
  small 13–14px / caption 11–12px. Never below 11px.
- Headline letter-spacing: `-1px` on h1. Body line-height: 1.6.
- **Sentence case everywhere.** No ALL CAPS except tiny eyebrow labels with
  wide letter-spacing. No Title Case.

### Spacing & shape

- **Spacing:** 4px base scale — 8, 12, 16, 24, 32, 48, 64, 96. Use these
  values only; no random paddings.
- **Radius:** cards 12–16px, buttons/inputs 10px, pills 20px.
- **Borders:** 0.5px–1px hairline using `border`. No heavy borders.
- **No** gradients, drop shadows, glows, or noise textures. Flat surfaces,
  generous whitespace.
- Max content width ~1100px, centered; hero text column ~520–560px.

---

## 4. Layout — single page (section order)

Build in this order. One section at a time; get UI approval before moving on.

1. **Nav (sticky):** logo (node mark + "Koodby") left; links (Shaqada,
   Adeegyada, Nagu saabsan) + one black button "Nagala hadal" right.
2. **Hero (centered):** small teal-tint pill ("AI · Apps · Digital solutions"),
   large emotional Space Grotesk headline, short Inter subtext, two buttons —
   black primary ("Bilow mashruucaaga") + outline secondary ("Baadh shaqada").
3. **Trust strip:** caption "Waxaan hore u dhisnay" + real project names
   (Near, DaawoCheck, Ziko, MovieFlix). No fake company logos.
4. **Services:** 4 cards — AI Models & Integration, Mobile & Web Apps,
   Digital Solutions / Automation, Consulting. Each: small icon + title +
   1–2 line description.
5. **Work / Portfolio (key section):** 3 case-study cards — Near, DaawoCheck,
   Ziko. Each: preview image, name, problem, approach, result. Mark
   prototypes honestly as "Prototype" / "In development".
6. **Why Koodby:** 3 points — AI-first workflow (speed + quality), Somali
   market + global standards, built for real (not just claims). Minimal, airy.
7. **CTA band:** full-width, near-black OR teal — headline
   ("Fikrad ma haysaa? Aan wada dhisno.") + one button.
8. **Contact:** short form (name, email, project type) + direct WhatsApp and
   `hello@koodby.com` links. Keep it short.
9. **Footer:** logo, one-line mission, links (GitHub, LinkedIn, email), copyright.

---

## 5. Voice & content

- **Tone:** warm, human, direct — like talking to a capable friend, not a
  corporation. The visitor should feel *seen* before being sold to.
- **Structure of persuasion:** problem/feeling → understanding → solution
  (Koodby) → proof → contact. Lead with the visitor's situation, not features.
- **Language:** Somali-first for emotional copy (headlines, CTAs, connective
  lines), English fine for technical labels. Mix naturally.
- **Avoid** generic lines like "We provide innovative digital solutions" or a
  bare "we build AI apps". Avoid corporate filler (leverage, seamless, unlock).
- **CTA wording:** use specific verbs — "Nagala hadal", "Bilow", "Baadh",
  "Ku biir" — never generic "Get Started" / "Sign Up".
- **Honesty:** never invent metrics, clients, or testimonials. If a project is
  a prototype, say so.

---

## 6. Component conventions

- **Buttons:** primary = ink bg / white text; secondary = white bg / ink text /
  hairline border. Radius 10px, padding ~12px 24px. One primary per view.
- **Cards:** white surface, 0.5px border, 12–16px radius, padding ~24px.
  Subtle hover lift only (no shadow — a slight border-color change / translate).
- **Sections:** vertical rhythm ~96px between major sections on desktop,
  ~56px on mobile.
- **Container:** centered, max-width ~1100px, horizontal padding 24px.

---

## 7. Working rules (for the coding agent)

- **Audit before build:** inspect existing files/components before adding or
  editing. Do not duplicate. Report what exists before proposing changes.
- **Slice by slice:** implement one section at a time. After each section,
  stop and let Tarzan review the UI before continuing.
- **No scope creep:** do not build V2/community features. Do not add libraries
  or animations beyond what a section needs.
- **Stay on system:** every color, font, spacing value must come from §3.
  If a design need seems to require a new token, ask first.
- **Accessibility:** semantic HTML, alt text, sufficient contrast, focus states,
  keyboard-navigable nav and form.
- **Content is real:** pull project details (Near, DaawoCheck, Ziko) from
  Tarzan; use clear placeholders labeled `[TODO: ...]` where content is missing,
  never fabricated facts.

---

## 8. Contact / leads

- **V1:** the contact form validates and submits to a `mailto:hello@koodby.com`
  fallback + a prominent WhatsApp link. No backend required to ship V1.
- **Later slice (not now):** wire the form to Supabase (`leads` table, RLS) or
  Notion via MCP. Leave a clearly marked `submitLead()` function as the single
  integration point so this can be swapped in without touching the UI.

---

## 9. Assets

- **Logo:** node "K" mark + "Koodby" wordmark (Space Grotesk, medium).
  Provide as inline SVG component; mark alone = app icon / favicon.
- **Email:** hello@koodby.com (public), tarzan@koodby.com (direct).
- **Domain:** koodby.com

---

_Last locked: keep this file updated only when Tarzan approves a change to the
design system, layout, or scope._
