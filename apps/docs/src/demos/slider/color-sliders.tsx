'use client';

import { CopyButton, FieldLabel, FieldRoot, Slider } from '@noksha-ui/react';
import * as React from 'react';

interface Hsla {
  h: number;
  s: number;
  l: number;
  a: number;
}

const PRESETS: Array<{ name: string } & Hsla> = [
  { name: 'Violet', h: 252, s: 100, l: 64, a: 100 },
  { name: 'Coral', h: 4, s: 90, l: 66, a: 100 },
  { name: 'Saffron', h: 40, s: 96, l: 55, a: 100 },
  { name: 'Jade', h: 158, s: 64, l: 42, a: 100 },
  { name: 'Ocean', h: 204, s: 88, l: 48, a: 100 },
  { name: 'Smoke', h: 230, s: 22, l: 30, a: 60 },
];

const CHECKER = 'repeating-conic-gradient(#d4d4d8 0% 25%, #ffffff 0% 50%)';

const TRACK =
  '[--sl-rail:transparent] [--sl-track:0.75rem] [--sl-thumb:1.25rem] [--sl-thumb-border:#ffffff] [--sl-thumb-border-width:3px] [--sl-thumb-shadow:0_0_0_1px_rgb(0_0_0/0.2),0_2px_6px_rgb(0_0_0/0.3)] [--sl-track-shadow:inset_0_0_0_1px_rgb(0_0_0/0.08)]';

const HUE_TRACK =
  '[--sl-rail:transparent] [--sl-track:0.75rem] [--sl-thumb:1.25rem] [--sl-thumb-border:#ffffff] [--sl-thumb-border-width:3px] [--sl-thumb-shadow:0_0_0_1px_rgb(0_0_0/0.2),0_2px_6px_rgb(0_0_0/0.3)] [--sl-track-shadow:inset_0_0_0_1px_rgb(0_0_0/0.08)] [--sl-fill-image:linear-gradient(90deg,#f00_calc(var(--sl-thumb-w)/2),#ff0,#0f0,#0ff,#00f,#f0f,#f00_calc(100%-var(--sl-thumb-w)/2))]';

const START = 'calc(var(--sl-thumb-w) / 2)';
const END = 'calc(100% - var(--sl-thumb-w) / 2)';

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const saturation = s / 100;
  const lightness = l / 100;
  const chroma = saturation * Math.min(lightness, 1 - lightness);
  const channel = (offset: number) => {
    const k = (offset + h / 30) % 12;
    return Math.round(255 * (lightness - chroma * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
  };
  return [channel(0), channel(8), channel(4)];
}

function hex(value: number) {
  return value.toString(16).padStart(2, '0');
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-(--noksha-radius-md) border border-(--noksha-border-subtle) bg-(--noksha-bg-subtle) py-1 ps-3 pe-1">
      <span className="w-9 shrink-0 font-medium text-(--noksha-fg-subtle) text-[11px] uppercase tracking-wide">
        {label}
      </span>
      <code className="min-w-0 flex-1 truncate font-mono text-(--noksha-fg-default) text-xs">
        {value}
      </code>
      <CopyButton value={value} label={`Copy ${label}`} variant="ghost" size="xs" />
    </div>
  );
}

