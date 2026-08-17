'use client';

import {
  AlertDescription,
  AlertRoot,
  AlertTitle,
  Badge,
  Button,
  CardContent,
  CardDescription,
  CardHeader,
  CardRoot,
  CardTitle,
  FieldLabel,
  FieldRoot,
  Input,
  Switch,
} from '@prism-ui/react';
import { generateScale, SCALE_STEPS } from '@prism-ui/tokens';
import * as React from 'react';

import { CopyButton } from '@/components/copy-button';

const PRESETS = [
  { name: 'Violet', value: '#6D4AFF' },
  { name: 'Sky', value: '#0EA5E9' },
  { name: 'Emerald', value: '#10B981' },
  { name: 'Rose', value: '#F43F5E' },
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Slate', value: '#64748B' },
];

/** The seven accent slots a brand seed has to fill, and where they come from. */
const ACCENT_SLOTS = [
  { token: 'accent-solid', step: 600 },
  { token: 'accent-solid-hover', step: 700 },
  { token: 'accent-solid-active', step: 800 },
  { token: 'accent-subtle', step: 100 },
  { token: 'accent-subtle-hover', step: 200 },
  { token: 'accent-fg', step: 700 },
] as const;

/**
 * The colour engine, running live in the browser.
 *
 * `@prism-ui/tokens` never imports React and has no DOM dependency, so the same
 * function the build uses to generate the shipped stylesheet runs here on every
 * keystroke. What you see is not an approximation of the output — it is the
 * output.
 */
export function ThemeBuilder() {
  const [seed, setSeed] = React.useState('#6D4AFF');

  // An invalid hex mid-typing should leave the last good scale on screen rather
  // than throwing the panel away.
  const scale = React.useMemo(() => {
    try {
      return generateScale(seed);
    } catch {
      return null;
    }
  }, [seed]);

  const lastValid = React.useRef(generateScale('#6D4AFF'));
  if (scale) lastValid.current = scale;
  const active = scale ?? lastValid.current;

  const css = React.useMemo(
    () =>
      [
        ':root {',
        `  /* Generated from ${seed} */`,
        ...ACCENT_SLOTS.map((slot) => `  --prism-${slot.token}: ${active[slot.step]};`),
        '}',
      ].join('\n'),
    [active, seed],
  );

  // Scoped to this panel so the rest of the page keeps the site's own accent.
  const overrides = Object.fromEntries(
    ACCENT_SLOTS.map((slot) => [`--prism-${slot.token}`, active[slot.step]]),
  ) as React.CSSProperties;

  return (
    <div className="flex flex-col gap-8">
      <section>
        <div className="mb-4 flex flex-wrap items-end gap-4">
          <FieldRoot className="w-44">
            <FieldLabel>Brand colour</FieldLabel>
            <Input
              value={seed}
              onChange={(event) => setSeed(event.target.value)}
              spellCheck={false}
            />
          </FieldRoot>

          <label className="mb-0.5 flex items-center gap-2">
            <span className="sr-only">Pick a colour</span>
            <input
              type="color"
              value={scale ? seed : '#6D4AFF'}
              onChange={(event) => setSeed(event.target.value)}
              className="size-10 cursor-pointer rounded-(--prism-radius-md) border border-line bg-surface"
            />
          </label>

          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((preset) => (
              <Button
                key={preset.value}
                size="sm"
                variant={seed.toLowerCase() === preset.value.toLowerCase() ? 'soft' : 'ghost'}
                tone="neutral"
                onClick={() => setSeed(preset.value)}
              >
                <span
                  className="mr-1.5 size-3 rounded-full"
                  style={{ backgroundColor: preset.value }}
                />
                {preset.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex overflow-hidden rounded-lg border border-line-subtle">
          {SCALE_STEPS.map((step) => (
            <div
              key={step}
              className="h-14 flex-1"
              style={{ backgroundColor: active[step] }}
              title={`${step} · ${active[step]}`}
            />
          ))}
        </div>
        <div className="mt-1 flex">
          {SCALE_STEPS.map((step) => (
            <span key={step} className="flex-1 text-center font-mono text-[10px] text-fg-subtle">
              {step}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-semibold text-fg text-xl">Live preview</h2>
        <div
          style={overrides}
          className="prism-grid-bg rounded-xl border border-line-subtle bg-surface p-6"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Solid</Button>
              <Button variant="soft">Soft</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Badge>Badge</Badge>
              <Badge variant="soft">Soft</Badge>
              <Switch defaultChecked />
            </div>

            <AlertRoot tone="info">
              <AlertTitle>Tones stay put</AlertTitle>
              <AlertDescription>
                Danger, success and warning are their own ramps — only the accent follows the brand.
              </AlertDescription>
            </AlertRoot>

            <CardRoot className="max-w-sm">
              <CardHeader>
                <CardTitle as="h3">Card</CardTitle>
                <CardDescription>Surfaces and borders come from the neutral ramp.</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button size="sm">Confirm</Button>
                <Button size="sm" variant="ghost" tone="neutral">
                  Cancel
                </Button>
              </CardContent>
            </CardRoot>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-semibold text-fg text-xl">Paste this into your CSS</h2>
          <CopyButton value={css} label="Copy" />
        </div>
        <pre className="overflow-x-auto rounded-lg border border-line-subtle bg-subtle p-4 font-mono text-sm text-fg">
          {css}
        </pre>
        <p className="mt-3 max-w-2xl text-fg-muted text-sm">
          Or skip the slots entirely and set <code>--prism-brand</code> to your seed — the build
          derives all of the above from it.
        </p>
      </section>
    </div>
  );
}
