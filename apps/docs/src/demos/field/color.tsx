'use client';

import { FieldDescription, FieldLabel, FieldRoot, Input } from '@noksha-ui/react';
import * as React from 'react';

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

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES =
  'border-0 border-s-4 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/25 hover:border-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40';

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

export default function FieldColor() {
  const [color, setColor] = React.useState('#6366f1');
  const ratio = contrastOnWhite(color);
  const passesAA = ratio >= 4.5;

  return (
    <div className="w-full max-w-sm">
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
    </div>
  );
}
