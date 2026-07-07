import { Check, ShieldCheck } from "lucide-react";
import { LogoMark } from "./Logo";

/**
 * Flat, on-brand preview panels. Deliberately diagrammatic — these represent
 * each product's core moment using only design tokens. They are not stock
 * screenshots and do not claim real data.
 */

function PreviewShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center rounded-card bg-off-white p-6 sm:p-8">
      {children}
    </div>
  );
}

/** Near — AI health companion: a gentle Somali-language check-in. */
export function NearPreview() {
  return (
    <PreviewShell>
      <div className="w-full max-w-[300px] rounded-[18px] border bg-surface p-4">
        <div className="flex items-center gap-2 border-b pb-3">
          <span className="text-ink">
            <LogoMark size={16} />
          </span>
          <span className="font-display text-[13px] font-medium text-ink">Near</span>
          <span className="ml-auto h-2 w-2 rounded-full bg-gray-400" aria-hidden="true" />
        </div>

        <div className="mt-4 space-y-3">
          <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-off-white px-3.5 py-2 text-[13px] leading-snug text-ink">
            Salaan! Sidee baad dareemaysaa maanta?
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Wanaagsan", "Caadi", "Xanuun yar"].map((c) => (
              <span
                key={c}
                className="rounded-pill border px-2.5 py-1 text-[11px] text-muted"
              >
                {c}
              </span>
            ))}
          </div>
          <div className="ml-auto max-w-[70%] rounded-2xl rounded-tr-md bg-ink px-3.5 py-2 text-right text-[13px] text-off-white">
            Madax xanuun yar
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-btn bg-gray-100 px-3 py-2 text-[12px] font-medium text-gray-700">
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400" aria-hidden="true" />
          Talooyin caafimaad oo af Soomaali ah
        </div>
      </div>
    </PreviewShell>
  );
}

/** DaawoCheck — medicine verification result. */
export function DaawoCheckPreview() {
  return (
    <PreviewShell>
      <div className="w-full max-w-[300px] rounded-[18px] border bg-surface p-4">
        {/* scan frame */}
        <div className="relative flex h-28 items-center justify-center rounded-btn bg-off-white">
          <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 rounded-tl-md border-l border-t border-ink/50" />
          <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 rounded-tr-md border-r border-t border-ink/50" />
          <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 rounded-bl-md border-b border-l border-ink/50" />
          <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 rounded-br-md border-b border-r border-ink/50" />
          <span className="text-muted">
            <ShieldCheck size={30} strokeWidth={1.25} aria-hidden="true" />
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="font-display text-[14px] font-medium text-ink">Paracetamol</p>
            <p className="text-[12px] text-muted">500&nbsp;mg · qeybta #A24</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-pill bg-gray-100 px-2.5 py-1 text-[12px] font-medium text-gray-700">
            <Check size={13} strokeWidth={2.5} aria-hidden="true" />
            Sax
          </span>
        </div>

        <div className="mt-3 border-t pt-3 text-[12px] text-muted">
          La xaqiijiyey · isha daawada waa la aqoonsaday
        </div>
      </div>
    </PreviewShell>
  );
}

/** Ziko — juice / cocktail order. */
export function ZikoPreview() {
  return (
    <PreviewShell>
      <div className="w-full max-w-[300px] rounded-[18px] border bg-surface p-4">
        <div className="flex gap-4">
          {/* flat drink glyph */}
          <svg width="52" height="72" viewBox="0 0 52 72" fill="none" aria-hidden="true">
            <path
              d="M12 14h28l-3.5 46a4 4 0 0 1-4 3.6H19.5a4 4 0 0 1-4-3.6L12 14Z"
              fill="#EEEDE8"
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M12 14h28" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
            <path
              d="M33 8v10"
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="24" cy="34" r="1.6" fill="#6B7280" />
            <circle cx="30" cy="42" r="1.6" fill="#6B7280" />
          </svg>

          <div className="flex-1">
            <p className="font-display text-[15px] font-medium text-ink">Mango · Passion</p>
            <p className="mt-0.5 text-[12px] text-muted">Cabbir dhexe · barafa yar</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-display text-[16px] font-semibold text-ink">$3.50</span>
              <span className="rounded-btn bg-ink px-3.5 py-1.5 text-[12px] font-medium text-off-white">
                Dalbo
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t pt-3 text-[12px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400" aria-hidden="true" />
          Keenid 20–30 daqiiqo
        </div>
      </div>
    </PreviewShell>
  );
}
