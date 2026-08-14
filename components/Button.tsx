import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold tracking-tight transition duration-200 ease-out focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-contrast shadow-[0_0_30px_-8px_var(--color-accent)] hover:brightness-110 active:brightness-95",
  secondary:
    "border border-border bg-surface text-ink hover:border-accent hover:text-accent",
  ghost: "text-ink-muted hover:text-accent",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

/**
 * The single shared CTA / link-button. Every primary call-to-action on the site
 * routes through this so all CTAs are visually identical (design-system spec:
 * "consistency itself is part of the trust signal"). Renders a Next.js <Link>
 * for internal routes and a plain <a> (new tab) for external URLs.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:");

  if (isExternal) {
    const isHttp = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
