"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { FadeIn } from "./anim/FadeIn";
import { WordReveal } from "./anim/WordReveal";
import type { DotsConfig, MarkerConfig } from "./Globe";

// Dynamically import Globe to ensure WebGL canvas mounts client-side
const GlobeComponent = dynamic(() => import("./Globe"), { ssr: false });

export function GlobalRemote() {
  // Stable identities — Globe's effect deps include these objects, so inline
  // literals would tear down and refetch the land geojson on every render.
  const markerConfig: MarkerConfig = useMemo(
    () => ({
      markers: [
        { lat: 2.0469, lng: 45.3182, label: "Mogadishu, Somalia" },
        {
          lat: -1.2921,
          lng: 36.8219,
          label: "Nairobi, Kenya",
          url: "https://gabax.agency/",
        },
        { lat: 41.0082, lng: 28.9784, label: "Istanbul, Turkey" },
        { lat: -6.2088, lng: 106.8456, label: "Jakarta, Indonesia" },
      ],
      color: "#00f7ff",
      size: 50,
    }),
    []
  );

  const dots: DotsConfig = useMemo(
    () => ({ color: "#ffffff", size: 4.5, density: 8, allDots: false }),
    []
  );

  return (
    <section
      id="remote"
      className="scroll-mt-24 border-t border-black/10 bg-transparent py-24 sm:py-32 overflow-hidden"
    >
      <div className="container-koodby">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: 3D globe floating without background card */}
          <div className="lg:col-span-6 relative w-full h-[400px] sm:h-[500px] lg:h-[540px] flex items-center justify-center">
            <div className="w-full h-full cursor-grab active:cursor-grabbing">
              <GlobeComponent
                speed={2}
                smoothing={7}
                scale={8.5}
                initialLatitude={10}
                initialLongitude={45}
                oceanColor="#000000"
                outlineColor="#FFFFFF"
                outlineWidth={1.2}
                showOutline
                graticuleColor="#D4D4D4"
                showGrid
                dots={{
                  color: "#ffffff",
                  size: 4.5,
                  density: 8,
                  allDots: false,
                }}
                markerConfig={{
                  ...markerConfig,
                  color: "#00f7ff",
                }}
              />
            </div>
          </div>

          {/* Right: copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">

            <WordReveal
              lines={[
                { text: "We work remotely.", className: "text-ink" },
                {
                  text: "Building from anywhere.",
                  className: "italic text-muted",
                },
              ]}
              className="mt-4 font-display text-[36px] leading-[1.08] tracking-tight sm:text-[50px]"
            />

            <FadeIn delay={0.15}>
              <p className="mt-5 text-[16px] leading-relaxed text-muted sm:text-[17px]">
                Koodby is a globally distributed remote team. We work from wherever 
                you are, connecting you with top-tier engineers, AI specialists, 
                and the best designers through a modern system.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
