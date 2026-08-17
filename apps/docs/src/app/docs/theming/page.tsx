import type { Metadata } from 'next';
import Link from 'next/link';

import { CodeBlock } from '@/components/code-block';
import { PageHeader } from '@/components/page-header';
import { ScaleStrip } from '@/components/scale-strip';

export const metadata: Metadata = {
  title: 'Theming',
  description:
    'Three layers of CSS custom properties, generated from OKLCH. Rebrand the whole library with one declaration.',
};

const REBRAND = `:root {
  --prism-brand: #0EA5E9;
}`;

const DARK = `/* Light is the :root default. */
:root { --prism-bg-canvas: oklch(0.995 0.003 283.66); }

/* Dark applies through three selectors, so every setup works. */
.dark,
[data-theme='dark'] { --prism-bg-canvas: oklch(0.18 0.008 283.66); }

@media (prefers-color-scheme: dark) {
  :root:not(.light):not([data-theme='light']) { … }
}`;

const SECOND_BRAND = `import { emitThemeOverride } from '@prism-ui/tokens';

// A second brand costs one scoped block, not a fork.
emitThemeOverride('[data-brand="acme"]', { brand: '#F97316' });`;

const SCALES = [
  { label: 'Radius', variable: '--prism-radius-base', effect: '0 is sharp, 0.5rem is soft.' },
  {
    label: 'Density',
    variable: '--prism-density',
    effect: '0.875 compact · 1 default · 1.125 comfortable. Drives every control height and pad.',
  },
  {
    label: 'Motion',
    variable: '--prism-duration-*',
    effect: 'All animation reads these; prefers-reduced-motion zeroes them globally.',
  },
  {
    label: 'Typography',
    variable: '--prism-text-*',
    effect: 'Fluid clamp() steps, so headings scale with the viewport.',
  },
];

export default function ThemingPage() {
  return (
    <article className="max-w-4xl">
      <PageHeader
        eyebrow="Getting started"
        title="Theming"
        description="Three layers of plain CSS custom properties. No ThemeProvider is required for any of it."
      />

      <section className="mb-12">
        <h2 className="mb-3 font-semibold text-fg text-xl">The three layers</h2>
        <div className="overflow-x-auto rounded-lg border border-line-subtle">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-subtle">
              <tr>
                <th className="px-4 py-2.5 font-semibold text-fg">Layer</th>
                <th className="px-4 py-2.5 font-semibold text-fg">Example</th>
                <th className="px-4 py-2.5 font-semibold text-fg">Changes with theme?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-line-subtle border-t align-top">
                <td className="px-4 py-3 text-fg">1 · Primitive</td>
                <td className="px-4 py-3 font-mono text-accent-fg text-xs">--prism-violet-500</td>
                <td className="px-4 py-3 text-fg-muted">No — 11 generated steps per hue</td>
              </tr>
              <tr className="border-line-subtle border-t align-top">
                <td className="px-4 py-3 text-fg">2 · Semantic</td>
                <td className="px-4 py-3 font-mono text-accent-fg text-xs">--prism-bg-surface</td>
                <td className="px-4 py-3 text-fg-muted">
                  <strong className="text-fg">Yes</strong> — the only layer that does
                </td>
              </tr>
              <tr className="border-line-subtle border-t align-top">
                <td className="px-4 py-3 text-fg">3 · Component</td>
                <td className="px-4 py-3 font-mono text-accent-fg text-xs">--prism-button-h-md</td>
                <td className="px-4 py-3 text-fg-muted">No — derived from the scales</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-2xl text-fg-muted text-sm">
          Components only ever read layers 2 and 3, never layer 1. That is what makes a new theme a
          forty-line CSS block instead of a fork.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-semibold text-fg text-xl">Rebranding</h2>
        <p className="mb-3 max-w-2xl text-fg-muted text-sm">
          One declaration and the whole library follows — every tone, every hover state, both modes.
        </p>
        <CodeBlock code={REBRAND} lang="css" />
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-semibold text-fg text-xl">Why OKLCH, not HSL</h2>
        <p className="mb-5 max-w-2xl text-fg-muted text-sm">
          In HSL, <code>hsl(60 100% 50%)</code> and <code>hsl(240 100% 50%)</code> claim the same
          lightness but differ by roughly ten times in perceived brightness — so an HSL scale needs
          hand-tuning for every hue. In OKLCH, <code>L</code> <em>is</em> perceived lightness, so
          one lightness ramp works for every hue and the scales below were generated, not designed.
        </p>

        <div className="flex flex-col gap-5">
          <ScaleStrip label="Accent" seed="#6D4AFF" />
          <ScaleStrip label="Danger" seed="#E5484D" />
          <ScaleStrip label="Success" seed="#30A46C" />
          <ScaleStrip label="Warning" seed="#F1A10D" />
        </div>

        <p className="mt-4 max-w-2xl text-fg-muted text-sm">
          Every step is gamut-mapped into sRGB by lowering chroma only, so the lightness ramp holds
          exactly regardless of hue. Foregrounds are picked per step by relative luminance, and the
          build fails if a pairing cannot reach 4.5:1.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-semibold text-fg text-xl">Dark mode</h2>
        <p className="mb-3 max-w-2xl text-fg-muted text-sm">
          Dark applies through three selectors so a class-based setup, an attribute-based one, and
          plain system preference all work without configuration.
        </p>
        <CodeBlock code={DARK} lang="css" />
        <p className="mt-3 max-w-2xl text-fg-muted text-sm">
          Add <code>themeScript()</code> to your <code>&lt;head&gt;</code> to avoid a flash on first
          paint — see{' '}
          <Link href="/docs/installation" className="text-accent-fg underline underline-offset-4">
            Installation
          </Link>
          .
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-semibold text-fg text-xl">Retuning the scales</h2>
        <div className="overflow-x-auto rounded-lg border border-line-subtle">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-subtle">
              <tr>
                <th className="px-4 py-2.5 font-semibold text-fg">Scale</th>
                <th className="px-4 py-2.5 font-semibold text-fg">Variable</th>
                <th className="px-4 py-2.5 font-semibold text-fg">Effect</th>
              </tr>
            </thead>
            <tbody>
              {SCALES.map((scale) => (
                <tr key={scale.label} className="border-line-subtle border-t align-top">
                  <td className="px-4 py-3 text-fg">{scale.label}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-accent-fg text-xs">
                    {scale.variable}
                  </td>
                  <td className="px-4 py-3 text-fg-muted">{scale.effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-semibold text-fg text-xl">More than one brand</h2>
        <p className="mb-3 max-w-2xl text-fg-muted text-sm">
          Multi-tenant apps scope a second palette to a selector and swap one attribute at runtime.
        </p>
        <CodeBlock code={SECOND_BRAND} />
      </section>
    </article>
  );
}
