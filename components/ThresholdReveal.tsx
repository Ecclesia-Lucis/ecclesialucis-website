"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { paperTheme, voidOverrides } from "@/lib/tokens";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Tone = "paper" | "void";

type ThresholdRevealProps = {
  /** Short section label only — the chamber that follows discloses the real heading/body (design-system spec). */
  label: string;
  /** The tone the page is arriving from, and the tone this threshold flips into. */
  from: Tone;
  to: Tone;
  className?: string;
};

const TONE_BG: Record<Tone, string> = { paper: paperTheme.base, void: voidOverrides.base! };
const TONE_INK: Record<Tone, string> = { paper: paperTheme.ink, void: voidOverrides.ink! };

/**
 * A pinned/sticky section whose circular mask grows with scroll progress,
 * flipping the visible background and text color from `from` to `to`
 * (design-system spec: "Iris threshold-reveal mechanism"). Recalculated via
 * `requestAnimationFrame` on scroll — deliberately a plain CSS
 * `mask-image: radial-gradient()`, NOT an SVG `<mask>` + filter, which the
 * Threshold prototype found unreliable (design.md's Decisions). The mask
 * gradient's opaque stop is `white`, not `#000`: WebKit's legacy default
 * masking mode reads gradient luminance, under which black would mean
 * "hidden" rather than "visible" — `white`/`transparent` is the one stop
 * pair that reads correctly whether a browser treats the mask as alpha- or
 * luminance-based.
 */
export function ThresholdReveal({ label, from, to, className }: ThresholdRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const maskLayerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const wrapper = wrapperRef.current;
    const maskLayer = maskLayerRef.current;
    if (!wrapper || !maskLayer) return;

    let raf = 0;
    let pending = false;

    function paint() {
      pending = false;
      const rect = wrapper!.getBoundingClientRect();
      const vh = window.innerHeight;
      // `wrapper` is 200vh tall with a `sticky` inner panel: the first `vh`
      // of scroll pins the panel while the mask grows; progress reaches 1
      // once the wrapper has scrolled a full viewport height past its top.
      const progress = Math.min(Math.max(-rect.top / vh, 0), 1);
      const maxRadius = Math.hypot(window.innerWidth, vh) / 2 + 40;
      const radius = progress * maxRadius;
      const inner = Math.max(radius - 120, 0);
      const gradient = `radial-gradient(circle ${radius}px at 50% 50%, white ${inner}px, transparent ${radius}px)`;
      maskLayer!.style.setProperty("mask-image", gradient);
      maskLayer!.style.setProperty("-webkit-mask-image", gradient);
    }

    function onScrollOrResize() {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(paint);
    }

    paint();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    // Fully-flipped end state immediately, no pinned scroll-jack section
    // (design-system spec's reduced-motion scenario).
    return (
      <div
        className={cn("flex items-center justify-center py-20", className)}
        style={{ backgroundColor: TONE_BG[to], color: TONE_INK[to] }}
      >
        <span className="font-display text-2xl uppercase tracking-[0.3em] sm:text-3xl">{label}</span>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={cn("relative", className)} style={{ height: "200vh" }}>
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor: TONE_BG[from], color: TONE_INK[from] }}
      >
        <div
          ref={maskLayerRef}
          className="absolute inset-0 flex items-center justify-center will-change-[mask-image]"
          style={{ backgroundColor: TONE_BG[to], color: TONE_INK[to] }}
        >
          <span className="font-display text-2xl uppercase tracking-[0.3em] sm:text-3xl">{label}</span>
        </div>
      </div>
    </div>
  );
}
