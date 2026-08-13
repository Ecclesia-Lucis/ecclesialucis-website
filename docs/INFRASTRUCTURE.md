# Infrastructure & Hosting — Ecclesia Lucis Website

**Date:** 2026-08-13. Recommendations below are based on August 2026 pricing/feature research; verify current numbers before paying for anything, pricing pages move.

## 1. Hosting decision: Vercel

| Option | Free tier | Notes |
|---|---|---|
| **Vercel** (chosen) | 100GB bandwidth, 1M serverless invocations, unlimited custom domains on Hobby | Best Next.js integration, git-based preview deploys, automatic HTTPS. Hobby plan's terms restrict *commercial* use — fine for a pure content site with no payments, but **upgrade to Pro (~$20/mo) before enabling any donation/commerce feature** (Phase 2+). |
| Cloudflare Pages | 100 sites, unlimited bandwidth, 500 builds/mo | Cheapest at scale (unlimited bandwidth beats Vercel's 100GB cap), but weaker Next.js-specific DX. Good fit if this were a pure static site with heavy traffic; overkill complexity for v1. |
| Netlify | Credit-based (300 credits/mo ≈ 30GB bandwidth or 20 builds) | Solid generalist option, but no particular advantage over Vercel for a Next.js site, and this environment already has dedicated Vercel tooling (skills/agents) that make Vercel the path of least friction. |

**Decision:** Vercel Hobby tier for v1 (free), reassess before any payment-collecting feature ships. Reassess again if traffic ever approaches the 100GB/month bandwidth cap (unlikely for a v1 marketing site).

## 2. Domain: ecclesialucis.org via Porkbun → Vercel

You (the founder) hold `ecclesialucis.org`, `.com`, and `.life` at Porkbun. Recommendation: **`.org` is primary** — it's the semantically correct TLD for a religious/nonprofit organization and what visitors will expect. Point `.com` and `.life` at the same Vercel project as redirects to `.org` (prevents someone else parking confusingly-similar domains, costs nothing extra since you already own them).

**DNS setup (human task, Porkbun login required):**
1. In Vercel, add `ecclesialucis.org` as a domain on the project (this project must exist first — see §1).
2. Vercel will display a set of nameservers to use.
3. In Porkbun's dashboard, open the domain's "Details" → "Nameservers," remove the existing entries, and paste in Vercel's nameservers.
4. Repeat by adding `.com` and `.life` to the same Vercel project configured as redirects to `.org`, or alternatively use Porkbun's own free URL forwarding for those two (simpler if you don't want to manage them through Vercel at all) — either works; URL forwarding at the registrar is arguably simpler since those domains don't need Vercel involvement at all.
5. Propagation can take a few hours; Vercel's dashboard shows a pending → verified status.

This is a **human-only step** — it requires your Porkbun and Vercel account logins. An agent can produce the exact record values but cannot log into either account for you unless you set up API-key based automation later (Porkbun does have an API; not recommended to wire up for a one-time DNS change).

## 3. Email

You'll want at least one address like `hello@ecclesialucis.org` for the contact page and any account signups (Vercel, GitHub, etc. can use your existing Google account, but a branded inbox reads more credibly to visitors). Cheapest paths:
- **Porkbun email forwarding** (often free/cheap) — forwards `hello@ecclesialucis.org` to your existing Gmail. Simplest, no new inbox to manage.
- **Google Workspace** (~$6-7/user/month) — a real branded inbox, only worth it once you're sending/receiving enough mail to matter.

Recommendation: start with forwarding; upgrade only if volume justifies it.

## 4. Cost summary (v1)

| Item | Cost |
|---|---|
| Vercel Hobby | $0 |
| Domain (already owned) | $0 incremental (renewal cost already committed) |
| Email forwarding (Porkbun) | $0 |
| Analytics (Vercel Analytics free tier or Plausible ~$9/mo if self-serve hosted) | $0–9/mo |
| **Total v1** | **$0–9/month** |

This satisfies the "most cost-efficient" requirement — v1 should cost effectively nothing beyond the domain renewal you've already committed to.

## 5. Video/streaming (Phase 2+, not part of v1 — researched now so the decision is documented)

For the eventual weekly meditation stream/recordings:

| Option | Cost model | Notes |
|---|---|---|
| **Cloudflare Stream** (recommended when this phase starts) | ~$5/1,000 min stored + ~$1/1,000 min delivered (roughly $15/mo for light usage) | No separate encoding fee, predictable, no ads, full control over player/branding — matches "own the platform" instinct. |
| Mux | Per-minute encode + storage + delivery, generally pricier than Stream at this scale | More mature dev ecosystem/DRM if ever needed, but not needed for a small congregation. |
| YouTube (Live + unlisted VOD) | Free | Zero cost, easy, but ads may appear on content, no control over the surrounding experience, and it's Google's platform, not yours — in tension with the "own the platform" value. Reasonable *bridge* option to get the weekly meditation started with zero infra work before Cloudflare Stream is worth setting up. |

**Recommendation:** don't build streaming infra speculatively. When the weekly meditation is ready to go live, start with an unlisted YouTube stream (zero setup, zero cost) to prove the format works, and migrate to Cloudflare Stream once there's a real, recurring audience and the team wants full control/branding. This mirrors the LightPath project's own stated philosophy of "start with smallest viable service, scale up only when metrics prove necessity."

## 6. Analytics

Recommendation: **Vercel Analytics** (built into the hosting platform already, no extra account, cookieless, no consent banner required) for v1. Plausible is a fine alternative if more detailed reporting is wanted later, at ~$9/month for a hosted plan (or self-hosted for the cost of a small server, consistent with "own the platform" if that becomes a priority).

Explicitly **not** recommending Google Analytics: it requires a cookie-consent banner in many jurisdictions, sends visitor data to Google, and is a heavier, more surveillance-oriented tool than a v1 doctrine site needs.
