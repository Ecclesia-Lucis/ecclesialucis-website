import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container, Eyebrow, Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Section className="spectrum-bleed flex min-h-[70vh] items-center" spacious={false}>
      <Container className="py-24 text-center">
        <Eyebrow>404</Eyebrow>
        <h1 className="mx-auto max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
          This path doesn’t lead anywhere yet
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-ink-muted">
          The page you were looking for isn’t here. Let’s find your way back to the light.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Return home
          </Button>
          <Button href="/purpose" variant="secondary" size="lg">
            Read the doctrine
          </Button>
        </div>
      </Container>
    </Section>
  );
}
