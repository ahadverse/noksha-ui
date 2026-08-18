import type { Metadata } from 'next';
import Link from 'next/link';

import { CodeBlock, CommandBlock } from '@/components/code-block';
import { PageHeader } from '@/components/page-header';
import { getRegistryIndex } from '@/lib/registry';
import { REGISTRY_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'CLI',
  description:
    'Copy any component into your own tree with `noksha add`, and keep knowing what happened to it afterwards with `noksha diff`.',
};

const CONFIG = `{
  "registry": "https://storewike.store/r",
  "brand": "#6D4AFF",
  "css": "src/app/globals.css",
  "components": "src/components/ui",
  "alias": "@/components/ui",
  "tsx": true,
  "installed": {
    "button": {
      "hash": "4a2e88f3d734e843",
      "files": { "button/button.tsx": "9f2c1b8e4a0d7c33" }
    }
  }
}`;

const DIFF_OUTPUT = `button
  src/components/ui/button/button.tsx   yours

spinner
  src/components/ui/spinner/spinner.tsx  update available

→ noksha diff --apply updates the files you have not touched.`;

const REGISTRY_SHAPE = `{
  "name": "button",
  "type": "component",
  "title": "Button",
  "category": "actions",
  "dependencies": ["@noksha-ui/core"],
  "registryDependencies": ["spinner"],
  "internalDependencies": ["tone"],
  "api": { "interfaces": [...], "aliases": [...] },
  "files": [
    { "path": "button/button.tsx", "content": "…", "hash": "9f2c…" },
    { "path": "button/button.types.ts", "content": "…", "hash": "41ab…" }
  ]
}`;

const FETCH_ONE = `# Every component is a URL. This is what the docs pages render from.
curl ${REGISTRY_URL}/button.json

# And the catalogue, with a hash per component:
curl ${REGISTRY_URL}/index.json`;

const STATUSES: [string, string][] = [
  ['up to date', 'Identical to the registry.'],
  ['yours', 'You edited it. Upstream has not moved.'],
  ['update available', 'You have not touched it, and upstream has moved.'],
  ['conflict', 'Both moved. Overwriting would lose your edits.'],
  ['missing', 'Not on disk.'],
];

export default async function CliPage() {
  const index = await getRegistryIndex();

  return (
    <article className="max-w-4xl">
      <PageHeader
        eyebrow="Getting started"
        title="CLI"
        description="Noksha ships as a package and as copy-paste source. Take a component into your own tree and it is yours to change — without losing track of what upstream did next."
      />

      <section className="mb-12">
        <CommandBlock command="npx @noksha-ui/cli init" />
        <p className="mt-3 max-w-2xl text-fg-muted text-sm">
          Generates a stylesheet from your brand colour, imports it from the one Tailwind already
          compiles, and writes a <code>noksha.json</code> recording where things go. It reads the
          project first — your <code>src/</code> layout, the stylesheet with the Tailwind import in
          it, the <code>paths</code> alias in your tsconfig — and offers each guess as a default you
          can overrule.
        </p>
        <p className="mt-3 max-w-2xl text-fg-muted text-sm">
          The theme comes out of the same generator that builds the published package&rsquo;s{' '}
          <code>styles.css</code>, so the tokens, tone rules and keyframes are identical. Only the
          seed differs.
        </p>
        <div className="mt-4">
          <CommandBlock command="npx @noksha-ui/cli init --brand '#0EA5E9'" />
        </div>
      </section>

      <section className="mb-12">
        <CommandBlock command="npx @noksha-ui/cli add button" />
        <p className="mt-3 max-w-2xl text-fg-muted text-sm">
          Writes the component&rsquo;s files, and the files it imports. Asking for Button brings
          Spinner, because Button renders one; asking for Checkbox brings Field. The shared helpers
          come too, narrowed to the ones something you asked for actually reaches — the dependency
          graph is resolved from the real imports, so you cannot end up with a file that does not
          compile.
        </p>
        <p className="mt-3 max-w-2xl text-fg-muted text-sm">
          On the way in, imports are rewritten to your layout and alias, and{' '}
          <code>&quot;use client&quot;</code> is stamped on the files that need it. All{' '}
          {index.components.length} components are available this way, or <code>--all</code> for
          every one of them.
        </p>
        <p className="mt-3 max-w-2xl text-fg-muted text-sm">
          <code>@noksha-ui/core</code> stays a dependency. It is the focus traps, the dismiss-layer
          stack and the variant engine — not what anyone means by owning a component.
        </p>
      </section>

      <section className="mb-12">
        <CommandBlock command="npx @noksha-ui/cli diff" />
        <p className="mt-3 max-w-2xl text-fg-muted text-sm">
          The one copy-paste libraries tend to lack. Once a component is in your tree it stops being
          connected to anything, and an upstream accessibility fix six months later reaches nobody.
        </p>
        <p className="mt-3 mb-4 max-w-2xl text-fg-muted text-sm">
          This compares three things rather than two: what the registry serves now, what is in your
          tree, and what you were handed when you copied. That third one is recorded in{' '}
          <code>noksha.json</code>, and it is what turns an unhelpful &ldquo;these files
          differ&rdquo; into a verdict.
        </p>

        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {STATUSES.map(([status, meaning]) => (
                <tr key={status} className="border-line-subtle border-b last:border-0">
                  <td className="whitespace-nowrap py-2.5 pr-6 font-mono text-fg text-xs">
                    {status}
                  </td>
                  <td className="py-2.5 text-fg-muted">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CodeBlock code={DIFF_OUTPUT} lang="bash" />
        <p className="mt-3 max-w-2xl text-fg-muted text-sm">
          <code>--apply</code> writes the <strong className="text-fg">update available</strong>{' '}
          files and leaves everything else alone, so a fix lands in the components you never
          customised without touching the ones you did. <code>--verbose</code> prints the changed
          lines for the rest.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-semibold text-fg text-xl">noksha.json</h2>
        <p className="mb-4 max-w-2xl text-fg-muted text-sm">
          Commit it. <code>installed</code> is the record <code>diff</code> reads — without it in
          version control, a colleague who pulls your branch gets components that came, as far as
          the tool can tell, from nowhere.
        </p>
        <CodeBlock code={CONFIG} lang="json" />
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-semibold text-fg text-xl">The registry</h2>
        <p className="mb-4 max-w-2xl text-fg-muted text-sm">
          Generated from <code>packages/react/src</code> at build time and served as static JSON.
          The docs pages you are reading render from it and the CLI installs from it, which is what
          stops the documented source from drifting away from the shipped source. Point{' '}
          <code>--registry</code> at your own copy to serve a fork.
        </p>
        <CodeBlock code={FETCH_ONE} lang="bash" />
        <h3 className="mt-6 mb-2 font-semibold text-base text-fg">Shape</h3>
        <CodeBlock code={REGISTRY_SHAPE} lang="json" />
        <p className="mt-4 max-w-2xl text-fg-muted text-sm">
          Prefer to do it by hand? Every component page has an{' '}
          <Link
            href="/docs/components/button"
            className="text-accent-fg underline underline-offset-4"
          >
            Own the source
          </Link>{' '}
          panel listing the same files.
        </p>
      </section>
    </article>
  );
}
