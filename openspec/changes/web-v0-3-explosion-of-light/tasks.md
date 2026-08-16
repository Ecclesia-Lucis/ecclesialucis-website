## 1. Supersede v0.2

- [x] 1.1 🤖 Move `openspec/changes/web-v0-2-redesign/` to `openspec/changes/archive/` with a one-line note ("Superseded by web-v0-3-explosion-of-light, 2026-08-15 — never applied") — per `design.md`'s Migration Plan step 1. Do not run `/opsx:apply` on it first.

## 2. Founder sign-off gate

- [x] 2.1 🧑 **Founder decision required before Section 5 (Homepage restructure) starts:** review `proposal.md`'s "Open Decision Requiring Founder Sign-Off" and approve either (a) relocating the identity statement + "what this is not" disclaimer to "the turn" chapter as specced, or (b) an alternative that keeps REQ-HOME-001 content above the fold. Sections 3, 4, and 6 do not depend on this and may proceed in parallel; Section 5 tasks 5.1–5.3 are blocked until this is resolved.

## 3. Design tokens

- [x] 3.1 🤖 In `lib/tokens.ts`, replace the light-theme base/surface/ink values with the true-white palette (`#ffffff`–`#fdfdfb` base, near-black ink), keeping the theme-role-swap structure (light at `:root` default, dark behind `prefers-color-scheme: dark`) reused from `web-v0-2-redesign`'s token shape.
- [x] 3.2 🤖 Re-tune `spectrumAccent1`–`spectrumAccent6` (compressed ROYGBIV) for the whiter base: 4.5:1 contrast on `base` for text use, 3:1 for large text/icon use, in both themes; keep the single `accent` fallback token for existing `text-accent`/`bg-accent` usages.
- [x] 3.3 🤖 Add a `spacing.chapter` token (larger step than `spacing.section`, same `clamp()` pattern) per `design-system/spec.md`'s "Chapter spacing rhythm" requirement.
- [x] 3.4 🤖 Update `tailwind.config.ts` (or wherever theme CSS variables are emitted) so the new palette values and `spacing.chapter` are wired through.

## 4. Shared motion/motif components

