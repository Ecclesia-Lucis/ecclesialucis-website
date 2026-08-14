import type { Metadata } from "next";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHeader } from "@/components/PageHeader";
import { PullQuote } from "@/components/PullQuote";
import { Container, Section } from "@/components/Section";
import { purpose } from "@/content/purpose";

export const metadata: Metadata = {
  title: "Purpose",
  description: purpose.intro,
};

export default function PurposePage() {
  return (
    <>
      <PageHeader eyebrow={purpose.eyebrow} title={purpose.title} intro={purpose.intro} />

      <Section spacious={false} className="pb-section pt-10">
        <Container prose>
          <PullQuote>{purpose.pullQuote}</PullQuote>

          {purpose.passages.map((passage) => (
            <div key={passage.heading} className="mt-12 first:mt-0">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {passage.heading}
              </h2>
              <div className="prose-doctrine mt-4">
                {passage.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}

          <p className="mt-14 border-t border-border pt-8 font-display text-xl leading-relaxed text-ink">
            {purpose.closing}
          </p>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
