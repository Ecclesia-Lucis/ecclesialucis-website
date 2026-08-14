import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { Container, Section } from "@/components/Section";
import { community } from "@/content/connect";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Community",
  description: community.intro[0],
};

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        eyebrow={community.eyebrow}
        title={community.title}
        intro={community.intro.map((p, i) => (
          <p key={i} className={i > 0 ? "mt-4" : undefined}>
            {p}
          </p>
        ))}
      />

      <Section spacious={false} className="pb-section pt-10">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold text-ink">
                {community.expectations.title}
              </h2>
              <ul className="mt-5 grid gap-3">
                {community.expectations.items.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-ink-muted">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glow-field rounded-2xl border border-border bg-surface p-8 text-center sm:p-10">
              <h2 className="font-display text-2xl font-semibold text-ink">Join us on Discord</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">{community.reassurance}</p>
              <div className="mt-8">
                <Button href={site.discordUrl} size="lg">
                  Open the Discord invite ↗
                </Button>
              </div>
              <p className="mt-4 break-words text-sm text-ink-subtle">{site.discordUrl}</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
