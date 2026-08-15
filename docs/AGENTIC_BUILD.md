# Agentic Build — unattended propose → implement → deploy

**Date:** 2026-08-14. Documents the architecture for triggering a real build of this site without the founder's laptop needing to be open or on at any point after the trigger is pressed. Written to be copy-pasted into future projects as the standard pattern — see "Reusing this for other projects" at the bottom.

## Why this exists

The founder's laptop is a physical routine they open and close often — the build pipeline must not depend on it staying open mid-run. Two approaches were evaluated and rejected before landing here; recorded so a future session doesn't re-spend the budget re-discovering this:

1. **Claude Code cloud routines (RemoteTrigger/CCR)** — Anthropic's own hosted "run Claude Code in the cloud" product. Its GitHub connector reliably failed to push (`403 Resource not accessible by integration`) even with a locally-verified-valid credential, across a full day of testing on a prior project. Platform-level limitation, not a config mistake. Not used here.
2. **Subscription (OAuth token) auth for CI** — technically supported and officially sanctioned by Anthropic (`claude setup-token` → `CLAUDE_CODE_OAUTH_TOKEN`, works with Pro/Max/Team/Enterprise), but per Anthropic's own docs it draws from the *same* weekly/5-hour usage pool as interactive Claude Code sessions, and is tied to the individual who generated it (not reusable as a clean org-wide secret). Fine for casual/manual use later, but the wrong default for something meant to run repeatedly and predictably alongside day-to-day interactive work.

## The architecture: GitHub Actions + a metered API key

Nothing here uses Anthropic's own cloud infrastructure. It's a standard CI pipeline that happens to call Claude:

| Piece | What | Notes |
|---|---|---|
| **Trigger** | `workflow_dispatch` (manual "Run workflow" button) | Deliberate, explicit "go" — firable from the GitHub web UI, the GitHub mobile app, or `gh workflow run` from any machine. No dependency on any specific device. |
| **Compute** | GitHub-hosted Actions runner (`ubuntu-latest`) | Ephemeral, free at this scale (2,000 min/month private repo allowance; this repo may go public, which is unlimited). No VM to provision or patch. |
| **Claude auth** | `ANTHROPIC_API_KEY` repo secret | Pay-per-token, billed via the Anthropic Console — completely separate from any Claude.ai subscription. Never touches interactive usage limits. |
| **Git auth** | The workflow's own default `GITHUB_TOKEN` | Plain `git commit`/`git push`/`gh pr create` — no Claude-branded GitHub App involved in git operations at all. |
| **Deploy** | Vercel's existing git integration (see `docs/INFRASTRUCTURE.md`) | Already connected; any pushed branch gets an automatic preview deployment, `main` gets production. No new deploy step needed. |

## The end-to-end flow

1. **Propose** (interactive, laptop open — this step is expected to need you): run `/opsx:propose "<description>"` in a normal Claude Code session. Generates `openspec/changes/<name>/{proposal.md,specs/**,design.md,tasks.md}`.
2. **Review** (interactive): read the generated artifacts, edit anything that needs it, per the existing OpenSpec workflow in `../CLAUDE.md`.
3. **Commit the approved change folder** to `main` — this is just planning docs, not code, low risk.
4. **Trigger the build** — from GitHub's web UI, GitHub mobile, or `gh workflow run agentic-build.yml -f change_name=<name>`. Laptop can be closed the instant this fires.
5. **Unattended**, on GitHub's infrastructure: the runner installs the Claude Code CLI and the OpenSpec CLI, runs `/opsx:apply <name>` headlessly (`--permission-mode acceptEdits`, capped `--max-turns 60 --max-budget-usd 15`), verifies the build (`npm run build`/`npm run lint` once the app is scaffolded), then commits to a branch and opens a PR using the workflow's own `GITHUB_TOKEN`.
6. **Vercel** picks up the PR branch push automatically and builds a preview URL — check it from any browser, including a phone, no laptop needed.
7. **Merge** the PR (web or mobile) when satisfied → Vercel promotes to production.

The workflow file is `.github/workflows/agentic-build.yml`.

## One-time setup (human-only)

