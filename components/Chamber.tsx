"use client";

import type { ReactNode } from "react";
import { Container } from "@/components/Section";
import { MoteField } from "@/components/Mote";
import { cn } from "@/lib/cn";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";

type ChamberProps = {
  tone: "paper" | "void";
  eyebrow: string;
  heading: ReactNode;
  body: ReactNode;
  motes: string[];
  className?: string;
};

/**
 * A doctrine pillar's chamber: heading and body fade in via
 * IntersectionObserver as the visitor scrolls into it, followed by its
 * scattered motes (design-system spec: "Content presented as scattered
 * motes"). The scoped `data-tone` attribute flips the shared
 * bg-base/text-ink/... utilities between paper and void for this subtree
 * only (lib/tokens.ts, tailwind.config.ts) — no separate "void" class name
 * needed anywhere else.
 */
export function Chamber({ tone, eyebrow, heading, body, motes, className }: ChamberProps) {
  const reducedMotion = useReducedMotion();
  const [contentRef, contentInView] = useInView<HTMLDivElement>({ skip: reducedMotion });

  return (
    <div data-tone={tone} className={cn("bg-base py-24 text-ink sm:py-32", className)}>
      <Container>
        <div
          ref={contentRef}
          className={cn(
            "mx-auto max-w-2xl text-center transition-[opacity,transform] duration-700 ease-out",
            contentInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          {/* 19px/bold, not text-sm/font-semibold: the accent-on-void contrast
              (~4.1:1) only clears WCAG 2.2 AA under the large-text 3:1
              threshold (>=18.66px bold), not the 4.5:1 normal-text one
              (tasks.md 6.5 spot-check; lib/tokens.ts keeps one accent hue
              across both tones, so size/weight is the lever here). */}
          <p className="font-body text-[19px] font-bold uppercase tracking-[0.3em] text-accent">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-balance font-display text-3xl sm:text-4xl">{heading}</h2>
          <div className="mt-6 text-lg leading-relaxed text-ink-muted">{body}</div>
        </div>

        <MoteField items={motes} reducedMotion={reducedMotion} className="mt-16 sm:mt-24" />
      </Container>
    </div>
  );
}
