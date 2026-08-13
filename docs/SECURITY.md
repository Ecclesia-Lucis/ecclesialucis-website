# Security Requirements & Checklist

V1 is a static/ISR marketing site with no accounts and no payment processing, so the attack surface is intentionally small. Keep it that way — every requirement below is proportionate to that surface, not boilerplate for boilerplate's sake.

## Requirements

- **Transport:** HTTPS everywhere, enforced. Automatic on Vercel — verify no mixed-content warnings once pages are built.
- **Headers** (set via `next.config.ts` or middleware):
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - `Content-Security-Policy` — start restrictive (`default-src 'self'`), add exceptions only for what's actually needed (e.g. an embedded Discord widget, analytics script, web fonts).
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `frame-ancestors 'none'` (or explicit allowlist) to prevent clickjacking.
  - `Permissions-Policy` — deny camera/mic/geolocation by default (a marketing site needs none of these).
- **Secrets:** no API keys, tokens, or credentials committed to this repo, ever. Use Vercel Environment Variables for anything real (e.g. a contact-form email API key), and a git-ignored `.env.local` for local dev. **Cautionary precedent:** `application/LightPath/gcp-sa.json` and `.env` files sit unencrypted in a sibling project's working tree — don't repeat that pattern here, even though they happen to be untracked by git today.
- **Dependencies:** Dependabot (or equivalent) enabled once the GitHub repo exists; `npm audit` clean (no high/critical) before each production deploy.
- **Contact form** (if built as a live endpoint rather than a `mailto:` link): honeypot field + basic rate limiting; never expose an email-sending credential to the client; validate/sanitize all input server-side even though it's "just an email."
- **No third-party script sprawl:** every embedded script (analytics, Discord widget, fonts) should be a deliberate, reviewed addition — each one is both a performance cost and a trust/privacy surface.
- **Admin/preview surfaces:** if a staging subdomain is used before `ecclesialucis.org` goes live, ensure it isn't indexed by search engines (`noindex` header) and isn't linked from anywhere public.
- **Domain security:** enable registrar lock and 2FA on the Porkbun account (human task) and on the Vercel/GitHub accounts tied to this project, since domain and deploy-pipeline takeover are the highest-value targets for a project this size.

## Pre-launch checklist

- [ ] All security headers present and verified (e.g. via securityheaders.com or manual curl inspection)
- [ ] `npm audit` clean of high/critical
- [ ] No secrets in git history (`git log -p` spot check, or a secret-scanning tool)
- [ ] Contact form (if live) has spam protection and no client-exposed credentials
- [ ] 2FA enabled on Vercel, GitHub, Porkbun accounts
- [ ] Staging/preview URLs are `noindex`ed if they'll remain reachable after launch
- [ ] HTTPS confirmed on all three domains (`.org`, `.com`, `.life`) with no mixed content

## Explicitly deferred (Phase 2+, revisit when those features are built)

- Authentication/session security (no accounts in v1)
- Payment/PCI-adjacent concerns (no payments in v1)
- Rate limiting at the platform/WAF level beyond what Vercel provides by default (only worth adding if abuse is actually observed)
