# Dependencies — Who Does What

This is the single source of truth for "can an agent just do this, or does it need you." Organized so a future session can scan it and know exactly what's still blocking.

## Legend
- 🧑 **Human-only** — requires your login, your judgment call, or your money. No agent can do this for you.
- 🤖 **Agent-can-do** — an agent can just do this once the relevant human-only prerequisite is met, no need to ask again.
- ⏳ **Needs your go-ahead first** — technically an agent *could* do this, but it's visible/hard-to-reverse (creates a public repo, spends money, pushes to a shared remote) so it should wait for an explicit "yes, go" from you.

---

## Accounts & Access (human-only)

| # | What | Why it's human-only | Status |
|---|---|---|---|
| 1 | **Vercel account + project** — sign up/log in, import `Ecclesia-Lucis/ecclesialucis-website` from GitHub | Needs your credentials; ties billing to you | ✅ **Done 2026-08-13** — Vercel account and project created. Git-integrated deploys should now trigger automatically on push to `main` once the repo has app code. No Vercel API token has been provided or is needed for Phase 0/1 build work (see `docs/INFRASTRUCTURE.md`). |
| 2 | **Porkbun login** — to change nameservers for `ecclesialucis.org`/`.com`/`.life` | Registrar account, your credentials | You already have this (domains registered). Still pending — do this once the site is far enough along to be worth pointing the live domain at (see `docs/INFRASTRUCTURE.md` §2). Not required for Phase 0/1 build work. |
| 3 | **Discord account + server creation** | Needs a personal/organizational Discord account, which you noted you'd have to set up | ✅ **Done 2026-08-13** — server created, permanent invite: **https://discord.gg/GCAaeCcpD**. Use this URL for the `/community` page CTA and footer (Workstream 1.1F in `docs/ROADMAP.md`). |
| 4 | **GitHub org access confirmation** — this session is authenticated as the `Ecclesia-Lucis` GitHub org already (via `gh`), so repo creation is technically possible without new login, but see ⏳ item below | N/A — already available | Available |
| 5 | **Email for `hello@ecclesialucis.org`** — set up Porkbun forwarding or Google Workspace | Registrar/Google account access | Not yet set up |
| 6 | **Legal/EIN/501(c)(3) status confirmation** | Only you know the actual current status of the EIN application (`How_to_Apply_for_EIN_Ecclesia_Lucis.docx` exists but its outcome isn't in this repo) — this gates any "tax-deductible donation" language and the footer's legal-status statement | **Blocking REQ-LEGAL-001** in `docs/PRD.md` |
| 7 | **Anthropic Console API key** — for the unattended build pipeline in `docs/AGENTIC_BUILD.md`, stored as the `ANTHROPIC_API_KEY` repo secret | Needs your Console login and billing | ✅ **Done 2026-08-14** — set via `gh secret set` (the web UI path wasn't findable; see `docs/AGENTIC_BUILD.md` setup steps). First key was corrupted by pasting through an Apple Notes intermediate step — see `LESSONS_LEARNED.md` item 3 in the framework folder — replaced with a clean second key, `ecclesia-web-key`. |
| 8 | **"Allow GitHub Actions to create and approve pull requests"** repo setting | Off by default; gates whether the pipeline's `GITHUB_TOKEN` can open a PR at all | ✅ **Done 2026-08-14** — enabled via `gh api -X PUT .../actions/permissions/workflow`, not the UI. See `docs/AGENTIC_BUILD.md`. |

## Decisions (human judgment, agent can prep options but shouldn't pick for you)

| # | Decision | Agent's recommendation | Your call |
|---|---|---|---|
| 1 | Discord vs. self-hosted community platform for v1 | Discord for v1 (free, fast, proven at your scale); revisit self-hosting once the community outgrows ~150-200 active members or ephemeral chat starts to feel like a real loss, given your "own the platform" instinct | ✅ **Confirmed 2026-08-13: Discord for v1** |
| 2 | `.com` / `.life` behavior | Redirect both to `.org` | Reasonable default, confirm |
| 3 | Brand assets — are `assets/brand/*.png` (copied from the repo root) final logos, or AI-generated placeholders that need real design work? | Treat as placeholders unless you say otherwise — they read as AI-generated drafts | Still **open** — treat as placeholder/moodboard input only, don't treat as final production logos |
| 4 | Visual/brand direction (palette, typography, tone) | Proposal in `docs/CONTENT_STRATEGY.md` | ✅ **Approved 2026-08-13** — founder: "sounds ok... go with your suggestion from a design aesthetic." Proceed on agent intuition/judgment within that proposal. Founder wants to be able to request changes after seeing it — treat v1 visual execution as a strong first draft, not an unquestionable final, and keep it easy to iterate on (clean design-token file, not one-off hardcoded styles). **Photography is explicitly deferred to v2** — v1 imagery stays in the cosmic/gradient/light-motif treatment described in `docs/CONTENT_STRATEGY.md`, no stock or real photography yet. |
| 5 | Analytics tool | Vercel Analytics (free, cookieless, zero setup) | Reasonable default, confirm |

## Actions needing your explicit go-ahead before an agent does them (⏳)

| # | Action | Why it's flagged, not just done |
|---|---|---|
| 1 | Create the `Ecclesia-Lucis/ecclesialucis-website` GitHub repo and push this project's code | Creates something visible under your org; low risk but a shared-state action per house rules — say the word and it's a one-command task |
| 2 | Create the actual Vercel project and connect it to the repo | Ties your Vercel account/billing to this project |
| 3 | Change Porkbun nameservers | Hard-to-reverse-ish (DNS propagation delay) and affects your live domain — you'll do this step yourself with the exact instructions in `docs/INFRASTRUCTURE.md` §2, or explicitly hand over Porkbun access |
| 4 | Publish/launch the site to production at `ecclesialucis.org` | Public-facing, should be a deliberate "yes, launch" moment, not an automatic last step of a build task |

## What an agent can already do, right now, no further permission needed

- Scaffold the Next.js app, write components, write page content drafts, run `npm`/build/lint/test locally.
- Draft copy for every page, staying inside the content rules in `CLAUDE.md`.
- Write/update any file inside `application/ecclesialucis-website/`.
- `git init` and commit locally within this project's own repo (local history only, no remote push without ⏳ sign-off above).
- Research and document infra options (already done — see `docs/INFRASTRUCTURE.md`).

## Open items summary (copy-paste checklist for you)

- [x] Decide: Discord vs. self-host for v1 community — **Discord confirmed 2026-08-13**
- [x] GitHub repo created and pushed — **done 2026-08-13**
- [x] Create Vercel account + project, connect to `Ecclesia-Lucis/ecclesialucis-website` — **done 2026-08-13**
- [x] Create the Discord server for the community — **done 2026-08-13**, invite: https://discord.gg/GCAaeCcpD
- [x] Review and approve `docs/CONTENT_STRATEGY.md` brand direction before full build begins — **approved 2026-08-13**, agent has latitude, expect a revision pass after founder reviews the result
- [x] Create Anthropic Console API key and add as `ANTHROPIC_API_KEY` repo secret — **done 2026-08-14**
- [x] Enable GitHub Actions PR-creation permission — **done 2026-08-14**
- [x] Smoke-test the agentic-build pipeline end to end — **done 2026-08-14**, see `docs/AGENTIC_BUILD.md` "Smoke test results"
- [x] Build v0.1 (Phase 0 + Phase 1: scaffold, design system, all 6 core pages) — **done 2026-08-14**, unattended via the agentic-build pipeline, see [PR #2](https://github.com/Ecclesia-Lucis/ecclesialucis-website/pull/2) (merged, squash)
- [x] Review PR #2, merge, confirm production deploy — **done 2026-08-14**, live at `ecclesialucis-website.vercel.app` (`readyState: READY`)
- [x] Archive the `v0-1-website-build` OpenSpec change, sync specs to `openspec/specs/` — **done 2026-08-14**, see `openspec/changes/archive/2026-08-14-v0-1-website-build/`
- [ ] **Founder review of v0.1** — visit the live preview, raise any revision notes as new `/opsx:propose` changes (expected per `docs/CONTENT_STRATEGY.md` Brand Direction — treat v0.1 as a strong first draft, not final)
- [ ] Confirm current EIN/501(c)(3) status (affects footer + any future donation copy) — still blocking REQ-LEGAL-001 and the Phase 3 launch gate
- [ ] Set up Porkbun DNS once the site is ready to go live (`docs/INFRASTRUCTURE.md` §2)
- [ ] Confirm brand assets (`assets/brand/*.png`) are placeholders vs. final
- [ ] Bring real photography into the site — **explicitly deferred to v2**, not blocking v1
- [ ] Phase 2 (Polish & Launch Readiness): accessibility audit, performance pass, security hardening, SEO basics, analytics wiring — see `docs/ROADMAP.md`, not started
