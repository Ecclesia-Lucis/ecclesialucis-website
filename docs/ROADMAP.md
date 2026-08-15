# Roadmap — Ecclesia Lucis Website

**Version:** 1.0 (initial plan)
**Date:** 2026-08-13
**Status (updated 2026-08-14):** Phase 0 and Phase 1 complete — built and deployed as a single unattended OpenSpec change (`v0-1-website-build`, now archived at `openspec/changes/archive/2026-08-14-v0-1-website-build/`, specs synced to `openspec/specs/`) via the pipeline in `docs/AGENTIC_BUILD.md`. Live at `ecclesialucis-website.vercel.app`, merged to `main`, pending founder review/revision notes. Phase 2 (Polish & Launch Readiness) has not started. See `docs/DEPENDENCIES.md` for the current open-items list.

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
| 0.1A — Domain & hosting setup | Create Vercel account/project (human login required), connect to GitHub | **Human** | ✅ Done 2026-08-13 — Vercel account + project created and connected to `Ecclesia-Lucis/ecclesialucis-website`. Porkbun DNS cutover (`docs/INFRASTRUCTURE.md` §2) still pending, not required until the site is ready to go live. |
| 0.1B — Repo scaffold | `git init`, Next.js + TypeScript + Tailwind scaffold, ESLint/Prettier config, `.gitignore`, base folder structure | `general-purpose` agent (or done directly by orchestrator) | ✅ Done 2026-08-14 — built unattended via the agentic-build pipeline, see `docs/AGENTIC_BUILD.md` |
| 0.1C — Content extraction | Convert `PURPOSE.md`, `TENANTS.md`, `PRACTICES.md`, `COVENANT.md`, `GOVERNANCE.md` into structured MDX/JSON content files under `content/`, preserving meaning per REQ-CONTENT-001 | `general-purpose` agent, given only the specific source doc + `docs/CONTENT_STRATEGY.md` tone rules | ✅ Done 2026-08-14 — typed TS content modules under `content/`, see `openspec/specs/doctrine-content/spec.md` for the resulting requirements |
| 0.1D — Legal/status confirmation | Confirm current EIN/501(c)(3) status, decide `.com`/`.life` redirect behavior | **Human only** (founder decision). Discord confirmed 2026-08-13 as v1 community platform — this item now only covers legal status + redirect behavior. | Blocks REQ-LEGAL-001 footer copy |

### Batch 0.2 — depends on Batch 0.1

| Workstream | What | Agent | Depends on |
|---|---|---|---|
| 0.2E — Design system | Color tokens, typography scale, spacing, base components (Button, Nav, Card, Section) built in Tailwind, light/dark theme, accessible focus states | `vercel:shadcn` skill + `general-purpose` agent | ✅ Done 2026-08-14 — see `openspec/specs/design-system/spec.md`. Accessible focus states not yet audited — Phase 2. |
| 0.2F — Sitemap & IA finalization | Confirm final page list/nav structure against `docs/PRD.md` REQ-NAV-001 and `docs/CONTENT_STRATEGY.md` | `general-purpose` agent, human sign-off | ✅ Done 2026-08-14 — implemented as designed, pending founder sign-off on the built result |
| 0.2G — Community platform setup | Create Discord server | **Human** | ✅ Done 2026-08-13 — server live, permanent invite https://discord.gg/GCAaeCcpD (see `docs/CONTENT_STRATEGY.md`) |

---

## Phase 1: Core Pages — ✅ Done 2026-08-14

**Objective:** Build every page in `docs/PRD.md` REQ-NAV-001.

