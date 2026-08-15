import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHeader } from "@/components/PageHeader";
import { Container, Section } from "@/components/Section";
import { practices } from "@/content/practices";

export const metadata: Metadata = {
  title: "Practices",
  description: practices.intro[1],
};

export default function PracticesPage() {
  return (
    <>
      <PageHeader
        eyebrow={practices.eyebrow}
        title={practices.title}
        intro={practices.intro.map((p, i) => (
          <p key={i} className={i > 0 ? "mt-4" : undefined}>
            {p}
          </p>
        ))}
      />

      {/* "Tools, not tests" framing surfaced before the list. */}
      <Section spacious={false} className="pb-2 pt-2">
        <Container>
          <ul className="flex flex-wrap gap-3">
            {practices.framing.map((line) => (
              <li
                key={line}
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-ink-muted"
              >
                {line}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section spacious={false} className="pb-section pt-10">
        <Container>
          <div className="grid gap-5">
            {practices.items.map((practice) => (
              <Card key={practice.number} className="sm:p-9">
                <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:gap-8">
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className="font-display text-3xl font-semibold tabular-nums text-accent-soft"
                    >
                      {String(practice.number).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h2 className="flex flex-wrap items-center gap-3 font-display text-2xl font-semibold text-ink">
                      {practice.name}
                      {practice.optional ? (
                        <span className="rounded-full border border-border px-2.5 py-0.5 font-body text-xs font-medium uppercase tracking-wide text-ink-subtle">
                          Optional
                        </span>
                      ) : null}
                    </h2>
                    <p className="mt-3 text-lg leading-relaxed text-ink-muted">{practice.summary}</p>
                    {practice.items ? (
                      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                        {practice.items.map((item) => (
                          <li key={item} className="flex gap-2.5 text-ink-muted">
                            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-soft" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {practice.note ? (
                      <p className="mt-4 text-sm italic text-ink-subtle">{practice.note}</p>
                    ) : null}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mx-auto mt-14 max-w-prose border-t border-border pt-8">
            {practices.closing.map((p, i) => (
              <p
                key={i}
                className={`font-display text-xl leading-relaxed text-ink ${i > 0 ? "mt-4" : ""}`}
              >
                {p}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
