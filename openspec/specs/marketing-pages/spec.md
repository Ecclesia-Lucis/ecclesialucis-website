# marketing-pages Specification

## Purpose

The 6 v1 pages themselves — the actual routes a visitor navigates, built on `site-scaffold`, `design-system`, and `doctrine-content` — implementing the sitemap and conversion requirements in `docs/PRD.md` and `docs/CONTENT_STRATEGY.md`.

## Requirements

### Requirement: Six core routes exist
The system SHALL provide the following routes, each rendering content per `docs/CONTENT_STRATEGY.md`'s sitemap: `/` (Home), a Purpose & Tenets route, `/practices`, `/covenant` (folding in governance/non-hierarchy content), `/about` (FAQ), and a Community & Contact route.

#### Scenario: All six routes resolve
- **WHEN** each of the six sitemap routes is requested
- **THEN** it returns a 200 response rendering the page's designated content, not a 404 or placeholder stub

### Requirement: Single consistent primary CTA
Every major page SHALL include exactly one clearly-styled primary call-to-action directing visitors to the community platform (Discord), using non-urgency, non-scarcity, non-guilt copy (REQ-CTA-001, REQ-CTA-002).

#### Scenario: CTA present and consistent
- **WHEN** a visitor views any of the six core pages
- **THEN** exactly one primary CTA to join the community is present, using the shared Button component and consistent copy register across pages

#### Scenario: No manipulative framing
- **WHEN** CTA copy is authored for any page
- **THEN** it contains no urgency ("act now"), scarcity ("limited spots"), or guilt-based language

### Requirement: Doctrine readable before conversion ask
The information architecture SHALL let a visitor read Purpose, Tenets, Practices, and Covenant before encountering a call-to-action to join the community — doctrine SHALL NOT be gated behind a signup (`CLAUDE.md` content rule #3). On the homepage specifically, the four doctrine chapters (Purpose, Tenets, Practices, Covenant, per the "Homepage presented as a sequence of distinctly-composed chapters" requirement) SHALL all appear before the closing community call-to-action.

#### Scenario: Doctrine pages accessible with no gate
- **WHEN** a visitor navigates directly to any doctrine page (Purpose, Tenets, Practices, Covenant) without having visited Community first
- **THEN** the full content renders with no signup wall or gate

#### Scenario: Homepage CTA arrives only after every doctrine chapter
- **WHEN** a visitor scrolls the homepage from top to bottom
- **THEN** the Purpose, Tenets, Practices, and Covenant chapters all appear, in that order, before the closing community call-to-action banner

### Requirement: Homepage presented as a sequence of distinctly-composed chapters
The homepage SHALL replace any repeating card-grid teaser layout with a sequence of distinctly-composed chapters — one per doctrine pillar (Purpose, Tenets, Practices, Covenant) — each using a different layout treatment from the others, per `docs/design/v0-3-radical-light-vision.md` §5: a left-aligned text block with an abstract graphic, a mirrored right-aligned text block with an abstract graphic, an expanding-text-box reveal, and a pull-quote treatment. Each chapter SHALL be separated from its neighbors by the `spacing.chapter` token's generous vertical gap, and each SHALL reveal via scroll-triggered animation as it enters the viewport.

#### Scenario: Each doctrine chapter uses a distinct layout
- **WHEN** the homepage renders its four doctrine chapters
- **THEN** no two consecutive chapters use the same layout treatment (left-aligned+graphic, right-aligned+graphic, expanding-text-box, pull-quote each appear exactly once)

#### Scenario: Chapters use abstract graphics, not photography
- **WHEN** a chapter includes a graphic element (Purpose or Tenets layout)
- **THEN** the graphic is an abstract CSS gradient/light-motif treatment, not photography or stock imagery, per `docs/CONTENT_STRATEGY.md`'s v1 no-photography scope

#### Scenario: Chapters reveal on scroll, not on load
- **WHEN** a visitor scrolls a doctrine chapter into view
- **THEN** its content animates into its revealed state via CSS scroll-driven animation, with no scroll-jacking JavaScript involved

#### Scenario: Chapter reveal respects reduced motion
- **WHEN** a visitor has `prefers-reduced-motion: reduce` set
- **THEN** every chapter renders immediately in its fully-revealed end-state, with no scroll-triggered animation

### Requirement: About/FAQ answers the skeptic's core questions
The About/FAQ page SHALL directly answer: "is this a cult," "do I have to believe in god," "is this free," and "who runs this" (REQ-ABOUT-001).

#### Scenario: All four FAQ questions answered
- **WHEN** the About page renders
- **THEN** it contains a direct, plain-language answer to each of the four required questions

### Requirement: Contact method requires no account
The system SHALL provide a way to contact the organization (a `mailto:` link or contact form) that does not require creating an account (REQ-CONTACT-001).

#### Scenario: Visitor can initiate contact with no signup
- **WHEN** a visitor wants to contact the organization
- **THEN** they can do so via a visible email link or form without registering for an account

### Requirement: Community page frames joining as low-pressure
The Community page SHALL present the Discord invite (https://discord.gg/GCAaeCcpD) as the join point, framed per `docs/CONTENT_STRATEGY.md`'s "low-pressure framing" — describing what to expect, not pressuring immediate action.

#### Scenario: Discord invite present and functional
- **WHEN** a visitor views the Community page
- **THEN** the Discord invite link is present, points to https://discord.gg/GCAaeCcpD, and is described with low-pressure, non-urgent copy

### Requirement: Community page avoids light-bearer terminology
The Community page SHALL refer to community members as "wavelet(s)," not "light-bearer(s)," consistent with the site-wide vocabulary rule in `doctrine-content`.

#### Scenario: No light-bearer language on Community page
- **WHEN** the Community page renders
- **THEN** its copy contains "wavelet" (or "wavelets") wherever community members are referenced, and does not contain "light-bearer" or "light-bearers"
