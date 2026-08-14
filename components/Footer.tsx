import Link from "next/link";
import {
  footerConnectLinks,
  footerDoctrineLinks,
  legalStatus,
  site,
} from "@/content/site";

/** Persistent footer, present on every page (REQ-CTA-003, site-scaffold spec). */
export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-content px-gutter py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 font-display text-lg font-semibold text-ink">
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent" />
              {site.name}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-subtle">{site.tagline}</p>
          </div>

          <FooterColumn title="Doctrine">
            {footerDoctrineLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Connect">
            {footerConnectLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Open source">
            <li>
              <a
                href={site.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink-muted transition-colors hover:text-accent"
              >
                Protocol on GitHub ↗
              </a>
            </li>
            <li>
              <a
                href={site.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink-muted transition-colors hover:text-accent"
              >
                Community on Discord ↗
              </a>
            </li>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-sm text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl">{legalStatus}</p>
          <p className="shrink-0">
            © {site.name}. The protocol is open-source and forkable.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-body text-sm font-semibold uppercase tracking-[0.16em] text-ink">
        {title}
      </h2>
      <ul className="mt-4 flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-ink-muted transition-colors hover:text-accent">
        {children}
      </Link>
    </li>
  );
}
