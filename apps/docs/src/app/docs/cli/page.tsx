import type { Metadata } from 'next';
import Link from 'next/link';

import { CodeBlock, CommandBlock } from '@/components/code-block';
import { PageHeader } from '@/components/page-header';
import { getRegistryIndex } from '@/lib/registry';
import { REGISTRY_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Owning the source',
  description:
    'Copy any component into your own tree. The registry that powers it is live today; the CLI wrapper is not published yet.',
};

const REGISTRY_SHAPE = `{
  "name": "button",
  "type": "component",
  "title": "Button",
  "category": "actions",
  "dependencies": ["@prism-ui/core"],
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

export default async function CliPage() {
  const index = await getRegistryIndex();

  return (
    <article className="max-w-4xl">
      <PageHeader
        eyebrow="Getting started"
        title="Owning the source"
        description="Prism ships as a package and as copy-paste source. Take a component into your own tree and it is yours to change."
      />

      <div className="mb-10 rounded-lg border border-warning/40 bg-warning-subtle/40 p-4">
        <p className="font-medium text-sm text-warning-fg">The CLI is not published yet</p>
        <p className="mt-1.5 text-fg-muted text-sm">
          <code>@prism-ui/cli</code> is designed but not built, so{' '}
          <code>npx @prism-ui/cli add button</code> will not resolve today. Everything it would read
          — the registry below — is generated and live, and the{' '}
          <Link
            href="/docs/components/button"
            className="text-accent-fg underline underline-offset-4"
          >
            copy-the-files panel
          </Link>{' '}
          on every component page does the same job by hand.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-3 font-semibold text-fg text-xl">What works today</h2>
        <p className="mb-4 max-w-2xl text-fg-muted text-sm">
          Open any component, scroll to <strong className="text-fg">Own the source</strong>, and
          copy each file. The panel lists exactly the files that make up the component, and tells
          you which sibling components and shared internals to take with it — the dependency graph
          is resolved from the real imports, so you cannot end up with a file that does not compile.
        </p>
        <p className="text-fg-muted text-sm">
          All {index.components.length} components expose their source this way.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-semibold text-fg text-xl">The registry</h2>
        <p className="mb-4 max-w-2xl text-fg-muted text-sm">
          Generated from <code>packages/react/src</code> at build time and served as static JSON.
          The docs pages you are reading render from it, which is what stops the documented source
          from drifting away from the shipped source.
        </p>
        <CodeBlock code={FETCH_ONE} lang="bash" />
        <h3 className="mt-6 mb-2 font-semibold text-base text-fg">Shape</h3>
        <CodeBlock code={REGISTRY_SHAPE} lang="json" />
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-semibold text-fg text-xl">What the CLI will add</h2>
        <p className="mb-4 max-w-2xl text-fg-muted text-sm">
          Three commands, of which the third is the one copy-paste libraries tend to lack.
        </p>

        <div className="flex flex-col gap-5">
          <div>
            <CommandBlock command="npx @prism-ui/cli init" />
            <p className="mt-2 text-fg-muted text-sm">
              Writes the theme CSS and wires up Tailwind.
            </p>
          </div>
          <div>
            <CommandBlock command="npx @prism-ui/cli add button" />
            <p className="mt-2 text-fg-muted text-sm">
              Copies the files into <code>./components/ui</code>, following{' '}
              <code>registryDependencies</code> so Spinner and the shared internals come along.
            </p>
          </div>
          <div>
            <CommandBlock command="npx @prism-ui/cli diff button" />
            <p className="mt-2 text-fg-muted text-sm">
              Compares the per-file hashes in your tree against the registry and shows what moved
              upstream since you copied. Without this, copied code goes stale silently — which is
              the real cost of the copy-paste model.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
