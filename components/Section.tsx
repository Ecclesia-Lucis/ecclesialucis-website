import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** Narrow measure for long-form reading text. */
  prose?: boolean;
};

/** Constrains content width and applies the responsive page gutter. */
export function Container({ children, className, prose }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-gutter",
        prose ? "max-w-prose" : "max-w-content",
        className,
      )}
    >
      {children}
    </div>
  );
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
  /** Adds the standard vertical rhythm between page sections. */
  spacious?: boolean;
};

/** A page section with consistent vertical spacing. */
export function Section({
  children,
  className,
  as: Tag = "section",
  id,
  spacious = true,
}: SectionProps) {
  return (
    <Tag id={id} className={cn(spacious && "py-section", className)}>
      {children}
    </Tag>
  );
}

type EyebrowProps = { children: ReactNode; className?: string };

/** Small uppercase label above a section heading. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "mb-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-accent",
        className,
      )}
    >
      {children}
    </p>
  );
}
