import type { ReactNode } from "react";
import { Container, Eyebrow, Section } from "@/components/Section";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
};

/** Consistent hero for interior (non-home) pages, over the soft light glow. */
export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <Section as="header" className="glow-field pb-4 pt-16 sm:pt-24" spacious={false}>
      <Container className="motion-safe:animate-fade-up">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        {intro ? (
          <div className="mt-6 max-w-prose text-lg leading-relaxed text-ink-muted">{intro}</div>
        ) : null}
      </Container>
    </Section>
  );
}
