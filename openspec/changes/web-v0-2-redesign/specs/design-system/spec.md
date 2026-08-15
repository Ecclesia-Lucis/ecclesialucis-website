## MODIFIED Requirements

### Requirement: "Light in the dark" visual concept
The system SHALL implement a light-mode-first palette (white/near-white base, black/near-black ink) paired with a small set of bright, saturated accent colors drawn from the visible light spectrum, per the founder's v0.2 revision of `docs/CONTENT_STRATEGY.md` Brand Direction. The prior dark, near-black/indigo palette with a single gold/amber accent SHALL remain available as an equally-polished secondary theme (dark-mode alternate), with the primary/secondary roles reversed from v0.1. Typography pairing (humanist/high-contrast serif for headings, geometric sans for body) is unchanged.

#### Scenario: Default theme is light
- **WHEN** a visitor loads any page with no OS-level theme preference expressed, or with `prefers-color-scheme: light`
- **THEN** the page renders the white/near-white, black-ink, bright-spectrum-accent palette as the visual default

#### Scenario: Dark theme remains available and complete
- **WHEN** a visitor has `prefers-color-scheme: dark` set
- **THEN** the page renders a fully-styled dark alternate theme (not a stripped-down fallback), with the same component set and layout as the light theme

#### Scenario: Spectrum accents used sparingly, not as full-bleed color blocks
- **WHEN** spectrum accent colors are applied to any UI element (links, underlines, icons, small decorative fills)
- **THEN** they are used as targeted accents rather than large solid-color backgrounds, and body text never renders in a spectrum accent color at small sizes where it would harm readability

#### Scenario: Heading and body typography pairing
- **WHEN** any page renders a heading and body text together
- **THEN** the heading uses the serif display font and the body uses the sans body font, per the token definitions

#### Scenario: Text contrast holds under the new palette
- **WHEN** primary body text, headings, or interactive text renders against its background in either theme
- **THEN** the contrast ratio meets WCAG 2.2 AA (per `docs/PRD.md` §5.3), including where a bright spectrum accent color is used for text or an icon that conveys information

## ADDED Requirements

### Requirement: Spectrum-bleed edge glow
The system SHALL provide a shared, centrally-defined decorative background treatment ("spectrum bleed") — a subtle rainbow-hued glow/gradient bleeding in from the outer edges of the viewport behind page content — available as a base design-system element rather than a per-page one-off, replacing the v0.1 single-hue `glow-field` amber glow.

#### Scenario: Edge glow present without harming legibility
- **WHEN** a page renders the spectrum-bleed treatment behind its content
- **THEN** the glow sits behind foreground content, is marked decorative (not exposed to assistive technology as content), and does not reduce any foreground text below WCAG 2.2 AA contrast

#### Scenario: Edge glow respects reduced motion
- **WHEN** a visitor has `prefers-reduced-motion: reduce` set
- **THEN** any animated shift in the spectrum-bleed glow is disabled or reduced to an instant/near-instant, static state

### Requirement: Wayfinding-thread scroll motif
The system SHALL provide a shared, centrally-defined decorative motif ("wayfinding thread") — one or more fine interweaving lines, rendered in the spectrum accent hues, that visually connect sections of a page as the visitor scrolls, distinct from the spectrum-bleed background glow, evoking a trail guiding the visitor deeper into the content.

#### Scenario: Thread motif available as a shared element
- **WHEN** a page includes the wayfinding-thread motif
- **THEN** it is implemented once as a shared design-system element and reused across pages rather than hand-built per page

#### Scenario: Thread motif stays decorative and legible
- **WHEN** the wayfinding-thread motif renders alongside page content
- **THEN** it is marked decorative (not exposed to assistive technology as content), never overlaps in a way that reduces foreground text below WCAG 2.2 AA contrast, and never obscures interactive elements

#### Scenario: Thread motif respects reduced motion
- **WHEN** a visitor has `prefers-reduced-motion: reduce` set
- **THEN** any scroll-linked animation of the thread motif is disabled or reduced to an instant/near-instant, static state
