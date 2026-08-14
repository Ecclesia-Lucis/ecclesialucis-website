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
        // Dark is the authored default.
        ":root": themeVars(darkTheme),
        // Light theme when the visitor's system prefers light — equally polished,
        // no persisted override needed for v1 (design.md theme decision).
        "@media (prefers-color-scheme: light)": {
          ":root": themeVars(lightTheme),
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