export default function SliderColorSliders() {
  const [color, setColor] = React.useState<Hsla>({ h: 252, s: 100, l: 64, a: 100 });
  const { h, s, l, a } = color;

  const update = (key: keyof Hsla) => (value: number) =>
    setColor((current) => ({ ...current, [key]: value }));

  const [r, g, b] = hslToRgb(h, s, l);
  const alpha = a / 100;
  const opaque = `hsl(${h} ${s}% ${l}%)`;
  const translucent = `hsl(${h} ${s}% ${l}% / ${alpha})`;

  const hexValue = `#${hex(r)}${hex(g)}${hex(b)}${a < 100 ? hex(Math.round(alpha * 255)) : ''}`;
  const rgbValue = a < 100 ? `rgb(${r} ${g} ${b} / ${alpha})` : `rgb(${r} ${g} ${b})`;
  const hslValue = a < 100 ? translucent : opaque;

  const onWhite = (channel: number) => channel * alpha + 255 * (1 - alpha);
  const luminance = (0.299 * onWhite(r) + 0.587 * onWhite(g) + 0.114 * onWhite(b)) / 255;
  const ink = luminance > 0.6 ? '#0a0a0a' : '#ffffff';

  return (
    <div className="grid w-full max-w-2xl gap-8 rounded-2xl border border-(--noksha-border-subtle) bg-(--noksha-bg-surface) p-6 shadow-(--noksha-shadow-lg) sm:grid-cols-[12rem_minmax(0,1fr)] sm:p-8">
      <div className="flex flex-col gap-4">
        <div
          className="relative h-36 w-full overflow-hidden rounded-xl shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)] sm:h-auto sm:aspect-square"
          style={{
            background: `linear-gradient(${translucent}, ${translucent}), ${CHECKER} 0 0 / 16px 16px`,
          }}
        >
          <span
            className="absolute bottom-3 left-3 font-mono font-semibold text-sm uppercase"
            style={{ color: ink }}
          >
            {hexValue}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <Readout label="Hex" value={hexValue} />
          <Readout label="Rgb" value={rgbValue} />
          <Readout label="Hsl" value={hslValue} />
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-6">
        <FieldRoot className="gap-3">
          <div className="flex items-baseline justify-between gap-3">
            <FieldLabel>Hue</FieldLabel>
            <span className="text-(--noksha-fg-muted) text-xs tabular-nums">{h}°</span>
          </div>
          <Slider
            value={h}
            onValueChange={update('h')}
            max={360}
            formatValue={(value) => `${value} degrees`}
            className={HUE_TRACK}
            style={{ '--sl-thumb-bg': `hsl(${h} 100% 50%)` } as React.CSSProperties}
          />
        </FieldRoot>

        <FieldRoot className="gap-3">
          <div className="flex items-baseline justify-between gap-3">
            <FieldLabel>Saturation</FieldLabel>
            <span className="text-(--noksha-fg-muted) text-xs tabular-nums">{s}%</span>
          </div>
          <Slider
            value={s}
            onValueChange={update('s')}
            formatValue={(value) => `${value}%`}
            className={TRACK}
            style={
              {
                '--sl-thumb-bg': opaque,
                '--sl-fill-image': `linear-gradient(90deg, hsl(${h} 0% ${l}%) ${START}, hsl(${h} 100% ${l}%) ${END})`,
              } as React.CSSProperties
            }
          />
        </FieldRoot>

        <FieldRoot className="gap-3">
          <div className="flex items-baseline justify-between gap-3">
            <FieldLabel>Lightness</FieldLabel>
            <span className="text-(--noksha-fg-muted) text-xs tabular-nums">{l}%</span>
          </div>
          <Slider
            value={l}
            onValueChange={update('l')}
            formatValue={(value) => `${value}%`}
            className={TRACK}
            style={
              {
                '--sl-thumb-bg': opaque,
                '--sl-fill-image': `linear-gradient(90deg, hsl(${h} ${s}% 0%) ${START}, hsl(${h} ${s}% 50%), hsl(${h} ${s}% 100%) ${END})`,
              } as React.CSSProperties
            }
          />
        </FieldRoot>

        <FieldRoot className="gap-3">
          <div className="flex items-baseline justify-between gap-3">
            <FieldLabel>Alpha</FieldLabel>
            <span className="text-(--noksha-fg-muted) text-xs tabular-nums">{a}%</span>
          </div>
          <Slider
            value={a}
            onValueChange={update('a')}
            formatValue={(value) => `${value}% opacity`}
            className={TRACK}
            style={
              {
                '--sl-thumb-bg': translucent,
                '--sl-fill-image': `linear-gradient(90deg, hsl(${h} ${s}% ${l}% / 0) ${START}, ${opaque} ${END}), ${CHECKER} 0 0 / 0.75rem 0.75rem`,
              } as React.CSSProperties
            }
          />
        </FieldRoot>

        <div className="flex flex-col gap-3">
          <span className="font-medium text-(--noksha-fg-muted) text-xs uppercase tracking-wide">
            Presets
          </span>
          <div className="flex flex-wrap gap-2.5">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                aria-label={preset.name}
                title={preset.name}
                onClick={() => setColor({ h: preset.h, s: preset.s, l: preset.l, a: preset.a })}
                className="size-8 rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)] outline-none transition-transform duration-150 hover:scale-110 focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2 motion-reduce:transition-none"
                style={{
                  background: `linear-gradient(hsl(${preset.h} ${preset.s}% ${preset.l}% / ${preset.a / 100}), hsl(${preset.h} ${preset.s}% ${preset.l}% / ${preset.a / 100})), ${CHECKER} 0 0 / 10px 10px`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
