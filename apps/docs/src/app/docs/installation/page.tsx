import type { Metadata } from 'next';
import Link from 'next/link';
import type * as React from 'react';

import { CodeBlock, InstallBlock } from '@/components/code-block';
import { CodeTabs } from '@/components/code-tabs';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Installation',
  description: 'Add Noksha UI to a Tailwind v4 or v3 project — one package and one CSS import.',
};

const TAILWIND_V4 = `/* app.css — the only stylesheet you import */
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

const TAILWIND_V3_CSS = `/* app.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import '@noksha-ui/react/styles.css';`;

const THEME_SCRIPT_NEXT = `// app/layout.tsx
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

const THEME_SCRIPT_VITE = `<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <script type="module">
      import { themeScript } from '@noksha-ui/react/theme-script';
      // eslint-disable-next-line no-eval
      (0, eval)(themeScript());
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

const THEME_SCRIPT_PLAIN = `<!-- Any HTML page. Paste the class yourself if you prefer:
     the script only reads localStorage and matchMedia. -->
<script>
  (function () {
    var stored = localStorage.getItem('noksha-theme') || 'system';
    var dark =
      stored === 'dark' ||
      (stored === 'system' &&
        matchMedia('(prefers-color-scheme: dark)').matches);

    document.documentElement.classList.add(dark ? 'dark' : 'light');
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  })();
</script>`;

const PROVIDER = `// app/providers.tsx
'use client';

import { ThemeProvider } from '@noksha-ui/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}`;

const TOGGLE = `// components/theme-toggle.tsx
'use client';

import { Button, useTheme } from '@noksha-ui/react';

export function ThemeToggle() {
  const { resolvedTheme, toggle } = useTheme();

  return (
    <Button variant="ghost" tone="neutral" onClick={toggle}>
      {resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}
    </Button>
  );
}`;

const VERIFY = `import { Button } from '@noksha-ui/react';

export default function Page() {
  // A filled button in your brand colour, with a visible focus ring on Tab.
  // If it is unstyled, Tailwind is not seeing the package — see Troubleshooting.
  return <Button>It works</Button>;
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

const SOURCE_FIX = `/* app.css */
@import 'tailwindcss';
@import '@noksha-ui/react/styles.css';

/* Tailwind v4 skips node_modules when it scans for classes. The shipped
   stylesheet registers itself, but a strict setup may still need this. */
@source '../node_modules/@noksha-ui/react/dist';`;

const SCOPED_THEME = `// The marker can sit anywhere, not only on <html>.
// Overlays portal to <body>, and they carry this scope with them.
<div className="dark">
  <Drawer.Root>…</Drawer.Root>
