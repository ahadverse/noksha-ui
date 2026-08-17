import Link from 'next/link';

import type { RegistryItem } from '@/lib/registry';

import { CodeBlock } from './code-block';
import { SourceTabs } from './source-tabs';

/**
 * The ownership path: the component's actual source, ready to be taken.
 *
 * Read straight from the generated registry, so what is offered here is what
 * the library actually ships — and will be exactly what the CLI writes once it
 * exists. Until then this panel is the whole ownership path, so it does not
 * advertise a command that would not resolve.
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
          <>Self-contained apart from {'@prism-ui/core'}.</>
        )}{' '}
        A{' '}
        <Link href="/docs/cli" className="text-accent-fg underline underline-offset-4">
          CLI that does this for you
        </Link>{' '}
        is designed but not yet published.
      </p>
      <SourceTabs panels={panels} />
    </div>
  );
}
