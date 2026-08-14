import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Subtle lift + accent border on hover for interactive-feeling cards. */
  interactive?: boolean;
};

/** A raised surface panel built on the design tokens. */
export function Card({ children, className, interactive }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 sm:p-8",
        interactive &&
          "transition duration-300 ease-out hover:-translate-y-0.5 hover:border-accent-soft",
        className,
      )}
    >
      {children}
    </div>
  );
}
