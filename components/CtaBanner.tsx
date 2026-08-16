import { Button } from "@/components/Button";
import { Container, Section } from "@/components/Section";
import { primaryCta, site } from "@/content/site";

/**
 * The single, consistent primary call-to-action, reused verbatim across every
 * major page (REQ-CTA-001, task 5.8). Copy is invitational — no urgency,
 * scarcity, or guilt (REQ-CTA-002). Because doctrine pages render their content
 * above this banner, the doctrine is always readable before the conversion ask
 * (CLAUDE.md content rule #3).
 */
export function CtaBanner() {
  return (
    <Section>
      <Container>
        <div className="spectrum-bleed overflow-hidden rounded-3xl border border-border bg-surface px-6 py-14 text-center sm:px-12 sm:py-20">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            When you’re ready, there are others walking this path
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
            Read as much or as little as you like first. Whenever it feels right, you’re welcome to
            sit with the community and see what it’s about.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={primaryCta.href} size="lg">
              {primaryCta.label}
            </Button>
            <Button href={site.repoUrl} variant="secondary" size="lg">
              Read the open protocol ↗
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
