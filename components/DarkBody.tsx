"use client";

import { useEffect } from "react";

/**
 * Scopes a full dark theme to the current route: paints <body> dark and removes
 * the global light gridline background while mounted, then restores on unmount.
 * Use on standalone dark pages (e.g. /links) that live under the light root layout.
 */
export function DarkBody() {
  useEffect(() => {
    const b = document.body;
    const prev = {
      background: b.style.background,
      backgroundImage: b.style.backgroundImage,
      color: b.style.color,
    };
    b.style.background = "#0A0A0A";
    b.style.backgroundImage = "none";
    b.style.color = "#FFFFFF";
    return () => {
      b.style.background = prev.background;
      b.style.backgroundImage = prev.backgroundImage;
      b.style.color = prev.color;
    };
  }, []);

  return null;
}
