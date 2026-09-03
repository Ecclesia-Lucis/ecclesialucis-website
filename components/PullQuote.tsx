import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PullQuoteProps = {
  children: ReactNode;
  className?: string;
};

/** A pull-quote — breaks up long-form reading on a doctrine page (doctrine-content spec). */
export function PullQuote({ children, className }: PullQuoteProps) {
  return (
    <blockquote className={cn("relative my-10 border-l-2 border-accent pl-6 sm:pl-8", className)}>
      <p className="font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
        {children}
      </p>
    </blockquote>
  );
}
