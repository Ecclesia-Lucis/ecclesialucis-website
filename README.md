# Ecclesia Lucis Website

The public marketing website for **Ecclesia Lucis** ("The Church of Light") — a modern, secure, accessible front door to the [Ecclesia Lucis Protocol](https://github.com/Ecclesia-Lucis/ecclesia-lucis-protocol).

**Status:** 📋 Planning phase — see `docs/` for the full plan. No application code yet; this is the founding document set for the project.

The unattended agentic-build pipeline is live — see `docs/AGENTIC_BUILD.md`.

## Start here

- **`CLAUDE.md`** — project guidance and content rules for any coding agent (or human) working on this repo.
- **`docs/PRD.md`** — full product requirements.
- **`docs/ROADMAP.md`** — phased build plan with agent/task assignments and parallelization.
- **`docs/INFRASTRUCTURE.md`** — hosting, domain, and cost decisions.
- **`docs/DEPENDENCIES.md`** — what needs a human (you) vs. what an agent can just do.
- **`docs/CONTENT_STRATEGY.md`** — sitemap, doctrine-to-copy mapping, brand direction.
- **`docs/SECURITY.md`** — security requirements and pre-launch checklist.

## What this is not

Not [LightPath](../LightPath) (an unrelated app), not the protocol repo itself (this site presents that doctrine, it doesn't replace it), and not yet connected to a live domain or GitHub remote — see `docs/DEPENDENCIES.md` for exactly what's still pending your go-ahead.

## Planned stack

Next.js (TypeScript, App Router) + Tailwind CSS, hosted on Vercel, domain `ecclesialucis.org` via Porkbun DNS. See `docs/INFRASTRUCTURE.md` for the full reasoning.
