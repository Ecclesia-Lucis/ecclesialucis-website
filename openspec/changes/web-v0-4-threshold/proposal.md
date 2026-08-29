## Why

The founder has reviewed a standalone scroll prototype and confirmed (2026-08-29) a new design direction — "Threshold" — as the primary aesthetic for this site going forward, superseding v0.3 "Explosion of Light." The founder's own framing: the site should invite discovery through subtlety, using scroll itself as the mechanism of revelation, rather than the current chapter-based page that discloses everything up front. This change formalizes that decision into spec language. It also closes out the two decisions the founder made at the same time — retiring REQ-HOME-001 (already reflected in `docs/PRD.md` and `openspec/specs/marketing-pages/spec.md`) cleared the way for a deliberately near-silent hero, and a concrete navigation-as-exploration mechanism (below) replaces the persistently-visible nav bar this proposal also amends.

## What Changes

- **BREAKING**: Replace the homepage's card/chapter-based structure (v0.3's "Homepage presented as a sequence of distinctly-composed chapters") with a fully scroll-driven sequence: a near-silent hero built on the "inverted blackhole" source image, followed by alternating pinned "threshold" sections where a circular reveal (CSS `mask-image: radial-gradient()`, not an SVG `<mask>`+filter — proven unreliable in prototyping) grows to flip the page between a paper/ink state and a void/light-ink state. Doctrine content within each revealed "chamber" renders as scattered, irregularly-sized "motes" rather than cards.
- Each threshold flip reveals only a short section label; the section's real heading/body content fades in afterward via scroll-into-view, once the visitor is inside the chamber — not duplicated between the flip and the chamber.
- **BREAKING**: Replace v0.3's typography pairing (serif display + geometric sans) with Odibee Sans (display/heading/section-label) and DM Sans (body/subtext), sitewide.
- **BREAKING**: Replace v0.3's bright spectrum-accent palette (`spectrumAccent1..6`) with a paper (`#FBF9F4`) / void (`#08070A`) neutral pair plus one warm ember-gold accent used identically in both states. Drops the `prefers-color-scheme` dark-mode-alternative concept entirely — the paper/void inversion is content the visitor scrolls through, not a settings-driven theme.
- **BREAKING**: Replace persistently-visible primary navigation with context-triggered navigation: reveals when the visitor reaches the end of the page's scroll, or when the pointer moves near the top of the viewport; hidden otherwise. A scroll-end reveal (device-agnostic) additionally serves as the touch/keyboard-accessible equivalent to the pointer-near-top trigger — see `design.md` for the full accessibility rationale.
- Retire `components/WayfindingThread.tsx` (built for v0.3's full-length SVG thread motif) — see `design.md` for why it has no role under the mote/threshold visual language.
- Interior pages (`/purpose`, `/tenets`, `/practices`, `/covenant`, `/about`, `/community`) inherit the palette, typography, and mote motif, but do NOT get their own full hero+threshold pinned-scroll treatment — see `design.md` for the usability rationale (visitors arriving directly at an interior page, e.g. from search, should not be scroll-gated before reaching content).
- `prefers-reduced-motion` collapses the entire threshold/mote/navigation sequence to a static, fully-revealed, correctly-ordered page with navigation always reachable — proven out in the prototype, carried forward as a hard requirement.
- Update `docs/CONTENT_STRATEGY.md` Brand Direction (already updated 2026-08-29 to describe Threshold as current) — no further doc-level change needed here, only the code implementation.

## Capabilities

### New Capabilities

(none — this redesign re-skins and restructures existing capabilities; it doesn't introduce a new area of system behavior)

### Modified Capabilities

- `design-system`: replaces v0.3's typography pairing and spectrum-accent palette with the Threshold palette/type system; adds the iris-mask threshold-reveal mechanism and the mote-scatter content-presentation pattern as shared, reusable design-system elements; retires the dark-mode-alternative requirement.
- `marketing-pages`: replaces the homepage's chapter-based structure with the threshold/mote homepage sequence; scopes the full pinned-scroll treatment to the homepage only, with interior pages inheriting only the visual system.
- `site-scaffold`: replaces the "Persistent primary navigation" requirement with context-triggered navigation (scroll-end or pointer-near-top reveal), including its accessible equivalent for touch/keyboard use.

## Impact

- `app/page.tsx` — full homepage rewrite: hero, alternating threshold sections, mote-based chambers, replacing the current chapter components (`GraphicTextChapter`, card-grid teasers).
- `components/HeroParticles.tsx`, `components/HeroParticlesGate.tsx`, `components/KineticWordmark.tsx`, `components/ExpandingText.tsx`, `components/GraphicTextChapter.tsx` — superseded by new threshold/mote components; evaluate reuse vs. replacement per `design.md`.
- `components/WayfindingThread.tsx` — retired (see `design.md`).
- `components/Nav.tsx` — rebuilt for context-triggered visibility (scroll-end / pointer-near-top / accessible equivalent) instead of `sticky top-0` persistent placement.
- `lib/tokens.ts`, `tailwind.config.ts` — palette and typography tokens replaced (not extended) for the Threshold system; `spacing.chapter` and `spectrumAccent1..6` tokens likely retired.
- `app/globals.css` — spectrum-bleed, kinetic-type load-in, and wayfinding-thread CSS retired; new mask-based threshold-reveal and mote-scatter styles added.
- Interior page components (`PageHeader.tsx` and the six route pages) — palette/typography token migration only, no structural rewrite.
- `assets/Resized/inverted blackhole-large.jpg` — becomes a real, referenced production asset (already present in the repo).
- No changes to routes, doctrine copy, CTA destination/copy, or content files under `content/` — this is a visual/presentation-layer and homepage-structure change only.
