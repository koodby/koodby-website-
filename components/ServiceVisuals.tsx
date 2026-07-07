/**
 * Flat, diagrammatic visuals for the Services cards. Built from design tokens
 * only — they demonstrate each craft without claiming real client data.
 */

/** Web design — browser window with an editorial hero skeleton. */
export function WebMock() {
  return (
    <div className="w-[78%] max-w-[430px] overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
      {/* chrome */}
      <div className="flex items-center gap-2 border-b border-ink/5 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
        </span>
        <span className="mx-auto rounded-full bg-off-white px-4 py-0.5 text-[10px] text-muted">
          koodby.com
        </span>
      </div>
      {/* page */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="h-2 w-10 rounded-full bg-ink/70" />
          <span className="flex gap-2" aria-hidden>
            <span className="h-2 w-6 rounded-full bg-ink/10" />
            <span className="h-2 w-6 rounded-full bg-ink/10" />
            <span className="h-2 w-8 rounded-full bg-ink/70" />
          </span>
        </div>
        <div className="mt-6 space-y-2">
          <span className="block h-4 w-4/5 rounded-full bg-ink/80" />
          <span className="block h-4 w-3/5 rounded-full bg-ink/80" />
        </div>
        <span className="mt-3 block h-2 w-2/5 rounded-full bg-ink/15" />
        <div className="mt-5 flex gap-2">
          <span className="h-7 w-20 rounded-full bg-ink" />
          <span className="h-7 w-20 rounded-full border border-ink/20" />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2" aria-hidden>
          <span className="h-14 rounded-lg bg-off-white" />
          <span className="h-14 rounded-lg bg-off-white" />
          <span className="h-14 rounded-lg bg-off-white" />
        </div>
      </div>
    </div>
  );
}

/** App design — phone frame with a simple, friendly UI skeleton. */
export function AppMock() {
  return (
    <div className="w-[46%] max-w-[210px] overflow-hidden rounded-[28px] border border-[#FAF8F0]/10 bg-[#FAF8F0] p-2 shadow-sm">
      <div className="overflow-hidden rounded-[20px] bg-[#2E3F29]">
        {/* status */}
        <div className="flex items-center justify-between px-4 pt-3 text-[9px] text-[#A3BCA0]">
          <span>9:41</span>
          <span className="flex gap-1" aria-hidden>
            <span className="h-1.5 w-1.5 rounded-full bg-[#FAF8F0]/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#FAF8F0]/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#FAF8F0]/30" />
          </span>
        </div>
        <div className="p-3.5">
          <span className="block h-3 w-24 rounded-full bg-[#FAF8F0]/80" />
          <span className="mt-1.5 block h-2 w-16 rounded-full bg-[#FAF8F0]/20" />
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2.5 rounded-xl bg-[#253422] p-2.5">
              <span className="h-8 w-8 shrink-0 rounded-lg bg-[#E2F1AF]" />
              <span className="flex flex-col gap-1.5">
                <span className="h-1.5 w-20 rounded-full bg-[#FAF8F0]/30" />
                <span className="h-1.5 w-12 rounded-full bg-[#FAF8F0]/15" />
              </span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl bg-[#253422] p-2.5">
              <span className="h-8 w-8 shrink-0 rounded-lg bg-[#FAF8F0]/15" />
              <span className="flex flex-col gap-1.5">
                <span className="h-1.5 w-16 rounded-full bg-[#FAF8F0]/30" />
                <span className="h-1.5 w-10 rounded-full bg-[#FAF8F0]/15" />
              </span>
            </div>
          </div>
          <span className="mt-4 block h-8 w-full rounded-full bg-[#E2F1AF]" />
        </div>
        {/* tab bar */}
        <div className="flex items-center justify-around border-t border-[#FAF8F0]/5 bg-[#FAF8F0] px-4 py-2.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-[#253422]" />
          <span className="h-2 w-2 rounded-full bg-[#253422]/30" />
          <span className="h-2 w-2 rounded-full bg-[#253422]/30" />
          <span className="h-2 w-2 rounded-full bg-[#253422]/30" />
        </div>
      </div>
    </div>
  );
}

/** Branding — brand board: mark, palette chips, type specimen. */
export function BrandMock() {
  return (
    <div className="grid w-[78%] max-w-[430px] grid-cols-2 gap-2.5">
      <div className="flex aspect-square items-center justify-center rounded-2xl border border-[#253422]/10 bg-[#253422] shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/koodby-logo.png" alt="" className="h-12 w-12 object-contain invert" />
      </div>
      <div className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-[#253422]/10 bg-[#FAF8F0] shadow-sm">
        <span className="font-display text-[44px] leading-none text-[#253422]">Aa</span>
        <span className="mt-1.5 text-[10px] tracking-wide text-[#5E6B58]">Display · Serif</span>
      </div>
      <div className="col-span-2 flex overflow-hidden rounded-2xl border border-[#253422]/10 shadow-sm" aria-hidden>
        <span className="h-12 flex-1 bg-[#253422]" />
        <span className="h-12 flex-1 bg-[#FAF8F0]" />
        <span className="h-12 flex-1 bg-[#E2F1AF]" />
        <span className="h-12 flex-1 bg-[#5E6B58]" />
        <span className="h-12 flex-1 bg-[#F36A32]" />
      </div>
    </div>
  );
}

/** Development — editor window with abstract code lines. */
export function DevMock() {
  const lines: Array<Array<[string, number]>> = [
    [["bg-[#F36A32]/70", 10], ["bg-[#4E3524]/25", 16], ["bg-[#4E3524]/10", 8]],
    [["bg-[#4E3524]/10", 6], ["bg-[#253422]/60", 20], ["bg-[#4E3524]/25", 10]],
    [["bg-[#4E3524]/10", 6], ["bg-[#4E3524]/25", 12], ["bg-[#F36A32]/60", 14]],
    [["bg-[#F36A32]/70", 8], ["bg-[#4E3524]/10", 18]],
    [["bg-[#4E3524]/10", 6], ["bg-[#253422]/60", 16], ["bg-[#4E3524]/25", 6]],
    [["bg-[#4E3524]/25", 10], ["bg-[#4E3524]/10", 12]],
  ];
  return (
    <div className="w-[78%] max-w-[430px] overflow-hidden rounded-2xl border border-[#4E3524]/10 bg-[#4E3524] shadow-sm">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
        </span>
        <span className="ml-2 rounded-md bg-white/10 px-2.5 py-0.5 text-[10px] text-white/60">
          app.tsx
        </span>
      </div>
      <div className="space-y-2.5 p-5" aria-hidden>
        {lines.map((line, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-4 text-right text-[9px] leading-none text-white/25">{i + 1}</span>
            {line.map(([cls, wRem], j) => (
              <span
                key={j}
                className={`h-2 rounded-full ${cls.replace("bg-[#4E3524]/25", "bg-white/40").replace("bg-[#4E3524]/10", "bg-white/15")}`}
                style={{ width: `${wRem * 4}px`, marginLeft: j === 0 && i % 3 !== 0 ? 16 : 0 }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
