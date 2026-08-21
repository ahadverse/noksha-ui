'use client';

import { FieldDescription, FieldLabel, FieldRoot, Textarea } from '@noksha-ui/react';
import * as React from 'react';

const MAX = 240;

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES =
  'border-0 border-s-4 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/25 hover:border-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40';

const LinesIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 6h16M4 12h16M4 18h10" />
  </svg>
);

export default function FieldTextarea() {
  const [notes, setNotes] = React.useState('');
  const remaining = MAX - notes.length;

  return (
    <div className="w-full max-w-sm">
      <FieldRoot invalid={remaining < 0}>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <LinesIcon />
          </span>
          <FieldLabel>Release notes</FieldLabel>
        </div>
        <Textarea
          autoSize
          minRows={3}
          maxRows={10}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="What changed?"
          className={ACCENT_INPUT_CLASSES}
        />
        <FieldDescription className={remaining <= 20 ? 'text-danger-fg' : undefined}>
          {remaining} characters left
        </FieldDescription>
      </FieldRoot>
    </div>
  );
}
