"use client";

import { useEffect, useState } from "react";

export const ROPE_LANDED_EVENT = "koodby:rope-landed";

declare global {
  interface Window {
    __koodbyRopeLanded?: boolean;
    /** Set by RopeTag on mount — the pill is being delivered, so wait for it. */
    __koodbyRopeActive?: boolean;
  }
}

/**
 * True once the rope has set the pill down in its slot. The hero renders the
 * real pill invisibly (so nothing shifts), then fades it in as the flying one
 * unmounts — the handoff is what makes the landing look like one object.
 */
export function useRopeLanded() {
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    if (window.__koodbyRopeLanded) {
      setLanded(true);
      return;
    }
    const done = () => setLanded(true);
    window.addEventListener(ROPE_LANDED_EVENT, done);
    // Stop-gap for pages where no rope is mounted at all. If one is on its way,
    // wait for it — the delivery is deliberately slow (see ENTRY_DELAY).
    const t = window.setTimeout(() => {
      if (!window.__koodbyRopeActive) done();
    }, 1500);
    // Last resort, in case a mounted rope never reports back.
    const backstop = window.setTimeout(done, 30000);
    return () => {
      window.removeEventListener(ROPE_LANDED_EVENT, done);
      window.clearTimeout(t);
      window.clearTimeout(backstop);
    };
  }, []);

  return landed;
}
