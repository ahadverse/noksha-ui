'use client';

import { FieldLabel, FieldRoot, Input, Radio, RadioGroup } from '@noksha-ui/react';
import * as React from 'react';

const SOURCES = [
  { value: 'search', label: 'Search engine' },
  { value: 'friend', label: 'A friend told me' },
  { value: 'other', label: 'Something else' },
];

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES =
  'border-0 border-s-4 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/25 hover:border-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40';

const CompassIcon = () => (
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
    <path d="m14.5 9.5-2 5-3 1.5 2-5z" />
  </svg>
);

const MessageIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 5h16v11H8l-4 4z" />
  </svg>
);

export default function FieldRadio() {
  const [source, setSource] = React.useState('search');

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="mb-1 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <CompassIcon />
        </span>
        <FieldLabel>How did you hear about us?</FieldLabel>
      </div>

      <RadioGroup value={source} onValueChange={setSource} className="gap-2.5">
        {SOURCES.map((option) => (
          <FieldRoot key={option.value} orientation="horizontal">
            <Radio value={option.value} />
            <FieldLabel>{option.label}</FieldLabel>
          </FieldRoot>
        ))}
      </RadioGroup>

      {source === 'other' ? (
        <FieldRoot>
          <div className="mb-1.5 flex items-center gap-2">
            <span className={BADGE_CLASSES}>
              <MessageIcon />
            </span>
            <FieldLabel>Tell us more</FieldLabel>
          </div>
          <Input placeholder="How did you hear about us?" className={ACCENT_INPUT_CLASSES} />
        </FieldRoot>
      ) : null}
    </div>
  );
}
