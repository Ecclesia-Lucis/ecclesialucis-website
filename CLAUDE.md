# CLAUDE.md — Ecclesia Lucis Website

This file is project guidance for any Claude Code session working in this directory. Read it before making changes. It is the operating contract for this specific project: `ecclesialucis-website`, the public marketing site for **Ecclesia Lucis ("The Church of Light")**.

## What this project is

The public website at **ecclesialucis.org** — the front door for the Ecclesia Lucis Protocol. Version 1 is an informational, visually striking marketing site: who we are, what we believe, how to practice, and how to find the community. It is **not**:

- The [Ecclesia Lucis Protocol repo](https://github.com/Ecclesia-Lucis/ecclesia-lucis-protocol) itself (the doctrine source of truth — this site *presents* that content, it doesn't replace it).
- [LightPath](../LightPath) — an unrelated gamified personal-development app. Different product, different audience, different stack. Do not conflate the two or share infrastructure unless a future decision explicitly says so.
- A membership platform, donation processor, or video/streaming platform — those are Phase 2+ (see `docs/ROADMAP.md`). V1 does not collect payments or require accounts.

Founder's framing captured 2026-08-13 (source of truth for intent — see `docs/PRD.md` §1 for the fuller capture):

> Modern, compelling, visually stunning. Describe the open-source, sharing doctrine first and foremost — a faith of equals, no leader, each an explorer on their own journey. Secure. Encourages visitors. V1 describes who we are, what we're about, and points toward a community of light-bearers to join. Optimize navigation and design for attraction and conversion, without compromising the "no coercion, no hierarchy" values the protocol itself demands.

## Non-negotiable content rules

The site's copy is downstream of the protocol's own governing documents at the repo root one level up (`../../PURPOSE.md`, `../../TENANTS.md`, `../../COVENANT.md`, `../../PRACTICES.md`, `../../ceremonies/GOVERNANCE.md`). Before writing or editing any user-facing copy:

1. **No authority language.** Never write "leader," "clergy," "follow us," "join and obey," "our teachings require." Per `TENANTS.md` v0.0 and `COVENANT.md`, no individual or institution claims authority to interpret or enforce belief. Community members are referred to as **light-bearers** or **practitioners**, never "followers" or "members under."
2. **No coercion or fear-based persuasion in the conversion funnel.** We are explicitly asked to optimize for attraction and conversion — that must be done through clarity, beauty, and genuine value, never urgency countdowns, guilt copy, fake scarcity, or dark patterns. `COVENANT.md` forbids "coercion, shame, or fear-based persuasion" and this applies to marketing copy as much as doctrine.
3. **Doctrine before conversion.** Information architecture must let a visitor understand Purpose → Tenets → Practices → Covenant *before* any call-to-action to join a community or (later) donate. Don't gate the doctrine behind a signup.
4. **No medical/legal/financial claims.** Per `COVENANT.md`, nothing on the site substitutes for professional medical, legal, or mental health care — practice pages must not imply otherwise.
5. **Ceremonies are witnesses, not credentials.** The "Ordination of the Lightbearer" ceremony (see root `.docx`) is a ceremonial marking, not clergy ordination or a grant of authority — copy must not imply it creates a hierarchy.
6. **Forkable, not proprietary.** The protocol itself is explicitly forkable and free to adapt. Site copy should never imply Ecclesia Lucis "owns" the ideas in a gatekeeping sense, even while the organization owns its own brand, domain, and this codebase.

If a copy decision is ambiguous against these rules, flag it for the founder rather than guessing toward something that reads as authoritative or high-pressure.

## Decided technical direction

See `docs/INFRASTRUCTURE.md` for the full reasoning. Summary:

- **Framework:** Next.js (App Router, TypeScript) — static/ISR marketing site, no backend database needed for v1.
- **Styling:** Tailwind CSS + a small custom design-token layer (see `docs/CONTENT_STRATEGY.md` for brand direction).
- **Hosting:** Vercel (Hobby tier to start; upgrade to Pro before any commercial/donation use — see `docs/INFRASTRUCTURE.md`). Chosen because it's the best-supported target in this environment (dedicated Vercel skills/agents are available) and gives free preview deployments, automatic HTTPS, and a generous free tier for a low-traffic v1 site.
- **Domain:** `ecclesialucis.org` (primary), registered at Porkbun. `.com` and `.life` variants redirect to `.org`. DNS points at Vercel's nameservers (see `docs/INFRASTRUCTURE.md` for exact steps — this requires the founder's Porkbun login).
- **Content:** Doctrine text is authored once in structured content files (MDX or JSON) *derived from* the canonical protocol docs, not copy-pasted ad hoc, so it stays traceable to the source of truth.
- **Community platform:** Discord for v1 (fast, zero cost, matches "no ownership friction" for an MVP). Flagged in `docs/ROADMAP.md` as a deliberate, revisit-later tradeoff against self-hosting (e.g. Discourse) once the community and budget justify owning that layer — consistent with the founder's stated preference to own infrastructure long-term.
- **Analytics:** Privacy-respecting, cookie-consent-free option (e.g. Vercel Analytics or Plausible) — not Google Analytics. Consistent with the "secure and trustworthy" requirement and avoids a cookie-banner UX tax on a site about clarity and calm.

