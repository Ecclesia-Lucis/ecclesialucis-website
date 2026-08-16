## Context

v0.1 shipped a dark-mode-first "light in the dark" palette (`lib/tokens.ts`: near-black/indigo base, single gold/amber accent) consumed by `tailwind.config.ts` as CSS variables, with light mode as an equally-polished but secondary alternate. The homepage hero (`app/page.tsx`) currently renders, top to bottom: "Ecclesia Lucis" (small uppercase eyebrow), "Church of Light" tagline (`text-3xl`→`text-5xl`), "A faith of equals" as the `<h1>` (`text-5xl`→`text-7xl`, italic, accent color, currently the largest element on the page). A single amber `glow-field-hero` radial gradient sits behind the hero; interior pages share a smaller `glow-field` via `components/PageHeader.tsx`. See `proposal.md` - Why for the founder's review feedback driving this change.

## Goals / Non-Goals

**Goals:**
- Flip the design system's authored default from dark to light, replacing the single gold/amber accent with a small, deliberately-used spectrum of bright accent hues, while keeping the dark theme fully polished as the secondary alternate (same component set, same layout).
- Add two new shared, centrally-defined decorative motifs (spectrum-bleed edge glow, wayfinding-thread scroll motif) as design-system elements, not one-off page code.
- Restructure the homepage hero's type-scale hierarchy and add the pronunciation guide and breathing room the founder described.
- Preserve WCAG 2.2 AA contrast and `prefers-reduced-motion` behavior throughout — the brand gets bolder, the accessibility bar doesn't move.

**Non-Goals:**
- No copy changes to doctrine content, no route changes, no CTA logic changes, no rebuild of `components/PageHeader.tsx`'s intro/eyebrow structure beyond swapping its glow treatment.
- No photography or illustration work (still out of scope per `docs/CONTENT_STRATEGY.md`).
- Not attempting literal LGBTQ+ pride-flag iconography — the spectrum motif stays abstract (light-through-a-prism), consistent with `CLAUDE.md`'s "forkable, not proprietary" and "no authority" framing; it reads as "light's full spectrum," not a political symbol, so it welcomes without narrowing who the site is "for."

## Decisions

