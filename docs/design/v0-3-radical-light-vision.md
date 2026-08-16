# v0.3 Design Vision — "The Explosion of Light"

**Status:** Founder-directed creative/technical brief, written 2026-08-15, prior to `/opsx:propose`.
**Supersedes:** `openspec/changes/web-v0-2-redesign/` (proposed 2026-08-15, never applied — see "Relationship to v0.2" below).
**Purpose of this document:** ground a future `/opsx:propose` run in a researched, concrete direction, so the generated `proposal.md` / `design.md` / spec deltas / `tasks.md` don't have to invent the concept from a one-line prompt. This is the creative brief; OpenSpec's own `design.md` for the change should cite this file and formalize the decisions below into spec language.

---

## 1. The brief, in the founder's words (2026-08-15)

> I want each page to feel like an exploration, a journey... an explosion of light. An awakening.

Distilled requirements:

1. **Background: bright white**, not dark — an "explosion of light," not "light in the dark" (v0.1/v0.2's framing inverts here too, but goes further: not just a light *theme*, a light *event*).
2. **Edge bleed**: white bleeds into the full visible-light spectrum at the page perimeter.
3. **A thin rainbow thread** guides the eye down the page toward text and CTAs.
4. **Generous dead space** — silence between statements, used deliberately to make scrolling itself feel like unfolding a story.
5. **Dynamic reveal**: text boxes that expand and disclose content, not static blocks.
6. **A long, teasing homepage** — each section presented differently (right-aligned, left-aligned-with-graphic, appearing text boxes) rather than a repeating card grid.
7. **Explicitly not** a generic template-website feel.
8. **Header (first ~700px) is almost silent**: only "The Church of Light" (small), then "Ecclesia Lucis" (large), then nothing. No identity statement, no disclaimer, no CTA in that first screen.
9. **Optional/nice-to-have**: a dynamic background behind the header that reads as continuously emitting light particles.

Point 8 directly changes what ships above the fold today, so it's flagged as an open decision in §7 — it isn't silently assumed.

---

## 2. Research grounding (Aug 2026)

Rather than design this from pure intuition, I pulled current (2026) patterns from award-gallery/industry sources. Three findings shape the technical decisions below:

- **Scroll-driven animation is now natively CSS**, not a JS dependency. `animation-timeline: view()` / `scroll()` (Chrome/Edge 115+, Firefox 132+, Safari 18+, ~84% global support mid-2026) runs on the compositor thread — reveal-on-scroll, progress-linked reveals, and "thread" motifs can be built without a scroll-jacking JS library, and degrade to a fully-visible static state on unsupported browsers. This is the same approach v0.2 already chose for its wayfinding-thread motif — v0.3 extends it rather than replacing it. ([css-tricks.com](https://css-tricks.com/unleash-the-power-of-scroll-driven-animations/), [cssawwwards.com](https://cssawwwards.com/blog/css-scroll-driven-animations-guide-2026))
- **The best 2026 award-winning sites treat scroll like an edited timeline** — each section is a distinct visual move (not a repeating template block), type is often the primary visual element (oversized, kinetic, variable-weight), and WebGL/particle effects are used but always with device-tiered fallback: full effect on capable desktops, reduced-or-static on phones/low-power devices. "Beauty at 60fps" is treated as the actual discipline, not a stretch goal. This directly supports the "each page feels different" brief and argues against a from-scratch card-grid homepage. ([hontran.dev](https://www.hontran.dev/blog/best-award-winning-websites-2026), [elements.envato.com](https://elements.envato.com/learn/web-design-trends))
- **Flashing/strobing content is a hard accessibility line, not a style choice.** WCAG 2.3.1 prohibits content that flashes more than 3 times/second in any 1-second window, red flashes being the highest-risk case. Any "light particle" or "explosion" motion must read as *drift, pulse, and bloom* — never strobe. This constrains the "dynamic light particles" nice-to-have below to slow, continuous, non-repeating-flash motion. ([silktide.com](https://silktide.com/accessibility-guide/the-wcag-standard/2-3/seizures-and-physical-reactions/), [getstark.co](https://www.getstark.co/wcag-explained/operable/seizures-and-physical-reactions/))

---

## 3. Relationship to v0.2 (`web-v0-2-redesign`)

v0.2 is proposed but **not yet applied** — no code changed. It already made the light-mode-first + spectrum-accent + wayfinding-thread call, which this brief validates and keeps. But v0.3 diverges from it in two concrete ways that matter for `/opsx:propose`:

| | v0.2 decision | v0.3 direction |
|---|---|---|
| Hero above-the-fold content | Keeps REQ-HOME-001: identity statement + "what this is not" disclaimer visible above the fold, below the name/title | Removes them from the first screen entirely — first screen is name only, silence after |
| Hero size hierarchy | "Church of Light" = largest (H1), "Ecclesia Lucis" = smallest label | "Ecclesia Lucis" = larger of the two, "Church of Light" = smaller, appears first |
| Motion ambition | CSS-only spectrum-bleed + one thread motif, deliberately conservative ("no new JS") | Same CSS-first floor, but adds an *optional* device-tiered particle layer and per-section reveal choreography across the whole homepage, not just the hero |

**Recommendation:** treat v0.3 as **superseding** v0.2 rather than layering on top of it — don't apply v0.2 first. When `/opsx:propose` runs for v0.3, it should mark `web-v0-2-redesign` as superseded (moved to `openspec/changes/archive/` without being applied, with a one-line note why) so the two unapplied proposals don't drift out of sync. v0.2's actual palette/token engineering work (spectrum tokens, theme-role swap, AA contrast targets) is still correct and should be reused, not redone.

---

## 4. Design language

### 4.1 Palette

- Base goes to genuine bright white / near-white (`#ffffff`–`#fdfdfb`, not the soft off-white of v0.2's draft), ink goes to near-black. This is the "explosion," not a tint — and it happens to make WCAG AA trivial (near-21:1 base contrast) with margin to spend on lighter secondary text.
- Keep v0.2's `spectrumAccent1..6` token approach (compressed ROYGBIV, each independently tuned for 4.5:1 text / 3:1 large-text-and-icon contrast on white) — it's already correct engineering, just re-tuned for a true-white base instead of off-white.
- Dark theme remains the secondary, equally-polished `prefers-color-scheme: dark` alternate (unchanged principle from v0.2) — a Church of Light shouldn't leave dark-mode visitors with a broken experience, but the *authored, demoed, default* identity is the bright one.

### 4.2 The edge bleed, evolved

v0.2 already specced a `spectrum-bleed` layered gradient. v0.3 keeps it as the CSS-only floor (always present, zero JS, respects reduced motion) and adds one optional enhancement:

- **Floor (always ships):** conic/radial gradient stack in the spectrum hues, anchored to the four viewport edges, opacity- and blur-limited so it never approaches AA-threatening contrast near `layout.contentMax`. Static under `prefers-reduced-motion`; a slow (tens-of-seconds), non-repeating-flash drift otherwise.
- **Enhancement (nice-to-have, device-tiered):** a canvas/WebGL layer behind the hero only, rendering soft light "motes" drifting outward from the name — bloom and drift, never strobe, capped well under the 3-flashes/second line by construction (no flashing at all, only continuous motion). Loads only on pointer-capable, larger-viewport, non-reduced-motion, non-data-saver devices; everything else gets the CSS floor. Lazy-imported so it can never delay the hero text's paint (the text is the LCP element, always).

### 4.3 The wayfinding thread, extended

Keep v0.2's `WayfindingThread` component and its `animation-timeline: view()`/`scroll()` approach — one thin rainbow line, `aria-hidden`, that threads between (never over) content blocks. v0.3 extends its job: it should run the full length of the homepage, not just the hero, visually stitching together the differently-laid-out sections in §5 so the "journey" reads as one continuous path rather than a stack of unrelated blocks.

### 4.4 Typography

- Keep the existing serif-display / geometric-sans pairing (CLAUDE.md-adjacent brand continuity — not disputed by this brief).
- "Ecclesia Lucis" in the hero becomes the largest, most kinetic element on the site: on first load only (once per session, `prefers-reduced-motion`-gated to a simple fade otherwise), animate weight/tracking in — variable-font "kinetic type" is a well-supported 2026 pattern precisely for a single hero moment like this. It should not move again on scroll; the drama is the arrival, not a constant fidget.

### 4.5 Dead space and rhythm

Codify generous inter-section spacing as a token, not a per-page judgment call — e.g. extend `spacing.section`'s existing `clamp()` pattern with a larger `spacing.chapter` step used between the distinct homepage "chapters" in §5, so the pacing is consistent and centrally tunable.

---

## 5. Homepage as a journey (replaces the current teaser grid)

Current `app/page.tsx` after the hero is one repeating 2-column card grid (`doctrineTeasers.map(...)`) — functional, but it's the "generic template" feeling the founder is reacting against. v0.3 replaces it with a sequence of distinctly-composed chapters, each teasing one destination page, threaded together by §4.3's line:

1. **Hero** — per the brief: small "The Church of Light," large "Ecclesia Lucis," nothing else. First screen ends in silence.
2. **The turn** — after real dead space, the explorer statement ("A faith where each is an explorer on their own journey") arrives alone, centered, as an expanding text reveal rather than static paragraph — the first moment of motion after the hero's stillness.
3. **Purpose teaser** — left-aligned text block paired with a right-side abstract light-motif graphic (CSS gradient, not photography — still out of scope per `docs/CONTENT_STRATEGY.md`), text reveals as it enters view.
4. **Tenets teaser** — mirrored: right-aligned text, motif on the left. Deliberate asymmetry from Purpose so the two don't read as the same template.
5. **Practices teaser** — presented as an expanding-text-box interaction: a closed/collapsed statement that grows to reveal 2–3 lines of detail on scroll-into-view (the "text boxes expanding and revealing their contents" the brief calls out directly), not the current static card.
6. **Covenant teaser** — pull-quote treatment (large-scale quote typography, per `docs/CONTENT_STRATEGY.md`'s existing suggestion to surface Covenant's trust-building lines), distinct again from 3–5.
7. **Community CTA** — existing `CtaBanner`, unchanged in position: it still arrives only after every doctrine pillar has been teased, preserving CLAUDE.md's "doctrine before conversion" ordering. Nothing about this journey reorders that gate — it only changes how each stop is presented.

Each chapter keeps its own generous top/bottom `spacing.chapter` gap (§4.5) so scrolling itself paces the story.

---

## 6. Accessibility & performance guardrails (non-negotiable, not aspirational)

- WCAG 2.2 AA contrast holds in both themes — true-white base makes this easier, not harder; verify spectrum-accent-on-white text/icon usages specifically.
- WCAG 2.3.1: nothing on the site flashes >3×/second, ever — the particle enhancement is drift/bloom-only by construction, and any load-in kinetic type animation is a one-shot, not a loop.
- `prefers-reduced-motion: reduce` collapses every motion element (bleed drift, thread reveal, particle layer, expanding text boxes, kinetic type) to an instant static/expanded end-state — never hidden, never broken.
- The particle/WebGL enhancement is strictly additive and device-tiered; it must never be a dependency for the hero text painting, must not regress `docs/PRD.md` §5 Core Web Vitals budgets, and must be dynamically imported so its cost is zero on devices that don't qualify for it.
- Homepage's information architecture keeps the doctrine-before-CTA order intact (§5, step 7) — the journey concept changes presentation, not the trust-building sequence CLAUDE.md requires.

---

## 7. Open decisions for the founder (flag, don't guess)

Per CLAUDE.md's "if a copy/design decision is ambiguous, flag it for the founder rather than guessing" rule, `/opsx:propose` should surface these explicitly rather than resolve them silently:

1. **REQ-HOME-001 conflict.** `docs/PRD.md` currently requires the identity statement + "what this is not" disclaimer above the fold. This brief's hero (§1 point 8) removes both from the first screen. Recommended resolution: keep them, but move them to the very next chapter (§5 step 2's "turn"), reachable with a single scroll/short delay rather than requiring a click — preserves the founder's original trust-building intent while honoring the near-silent hero. Needs explicit founder sign-off since it changes an "H" priority PRD requirement.
2. **v0.2 disposition.** Confirm superseding (not applying) `web-v0-2-redesign` per §3, rather than applying it first and layering v0.3 on top.
3. **Particle/WebGL enhancement.** Confirmed as optional per the brief — proceed as a stretch task, not a blocking one; site must look complete and finished without it.

---

## Appendix: `/opsx:propose` prompt

See the chat message this document was delivered alongside for the ready-to-run prompt text. It should be pasted verbatim into `/opsx:propose "<...>"` in a session with this repo open, and references this file by path so the generated proposal doesn't have to re-derive the research above.
