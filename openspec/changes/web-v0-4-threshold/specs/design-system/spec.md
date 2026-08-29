## REMOVED Requirements

### Requirement: "Light in the dark" visual concept
**Reason**: Replaced by the Threshold palette/typography system — a fixed paper/void neutral pair the visitor scrolls through as content, not a bright-white authored theme with an optional OS-driven dark alternative.
**Migration**: See "Threshold palette and typography" below.

### Requirement: Spectrum-bleed edge glow
**Reason**: The rainbow spectrum-accent system this glow was built from is retired under Threshold's paper/void/ember palette. The threshold-reveal mechanism itself is now the page's primary visual event; an additional ambient edge glow would compete with it.
**Migration**: No replacement — removed without a substitute requirement.

### Requirement: Optional device-tiered hero particle layer
**Reason**: This was an ambient canvas/WebGL light-mote effect behind the hero. Threshold's hero uses a static source image (the "inverted blackhole" dust/light photograph) instead, and introduces an unrelated concept also called "motes" (see "Content presented as scattered motes" below) for doctrine text layout — keeping both under similar names would be confusing, and the canvas effect has no role in the new hero.
**Migration**: See "Threshold hero load-in sequence" and "Content presented as scattered motes" below — neither is a canvas/WebGL effect.

### Requirement: Wayfinding-thread scroll motif
**Reason**: This was a full-homepage-length SVG line motif rendered in the retired spectrum-accent hues, connecting the old chapter layout. It has no visual role once the homepage is restructured as alternating threshold/chamber sections — the iris-reveal mechanism itself is now what stitches the journey together.
**Migration**: No replacement — removed without a substitute requirement.

