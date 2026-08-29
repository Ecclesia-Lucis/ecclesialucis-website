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

**Concept history:** v0.1 (as-built) was "light in the dark" — a deep, calm dark-mode-first palette (near-black, deep indigo) with warm luminous gold/amber accents. v0.2 (proposed 2026-08-15, never applied) drafted a light-mode-first, off-white/spectrum-accent flip. Both were superseded by **v0.3, "Explosion of Light"** (`openspec/changes/archive/2026-08-28-web-v0-3-explosion-of-light/`, formalizing `docs/design/v0-3-radical-light-vision.md`; v0.2 is archived at `openspec/changes/archive/2026-08-15-web-v0-2-redesign/`, its palette-token engineering reused rather than redone). **v0.3 is itself now being superseded by "Threshold" — see below** — the founder confirmed 2026-08-29 that Threshold is the primary design direction going forward, not a variant sitting alongside v0.3.

**Concept (current direction, confirmed 2026-08-29 — Threshold):** the site enacts its own central image rather than describing it. The founder's "inverted blackhole" source asset — a field of black dust dissolving to reveal a plain circle of light at its center — becomes the literal mechanism of the homepage: the hero opens on that image, near-silent (name, then "Church of Light," then nothing else, matching REQ-HOME-001's retirement below); continued scrolling drives a pinned "iris" reveal — a circular mask growing from a point to fill the viewport — that flips the page between a paper/ink state and a void/light-ink state, alternating down the page. Each flip reveals only a short section label; the section's real heading/body content fades in afterward as the visitor scrolls further into it, so nothing is shown twice. Doctrine content within each revealed section is presented as scattered, irregularly-sized "motes" — literalizing the source image's dust-particle field as the actual information layout, not a card grid or list. `prefers-reduced-motion` collapses the whole sequence to a static, fully-revealed, correctly-ordered page. Full behavioral spec: `openspec/changes/<threshold-change-name>/` once filed.

- **Typography:** **Odibee Sans** (a blocky, technical display face) for the wordmark and all display/heading/section-label text, paired with **DM Sans** for all body/subtext — replaces v0.3's humanist-serif/geometric-sans pairing entirely, not an addition to it.
- **Palette:** a warm neutral pair — paper (`#FBF9F4`) and void (`#08070A`) — plus a single warm ember-gold accent used identically in both states, replacing v0.3's bright spectrum-accent (`spectrumAccent1..6`) system. Dark mode as a secondary `prefers-color-scheme` alternative is dropped as a concept entirely: the paper/void inversion is content the visitor scrolls through, not a settings-driven theme.
- **Motion:** the iris-reveal threshold mechanism (above) replaces v0.3's per-chapter scroll-reveal-in-place pattern. The `WayfindingThread` component (built for v0.3, a full-homepage-length SVG line motif) has no clear role under Threshold's mote/iris visual language — its fate (retire vs. adapt) is a decision for that change's `design.md`, not assumed here.
- **Navigation:** primary navigation is no longer persistently visible chrome (superseding REQ-NAV-001's original wording, see `docs/PRD.md`) — it reveals when the visitor reaches the end of the page's scroll, or moves the pointer near the top of the viewport, and is otherwise hidden, so wayfinding itself feels like part of the exploration rather than a fixed UI bar. Confirmed 2026-08-29; the non-pointer (touch/keyboard) equivalent is a design.md decision, not yet specified.
- **Imagery:** the "inverted blackhole" dust/light asset (supplied specifically for this direction, distinct from the still-unresolved `assets/brand/*.png` placeholder logos) is the imagery, used as a live mechanism rather than a static hero photo. Still no stock or real photography, consistent with the existing v1 rule.
- **Logo:** unchanged from v0.3 — existing assets in `assets/brand/` remain AI-generated drafts, still unconfirmed as final.

This section documents the current, founder-directed brand revision — not a locked spec. Further revision passes (raised as new `/opsx:propose` changes per `CLAUDE.md`) are expected as the founder continues to react to what's built.

## Primary conversion path

Home → (read enough doctrine to trust it) → `/community` → Discord invite. Every doctrine page repeats the same single CTA style/placement so it never feels like the site is trying multiple tricks to get a click — consistency itself is part of the "not manipulative" trust signal.