</div>`;

export default function InstallationPage() {
  return (
    <article className="max-w-4xl">
      <PageHeader
        eyebrow="Getting started"
        title="Installation"
        description="One package and one CSS import. No provider is required, and no configuration file."
      />

      {/* A reader who lands here wants to know how long this will take before
          they start, so the shape of the whole job is stated up front. */}
      <div className="mb-12 grid gap-3 rounded-xl border border-line-subtle bg-subtle p-5 sm:grid-cols-3">
        {[
          { label: 'Required steps', value: 'Two' },
          { label: 'Config files to write', value: 'None' },
          { label: 'Providers to wrap', value: 'None' },
        ].map((fact) => (
          <div key={fact.label}>
            <p className="font-semibold text-fg text-lg">{fact.value}</p>
            <p className="text-fg-muted text-sm">{fact.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-12">
        <Step number={1} title="Install the package" id="install">
          <InstallBlock packages="@noksha-ui/react" />
          <p className="mt-3 text-fg-muted text-sm">
            <code>react</code> and <code>react-dom</code> ({'>'}=18) are peer dependencies. Nothing
            else is required.
          </p>
        </Step>

        <Step number={2} title="Import the stylesheet" id="stylesheet">
          <p className="mb-4 text-fg-muted text-sm">
            This one file carries the tokens, the theme, the animations and the tone rules. It is
            generated from the token engine, so it cannot drift from what the components expect.
          </p>

          <CodeTabs
            label="Tailwind version"
            panels={[
              {
                value: 'v4',
                label: 'Tailwind v4',
                note: 'recommended',
                description:
                  'Two imports and nothing else. The stylesheet registers its own sources, so you never touch a config file.',
                node: <CodeBlock code={TAILWIND_V4} lang="css" />,
              },
              {
                value: 'v3',
                label: 'Tailwind v3',
                note: 'supported',
                description:
                  'Use the preset. You are not stranded on v3 — but v4 is the first-class path, and the preset exists to get you to it.',
                node: (
                  <div className="flex flex-col gap-3">
                    <CodeBlock code={TAILWIND_V3} lang="js" />
                    <CodeBlock code={TAILWIND_V3_CSS} lang="css" />
                  </div>
                ),
              },
            ]}
          />
        </Step>

        <Step
          number={3}
          title="Stop the dark-mode flash"
          id="no-flash"
          optional="Skip it if your app is light-only."
        >
          <p className="mb-4 text-fg-muted text-sm">
            <code>themeScript()</code> returns a small string that runs before anything paints and
            stamps the theme onto <code>&lt;html&gt;</code>. Without it, a dark-mode visitor sees a
            white frame on every load, because React has not started yet.
          </p>

          <CodeTabs
            label="Framework"
            panels={[
              {
                value: 'next',
                label: 'Next.js',
                description:
                  'It ships from an entry with no "use client" directive, so a Server Component can call it during its own render.',
                node: <CodeBlock code={THEME_SCRIPT_NEXT} />,
              },
              {
                value: 'vite',
                label: 'Vite / SPA',
                description:
                  'A single-page app paints from an empty HTML shell, so the script belongs in that shell rather than in a component.',
                node: <CodeBlock code={THEME_SCRIPT_VITE} lang="html" />,
              },
              {
                value: 'plain',
                label: 'Any HTML',
                description:
                  'There is nothing framework-specific in it. This is the same logic, written out, if you would rather not import anything.',
                node: <CodeBlock code={THEME_SCRIPT_PLAIN} lang="html" />,
              },
            ]}
          />
        </Step>

        <Step
          number={4}
          title="Add a theme toggle"
          id="toggle"
          optional="Only if users switch themes."
        >
          <p className="mb-4 text-fg-muted text-sm">
            Theming itself needs no provider — the tokens are CSS variables.{' '}
            <code>ThemeProvider</code> exists solely to switch modes and keep tabs in sync.
          </p>

          <div className="flex flex-col gap-3">
            <CodeBlock code={PROVIDER} />
            <CodeBlock code={TOGGLE} />
          </div>
        </Step>

        <Step number={5} title="Check it worked" id="verify" last>
          <p className="mb-4 text-fg-muted text-sm">
            Drop this on any page. You should get a filled button in the brand colour, with a
            visible focus ring when you press Tab.
          </p>
          <CodeBlock code={VERIFY} />
        </Step>
      </div>

      <section className="mt-16">
        <h2 className="mb-3 font-semibold text-2xl text-fg tracking-tight">
          Using it from a Server Component
        </h2>
        <p className="mb-5 max-w-2xl text-fg-muted">
          Every component is importable from a server file — it simply becomes a client component,
          which it is. One rule: <strong className="text-fg">use the flat exports</strong>.
        </p>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-success/40">
            <p className="border-success/30 border-b bg-success-subtle/50 px-4 py-2.5 font-medium text-success-fg text-sm">
              Works in a server file
            </p>
            <CodeBlock code={RSC_GOOD} variant="bare" className="bg-subtle" />
          </div>

          <div className="overflow-hidden rounded-xl border border-danger/40">
            <p className="border-danger/30 border-b bg-danger-subtle/50 px-4 py-2.5 font-medium text-danger-fg text-sm">
              Does not
            </p>
            <CodeBlock code={RSC_BAD} variant="bare" className="bg-subtle" />
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-fg-muted text-sm">
          The <code>Card.Root</code> namespace form is a convenience for client components, where it
          works fine. This is a constraint of React Server Components, not of Noksha — it applies to
          any library that exports a namespace object from a client module. Every component ships
          both forms, so the flat one is always available.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="mb-3 font-semibold text-2xl text-fg tracking-tight">Troubleshooting</h2>
        <p className="mb-5 max-w-2xl text-fg-muted">
          Three things account for nearly every report. Each has a one-line fix.
        </p>

        <div className="flex flex-col gap-4">
          <Problem
            symptom="Components render, but with no styling at all"
            cause="Tailwind is not seeing the package. v4 skips node_modules when it scans for classes; the shipped stylesheet registers itself, but a pnpm or monorepo layout can still defeat it."
          >
            <CodeBlock code={SOURCE_FIX} lang="css" />
          </Problem>

          <Problem
            symptom="Dark mode works on the page, but dialogs, drawers and tooltips stay light"
            cause="Overlays render into document.body to escape clipping and stacking contexts, so a theme declared on a wrapper below <html> used to be left behind. It no longer is — the overlay reads the mode where it logically sits and carries it through the portal."
          >
            <CodeBlock code={SCOPED_THEME} />
            <p className="mt-3 text-fg-muted text-sm">
              If you are pinned to an older version, the fix is to move the <code>dark</code> class
              onto <code>&lt;html&gt;</code>, which is what <code>themeScript()</code> does for you
              in step 3.
            </p>
          </Problem>

          <Problem
            symptom="Card.Root is undefined, or the build says a component is not a function"
            cause="A Server Component is reading through a namespace object. Import the flat export instead — CardRoot rather than Card.Root."
          />
        </div>
      </section>

      <section className="noksha-prose mt-16">
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

/**
 * One numbered step.
 *
 * The number is a real element rather than a list marker so the rule beneath it
 * can run the height of the step — which is what makes five sections read as one
 * sequence instead of five headings that happen to be near each other.
 */
function Step({
  number,
  title,
  id,
  optional,
  last = false,
  children,
}: {
  number: number;
  title: string;
  id: string;
  optional?: string;
  /** Drops the connector, which would otherwise dangle off the last step. */
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex gap-4 sm:gap-5">
        <div className="flex flex-col items-center">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-subtle bg-surface font-semibold text-fg text-sm tabular-nums">
            {number}
          </span>
          {last ? null : <span aria-hidden="true" className="mt-2 w-px flex-1 bg-line-subtle" />}
        </div>

        <div className="min-w-0 flex-1 pb-2">
          <h2 className="flex flex-wrap items-center gap-x-3 gap-y-1 font-semibold text-fg text-xl">
            {title}
            {optional ? (
              <span className="rounded-full border border-line-subtle px-2 py-0.5 font-normal text-fg-muted text-xs">
                Optional — {optional}
              </span>
            ) : null}
          </h2>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </section>
  );
}

/** A symptom, its cause, and the fix — in the order a reader diagnoses in. */
function Problem({
  symptom,
  cause,
  children,
}: {
  symptom: string;
  cause: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line-subtle bg-surface p-5">
      <h3 className="font-semibold text-fg">{symptom}</h3>
      <p className="mt-1.5 mb-4 text-fg-muted text-sm">{cause}</p>
      {children}
    </div>
  );
}
