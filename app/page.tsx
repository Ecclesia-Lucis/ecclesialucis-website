import Link from "next/link";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CtaBanner } from "@/components/CtaBanner";
import { Container, Eyebrow, Section } from "@/components/Section";
import { primaryCta, site } from "@/content/site";

/** "Each an explorer on their own journey" — split out from the hero into its own section. */
const explorerStatement =
  "A faith where each is an explorer on their own journey.";

const doctrineTeasers = [
  {
    href: "/purpose",
    label: "Purpose",
    blurb: "We are beings formed from light. If we are of light, our responsibility is to increase it.",
  },
  {
    href: "/tenets",
    label: "Tenets",
    blurb: "Eleven provisional principles — truth, empathy, ecology, restraint — offered as guidance, not commandments.",
  },
  {
    href: "/practices",
    label: "Practices",
    blurb: "Eight optional practices for tending to light in yourself, in others, and in the world. Tools, not tests.",
  },
  {
    href: "/covenant",
    label: "Covenant",
    blurb: "The safeguards: no authority over others, no required belief, no monetized legitimacy, no coercion.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — centered name → meaning → statement sequence, identity + "what
          this is not" stay above the fold beneath it (REQ-HOME-001). */}
      <Section
        as="header"
        className="relative flex min-h-[88vh] items-center overflow-hidden py-24 sm:min-h-[84vh]"
        spacious={false}
      >
        <div
          aria-hidden
          className="glow-field-hero motion-safe:animate-drift pointer-events-none absolute inset-0"
        />
        <Container className="motion-safe:animate-fade-up relative mx-auto flex flex-col items-center text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-ink-subtle sm:text-[1rem]">
            {site.name}
          </p>
          <p className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            {site.tagline}
          </p>
          <h1 className="mt-6 text-balance font-display text-5xl font-semibold italic leading-[1.05] tracking-tight text-accent sm:text-7xl">
            A faith of equals
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">
            {site.identity}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-subtle">
            <span className="font-semibold text-ink">What this is not: </span>
            {site.whatThisIsNot}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Button href="/purpose" size="lg">
              Read the doctrine
            </Button>
            <Button href={primaryCta.href} variant="secondary" size="lg">
              {primaryCta.label}
            </Button>
          </div>
        </Container>
      </Section>

      {/* Explorer statement — "each an explorer on their own journey," distinct
          from the hero's focal statement, leading into the doctrine teasers. */}
      <Section spacious={false} className="pb-0 pt-16 sm:pt-20">
        <Container>
          <p className="max-w-3xl text-balance font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {explorerStatement}
          </p>
        </Container>
      </Section>

      {/* Doctrine teaser — doctrine is reachable before any conversion ask. */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Start here</Eyebrow>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Understand it fully before you decide anything
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              The doctrine is open and free to read — no sign-up, no gate. Take it at your own pace.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {doctrineTeasers.map((item) => (
              <Link key={item.href} href={item.href} className="group">
                <Card interactive className="h-full">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-semibold text-ink">{item.label}</h3>
                    <span
                      aria-hidden
                      className="text-ink-subtle transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
                    >
                      →
                    </span>
                  </div>
                  <p className="mt-3 leading-relaxed text-ink-muted">{item.blurb}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
