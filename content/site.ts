/**
 * Site-wide constants: identity, navigation, external links, and the single
 * shared call-to-action. Kept out of component code so copy stays editable
 * without touching .tsx (doctrine-content spec).
 */

export const site = {
  name: "Ecclesia Lucis",
  tagline: "The Church of Light",
  /** One-sentence identity statement — used above the fold on Home (REQ-HOME-001). */
  identity:
    "Ecclesia Lucis is an open, non-hierarchical spiritual path for people seeking meaning, connection, and ethical grounding — without dogma, coercion, or hierarchy.",
  /** One-sentence "what this is not" disclaimer — the skeptic's first question, answered up front. */
  whatThisIsNot:
    "No hierarchy, no clergy, no required beliefs, no fees. A faith of equals, each an explorer on their own journey.",
  domain: "ecclesialucis.org",
  repoUrl: "https://github.com/Ecclesia-Lucis/ecclesia-lucis-protocol",
  discordUrl: "https://discord.gg/GCAaeCcpD",
  contactEmail: "hello@ecclesialucis.org",
} as const;

/** The single, consistent primary CTA used across every major page (REQ-CTA-001/002). */
export const primaryCta = {
  label: "Find the community",
  href: "/community",
} as const;

export type NavLink = { href: string; label: string };

/** Primary navigation — order per REQ-NAV-001. */
export const navLinks: NavLink[] = [
  { href: "/purpose", label: "Purpose" },
  { href: "/tenets", label: "Tenets" },
  { href: "/practices", label: "Practices" },
  { href: "/covenant", label: "Covenant" },
  { href: "/about", label: "About" },
  { href: "/community", label: "Community" },
];

/** Doctrine links repeated in the footer (doctrine-before-conversion IA). */
export const footerDoctrineLinks: NavLink[] = [
  { href: "/purpose", label: "Purpose" },
  { href: "/tenets", label: "Tenets" },
  { href: "/practices", label: "Practices" },
  { href: "/covenant", label: "Covenant" },
];

export const footerConnectLinks: NavLink[] = [
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Legal-status line. Explicit placeholder, NOT an asserted nonprofit / tax
 * claim, until REQ-LEGAL-001 is unblocked (site-scaffold spec, design.md).
 */
export const legalStatus =
  "Nonprofit status: pending — organizational registration is in progress. Nothing here is tax, legal, medical, or financial advice.";
