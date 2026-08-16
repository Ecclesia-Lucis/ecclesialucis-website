import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type GraphicTextChapterProps = {
  align: "left" | "right";
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * A text block paired with an abstract light-motif graphic, mirrorable via
 * `align` (marketing-pages spec: Purpose = left-aligned+graphic, Tenets =
 * right-aligned+graphic — deliberately asymmetric so the two chapters don't
 * read as the same template). The graphic is a CSS gradient, not photography
 * or illustration (still out of scope per docs/CONTENT_STRATEGY.md).
 */
export function GraphicTextChapter({
  align,
  eyebrow,
  title,
  children,
  className,
}: GraphicTextChapterProps) {
  const textFirst = align === "left";

  return (
    <div className={cn("chapter-reveal grid items-center gap-10 lg:grid-cols-2 lg:gap-16", className)}>
      <div className={cn(textFirst ? "lg:order-1" : "lg:order-2")}>
        <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
        <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h3>
        <div className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">{children}</div>
      </div>

      <div
        aria-hidden
        className={cn(
          "h-56 rounded-3xl sm:h-72 lg:h-80",
          textFirst ? "lg:order-2" : "lg:order-1",
          "bg-[radial-gradient(65%_65%_at_30%_30%,color-mix(in_oklab,var(--color-spectrum-accent5)_28%,transparent)_0%,transparent_70%),radial-gradient(60%_60%_at_75%_70%,color-mix(in_oklab,var(--color-spectrum-accent2)_24%,transparent)_0%,transparent_70%),radial-gradient(55%_55%_at_50%_50%,color-mix(in_oklab,var(--color-spectrum-accent4)_18%,transparent)_0%,transparent_70%)] border border-border",
        )}
      />
    </div>
  );
}
