import type { Metadata } from 'next';
import Link from 'next/link';

import { InstallBlock } from '@/components/code-block';
import { AccessibilityIcon, BoltIcon, LayersIcon, PaletteIcon } from '@/components/icons';
import { PageHeader } from '@/components/page-header';
import { getRegistryIndex } from '@/lib/registry';

export const metadata: Metadata = {
  title: 'Introduction',
  description:
    'An accessible React component library built on Tailwind CSS — zero-config semantic theming, no runtime CSS-in-JS, and every component copyable.',
};

const PILLARS = [
  {
    Icon: PaletteIcon,
    title: 'Theming with no provider',
    body: 'Every token is a plain CSS custom property. Rebranding the whole library is one declaration; there is no context to wrap your app in.',
    href: '/docs/theming',
  },
  {
    Icon: BoltIcon,
    title: 'Nothing at runtime',
    body: 'Classes are resolved at build time and the stylesheet is generated from the token engine. No CSS-in-JS, no style recalculation on render.',
    href: '/docs/theming',
  },
  {
    Icon: AccessibilityIcon,
    title: 'Accessibility written, not borrowed',
    body: 'The focus trap, the dismiss stack, roving focus and typeahead are all in-house. Only the collision geometry is a dependency.',
    href: '/docs/components',
  },
  {
    Icon: LayersIcon,
    title: 'Install it or own it',
    body: 'Use the package, or copy any component into your own tree and keep it. Unlike copy-paste libraries, a diff still tells you what moved upstream.',
    href: '/docs/cli',
  },
];

const LIBRARIES = ['MUI', 'Ant Design', 'shadcn/ui', 'Noksha UI'] as const;

/** Stated as "who has this", so a row cannot drift out of column order. */
const COMPARISON: { capability: string; has: (typeof LIBRARIES)[number][] }[] = [
  { capability: 'Install and go', has: ['MUI', 'Ant Design', 'Noksha UI'] },
  { capability: 'Own the source', has: ['shadcn/ui', 'Noksha UI'] },
  { capability: 'Zero runtime CSS-in-JS', has: ['shadcn/ui', 'Noksha UI'] },
  { capability: 'Theming with no provider', has: ['Noksha UI'] },
  { capability: 'Perceptual colour scales', has: ['Noksha UI'] },
];

export default async function IntroductionPage() {
  const index = await getRegistryIndex();

  return (
    <article className="max-w-4xl">
      <PageHeader
        eyebrow="Getting started"
        title="Noksha UI"
        description={`${index.components.length} accessible React components built on Tailwind CSS. See every one live, in light and dark, and take the code.`}
      />

      <div className="mb-12 flex flex-wrap gap-3">
        <Link
          href="/docs/components"
          className="inline-flex h-10 items-center rounded-(--noksha-radius-md) bg-accent-solid px-5 font-medium text-accent-ink text-sm transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2"
        >
          Browse components
        </Link>
        <Link
          href="/docs/installation"
          className="inline-flex h-10 items-center rounded-(--noksha-radius-md) border border-line px-5 font-medium text-fg text-sm transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2"
        >
          Installation
        </Link>
      </div>

      <section className="mb-12">
        <h2 className="mb-3 font-semibold text-fg text-xl">Install</h2>
        <InstallBlock packages="@noksha-ui/react" />
        <p className="mt-3 text-fg-muted text-sm">
          Then one CSS import and you are done — no provider, no config file, no <code>extend</code>
          . The full steps, including Tailwind v3, are on{' '}
          <Link href="/docs/installation" className="text-accent-fg underline underline-offset-4">
            Installation
          </Link>
          .
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-5 font-semibold text-fg text-xl">Why this one</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {PILLARS.map((pillar) => (
            <Link
              key={pillar.title}
              href={pillar.href}
              className="group rounded-xl border border-line-subtle bg-surface p-5 transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2"
            >
              <pillar.Icon className="mb-3 size-5 text-accent-fg" />
              <h3 className="mb-1.5 font-semibold text-fg group-hover:text-accent-fg">
                {pillar.title}
              </h3>
              <p className="text-fg-muted text-sm">{pillar.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-semibold text-fg text-xl">How it compares</h2>
        <div className="overflow-x-auto rounded-lg border border-line-subtle">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-subtle">
              <tr>
                <th className="px-4 py-2.5 font-semibold text-fg">&nbsp;</th>
                {LIBRARIES.map((library) => (
                  <th
                    key={library}
                    className={`px-4 py-2.5 font-semibold ${
                      library === 'Noksha UI' ? 'text-accent-fg' : 'text-fg'
                    }`}
                  >
                    {library}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.capability} className="border-line-subtle border-t">
                  <td className="px-4 py-2.5 text-fg">{row.capability}</td>
                  {LIBRARIES.map((library) => (
                    <td key={library} className="px-4 py-2.5">
                      {row.has.includes(library) ? '✅' : '❌'}
                      <span className="sr-only">{row.has.includes(library) ? ' yes' : ' no'}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="noksha-prose mb-12">
        <h2>What is not here</h2>
        <ul>
          <li>
            <strong>No opinionated brand.</strong> Noksha is not one company&rsquo;s design system
            with the name filed off.
          </li>
          <li>
            <strong>Tailwind stays the styling layer.</strong> This is not a CSS framework.
          </li>
          <li>
            <strong>No legacy browsers.</strong> The baseline is <code>oklch()</code> and{' '}
            <code>:has()</code> — Chrome 111+, Safari 16.4+, Firefox 113+.
          </li>
          <li>
            <strong>Data components are v0.2.</strong> DataTable, DatePicker, Combobox and the
            command palette are the next milestone, not this one.
          </li>
        </ul>
      </section>
    </article>
  );
}
