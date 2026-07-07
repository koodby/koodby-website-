/**
 * On-brand generated cover art for the Services cards — no stock photos.
 * Each is a full-bleed SVG (slice) themed to its service, in the Koodby palette.
 */

type Pt = { x: number; y: number };

/** AI Models & Integration — a small neural network. */
export function AICover() {
  const l1: Pt[] = [150, 270, 390].map((y) => ({ x: 92, y }));
  const l2: Pt[] = [110, 210, 310, 410].map((y) => ({ x: 200, y }));
  const l3: Pt[] = [150, 270, 390].map((y) => ({ x: 308, y }));
  const edges: [Pt, Pt][] = [];
  l1.forEach((a) => l2.forEach((b) => edges.push([a, b])));
  l2.forEach((a) => l3.forEach((b) => edges.push([a, b])));
  const nodes = [...l1, ...l2, ...l3];
  const accent = new Set([1, 5, 9]); // a few brighter nodes

  return (
    <svg viewBox="0 0 400 540" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="ai-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1E1B4B" />
          <stop offset="1" stopColor="#5B45E0" />
        </linearGradient>
        <radialGradient id="ai-glow" cx="0.72" cy="0.26" r="0.6">
          <stop offset="0" stopColor="#A78BFA" stopOpacity="0.55" />
          <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="540" fill="url(#ai-bg)" />
      <rect width="400" height="540" fill="url(#ai-glow)" />
      <g stroke="#C4B5FD" strokeOpacity="0.45" strokeWidth="1.25">
        {edges.map((e, i) => (
          <line key={i} x1={e[0].x} y1={e[0].y} x2={e[1].x} y2={e[1].y} />
        ))}
      </g>
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={accent.has(i) ? 9 : 6.5}
          fill={accent.has(i) ? "#FFFFFF" : "#EDE9FE"}
        />
      ))}
    </svg>
  );
}

/** Mobile & Web Apps — a browser window + phone. */
export function AppsCover() {
  return (
    <svg viewBox="0 0 400 540" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="apps-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0E3A6B" />
          <stop offset="1" stopColor="#2F7BE6" />
        </linearGradient>
      </defs>
      <rect width="400" height="540" fill="url(#apps-bg)" />
      {/* browser window */}
      <g>
        <rect x="46" y="70" width="250" height="180" rx="16" fill="#FFFFFF" fillOpacity="0.12" stroke="#FFFFFF" strokeOpacity="0.4" />
        <line x1="46" y1="102" x2="296" y2="102" stroke="#FFFFFF" strokeOpacity="0.3" />
        <circle cx="66" cy="86" r="3.5" fill="#FFFFFF" fillOpacity="0.7" />
        <circle cx="80" cy="86" r="3.5" fill="#FFFFFF" fillOpacity="0.55" />
        <circle cx="94" cy="86" r="3.5" fill="#FFFFFF" fillOpacity="0.4" />
        <rect x="66" y="124" width="120" height="10" rx="5" fill="#FFFFFF" fillOpacity="0.5" />
        <rect x="66" y="146" width="180" height="8" rx="4" fill="#FFFFFF" fillOpacity="0.28" />
        <rect x="66" y="166" width="150" height="8" rx="4" fill="#FFFFFF" fillOpacity="0.28" />
        <rect x="66" y="196" width="90" height="26" rx="8" fill="#FFFFFF" fillOpacity="0.55" />
      </g>
      {/* phone */}
      <g>
        <rect x="238" y="210" width="104" height="210" rx="22" fill="#0E3A6B" stroke="#FFFFFF" strokeOpacity="0.5" />
        <rect x="238" y="210" width="104" height="210" rx="22" fill="#FFFFFF" fillOpacity="0.1" />
        <rect x="272" y="222" width="36" height="6" rx="3" fill="#FFFFFF" fillOpacity="0.5" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={254 + c * 26}
              y={244 + r * 40}
              width="20"
              height="20"
              rx="6"
              fill="#FFFFFF"
              fillOpacity={0.85 - (r + c) * 0.08}
            />
          ))
        )}
      </g>
    </svg>
  );
}

/** Digital Solutions & Automation — a connected pipeline. */
export function DigitalCover() {
  return (
    <svg viewBox="0 0 400 540" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="digi-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9A3412" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <rect width="400" height="540" fill="url(#digi-bg)" />
      {/* flow path */}
      <path
        d="M70 140 H180 a24 24 0 0 1 24 24 V300 a24 24 0 0 0 24 24 H330"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeDasharray="2 9"
        strokeLinecap="round"
      />
      {/* nodes */}
      {[
        { x: 70, y: 140 },
        { x: 204, y: 220 },
        { x: 330, y: 324 },
      ].map((n, i) => (
        <g key={i}>
          <rect x={n.x - 26} y={n.y - 22} width="52" height="44" rx="12" fill="#FFFFFF" fillOpacity="0.16" stroke="#FFFFFF" strokeOpacity="0.5" />
          <rect x={n.x - 12} y={n.y - 8} width="24" height="4" rx="2" fill="#FFFFFF" fillOpacity="0.8" />
          <rect x={n.x - 12} y={n.y + 2} width="16" height="4" rx="2" fill="#FFFFFF" fillOpacity="0.5" />
        </g>
      ))}
      {/* gear */}
      <g transform="translate(120,400)" stroke="#FFFFFF" strokeOpacity="0.6" fill="none" strokeWidth="2">
        <circle r="22" />
        <circle r="8" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          return <line key={i} x1={Math.cos(a) * 22} y1={Math.sin(a) * 22} x2={Math.cos(a) * 30} y2={Math.sin(a) * 30} />;
        })}
      </g>
      {/* zap */}
      <path d="M292 392 l-20 34 h16 l-8 30 26 -40 h-16 z" fill="#FFFFFF" fillOpacity="0.85" />
    </svg>
  );
}

/** Consulting & Custom Systems — a blueprint with the K-node. */
export function ConsultingCover() {
  return (
    <svg viewBox="0 0 400 540" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="cons-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0B1220" />
          <stop offset="1" stopColor="#334155" />
        </linearGradient>
      </defs>
      <rect width="400" height="540" fill="url(#cons-bg)" />
      {/* blueprint grid */}
      <g stroke="#7DD3FC" strokeOpacity="0.14" strokeWidth="1">
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="540" />
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} />
        ))}
      </g>
      {/* protractor arc */}
      <g stroke="#7DD3FC" strokeOpacity="0.5" fill="none" strokeWidth="1.5">
        <path d="M96 330 a110 110 0 0 1 220 0" />
        <line x1="96" y1="330" x2="316" y2="330" />
        {Array.from({ length: 9 }).map((_, i) => {
          const a = Math.PI - (i * Math.PI) / 8;
          const cx = 206,
            cy = 330,
            r1 = 110,
            r2 = 100;
          return (
            <line
              key={i}
              x1={cx + Math.cos(a) * r1}
              y1={cy - Math.sin(a) * r1}
              x2={cx + Math.cos(a) * r2}
              y2={cy - Math.sin(a) * r2}
            />
          );
        })}
      </g>
      {/* K-node mark, blueprint style */}
      <g stroke="#E0F2FE" strokeOpacity="0.9" strokeWidth="6" strokeLinecap="round" fill="#E0F2FE">
        <path d="M170 150 V250" fillOpacity="0" />
        <path d="M170 200 L236 150" fillOpacity="0" />
        <path d="M170 200 L236 250" fillOpacity="0" />
        <circle cx="170" cy="150" r="9" />
        <circle cx="170" cy="250" r="9" />
      </g>
    </svg>
  );
}
