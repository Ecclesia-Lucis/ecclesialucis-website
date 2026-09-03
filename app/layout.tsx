import type { Metadata, Viewport } from "next";
import { Odibee_Sans, DM_Sans } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";
import { paperTheme } from "@/lib/tokens";
import "./globals.css";

// Blocky/technical display face for the wordmark, headings, and threshold
// labels; humanist sans for body (design-system spec: "Threshold palette
// and typography"). Exposed as CSS variables consumed by lib/tokens.ts.
// Odibee Sans ships a single weight (400) — there is no heavier cut to load.
const display = Odibee_Sans({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.identity,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.identity,
    url: `https://${site.domain}`,
    siteName: site.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  // The site never switches to dark on `prefers-color-scheme: dark`
  // (tailwind.config.ts) — the fixed paper theme is the only theme.
  themeColor: paperTheme.base,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:font-semibold focus:text-accent-contrast"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
