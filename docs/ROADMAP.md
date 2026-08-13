# Roadmap — Ecclesia Lucis Website

**Version:** 1.0 (initial plan)
**Date:** 2026-08-13
**Status:** Phase 0 not yet started — this roadmap is the plan, not a log of work done

This roadmap breaks the project into phases and workstreams, assigns each workstream to an agent type/model, and marks what can run in parallel vs. what's on the critical path. It follows the same batching pattern the org already used successfully in `application/LightPath/plans/roadmap.md`, adapted for a content/marketing site instead of a full-stack app.

## How to use this doc

- Work through phases in order; within a phase, parallel workstreams can be dispatched together.
- "Agent" column names either a built-in Claude Code agent type (`general-purpose`, `Explore`, a `vercel:*` skill/agent) or flags that a task is better done directly by whoever is driving the session (not delegated) — e.g. anything requiring a human login.
- **Token optimization rule:** when dispatching a workstream to a subagent, hand it *only* the specific files it needs (e.g. one doctrine `.md` file for a copy task, not the whole repo) plus a link to this roadmap entry and the relevant `docs/*.md` section. Don't have every agent re-read the full PRD and all doctrine docs if its task only touches one page.
- **Parallelization rule:** workstreams in the same batch have no file overlap by design. If a change turns out to touch a file another parallel workstream also needs, stop and re-sequence rather than racing edits.

---

## Phase 0: Foundation (critical path — must complete before Phase 1)

**Objective:** Get infrastructure, design system, and content architecture in place so page-building can be parallelized in Phase 1.

### Batch 0.1 — can run in parallel, no dependencies

