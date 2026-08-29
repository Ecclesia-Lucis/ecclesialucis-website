## Why

Having seen v0.1 live and the never-applied v0.2 draft, the founder redirected the visual direction again, more fundamentally this time: not a palette tweak but "an explosion of light, an awakening" — the homepage should feel like an unfolding journey, not a template-website card grid. This is captured in a pre-researched creative brief, `docs/design/v0-3-radical-light-vision.md`, written 2026-08-15 specifically to ground this proposal (palette, motion approach, homepage structure, and accessibility guardrails are already decided there — this change formalizes those decisions into spec language rather than re-deriving them).

## What Changes

- **BREAKING**: Move the design system to a true bright-white/near-white base (`#ffffff`–`#fdfdfb`) with near-black ink — not the softer off-white v0.2 drafted — reusing v0.2's `spectrumAccent1..6` ROYGBIV token engineering and theme-role-swap approach (light authored default, dark as equally-polished secondary), re-tuned for the whiter base. Every color token in `lib/tokens.ts` is replaced, not tweaked.
- Extend the spectrum-bleed edge glow (v0.2's CSS-only floor, kept as-is in principle) with an **optional, device-tiered canvas/WebGL particle layer** behind the hero only — slow-drifting, bloom-only "light motes," never strobing, lazy-loaded so it can never delay the hero text's paint (the text is the LCP element). Ships only on pointer-capable, larger-viewport, non-reduced-motion, non-data-saver devices; every other device gets the CSS floor only, and the site must look complete and finished without the enhancement.
- Extend the wayfinding-thread motif (kept from v0.2) to run the **full length of the homepage**, not just the hero, stitching together the differently-composed doctrine chapters below into one continuous path.
- **BREAKING**: Replace the homepage's repeating 2-column doctrine-teaser card grid with a sequence of distinctly-composed "chapters," each with a different layout treatment (left-aligned+graphic, right-aligned+graphic mirrored, expanding-text-box reveal, pull-quote), separated by a new, larger `spacing.chapter` token, each revealed via CSS-only scroll-driven animation (`animation-timeline: view()`/`scroll()`, no scroll-jacking JS) — per `docs/design/v0-3-radical-light-vision.md` §5. The CTA banner's position is unchanged: it still arrives only after all four doctrine chapters, preserving `CLAUDE.md`'s doctrine-before-conversion ordering.
- **BREAKING**: Restructure the hero to be near-silent: "The Church of Light" (small) above "Ecclesia Lucis" (large, the most kinetic element on the page — a one-shot, once-per-session, `prefers-reduced-motion`-gated weight/tracking load-in animation), then nothing else in the first screen — no identity statement, no "what this is not" disclaimer, no CTA. See the open decision below: this conflicts with an existing H-priority PRD requirement and is not silently resolved.
- Add `prefers-reduced-motion` handling for every new motion element introduced by this change (kinetic-type load-in, per-chapter scroll reveals, expanding text boxes, extended thread, optional particle layer) — each collapses to an instant, fully-visible static end-state, never hidden or broken.
- Mark `openspec/changes/web-v0-2-redesign/` (proposed, never applied) as **superseded** by this change: move it to `openspec/changes/archive/` with a one-line note, without applying it. v0.3 builds on its palette-token engineering directly rather than layering on top of its applied code.
- Update `docs/CONTENT_STRATEGY.md`'s Brand Direction section to record the v0.3 direction as superseding both the v0.1 "light in the dark" description and the never-shipped v0.2 draft (doc update, part of `tasks.md`, not a spec delta, consistent with how v0.2 planned the same doc update).

## Open Decision Requiring Founder Sign-Off

**REQ-HOME-001 conflict.** `docs/PRD.md` currently requires (H priority): "The homepage MUST present, above the fold, a one-sentence identity statement and a one-sentence 'what this is not' disclaimer or immediate link to it." The near-silent hero this change specs (`docs/design/v0-3-radical-light-vision.md` §1 point 8) removes both from the first screen entirely.

This proposal does **not** resolve that conflict by picking a side. It ships the near-silent hero as designed, and carries the vision doc's recommended fix as a suggestion, not a decision: move the identity statement and disclaimer to the very next chapter ("the turn," `design.md` §5 step 2 below), reachable with a single scroll and no click — preserving the trust-building intent while honoring the near-silent hero. The `marketing-pages` spec delta encodes this suggested placement, but REQ-HOME-001 itself is not amended by this proposal; the founder needs to explicitly approve moving it off "above the fold" before `tasks.md` is executed against this design. Flagging per `CLAUDE.md`'s "ambiguous copy/design decisions get flagged, not guessed" rule.

## Capabilities

### New Capabilities

(none — this redesign re-skins and restructures existing capabilities; it doesn't introduce a new area of system behavior)

### Modified Capabilities

- `design-system`: replaces v0.1's dark-first palette (and supersedes v0.2's unapplied off-white draft) with a true-white-base, near-black-ink, spectrum-accent palette; extends the spectrum-bleed and wayfinding-thread requirements (introduced by the unapplied v0.2, now specified fresh here since v0.2 is superseded rather than applied) to cover the optional device-tiered particle enhancement, the full-homepage-length thread, the `spacing.chapter` token, and kinetic-type load-in motion — all with `prefers-reduced-motion` coverage.
- `marketing-pages`: replaces the homepage's repeating card-grid teaser section with the per-chapter journey structure from `docs/design/v0-3-radical-light-vision.md` §5; modifies the above-the-fold requirement per the open decision above (near-silent hero, with the identity statement/disclaimer relocated to the next chapter as a proposed — not yet founder-approved — resolution).

## Impact

- `lib/tokens.ts` — full palette replacement to the true-white base; `spectrumAccent1..6` re-tuned; new `spacing.chapter` token.
- `tailwind.config.ts` (or wherever theme CSS variables are emitted) — spectrum tokens and the new spacing step wired through.
- `app/globals.css` (or equivalent) — spectrum-bleed treatment re-tuned for the whiter base; kinetic-type load-in keyframes/animation.
- `app/page.tsx` — full homepage restructure: near-silent hero, "the turn" section (explorer statement + relocated identity/disclaimer per the open decision), four distinctly-laid-out doctrine chapters replacing the card grid, unchanged final `CtaBanner` position.
- `components/WayfindingThread.tsx` (new, since v0.2 never shipped it) — extended to run the homepage's full length.
- New components likely needed for the chapter layouts: an expanding-text-box reveal component (Practices chapter) and a pull-quote treatment (Covenant chapter) — `components/PullQuote.tsx` already exists and should be reused/extended rather than duplicated.
- Optional: a lazy-loaded canvas/WebGL particle component behind the hero, device-tiered, dynamically imported.
- `openspec/changes/web-v0-2-redesign/` → moved to `openspec/changes/archive/` with a superseded note, not applied.
- `docs/CONTENT_STRATEGY.md` — Brand Direction section updated.
- No changes to routes, doctrine copy, CTA destination/copy, or any other `docs/PRD.md` requirement — this is a visual/presentation-layer and homepage-structure change only, except for the explicitly flagged REQ-HOME-001 conflict above.
