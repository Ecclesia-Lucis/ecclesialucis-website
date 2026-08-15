# marketing-pages Specification

## Purpose

The 6 v1 pages themselves — the actual routes a visitor navigates, built on `site-scaffold`, `design-system`, and `doctrine-content` — implementing the sitemap and conversion requirements in `docs/PRD.md` and `docs/CONTENT_STRATEGY.md`.

## Requirements

### Requirement: Homepage identity statement above the fold
The homepage SHALL present, above the fold, a one-sentence identity statement and either a one-sentence "what this is not" disclaimer or an immediate link to it (REQ-HOME-001).

#### Scenario: First-time visitor lands on Home
- **WHEN** a visitor loads `/`
- **THEN** a one-sentence identity statement and a "what this is not" disclaimer or link are both visible without scrolling on a standard desktop viewport

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
The information architecture SHALL let a visitor read Purpose, Tenets, Practices, and Covenant before encountering a call-to-action to join the community — doctrine SHALL NOT be gated behind a signup (`CLAUDE.md` content rule #3).

#### Scenario: Doctrine pages accessible with no gate
- **WHEN** a visitor navigates directly to any doctrine page (Purpose, Tenets, Practices, Covenant) without having visited Community first
- **THEN** the full content renders with no signup wall or gate

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
