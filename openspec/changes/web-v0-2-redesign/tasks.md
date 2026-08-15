## 1. Design tokens

- [x] 1.1 🤖 In `lib/tokens.ts`, swap theme roles: `lightTheme` values become the authored default (`:root`), `darkTheme` moves behind `prefers-color-scheme: dark`, per the theme-role-swap decision in `design.md`.
- [x] 1.2 🤖 Define the new white/near-white, black/near-black base palette for the (now-default) light theme and a matching dark-theme counterpart, both meeting WCAG 2.2 AA text contrast per `design-system/spec.md`'s "Text contrast holds under the new palette" scenario.
- [x] 1.3 🤖 Add `spectrumAccent1`–`spectrumAccent6` tokens (compressed ROYGBIV) to both themes, each tuned for 4.5:1 contrast on `base` for text use and 3:1 for large text/icon use; keep a single `accent` token defaulting to one spectrum hue so existing `text-accent`/`bg-accent` usages keep working.
- [x] 1.4 🤖 Update `tailwind.config.ts` (or wherever theme CSS variables are emitted) so the default/media-query role swap and new spectrum tokens are wired through.

## 2. Spectrum-bleed edge glow

- [x] 2.1 🤖 Replace the `glow-field-hero` and `glow-field` CSS treatments with the new "spectrum bleed" layered gradient (conic/radial, spectrum hues, edge-anchored, opacity/blur-limited so it never reduces foreground contrast below AA near `layout.contentMax`).
- [x] 2.2 🤖 Confirm the existing `motion-safe:animate-*` pattern covers `prefers-reduced-motion` for the new treatment (static state when reduced motion is set), per `design-system/spec.md`.
- [x] 2.3 🤖 Mark the glow layer `aria-hidden` (carry forward existing pattern from `glow-field-hero`).

## 3. Wayfinding-thread scroll motif

- [x] 3.1 🤖 Create `components/WayfindingThread.tsx`: a client component rendering an `aria-hidden`, `pointer-events: none` SVG path in spectrum hues.
- [x] 3.2 🤖 Implement scroll reveal via CSS scroll-driven animation (`animation-timeline: view()`/`scroll()`) with a fully-visible static fallback when unsupported — no scroll-jacking JS.
- [x] 3.3 🤖 Respect `prefers-reduced-motion` (disable/short-circuit the reveal animation to an instant static state).
- [x] 3.4 🤖 Wire `WayfindingThread` into shared page chrome (layout-level or per-`Section`, per what reads best once 3.1–3.3 are in place) so it's a shared design-system element, not per-page bespoke code.

## 4. Homepage hero restructure

- [x] 4.1 🤖 In `app/page.tsx`, restructure the hero markup per `design.md`'s heading-semantics decision: `<h1>` = "Church of Light" (largest display size), "Ecclesia Lucis" as a non-heading small/uppercase label above it, "A faith of equals" as `<h2>` sized between the label and the `<h1>`.
- [x] 4.2 🤖 Add the pronunciation guide ("Eck-Lee-See-Ah Lu-Chish") as a small `<p>` directly beneath "Ecclesia Lucis."
- [x] 4.3 🤖 Add deliberate vertical spacing between the name/title/statement block and the identity-statement paragraph, using a `spacing`-token-style `clamp()` value consistent with the existing `spacing.section` pattern in `lib/tokens.ts`.
- [x] 4.4 🤖 Verify the "what this is not" disclaimer and identity statement remain visible above the fold on a standard desktop viewport after the restructure (REQ-HOME-001 / `marketing-pages/spec.md`). — verified at 1280×800: identity bottom 545px, "what this is not" bottom 587px, both < 800px viewport.

## 5. Interior pages and shared chrome

- [x] 5.1 🤖 Update `components/PageHeader.tsx` to use the new spectrum-bleed glow treatment in place of `glow-field`, keeping its existing eyebrow/title/intro structure otherwise unchanged.
- [x] 5.2 🤖 Spot-check the other five routes (`/purpose`, `/tenets`, `/practices`, `/covenant`, `/about`, `/community`/`/contact`) for any hardcoded color usage that assumed the old dark-first palette (e.g. explicit dark hex values outside the token system) and migrate to tokens. — verified: no hardcoded colors outside `lib/tokens.ts`; all routes/components use semantic token utilities.

## 6. Verification

- [x] 6.1 🤖 Run the site locally and visually verify both themes (light default, dark alternate via `prefers-color-scheme: dark`) across all six routes, per `CLAUDE.md`'s "verify UI changes in a browser" rule. — built + served locally, screenshotted all 8 routes in light & dark via Playwright; light-default and dark-alternate both render fully-styled with the spectrum bleed and wayfinding thread.
- [x] 6.2 🤖 Verify `prefers-reduced-motion: reduce` disables/reduces both new motifs to static states. — thread renders `stroke-dashoffset:0` / `animation-name:none` (fully-drawn static) under reduce; glow drift gated by `motion-safe:` + the global reduced-motion reset.
- [x] 6.3 🤖 Spot-check contrast ratios (e.g. via browser devtools) for body text, headings, and any spectrum-accent text/icon usage in both themes against WCAG 2.2 AA. — computed ratios: light h1 17.85, h2/accent 5.88, body 9.68; dark h1 17.97, h2 6.62, body 11.37; all six spectrum accents on base ≥4.5:1 (light 4.60–5.88, dark 6.62–11.83).
- [x] 6.4 🤖 Confirm no doctrine copy, routes, or CTA logic changed — this pass is presentation-layer only. — diff limited to `globals.css`, `layout.tsx`, `page.tsx` (hero markup), `PageHeader.tsx`, `lib/tokens.ts`, `tailwind.config.ts`, new `WayfindingThread.tsx`; `content/`, route pages, and CTA components untouched.

## 7. Documentation

- [x] 7.1 🤖 Update `docs/CONTENT_STRATEGY.md`'s Brand Direction section to describe the v0.2 light/bright/spectrum direction as superseding the v0.1 "light in the dark" description.