All 6 pages were built in a single unattended session (`v0-1-website-build`) rather than as separately-dispatched parallel workstreams — see `docs/AGENTIC_BUILD.md` for why (single-session apply runs are the current pipeline shape; per-page parallel dispatch may be worth revisiting for a future large batch of page work, but wasn't necessary here).

| Workstream | Page(s) | Status |
|---|---|---|
| 1.1A — Home | Hero, identity statement, doctrine teaser, primary CTA | ✅ Done |
| 1.1B — Purpose & Tenets | `/purpose`, `/tenets` | ✅ Done |
| 1.1C — Practices | `/practices` | ✅ Done |
| 1.1D — Covenant & Governance | `/covenant` (safeguards, non-hierarchy statement) | ✅ Done |
| 1.1E — About/FAQ | `/about` — direct answers to "is this a cult," "do I need to believe in god," etc. per REQ-ABOUT-001 | ✅ Done |
| 1.1F — Community & Contact | `/community` (Discord CTA), `/contact` (`mailto:` for v1) | ✅ Done |

Full requirements as actually implemented: `openspec/specs/marketing-pages/spec.md`.

**Verification step:** the GitHub Actions pipeline's own `npm run build`/`lint` gate passed, and the homepage plus all content source files were reviewed for real (non-placeholder) content and doctrine fidelity before merge — see `docs/AGENTIC_BUILD.md`. **Not yet done:** a real-browser click-through pass across responsive breakpoints and keyboard navigation — fold into Phase 2's accessibility audit (2.1A) rather than re-doing separately.

---

## Phase 2: Polish & Launch Readiness — 🔜 next up (not started)

Phase 1 is complete, so Phase 2 is unblocked, but nothing here has been started yet. **Also pending, not part of Phase 2's own scope:** the founder's review of v0.1 itself — expect a revision pass on visual/content details before or alongside this phase (see `docs/CONTENT_STRATEGY.md` Brand Direction: "expect a revision pass once the founder sees it"). Propose each workstream below (or a revision) via `/opsx:propose` individually rather than batching them into one large change — they touch different concerns and don't need to land together.

| Workstream | What | Agent | Depends on |
|---|---|---|---|
| 2.1A — Accessibility audit | axe/Lighthouse pass, manual keyboard-only pass, fix findings against WCAG 2.2 AA | `general-purpose` agent | Phase 1 complete ✅ |
| 2.1B — Performance pass | `vercel:performance-optimizer` agent — image optimization, bundle size, Core Web Vitals against `docs/PRD.md` §5.1 budgets | `vercel:performance-optimizer` | Phase 1 complete ✅ |
| 2.1C — Security hardening | Apply `docs/SECURITY.md` checklist (headers, CSP, dependency audit) | `general-purpose` agent | Phase 1 complete ✅ |
| 2.1D — SEO basics | Metadata, Open Graph images, sitemap.xml, robots.txt, semantic headings | `general-purpose` agent | Phase 1 complete ✅ |
| 2.1E — Analytics wiring | Add Vercel Analytics or Plausible per `docs/INFRASTRUCTURE.md` decision | `general-purpose` agent | Phase 1 complete ✅ |

Note: v0.1 is already deployed to Vercel's own production alias (`ecclesialucis-website.vercel.app`) as of 2026-08-14 — that's a normal `main`-branch promotion, not the "launch" moment below. The **launch gate** is specifically about the custom domain and public announcement.

**Launch gate (sequential):** all of Phase 2 clear + `docs/PRD.md` §9 release criteria met + REQ-LEGAL-001 unblocked (EIN/501(c)(3) status confirmed, `docs/DEPENDENCIES.md` item 6) + founder final approval → cut over Porkbun DNS, announce.

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
0.1B (scaffold) ─┬─> 0.2E (design system) ─┬─> Phase 1 (all pages) ─> Phase 2 (not started) ─> Phase 3 (launch)
0.1C (content)  ─┘                          │        ✅ done 2026-08-14        🔜 next up
0.1D (legal/community decision, human) ─────┴─> 0.2G (community setup, human)
0.1A (domain/hosting, human) ──────────────────────────────────────────────────> needed by Phase 3, not earlier
```

Historical note: the only hard human-blocking steps before Phase 1 could start were **0.1D** (Discord-vs-self-host + legal status decision) and, loosely, **0.1A** — both cleared by 2026-08-13, which is what unblocked the 2026-08-14 build. The current blocking step is **0.1D's legal-status half** (EIN/501(c)(3) confirmation), which still gates the Phase 3 launch gate, not Phase 2 work.
