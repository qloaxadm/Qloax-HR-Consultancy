import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "motion/react";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SITE, SITE_URL } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — Strategic Talent Partners`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} — Strategic Talent Partners`,
    description: SITE.description,
    url: SITE_URL,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Strategic Talent Partners`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
        >
          Skip to content
        </a>
        <MotionConfig reducedMotion="user">
          <CustomCursor />
          <Navigation />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
