'use client';

import { FieldDescription, FieldLabel, FieldRoot, Input } from '@noksha-ui/react';
import * as React from 'react';

const PRICE_PER_REPLICA = 12;

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES =
  'border-0 border-s-4 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/25 hover:border-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40';

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

export default function FieldNumber() {
  const [replicas, setReplicas] = React.useState(3);

  return (
    <div className="w-full max-w-sm">
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <HashIcon />
          </span>
          <FieldLabel>Replicas</FieldLabel>
        </div>
        <Input
          type="number"
          value={replicas}
          min={1}
          max={10}
          step={1}
          onChange={(event) => setReplicas(Number(event.target.value) || 1)}
          className={ACCENT_INPUT_CLASSES}
        />
        <FieldDescription>
          {replicas} × ${PRICE_PER_REPLICA}/mo = ${replicas * PRICE_PER_REPLICA}/mo
        </FieldDescription>
      </FieldRoot>
    </div>
  );
}
