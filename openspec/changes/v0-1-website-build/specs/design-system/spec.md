## Purpose

A token-based design system implementing the "light in the dark" visual concept from `docs/CONTENT_STRATEGY.md` Brand Direction, so future visual revision passes edit tokens rather than hunting one-off hardcoded styles across components.

## ADDED Requirements

### Requirement: Design tokens defined centrally
The system SHALL define color, typography, and spacing as centralized design tokens (not one-off hardcoded values scattered across components), per `CLAUDE.md`'s maintainability rule and the founder's stated need to iterate on the visual direction cheaply after first seeing it.

#### Scenario: Palette change touches one file
- **WHEN** a color or type-scale value needs to change
- **THEN** it can be changed in the token definitions without editing individual page/component files

### Requirement: "Light in the dark" visual concept
The system SHALL implement a dark-mode-first palette (near-black/deep-indigo base with warm luminous gold/amber accents) paired with a humanist/high-contrast serif for headings and a geometric sans for body text, per `docs/CONTENT_STRATEGY.md` Brand Direction.

#### Scenario: Heading and body typography pairing
- **WHEN** any page renders a heading and body text together
- **THEN** the heading uses the serif display font and the body uses the sans body font, per the token definitions

### Requirement: Motion respects reduced-motion preference
Any decorative motion (gradient shifts, fade-ins) SHALL respect `prefers-reduced-motion` per `docs/PRD.md` §5.3 accessibility requirements.

#### Scenario: Reduced motion preference honored
- **WHEN** a visitor has `prefers-reduced-motion: reduce` set
- **THEN** decorative animations are disabled or reduced to instant/near-instant transitions

### Requirement: Base component library
The system SHALL provide reusable base components (Button, Card, Section, Nav) built on the design tokens, used consistently across all pages rather than each page implementing its own styling.

#### Scenario: CTA buttons share one visual style
- **WHEN** a primary call-to-action button appears on any page
- **THEN** it uses the shared Button component and token-derived styling, so all CTAs look visually identical per the "consistency itself is part of the trust signal" rule in `docs/CONTENT_STRATEGY.md`
