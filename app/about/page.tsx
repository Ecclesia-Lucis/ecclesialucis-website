import type { Metadata } from "next";
import { CtaBanner } from "@/components/CtaBanner";
import { PageHeader } from "@/components/PageHeader";
import { Container, Section } from "@/components/Section";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description: about.intro,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow={about.eyebrow} title={about.title} intro={about.intro} />

      <Section spacious={false} className="pb-section pt-10">
        <Container prose>
          <dl className="divide-y divide-border">
            {about.faqs.map((faq) => (
              <div key={faq.question} className="py-8 first:pt-0">
                <dt className="font-display text-2xl font-semibold text-ink">{faq.question}</dt>
                <dd className="prose-doctrine mt-4">
                  {faq.answer.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
