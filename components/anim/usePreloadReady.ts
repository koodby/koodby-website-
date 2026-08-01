"use client";

import { useEffect, useState } from "react";

export const PRELOAD_DONE_EVENT = "koodby:preload-done";

declare global {
  interface Window {
    __koodbyPreloadDone?: boolean;
  }
}

/**
 * True once the intro preloader curtain starts lifting — and immediately on
 * later client-side routes, where the preloader no longer exists.
 * Lets a section hold its entrance animation until the visitor can see it.
 */
export function usePreloadReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.__koodbyPreloadDone) {
      setReady(true);
      return;
    }
    const done = () => setReady(true);
    window.addEventListener(PRELOAD_DONE_EVENT, done);
    // Failsafe: never leave gated content hidden if the preloader is absent.
    const t = window.setTimeout(done, 4000);
    return () => {
      window.removeEventListener(PRELOAD_DONE_EVENT, done);
      window.clearTimeout(t);
    };
  }, []);

  return ready;
}
