import Link from 'next/link';

import type { RegistryItem } from '@/lib/registry';

import { CodeBlock } from './code-block';
import { SourceTabs } from './source-tabs';

/**
 * The ownership path: the component's actual source, ready to be taken.
 *
 * Read straight from the generated registry, so what is offered here is what
 * the library actually ships — and exactly what `noksha add` writes, since the
 * CLI installs from this same JSON. The one difference is that the CLI rewrites
 * the imports to the consumer's own layout; copied by hand, the paths below are
 * the ones to adjust.
 */
export async function ComponentSource({ item }: { item: RegistryItem }) {
  const panels = await Promise.all(
    item.files.map(async (file) => ({
      path: file.path,
      node: (
        <CodeBlock
          code={file.content}
          lang={file.path.endsWith('.tsx') ? 'tsx' : 'ts'}
          variant="bare"
          maxHeight={560}
        />
      ),
    })),
  );

  const needs = [
    ...item.registryDependencies,
    ...(item.internalDependencies.length > 0 ? ['internal helpers'] : []),
  ];

  return (
    <div>
      <p className="mb-3 text-fg-muted text-sm">
        {needs.length > 0 ? (
          <>
            Take these files, and <strong className="text-fg">{needs.join(', ')}</strong> along with
            them — the imports below point at them.
          </>
        ) : (
          <>Self-contained apart from {'@noksha-ui/core'}.</>
        )}{' '}
        Or let the{' '}
        <Link href="/docs/cli" className="text-accent-fg underline underline-offset-4">
          CLI
        </Link>{' '}
        do it: <code>npx @noksha-ui/cli add {item.name}</code> writes them, follows the same
        dependency graph, and fixes up the imports.
      </p>
      <SourceTabs panels={panels} />
    </div>
  );
}
