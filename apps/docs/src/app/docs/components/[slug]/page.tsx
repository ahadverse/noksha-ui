import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ComponentPreview } from '@/components/component-preview';
import { ComponentSource } from '@/components/component-source';
import { PageHeader } from '@/components/page-header';
import { PropsTable } from '@/components/props-table';
import { TableOfContents, type TocSection } from '@/components/table-of-contents';
import { getDemos } from '@/demos';
import { getApiSections } from '@/lib/api-sections';
import { getRegistryIndex, getRegistryItem } from '@/lib/registry';
import { slugify } from '@/lib/slugify';

export const dynamicParams = false;

export async function generateStaticParams() {
  const index = await getRegistryIndex();
  return index.components.map((component) => ({ slug: component.name }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const item = await getRegistryItem(slug);
    return { title: item.title, description: item.description };
  } catch {
    return {};
  }
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [index, item] = await Promise.all([
    getRegistryIndex(),
    getRegistryItem(slug).catch(() => null),
  ]);

  if (!item) notFound();

  const demos = getDemos(slug);

  // Previous/next follow the sidebar order, so the arrows and the rail agree.
  const order = index.components;
  const position = order.findIndex((entry) => entry.name === slug);
  const previous = position > 0 ? order[position - 1] : undefined;
  const next = position >= 0 && position < order.length - 1 ? order[position + 1] : undefined;

  const { unions, documented } = getApiSections(item.api.interfaces, item.api.aliases);

  const tocSections: TocSection[] = [
    ...(demos.length > 0
      ? [
          {
            label: 'Examples',
            items: demos.map((demo) => ({ id: `demo-${slugify(demo.title)}`, label: demo.title })),
          },
        ]
      : []),
    { id: 'source', label: 'Own the source' },
    ...(documented.length > 0 || unions.length > 0
      ? [
          {
            id: 'api-reference',
            label: 'API reference',
            items: [
              ...(unions.length > 0 ? [{ id: 'accepted-values', label: 'Accepted values' }] : []),
              ...documented.map((entry) => ({ id: entry.name, label: entry.name })),
            ],
          },
        ]
      : []),
  ];

  return (
    <div className="flex gap-8 xl:gap-12">
      <article className="min-w-0 max-w-4xl flex-1">
        <PageHeader eyebrow={item.category} title={item.title} description={item.description} />

        {demos.length > 0 ? (
          <section className="mb-12 flex flex-col gap-12">
            <h2 className="sr-only">Examples</h2>
            {demos.map((demo) => (
              <ComponentPreview key={demo.id} component={slug} demo={demo} />
            ))}
          </section>
        ) : null}

        <section id="source" className="mb-12 scroll-mt-24">
          <h2 className="mb-3 font-semibold text-fg text-xl">Own the source</h2>
          <p className="mb-5 max-w-2xl text-fg-muted text-sm">
            Noksha ships as a package <em>and</em> as copy-paste source. Take the files and they are
            yours to change. These are read from the generated registry, so they are exactly what the
            library ships — never a paraphrase of it.
          </p>
          <ComponentSource item={item} />
        </section>

        <section id="api-reference" className="mb-12 scroll-mt-24">
          <h2 className="mb-5 font-semibold text-fg text-xl">API reference</h2>
          <PropsTable interfaces={item.api.interfaces} aliases={item.api.aliases} />
        </section>

        <nav
          aria-label="Component pagination"
          className="flex items-stretch justify-between gap-4 border-line-subtle border-t pt-6"
        >
          {previous ? (
            <Link
              href={`/docs/components/${previous.name}`}
              className="group flex flex-col rounded-lg border border-line-subtle px-4 py-3 hover:border-line-strong"
            >
              <span className="text-fg-subtle text-xs">Previous</span>
              <span className="font-medium text-fg">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              href={`/docs/components/${next.name}`}
              className="group flex flex-col rounded-lg border border-line-subtle px-4 py-3 text-right hover:border-line-strong"
            >
              <span className="text-fg-subtle text-xs">Next</span>
              <span className="font-medium text-fg">{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>

      <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-56 shrink-0 overflow-y-auto py-8 xl:block">
        <TableOfContents sections={tocSections} />
      </aside>
    </div>
  );
}
