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
| 1 | **Vercel account** — sign up/log in (you mentioned a Google profile set up for this exact purpose — Vercel supports Google login) | Needs your credentials; ties billing to you | Not yet created (as far as this session knows) |
| 2 | **Porkbun login** — to change nameservers for `ecclesialucis.org`/`.com`/`.life` | Registrar account, your credentials | You already have this (domains registered) |
| 3 | **Discord account + server creation** (if Discord is confirmed as v1 community platform) | Needs a personal/organizational Discord account, which you noted you'd have to set up | Not yet created |
| 4 | **GitHub org access confirmation** — this session is authenticated as the `Ecclesia-Lucis` GitHub org already (via `gh`), so repo creation is technically possible without new login, but see ⏳ item below | N/A — already available | Available |
| 5 | **Email for `hello@ecclesialucis.org`** — set up Porkbun forwarding or Google Workspace | Registrar/Google account access | Not yet set up |
| 6 | **Legal/EIN/501(c)(3) status confirmation** | Only you know the actual current status of the EIN application (`How_to_Apply_for_EIN_Ecclesia_Lucis.docx` exists but its outcome isn't in this repo) — this gates any "tax-deductible donation" language and the footer's legal-status statement | **Blocking REQ-LEGAL-001** in `docs/PRD.md` |

## Decisions (human judgment, agent can prep options but shouldn't pick for you)

| # | Decision | Agent's recommendation | Your call |
|---|---|---|---|
| 1 | Discord vs. self-hosted community platform for v1 | Discord for v1 (free, fast, proven at your scale); revisit self-hosting once the community outgrows ~150-200 active members or ephemeral chat starts to feel like a real loss, given your "own the platform" instinct | ✅ **Confirmed 2026-08-13: Discord for v1** |
| 2 | `.com` / `.life` behavior | Redirect both to `.org` | Reasonable default, confirm |
| 3 | Brand assets — are `assets/brand/*.png` (copied from the repo root) final logos, or AI-generated placeholders that need real design work? | Treat as placeholders unless you say otherwise — they read as AI-generated drafts | **Open** |
| 4 | Visual/brand direction (palette, typography, tone) | Proposal in `docs/CONTENT_STRATEGY.md` — needs your sign-off before full build | **Open** |
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
- [ ] Confirm current EIN/501(c)(3) status (affects footer + any future donation copy)
- [ ] Create Vercel account (or confirm you already have one from another project)
- [ ] Create the Vercel project and connect it to `Ecclesia-Lucis/ecclesialucis-website`
- [ ] Set up Porkbun DNS once a Vercel project exists (`docs/INFRASTRUCTURE.md` §2)
- [ ] Confirm brand assets are placeholders vs. final
- [ ] Review and approve `docs/CONTENT_STRATEGY.md` brand direction before full build begins
- [ ] Create the Discord server for the community (`docs/ROADMAP.md` Workstream 0.2G)