### Requirement: Chapter spacing rhythm
**Reason**: The `spacing.chapter` token existed to space out distinctly-composed homepage chapters. That structure is retired (see `marketing-pages`'s "Homepage presented as a sequence of distinctly-composed chapters" removal) in favor of a continuous alternating threshold/chamber sequence with no equivalent inter-chapter gap concept.
**Migration**: No replacement — removed without a substitute requirement.

### Requirement: One-shot kinetic-type hero load-in
**Reason**: Replaced by the Threshold hero's own load-in sequence (image, then wordmark, then tagline, each fading in in turn) — a different animation shape than a single wordmark's weight/tracking transition.
**Migration**: See "Threshold hero load-in sequence" below.

### Requirement: Expanding-text-box reveal
**Reason**: This collapsed-statement-expands-in-place pattern is replaced by two more specific patterns under Threshold: the iris threshold-reveal (for the short label that grows in during a background flip) and scroll-into-view fade-in (for a chamber's real heading/body content and its motes). Neither is a box that expands its own height.
**Migration**: See "Iris threshold-reveal mechanism" and "Content presented as scattered motes" below.

## MODIFIED Requirements

### Requirement: Motion respects reduced-motion preference
Any decorative motion (gradient shifts, fade-ins, the iris threshold-reveal, scroll-into-view content and mote fade-ins, and the context-triggered navigation reveal) SHALL respect `prefers-reduced-motion` per `docs/PRD.md` §5.3 accessibility requirements, collapsing to an instant, fully-visible/expanded static end-state — never hidden, never broken.

#### Scenario: Reduced motion preference honored
- **WHEN** a visitor has `prefers-reduced-motion: reduce` set
- **THEN** every decorative animation in the design system is disabled or reduced to an instant/near-instant, static end-state, and the homepage renders as a single flattened page with every threshold already fully "flipped" open and every chamber's content and motes already visible, in their normal document order

#### Scenario: No flashing content
- **WHEN** any decorative motion element renders, with or without reduced motion set
- **THEN** it never flashes more than 3 times per second in any 1-second window (WCAG 2.3.1); drift, bloom, and pulse effects are permitted, strobing is not

## ADDED Requirements

### Requirement: Threshold palette and typography
The system SHALL implement a fixed neutral palette of a paper tone and a void tone, plus one warm accent color used at the same hue in both states, as the sole visual theme — this palette SHALL NOT vary with the visitor's OS-level `prefers-color-scheme` setting, and there is no separate "dark mode" to opt into or out of; the paper/void inversion is content the visitor scrolls through, not a display preference. Typography SHALL pair a blocky/technical display face for the wordmark and all headings, section labels, and other display-level text, with a humanist sans body face for all body and subtext.

#### Scenario: Palette is fixed regardless of OS preference
- **WHEN** a visitor loads any page, whether their OS/browser is set to `prefers-color-scheme: light`, `dark`, or no preference
- **THEN** the page renders the same paper/void/accent palette in every case, with no automatic theme switching

#### Scenario: Heading and body typography pairing
- **WHEN** any page renders a heading and body text together
- **THEN** the heading (or section label) uses the display typeface and the body uses the sans body typeface, per the token definitions

#### Scenario: Text contrast holds in both paper and void states
- **WHEN** primary body text, headings, or interactive text renders against either the paper or the void background
- **THEN** the contrast ratio meets WCAG 2.2 AA (per `docs/PRD.md` §5.3) in both states

### Requirement: Iris threshold-reveal mechanism
The system SHALL provide a shared, reusable scroll-driven mechanism ("threshold") in which a circular reveal grows from a point to fill the viewport, flipping the visible background and text color between the paper and void states defined above. It SHALL be implemented using an animatable CSS mask/clip technique recalculated directly from scroll position (e.g. `mask-image` with a radial gradient) rather than by referencing a separate SVG `<mask>` element combined with an SVG filter — that combination does not reliably repaint on incremental geometry changes across browsers and SHALL NOT be used. Each threshold reveal SHALL disclose only a short section label as it grows; a chamber's full heading and body content SHALL NOT be duplicated inside the threshold reveal itself.

#### Scenario: Reveal grows continuously with scroll position
- **WHEN** a visitor scrolls through a pinned threshold section
- **THEN** the circular reveal's size increases smoothly and continuously in proportion to scroll progress through that section, with no visible jump or hard cut between the pre-reveal and post-reveal states

#### Scenario: Threshold reveal shows only a label, not the chamber's full content
- **WHEN** a threshold's circular reveal is growing
- **THEN** it discloses at most a short section label, and the section's full heading/body content is not visible until the visitor has scrolled into the chamber that follows

#### Scenario: Threshold reveal respects reduced motion
- **WHEN** a visitor has `prefers-reduced-motion: reduce` set
- **THEN** the threshold renders in its fully-flipped end state immediately, with no animated growth

### Requirement: Threshold hero load-in sequence
The system SHALL provide a one-shot, once-per-page-load sequence for the homepage hero: the hero image renders first, then the site wordmark fades in, then the tagline fades in, then a scroll affordance appears — each stage after the image on its own delay, with nothing else visible in the hero until the visitor scrolls. It SHALL run once on load and SHALL NOT re-trigger on scroll.

#### Scenario: Load-in stages appear in order
- **WHEN** a visitor loads the homepage
- **THEN** the hero image is visible first, followed in sequence by the wordmark, then the tagline, then the scroll affordance, with no other content visible in the hero at any point in the sequence

#### Scenario: Load-in respects reduced motion
- **WHEN** a visitor has `prefers-reduced-motion: reduce` set
- **THEN** the hero image, wordmark, tagline, and scroll affordance all render immediately in their final state, with no staged fade-in

### Requirement: Content presented as scattered motes
The system SHALL provide a shared pattern for presenting short doctrine fragments within a chamber as independently-sized and independently-positioned text elements ("motes") scattered without a card, grid, or list container, echoing the dust-particle field of the hero source image. Each mote SHALL fade into view individually as it scrolls into the viewport, rather than all motes within a chamber appearing simultaneously.

#### Scenario: Motes are not laid out as a grid or list
- **WHEN** a chamber renders its motes
- **THEN** their sizes and positions vary and are not aligned to a uniform grid or stacked as a list

#### Scenario: Motes fade in individually on scroll
- **WHEN** a visitor scrolls a chamber's motes into view
- **THEN** each mote transitions from hidden to visible independently as it individually enters the viewport, not all at once

#### Scenario: Motes respect reduced motion
- **WHEN** a visitor has `prefers-reduced-motion: reduce` set
- **THEN** all motes in every chamber render immediately visible, with no scroll-triggered fade-in
