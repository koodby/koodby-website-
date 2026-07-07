import { site } from "./site";

export type Lead = {
  name: string;
  email: string;
  projectType: string;
  detail?: string;
};

export type SubmitResult = { ok: true } | { ok: false; error: string };

/**
 * Single integration point for lead capture (CLAUDE.md §8).
 *
 * V1: opens a pre-filled mailto to hello@koodby.com — no backend required.
 * Later: swap the body of this function to POST to Supabase (`leads` table)
 * or Notion via MCP. The UI never needs to change — it only awaits this.
 */
export async function submitLead(lead: Lead): Promise<SubmitResult> {
  try {
    const subject = `New project — ${lead.name}`;
    const bodyLines = [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Project type: ${lead.projectType}`,
      lead.detail ? `\nDetails:\n${lead.detail}` : "",
    ].filter(Boolean);

    const href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    if (typeof window !== "undefined") {
      window.location.href = href;
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
