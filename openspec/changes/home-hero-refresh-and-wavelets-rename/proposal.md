## Why

The founder reviewed the live v0.1 site (`ecclesialucis-website.vercel.app`) and asked for two things: a homepage hero that leads with identity (name → meaning → core statement) with stronger visual presence, and a replacement for "light-bearer(s)" as the term for community members, since it doubles as a synonym for Lucifer — an unintended and unwanted association for a faith centered on light.

## What Changes

- Rebuild the homepage hero into a centered, vertically stacked sequence: **"Ecclesia Lucis"** (name) → **"Church of Light"** (larger, explains the name) → **"A faith of equals"** (the singular focal statement, styled prominently), backed by a light-source visual treatment (image, graphic, or subtle animation) that evokes light against the material universe — decorative only, must respect `prefers-reduced-motion` per the existing design-system requirement.
- Move "each an explorer on their own journey" and the doctrine teasers (Purpose, Tenets, Practices, Covenant) into their own section below the hero, continuing into the existing "find community" CTA — the hero itself narrows to name, meaning, and the "faith of equals" statement.
- Add a design-system direction for iconography and visual motifs to be used more broadly across pages, so v2 reads as more visually rich than v1's mostly-typographic layout. This proposal establishes the requirement and applies it to the homepage hero treatment; further page-by-page rollout is expected to continue as follow-up changes (see `docs/ROADMAP.md` Phase 2 polish) rather than landing all at once here.
- Rename **"light-bearer(s)" → "wavelet(s)"** everywhere it appears in site copy and the doctrine-content active-vocabulary list, per the founder's explicit branding decision.

## Capabilities

### New Capabilities
_None — all changes are requirement-level modifications to existing capabilities._

### Modified Capabilities
- `marketing-pages`: homepage hero requirement changes to the centered name → tagline → "faith of equals" sequence with a light-source visual; doctrine-teaser/explorer copy moves to its own section; Community page requirement updated to use "wavelet(s)" instead of "light-bearer(s)".
- `design-system`: adds a requirement for a hero light-source visual treatment (image/graphic/animation, reduced-motion compliant) and a requirement establishing iconography/visual motifs as part of the system's visual language.
- `doctrine-content`: active-vocabulary list requirement updated — "light-bearer" replaced by "wavelet" as the term for community members, enforced consistently across all doctrine and marketing copy.

## Impact

- `app/page.tsx` — hero markup restructured into the new stacked sequence plus a new section for the explorer/doctrine-teaser content.
- `content/site.ts` — hero-related copy fields (identity/tagline usage) reviewed against the new hero structure.
- `content/connect.ts` — `community.title` ("A community of light-bearers") and any other "light-bearer" occurrences updated to "wavelet".
- `docs/CONTENT_STRATEGY.md` — words-to-avoid/active-vocabulary list updated to swap "light-bearer" for "wavelet" (tracked here since `doctrine-content`'s spec formally owns this rule going forward; the founder should also update the corresponding line in the root `CLAUDE.md` "Non-negotiable content rules" section separately, since that file is project governance rather than app content in scope for this change).
- No changes to routes, data model, or the Discord/contact integrations.