| Workstream | What | Agent | Blocks |
|---|---|---|---|
| 0.1A — Domain & hosting setup | Create Vercel account/project (human login required), connect to GitHub, point Porkbun nameservers at Vercel per `docs/INFRASTRUCTURE.md` §3 | **Human + orchestrator** (needs founder's Vercel/Porkbun login; agent can prepare exact steps/records) | Nothing blocks on this immediately, but production deploy needs it eventually |
| 0.1B — Repo scaffold | `git init`, Next.js + TypeScript + Tailwind scaffold, ESLint/Prettier config, `.gitignore`, base folder structure | `general-purpose` agent (or done directly by orchestrator) | Blocks 0.2 and all of Phase 1 |
| 0.1C — Content extraction | Convert `PURPOSE.md`, `TENANTS.md`, `PRACTICES.md`, `COVENANT.md`, `GOVERNANCE.md` into structured MDX/JSON content files under `content/`, preserving meaning per REQ-CONTENT-001 | `general-purpose` agent, given only the specific source doc + `docs/CONTENT_STRATEGY.md` tone rules | Blocks all doctrine pages in Phase 1 |
| 0.1D — Legal/status confirmation | Confirm current EIN/501(c)(3) status, decide `.com`/`.life` redirect behavior | **Human only** (founder decision). Discord confirmed 2026-08-13 as v1 community platform — this item now only covers legal status + redirect behavior. | Blocks REQ-LEGAL-001 footer copy |

### Batch 0.2 — depends on Batch 0.1

| Workstream | What | Agent | Depends on |
|---|---|---|---|
| 0.2E — Design system | Color tokens, typography scale, spacing, base components (Button, Nav, Card, Section) built in Tailwind, light/dark theme, accessible focus states | `vercel:shadcn` skill + `general-purpose` agent | 0.1B |
| 0.2F — Sitemap & IA finalization | Confirm final page list/nav structure against `docs/PRD.md` REQ-NAV-001 and `docs/CONTENT_STRATEGY.md` | `general-purpose` agent, human sign-off | 0.1C |
| 0.2G — Community platform setup | Create Discord server (or start self-host eval) per 0.1D's decision | **Human** (needs a Discord account per founder's note that they'd "have to set up an account") | 0.1D |

---

## Phase 1: Core Pages (parallel once Phase 0 is done)

**Objective:** Build every page in `docs/PRD.md` REQ-NAV-001.

All workstreams in this batch touch different route files and can run in parallel — dispatch together.

| Workstream | Page(s) | Agent | Depends on |
|---|---|---|---|
| 1.1A — Home | Hero, identity statement, doctrine teaser, primary CTA | `general-purpose` agent + `vercel:nextjs` skill | 0.2E, 0.2F |
| 1.1B — Purpose & Tenets | `/purpose`, `/tenets` | `general-purpose` agent | 0.1C, 0.2E |
| 1.1C — Practices | `/practices` | `general-purpose` agent | 0.1C, 0.2E |
| 1.1D — Covenant & Governance | `/covenant` (safeguards, non-hierarchy statement) | `general-purpose` agent | 0.1C, 0.2E |
| 1.1E — About/FAQ | `/about` — direct answers to "is this a cult," "do I need to believe in god," etc. per REQ-ABOUT-001 | `general-purpose` agent | 0.1C, 0.2E |
| 1.1F — Community & Contact | `/community` (Discord CTA), `/contact` (form or `mailto:`) | `general-purpose` agent | 0.2G, 0.2E |

**Verification step (sequential, after batch):** run the dev server, click through every page in a real browser, check responsive breakpoints and keyboard navigation before calling Phase 1 done — per house rule on verifying UI changes.

---

## Phase 2: Polish & Launch Readiness (parallel)

| Workstream | What | Agent | Depends on |
|---|---|---|---|
| 2.1A — Accessibility audit | axe/Lighthouse pass, manual keyboard-only pass, fix findings against WCAG 2.2 AA | `general-purpose` agent | Phase 1 complete |
| 2.1B — Performance pass | `vercel:performance-optimizer` agent — image optimization, bundle size, Core Web Vitals against `docs/PRD.md` §5.1 budgets | `vercel:performance-optimizer` | Phase 1 complete |
| 2.1C — Security hardening | Apply `docs/SECURITY.md` checklist (headers, CSP, dependency audit) | `general-purpose` agent | Phase 1 complete |
| 2.1D — SEO basics | Metadata, Open Graph images, sitemap.xml, robots.txt, semantic headings | `general-purpose` agent | Phase 1 complete |
| 2.1E — Analytics wiring | Add Vercel Analytics or Plausible per `docs/INFRASTRUCTURE.md` decision | `general-purpose` agent | Phase 1 complete |

**Launch gate (sequential):** all of Phase 2 clear + `docs/PRD.md` §9 release criteria met + founder final approval → promote to production, cut over DNS if not already live.

---

## Phase 3: Launch & Stabilize

- Cut over `ecclesialucis.org` to production (if a staging subdomain was used during build).
- Set up `.com`/`.life` redirects per 0.1D's decision.
- Monitor Vercel analytics/logs for the first week; fix any real-world issues found.
- Founder shares the site.

---

## Phase 4+ (future — not part of this plan, tracked for context only)

Deliberately deferred, revisit as separate roadmaps when prioritized:

- **Video/streaming for the weekly meditation** — Cloudflare Stream recommended (see `docs/INFRASTRUCTURE.md` §5). Needs its own requirements pass (live vs. VOD, access control, cost at real usage).
- **Donations** — needs confirmed legal/EIN status, a payment processor decision, and updated `docs/PRD.md` non-functional requirements (PCI-adjacent concerns even when using a processor that takes on most of that burden).
- **Self-hosted community platform** — if Discord's ephemeral/unowned nature starts to hurt (see `docs/INFRASTRUCTURE.md` §2 tradeoff writeup), migrate to something like Discourse.
- **Member accounts / congregation tooling** — once there's a real weekly-meditation congregation to serve, revisit whether the marketing site needs an authenticated layer at all, or whether that's a separate app (like LightPath is).

---

## Critical Path Summary

```
0.1B (scaffold) ─┬─> 0.2E (design system) ─┬─> Phase 1 (all pages, parallel) ─> Phase 2 (parallel) ─> Phase 3 (launch)
0.1C (content)  ─┘                          │
0.1D (legal/community decision, human) ─────┴─> 0.2G (community setup, human)
0.1A (domain/hosting, human) ──────────────────────────────────────────────────> needed by Phase 3, not earlier
```

The only hard human-blocking steps before Phase 1 can start are **0.1D** (Discord-vs-self-host + legal status decision) and, loosely, **0.1A** (which can lag behind — building doesn't require the domain to be live yet, only launch does).
