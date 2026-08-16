## Why

The founder reviewed v0.1 (dark-mode-first, near-black/indigo base with gold/amber accents) and found it too safe and visually contradictory: a Church of *Light* shouldn't default to a dark palette. The homepage hero also over-explains before it breathes, and buries a warm, disarming detail — how to actually say "Ecclesia Lucis" — that would do real work for the "is this a cult / who runs this" skepticism the site is built to defuse. This is the founder's first `/opsx:propose` revision pass on the built v0.1 site, per `docs/CONTENT_STRATEGY.md`'s expectation that the initial brand direction ("a confident first draft... not a locked spec") would get revised once seen.

## What Changes

- **BREAKING**: Invert the design system's default theme — light (white/near-white base, black ink, bright saturated accent colors) becomes the primary, authored-default palette; the current dark "light in the dark" theme becomes the secondary, equally-polished alternate (mirrors the outgoing setup, roles swapped). Every color token in `lib/tokens.ts` is replaced, not tweaked.
- Introduce a bright, rainbow-spectrum accent system in place of the single gold/amber accent — a small set of saturated hues (drawn from the visible light spectrum, echoing the "wavelet" rename and the "each beam of light is different, together they are white light" idea already in the brand). Used deliberately and sparingly (accents, underlines, the edge-glow and guide-line motifs below) — never as full-bleed rainbow blocks, and never at the expense of WCAG 2.2 AA text contrast.
- Add a new decorative motif, "spectrum bleed": a subtle rainbow-hued glow/gradient bleeding in from the outer edges of the viewport behind page content, replacing the current `glow-field` amber-glow treatment. Respects `prefers-reduced-motion` and never reduces foreground text contrast below AA.
- Add a new decorative motif, "wayfinding thread": a fine, interweaving line (or small set of lines) rendered behind/beside content that visually connects sections as the visitor scrolls, in the rainbow accent hues — a "breadcrumb toward deeper understanding" cue distinct from the spectrum-bleed background glow. Purely decorative (`aria-hidden`), respects `prefers-reduced-motion` (static or near-instant when reduced motion is set), and never overlaps or reduces contrast on foreground text.
- Restructure the homepage hero:
  - Re-balance the name/tagline/statement type scale: "Ecclesia Lucis" shrinks to a small label size, "Church of Light" becomes the largest display element (previously the mid-sized tagline), "A faith of equals" sits between them, sized down from its current largest-on-page treatment. Semantic heading structure (one `<h1>`, logical order) is kept independent of this visual resizing.
  - Add a one-line pronunciation guide directly under "Ecclesia Lucis" ("Eck-Lee-See-Ah Lu-Chish") — a warm, disarming, non-authoritative detail signaling openness rather than insider jargon.
  - Add deliberate vertical breathing room between the name/title/statement block and the identity/"what this is not" paragraph that follows, so the opening reads as a beat, not a wall of text.
- Update `docs/CONTENT_STRATEGY.md` Brand Direction section to record the new palette/motif direction as superseding the "light in the dark" description (the doc predates OpenSpec and isn't itself a build artifact, but per `CLAUDE.md` should stay accurate — done as part of `tasks.md`, not as a spec delta).

## Capabilities

### New Capabilities

(none — this redesign re-skins and restructures existing capabilities; it doesn't introduce a new area of system behavior)

### Modified Capabilities

- `design-system`: replaces the "light in the dark" dark-mode-first requirement with a light-mode-first, bright/rainbow-accent requirement; adds new requirements for the spectrum-bleed edge glow and the wayfinding-thread scroll motif as base design-system elements (so they're implemented once, centrally, and reused — not per-page one-offs).
- `marketing-pages`: modifies the homepage above-the-fold requirement to specify the new name/tagline/statement size hierarchy, the pronunciation guide, and the added breathing room, while keeping the existing REQ-HOME-001 identity-statement-and-disclaimer-above-the-fold requirement intact.

## Impact

- `lib/tokens.ts` — full palette replacement (`darkTheme`/`lightTheme` values, plus new accent-spectrum tokens), light theme becomes the authored default.
- `tailwind.config.ts` (or wherever the theme CSS variables are emitted) — default/media-query roles swap to match the new primary/secondary theme relationship.
- `app/globals.css` (or equivalent) — `glow-field` / `glow-field-hero` styles reworked into the new spectrum-bleed treatment; new styles for the wayfinding-thread motif.
- `app/page.tsx` — homepage hero markup/type-scale restructure, pronunciation guide addition, spacing changes.
- `components/PageHeader.tsx` — interior-page header glow treatment updated to match the new spectrum-bleed motif for visual consistency across all six pages.
- Possibly a new shared component (e.g. `components/WayfindingThread.tsx`) for the interweaving-line scroll motif, consumed by page templates per `design.md`.
- `docs/CONTENT_STRATEGY.md` — Brand Direction section updated to reflect the new direction (doc update, not a spec delta).
- No changes to routes, content copy (doctrine text), CTA logic, or any `docs/PRD.md` functional requirement — this is a visual/presentation-layer change only.
