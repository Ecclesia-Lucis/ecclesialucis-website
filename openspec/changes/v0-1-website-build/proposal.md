## Why

Phase 0 (Foundation) and Phase 1 (Core Pages) of `docs/ROADMAP.md` have never been built — the repo is planning docs only (`docs/PRD.md`, `docs/CONTENT_STRATEGY.md`, `docs/ROADMAP.md`, `docs/INFRASTRUCTURE.md`). All human-only prerequisites for starting the build are already satisfied (`docs/DEPENDENCIES.md`: Vercel connected, Discord live, brand direction approved, agentic-build pipeline smoke-tested 2026-08-14). This change is the first real build: get a v0.1 live on a Vercel preview URL so the founder has something concrete to react to, per the founder's own framing in `docs/CONTENT_STRATEGY.md` ("expect a revision pass once the founder sees it").

This is designed to run as a single unattended `/opsx:apply` session via `.github/workflows/agentic-build.yml` (no human available mid-run) — see `design.md` for how that constrains sequencing.

## What Changes

- Scaffold a Next.js (App Router, TypeScript) + Tailwind CSS project per `CLAUDE.md`'s decided technical direction and `docs/INFRASTRUCTURE.md`.
- Build a design-token-based design system implementing the "light in the dark" dark-mode-first concept from `docs/CONTENT_STRATEGY.md` Brand Direction, with an equally-polished light mode.
- Extract doctrine content (`../../PURPOSE.md`, `../../TENANTS.md`, `../../PRACTICES.md`, `../../COVENANT.md`, `../../ceremonies/GOVERNANCE.md`) into structured content files per REQ-CONTENT-001/002 and the doctrine→copy mapping in `docs/CONTENT_STRATEGY.md`.
- Build all 6 core pages from the `docs/CONTENT_STRATEGY.md` sitemap and `docs/PRD.md` REQ-NAV-001: Home, Purpose & Tenets, Practices, Covenant (folding in Governance per the content mapping), About/FAQ, Community & Contact.
- Wire up the primary conversion CTA (Discord invite) per REQ-CTA-001/002/003 and the "Primary conversion path" in `docs/CONTENT_STRATEGY.md`.

**Explicitly not in this change** (per `docs/DEPENDENCIES.md`, human-only or later-phase): Vercel/GitHub account setup (already done), Porkbun DNS cutover, final REQ-LEGAL-001 footer copy (EIN status still unconfirmed — ships as an explicit `TODO` placeholder, not invented language), analytics wiring, Lighthouse CI gate, security header hardening. Those are separate later changes.

## Capabilities

### New Capabilities

- `site-scaffold`: the Next.js/TypeScript/Tailwind application shell — root layout, persistent navigation (REQ-NAV-001), footer, responsive breakpoints (REQ-RESP-001), light/dark theme switching (REQ-THEME-001).
- `design-system`: design tokens (color, type scale, spacing), base components (Button, Nav, Card, Section), the dark-mode-first "light in the dark" visual concept from `docs/CONTENT_STRATEGY.md`.
- `doctrine-content`: structured content files derived from the doctrine source docs, kept separate from layout/component code per `CLAUDE.md` §"Maintainability" and REQ-CONTENT-001/002.
- `marketing-pages`: the 6 v1 pages themselves and their content, per the sitemap in `docs/CONTENT_STRATEGY.md` and REQ-HOME-001, REQ-CTA-001/002/003, REQ-ABOUT-001, REQ-CONTACT-001, REQ-LEGAL-001 (placeholder only).

### Modified Capabilities

(none — first build, nothing pre-existing to modify)

## Impact

- Entire `application/ecclesialucis-website/` app tree: `package.json`, `next.config`, `tailwind.config`, `app/` routes, `content/` files, `components/`.
- No backend, database, or new external API integrations (matches `docs/PRD.md` §6.3/6.4 — none required for v1).
- No changes to the parent protocol repo or `LightPath`.