1. Create an API key in the [Claude Console](https://console.anthropic.com) (separate from any claude.ai subscription login).
2. Add it as a repository secret. The GitHub web UI path (Settings → Secrets and variables → Actions → New repository secret) may not be where you expect depending on your view/permissions — the reliable path, confirmed working here, is the CLI, run in your own terminal so the key never touches a chat transcript:
   ```
   gh secret set ANTHROPIC_API_KEY --repo Ecclesia-Lucis/ecclesialucis-website
   ```
   Paste the key **directly from the Console into the terminal**. Do not stage it through a notes app first — see `LESSONS_LEARNED.md` item 3, a real failure caused by exactly that.
3. Enable **"Allow GitHub Actions to create and approve pull requests"** — off by default on a new repo, and the workflow's PR-creation step will fail without it. Set via API rather than hunting the UI:
   ```
   gh api -X PUT repos/Ecclesia-Lucis/ecclesialucis-website/actions/permissions/workflow \
     -f default_workflow_permissions=read -F can_approve_pull_request_reviews=true
   ```
4. Nothing else — GitHub Actions is already enabled by default on a new repo, and Vercel's git integration is already connected (`docs/DEPENDENCIES.md` item 1).

## Cost model

- **GitHub Actions:** ~$0 — a build run is minutes, well inside the free tier.
- **Anthropic API:** metered, hard-capped per run at `--max-budget-usd 15`. A full feature-sized change is likely single-digit dollars; a full site scaffold was estimated at $5–30 (see prior architecture discussion — not yet measured against a real run).
- **Vercel:** $0 (Hobby tier, already active).

## Before trusting it with something you care about

Run it once against a trivial, low-risk OpenSpec change first (e.g., a copy tweak) and confirm the PR and preview actually appear, before pointing it at anything substantial. This is the same "30-second smoke test" principle that would have saved a wasted day on the cloud-routines dead end — verify the pipe works before pouring something expensive through it.

## First real build: v0.1 (2026-08-14)

`workflow_dispatch` now accepts `max_turns`, `max_budget_usd`, and `timeout_minutes` inputs (defaults 60/$15/45min, sized for small changes). The v0.1 build (`v0-1-website-build`: full Next.js scaffold, design system, all 6 core pages) was run with `max_turns=250 max_budget_usd=60 timeout_minutes=120` — raise these per-run for anything bigger than a small change, e.g.:
```
gh workflow run agentic-build.yml -f change_name=<name> -f max_turns=250 -f max_budget_usd=60 -f timeout_minutes=120
```

The GitHub Actions build itself succeeded cleanly (39 files, real content, `npm run build`/`lint` passed). The Vercel deployment on the resulting PR then failed separately with `No Output Directory named "public" found` — the Vercel project's `framework` field was `null` (it was created 2026-08-13 before any app code existed to auto-detect from) and defaulted to expecting a static output dir. Fixed by adding `vercel.json` with `{"framework": "nextjs"}` directly to the PR branch — no dashboard visit needed, and this file should stay in the repo going forward so it can never regress. See `../../../agentic-project-framework/LESSONS_LEARNED.md` items 9–10 for the full writeup (including a false-alarm `gh run watch` network blip that looked like a failure but wasn't).

**Outcome:** homepage and full content source reviewed for real (non-placeholder) content and doctrine fidelity, [PR #2](https://github.com/Ecclesia-Lucis/ecclesialucis-website/pull/2) squash-merged to `main`, production deploy confirmed `READY` at `ecclesialucis-website.vercel.app`. The OpenSpec change was archived (`openspec/changes/archive/2026-08-14-v0-1-website-build/`) and its 4 capability specs synced into `openspec/specs/` as the current baseline — the next `/opsx:propose` should build against that baseline. The smoke-test change's PR (#1) was closed unmerged once superseded (its own trivial README edit never landed, but its purpose — proving the pipeline — is fully captured here and in `LESSONS_LEARNED.md`).

## Smoke test results (2026-08-14)

Ran the full loop against a trivial change (`smoke-test-readme-note` — a one-sentence README addition). Confirmed end-to-end: `/opsx:propose` → review → commit → `workflow_dispatch` → headless `/opsx:apply` on a GitHub-hosted runner → verified → committed → [PR #1](https://github.com/Ecclesia-Lucis/ecclesialucis-website/pull/1) opened → Vercel preview built successfully. Full detail and the gotchas hit along the way (invalid-key, PR-permission block, non-idempotent branch) are in `LESSONS_LEARNED.md` at the framework level (`../../../agentic-project-framework/LESSONS_LEARNED.md`) — the fixes are already folded into steps 2–3 above and into `.github/workflows/agentic-build.yml`'s idempotent branch creation.

## Reusing this for other projects

This project is single-project scope for now (per founder decision, 2026-08-14). When a second project needs the same pipeline:

- Copy `.github/workflows/agentic-build.yml` into the new repo (or convert this into an [org-level reusable workflow](https://docs.github.com/en/actions/using-workflows/reusing-workflows) once there are 2+ consumers, so there's one file to maintain instead of N copies).
- Promote `ANTHROPIC_API_KEY` from a repo secret to an **organization-level** Actions secret (Organization Settings → Secrets and variables → Actions), so each new repo inherits it instead of needing its own copy. This is Anthropic's own recommended pattern for a secret shared across repos — an OAuth token can't do this cleanly since it's tied to one person's subscription.
- Everything else (trigger shape, apply step, verify step, PR step) is project-agnostic and should work unchanged.
