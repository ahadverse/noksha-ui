import Link from 'next/link';

import { REPO_URL } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="border-line-subtle border-t">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-2 px-4 py-8 text-fg-muted text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          Built with <Link href="/docs/theming">OKLCH tokens</Link>, zero runtime CSS-in-JS, and no
          ThemeProvider requirement.
        </p>
        <p>
          MIT licensed ·{' '}
          <a
            href={REPO_URL}
            rel="noreferrer noopener"
            target="_blank"
            className="underline underline-offset-4 hover:text-fg"
          >
            Source
          </a>
        </p>
      </div>
    </footer>
  );
}
