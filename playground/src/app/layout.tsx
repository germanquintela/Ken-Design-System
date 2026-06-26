import type { Metadata } from 'next';
// Dogfood the library's own font: the SAME entry any consumer imports. It
// declares the Lausanne @font-face and sets --font-lausanne (resolved by
// globals.css's body stack + Ken's typography token). A Next app could instead
// self-host via next/font/local for build-time preload — both satisfy the var.
import '@ken/react/fonts.css';
import './globals.css';
import { ChatProvider } from '@/hooks/ChatProvider';

export const metadata: Metadata = {
  title: 'Ken Playground',
  description:
    'An LLM-safe recreation of the Ramp design system, built with StyleX.',
  icons: {
    icon: [
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.ico', sizes: 'any' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
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
