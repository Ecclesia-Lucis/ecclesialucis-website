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
5. **Unattended**, on GitHub's infrastructure: the runner installs the Claude Code CLI, runs `/opsx:apply <name>` headlessly (`--permission-mode acceptEdits`, capped `--max-turns 60 --max-budget-usd 15`), verifies the build (`npm run build`/`npm run lint` once the app is scaffolded), then commits to a branch and opens a PR using the workflow's own `GITHUB_TOKEN`.
6. **Vercel** picks up the PR branch push automatically and builds a preview URL — check it from any browser, including a phone, no laptop needed.
7. **Merge** the PR (web or mobile) when satisfied → Vercel promotes to production.

The workflow file is `.github/workflows/agentic-build.yml`.

## One-time setup (human-only)

1. Create an API key in the [Claude Console](https://console.anthropic.com) (separate from any claude.ai subscription login).
2. Add it as a repository secret: repo Settings → Secrets and variables → Actions → New repository secret → name `ANTHROPIC_API_KEY`.
3. Nothing else — GitHub Actions is already enabled by default on a new repo, and Vercel's git integration is already connected (`docs/DEPENDENCIES.md` item 1).

## Cost model

- **GitHub Actions:** ~$0 — a build run is minutes, well inside the free tier.
- **Anthropic API:** metered, hard-capped per run at `--max-budget-usd 15`. A full feature-sized change is likely single-digit dollars; a full site scaffold was estimated at $5–30 (see prior architecture discussion — not yet measured against a real run).
- **Vercel:** $0 (Hobby tier, already active).

## Before trusting it with something you care about

Run it once against a trivial, low-risk OpenSpec change first (e.g., a copy tweak) and confirm the PR and preview actually appear, before pointing it at anything substantial. This is the same "30-second smoke test" principle that would have saved a wasted day on the cloud-routines dead end — verify the pipe works before pouring something expensive through it.

## Reusing this for other projects

This project is single-project scope for now (per founder decision, 2026-08-14). When a second project needs the same pipeline:

- Copy `.github/workflows/agentic-build.yml` into the new repo (or convert this into an [org-level reusable workflow](https://docs.github.com/en/actions/using-workflows/reusing-workflows) once there are 2+ consumers, so there's one file to maintain instead of N copies).
- Promote `ANTHROPIC_API_KEY` from a repo secret to an **organization-level** Actions secret (Organization Settings → Secrets and variables → Actions), so each new repo inherits it instead of needing its own copy. This is Anthropic's own recommended pattern for a secret shared across repos — an OAuth token can't do this cleanly since it's tied to one person's subscription.
- Everything else (trigger shape, apply step, verify step, PR step) is project-agnostic and should work unchanged.
