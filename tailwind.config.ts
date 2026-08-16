import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import {
  darkTheme,
  lightTheme,
  cssVarName,
  fontStacks,
  fontSizes,
  spacing,
  layout,
  type ColorRole,
  type ThemeColors,
} from "./lib/tokens";

/** Build the `{ "--color-x": "#hex" }` map for a theme from the token definitions. */
function themeVars(theme: ThemeColors): Record<string, string> {
  return (Object.keys(theme) as ColorRole[]).reduce<Record<string, string>>((acc, role) => {
    acc[cssVarName(role)] = theme[role];
    return acc;
  }, {});
}

/** Semantic color utilities (bg-base, text-ink, ...) that read the CSS variables. */
const semanticColors = (Object.keys(darkTheme) as ColorRole[]).reduce<Record<string, string>>(
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
        chapter: spacing.chapter,
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
        // Slower, larger-amplitude drift for the v0.3 spectrum-bleed edge glow
        // ("tens of seconds", per docs/design/v0-3-radical-light-vision.md §4.2)
        // — distinct from the tighter hero light-source `drift` above.
        "spectrum-drift": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(0, -3%, 0) scale(1.04)" },
        },
        // One-shot kinetic-type load-in for the "Ecclesia Lucis" hero wordmark
        // (design-system spec: "One-shot kinetic-type hero load-in").
        "kinetic-type": {
          "0%": { fontWeight: "300", letterSpacing: "0.12em", opacity: "0" },
          "55%": { opacity: "1" },
          "100%": { fontWeight: "600", letterSpacing: "-0.01em", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "drift": "drift 18s ease-in-out infinite",
        "spectrum-drift": "spectrum-drift 42s ease-in-out infinite",
        "kinetic-type": "kinetic-type 1.1s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        // Light (true-white base) is the authored default — v0.3 theme-role swap.
        ":root": themeVars(lightTheme),
        // Dark theme when the visitor's system prefers dark — equally polished
        // secondary alternate, no persisted override needed for v1.
        "@media (prefers-color-scheme: dark)": {
          ":root": themeVars(darkTheme),
        },
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
