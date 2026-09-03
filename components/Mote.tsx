"use client";

import { cn } from "@/lib/cn";
import { useInView } from "@/lib/useInView";

/**
 * A handful of preset size/rotation/baseline-offset combinations, cycled by
 * index so placement is deterministic (no `Math.random()` — that would
 * differ between server and client render and trigger a hydration
 * mismatch). Tuning this set further is visual polish, not a spec
 * requirement (design.md's Non-Goals).
 */
const VARIANTS = [
  "text-lg -rotate-1 self-start",
  "text-2xl rotate-1 self-center",
  "text-base rotate-0 self-end",
  "text-xl -rotate-2 self-start",
  "text-sm rotate-2 self-center",
  "text-2xl -rotate-1 self-end",
  "text-base rotate-1 self-start",
  "text-lg rotate-0 self-end",
] as const;

type MoteProps = {
  children: string;
  index: number;
  reducedMotion: boolean;
};

function Mote({ children, index, reducedMotion }: MoteProps) {
  const [ref, inView] = useInView<HTMLSpanElement>({ skip: reducedMotion });
  const variant = VARIANTS[index % VARIANTS.length];

  return (
    <span
      ref={ref}
      style={{ transitionDelay: reducedMotion ? "0ms" : `${(index % VARIANTS.length) * 90}ms` }}
      className={cn(
        "font-display leading-none transition-[opacity,transform] duration-700 ease-out",
        variant,
        inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      {children}
    </span>
  );
}

type MoteFieldProps = {
  items: string[];
  reducedMotion: boolean;
  className?: string;
};

/**
 * Scattered doctrine fragments (design-system spec: "Content presented as
 * scattered motes") — independently sized and positioned, each fading in as
 * it individually enters the viewport, not all at once. Laid out as wrapped
 * inline text rather than absolute-positioned, so it stays in normal
 * reading/document flow (reflow-safe, correctly ordered for keyboard and
 * screen-reader use) while still reading as scattered via varied size,
 * baseline offset, and rotation.
 */
export function MoteField({ items, reducedMotion, className }: MoteFieldProps) {
  return (
    <div className={cn("flex flex-wrap items-baseline justify-center gap-x-6 gap-y-5", className)}>
      {items.map((item, index) => (
        <Mote key={item} index={index} reducedMotion={reducedMotion}>
          {item}
        </Mote>
      ))}
    </div>
  );
}
