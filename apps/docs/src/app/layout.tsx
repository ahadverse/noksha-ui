import { themeScript } from '@prism-ui/react/theme-script';
import type { Metadata, Viewport } from 'next';
import type * as React from 'react';

import { Providers } from '@/components/providers';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getNavGroups } from '@/lib/nav';
import { SITE_URL } from '@/lib/site';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Prism UI — accessible React components you can copy',
    template: '%s · Prism UI',
  },
  description:
    'An open-source React component library built on Tailwind CSS. Browse every component, see it live in light and dark, and copy the code.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0e13' },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const groups = await getNavGroups();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          The no-flash script, inlined before anything paints. It stamps the
          theme class on <html> synchronously, so a dark-mode visitor never sees
          a white frame (ARCHITECTURE.md §3.4). `suppressHydrationWarning` above
          is required precisely because this script mutates <html> before React
          gets to compare it.
        */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: a build-time constant from the library. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript() }} />
      </head>
      <body className="min-h-dvh bg-canvas text-fg antialiased">
        <Providers>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent-solid focus:px-4 focus:py-2 focus:text-accent-ink"
          >
            Skip to content
          </a>
          <SiteHeader groups={groups} />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
