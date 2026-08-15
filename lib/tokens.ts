/**
 * Design tokens — the single source of truth for color, typography, and spacing.
 *
 * The "light in the dark" concept from docs/CONTENT_STRATEGY.md: a deep, calm
 * dark-mode-first palette (near-black / deep indigo) with warm luminous
 * gold/amber accents, plus an equally-polished light theme.
 *
 * These raw values are consumed by tailwind.config.ts, which:
 *   1. emits them as CSS custom properties for each theme (dark = authored
 *      default at :root, light via `@media (prefers-color-scheme: light)`), and
 *   2. exposes semantic color utilities (bg-base, text-ink, ...) that read
 *      those variables.
 *
 * To re-skin the site, edit the values here — no page or component file needs
 * to change (design-system spec: "Palette change touches one file").
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
  | "accent" // warm luminous gold/amber — primary brand light
  | "accentSoft" // dimmer accent for large fills / borders
  | "accentContrast" // text/icon color that sits legibly on `accent`
  | "focus"; // focus ring

export type ThemeColors = Record<ColorRole, string>;

/**
 * Dark theme — the authored default. Near-black indigo base, warm gold accent.
 * Contrast ratios target WCAG 2.2 AA (docs/PRD.md §5.3): ink on base ~15:1,
 * accent on base ~9:1, accentContrast (near-black) on accent ~8:1.
 */
export const darkTheme: ThemeColors = {
  base: "#0a0a12",
  surface: "#12121f",
  surfaceMuted: "#1b1b2e",
  border: "#2a2a42",
  ink: "#f4f1ea",
  inkMuted: "#c3c0d4",
  inkSubtle: "#8f8ca8",
  accent: "#f2b64a",
  accentSoft: "#c98a2e",
  accentContrast: "#1a1204",
  focus: "#f2b64a",
};

/**
 * Light theme — an equally-polished alternative, not a stripped-down fallback.
 * Warm off-white base, deep indigo ink, amber accent darkened for contrast on
 * light backgrounds.
 */
export const lightTheme: ThemeColors = {
  base: "#faf8f3",
  surface: "#ffffff",
  surfaceMuted: "#f1ede3",
  border: "#e0d9ca",
  ink: "#1a1726",
  inkMuted: "#4a465c",
  inkSubtle: "#6c6880",
  accent: "#a86a12",
  accentSoft: "#c98a2e",
  accentContrast: "#fffaf0",
  focus: "#a86a12",
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
} as const;

/** Max content measure — keeps text legible on 2560px viewports (site-scaffold spec). */
export const layout = {
  contentMax: "72rem",
  proseMax: "44rem",
} as const;