- [x] 4.1 🤖 Re-tune the spectrum-bleed edge-glow CSS treatment (conic/radial gradient stack) for the true-white base, keeping it `aria-hidden`, opacity/blur-limited so it never approaches AA-threatening contrast near `layout.contentMax`, and `motion-safe:animate-*`-gated for reduced motion.
- [x] 4.2 🤖 Create `components/WayfindingThread.tsx`: an `aria-hidden`, `pointer-events: none` SVG path in spectrum hues, revealed via CSS scroll-driven animation (`animation-timeline: view()`/`scroll()`) with a fully-visible static fallback when unsupported, sized/positioned to run the full length of the homepage (not just the hero) per `design-system/spec.md`.
- [x] 4.3 🤖 Add the one-shot kinetic-type load-in animation (weight/tracking transition) for the "Ecclesia Lucis" hero wordmark: plays once per page load, never re-triggers on scroll, collapses to a simple fade (or no animation) under `prefers-reduced-motion`.
- [x] 4.4 🤖 Build the expanding-text-box reveal pattern as a shared component: collapsed statement that expands on scroll-into-view via CSS scroll-driven animation, with a fully-expanded static fallback when unsupported or reduced-motion is set.
- [x] 4.5 🤖 Confirm `components/PullQuote.tsx` (existing) is suitable for the Covenant chapter's pull-quote treatment, or extend it as needed — reuse rather than duplicate.
- [x] 4.6 🤖 Build the left-aligned/right-aligned text-plus-graphic layout component (single component with an `align`/`flip` prop, per `design.md`'s Decisions) using an abstract CSS gradient/light-motif graphic — no photography.

## 5. Homepage restructure (blocked on Section 2 sign-off)

- [x] 5.1 🤖 Restructure `app/page.tsx`'s hero: first screen renders only "The Church of Light" (small, first) and "Ecclesia Lucis" (large, `<h1>`, below it, carrying the kinetic-type load-in from 4.3) — no identity statement, disclaimer, or CTA in that screen.
- [x] 5.2 🤖 Build "the turn" chapter immediately following the hero: the explorer statement as an expanding-text-box reveal, plus the relocated identity statement and "what this is not" disclaimer (per the founder's Section 2 decision), reachable with one scroll.
- [x] 5.3 🤖 Replace the `doctrineTeasers.map(...)` card grid with four distinct chapters in order — Purpose (left-aligned+graphic), Tenets (right-aligned+graphic, mirrored), Practices (expanding-text-box), Covenant (pull-quote) — each separated by `spacing.chapter`, each wired to the full-length `WayfindingThread`, each revealing on scroll per `marketing-pages/spec.md`.
- [x] 5.4 🤖 Confirm `CtaBanner` still renders last, after all four doctrine chapters, unchanged in position and copy.

## 6. Optional: device-tiered particle layer (stretch, non-blocking)

- [x] 6.1 🤖 Build a canvas/WebGL component rendering slow-drifting, bloom-only light motes, gated on: pointer-capable device, viewport above the defined breakpoint, no `prefers-reduced-motion: reduce`, and no `navigator.connection.saveData` (default to not loading if this signal is unavailable).
- [x] 6.2 🤖 Dynamically import the component (`next/dynamic`, no SSR) behind the hero only, confirming it never delays the hero text's paint (the text stays the LCP element regardless of whether this layer loads).
- [x] 6.3 🤖 Verify the hero renders complete and finished on non-qualifying devices with only the CSS spectrum-bleed floor — no visual gap where the particle layer would have been.
- [x] 6.4 🤖 If this task threatens `docs/PRD.md` §5 Core Web Vitals budgets at implementation time, cut it — it is explicitly non-blocking for the rest of the change.

## 7. Interior pages and shared chrome

- [x] 7.1 🤖 Update `components/PageHeader.tsx` to use the re-tuned spectrum-bleed glow treatment, keeping its existing eyebrow/title/intro structure otherwise unchanged.
- [x] 7.2 🤖 Spot-check the other five routes (`/purpose`, `/tenets`, `/practices`, `/covenant`, `/about`, `/community`) for hardcoded color usage assuming the old palette and migrate to tokens.

## 8. Verification

- [x] 8.1 🤖 Run the site locally and visually verify both themes (true-white default, dark alternate via `prefers-color-scheme: dark`) across all six routes, per `CLAUDE.md`'s "verify UI changes in a browser" rule.
- [x] 8.2 🤖 Verify `prefers-reduced-motion: reduce` collapses every v0.3 motion element (bleed drift, thread reveal, kinetic-type load-in, chapter scroll-reveals, expanding text box, particle layer if built) to an instant static/expanded end-state.
- [x] 8.3 🤖 Spot-check contrast ratios (browser devtools) for body text, headings, and spectrum-accent text/icon usages in both themes against WCAG 2.2 AA, on the true-white base specifically.
- [x] 8.4 🤖 Confirm no content anywhere on the homepage flashes more than 3 times/second (WCAG 2.3.1) — spot-check the kinetic-type load-in and any particle layer built.
- [x] 8.5 🤖 Confirm the doctrine-before-CTA ordering holds: all four chapters render before `CtaBanner` on every load.
- [x] 8.6 🤖 Confirm no doctrine copy, routes, or CTA destination/copy changed — this pass is presentation-layer and homepage-structure only, apart from the Section 2 relocation.
- [x] 8.7 🤖 If the particle layer was built, spot-check Core Web Vitals (e.g. Lighthouse) against `docs/PRD.md` §5 budgets on a qualifying device.

## 9. Documentation

- [x] 9.1 🤖 Update `docs/CONTENT_STRATEGY.md`'s Brand Direction section to describe the v0.3 "explosion of light" direction as superseding both the v0.1 "light in the dark" description and the never-shipped v0.2 draft.
