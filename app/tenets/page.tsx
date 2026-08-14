import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHeader } from "@/components/PageHeader";
import { Container, Section } from "@/components/Section";
import { tenets } from "@/content/tenets";

export const metadata: Metadata = {
  title: "Tenets",
  description: tenets.intro[0],
};

export default function TenetsPage() {
  return (
    <>
      <PageHeader
        eyebrow={tenets.eyebrow}
        title={tenets.title}
        intro={tenets.intro.map((p, i) => (
          <p key={i} className={i > 0 ? "mt-4" : undefined}>
            {p}
          </p>
        ))}
      />

      <Section spacious={false} className="pb-4 pt-2">
        <Container>
          {/* Provisional framing kept prominent — these are not commandments. */}
          <p className="inline-flex items-center gap-2 rounded-full border border-accent-soft/50 bg-surface px-5 py-2.5 text-sm font-medium text-accent">
            {tenets.provisionalNote}
          </p>
        </Container>
      </Section>

      <Section spacious={false} className="pb-section pt-8">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2">
            {tenets.items.map((tenet) => (
              <li key={tenet.version}>
                <Card className="h-full">
                  <div className="flex items-baseline gap-3">
                    <span className="font-body text-sm font-semibold tabular-nums text-accent">
                      {tenet.version}
                    </span>
                    <h2 className="font-display text-xl font-semibold text-ink">{tenet.name}</h2>
                  </div>
                  <p className="mt-3 leading-relaxed text-ink-muted">{tenet.body}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
