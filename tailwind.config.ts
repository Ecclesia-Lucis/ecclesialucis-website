import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import {
  paperTheme,
  voidOverrides,
  cssVarName,
  fontStacks,
  fontSizes,
  spacing,
  layout,
  type ColorRole,
  type ThemeColors,
} from "./lib/tokens";

/** Build the `{ "--color-x": "#hex" }` map for a (full or partial) theme from the token definitions. */
function themeVars(theme: Partial<ThemeColors>): Record<string, string> {
  return (Object.keys(theme) as ColorRole[]).reduce<Record<string, string>>((acc, role) => {
    const value = theme[role];
    if (value) acc[cssVarName(role)] = value;
    return acc;
  }, {});
}

/** Semantic color utilities (bg-base, text-ink, ...) that read the CSS variables. */
const semanticColors = (Object.keys(paperTheme) as ColorRole[]).reduce<Record<string, string>>(
  (acc, role) => {
    acc[role.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)] = `var(${cssVarName(role)})`;
    return acc;
  },
  {},
);

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    // `colors.base` (page background) and the default fontSize scale both
    // claim the class name `text-base` — Tailwind emits a color utility and
    // a font-size utility under the same selector, and the responsive color
    // one (e.g. `sm:text-base`) silently wins, painting text
    // background-colored (invisible). No component intentionally wants
    // "text-colored-like-the-page-background", so `textColor` is replaced
    // here (top-level, not `extend` — `extend` merges with Tailwind's
    // default, which itself falls back to `colors` and would bring `base`
    // right back) with `colors` minus `base`.
    textColor: {
      ...Object.fromEntries(Object.entries(semanticColors).filter(([role]) => role !== "base")),
      transparent: "transparent",
      current: "currentColor",
    },
    extend: {
      colors: semanticColors,
      fontFamily: {
        display: fontStacks.display.split(",").map((s) => s.trim()),
        body: fontStacks.body.split(",").map((s) => s.trim()),
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fontSize: fontSizes as any,
      spacing: {
        section: spacing.section,
        gutter: spacing.gutter,
      },
      maxWidth: {
        content: layout.contentMax,
        prose: layout.proseMax,
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(0.75rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "drift": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -2%, 0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "drift": "drift 18s ease-in-out infinite",
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        // The single fixed Threshold theme — paper base, applied everywhere
        // by default (site-scaffold spec: "Fixed single theme, no
        // OS-driven switching").
        ":root": themeVars(paperTheme),
        // Void-state overrides, scoped to a homepage chamber that has
        // flipped via ThresholdReveal (design-system spec: "Iris
        // threshold-reveal mechanism"). Only the roles listed in
        // `voidOverrides` differ; `accent`/`accentSoft`/`accentContrast`
        // inherit the `:root` value on purpose — the accent hue is
        // identical in both states.
        "[data-tone='void']": themeVars(voidOverrides),
        // Disable decorative motion for visitors who ask for it (design-system spec).
        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": {
            animationDuration: "0.001ms !important",
            animationIterationCount: "1 !important",
            transitionDuration: "0.001ms !important",
            scrollBehavior: "auto !important",
          },
        },
      });
    }),
  ],
};

export default config;
