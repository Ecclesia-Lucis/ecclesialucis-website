/**
 * Design tokens — the single source of truth for color, typography, and spacing.
 *
 * v0.3 "Explosion of Light" concept (docs/design/v0-3-radical-light-vision.md):
 * a true bright-white/near-white base with near-black ink is the authored
 * default, paired with a small spectrum of bright, saturated accent hues
 * (spectrumAccent1..6, a compressed ROYGBIV). The prior dark, near-black/indigo
 * palette with a single gold/amber accent remains available as an
 * equally-polished secondary (dark-mode) theme — same token shape, reused from
 * the superseded web-v0-2-redesign proposal, values re-tuned for the whiter base.
 *
 * These raw values are consumed by tailwind.config.ts, which:
 *   1. emits them as CSS custom properties for each theme (light = authored
 *      default at :root, dark via `@media (prefers-color-scheme: dark)`), and
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
  | "accent" // primary brand accent — defaults to spectrumAccent5 (blue)
  | "accentSoft" // dimmer accent for large fills / borders
  | "accentContrast" // text/icon color that sits legibly on `accent`
  | "focus" // focus ring
  | "spectrumAccent1" // red
  | "spectrumAccent2" // orange
  | "spectrumAccent3" // gold/yellow
  | "spectrumAccent4" // green
  | "spectrumAccent5" // blue (== accent)
  | "spectrumAccent6"; // violet

export type ThemeColors = Record<ColorRole, string>;

/**
 * Light theme — the authored default. True bright-white/near-white base
 * (#ffffff), near-black ink, spectrum accent hues.
 * Contrast ratios target WCAG 2.2 AA (docs/PRD.md §5.3): ink on base ~18.6:1,
 * each spectrumAccentN on base >=4.5:1 for text, accentContrast (white) on
 * accent ~5.85:1.
 */
export const lightTheme: ThemeColors = {
  base: "#ffffff",
  surface: "#fbfbf9",
  surfaceMuted: "#f4f3ef",
  border: "#e3e1d8",
  ink: "#141311",
  inkMuted: "#4d4a45",
  inkSubtle: "#726f68",
  accent: "#2360c9",
  accentSoft: "#5b8fe0",
  accentContrast: "#ffffff",
  focus: "#2360c9",
  spectrumAccent1: "#c22a3e",
  spectrumAccent2: "#b8560c",
  spectrumAccent3: "#8a6a00",
  spectrumAccent4: "#2f7a3a",
  spectrumAccent5: "#2360c9",
  spectrumAccent6: "#7a3fc9",
};

/**
 * Dark theme — an equally-polished secondary alternative, not a stripped-down
 * fallback. Near-black indigo base (carried from v0.1), spectrum accent hues
 * re-tuned for legibility against it. Contrast ratios target WCAG 2.2 AA:
 * ink on base ~16.5:1, each spectrumAccentN on base >=6:1, accentContrast
 * (near-black) on accent ~9.55:1.
 */
export const darkTheme: ThemeColors = {
  base: "#0a0a12",
  surface: "#12121f",
  surfaceMuted: "#1b1b2e",
  border: "#2a2a42",
  ink: "#f4f1ea",
  inkMuted: "#c3c0d4",
  inkSubtle: "#8f8ca8",
  accent: "#7db8ff",
  accentSoft: "#5b8fe0",
  accentContrast: "#0a0a12",
  focus: "#7db8ff",
  spectrumAccent1: "#ff6b7a",
  spectrumAccent2: "#ff9d4d",
  spectrumAccent3: "#f2c94c",
  spectrumAccent4: "#6fd68a",
  spectrumAccent5: "#7db8ff",
  spectrumAccent6: "#c39bff",
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
  /** Generous gap between homepage "chapters" (v0.3 journey structure) — larger than `section` so the pacing itself reads as deliberate dead space. */
  chapter: "clamp(6rem, 16vw, 12rem)",
  gutter: "clamp(1.25rem, 5vw, 2rem)",
} as const;

/** Max content measure — keeps text legible on 2560px viewports (site-scaffold spec). */
export const layout = {
  contentMax: "72rem",
  proseMax: "44rem",
} as const;
