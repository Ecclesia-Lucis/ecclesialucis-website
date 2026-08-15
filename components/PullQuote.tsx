import type { ReactNode } from "react";

/** A doctrine pull-quote — breaks up long-form reading (doctrine-content spec). */
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="relative my-10 border-l-2 border-accent pl-6 sm:pl-8">
      <p className="font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
        {children}
      </p>
    </blockquote>
  );
}
