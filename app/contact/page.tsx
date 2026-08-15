import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { Container, Section } from "@/components/Section";
import { contact } from "@/content/connect";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.intro[0],
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow={contact.eyebrow}
        title={contact.title}
        intro={contact.intro.map((p, i) => (
          <p key={i} className={i > 0 ? "mt-4" : undefined}>
            {p}
          </p>
        ))}
      />

      <Section spacious={false} className="pb-section pt-10">
        <Container prose>
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
            <h2 className="font-display text-xl font-semibold text-ink">Email us</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">
              Write to us directly — no account required. We read everything, and we reply as time
              allows.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={`mailto:${site.contactEmail}`} size="lg">
                {site.contactEmail}
              </Button>
              <Button href={site.discordUrl} variant="secondary" size="lg">
                Or chat on Discord ↗
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
