import Link from "next/link";
import { CtaBanner } from "@/components/CtaBanner";
import { ExpandingText } from "@/components/ExpandingText";
import { GraphicTextChapter } from "@/components/GraphicTextChapter";
import { HeroParticlesGate } from "@/components/HeroParticlesGate";
import { KineticWordmark } from "@/components/KineticWordmark";
import { PullQuote } from "@/components/PullQuote";
import { Container, Section } from "@/components/Section";
import { WayfindingThread } from "@/components/WayfindingThread";
import { covenant } from "@/content/covenant";
import { site } from "@/content/site";

/** "Each an explorer on their own journey" — the first motion after the hero's stillness. */
const explorerStatement =
  "A faith where each is an explorer on their own journey.";

const doctrineTeasers = {
  purpose: {
    href: "/purpose",
    label: "Purpose",
    blurb: "We are beings formed from light. If we are of light, our responsibility is to increase it.",
  },
  tenets: {
    href: "/tenets",
    label: "Tenets",
    blurb: "Eleven provisional principles — truth, empathy, ecology, restraint — offered as guidance, not commandments.",
  },
  practices: {
    href: "/practices",
    label: "Practices",
    statement: "Eight optional practices for tending to light in yourself, in others, and in the world.",
    detail: "Tools, not tests.",
  },
} as const;

/** Small "continue reading" link — internal doctrine navigation, distinct from the shared primary-CTA Button (doctrine-before-conversion IA). */
function ChapterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group mt-5 inline-flex items-center gap-1.5 font-semibold text-accent transition-colors hover:text-ink"
    >
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="relative">
      <WayfindingThread />

      {/* Hero — near-silent (docs/design/v0-3-radical-light-vision.md §1 point
          8): only the name renders in the first screen. No identity
          statement, no disclaimer, no CTA here — see "the turn" below. */}
      <Section
        as="header"
        className="relative flex min-h-[92vh] items-center justify-center overflow-hidden py-24 sm:min-h-[88vh]"
        spacious={false}
      >
        <div
          aria-hidden
          className="spectrum-bleed-hero motion-safe:animate-spectrum-drift pointer-events-none absolute inset-0"
        />
        <HeroParticlesGate />
        <Container className="relative flex flex-col items-center text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-ink-muted sm:text-base">
            {site.tagline}
          </p>
          <KineticWordmark
            as="h1"
            className="mt-4 text-balance font-display text-6xl leading-[1.05] text-ink sm:text-8xl"
          >
            {site.name}
          </KineticWordmark>
        </Container>
      </Section>

      {/* The turn — the explorer statement arrives alone, as an
          expanding-text-box reveal; scrolling it into view discloses the
          identity statement and "what this is not" disclaimer, relocated
          here from the hero per the founder's Section 2 sign-off
          (marketing-pages spec: "Homepage identity statement above the
          fold"). Reachable with a single scroll, no click. */}
      <Section spacious={false} className="pt-chapter">
        <Container>
          <ExpandingText
            className="mx-auto max-w-3xl text-center"
            statement={
              <p className="text-balance font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {explorerStatement}
              </p>
            }
            detail={
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-lg leading-relaxed text-ink-muted sm:text-xl">{site.identity}</p>
                <p className="mt-4 text-base leading-relaxed text-ink-subtle">
                  <span className="font-semibold text-ink">What this is not: </span>
                  {site.whatThisIsNot}
                </p>
              </div>
            }
          />
        </Container>
      </Section>

      {/* Purpose — left-aligned text + graphic. */}
      <Section spacious={false} className="pt-chapter">
        <Container>
          <GraphicTextChapter align="left" eyebrow="Doctrine" title={doctrineTeasers.purpose.label}>
            <p>{doctrineTeasers.purpose.blurb}</p>
            <ChapterLink href={doctrineTeasers.purpose.href}>Read Purpose</ChapterLink>
          </GraphicTextChapter>
        </Container>
      </Section>

      {/* Tenets — mirrored: right-aligned text + graphic, deliberately asymmetric from Purpose. */}
      <Section spacious={false} className="pt-chapter">
        <Container>
          <GraphicTextChapter align="right" eyebrow="Doctrine" title={doctrineTeasers.tenets.label}>
            <p>{doctrineTeasers.tenets.blurb}</p>
            <ChapterLink href={doctrineTeasers.tenets.href}>Read the Tenets</ChapterLink>
          </GraphicTextChapter>
        </Container>
      </Section>

      {/* Practices — expanding-text-box reveal: the collapsed statement grows to reveal the rest on scroll-into-view. */}
      <Section spacious={false} className="pt-chapter">
        <Container className="mx-auto max-w-2xl text-center">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {doctrineTeasers.practices.label}
          </p>
          <ExpandingText
            className="mt-3"
            statement={
              <h3 className="text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {doctrineTeasers.practices.statement}
              </h3>
            }
            detail={
              <>
                <p>{doctrineTeasers.practices.detail}</p>
                <ChapterLink href={doctrineTeasers.practices.href}>Read the Practices</ChapterLink>
              </>
            }
          />
        </Container>
      </Section>

      {/* Covenant — pull-quote treatment, distinct again from the three chapters above. */}
      <Section spacious={false} className="pt-chapter">
        <Container>
          <PullQuote size="chapter">{covenant.pullQuote}</PullQuote>
          <p className="mt-6 text-center">
            <ChapterLink href="/covenant">Read the Covenant</ChapterLink>
          </p>
        </Container>
      </Section>

      {/* CTA — still arrives only after every doctrine chapter above (doctrine-before-conversion IA, CLAUDE.md content rule #3), unchanged in position and copy. */}
      <div className="pt-chapter">
        <CtaBanner />
      </div>
    </div>
  );
}
