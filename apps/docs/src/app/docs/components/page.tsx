import type { Metadata } from 'next';
import Link from 'next/link';

import { PageHeader } from '@/components/page-header';
import { getHeroDemo } from '@/demos';
import { getGroupedComponents } from '@/lib/registry';

export const metadata: Metadata = {
  title: 'All components',
  description: 'Every component in Noksha UI, rendered live. Open one to copy it.',
};

export default async function ComponentsIndexPage() {
  const groups = await getGroupedComponents();
  const total = groups.reduce((count, group) => count + group.components.length, 0);

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Components"
        description={`${total} components, each one live below. Every preview is the real component — not a screenshot.`}
      />

      <div className="flex flex-col gap-12">
        {groups.map((group) => (
          <section key={group.id}>
            <h2 className="mb-4 font-semibold text-fg text-xl">{group.title}</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {group.components.map((component) => {
                const demo = getHeroDemo(component.name);

                return (
                  <Link
                    key={component.name}
                    href={`/docs/components/${component.name}`}
                    className="group flex flex-col overflow-hidden rounded-xl border border-line-subtle bg-surface transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2"
                  >
                    {/* A real render, so the card cannot show a component the
                        library no longer produces. `pointer-events-none` keeps
                        the tile a link rather than a place to click a button. */}
                    <div className="noksha-canvas-bg flex h-40 items-center justify-center overflow-hidden border-line-subtle border-b p-4">
                      <div className="pointer-events-none flex scale-[0.85] flex-wrap items-center justify-center gap-2">
                        {demo ? <demo.Component /> : null}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-fg group-hover:text-accent-fg">
                        {component.title}
                      </h3>
                      <p className="mt-1 text-fg-muted text-sm">{component.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
