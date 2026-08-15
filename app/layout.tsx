import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WayfindingThread } from "@/components/WayfindingThread";
import { site } from "@/content/site";
import "./globals.css";

// Humanist high-contrast serif for headings; geometric sans for body
// (design-system spec). Exposed as CSS variables consumed by lib/tokens.ts.
const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["opsz"],
});

const body = Manrope({
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
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
        <main id="main" className="relative flex-1">
          {/* Shared decorative wayfinding-thread motif, threaded behind all
              page content (design-system spec: shared element, not per-page). */}
          <WayfindingThread />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
