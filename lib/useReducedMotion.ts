"use client";

import { useEffect, useState } from "react";

/**
 * Tracks `prefers-reduced-motion: reduce` client-side (design-system spec:
 * "Motion respects reduced-motion preference"). SSR defaults to `false`,
 * then corrects on mount, like other client-only device/preference checks
 * in this codebase — the global CSS animation/transition-duration override
 * in tailwind.config.ts covers pure-CSS motion regardless, so this hook is
 * only needed where a component must skip JS-driven staging (timers,
 * scroll listeners, IntersectionObserver gating) entirely rather than just
 * animate it fast.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