**Palette shape — one accent variable becomes a small fixed spectrum scale.** Add `spectrumAccent1..6` tokens (roughly: coral/red, amber/orange, gold/yellow, green, blue, violet — a compressed ROYGBIV, skipping indigo/violet duplication) to both themes, each independently tuned so `spectrumAccentN` on `base` clears 4.5:1 for text use and 3:1 for large text/icons, per the existing `darkTheme`/`accent`-on-`base` precedent in `lib/tokens.ts`. Keep a single `accent` token too (defaults to `spectrumAccent5`/blue-violet, the closest analog to the old amber's role) so existing `text-accent`/`bg-accent` usages in components keep working without a mass find-replace — components opt into additional spectrum hues deliberately, not by default. Alternative considered: expose the full spectrum as a single CSS gradient token only (no discrete hues) — rejected because discrete tokens are needed for one-off accents (a link, an icon) where a gradient can't apply, per the "used sparingly, not full-bleed" spec requirement.

**Theme role swap, not a light-only rebuild.** `lightTheme` becomes the values read at `:root` by default; `darkTheme` moves behind `prefers-color-scheme: dark` (inverse of today). Both themes keep the full token set (`base`, `surface`, `ink`, etc.) so no component branches on which theme is active — this preserves the "Palette change touches one file" design-system requirement. Alternative considered: drop dark mode entirely — rejected, contradicts the existing "equally-polished alternate" requirement the founder hasn't asked to remove, and system-dark-mode visitors would otherwise get an unstyled or jarring experience.

**Spectrum-bleed as a CSS-only radial/conic gradient stack, no new JS.** Implement as a replacement for `glow-field`/`glow-field-hero` in the global stylesheet: a fixed/absolute `aria-hidden` layer using layered `conic-gradient`/`radial-gradient` in the spectrum hues, opacity-limited and blurred, positioned at the viewport edges so it "bleeds in" without ever reaching full opacity over the content measure (`layout.contentMax`). Pure CSS keeps it cheap (no scroll listeners) and trivially satisfies `prefers-reduced-motion` (the existing `motion-safe:animate-*` Tailwind pattern already used for `glow-field-hero`'s drift animation covers this — reduced-motion visitors just get the static gradient).

**Wayfinding-thread as an SVG path animated via CSS `stroke-dashoffset` + scroll-driven animation, not IntersectionObserver/JS.** Use a single `components/WayfindingThread.tsx` client component rendering one `<svg>` with a hand-authored or generated wavy/interweaving `<path>` in spectrum hues, revealed as the visitor scrolls using CSS scroll-driven animations (`animation-timeline: view()` / `scroll()`) with a JS `IntersectionObserver` fallback only if the CSS feature is unsupported (progressive enhancement — the path just renders static and fully visible if neither is available, never blocking content). `aria-hidden="true"`, `pointer-events: none`, positioned so it threads between sections rather than over text blocks. Alternative considered: a full scroll-jacking JS animation library — rejected as unnecessary weight and risk for a purely decorative element, and harder to make `prefers-reduced-motion`-safe by default.

**Hero heading semantics stay standard; visual size is independent of DOM tag.** To satisfy both "single logical `<h1>`, no skipped levels" (accessibility/SEO) and the founder's described size order (Ecclesia Lucis smallest, Church of Light largest, A faith of equals in between): `<h1>` = "Church of Light" (it's the actual translated name of the church and the most important string on the page), rendered at the new largest display size. "Ecclesia Lucis" renders above it as a non-heading label (`<p>`, styled small/uppercase — same role as today's eyebrow, just re-sized), with the pronunciation guide as a second small `<p>` directly beneath it. "A faith of equals" becomes an `<h2>`, sized between the label and the `<h1>`. This is a direct translation of the founder's "H3/4 / title / H1/2" note into a structure that's both accessible and visually correct — flagging it here rather than as an open question because it doesn't change scope, just the concrete mapping.

**Breathing room via a fixed minimum gap, not a vague "more space."** Add a concrete spacing step between the hero's name/title/statement block and the identity-statement paragraph — reuse `spacing.section`'s `clamp()` pattern at a smaller scale (e.g. `clamp(2.5rem, 6vw, 4rem)`) rather than a fixed Tailwind `mt-*` value, consistent with how `spacing` tokens already handle responsive section gaps.

## Risks / Trade-offs

[Bright spectrum accents read as garish or juvenile if overused] → Mitigation: spec requirement restricts spectrum accents to targeted use (links, icons, small fills, the two decorative motifs); no full-bleed color blocks; design review against the built pages before calling this done (per `CLAUDE.md` "verify UI changes in a browser").

[Spectrum-bleed or wayfinding-thread motifs reduce text contrast in edge cases (e.g. a page with little content, so the glow sits closer to text)] → Mitigation: opacity/blur tuned so glow never exceeds a low max-alpha near the content measure; contrast spot-checked at implementation time per the new AA scenario in `design-system/spec.md`.

[Scroll-driven CSS animations (`animation-timeline: view()`) have partial browser support] → Mitigation: static-by-default fallback (no animation-timeline support = thread renders fully visible, not hidden/broken); this is strictly decorative so degraded-but-present is an acceptable fallback, never a broken or missing state.

[Rainbow imagery could be read as making a claim about pride-flag branding, which isn't discussed in the founder-approved brand direction] → Mitigation: kept explicitly abstract/spectrum-of-light framed per the Non-Goals above; founder is the approver of the built result per `CLAUDE.md`'s open decisions list, so this is called out for their review pass rather than assumed uncontroversial.

## Migration Plan

1. Replace `lib/tokens.ts` values (swap theme roles, add spectrum tokens) — single file, per the design-system "palette change touches one file" guarantee.
2. Update wherever theme CSS variables are emitted (`tailwind.config.ts` or equivalent) so the default/media-query role swap takes effect.
3. Rework `glow-field`/`glow-field-hero` styles into the spectrum-bleed treatment; add the new `WayfindingThread` component and wire it into shared page chrome (layout or per-section as design calls for).
4. Restructure `app/page.tsx` hero markup per the heading-semantics decision above; update `components/PageHeader.tsx`'s glow class to the new motif for interior-page consistency.
5. Manually verify in a browser (per `CLAUDE.md`): both themes, `prefers-reduced-motion`, and contrast spot-checks on spectrum-accent text/icon usages, before calling the change done.
6. Update `docs/CONTENT_STRATEGY.md` Brand Direction section to describe the new direction (doc-only, part of `tasks.md`, not a spec delta).

No rollback complexity beyond a normal revert — this is a static-site presentation-layer change with no data migration.
