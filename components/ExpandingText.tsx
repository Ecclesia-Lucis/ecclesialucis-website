import type { ReactNode } from "react";

type ExpandingTextProps = {
  /** The always-visible collapsed statement. */
  statement: ReactNode;
  /** Additional detail revealed as the element scrolls into view. */
  detail: ReactNode;
  className?: string;
};

/**
 * A collapsed statement that expands to reveal additional detail as it
 * scrolls into view (design-system spec: "Expanding-text-box reveal";
 * marketing-pages spec's Practices chapter treatment). Built on the
 * `.expand-box` CSS-grid auto-height trick in app/globals.css, driven by
 * `animation-timeline: view()` — no JS height measurement, no scroll
 * listeners. Browsers without scroll-driven-animation support, and visitors
 * with `prefers-reduced-motion: reduce`, get the fully-expanded static box.
 */
export function ExpandingText({ statement, detail, className }: ExpandingTextProps) {
  return (
    <div className={className}>
      <div className="text-balance">{statement}</div>
      <div className="expand-box">
        <div className="mt-4 leading-relaxed text-ink-muted">{detail}</div>
      </div>
    </div>
  );
}
