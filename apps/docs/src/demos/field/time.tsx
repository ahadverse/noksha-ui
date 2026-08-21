'use client';

import { FieldDescription, FieldError, FieldLabel, FieldRoot, Input } from '@noksha-ui/react';
import * as React from 'react';

function hoursOf(value: string) {
  return Number(value.split(':')[0] ?? 0);
}

function formatReadable(value: string) {
  if (!value) return null;
  const h = hoursOf(value);
  const m = Number(value.split(':')[1] ?? 0);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES =
  'border-0 border-s-4 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/25 hover:border-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40';

const ClockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l3 2" />
  </svg>
);

export default function FieldTime() {
  const [time, setTime] = React.useState('02:00');
  const outsideWindow = hoursOf(time) > 5;

  return (
    <div className="w-full max-w-sm">
      <FieldRoot invalid={outsideWindow}>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <ClockIcon />
          </span>
          <FieldLabel>Daily backup time</FieldLabel>
        </div>
        <Input
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          className={ACCENT_INPUT_CLASSES}
        />
        <FieldDescription>
          {formatReadable(time)} — low-traffic hours run midnight to 5am.
        </FieldDescription>
        <FieldError>Backups outside midnight–5am can compete with live traffic.</FieldError>
      </FieldRoot>
    </div>
  );
}
