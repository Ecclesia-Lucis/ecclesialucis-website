# Ecclesia Lucis Website

The public marketing website for **Ecclesia Lucis** ("The Church of Light") — a modern, secure, accessible front door to the [Ecclesia Lucis Protocol](https://github.com/Ecclesia-Lucis/ecclesia-lucis-protocol).

**Status:** 🚀 **v0.1 live in production** (2026-08-14) — Next.js scaffold, design system, and all 6 core pages (Home, Purpose, Tenets, Practices, Covenant, About, Community, Contact) are built and deployed at `ecclesialucis-website.vercel.app`. Pending the founder's review and any revision notes before further work. Not yet at the custom domain — Porkbun DNS cutover is still pending, see `docs/DEPENDENCIES.md`.

## Start here

- **`CLAUDE.md`** — project guidance and content rules for any coding agent (or human) working on this repo. **Read this first in a new session** — it has the current status summary and points everywhere else.
- **`docs/PRD.md`** — full product requirements.
- **`docs/ROADMAP.md`** — phased build plan; Phase 0 and Phase 1 are complete, see current phase status there.
- **`docs/INFRASTRUCTURE.md`** — hosting, domain, and cost decisions.
- **`docs/DEPENDENCIES.md`** — what needs a human (you) vs. what an agent can just do, and current open items.
- **`docs/CONTENT_STRATEGY.md`** — sitemap, doctrine-to-copy mapping, brand direction.
- **`docs/SECURITY.md`** — security requirements and pre-launch checklist (not yet applied — Phase 2 work).
- **`docs/AGENTIC_BUILD.md`** — the unattended propose→implement→deploy pipeline. This is how v0.1 got built, and how the next change should too.
- **`openspec/specs/`** — the current living baseline (site-scaffold, design-system, doctrine-content, marketing-pages), synced from the v0.1 build. Start any new change with `/opsx:propose` against this baseline.

## What this is not

Not [LightPath](../LightPath) (an unrelated app), not the protocol repo itself (this site presents that doctrine, it doesn't replace it).

## Stack (implemented)

Next.js (TypeScript, App Router) + Tailwind CSS, hosted on Vercel with git-integrated deploys. Domain `ecclesialucis.org` via Porkbun DNS — not yet cut over. See `docs/INFRASTRUCTURE.md` for the full reasoning.
