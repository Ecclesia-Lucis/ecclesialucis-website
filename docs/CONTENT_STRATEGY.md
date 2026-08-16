# Content Strategy — Ecclesia Lucis Website

## Sitemap (v1)

```
/                  Home — identity statement, doctrine teaser, primary CTA
/purpose           From PURPOSE.md — why the protocol exists
/tenets            From TENANTS.md — the versioned guiding principles
/practices         From PRACTICES.md — the 8 optional practices
/covenant          From COVENANT.md + ceremonies/GOVERNANCE.md — safeguards, non-hierarchy
/about             FAQ-style: "is this a cult," "do I need to believe in god," "who runs this," "is this free"
/community         The join point — Discord CTA, what to expect, low-pressure framing
/contact           Simple contact method, no account required
```

Footer (every page): links to Purpose/Tenets/Practices/Covenant/Community, GitHub protocol repo link, legal status line (blocked on `docs/DEPENDENCIES.md` item 6), copyright/organization name.

## Doctrine → copy mapping

The website must not "reinterpret" doctrine — it translates it into a scannable web format. Concretely:

| Source | Becomes | Rule |
|---|---|---|
| `PURPOSE.md` | `/purpose` page + a 1-2 sentence excerpt on Home | Preserve the "we are beings formed from light... our responsibility is to increase light" throughline — it's the emotional core, don't flatten it into generic "wellness" copy. |
| `TENANTS.md` | `/tenets` page, likely as 11 scannable cards (v0.0–v0.10) rather than a long scroll of prose | Keep "provisional and open to revision" framing visible — don't present tenets as fixed commandments even in a polished visual treatment. |
| `PRACTICES.md` | `/practices` page, 8 sections (Reflection, Repair, Sustenance, Attention, Rest, Gathering, Ceremonial Moments, Stewardship) | Keep "not requirements... tools, not tests" framing prominent, ideally in the page intro before the list. |
| `COVENANT.md` | `/covenant` page | This page is doing real trust-building work for the skeptical-visitor persona (PRD §1.3) — consider surfacing its "no monetization of legitimacy, no coercion" lines as a pull-quote near the top. |
| `ceremonies/GOVERNANCE.md` | Folded into `/covenant` or `/about`, not necessarily its own page (it's short) | "No hierarchy, no clergy, no disciplinary mechanism" — directly answers the About FAQ's "who runs this." |

## Tone and voice rules

- Plain language over ornate/mystical language. The source docs are already well-written and grounded — match that register, don't add flowery filler to seem "more spiritual."
- Confident, warm, unhurried. Not salesy, not hedgy.
- Second person where natural ("you're free to practice, modify, or depart entirely") — mirrors the source docs' own voice.
- **Words to avoid:** leader, follow(ers), obey, must believe, sin, salvation, convert (as in convert-a-soul; "conversion" as a marketing metric is internal-only vocabulary, never visitor-facing), join now / limited time / act fast.
- **Words in active use:** wavelet, practice, explore, tend, reflect, repair, steward, provisional, forkable, commons.

## Community link (confirmed)

Discord invite (permanent, non-expiring): **https://discord.gg/GCAaeCcpD** — use this as the CTA target on `/community`, and consider a secondary placement in the footer/nav per REQ-CTA-001 in `docs/PRD.md`.

## Brand direction (✅ approved 2026-08-13 — proceed on agent judgment within this proposal)

Founder's exact words: "I'd like for you to make a visually stunning website but I don't have direction at this time, your intuition might be spot on so I'd go with your suggestion from a design aesthetic, but I would like to be able to make changes as necessary." Treat what follows as a confident, opinionated first draft to build — not a locked spec, and not something to hedge on by playing it safe. Expect a revision pass once the founder sees it; build the design-token layer cleanly (not one-off hardcoded styles) so that pass is cheap.

**Photography is explicitly out of scope for v1** (founder: "add photographs, perhaps that's v2") — use the cosmic/gradient/light-motif imagery approach below instead of stock or real photography anywhere in v1.

**Concept history:** v0.1 (as-built) was "light in the dark" — a deep, calm dark-mode-first palette (near-black, deep indigo) with warm luminous gold/amber accents. v0.2 (proposed 2026-08-15, never applied) drafted a light-mode-first, off-white/spectrum-accent flip. Both are superseded by **v0.3, "Explosion of Light"** below (`openspec/changes/web-v0-3-explosion-of-light/`, formalizing `docs/design/v0-3-radical-light-vision.md`; v0.2 is archived at `openspec/changes/archive/2026-08-15-web-v0-2-redesign/`, its palette-token engineering reused rather than redone).

**Concept (current, v0.3):** "Explosion of light" — a true bright-white/near-white base (`#ffffff`–`#fdfdfb`) with near-black ink is the authored default, not a tint. A small spectrum of bright, saturated accent hues (`spectrumAccent1..6`, a compressed ROYGBIV) bleeds in from the viewport edges, and a thin rainbow "wayfinding thread" runs the full length of the homepage guiding the eye toward each section — evoking both "church" gravitas and "light/cosmos" imagery from `PURPOSE.md` ("atoms forged in stars"), now as an event rather than an ambient glow. Dark mode remains a secondary, equally-polished alternative via `prefers-color-scheme: dark` — some visitors will have system dark mode and the site should feel complete either way, but the *authored, demoed, default* identity is the bright one.

- **Typography:** a humanist serif or high-contrast serif for headings (gravitas, "church" register) paired with a clean geometric sans for body text (modern, readable, approachable) — avoids reading as either a stuffy institution or a generic tech startup. Unchanged by v0.3, except the homepage hero's "Ecclesia Lucis" wordmark now carries a one-shot kinetic-type (weight/tracking) load-in on first paint.
- **Motion:** CSS-only scroll-driven reveals (`animation-timeline: view()`/`scroll()`, no scroll-jacking JS) pace the homepage as a long, teased journey — each doctrine chapter (Purpose, Tenets, Practices, Covenant) uses a distinct layout and reveal rather than a repeating card grid. Never gratuitous, always respecting `prefers-reduced-motion` (every motion element collapses to an instant static/expanded end-state) and WCAG 2.3.1 (nothing flashes more than 3×/second). An optional device-tiered canvas/WebGL layer behind the hero (slow-drifting, bloom-only light motes) is a non-blocking stretch enhancement, not a requirement — the hero must look complete without it.
- **Imagery:** cosmic/light motifs (starlight, gradients, soft glow) rather than stock-photo people — keeps the "which real people are the leaders" question from even arising visually, consistent with the non-hierarchy stance. Still no photography in v1, per the note above.
- **Logo:** existing assets in `assets/brand/` are AI-generated drafts (per `docs/DEPENDENCIES.md`) — treat as placeholder/moodboard input, not final.

This section documents the current, founder-directed brand revision — not a locked spec. Further revision passes (raised as new `/opsx:propose` changes per `CLAUDE.md`) are expected as the founder continues to react to what's built.

## Primary conversion path

Home → (read enough doctrine to trust it) → `/community` → Discord invite. Every doctrine page repeats the same single CTA style/placement so it never feels like the site is trying multiple tricks to get a click — consistency itself is part of the "not manipulative" trust signal.
