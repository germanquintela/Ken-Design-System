import type { Metadata } from 'next';
// Dogfood the library's own font: the SAME entry any consumer imports. It
// declares the Lausanne @font-face and sets --font-lausanne (resolved by
// globals.css's body stack + Ken's typography token). A Next app could instead
// self-host via next/font/local for build-time preload — both satisfy the var.
import '@ken/react/fonts.css';
import './globals.css';
import { ChatProvider } from '@/hooks/ChatProvider';

const TITLE = 'Ken Playground';
const DESCRIPTION =
  'An LLM-safe recreation of the Ramp design system, built with StyleX.';
// Absolute base so the OG/Twitter image resolves to a full URL — crawlers
// (and Vercel's link unfurls) reject relative image paths.
const SITE_URL = 'https://kenplayground.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: [
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.ico', sizes: 'any' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: TITLE,
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
    images: [
      {
        url: '/og.png',
        width: 600,
        height: 315,
        alt: 'Ken — an LLM-safe recreation of the Ramp design system',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* ChatProvider lives at the root so the sidebar's conversation list is
          available on every page, not just the AI builder route. */}
      <body>
        <ChatProvider>{children}</ChatProvider>
      </body>
    </html>
  );
}
