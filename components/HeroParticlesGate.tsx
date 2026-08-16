"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroParticles = dynamic(() => import("./HeroParticles").then((mod) => mod.HeroParticles), {
  ssr: false,
});

type NetworkInformation = { saveData?: boolean };

/**
 * Device-tiered gate for the optional hero particle layer (design-system
 * spec: "Optional device-tiered hero particle layer"). The canvas component
 * — and its JS chunk — loads only once eligibility is confirmed client-side:
 * a fine pointer, a large-enough viewport, no `prefers-reduced-motion:
 * reduce`, and no Save-Data signal (defaults to *not* loading when that
 * signal is unavailable, per the design decision). On every other device
 * this component renders nothing and never fetches the particle chunk — the
 * hero is required to look complete and finished without it either way.
 */
export function HeroParticlesGate() {
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isLargeViewport = window.matchMedia("(min-width: 1024px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const saveData = connection?.saveData ?? true;

    setEligible(hasFinePointer && isLargeViewport && !prefersReducedMotion && !saveData);
  }, []);

  if (!eligible) return null;

  return <HeroParticles />;
}
