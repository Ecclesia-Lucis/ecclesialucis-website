/**
 * Design tokens — the single source of truth for color, typography, and spacing.
 *
 * v0.4 "Threshold" (openspec/changes/web-v0-4-threshold): a fixed neutral
 * pair — paper (`#FBF9F4`) and void (`#08070A`) — plus one warm ember-gold
 * accent used at the same hue in both states. This is the sole visual theme:
 * it does not vary with `prefers-color-scheme`, and there is no second
 * "dark mode" to opt into (superseded v0.3's spectrum-accent/dark-theme
 * system entirely).
 *
 * The paper/void inversion is content the visitor scrolls through on the
 * homepage (see ThresholdReveal/Chamber), not a page-level theme choice.
 * `paperTheme` below IS the page-level theme, applied at `:root` — every
 * page (including every homepage chamber outside its own void-toned
 * subtree) renders on paper by default. `voidOverrides` is a small set of
 * CSS-variable overrides scoped to `[data-tone="void"]`, so the same
 * `bg-base`/`text-ink`/... utilities read void-tinted values only inside a
 * chamber that has flipped to void, and paper-tinted everywhere else — no
 * component needs a parallel "void" class name of its own.
 *
 * These raw values are consumed by tailwind.config.ts, which:
 *   1. emits them as CSS custom properties (`:root` for the paper theme,
 *      `[data-tone="void"]` for the void overrides), and
 *   2. exposes semantic color utilities (bg-base, text-ink, ...) that read
 *      those variables.
 *
 * To re-skin the site, edit the values here — no page or component file
 * needs to change (design-system spec: "Palette change touches one file").
 */

/** Semantic color roles, resolved per theme. */
export type ColorRole =
  | "base" // page background
  | "surface" // raised panels / cards
  | "surfaceMuted" // subtle fills, hovers
  | "border" // hairlines, dividers
  | "ink" // primary text
  | "inkMuted" // secondary text
  | "inkSubtle" // captions, metadata
  | "accent" // ember-gold brand accent
  | "accentSoft" // dimmer accent for large fills / borders
  | "accentContrast" // text/icon color that sits legibly on `accent`
  | "focus"; // focus ring

export type ThemeColors = Record<ColorRole, string>;

/**
 * Paper theme — the site's single fixed theme, applied at `:root`. Contrast
 * ratios target WCAG 2.2 AA (docs/PRD.md §5.3): ink on base ~17.9:1,
 * accent on base ~4.66:1, accentContrast (paper) on accent ~4.66:1.
 */
export const paperTheme: ThemeColors = {
  base: "#FBF9F4",
  surface: "#F2EEE2",
  surfaceMuted: "#E8E1D0",
  border: "#DCD3BE",
  ink: "#17150F",
  inkMuted: "#55503F",
  inkSubtle: "#7A7460",
  accent: "#8A6D1F",
  accentSoft: "#C9A15B",
  accentContrast: "#FBF9F4",
  focus: "#8A6D1F",
};

/**
 * Void overrides — only the roles that actually change when a homepage
 * chamber flips to the void state (design-system spec: "Iris threshold-reveal
 * mechanism"). `accent`/`accentSoft`/`accentContrast` are intentionally
 * omitted: the spec requires the accent hue be identical in both states, so
 * those simply inherit the `:root` value. Contrast ratios: onVoid ink on
 * void base ~17.2:1, accent on void base ~4.1:1 — below the 4.5:1 AA
 * threshold for normal text, so the chamber eyebrow that uses this color
 * is set at 19px/bold specifically to qualify for the 3:1 large-text
 * threshold instead (components/Chamber.tsx; verified in tasks.md 6.5).
 */
export const voidOverrides: Partial<ThemeColors> = {
  base: "#08070A",
  border: "#2A2618",
  ink: "#F5F1E6",
  inkMuted: "#BDB6A0",
  inkSubtle: "#8B856F",
};

/** CSS variable name for a given color role (kebab-cased). */
export function cssVarName(role: ColorRole): string {
  const kebab = role.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
  return `--color-${kebab}`;
}

/** Font-family stacks. Concrete display/body faces are wired via next/font in app/layout.tsx. */
export const fontStacks = {
  /** Odibee Sans — blocky/technical display face for the wordmark, headings, and threshold/section labels. */
  display: 'var(--font-display), Impact, "Arial Narrow Bold", sans-serif',
  /** DM Sans — humanist sans for body/subtext. */
  body: 'var(--font-body), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
} as const;

/** Modular type scale (rem), roughly a 1.25 (major third) ratio. */
export const fontSizes = {
  xs: ["0.75rem", { lineHeight: "1.5" }],
  sm: ["0.875rem", { lineHeight: "1.55" }],
  base: ["1rem", { lineHeight: "1.65" }],
  lg: ["1.125rem", { lineHeight: "1.6" }],
  xl: ["1.375rem", { lineHeight: "1.45" }],
  "2xl": ["1.75rem", { lineHeight: "1.25" }],
  "3xl": ["2.25rem", { lineHeight: "1.15" }],
  "4xl": ["3rem", { lineHeight: "1.08" }],
  "5xl": ["3.75rem", { lineHeight: "1.04" }],
  "6xl": ["4.5rem", { lineHeight: "1.0" }],
} as const;

/** Spacing additions layered on top of Tailwind's default scale. */
export const spacing = {
  section: "clamp(4rem, 10vw, 8rem)",
  gutter: "clamp(1.25rem, 5vw, 2rem)",
} as const;

/** Max content measure — keeps text legible on 2560px viewports (site-scaffold spec). */
export const layout = {
  contentMax: "72rem",
  proseMax: "44rem",
} as const;
