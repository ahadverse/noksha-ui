'use client';

import { FieldDescription, FieldLabel, FieldRoot, Input } from '@noksha-ui/react';
import * as React from 'react';

function formatUsPhone(digits: string) {
  const d = digits.slice(0, 10);
  const parts = [d.slice(0, 3), d.slice(3, 6), d.slice(6, 10)].filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return `(${parts[0]}`;
  if (parts.length === 2) return `(${parts[0]}) ${parts[1]}`;
  return `(${parts[0]}) ${parts[1]}-${parts[2]}`;
}

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES =
  'border-0 border-s-4 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/25 hover:border-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40';

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 3h4l1.5 4.5L9 9.5a12 12 0 0 0 5.5 5.5l2-2.5L21 14v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2Z" />
  </svg>
);

export default function FieldTel() {
  const [value, setValue] = React.useState('');

  return (
    <div className="w-full max-w-sm">
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <PhoneIcon />
          </span>
          <FieldLabel>Phone number</FieldLabel>
        </div>
        <Input
          type="tel"
          value={value}
          placeholder="(555) 000-0000"
          onChange={(event) => setValue(formatUsPhone(event.target.value.replace(/\D/g, '')))}
          className={ACCENT_INPUT_CLASSES}
        />
        <FieldDescription>Formatted as you type — only digits are ever stored.</FieldDescription>
      </FieldRoot>
    </div>
  );
}
