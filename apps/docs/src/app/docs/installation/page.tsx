import type { Metadata } from 'next';
import Link from 'next/link';

import { CodeBlock, CommandBlock } from '@/components/code-block';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Installation',
  description: 'Add Noksha UI to a Tailwind v4 or v3 project — one package and one CSS import.',
};

const TAILWIND_V4 = `/* app.css */
@import 'tailwindcss';
@import '@noksha-ui/react/styles.css';`;

const TAILWIND_V3 = `// tailwind.config.js
module.exports = {
  presets: [require('@noksha-ui/tailwind').preset],
  content: [
    './src/**/*.{ts,tsx}',
    // v3 does not scan node_modules on its own.
    './node_modules/@noksha-ui/react/dist/**/*.js',
  ],
};`;

const THEME_SCRIPT = `// app/layout.tsx
import { themeScript } from '@noksha-ui/react/theme-script';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript() }} />
      </head>
      <body>{children}</body>
    </html>
  );
}`;

const PROVIDER = `'use client';

import { ThemeProvider } from '@noksha-ui/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}`;

const RSC_GOOD = `// app/page.tsx — a Server Component
import { CardRoot, CardHeader, CardTitle, CardContent } from '@noksha-ui/react';

export default function Page() {
  return (
    <CardRoot>
      <CardHeader><CardTitle>Works</CardTitle></CardHeader>
      <CardContent>Flat exports cross the server/client boundary.</CardContent>
    </CardRoot>
  );
}`;

const RSC_BAD = `// app/page.tsx — a Server Component
import { Card } from '@noksha-ui/react';

export default function Page() {
  // Card.Root is undefined here: a "use client" module's exports arrive as
  // opaque client references, and a server file cannot read through one.
  return <Card.Root>…</Card.Root>;
}`;

export default function InstallationPage() {
  return (
    <article className="max-w-4xl">
      <PageHeader
        eyebrow="Getting started"
        title="Installation"
        description="One package and one CSS import. No provider is required, and no configuration file."
      />

      <section className="mb-12">
        <h2 className="mb-3 font-semibold text-fg text-xl">1. Install the package</h2>
        <CommandBlock command="pnpm add @noksha-ui/react" />
        <p className="mt-3 text-fg-muted text-sm">
          <code>react</code> and <code>react-dom</code> ({'>'}=18) are peer dependencies. Nothing
          else is.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-semibold text-fg text-xl">2. Import the stylesheet</h2>
        <p className="mb-3 text-fg-muted text-sm">
          This one file carries the tokens, the theme, the animations and the tone rules. It is
          generated from the token engine, so it cannot drift from what the components expect.
        </p>
        <CodeBlock code={TAILWIND_V4} lang="css" />

        <h3 className="mt-6 mb-2 font-semibold text-base text-fg">Still on Tailwind v3?</h3>
        <p className="mb-3 text-fg-muted text-sm">
          Use the preset instead. You are not stranded, but v4 is the first-class path.
        </p>
        <CodeBlock code={TAILWIND_V3} lang="js" />
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-semibold text-fg text-xl">3. Stop the dark-mode flash</h2>
        <p className="mb-3 text-fg-muted text-sm">
          Optional, but do it if you support dark mode. <code>themeScript()</code> returns a small
          string that runs before anything paints and stamps the theme onto{' '}
          <code>&lt;html&gt;</code>. Without it, a dark-mode visitor sees a white frame on every
          load, because React has not started yet.
        </p>
        <CodeBlock code={THEME_SCRIPT} />
        <p className="mt-3 text-fg-muted text-sm">
          It ships from its own entry with no <code>&quot;use client&quot;</code> directive, so a
          Server Component can call it during its own render.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-semibold text-fg text-xl">4. Only if you need a theme toggle</h2>
        <p className="mb-3 text-fg-muted text-sm">
          Theming itself needs no provider — the tokens are CSS variables.{' '}
          <code>ThemeProvider</code> exists solely to switch modes and keep tabs in sync. Skip it if
          your app has one theme.
        </p>
        <CodeBlock code={PROVIDER} />
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-semibold text-fg text-xl">Using it from a Server Component</h2>
        <p className="mb-4 max-w-2xl text-fg-muted text-sm">
          Every component is importable from a server file — it simply becomes a client component,
          which it is. One rule: <strong className="text-fg">use the flat exports</strong>.
        </p>

        <div className="mb-4 rounded-lg border border-success/40 bg-success-subtle/40 p-4">
          <p className="mb-3 font-medium text-success-fg text-sm">Works in a server file</p>
          <CodeBlock code={RSC_GOOD} />
        </div>

        <div className="rounded-lg border border-danger/40 bg-danger-subtle/40 p-4">
          <p className="mb-3 font-medium text-danger-fg text-sm">Does not</p>
          <CodeBlock code={RSC_BAD} />
        </div>

        <p className="mt-4 max-w-2xl text-fg-muted text-sm">
          The <code>Card.Root</code> namespace form is a convenience for client components, where it
          works fine. This is a constraint of React Server Components, not of Noksha — it applies to
          any library that exports a namespace object from a client module. Every component ships
          both forms, so the flat one is always available.
        </p>
      </section>

      <section className="noksha-prose">
        <h2>Next</h2>
        <ul>
          <li>
            <Link href="/docs/components">Browse the components</Link> — every one rendered live,
            with the code to copy.
          </li>
          <li>
            <Link href="/docs/theming">Theming</Link> — rebrand the whole library with one
            declaration.
          </li>
          <li>
            <Link href="/docs/cli">Owning the source</Link> — copy a component into your own tree.
          </li>
        </ul>
      </section>
    </article>
  );
}