## Working conventions for agents in this repo

- **This is its own git repo**, independent of the parent `ecclesia-lucis-protocol` repo and of `LightPath`, matching the existing org convention (see `application/LightPath`). Do not assume the parent repo's git history or `.gitignore` apply here.
- **Never commit secrets.** `application/LightPath/gcp-sa.json` sitting in plaintext in a sibling project is the cautionary example — don't repeat it. All API keys/tokens live in Vercel Environment Variables or a local untracked `.env.local`, covered by `.gitignore`.
- **Check `docs/ROADMAP.md` before starting work** — it assigns each workstream to an agent type/model and marks what can run in parallel vs. what's on the critical path. Follow that assignment rather than re-deriving scope from scratch.
- **Token/cost discipline:** don't re-read the full protocol doc set on every task — the extracted content files under `content/` (once scaffolded) are the working source for site copy; only go back to the root `.md`/`.docx` files when verifying doctrine fidelity on a content-authoring task specifically.
- **Verify UI changes in a browser** (per house rules) before declaring a frontend task done — screenshot or describe what you actually saw, not just that the build passed.
- **Accessibility and performance are requirements, not stretch goals** — see `docs/PRD.md` §5 for targets (WCAG 2.2 AA, Core Web Vitals budgets).

## Spec-driven development with OpenSpec

This project uses [OpenSpec](https://github.com/Fission-AI/OpenSpec) (`openspec/` + `.claude/commands/opsx/*`, installed 2026-08-13) to formalize how new work gets planned and implemented, and doubles as the founder's practice ground for the workflow ahead of future app projects.

**Workflow:** `/opsx:propose "<idea>"` generates a change folder (`openspec/changes/<name>/proposal.md`, `specs/<capability>/spec.md`, `design.md`, `tasks.md`) → review/edit those artifacts → `/opsx:apply` implements against `tasks.md` → `/opsx:archive` folds the change into `openspec/specs/` (the living baseline) once done. `/opsx:explore` is for open-ended discussion before committing to a proposal.

**Relationship to the existing `docs/` set:** `docs/PRD.md` and `docs/ROADMAP.md` predate OpenSpec adoption and remain the source of truth for overall v1 scope and phasing. Don't treat `openspec/specs/` as authoritative over `docs/` for a given area until a change proposal has actually migrated that area's requirements in — otherwise the two will drift and disagree. Practical rule going forward: **use `/opsx:propose` for each new unit of work from Phase 0 onward** (e.g. "scaffold the Next.js app," "build the home page"), rather than retroactively converting the existing docs wholesale. Individual REQ-IDs from `docs/PRD.md` can be pulled into a proposal's spec as they become relevant to the change at hand.

`openspec/config.yaml` carries a `context` block pointing back at this file and the content rules above — every proposal/spec generated through OpenSpec is meant to inherit those constraints automatically.

## Reference documents

| Doc | Purpose |
|---|---|
| `docs/PRD.md` | Full product requirements (scope, goals, functional/non-functional requirements) |
| `docs/ROADMAP.md` | Phased plan, parallel workstreams, agent assignments |
| `docs/INFRASTRUCTURE.md` | Hosting/domain/DNS/streaming decisions and cost breakdown |
| `docs/DEPENDENCIES.md` | What only the founder (human) can do vs. what an agent can do, and what needs approval first |
| `docs/CONTENT_STRATEGY.md` | Sitemap, doctrine-to-copy mapping, tone/voice rules, brand direction |
| `docs/SECURITY.md` | Security requirements and checklist |

## Open decisions still owned by the founder

These are recommendations, not final calls — see `docs/DEPENDENCIES.md` for the full list:

- Confirm `.org` as primary domain (assumed yes) and what `.com`/`.life` should do (assumed: redirect).
- Confirm Discord as the v1 community platform, or self-host from day one.
- Confirm current EIN / 501(c)(3) status before any "tax-deductible donation" language ships.
- Sign off on visual direction before full build (see `docs/CONTENT_STRATEGY.md` Brand Direction section).
