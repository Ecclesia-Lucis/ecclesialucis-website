import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type KineticWordmarkProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/**
 * The hero wordmark's one-shot kinetic-type load-in (design-system spec:
 * "One-shot kinetic-type hero load-in") — weight/tracking animate in once on
 * mount, then hold their final state; it never re-triggers on scroll. Under
 * `prefers-reduced-motion: reduce`, `motion-safe:` withholds the animation
 * class entirely, so the element just renders in its static final styling
 * with no animation.
 */
export function KineticWordmark({ children, as: Tag = "span", className }: KineticWordmarkProps) {
  return (
    <Tag className={cn("motion-safe:animate-kinetic-type font-semibold tracking-tight", className)}>
      {children}
    </Tag>
  );
}
