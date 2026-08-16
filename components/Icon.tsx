import type { SVGAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Foundation for the design system's shared iconography/visual-motif set
 * (design-system spec: "Iconography and visual motifs"). Icons are authored
 * as inline SVG paths here — no external icon-library dependency — so pages
 * draw from one shared, token-aware set instead of one-off per-page assets.
 * The hero's `.spectrum-bleed-hero` light-source treatment (app/globals.css) is
 * the first visual motif built on this direction; further icons/motifs are
 * added here as future pages need them (see docs/ROADMAP.md Phase 2 polish).
 */

export type IconName = keyof typeof paths;

const paths = {
  spark: "M12 2L13.8 9.2 21 12 13.8 14.8 12 22 10.2 14.8 3 12 10.2 9.2 12 2Z",
} as const;

type IconProps = {
  name: IconName;
  className?: string;
} & Omit<SVGAttributes<SVGSVGElement>, "className">;

/** Renders a shared icon by name, inheriting `currentColor` like any text glyph. */
export function Icon({ name, className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={cn("h-5 w-5", className)}
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  );
}
