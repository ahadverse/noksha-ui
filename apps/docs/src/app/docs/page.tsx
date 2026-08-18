import type { Metadata } from 'next';
import Link from 'next/link';

import { InstallBlock } from '@/components/code-block';
import {
  AccessibilityIcon,
  ArrowRightIcon,
  BoltIcon,
  CheckIcon,
  LayersIcon,
  MinusIcon,
  PaletteIcon,
  SparkIcon,
  TerminalIcon,
} from '@/components/icons';
import { IntroSpecimen } from '@/components/intro-specimen';
import { ScaleStrip } from '@/components/scale-strip';
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
    body: 'Every token is a plain CSS custom property. Rebranding the whole library is one declaration, and there is no context to wrap your app in.',
    proof: 'One CSS block, not a fork',
    href: '/docs/theming',
  },
  {
    Icon: BoltIcon,
    title: 'Nothing at runtime',
    body: 'Classes resolve at build time and the stylesheet is generated from the token engine. No CSS-in-JS, and no style recalculation on render.',
    proof: 'Zero style work per render',
    href: '/docs/theming',
  },
  {
    Icon: AccessibilityIcon,
    title: 'Accessibility written, not borrowed',
    body: 'The focus trap, the dismiss stack, roving focus and typeahead are all in-house and all under test. Only the collision geometry is a dependency.',
    proof: 'Every component run through axe',
    href: '/docs/components',
  },
  {
    Icon: LayersIcon,
    title: 'Install it, or own it',
    body: 'Use the package, or copy any component into your own tree and keep it. Unlike copy-paste libraries, a diff still tells you what moved upstream.',
    proof: 'noksha diff, after you own it',
    href: '/docs/cli',
  },
];

