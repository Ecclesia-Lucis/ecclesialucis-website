## Context

The current homepage hero (`app/page.tsx`) already uses a `.glow-field` utility (`app/globals.css`) — a static radial-gradient "light in the dark" glow used behind hero-like sections on Home, 404, Community, and `CtaBanner`. It leads with an `Eyebrow` (tagline) and an `h1` combining "A faith of equals, each an explorer on their own journey" as one sentence, followed by the identity statement and "what this is not" disclaimer, then the two CTAs. Community terminology ("light-bearers") lives in `content/connect.ts`, and the canonical vocabulary rule lives in `docs/CONTENT_STRATEGY.md`'s words-to-avoid/active-vocabulary list, which `doctrine-content`'s spec now formalizes.

This touches multiple content files, one component-level CSS pattern, and a sitewide terminology sweep — see proposal.md for motivation.

## Goals / Non-Goals

**Goals:**
- Restructure the hero into the founder's requested centered name → tagline → statement sequence without regressing the existing "identity statement + what-this-is-not above the fold" requirement (`marketing-pages` REQ-HOME-001).
- Land a light-source visual treatment that is cheap to render and animate, reusing/extending the existing `.glow-field` pattern rather than introducing a new rendering technology.
- Complete the "light-bearer" → "wavelet" rename everywhere the term appears in shipped copy and in the vocabulary rule itself, so nothing is left inconsistent.
- Establish the iconography/visual-motif requirement at the design-system level so it's available for this and future changes to draw from.

**Non-Goals:**
- A full "visually stunning v2" execution (illustration set, imagery sourcing/licensing, page-by-page iconography rollout) — this change establishes the design-system requirement and applies a first instance of it (the hero light-source visual); broader rollout is future work per `docs/ROADMAP.md` Phase 2 polish, as noted in the proposal's Impact section.
- A literal black-hole/orbital-mechanics animation — treated as one illustrative example the founder gave, not a firm spec. See Decisions below.
- Updating the root `CLAUDE.md` content-rules wording — flagged in the proposal as a founder follow-up outside this change's scope (that file is project governance, not app content).

## Decisions

**Light-source visual: extend `.glow-field` with a hero-specific variant, not a canvas/WebGL animation.**
The founder's brief ("a light source... image, graphic, or perhaps animation, like a black hole animation") explicitly offers a menu, not a fixed spec. Given this is a static marketing site with Core Web Vitals budgets (`docs/PRD.md` §5) and no existing canvas/WebGL/animation-library dependency in the stack, the design uses a richer CSS/SVG radial-gradient composition (e.g., layered glow + a slow, subtle `transform`/`opacity` drift) as a hero-specific class alongside `.glow-field`, rather than a literal orbital/black-hole simulation. This keeps bundle size and runtime cost near zero and composes with the existing reduced-motion requirement. If the founder wants a literal black-hole-style animation after seeing this, that becomes a follow-up change scoped specifically to it.
*Alternative considered*: a Lottie/canvas animation — rejected for now as unnecessary weight for a "subtle background glow" ask, and it would need a new dependency decision (per `CLAUDE.md`'s marketplace-first rule for new external tooling) that the founder hasn't asked for yet.

**Rename mechanics: rename at the source-of-truth content layer, not per-page string literals.**
"light-bearer(s)" is centralized in `content/connect.ts` (`community.title`) and the vocabulary rule in `docs/CONTENT_STRATEGY.md`. The rename is a find-and-replace at those two locations plus a scan of all `content/*.ts` and `app/**/*.tsx` files for any other literal occurrence, so the term doesn't survive anywhere in shipped copy. `openspec/specs/doctrine-content/spec.md`'s vocabulary requirement is updated via this change's delta spec; the copy files are updated as implementation tasks.

**Hero restructuring: keep identity statement + "what this is not" inside the hero section, below the new centered sequence.**
Rather than moving them into the new lower "explorer" section, they stay within the hero (`<Section as="header">`) so the existing "above the fold" requirement (REQ-HOME-001) continues to hold without needing a spec change to that requirement. They render below the "Ecclesia Lucis / Church of Light / A faith of equals" stack, at their current smaller type scale.

## Risks / Trade-offs

- **[Risk]** A background visual behind large centered headline text risks contrast/legibility issues, especially on mobile widths. → **Mitigation**: keep the visual low-contrast/dark relative to the light-colored headline text (consistent with the existing "light in the dark" dark-mode-first token direction), and verify contrast against WCAG 2.2 AA per `docs/PRD.md` §5 during implementation.
- **[Risk]** Founder may have pictured something closer to a literal animated black hole than a CSS glow, leading to a rejected first pass. → **Mitigation**: the proposal and this design document explicitly frame the animation as illustrative, not mandatory; implementation should preview the treatment for founder sign-off before considering the hero requirement done.
- **[Risk]** Rename sweep misses an occurrence (e.g., inside a longer sentence or a doc file outside `content/`). → **Mitigation**: tasks.md includes an explicit repo-wide grep for "light-bearer"/"light bearer"/"lightbearer" (case-insensitive) as a verification step, not just editing the two known files.

## Open Questions

- Should the hero light-source visual differ from the existing `.glow-field` used on other pages (Community, 404, `CtaBanner`), or should this change also update `.glow-field` itself so all pages get the richer treatment consistently? This change scopes the richer treatment to the homepage hero only; extending it sitewide is a natural Phase 2 follow-up and doesn't block or change this change's specs or tasks.
