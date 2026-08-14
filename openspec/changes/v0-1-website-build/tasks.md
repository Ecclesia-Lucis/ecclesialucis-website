## 1. Scaffold (site-scaffold)

- [x] 1.1 Agent-can-do: initialize a Next.js (App Router, TypeScript) project in this directory with `create-next-app` or equivalent manual setup; add Tailwind CSS.
- [x] 1.2 Agent-can-do: configure ESLint + Prettier per `CLAUDE.md` §"Maintainability."
- [x] 1.3 Agent-can-do: build root layout (`app/layout.tsx`) with persistent Nav and Footer per the `site-scaffold` spec.
- [x] 1.4 Agent-can-do: implement responsive behavior (360px–2560px) and light/dark theme via Tailwind `dark:` variant, defaulting to `prefers-color-scheme`.
- [x] 1.5 Agent-can-do: footer includes links to Purpose/Tenets/Practices/Covenant/Community, the protocol GitHub repo, and an explicit legal-status placeholder (not asserted nonprofit language) per the `site-scaffold` spec.

## 2. Design system (design-system)

- [x] 2.1 Agent-can-do: define design tokens (color, type scale, spacing) as the single source of truth, consumed by Tailwind config, implementing the "light in the dark" concept from `docs/CONTENT_STRATEGY.md`.
- [x] 2.2 Agent-can-do: build base components: Button, Card, Section, Nav — used by later page tasks, not built speculatively beyond what pages in section 5 actually need.
- [x] 2.3 Agent-can-do: ensure any decorative motion respects `prefers-reduced-motion`.

## 3. Doctrine content extraction (doctrine-content)

- [x] 3.1 Agent-can-do: read `../../PURPOSE.md`, `../../TENANTS.md`, `../../PRACTICES.md`, `../../COVENANT.md`, `../../ceremonies/GOVERNANCE.md`.
- [x] 3.2 Agent-can-do: create typed content modules under `content/` (e.g. `content/purpose.ts`, `content/tenets.ts`, `content/practices.ts`, `content/covenant.ts`) per `design.md`'s content architecture decision — faithful to source meaning, scannable structure, vocabulary rules from `docs/CONTENT_STRATEGY.md` applied.
- [x] 3.3 Agent-can-do: cross-check extracted content against the `doctrine-content` spec scenarios (Purpose throughline preserved, Tenets marked provisional, no words-to-avoid) before moving to page-building.

## 4. Homepage (marketing-pages)

- [x] 4.1 Agent-can-do: build `/` with identity statement + "what this is not" above the fold (REQ-HOME-001), doctrine teaser, single primary CTA to Community.

## 5. Remaining core pages (marketing-pages)

- [x] 5.1 Agent-can-do: build `/purpose` from `content/purpose.ts`.
- [x] 5.2 Agent-can-do: build `/tenets` from `content/tenets.ts`, rendered as scannable cards per the versioned tenets.
- [x] 5.3 Agent-can-do: build `/practices` from `content/practices.ts`, 8 sections, "tools not tests" framing prominent.
- [x] 5.4 Agent-can-do: build `/covenant` from `content/covenant.ts`, folding in governance/non-hierarchy content, trust-building pull-quote near the top per `docs/CONTENT_STRATEGY.md`.
- [x] 5.5 Agent-can-do: build `/about` answering all four required FAQ questions (REQ-ABOUT-001).
- [x] 5.6 Agent-can-do: build `/community` with the Discord invite (https://discord.gg/GCAaeCcpD), low-pressure framing.
- [x] 5.7 Agent-can-do: build `/contact` with a `mailto:` link (no live form/email-API integration in this change per `design.md` non-goals).
- [x] 5.8 Agent-can-do: apply the single consistent primary-CTA pattern (shared Button component, non-urgency copy) across all pages that need one.

## 6. Verification

- [x] 6.1 Agent-can-do: run `npm run build` and `npm run lint`; fix any errors before finishing — the workflow's own verify step will fail the PR otherwise.
- [x] 6.2 Agent-can-do: spot-check each of the 6 routes renders real content (not a 404 or stub) by reading the built output/route files.
- [x] 6.3 Agent-can-do: confirm no words from the words-to-avoid list appear anywhere in `content/` or page files (`grep` is sufficient).
