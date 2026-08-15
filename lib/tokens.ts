/**
 * Design tokens — the single source of truth for color, typography, and spacing.
 *
 * The v0.2 "light and its full spectrum" concept from docs/CONTENT_STRATEGY.md:
 * a bright, light-mode-first palette (white/near-white base, black/near-black
 * ink) with a small set of saturated accent hues drawn from the visible light
 * spectrum (a compressed ROYGBIV). The v0.1 dark "light in the dark" palette is
 * kept as an equally-polished secondary (dark-mode) alternate — the primary and
 * secondary roles are simply reversed from v0.1.
 *
 * These raw values are consumed by tailwind.config.ts, which:
 *   1. emits them as CSS custom properties for each theme (light = authored
 *      default at :root, dark via `@media (prefers-color-scheme: dark)`), and
 *   2. exposes semantic color utilities (bg-base, text-ink, text-spectrum-accent1,
 *      ...) that read those variables.
 *
 * To re-skin the site, edit the values here — no page or component file needs
 * to change (design-system spec: "Palette change touches one file").
 *
 * Every spectrum accent is tuned so `spectrumAccentN` on `base` clears WCAG 2.2
 * AA (docs/PRD.md §5.3): 4.5:1 for normal text, 3:1 for large text / icons.
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
  | "accent" // primary brand accent — defaults to a spectrum hue (see below)
  | "accentSoft" // dimmer accent for large fills / borders
  | "accentContrast" // text/icon color that sits legibly on `accent`
  | "focus" // focus ring
  | "spectrumAccent1" // compressed ROYGBIV — red / coral
  | "spectrumAccent2" // orange
  | "spectrumAccent3" // gold / yellow
  | "spectrumAccent4" // green
  | "spectrumAccent5" // blue-violet (the `accent` default — closest analog to the v0.1 amber role)
  | "spectrumAccent6"; // violet

export type ThemeColors = Record<ColorRole, string>;

/**
 * Light theme — the authored default. Near-white base, near-black ink, with a
 * compressed-ROYGBIV spectrum accent set. Contrast targets WCAG 2.2 AA
 * (docs/PRD.md §5.3): ink on base ~18:1, each spectrum accent on base ≥4.5:1 for
 * text, accentContrast (white) on accent ~5.9:1. `accent` mirrors spectrumAccent5
 * so existing `text-accent` / `bg-accent` usages keep working unchanged.
 */
export const lightTheme: ThemeColors = {
  base: "#f7f7fa",
  surface: "#ffffff",
  surfaceMuted: "#ececf2",
  border: "#dcdce4",
  ink: "#0f0f16",
  inkMuted: "#3f3f4d",
  inkSubtle: "#5c5c6e",
  accent: "#4f46e5",
  accentSoft: "#818cf8",
  accentContrast: "#ffffff",
  focus: "#4f46e5",
  spectrumAccent1: "#c81e45", // red / coral
  spectrumAccent2: "#c2410c", // orange
  spectrumAccent3: "#a16207", // gold / yellow
  spectrumAccent4: "#15803d", // green
  spectrumAccent5: "#4f46e5", // blue-violet
  spectrumAccent6: "#7c3aed", // violet
};

/**
 * Dark theme — the equally-polished secondary alternate (v0.1's "light in the
 * dark" palette, now behind `prefers-color-scheme: dark`). Near-black base,
 * near-white ink, brighter spectrum accents tuned for legibility on a dark base.
 * Contrast targets WCAG 2.2 AA: ink on base ~16:1, each spectrum accent on base
 * ≥4.5:1 for text, accentContrast (near-black) on accent ~7:1.
 */
export const darkTheme: ThemeColors = {
  base: "#0a0a0f",
  surface: "#131320",
  surfaceMuted: "#1c1c2b",
  border: "#2b2b40",
  ink: "#f5f4f2",
  inkMuted: "#c5c3d0",
  inkSubtle: "#8f8ca6",
  accent: "#818cf8",
  accentSoft: "#4f46e5",
  accentContrast: "#0a0a0f",
  focus: "#818cf8",
  spectrumAccent1: "#fb7185", // red / coral
  spectrumAccent2: "#fb923c", // orange
  spectrumAccent3: "#fbbf24", // gold / yellow
  spectrumAccent4: "#4ade80", // green
  spectrumAccent5: "#818cf8", // blue-violet
  spectrumAccent6: "#c084fc", // violet
};

/** CSS variable name for a given color role (kebab-cased). */
export function cssVarName(role: ColorRole): string {
  const kebab = role.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
  return `--color-${kebab}`;
}

/** Font-family stacks. Concrete display/body faces are wired via next/font in app/layout.tsx. */
export const fontStacks = {
  /** Humanist / high-contrast serif for headings — gravitas, "church" register. */
  display: 'var(--font-display), "Iowan Old Style", Georgia, Cambria, "Times New Roman", serif',
  /** Geometric sans for body — modern, readable, approachable. */
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
  /**
   * A deliberate "beat" of vertical breathing room — smaller than a full
   * section gap. Separates the homepage hero's name/title/statement block from
   * the identity paragraph so the opening reads as two beats, not one dense
   * block (marketing-pages spec: "Hero block breathes before the identity
   * statement"). Same responsive clamp() pattern as `section`, scaled down.
   */
  heroBeat: "clamp(2.5rem, 6vw, 4rem)",
} as const;

/** Max content measure — keeps text legible on 2560px viewports (site-scaffold spec). */
export const layout = {
  contentMax: "72rem",
  proseMax: "44rem",
} as const;
