import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PullQuoteProps = {
  children: ReactNode;
  /**
   * "default": inline doctrine-page pull-quote (doctrine-content spec).
   * "chapter": large-scale homepage chapter treatment (marketing-pages
   * spec's Covenant chapter), with bigger type and its own scroll reveal.
   */
  size?: "default" | "chapter";
  className?: string;
};

/** A pull-quote — breaks up long-form reading, or (at `size="chapter"`) stands alone as a homepage chapter. */
export function PullQuote({ children, size = "default", className }: PullQuoteProps) {
  if (size === "chapter") {
    return (
      <blockquote
        className={cn(
          "chapter-reveal relative mx-auto max-w-3xl border-l-2 border-accent pl-6 text-center sm:border-l-0 sm:pl-0",
          className,
        )}
      >
        <p className="text-balance font-display text-3xl font-medium leading-snug text-ink sm:text-5xl">
          {children}
        </p>
      </blockquote>
    );
  }

  return (
    <blockquote className={cn("relative my-10 border-l-2 border-accent pl-6 sm:pl-8", className)}>
      <p className="font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
        {children}
      </p>
    </blockquote>
  );
}
