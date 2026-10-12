'use client';

import { FieldDescription, FieldLabel, FieldRoot, Input } from '@noksha-ui/react';
import * as React from 'react';

import { DemoTile } from '@/components/demo-tile';

function luminance(hex: string) {
  const channel = (raw: number) => {
    const c = raw / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastOnWhite(hex: string) {
  const l1 = luminance(hex);
  const [lighter, darker] = l1 > 1 ? [l1, 1] : [1, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

function isHex(value: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}

const PRESET_COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#0ea5e9', '#ec4899'];

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES = [
  'border border-(--noksha-border-subtle)',
  'border-s-4 border-s-(--noksha-accent-solid)',
  'bg-(--noksha-accent-subtle)/25',
  'hover:border-(--noksha-border-strong) hover:border-s-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40',
].join(' ');
const GROUP_CLASSES = [
  'flex w-full items-stretch overflow-hidden rounded-(--noksha-radius-md)',
  'border border-(--noksha-border-default) bg-(--noksha-bg-surface)',
  'focus-within:border-(--noksha-border-focus)',
  'focus-within:outline-(length:--noksha-ring-width) focus-within:outline-offset-(--noksha-ring-offset)',
  'focus-within:outline-(--noksha-ring)',
].join(' ');

const DropletIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3s6 6.5 6 10.5a6 6 0 0 1-12 0C6 9.5 12 3 12 3Z" />
  </svg>
);

const SwatchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="8" height="8" rx="1.5" />
    <rect x="13" y="3" width="8" height="8" rx="1.5" />
    <rect x="3" y="13" width="8" height="8" rx="1.5" />
    <rect x="13" y="13" width="8" height="8" rx="1.5" />
  </svg>
);

const HashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 4 7 20M17 4l-2 16M4 9h16M3 15h16" />
  </svg>
);

const ContrastIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor" stroke="none" />
  </svg>
);

function AccentColorField() {
  const [color, setColor] = React.useState('#6366f1');
  const ratio = contrastOnWhite(color);
  const passesAA = ratio >= 4.5;

  return (
    <FieldRoot invalid={!passesAA}>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <DropletIcon />
        </span>
        <FieldLabel>Accent color</FieldLabel>
      </div>
      <Input
        type="color"
        value={color}
        onChange={(event) => setColor(event.target.value)}
        className={`w-24 p-1 ${ACCENT_INPUT_CLASSES}`}
      />
      <FieldDescription>
        {ratio.toFixed(2)}:1 against white —{' '}
        {passesAA ? 'passes WCAG AA for text.' : "text this color won't pass AA."}
      </FieldDescription>
    </FieldRoot>
  );
}

function BrandPaletteField() {
  const [color, setColor] = React.useState('#6366f1');

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <SwatchIcon />
        </span>
        <FieldLabel>Brand palette</FieldLabel>
      </div>
      <div className="flex items-center gap-2">
        {PRESET_COLORS.map((preset) => (
          <button
            key={preset}
            type="button"
            aria-label={preset}
            aria-pressed={color === preset}
            onClick={() => setColor(preset)}
            style={{ backgroundColor: preset }}
            className={`size-7 shrink-0 rounded-full outline-none transition-[border-color] ${
              color === preset
                ? 'border-2 border-(--noksha-fg-default)'
                : 'border-2 border-transparent hover:border-(--noksha-border-strong)'
            }`}
          />
        ))}
        <span className="h-6 w-px bg-(--noksha-border-default)" />
        <Input
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          className="h-9 w-9 shrink-0 p-1"
        />
      </div>
      <FieldDescription>
        Six brand presets, or the native picker for anything else.
      </FieldDescription>
    </FieldRoot>
  );
}

function HexColorField() {
  const [color, setColor] = React.useState('#6366f1');
  const pickerRef = React.useRef<HTMLInputElement>(null);

  return (
    <FieldRoot invalid={color.length > 0 && !isHex(color)}>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <HashIcon />
        </span>
        <FieldLabel htmlFor="color-hex">Hex value</FieldLabel>
      </div>
      <div className={GROUP_CLASSES}>
        <button
          type="button"
          aria-label="Open color picker"
          onClick={() => pickerRef.current?.click()}
          style={{ backgroundColor: isHex(color) ? color : 'transparent' }}
          className="size-9 shrink-0 border-(--noksha-border-default) border-e outline-none"
        />
        <input
          id="color-hex"
          type="text"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          placeholder="#6366f1"
          className="w-full border-0 bg-transparent px-3 font-mono text-(--noksha-fg-default) text-sm outline-none"
        />
        <input
          ref={pickerRef}
          type="color"
          value={isHex(color) ? color : '#000000'}
          onChange={(event) => setColor(event.target.value)}
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
        />
      </div>
      <FieldDescription>
        Type a hex code or click the swatch — both write the same value.
      </FieldDescription>
    </FieldRoot>
  );
}

