"use client";

/**
 * Wayfinding-thread scroll motif (design-system spec: "Wayfinding-thread scroll
 * motif"). Fine interweaving lines in the spectrum accent hues, threading down
 * the page behind content as a "trail deeper into the doctrine" cue — distinct
 * from the spectrum-bleed background glow.
 *
 * Purely decorative: `aria-hidden`, `pointer-events: none`, and sat behind
 * content (`-z-10`). The stroke is a vertical spectrum gradient that adapts to
 * the active theme via the `--color-spectrum-accent*` CSS variables.
 *
 * Reveal is done entirely in CSS (see `.wayfinding-thread__path` in
 * app/globals.css) using a scroll-driven animation (`animation-timeline:
 * scroll()`) that "draws" the paths via `stroke-dashoffset` as the visitor
 * scrolls — no scroll-jacking JS. Where scroll-timeline is unsupported the
 * paths render fully drawn (static fallback), and `prefers-reduced-motion:
 * reduce` short-circuits the animation to that same static state.
 *
 * `preserveAspectRatio="none"` stretches the tall viewBox to fill the page
 * height; `vector-effect="non-scaling-stroke"` keeps the line hairline-thin
 * regardless of that non-uniform scaling.
 */
export function WayfindingThread() {
  return (
    <div
      aria-hidden
      className="wayfinding-thread pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="wayfinding-spectrum" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-spectrum-accent1)" />
            <stop offset="20%" stopColor="var(--color-spectrum-accent2)" />
            <stop offset="40%" stopColor="var(--color-spectrum-accent3)" />
            <stop offset="60%" stopColor="var(--color-spectrum-accent4)" />
            <stop offset="80%" stopColor="var(--color-spectrum-accent5)" />
            <stop offset="100%" stopColor="var(--color-spectrum-accent6)" />
          </linearGradient>
        </defs>
        <path
          className="wayfinding-thread__path"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          stroke="url(#wayfinding-spectrum)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeOpacity={0.55}
          d="M 22 0 C 62 120, 42 240, 80 360 S 28 600, 64 760 S 44 900, 56 1000"
        />
        <path
          className="wayfinding-thread__path wayfinding-thread__path--2"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          stroke="url(#wayfinding-spectrum)"
          strokeWidth={1}
          strokeLinecap="round"
          strokeOpacity={0.35}
          d="M 80 0 C 40 140, 62 260, 22 400 S 72 640, 38 800 S 60 940, 46 1000"
        />
      </svg>
    </div>
  );
}
