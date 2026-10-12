'use client';

import {
  Button,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
  FieldDescription,
  FieldLabel,
  FieldRoot,
  Slider,
} from '@noksha-ui/react';
import * as React from 'react';

interface Display {
  fontSize: number;
  lineHeight: number;
  tracking: number;
  contrast: number;
}

const DEFAULTS: Display = { fontSize: 16, lineHeight: 1.5, tracking: 0, contrast: 90 };

const FONT_MARKS = [12, 14, 16, 18, 20, 22, 24].map((size) => ({ value: size, label: `${size}` }));

function formatTracking(value: number) {
  return `${value < 0 ? '−' : '+'}${Math.abs(value).toFixed(2)}em`;
}

export default function SliderSettings() {
  const [display, setDisplay] = React.useState<Display>(DEFAULTS);

  const set = (key: keyof Display) => (value: number) =>
    setDisplay((current) => ({ ...current, [key]: value }));

  const isDefault = (Object.keys(DEFAULTS) as (keyof Display)[]).every(
    (key) => display[key] === DEFAULTS[key],
  );
  const lowContrast = display.contrast < 60;

  return (
    <CardRoot variant="outline" padding="lg" className="w-full">
      <CardHeader>
        <CardTitle as="h3">Reading view</CardTitle>
        <CardDescription>
          Tune the text to your eyes. Every change previews instantly.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-8">
        <div className="h-44 overflow-hidden rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-surface p-5">
          <div
            className="flex flex-col gap-[0.5em] [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
            style={{
              fontSize: `${display.fontSize}px`,
              lineHeight: display.lineHeight,
              letterSpacing: `${display.tracking}em`,
              color: `color-mix(in oklab, var(--noksha-fg-default) ${display.contrast}%, var(--noksha-bg-surface))`,
            }}
          >
            <p className="font-semibold text-[1.25em]">The quiet work of good type</p>
            <p>
              When size, spacing and contrast suit the reader, the letters stop asking for attention
              and only the meaning is left. That is all these four controls are for — nudge them
              until the page disappears.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <FieldRoot className="gap-3">
            <FieldLabel>Font size</FieldLabel>
            <Slider
              min={12}
              max={24}
              value={display.fontSize}
              onValueChange={set('fontSize')}
              marks={FONT_MARKS}
              showValue
              formatValue={(value) => `${value}px`}
            />
          </FieldRoot>

          <FieldRoot className="gap-3">
            <FieldLabel>Line height</FieldLabel>
            <Slider
              min={1}
              max={2}
              step={0.1}
              value={display.lineHeight}
              onValueChange={set('lineHeight')}
              marks
              showValue
              formatValue={(value) => value.toFixed(1)}
            />
          </FieldRoot>

          <FieldRoot className="gap-3">
            <FieldLabel>Letter spacing</FieldLabel>
            <Slider
              min={-0.05}
              max={0.15}
              step={0.01}
              value={display.tracking}
              onValueChange={set('tracking')}
              showValue
              formatValue={formatTracking}
            />
            <FieldDescription>Wider spacing helps at small sizes.</FieldDescription>
          </FieldRoot>

          <FieldRoot className="gap-3">
            <FieldLabel>Contrast</FieldLabel>
            <Slider
              min={40}
              max={100}
              step={5}
              value={display.contrast}
              onValueChange={set('contrast')}
              tone={lowContrast ? 'warning' : 'accent'}
              showValue
              formatValue={(value) => `${value}%`}
            />
            <FieldDescription>
              {lowContrast
                ? 'Text this faint is hard to read for long passages.'
                : 'How strongly text stands out from the page.'}
            </FieldDescription>
          </FieldRoot>
        </div>
      </CardContent>

      <CardFooter className="flex-wrap justify-between gap-4 border-(--noksha-border-subtle) border-t pt-(--card-p)">
        <span className="text-fg-muted text-xs">
          {isDefault ? 'Using the default reading view.' : 'Custom reading view.'}
        </span>
        <Button
          variant="outline"
          tone="neutral"
          size="sm"
          disabled={isDefault}
          onClick={() => setDisplay(DEFAULTS)}
        >
          Reset to defaults
        </Button>
      </CardFooter>
    </CardRoot>
  );
}
