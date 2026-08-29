## 1. Design tokens

- [ ] 1.1 🤖 In `lib/tokens.ts`, replace the spectrum-accent palette (`spectrumAccent1..6`, bright-white base, dark-theme alternative) with the Threshold palette: paper (`#FBF9F4`), void (`#08070A`), and one ember-gold accent value, used identically regardless of `prefers-color-scheme`.
- [ ] 1.2 🤖 Replace the typography tokens: Odibee Sans for display/heading/section-label text, DM Sans for body/subtext, loaded via `next/font/google`. Remove the retired serif/geometric-sans token references.
- [ ] 1.3 🤖 Remove the `spacing.chapter` token and any other token defined solely for the retired chapter layout.
- [ ] 1.4 🤖 Update `tailwind.config.ts` so the new palette and typography tokens are wired through, and retired tokens are no longer referenced.

## 2. Threshold and mote components (new)

- [ ] 2.1 🤖 Build the iris threshold-reveal component: a pinned/sticky section whose `mask-image` (CSS `radial-gradient`, recalculated via `requestAnimationFrame` on scroll — NOT an SVG `<mask>` + filter, per `design.md`'s Decisions) grows from a point to fill the viewport, flipping background/text between paper and void states. It renders only a short section label, per `design-system/spec.md`'s "Iris threshold-reveal mechanism".
- [ ] 2.2 🤖 Build the chamber component: renders a doctrine pillar's heading and body text via `IntersectionObserver`-triggered fade-in as it scrolls into view, followed by its scattered motes.
- [ ] 2.3 🤖 Build the mote component/pattern: independently-sized, independently-positioned short text fragments that fade in individually via `IntersectionObserver` as each one enters the viewport, per `design-system/spec.md`'s "Content presented as scattered motes".
- [ ] 2.4 🤖 Build the hero load-in sequence: hero image visible first, then wordmark fade-in, then tagline fade-in, then scroll affordance — each `prefers-reduced-motion`-gated to render immediately with no staged animation.
- [ ] 2.5 🤖 Add `prefers-reduced-motion` handling to every component built in this section: threshold sections render fully flipped, chamber content and motes render fully visible, hero renders in final state — per `design-system/spec.md`'s "Motion respects reduced-motion preference".

## 3. Homepage restructure

- [ ] 3.1 🤖 Rewrite `app/page.tsx`: hero (2.4) followed by four alternating threshold (2.1) / chamber (2.2) pairs, one per doctrine pillar (Purpose, Tenets, Practices, Covenant, in that order), ending with the existing `CtaBanner` unchanged in position.
- [ ] 3.2 🤖 Confirm no doctrine content is duplicated between a threshold's label and its following chamber's full content — spot-check each of the four pairs against `design-system/spec.md`'s "Threshold reveal shows only a label, not the chamber's full content" scenario.
- [ ] 3.3 🤖 Remove `components/GraphicTextChapter.tsx`, `components/ExpandingText.tsx` usages from `app/page.tsx` (retired per `design.md`'s Migration Plan step 2 — components may be deleted if nothing else references them).
- [ ] 3.4 🤖 Retire `components/WayfindingThread.tsx`, `components/HeroParticles.tsx`, `components/HeroParticlesGate.tsx`, `components/KineticWordmark.tsx` and remove all usages, per `design.md`'s Decisions.

## 4. Navigation

- [ ] 4.1 🤖 Rebuild `components/Nav.tsx` for context-triggered visibility: hidden by default, reveals on end-of-scroll or pointer-near-top, hides otherwise. Reuse the existing mobile menu toggle and link list.
- [ ] 4.2 🤖 Add a keyboard-focusable control reachable early in the page's tab order that reveals navigation on focus, per `site-scaffold/spec.md`'s "Context-triggered primary navigation" accessible-equivalent scenario — do not rely on end-of-scroll alone as the only non-pointer path.
- [ ] 4.3 🤖 Gate the show/hide transition behind `prefers-reduced-motion`: instant show/hide, no animated slide/fade, per the corresponding scenario.

## 5. Interior pages

- [ ] 5.1 🤖 Migrate `components/PageHeader.tsx` and the six interior route pages (`/purpose`, `/tenets`, `/practices`, `/covenant`, `/about`, `/community`) to the new palette and typography tokens — no structural rewrite, per `design.md`'s Decisions (interior pages do not get the pinned hero/threshold treatment).
- [ ] 5.2 🤖 Confirm each interior page's primary content is visible immediately on load, with no scroll gate, per `marketing-pages/spec.md`'s "Interior pages inherit the visual system without the pinned-scroll treatment".

## 6. Verification

- [ ] 6.1 🤖 Run the site locally and visually verify the homepage's full threshold/chamber sequence end to end, per `CLAUDE.md`'s "verify UI changes in a browser" rule.
- [ ] 6.2 🤖 Verify `prefers-reduced-motion: reduce` collapses the homepage to a single flattened page: hero final state, every threshold fully flipped, every chamber's content and motes visible, in normal document order.
- [ ] 6.3 🤖 Manual keyboard-only pass: confirm navigation is reachable via the focus-triggered control from section 4.2 without using a pointer, and via end-of-scroll — flagged as higher-risk in `design.md`'s Risks (untested in the prototype).
- [ ] 6.4 🤖 Manual touch-device pass: confirm navigation is reachable on a touch device with no hover capability.
- [ ] 6.5 🤖 Spot-check contrast ratios (browser devtools) for body text, headings, and the ember accent against WCAG 2.2 AA in both the paper and void states.
- [ ] 6.6 🤖 Confirm the doctrine-before-CTA ordering holds: all four chambers render before `CtaBanner` on every load.
- [ ] 6.7 🤖 Confirm no doctrine copy, routes, or CTA destination/copy changed — this change is presentation-layer and homepage-structure only.
- [ ] 6.8 🤖 Run existing build/lint/test commands and fix any failures introduced by the above changes.

## 7. Documentation

- [ ] 7.1 🤖 Update `docs/DEPENDENCIES.md`'s Open Issues Register: mark this change's proposal item resolved/applied once merged.
- [ ] 7.2 🤖 Update `CLAUDE.md`'s "Current status" to describe Threshold as shipped rather than proposed, once applied.