function ThemeTintField() {
  const [color, setColor] = React.useState('#6366f1');

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <DropletIcon />
        </span>
        <FieldLabel>Theme tint</FieldLabel>
      </div>
      <div
        className="flex items-center gap-3 rounded-2xl p-4"
        style={{ background: `linear-gradient(135deg, white, ${color})` }}
      >
        <Input
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          className="h-10 w-10 shrink-0 rounded-full border-2 border-white p-0 shadow-(--noksha-shadow-sm)"
        />
        <span className="font-mono font-semibold text-neutral-900 text-sm">{color}</span>
      </div>
      <FieldDescription>
        The card itself fades into the picked color — a live preview, not a swatch.
      </FieldDescription>
    </FieldRoot>
  );
}

function TextContrastField() {
  const [color, setColor] = React.useState('#6366f1');
  const ratio = contrastOnWhite(color);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <ContrastIcon />
        </span>
        <FieldLabel>Text contrast</FieldLabel>
      </div>
      <div className="flex items-center gap-3">
        <Input
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          className="h-11 w-11 shrink-0 p-1"
        />
        <div className="flex flex-1 overflow-hidden rounded-(--noksha-radius-lg) shadow-(--noksha-shadow-xs)">
          <span
            className="flex flex-1 items-center justify-center py-3 font-semibold text-lg text-white"
            style={{ backgroundColor: color }}
          >
            Aa
          </span>
          <span
            className="flex flex-1 items-center justify-center py-3 font-semibold text-lg text-neutral-950"
            style={{ backgroundColor: color }}
          >
            Aa
          </span>
        </div>
      </div>
      <FieldDescription>
        {ratio.toFixed(2)}:1 —{' '}
        {ratio >= 4.5 ? 'white text reads clearly' : 'neither side is a safe bet'} on this color.
      </FieldDescription>
    </FieldRoot>
  );
}

function CircleSwatchField() {
  const [color, setColor] = React.useState('#6366f1');
  const pickerRef = React.useRef<HTMLInputElement>(null);
  const passes = contrastOnWhite(color) >= 4.5;

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <DropletIcon />
        </span>
        <FieldLabel>Swatch</FieldLabel>
      </div>
      <button
        type="button"
        aria-label="Open color picker"
        onClick={() => pickerRef.current?.click()}
        style={{ backgroundColor: color }}
        className="relative size-16 shrink-0 rounded-full shadow-(--noksha-shadow-md) outline-none focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2"
      >
        <span
          className={`absolute right-0 bottom-0 flex size-6 items-center justify-center rounded-full border-2 border-(--noksha-bg-surface) font-bold text-[0.65rem] text-white ${
            passes ? 'bg-(--noksha-success-solid)' : 'bg-(--noksha-danger-solid)'
          }`}
        >
          {passes ? '✓' : '✕'}
        </span>
      </button>
      <input
        ref={pickerRef}
        type="color"
        value={color}
        onChange={(event) => setColor(event.target.value)}
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
      />
      <FieldDescription>
        The badge is the AA verdict — click the circle to change it.
      </FieldDescription>
    </FieldRoot>
  );
}

export default function FieldColor() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="AA contrast ratio">
        <AccentColorField />
      </DemoTile>

      <DemoTile label="Brand palette">
        <BrandPaletteField />
      </DemoTile>

      <DemoTile label="Hex and swatch">
        <HexColorField />
      </DemoTile>

      <DemoTile label="Gradient card">
        <ThemeTintField />
      </DemoTile>

      <DemoTile label="Text sample">
        <TextContrastField />
      </DemoTile>

      <DemoTile label="Circle verdict">
        <CircleSwatchField />
      </DemoTile>
    </div>
  );
}
