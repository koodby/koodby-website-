type LogoProps = {
  /** Height of the mark in px. Wordmark scales with it. */
  size?: number;
  showWordmark?: boolean;
  className?: string;
  /** "boxed" = white mark inside an iris app-icon square (reference style). */
  variant?: "boxed" | "plain";
};

/** App-icon: white K-node inside a rounded square. */
export function LogoBadge({ size = 36 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-[8px] bg-ink text-white shadow-soft"
      style={{ width: size, height: size }}
    >
      <LogoMark size={Math.round(size * 0.62)} />
    </span>
  );
}

/**
 * Koodby mark: two node dots on the left joined by a spine, with two strokes
 * branching to the right — a "K" built as a node graph (Koodby + connection
 * between builders). Uses currentColor so it inverts cleanly on dark surfaces.
 */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* spine connecting the two left nodes */}
      <path
        d="M9 7.2V20.8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* K arms branching from the spine's centre node */}
      <path
        d="M9 14L20.5 7.2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M9 14L20.5 20.8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* the two anchor nodes */}
      <circle cx="9" cy="7.2" r="2.5" fill="currentColor" />
      <circle cx="9" cy="20.8" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function Logo({
  size = 28,
  showWordmark = true,
  className,
  variant = "boxed",
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-ink ${className ?? ""}`}>
      <LogoMark size={size} />
      {showWordmark && (
        <span
          className="font-sans font-black uppercase text-[20px] tracking-tighter text-ink"
          style={{ letterSpacing: "-0.02em" }}
        >
          Koodby
        </span>
      )}
    </span>
  );
}
