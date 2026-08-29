## 1. Vocabulary rename ("light-bearer" → "wavelet")

- [x] 1.1 🤖 Update `content/connect.ts`: change `community.title` from "A community of light-bearers" to "A community of wavelets", and review the rest of `community`/`contact` copy for any other implicit light-bearer phrasing.
- [x] 1.2 🤖 Repo-wide case-insensitive search for "light-bearer", "light bearer", "lightbearer" across `content/`, `app/`, `components/`, and `docs/` (excluding `openspec/`, which already reflects the rename) — update every occurrence found to "wavelet"/"wavelets".
- [x] 1.3 🤖 Update `docs/CONTENT_STRATEGY.md`'s words-to-avoid/active-vocabulary list line to swap "light-bearer" for "wavelet", matching the `doctrine-content` delta spec.
- [x] 1.4 🤖 Note in the PR/change summary that the root `CLAUDE.md` "Non-negotiable content rules" section still says "light-bearers or practitioners" and should be updated by the founder directly (outside this change's edit scope per `design.md`).

## 2. Homepage hero restructure

- [x] 2.1 🤖 In `app/page.tsx`, restructure the hero markup into the centered sequence: "Ecclesia Lucis" (name), then "Church of Light" (larger type than the name), then "A faith of equals" (focal statement), all horizontally centered — replacing the current single combined `h1` sentence.
- [x] 2.2 🤖 Keep the existing identity statement (`site.identity`) and "what this is not" disclaimer (`site.whatThisIsNot`) rendered within the hero, below the new centered sequence, preserving REQ-HOME-001 (above-the-fold identity statement + disclaimer).
- [x] 2.3 🤖 Update `content/site.ts` only if copy needs adjusting to fit the new structure (e.g., splitting `tagline` usage) — keep `site.name` ("Ecclesia Lucis") and `site.tagline` ("The Church of Light") as the source for the new sequence rather than hardcoding strings in the component.

## 3. Hero light-source visual

- [x] 3.1 🤖 Add a hero-specific visual treatment in `app/globals.css` (e.g., `.glow-field-hero` extending `.glow-field`) implementing a layered CSS/SVG radial-gradient "light source" composition, per `design.md`'s decision to avoid a canvas/WebGL dependency.
- [x] 3.2 🤖 Add a subtle `transform`/`opacity` drift animation to the hero visual, gated behind `@media (prefers-reduced-motion: no-preference)`, consistent with the existing "Motion respects reduced-motion preference" design-system requirement.
- [x] 3.3 🤖 Verify text-over-visual contrast for the centered name/tagline/statement sequence meets WCAG 2.2 AA at mobile and desktop widths.

## 4. Explorer statement + doctrine teaser section

- [x] 4.1 🤖 Add a new section below the hero in `app/page.tsx` presenting "each an explorer on their own journey" as its own statement, ahead of the existing doctrine-teaser cards (Purpose, Tenets, Practices, Covenant) and the `CtaBanner`.
- [x] 4.2 🤖 Confirm the doctrine-teaser cards and `CtaBanner` still render after this new section, preserving the doctrine-before-conversion page order.

## 5. Iconography / visual-motif foundation

- [x] 5.1 🤖 Document the iconography/visual-motif direction in the design-system layer (e.g., a short note in `app/globals.css` or a new `components/` convention) establishing where shared icons/motifs should live for future pages to draw from — full asset sourcing and page-by-page rollout stays out of scope per `design.md`'s Non-Goals.
- [x] 5.2 🤖 Apply the hero light-source visual (Section 3) as the first concrete instance of this iconography/visual-motif requirement, so `design-system`'s new requirement has a real implementation to point to.

## 6. Verification

- [x] 6.1 🤖 Run the existing build/lint/test commands and fix any failures introduced by the above changes.
- [x] 6.2 🤖 Start the dev server and visually check the homepage hero (desktop + mobile widths, with and without `prefers-reduced-motion`) and the Community page's updated "wavelets" copy, per this project's "verify UI changes in a browser" house rule.
- [x] 6.3 🤖 Re-run the repo-wide "light-bearer" search from task 1.2 to confirm zero remaining occurrences in shipped copy.
