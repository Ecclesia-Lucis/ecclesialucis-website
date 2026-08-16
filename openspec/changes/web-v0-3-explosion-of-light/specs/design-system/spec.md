## MODIFIED Requirements

### Requirement: "Light in the dark" visual concept
The system SHALL implement a light-mode-first palette with a true bright-white/near-white base (`#ffffff`–`#fdfdfb`) and near-black ink, paired with a small set of bright, saturated accent colors drawn from the visible light spectrum (`spectrumAccent1..6`, a compressed ROYGBIV), per `docs/design/v0-3-radical-light-vision.md` §4.1. The prior dark, near-black/indigo palette with a single gold/amber accent SHALL remain available as an equally-polished secondary theme (dark-mode alternate). Typography pairing (humanist/high-contrast serif for headings, geometric sans for body) is unchanged.

#### Scenario: Default theme is bright white
- **WHEN** a visitor loads any page with no OS-level theme preference expressed, or with `prefers-color-scheme: light`
- **THEN** the page renders the true bright-white/near-white base, near-black ink, bright-spectrum-accent palette as the visual default

#### Scenario: Dark theme remains available and complete
- **WHEN** a visitor has `prefers-color-scheme: dark` set
- **THEN** the page renders a fully-styled dark alternate theme (not a stripped-down fallback), with the same component set and layout as the light theme

#### Scenario: Spectrum accents used sparingly, not as full-bleed color blocks
- **WHEN** spectrum accent colors are applied to any UI element (links, underlines, icons, small decorative fills)
- **THEN** they are used as targeted accents rather than large solid-color backgrounds, and body text never renders in a spectrum accent color at small sizes where it would harm readability

#### Scenario: Heading and body typography pairing
- **WHEN** any page renders a heading and body text together
- **THEN** the heading uses the serif display font and the body uses the sans body font, per the token definitions

#### Scenario: Text contrast holds under the true-white palette
- **WHEN** primary body text, headings, or interactive text renders against its background in either theme
- **THEN** the contrast ratio meets WCAG 2.2 AA (per `docs/PRD.md` §5.3), including where a bright spectrum accent color is used for text or an icon that conveys information

### Requirement: Motion respects reduced-motion preference
Any decorative motion (gradient shifts, fade-ins, scroll-driven reveals, kinetic-type load-in, expanding-text-box reveals, the wayfinding-thread animation, and the optional particle layer) SHALL respect `prefers-reduced-motion` per `docs/PRD.md` §5.3 accessibility requirements, collapsing to an instant, fully-visible/expanded static end-state — never hidden, never broken.

#### Scenario: Reduced motion preference honored
- **WHEN** a visitor has `prefers-reduced-motion: reduce` set
- **THEN** every decorative animation in the design system (including all v0.3-introduced motion) is disabled or reduced to an instant/near-instant, static end-state

#### Scenario: No flashing content
- **WHEN** any decorative motion element renders, with or without reduced motion set
- **THEN** it never flashes more than 3 times per second in any 1-second window (WCAG 2.3.1); drift, bloom, and pulse effects are permitted, strobing is not

## ADDED Requirements

### Requirement: Spectrum-bleed edge glow
The system SHALL provide a shared, centrally-defined decorative background treatment ("spectrum bleed") — a subtle rainbow-hued glow/gradient bleeding in from the outer edges of the viewport behind page content, per `docs/design/v0-3-radical-light-vision.md` §4.2 — available as a base design-system element rather than a per-page one-off, replacing the v0.1 single-hue `glow-field` amber glow.

#### Scenario: Edge glow present without harming legibility
- **WHEN** a page renders the spectrum-bleed treatment behind its content
- **THEN** the glow sits behind foreground content, is marked decorative (not exposed to assistive technology as content), and does not reduce any foreground text below WCAG 2.2 AA contrast

#### Scenario: Edge glow respects reduced motion
- **WHEN** a visitor has `prefers-reduced-motion: reduce` set
- **THEN** any animated shift in the spectrum-bleed glow is disabled or reduced to an instant/near-instant, static state

### Requirement: Optional device-tiered hero particle layer
The system MAY provide an additional canvas/WebGL decorative layer behind the homepage hero only, rendering slow-drifting, bloom-only light "motes," per `docs/design/v0-3-radical-light-vision.md` §4.2. This enhancement is strictly additive: its absence SHALL NOT make the hero look incomplete, and it SHALL NOT be a dependency for the hero text's paint.

