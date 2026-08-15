import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHeader } from "@/components/PageHeader";
import { PullQuote } from "@/components/PullQuote";
import { Container, Eyebrow, Section } from "@/components/Section";
import { covenant } from "@/content/covenant";

export const metadata: Metadata = {
  title: "Covenant",
  description: covenant.intro[0],
};

export default function CovenantPage() {
  return (
    <>
      <PageHeader
        eyebrow={covenant.eyebrow}
        title={covenant.title}
        intro={covenant.intro.map((p, i) => (
          <p key={i} className={i > 0 ? "mt-4" : undefined}>
            {p}
          </p>
        ))}
      />

      {/* Trust-building pull-quote surfaced near the top. */}
      <Section spacious={false} className="pb-2 pt-2">
        <Container prose>
          <PullQuote>{covenant.pullQuote}</PullQuote>
        </Container>
      </Section>

      <Section spacious={false} className="pb-section pt-8">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {covenant.principles.map((principle) => (
              <li key={principle.title}>
                <Card className="h-full">
                  <h2 className="font-display text-lg font-semibold text-ink">{principle.title}</h2>
                  <p className="mt-3 leading-relaxed text-ink-muted">{principle.body}</p>
                </Card>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-12 max-w-prose rounded-2xl border border-border bg-surface/50 p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-ink">
              {covenant.enforcement.title}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-muted">{covenant.enforcement.body}</p>
          </div>
        </Container>
      </Section>

      {/* Governance folded into /covenant per the sitemap. */}
      <Section spacious={false} className="pb-section pt-2">
        <Container prose>
          <div className="border-t border-border pt-12">
            <Eyebrow>{covenant.governance.eyebrow}</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {covenant.governance.title}
            </h2>
            <div className="prose-doctrine mt-5">
              {covenant.governance.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-6 text-sm italic text-ink-subtle">{covenant.governance.note}</p>
            <p className="mt-4 text-sm text-ink-subtle">
              Governance {covenant.governance.version}
            </p>
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
