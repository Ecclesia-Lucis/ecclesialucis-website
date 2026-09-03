"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import { useReducedMotion } from "@/lib/useReducedMotion";
import heroImage from "@/assets/Resized/inverted blackhole-large.jpg";

const STAGE_ORDER = ["image", "wordmark", "tagline", "affordance"] as const;
type Stage = (typeof STAGE_ORDER)[number];
const STAGE_DELAY_MS: Record<Stage, number> = { image: 0, wordmark: 500, tagline: 1100, affordance: 1700 };

/**
 * The homepage hero: image visible first, then the wordmark fades in, then
 * the tagline, then a scroll affordance — a one-shot sequence that never
 * re-triggers on scroll (design-system spec: "Threshold hero load-in
 * sequence"). Under reduced motion every stage renders in its final state
 * immediately, with no staged delay at all — not just an instant animation.
 */
export function Hero() {
  const reducedMotion = useReducedMotion();
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setStageIndex(STAGE_ORDER.length - 1);
      return;
    }
    const timers = STAGE_ORDER.map((stage, i) =>
      window.setTimeout(() => setStageIndex(i), STAGE_DELAY_MS[stage]),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [reducedMotion]);

  const reached = (stage: Stage) => stageIndex >= STAGE_ORDER.indexOf(stage);

  return (
    <div
      data-tone="void"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-base text-ink"
    >
      <Image src={heroImage} alt="" priority fill sizes="100vw" className="object-cover" />
      <div aria-hidden className="absolute inset-0 bg-base/35" />

      <div className="relative flex flex-col items-center px-gutter text-center">
        <h1
          className={cn(
            "font-display text-6xl tracking-wide text-ink transition-opacity duration-1000 ease-out sm:text-8xl",
            reached("wordmark") ? "opacity-100" : "opacity-0",
          )}
        >
          {site.name}
        </h1>
        <p
          className={cn(
            "mt-4 text-sm font-semibold uppercase tracking-[0.4em] text-ink-muted transition-opacity duration-1000 ease-out sm:text-base",
            reached("tagline") ? "opacity-100" : "opacity-0",
          )}
        >
          {site.tagline}
        </p>
      </div>

      <div
        aria-hidden
        className={cn(
          "absolute bottom-10 flex flex-col items-center gap-2 text-ink-subtle transition-opacity duration-1000 ease-out motion-safe:animate-drift",
          reached("affordance") ? "opacity-100" : "opacity-0",
        )}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-px bg-current" />
      </div>
    </div>
  );
}