#### Scenario: Particle layer loads only on qualifying devices
- **WHEN** a visitor's device is pointer-capable, has a larger viewport, has no `prefers-reduced-motion: reduce` set, and has no data-saver preference set
- **THEN** the particle layer may load, lazily and without delaying the hero text's paint

#### Scenario: Particle layer absent on non-qualifying devices
- **WHEN** a visitor's device does not meet the qualifying criteria (small viewport, no pointer, reduced motion requested, or data saver requested)
- **THEN** the particle layer does not load, and the hero renders complete and finished using only the CSS spectrum-bleed floor

#### Scenario: Particle motion never strobes
- **WHEN** the particle layer is active
- **THEN** its motion is continuous drift and bloom only, with no flashing, strobing, or repeating flash pattern of any kind

### Requirement: Wayfinding-thread scroll motif
The system SHALL provide a shared, centrally-defined decorative motif ("wayfinding thread") — one or more fine interweaving lines, rendered in the spectrum accent hues, that visually connect sections of a page as the visitor scrolls. Per `docs/design/v0-3-radical-light-vision.md` §4.3, on the homepage the thread SHALL run the full length of the page, threading between (not over) each distinctly-composed doctrine chapter so the journey reads as one continuous path.

#### Scenario: Thread motif available as a shared element
- **WHEN** a page includes the wayfinding-thread motif
- **THEN** it is implemented once as a shared design-system element and reused across pages rather than hand-built per page

#### Scenario: Thread spans the full homepage
- **WHEN** the homepage renders
- **THEN** the wayfinding-thread motif runs continuously from the hero through every doctrine chapter to the closing CTA banner, rather than being confined to the hero alone

#### Scenario: Thread motif stays decorative and legible
- **WHEN** the wayfinding-thread motif renders alongside page content
- **THEN** it is marked decorative (not exposed to assistive technology as content), never overlaps in a way that reduces foreground text below WCAG 2.2 AA contrast, and never obscures interactive elements

#### Scenario: Thread motif respects reduced motion
- **WHEN** a visitor has `prefers-reduced-motion: reduce` set
- **THEN** any scroll-linked animation of the thread motif is disabled or reduced to an instant/near-instant, static state

### Requirement: Chapter spacing rhythm
The system SHALL define a `spacing.chapter` token — a larger vertical-gap step than the existing `spacing.section` token — used between distinctly-composed homepage chapters, per `docs/design/v0-3-radical-light-vision.md` §4.5, so the generous dead-space pacing is centrally tunable rather than a per-page judgment call.

#### Scenario: Chapter gap consistent and centrally tunable
- **WHEN** the homepage renders successive doctrine chapters
- **THEN** the vertical gap between them uses the shared `spacing.chapter` token, and changing that token's value updates the gap everywhere it is used without editing individual page files

### Requirement: One-shot kinetic-type hero load-in
The system SHALL provide a one-shot, once-per-page-load kinetic-type animation (weight/tracking transition) for the "Ecclesia Lucis" hero wordmark, per `docs/design/v0-3-radical-light-vision.md` §4.4. It SHALL run once on load and SHALL NOT re-trigger on scroll or repeat.

#### Scenario: Load-in plays once per page load
- **WHEN** a visitor loads the homepage
- **THEN** the "Ecclesia Lucis" wordmark animates its weight/tracking once, then remains static for the rest of the session on that page — including through subsequent scrolling

#### Scenario: Load-in respects reduced motion
- **WHEN** a visitor has `prefers-reduced-motion: reduce` set
- **THEN** the wordmark renders immediately in its final state with a simple fade (or no animation), never the full kinetic-type transition

### Requirement: Expanding-text-box reveal
The system SHALL provide a shared, centrally-defined interaction pattern for a collapsed statement that expands to reveal additional detail as it scrolls into view, per `docs/design/v0-3-radical-light-vision.md` §5 step 5, implemented via CSS-only scroll-driven animation (progressive enhancement, no scroll-jacking JS).

#### Scenario: Text box expands on scroll into view
- **WHEN** a visitor scrolls an expanding-text-box element into the viewport
- **THEN** the collapsed statement grows to reveal its additional detail content

#### Scenario: Expanding text box respects reduced motion
- **WHEN** a visitor has `prefers-reduced-motion: reduce` set
- **THEN** the text box renders in its fully-expanded, final state immediately, with no animated transition

#### Scenario: Expanding text box degrades gracefully without scroll-driven-animation support
- **WHEN** a visitor's browser does not support CSS scroll-driven animation (`animation-timeline`)
- **THEN** the text box renders fully expanded and fully visible by default, never stuck in a collapsed or broken state
