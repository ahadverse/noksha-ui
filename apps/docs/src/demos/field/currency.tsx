'use client';

import { FieldLabel, FieldRoot, Input } from '@noksha-ui/react';
import * as React from 'react';

function formatAmount(raw: string) {
  const digits = raw.replace(/\D/g, '');
  return digits ? new Intl.NumberFormat('en-US').format(Number(digits)) : '';
}

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES =
  'border-0 border-s-4 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/25 hover:border-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40';

const CoinIcon = () => (
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
    <path d="M12 7v10M14.5 9.5a2.5 2 0 0 0-2.5-1c-1.4 0-2.5.8-2.5 1.8s1.1 1.7 2.5 1.7 2.5.7 2.5 1.7-1.1 1.8-2.5 1.8a2.5 2 0 0 1-2.5-1" />
  </svg>
);

export default function FieldCurrency() {
  const [amount, setAmount] = React.useState('2,500');

  return (
    <div className="w-full max-w-sm">
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <CoinIcon />
          </span>
          <FieldLabel>Monthly budget</FieldLabel>
        </div>
        <Input
          startIcon={<span className="text-fg-muted">$</span>}
          value={amount}
          inputMode="decimal"
          onChange={(event) => setAmount(formatAmount(event.target.value))}
          className={ACCENT_INPUT_CLASSES}
        />
      </FieldRoot>
    </div>
  );
}
