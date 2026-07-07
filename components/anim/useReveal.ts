"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reliable scroll-reveal trigger. Uses a scroll/resize listener with
 * getBoundingClientRect instead of IntersectionObserver — IO proved flaky
 * (content occasionally stuck hidden). The initial check reveals anything
 * already in view on mount; the listener reveals the rest as it scrolls in.
 * Fires once, then removes its listeners.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;

    const check = () => {
      if (done) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Reveal once any part enters the lower 92% of the viewport.
      if (rect.top < vh * 0.92 && rect.bottom > 0) {
        done = true;
        setShown(true);
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return { ref, shown };
}
