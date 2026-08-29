## MODIFIED Requirements

### Requirement: Homepage identity statement above the fold
**Pending founder sign-off — see `proposal.md` "Open Decision Requiring Founder Sign-Off."** This requirement is written to match `docs/design/v0-3-radical-light-vision.md`'s near-silent hero as a proposed resolution, not a founder-approved change to `docs/PRD.md` REQ-HOME-001 (which currently mandates the identity statement and disclaimer above the fold). `tasks.md` for this change SHALL NOT be executed against this requirement until the founder has explicitly approved one of: (a) relocating the statement and disclaimer as described below, or (b) an alternative that keeps them above the fold.

The homepage hero SHALL render only "The Church of Light" (small) and "Ecclesia Lucis" (large, below it) in the first screen, with no identity statement, "what this is not" disclaimer, or call-to-action present above the fold. The one-sentence identity statement and one-sentence "what this is not" disclaimer (REQ-HOME-001) SHALL instead appear together in the next chapter immediately following the hero ("the turn"), reachable with a single scroll and no click.

#### Scenario: First-time visitor lands on Home
- **WHEN** a visitor loads `/` on a standard desktop viewport
- **THEN** only "The Church of Light" and "Ecclesia Lucis" are visible without scrolling — no identity statement, disclaimer, or CTA appears in that first screen

#### Scenario: Identity statement and disclaimer reachable with one scroll
- **WHEN** a visitor scrolls down from the initial hero screen
- **THEN** the one-sentence identity statement and the "what this is not" disclaimer both appear together, before any doctrine chapter or call-to-action, requiring only a scroll and no click or gate

### Requirement: Doctrine readable before conversion ask
The information architecture SHALL let a visitor read Purpose, Tenets, Practices, and Covenant before encountering a call-to-action to join the community — doctrine SHALL NOT be gated behind a signup (`CLAUDE.md` content rule #3). On the homepage specifically, the four doctrine chapters (Purpose, Tenets, Practices, Covenant, per the Requirement below) SHALL all appear before the closing community call-to-action.

#### Scenario: Doctrine pages accessible with no gate
- **WHEN** a visitor navigates directly to any doctrine page (Purpose, Tenets, Practices, Covenant) without having visited Community first
- **THEN** the full content renders with no signup wall or gate

#### Scenario: Homepage CTA arrives only after every doctrine chapter
- **WHEN** a visitor scrolls the homepage from top to bottom
- **THEN** the Purpose, Tenets, Practices, and Covenant chapters all appear, in that order, before the closing community call-to-action banner

## ADDED Requirements

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
