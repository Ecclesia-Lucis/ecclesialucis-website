import { cn } from "@/lib/cn";

type WayfindingThreadProps = {
  className?: string;
};

/**
 * A thin rainbow line that threads the full length of the homepage, guiding
 * the eye toward each chapter as the visitor scrolls (design-system spec:
 * "Wayfinding-thread scroll motif"). Purely decorative: aria-hidden,
 * pointer-events: none, and positioned to run between — never over —
 * content. Reveal is driven by document scroll progress via CSS
 * `animation-timeline: scroll()` (see `.wayfinding-thread` in
 * app/globals.css); browsers without that support, and visitors with
 * `prefers-reduced-motion: reduce`, get the fully-drawn static line.
 *
 * Meant to be rendered once, absolutely positioned inside a `relative`
 * wrapper that spans the homepage's full chapter sequence (hero through the
 * closing CTA banner) so it stitches every chapter into one continuous path.
 */
export function WayfindingThread({ className }: WayfindingThreadProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={cn("wayfinding-thread pointer-events-none absolute inset-0 -z-10 h-full w-full", className)}
      viewBox="0 0 100 1000"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="wayfinding-thread-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-spectrum-accent1)" />
          <stop offset="20%" stopColor="var(--color-spectrum-accent2)" />
          <stop offset="40%" stopColor="var(--color-spectrum-accent3)" />
          <stop offset="60%" stopColor="var(--color-spectrum-accent4)" />
          <stop offset="80%" stopColor="var(--color-spectrum-accent5)" />
          <stop offset="100%" stopColor="var(--color-spectrum-accent6)" />
        </linearGradient>
      </defs>
      <path
        d="M50 0
           C 15 55, 85 100, 50 165
           C 15 230, 85 275, 50 340
           C 15 405, 85 450, 50 515
           C 15 580, 85 625, 50 690
           C 15 755, 85 800, 50 865
           C 30 910, 70 940, 50 1000"
        fill="none"
        stroke="url(#wayfinding-thread-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
      />
    </svg>
  );
}
