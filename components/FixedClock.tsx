"use client";

import { useState, useEffect } from "react";

export function FixedClock() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Mogadishu",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      // Format as "HH:mm:ss"
      const formatter = new Intl.DateTimeFormat("en-GB", options);
      setTime(`Mogadishu ${formatter.format(now)} EAT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-8 z-50 pointer-events-none">
      <span className="font-sans text-[15px] font-medium text-gray-500 tracking-wide">
        {time}
      </span>
    </div>
  );
}
