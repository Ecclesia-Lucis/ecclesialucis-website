## Context

See `proposal.md` for motivation. Key constraint on this specific change: it is meant to run as a single unattended `/opsx:apply` session via `.github/workflows/agentic-build.yml` (`gh workflow run agentic-build.yml -f change_name=v0-1-website-build -f max_turns=250 -f max_budget_usd=60 -f timeout_minutes=120`) — no human is available to answer questions or fix problems mid-run. Every ambiguity that would materially change scope must be resolved here, not deferred to implementation-time judgment calls that could go wrong unsupervised.

Tech stack is already decided (`CLAUDE.md`, `docs/INFRASTRUCTURE.md`): Next.js App Router + TypeScript, Tailwind CSS, no backend/database.

## Goals / Non-Goals

**Goals:**
- A working `npm run build` and `npm run lint` pass at the end of the run — the workflow's verify step will fail the PR otherwise.
- All 6 routes render real content derived faithfully from the doctrine docs, not lorem-ipsum placeholders.
- A design-token layer clean enough to survive a founder revision pass without a rewrite.

**Non-Goals (deferred to later changes, do not attempt here):**
- Analytics wiring, Lighthouse CI gate, security headers (`docs/SECURITY.md` checklist) — separate changes.
- Final legal-status footer copy (EIN unconfirmed) — ships as an explicit placeholder per the `site-scaffold` spec.
- Contact form as a live email-sending endpoint — use a `mailto:` link for v1 to avoid needing a new API key/secret mid-run; a live form with spam protection is a later change once an email-sending provider is chosen.
- Photography — explicitly deferred to v2 per `docs/CONTENT_STRATEGY.md`; use the cosmic/gradient/light-motif treatment only.

## Decisions

**Content architecture:** doctrine content as TypeScript modules under `content/` (e.g. `content/purpose.ts`, `content/tenets.ts`) exporting typed objects, rather than MDX. Rationale: no MDX toolchain to configure in a single unattended run, and typed content objects are easier for the build step to catch content/shape errors at compile time than MDX would be — reduces risk of an unattended run producing a build that silently renders wrong. MDX can be introduced later if a non-technical content editing workflow becomes a real need (it isn't for v1 per `docs/PRD.md` §1.2 explicit out-of-scope).

**Design tokens:** a single `lib/tokens.ts` (or `tailwind.config.ts` `theme.extend`) as the source of truth for color/type/spacing, consumed by Tailwind's config rather than duplicated. Dark theme is the default (`docs/CONTENT_STRATEGY.md`: dark-mode-first), light theme via Tailwind's `dark:` variant strategy (class-based, driven by `prefers-color-scheme` with no persisted override needed for v1 — no accounts/localStorage complexity required).

**Page routing:** `/purpose` and `/tenets` as two distinct routes (not combined into one), matching `docs/CONTENT_STRATEGY.md`'s literal sitemap (`/purpose`, `/tenets` listed separately) even though the proposal groups them as one workstream — the proposal's grouping is about build sequencing, not the URL structure. `/covenant` folds in governance content directly on that page (short enough per `docs/CONTENT_STRATEGY.md`) rather than a separate `/governance` route. Community and Contact: `/community` and `/contact` as two distinct routes, matching the sitemap.

**Component scope:** minimum viable base components — Button, Nav, Footer, Card, Section — built as needed by the actual pages, not a speculative full library. Don't build components no page in this change actually uses.

## Risks / Trade-offs

- [Risk] An unattended run hits a build error it can't self-resolve within the turn budget → [Mitigation] the workflow's verify step (`npm run build`) will fail the job visibly rather than silently merging broken code; the PR simply won't open cleanly and the next session diagnoses from the run log, same as the smoke test's failures were diagnosed.
- [Risk] Doctrine content extraction subtly drifts from source meaning with no human catching it in the moment → [Mitigation] `doctrine-content` spec requirements are scenario-testable against the actual source files; treat any REQ-CONTENT-001 scenario failure as a real bug to flag on the PR, not a nitpick.
- [Risk] Turn budget (250) or USD cap ($60) proves too small for 6 pages + scaffold + design system in one session → [Mitigation] these are passed as `workflow_dispatch` inputs specifically so they can be raised on a retry without editing the workflow file; if it runs out mid-way, whatever was committed before the cap is still a real, reviewable partial PR, not lost work.

## Migration Plan

N/A — first build, nothing to migrate from. Deploys to a Vercel preview URL on the PR branch; founder reviews and merges to promote to production. No rollback concern beyond Vercel's standard instant-rollback (`docs/PRD.md` §5.4).
