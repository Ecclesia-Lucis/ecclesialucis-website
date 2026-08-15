# Product Requirements Document — Ecclesia Lucis Website (v1)

**Status:** All High-priority (H) functional requirements implemented in v0.1 (2026-08-14, live at `ecclesialucis-website.vercel.app`) except REQ-LEGAL-001 (footer ships an explicit placeholder, still blocked on EIN/501(c)(3) confirmation). Pending founder review of the built result. §9 release criteria (Lighthouse budgets, `docs/SECURITY.md` checklist) not yet run — Phase 2, see `docs/ROADMAP.md`. This document remains the requirements source of truth; `openspec/specs/` now tracks the same requirements as implemented, cross-referenced by REQ-ID.
**Owner:** Ash (founder, Ecclesia Lucis)
**Prepared by:** Claude Code, 2026-08-13
**Structured against:** `.claude/agents/requirements-reviewer.md` rubric (inherited from the org's existing standard, see `application/LightPath/.claude/agents/requirements-reviewer.md`)

---

## 1. Introduction

### 1.1 Purpose

This document specifies the first public website for Ecclesia Lucis ("The Church of Light"), an open-source spiritual protocol. The site's job is to introduce the protocol to strangers, communicate its doctrine and values accurately and compellingly, and convert interested visitors into community participants — without violating the protocol's own founding commitments to non-hierarchy, non-coercion, and openness.

Founder's original framing (captured verbatim in spirit, 2026-08-13):

> "I'd like for us to build a modern, compelling, and visually stunning website for Ecclesia Lucis. I think it's important that we describe our open source, sharing doctrine first and foremost. An adherence to a faith of equals, no leader, each an explorer on their own journey through life. I'd like for the website to be secure, I'd like for it to encourage visitors... This version one should probably just describe who we are, what we're about and perhaps somehow point them towards a community... drive attraction and conversion."

### 1.2 Scope

**In scope for v1:**
- Marketing/informational site: home, purpose, tenets, practices, covenant/safeguards, about/FAQ, community, contact.
- Doctrine content sourced faithfully from the existing protocol documents.
- One primary conversion goal: get an interested visitor into the community platform (Discord, see §6.2).
- Secondary conversion goal: point technically-minded visitors to the open-source protocol repo on GitHub.
- Responsive, accessible, fast, secure static/ISR site on a custom domain.

**Explicitly out of scope for v1** (deferred to `docs/ROADMAP.md` Phase 2+):
- Payment/donation processing.
- User accounts, login, or any personalization.
- Video hosting or livestreaming of the weekly meditation.
- Self-hosted community/forum platform.
- Multi-language support.
- A CMS/admin panel for non-technical content editing (content is authored in code/MDX for v1).

### 1.3 Target Audience

This document: founder (product owner/approver) and any coding agent or human contributor implementing the site.

The website itself: two visitor personas —
1. **The curious skeptic** — arrives via search or a shared link, wants to know "what is this, is it a cult, what do they actually believe" within 30 seconds. Needs the non-hierarchy/non-coercion framing up front to build trust.
2. **The seeker** — already resonates with "spiritual but not religious," science-respecting, community-craving. Needs an emotionally resonant, well-designed experience and a low-friction way to go deeper (join Discord, read the practices).

### 1.4 Definitions and Acronyms

- **Protocol** — the Ecclesia Lucis Protocol, the doctrine defined in the root repo (`PURPOSE.md`, `TENANTS.md`, `PRACTICES.md`, `COVENANT.md`).
- **Wavelet** — term of art for a practitioner/community member, used in site copy (the ceremony doc `Ordination_of_the_Lightbearer_Ecclesia_Lucis.docx` predates this rename and still uses "light-bearer" — site copy uses "wavelet" instead, since "light-bearer" doubles as a synonym for Lucifer); never "follower."
- **LCP / CLS / INP** — Core Web Vitals performance metrics (Largest Contentful Paint, Cumulative Layout Shift, Interaction to Next Paint).
- **WCAG 2.2 AA** — Web accessibility conformance standard, target level for this project.

### 1.5 References

- `../../PURPOSE.md`, `../../TENANTS.md`, `../../PRACTICES.md`, `../../COVENANT.md`, `../../ceremonies/GOVERNANCE.md` — doctrine source of truth.
- `../../Doctrine_of_Ecclesia_Lucis.docx`, `../../Bylaws_of_Ecclesia_Lucis.docx`, `../../Ecclesia_Lucis_Ceremony_Templates.docx`, `../../Ordination_of_the_Lightbearer_Ecclesia_Lucis.docx`, `../../Ecclesia_Lucis_Donation_Receipt_Template.docx`, `../../How_to_Apply_for_EIN_Ecclesia_Lucis.docx` — supporting organizational documents (not all in scope for v1 site copy).
- `CLAUDE.md`, `docs/ROADMAP.md`, `docs/INFRASTRUCTURE.md`, `docs/DEPENDENCIES.md`, `docs/CONTENT_STRATEGY.md`, `docs/SECURITY.md` — companion planning docs, same directory tree.

---

## 2. Goals and Objectives

### 2.1 Business Goals

- Establish a credible, professional, ownable web presence at `ecclesialucis.org` ahead of any formal fundraising, press, or congregation-building.
- Build the top of the funnel toward an eventual registered congregation/weekly meditation gathering (Phase 3+), satisfying the practical requirement of demonstrating a "congregation" for religious-organization status.
- Do this at minimal recurring cost (target: **$0–15/month** for v1 hosting+domain+tooling; see `docs/INFRASTRUCTURE.md` §4 for the breakdown).

### 2.2 User Goals

- Understand, within seconds of landing, that this is non-dogmatic, non-hierarchical, and evidence-respecting — not a "cult site."
- Read the doctrine (purpose, tenets, practices) in plain language without a signup wall.
- Find a clear, low-commitment next step to connect with other wavelets.
- Trust the organization enough to consider deeper engagement later (attending a meditation, donating, ordination).

### 2.3 Success Metrics (v1, first 90 days post-launch)

| Metric | Target | Notes |
|---|---|---|
| Lighthouse Performance | ≥ 90 (mobile) | Enforced pre-launch |
| Lighthouse Accessibility | ≥ 95 | WCAG 2.2 AA |
| LCP | < 2.5s on simulated 4G | Core Web Vitals "good" threshold |
| Visitor → Community click-through | ≥ 4% of unique visitors | Primary conversion metric |
| Unique visitors, month 1 | 300–500 | Baseline; founder will share the site organically/socially |
| Zero critical security findings | 0 | See `docs/SECURITY.md` checklist, run before launch |

These are placeholder targets for founder confirmation, not hard commitments — revise once real traffic sources are known.

---

## 3. User Stories

- **US-1:** As a first-time visitor, I want to immediately see a plain-language statement of what Ecclesia Lucis is and isn't, so I can decide in seconds whether to keep reading.
- **US-2:** As a skeptical visitor, I want to read the Covenant (no authority, no coercion, no monetized legitimacy) before anything asks me to join anything, so I can trust the site isn't manipulating me.
- **US-3:** As an interested visitor, I want a single, obvious way to connect with the community (Discord invite), so I don't have to hunt for it.
- **US-4:** As a technically-minded visitor, I want a visible link to the open-source protocol repo, so I can verify the doctrine is genuinely open and forkable.
- **US-5:** As a visitor on a phone, I want the site to load fast and look as good as on desktop, since most first visits will be from a shared social link.
- **US-6:** As a visitor using a screen reader or keyboard-only navigation, I want full access to all content and controls.
- **US-7:** As the founder, I want to update doctrine text on the site when the source docs change, without needing a full redeploy cycle to feel risky or slow.

---

## 4. Functional Requirements

Priority: **H**igh / **M**edium / **L**ow. Format follows RFC-style MUST/SHOULD/MAY.

| ID | Requirement | Priority |
|---|---|---|
| REQ-NAV-001 | The site MUST provide a persistent primary navigation exposing: Home, Purpose, Tenets, Practices, Covenant, Community, About. | H |
| REQ-HOME-001 | The homepage MUST present, above the fold, a one-sentence identity statement and a one-sentence "what this is not" disclaimer or immediate link to it. | H |
| REQ-CONTENT-001 | Doctrine pages (Purpose, Tenets, Practices, Covenant) MUST reproduce the meaning of the source `.md` files faithfully; copy edits for web readability are allowed but MUST NOT alter substantive meaning without founder sign-off. | H |
| REQ-CONTENT-002 | Each doctrine page SHOULD be scannable (headings, short paragraphs, pull-quotes) rather than a wall of text, per the "modern, compelling" brief. | M |
| REQ-CTA-001 | Every major page MUST include a single, clearly-styled primary call-to-action to join the community platform. | H |
| REQ-CTA-002 | The CTA copy MUST NOT use urgency, scarcity, or guilt framing (see `CLAUDE.md` content rules). | H |
| REQ-CTA-003 | The site MUST link to the public GitHub protocol repo from the navigation or footer. | M |
| REQ-ABOUT-001 | An About/FAQ page MUST directly answer "is this a cult," "do I have to believe in god," "is this free," and "who runs this." | H |
| REQ-CONTACT-001 | The site MUST provide a way to contact the organization (email or contact form) without requiring an account. | M |
| REQ-LEGAL-001 | The footer MUST include accurate organizational status language (nonprofit status pending vs. confirmed) — see `docs/DEPENDENCIES.md`, BLOCKED on founder confirmation of EIN/501(c)(3) status before launch copy is finalized. | H |
| REQ-RESP-001 | All pages MUST be fully responsive from 360px to 2560px viewport width. | H |
| REQ-THEME-001 | The site SHOULD support light and dark presentation, given the "light" visual theme lends itself to both a luminous-on-dark and clean-on-light treatment; final call in `docs/CONTENT_STRATEGY.md`. | M |
| REQ-FUTURE-001 | The information architecture MUST NOT preclude adding donation, video/streaming, and member-account features in later phases (i.e., don't paint the IA into a corner). | M |

---

## 5. Non-Functional Requirements

### 5.1 Performance
- LCP < 2.5s, CLS < 0.1, INP < 200ms on a simulated mid-tier mobile device / 4G connection.
- Total JS shipped on the homepage SHOULD be < 150KB gzipped for v1 (no client framework bloat for a content site).
- Images MUST be served responsively (Next.js `<Image>` or equivalent) and in modern formats (AVIF/WebP with fallback).

### 5.2 Security
- HTTPS enforced everywhere (automatic via Vercel).
- Security headers required: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options` / `frame-ancestors`, `Referrer-Policy`. See `docs/SECURITY.md` for exact policy.
- No inline secrets or API keys committed to the repo (see `CLAUDE.md`).
- Contact form (if implemented as a live endpoint rather than `mailto:`) MUST include spam protection (honeypot + rate limiting) and MUST NOT expose a raw email-sending credential client-side.
- Dependency vulnerabilities MUST be monitored (Dependabot or `npm audit` in CI) and kept at zero high/critical before each deploy.

### 5.3 Usability & Accessibility
- WCAG 2.2 AA conformance target: color contrast, keyboard navigation, focus states, semantic landmarks, alt text on all imagery, `prefers-reduced-motion` respected for any animation.
- No content or functionality gated behind JavaScript-only interaction that has no accessible fallback.

### 5.4 Reliability
- Target uptime: whatever Vercel's platform SLA provides for the chosen tier (no additional infra needed at this scale) — no self-managed servers to keep alive for v1.
- Every deploy goes through a preview URL before promotion to production (Vercel's default git-integrated flow).

### 5.5 Maintainability
- TypeScript throughout; lint/format enforced (ESLint + Prettier) so future agent sessions produce consistent code.
- Content kept in structured files (MDX/JSON) separate from layout/component code, so doctrine updates don't require touching React code.

### 5.6 Portability
- Must render correctly in current Chrome, Safari, Firefox, Edge, and iOS/Android mobile browsers. No IE support.

### 5.7 Data Requirements
- V1 stores no user data server-side beyond whatever the chosen analytics tool aggregates anonymously, and whatever the contact form forwards to an email inbox (not persisted in a database).
- No PII collection beyond what a visitor voluntarily submits via the contact form.

### 5.8 Error Handling and Logging
- Custom 404 page consistent with brand voice.
- Vercel's built-in request/error logging is sufficient for v1; no separate logging stack needed.

### 5.9 Internationalization
- Out of scope for v1 (English only). Content structure SHOULD avoid hardcoding English strings deep inside components, to make future i18n less painful, but no localization work is required now.

### 5.10 Accessibility Compliance Details
- WCAG 2.2 Level AA is the explicit target, verified via automated (axe/Lighthouse) and at least one manual keyboard-only pass before launch.

### 5.11 Legal and Compliance
- No GDPR-triggering data collection planned for v1 (no accounts, no tracking cookies if a cookieless analytics tool is used — see `docs/INFRASTRUCTURE.md`).
- Donation/tax-deductibility language is BLOCKED on founder confirming current legal/EIN status — see REQ-LEGAL-001 and `docs/DEPENDENCIES.md`.

---

## 6. Technical Requirements

### 6.1 Platform and Browser Compatibility
Desktop and mobile web, evergreen browsers (see §5.6).

### 6.2 Technology Stack
- **Language/Framework:** TypeScript, Next.js (App Router).
- **Styling:** Tailwind CSS.
- **Content:** MDX or JSON content files, statically generated at build time (no CMS/database for v1).
- **Community integration:** Discord invite link/widget (v1); revisit self-hosted option per `docs/ROADMAP.md`.
- **Analytics:** Vercel Analytics or Plausible (cookieless, privacy-respecting) — decision in `docs/INFRASTRUCTURE.md`.

### 6.3 API Integrations
- None required for v1 beyond an optional email-sending API for the contact form (e.g., Resend), and the Discord invite link (no bot/API integration needed for v1 — a static invite link is sufficient).

### 6.4 Data Storage
None required for v1 — fully static/ISR site.

### 6.5 Deployment Environment
Vercel (see `docs/INFRASTRUCTURE.md` for full reasoning and cost breakdown). Domain `ecclesialucis.org` via Porkbun DNS pointed at Vercel.

---

## 7. Design Considerations

### 7.1 UI Design
See `docs/CONTENT_STRATEGY.md` "Brand Direction" for the full visual direction proposal (palette, typography, motion). Existing brand assets (`assets/brand/*.png`) are available as a starting point but are AI-generated placeholders — founder should confirm whether these are final logos or need professional refinement before launch.

### 7.2 UX Design
Doctrine-first information architecture (see REQ-FUTURE-001 and `CLAUDE.md`). Single persistent CTA pattern. Generous whitespace and a "calm, not hype" visual register — the founder's brief asks for "stunning" and "conversion-optimized," which this project interprets as *beautiful and trustworthy*, not aggressive growth-hacking, to stay consistent with the Covenant.

### 7.3 Branding and Style
TBD pending founder review of `docs/CONTENT_STRATEGY.md` Brand Direction section.

---

## 8. Testing and Quality Assurance

- **Testing strategy:** Component-level checks where meaningful, Lighthouse CI for performance/accessibility budgets, manual cross-browser and keyboard-navigation pass before launch.
- **Acceptance criteria:** Each functional requirement in §4 is demo-able on a Vercel preview URL before merge to production.
- **Performance testing:** Lighthouse CI gate in the deploy pipeline (fail build if scores drop below §5.1 targets — can be added once the CI workflow exists).
- **Security testing:** Manual header/config check against `docs/SECURITY.md` checklist pre-launch; `npm audit`/Dependabot ongoing.

---

## 9. Deployment and Release

- **Process:** Git push to `main` → Vercel auto-builds → preview deploy → founder or agent promotes to production via Vercel dashboard or CLI.
- **Release criteria:** All High-priority (H) requirements in §4 met, Lighthouse budgets met, `docs/SECURITY.md` checklist clear, REQ-LEGAL-001 unblocked (legal status language confirmed).
- **Rollback:** Vercel supports instant rollback to any previous deployment — no custom rollback tooling needed.

---

## 10. Maintenance and Support

- Founder is the sole maintainer/approver for now. Support channel = the eventual Discord/community platform itself, plus the contact form/email.
- No formal SLA needed at this stage (single-maintainer nonprofit project).

---

## 11. Future Considerations (explicitly out of scope for v1)

- Donations/payment processing (Stripe or a nonprofit-friendly processor), contingent on confirmed legal status.
- Video hosting and livestreaming of the weekly meditation (Cloudflare Stream recommended — see `docs/INFRASTRUCTURE.md`).
- Self-hosted community platform (Discourse or similar) if/when Discord's limits are felt.
- Member accounts / personalization.
- Multi-language support.
- Blog/journal for ongoing reflections, if the founder wants an evolving-content channel beyond the static doctrine pages.

---

## 12. Stakeholder Responsibilities and Approvals

| Stakeholder | Responsibility |
|---|---|
| Founder (Ash) | Doctrine fidelity approval, brand/visual sign-off, legal-status confirmation, account creation for third-party services, final launch approval. |
| Coding agent(s) | Implementation per `docs/ROADMAP.md` assignments, flagging any copy/content ambiguity per `CLAUDE.md` rules rather than guessing. |

## 13. Change Management

Changes to this PRD should be made as edits to this file with the reason noted in the commit message, once this project has its own git history (see `docs/DEPENDENCIES.md`). No formal change-control board needed at this project's scale.
