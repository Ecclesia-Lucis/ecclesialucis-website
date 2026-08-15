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

## Brand direction

> **v0.2 (current, ✅ founder revision pass 2026-08-15 → OpenSpec change `web-v0-2-redesign`).** The direction below **supersedes** the original v0.1 "light in the dark" concept (kept beneath for provenance). On reviewing the built v0.1, the founder found a dark-mode-first default visually contradictory for a *Church of Light* and asked for a brighter, bolder direction.
>
> **Concept:** "Light and its full spectrum" — a **light-mode-first** palette (white/near-white base, black/near-black ink) with a small set of **bright, saturated accent hues drawn from the visible light spectrum** (a compressed ROYGBIV), echoing the "each beam of light is different, together they are white light" idea in `PURPOSE.md`. The v0.1 dark palette is kept as an **equally-polished secondary (dark-mode) alternate** — the primary/secondary roles are simply reversed from v0.1, so system-dark-mode visitors still get a complete experience.
>
> - **Accents used sparingly.** The spectrum is for targeted accents (links, underlines, icons, small fills) and the two decorative motifs below — never full-bleed rainbow blocks, and never at the expense of WCAG 2.2 AA text contrast. The motif reads as "light through a prism," abstract, not literal pride-flag iconography.
> - **Spectrum-bleed edge glow:** a subtle rainbow-hued glow bleeding in from the outer edges of the viewport behind content (replaces v0.1's single-hue amber `glow-field`). Decorative (`aria-hidden`), reduced-motion-safe, never drops foreground contrast below AA.
> - **Wayfinding thread:** fine interweaving spectrum-hued line(s) that thread down the page as the visitor scrolls — a "trail deeper into the doctrine" cue, distinct from the background glow. Decorative, reduced-motion-safe (static fallback), never over-crossing text in a way that harms contrast.
> - **Homepage hero:** re-balanced type scale — "The Church of Light" largest (`<h1>`), "A faith of equals" mid (`<h2>`), "Ecclesia Lucis" a small label with a plain-text pronunciation guide ("Eck-Lee-See-Ah Lu-Chish") beneath it, and a deliberate breathing-room "beat" before the identity paragraph.
> - **Typography, motion discipline, "no stock-photo people" imagery stance, and logo status are all carried forward unchanged from v0.1 below.**

---

### v0.1 (superseded — kept for provenance)

Original brand direction (✅ approved 2026-08-13 — proceeded on agent judgment within that proposal):

Founder's exact words: "I'd like for you to make a visually stunning website but I don't have direction at this time, your intuition might be spot on so I'd go with your suggestion from a design aesthetic, but I would like to be able to make changes as necessary." Treated as a confident, opinionated first draft — not a locked spec. As anticipated, a revision pass followed once the founder saw the built result (see v0.2 above); the clean design-token layer built for v0.1 made that pass cheap.

**Photography is explicitly out of scope for v1** (founder: "add photographs, perhaps that's v2") — use the cosmic/gradient/light-motif imagery approach below instead of stock or real photography anywhere in v1. *(Still in force under v0.2.)*

**Concept:** "Light in the dark" — a deep, calm dark-mode-first palette (near-black, deep indigo) with warm luminous accents (gold/amber gradient light), evoking both "church" gravitas and "light/cosmos" imagery from `PURPOSE.md` ("atoms forged in stars"). Light mode as a secondary, equally-polished alternative, not an afterthought — some visitors will have system light mode and the site should feel complete either way. *(Superseded by v0.2: light is now the primary, dark the secondary.)*

- **Typography:** a humanist serif or high-contrast serif for headings (gravitas, "church" register) paired with a clean geometric sans for body text (modern, readable, approachable) — avoids reading as either a stuffy institution or a generic tech startup. *(Carried forward under v0.2.)*
- **Motion:** subtle, purposeful (light rays / gentle gradient shifts, fade-ins on scroll) — never gratuitous, always respecting `prefers-reduced-motion`. *(Carried forward under v0.2.)*
- **Imagery:** cosmic/light motifs (starlight, gradients, soft glow) rather than stock-photo people, at least for v1 — keeps the "which real people are the leaders" question from even arising visually, consistent with the non-hierarchy stance. *(Carried forward under v0.2.)*
- **Logo:** existing assets in `assets/brand/` are AI-generated drafts (per `docs/DEPENDENCIES.md`) — treat as placeholder/moodboard input, not final.

This section was intentionally a starting proposal, not a locked spec — Phase 0.2E in `docs/ROADMAP.md` produced the actual design-token file and the v0.1 build the founder then reacted to.

## Primary conversion path

Home → (read enough doctrine to trust it) → `/community` → Discord invite. Every doctrine page repeats the same single CTA style/placement so it never feels like the site is trying multiple tricks to get a click — consistency itself is part of the "not manipulative" trust signal.
