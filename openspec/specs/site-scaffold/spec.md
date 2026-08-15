# site-scaffold Specification

## Purpose

The application shell — layout, persistent navigation, footer, responsive breakpoints, and theme switching — that every page in `marketing-pages` renders inside. Corresponds to `docs/PRD.md` REQ-NAV-001, REQ-RESP-001, REQ-THEME-001.

## Requirements

### Requirement: Persistent primary navigation
The system SHALL provide a persistent primary navigation exposing links to Home, Purpose, Tenets, Practices, Covenant, Community, and About, visible on every page (REQ-NAV-001).

#### Scenario: Navigation present on every route
- **WHEN** a visitor loads any page of the site
- **THEN** the primary navigation with all required links is visible without scrolling on desktop, and reachable via a mobile menu control on small viewports

### Requirement: Persistent footer with protocol repo link
The system SHALL provide a footer on every page linking to Purpose, Tenets, Practices, Covenant, Community, the public GitHub protocol repository, and a legal-status line (REQ-CTA-003).

#### Scenario: Footer link to protocol repo
- **WHEN** a visitor scrolls to the footer of any page
- **THEN** a link to the Ecclesia Lucis Protocol GitHub repository is present and opens in a new tab

#### Scenario: Legal status placeholder, not invented language
- **WHEN** the footer legal-status line is rendered
- **THEN** it SHALL render an explicit, clearly-marked placeholder (e.g. "nonprofit status: TBD") rather than an asserted claim of confirmed nonprofit or tax-deductible status, until REQ-LEGAL-001 is unblocked

### Requirement: Full responsive layout
The system SHALL render correctly from 360px to 2560px viewport width with no horizontal scrolling or overlapping content (REQ-RESP-001).

#### Scenario: Mobile viewport
- **WHEN** the site is loaded at a 360px-wide viewport
- **THEN** all content and navigation remain usable with no horizontal overflow

#### Scenario: Wide desktop viewport
- **WHEN** the site is loaded at a 2560px-wide viewport
- **THEN** content remains legible and appropriately constrained (not stretched edge-to-edge as unreadable full-width text)

### Requirement: Light and dark theme support
The system SHALL support both a dark-mode-first presentation and an equally-polished light mode, matching the visitor's system preference by default (REQ-THEME-001).

#### Scenario: System dark mode
- **WHEN** a visitor's OS is set to dark mode and they load the site with no prior override
- **THEN** the site renders in the dark "light in the dark" theme

#### Scenario: System light mode
- **WHEN** a visitor's OS is set to light mode and they load the site with no prior override
- **THEN** the site renders in the light theme with equivalent visual polish, not a stripped-down fallback