/** Each step of the pipeline that turns one hex value into the whole library. */
const PIPELINE = [
  {
    step: 'Seed',
    title: 'One brand colour',
    body: 'A single hex value is the entire input. Nothing else is configured.',
  },
  {
    step: 'Scales',
    title: 'Eleven perceptual steps',
    body: 'Generated in OKLCH, so the steps are evenly spaced to the eye rather than to the maths.',
  },
  {
    step: 'Semantics',
    title: 'Meaning, not numbers',
    body: 'Steps become roles — surface, border, solid, ink — twice over: once for light, once for dark.',
  },
  {
    step: 'Contrast gate',
    title: 'Checked at build',
    body: 'Every text pairing is measured against WCAG AA. A seed that cannot carry readable text fails the build instead of shipping.',
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
  { capability: 'Upgrade diffs after you copy', has: ['Noksha UI'] },
];

const NEXT_STEPS = [
  {
    Icon: TerminalIcon,
    title: 'Installation',
    body: 'One package, one CSS import. Tailwind v4 and v3 both covered.',
    href: '/docs/installation',
  },
  {
    Icon: PaletteIcon,
    title: 'Theming',
    body: 'Rebrand everything from one seed, or hand-pick the tokens you want.',
    href: '/docs/theming',
  },
  {
    Icon: LayersIcon,
    title: 'Owning the source',
    body: 'Copy a component into your tree and still track what changed upstream.',
    href: '/docs/cli',
  },
];

const SCOPE = [
  {
    title: 'No opinionated brand',
    body: 'Noksha is not one company’s design system with the name filed off. The default seed is a starting point, not a house style.',
  },
  {
    title: 'Tailwind stays the styling layer',
    body: 'This is a component library, not a CSS framework. Utilities remain how you adjust anything.',
  },
  {
    title: 'No legacy browsers',
    body: 'The baseline is oklch() and :has() — Chrome 111+, Safari 16.4+, Firefox 113+.',
  },
  {
    title: 'Data components are v0.2',
    body: 'DataTable, DatePicker, Combobox and the command palette are the next milestone, not this one.',
  },
];

export default async function IntroductionPage() {
  const index = await getRegistryIndex();
  const total = index.components.length;

  const stats = [
    { value: String(total), label: 'Components' },
    { value: '1', label: 'CSS import to set up' },
    { value: '3', label: 'Third-party runtime deps' },
    { value: 'AA', label: 'Contrast, gated at build' },
  ];

  return (
    <article className="max-w-5xl">
      {/* Hero */}
      <section className="relative mb-16 overflow-hidden rounded-2xl border border-line-subtle bg-surface">
        <div className="noksha-grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
        {/* One accent wash, so the panel is tinted by the same token that paints
            the buttons inside it rather than by a hard-coded gradient. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 120% at 10% 0%, var(--noksha-accent-subtle) 0%, transparent 62%)',
          }}
        />

        <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line-subtle bg-canvas/70 py-1 pr-3 pl-2 font-medium text-fg-muted text-xs backdrop-blur-sm">
              <SparkIcon className="size-3.5 text-accent-fg" />
              v0.1 · MIT · React 18 and 19
            </p>

            <h1 className="max-w-xl text-balance font-bold text-4xl text-fg leading-[1.1] tracking-tight sm:text-5xl">
              Components you can theme in one line — or take with you.
            </h1>

            <p className="mt-5 max-w-xl text-fg-muted text-lg">
              {total} accessible React components built on Tailwind CSS. Every token is a CSS
              variable, so a rebrand is a declaration rather than a fork — and every component can
              be copied into your own tree without giving up upgrades.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/docs/components"
                className="inline-flex h-11 items-center gap-2 rounded-(--noksha-radius-md) bg-accent-solid px-5 font-medium text-accent-ink text-sm transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2"
              >
                Browse {total} components
                <ArrowRightIcon className="size-4" />
              </Link>
              <Link
                href="/docs/installation"
                className="inline-flex h-11 items-center rounded-(--noksha-radius-md) border border-line bg-canvas px-5 font-medium text-fg text-sm transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2"
              >
                Install it
              </Link>
            </div>
          </div>

          {/* Live, not a screenshot — and rendered from this server file. */}
          <div className="hidden lg:block">
            <IntroSpecimen />
          </div>
        </div>

        {/* The hairlines are the grid's own gap showing through, which is the one
            way to get them right in both the 2-up and the 4-up layout. */}
        <dl className="relative grid grid-cols-2 gap-px border-line-subtle border-t bg-line-subtle sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface px-5 py-4">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-semibold text-2xl text-fg tabular-nums tracking-tight">
                  {stat.value}
                </span>
                <span className="mt-0.5 block text-fg-muted text-xs">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Quick start */}
      <section className="mb-16">
        <SectionHeading
          kicker="Quick start"
          title="Two lines to a working install"
          lead="No provider, no config file, no Tailwind extend block."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-2 font-medium text-fg-muted text-xs uppercase tracking-wider">
              1 · Add the package
            </p>
            <InstallBlock packages="@noksha-ui/react" />
          </div>

          <div>
            <p className="mb-2 font-medium text-fg-muted text-xs uppercase tracking-wider">
              2 · Import the stylesheet
            </p>
            <div className="overflow-x-auto rounded-lg border border-line-subtle bg-subtle px-4 py-3 font-mono text-sm">
              <p className="text-fg-subtle">{'/* app.css */'}</p>
              <p className="whitespace-nowrap text-fg">@import &apos;tailwindcss&apos;;</p>
              <p className="whitespace-nowrap text-accent-fg">
                @import &apos;@noksha-ui/react/styles.css&apos;;
              </p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-fg-muted text-sm">
          That is the whole setup. The rest — Tailwind v3, the no-flash script, and calling a
          component from a Server Component — is on{' '}
          <Link href="/docs/installation" className="text-accent-fg underline underline-offset-4">
            Installation
          </Link>
          .
        </p>
      </section>

      {/* Pillars */}
      <section className="mb-16">
        <SectionHeading
          kicker="Why this one"
          title="Four decisions the rest of the library follows from"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {PILLARS.map((pillar) => (
            <Link
              key={pillar.title}
              href={pillar.href}
              className="group flex flex-col rounded-xl border border-line-subtle bg-surface p-5 transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2"
            >
              <span className="mb-4 inline-flex size-9 items-center justify-center rounded-(--noksha-radius-md) bg-accent-subtle text-accent-fg">
                <pillar.Icon className="size-4" />
              </span>
              <h3 className="mb-1.5 font-semibold text-fg group-hover:text-accent-fg">
                {pillar.title}
              </h3>
              <p className="mb-4 text-fg-muted text-sm">{pillar.body}</p>
              <span className="mt-auto font-mono text-fg-subtle text-xs">{pillar.proof}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* The token pipeline */}
      <section className="mb-16">
        <SectionHeading
          kicker="How the theming works"
          title="One hex value becomes the whole library"
          lead="These swatches were generated by the token engine during this build — not sampled from a screenshot."
        />

        <div className="rounded-xl border border-line-subtle bg-surface p-5 sm:p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <ScaleStrip label="Accent" seed="#6366F1" />
            <ScaleStrip label="Neutral" seed="#71717A" />
          </div>

          <ol className="mt-7 grid gap-px overflow-hidden rounded-lg bg-line-subtle sm:grid-cols-2 lg:grid-cols-4">
            {PIPELINE.map((stage, position) => (
              <li key={stage.step} className="bg-surface p-4">
                <p className="mb-2 flex items-center gap-2">
                  <span className="inline-flex size-5 items-center justify-center rounded-full bg-accent-subtle font-medium font-mono text-[10px] text-accent-fg">
                    {position + 1}
                  </span>
                  <span className="font-medium text-fg-subtle text-xs uppercase tracking-wider">
                    {stage.step}
                  </span>
                </p>
                <h3 className="mb-1 font-semibold text-fg text-sm">{stage.title}</h3>
                <p className="text-fg-muted text-sm">{stage.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-4 text-fg-muted text-sm">
          Change the seed and every component moves with it.{' '}
          <Link href="/themes" className="text-accent-fg underline underline-offset-4">
            Try it in the theme builder
          </Link>
          .
        </p>
      </section>

      {/* Comparison */}
      <section className="mb-16">
        <SectionHeading
          kicker="How it compares"
          title="The trade you normally have to make"
          lead="Install-and-go libraries keep the source; copy-paste libraries lose the upgrade path. This is an attempt at both columns."
        />

        <div className="overflow-x-auto rounded-xl border border-line-subtle">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">
              Capabilities compared across MUI, Ant Design, shadcn/ui and Noksha UI
            </caption>
            <thead>
              <tr className="bg-subtle">
                <th scope="col" className="px-4 py-3 font-semibold text-fg">
                  Capability
                </th>
                {LIBRARIES.map((library) => (
                  <th
                    key={library}
                    scope="col"
                    className={`whitespace-nowrap px-4 py-3 text-center font-semibold ${
                      library === 'Noksha UI' ? 'bg-accent-subtle text-accent-fg' : 'text-fg-muted'
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
                  <th scope="row" className="px-4 py-3 font-normal text-fg">
                    {row.capability}
                  </th>
                  {LIBRARIES.map((library) => {
                    const has = row.has.includes(library);
                    const mine = library === 'Noksha UI';

                    return (
                      <td
                        key={library}
                        className={`px-4 py-3 text-center ${mine ? 'bg-accent-subtle/40' : ''}`}
                      >
                        {has ? (
                          <CheckIcon
                            className={`inline size-4 ${mine ? 'text-accent-fg' : 'text-success-fg'}`}
                          />
                        ) : (
                          <MinusIcon className="inline size-4 text-fg-disabled" />
                        )}
                        <span className="sr-only">{has ? 'yes' : 'no'}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Scope */}
      <section className="mb-16">
        <SectionHeading kicker="Scope" title="What is deliberately not here" />

        <ul className="grid gap-3 sm:grid-cols-2">
          {SCOPE.map((item) => (
            <li key={item.title} className="rounded-lg border border-line-subtle bg-subtle p-4">
              <p className="mb-1 font-semibold text-fg text-sm">{item.title}</p>
              <p className="text-fg-muted text-sm">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Next */}
      <section>
        <SectionHeading kicker="Next" title="Where to go from here" />

        <div className="grid gap-4 sm:grid-cols-3">
          {NEXT_STEPS.map((step) => (
            <Link
              key={step.href}
              href={step.href}
              className="group rounded-xl border border-line-subtle bg-surface p-5 transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2"
            >
              <step.Icon className="mb-3 size-5 text-accent-fg" />
              <h3 className="mb-1 flex items-center gap-1.5 font-semibold text-fg text-sm group-hover:text-accent-fg">
                {step.title}
                <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </h3>
              <p className="text-fg-muted text-sm">{step.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

/** The kicker/title/lead trio every section on this page opens with. */
function SectionHeading({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <header className="mb-5">
      <p className="mb-1.5 font-medium text-accent-fg text-xs uppercase tracking-wider">{kicker}</p>
      <h2 className="font-semibold text-2xl text-fg tracking-tight">{title}</h2>
      {lead ? <p className="mt-2 max-w-2xl text-fg-muted">{lead}</p> : null}
    </header>
  );
}
