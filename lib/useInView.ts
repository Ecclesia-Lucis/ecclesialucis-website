"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reports whether an element has scrolled into view, once, via
 * IntersectionObserver — the shared mechanism behind a chamber's
 * heading/body fade-in and each mote's individual fade-in (design-system
 * spec: "Content presented as scattered motes", "Iris threshold-reveal
 * mechanism"'s chamber companion). Stops observing after the first
 * intersection: these are one-shot reveals, not visibility toggles.
 *
 * Pass `skip: true` (reduced-motion callers) to report `true` immediately
 * without ever observing, per each spec's reduced-motion scenario.
 */
export function useInView<T extends HTMLElement>(options?: {
  skip?: boolean;
  rootMargin?: string;
}): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(Boolean(options?.skip));

  useEffect(() => {
    if (options?.skip) {
      setInView(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: options?.rootMargin ?? "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [options?.skip, options?.rootMargin]);

  return [ref, inView];
}
