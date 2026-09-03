"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";
import { navLinks, primaryCta, site } from "@/content/site";

/** How close (px) the pointer must get to the top of the viewport to reveal navigation. */
const POINTER_REVEAL_ZONE = 96;
/** How close (px) to the bottom of the document counts as "end of scroll." */
const SCROLL_END_SLACK = 4;

/**
 * Context-triggered primary navigation (site-scaffold spec): hidden by
 * default, reveals when the visitor reaches the end of the page's scroll or
 * moves a fine pointer near the top of the viewport, and otherwise stays
 * hidden. Reachable on every page regardless of visibility: it's hidden via
 * opacity/transform, never `display`/`hidden`, so it stays in the tab order
 * and a keyboard user reaches it exactly where a persistent nav bar would
 * have been — early in the page — and reveals it on focus via the
 * `focus-within:` variant below, satisfying the accessible-equivalent
 * scenario without a separate synthetic control (Non-Goal: no new mobile
 * menu interaction beyond the reveal/hide behavior).
 *
 * The show/hide transition's duration is plain Tailwind `transition-*`
 * classes — no JS reduced-motion branch needed here, since the global
 * animation/transition-duration override in tailwind.config.ts already
 * collapses it to instant under `prefers-reduced-motion: reduce`.
 */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [atScrollEnd, setAtScrollEnd] = useState(false);
  const [pointerNearTop, setPointerNearTop] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function updateScrollEnd() {
      const atEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - SCROLL_END_SLACK;
      setAtScrollEnd(atEnd);
    }

    updateScrollEnd();
    window.addEventListener("scroll", updateScrollEnd, { passive: true });
    window.addEventListener("resize", updateScrollEnd);
    return () => {
      window.removeEventListener("scroll", updateScrollEnd);
      window.removeEventListener("resize", updateScrollEnd);
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    function onPointerMove(event: PointerEvent) {
      setPointerNearTop(event.clientY <= POINTER_REVEAL_ZONE);
    }

    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  const revealed = atScrollEnd || pointerNearTop || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-base/90 backdrop-blur-md transition-[opacity,transform] duration-300 ease-out",
        "focus-within:pointer-events-auto focus-within:translate-y-0 focus-within:opacity-100",
        revealed ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-content items-center justify-between gap-4 px-gutter py-4"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-lg tracking-tight text-ink"
        >
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_2px_var(--color-accent)]" />
          {site.name}
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active ? "text-accent" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Button href={primaryCta.href} size="md">
            {primaryCta.label}
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-ink lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden>{open ? "Close" : "Menu"}</span>
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border/60 bg-base lg:hidden"
      >
        <ul className="mx-auto flex max-w-content flex-col gap-1 px-gutter py-4">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                    active ? "bg-surface text-accent" : "text-ink-muted hover:bg-surface hover:text-ink",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="mt-2">
            <Button href={primaryCta.href} size="lg" className="w-full">
              {primaryCta.label}
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
