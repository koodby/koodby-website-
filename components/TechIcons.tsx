import {
  siReact,
  siFlutter,
  siTypescript,
  siPython,
  siPytorch,
  siFigma,
} from "simple-icons";

type Ico = { title: string; path: string; hex: string };

/** One floating brand card — decorative; represents Koodby's real stack. */
function IconCard({
  icon,
  className,
  size = 26,
}: {
  icon: Ico;
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={`absolute z-0 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border bg-surface shadow-float lg:flex ${className ?? ""}`}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox="0 0 24 24" role="img">
        <title>{icon.title}</title>
        <path d={icon.path} fill={`#${icon.hex}`} />
      </svg>
    </div>
  );
}

/**
 * Floating tech marks scattered around the hero (reference layout), showing the
 * tools Koodby actually builds with — apps (React, Flutter, TypeScript), AI
 * (Python, PyTorch), and design (Figma). Hidden below lg to avoid clutter.
 */
export function FloatingTech() {
  return (
    // fixed-height band over the upper hero so all six flank the content
    // (never drifting down behind the demo preview)
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden h-[600px] lg:block">
      {/* left cluster */}
      <IconCard icon={siReact} className="left-[calc(50%-361px)] top-[35%]" />
      <IconCard icon={siPython} className="left-[calc(50%-528px)] top-[70%]" />
      <IconCard icon={siFlutter} className="left-[calc(50%-692px)] top-[30%]" />
      {/* right cluster */}
      <IconCard icon={siPytorch} className="left-[calc(50%+361px)] top-[35%]" />
      <IconCard icon={siTypescript} className="left-[calc(50%+528px)] top-[70%]" />
      <IconCard icon={siFigma} className="left-[calc(50%+692px)] top-[30%]" />
    </div>
  );
}
