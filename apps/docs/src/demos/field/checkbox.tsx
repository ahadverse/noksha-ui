'use client';

import { Checkbox, FieldDescription, FieldLabel, FieldRoot, Input } from '@noksha-ui/react';
import * as React from 'react';

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES =
  'border-0 border-s-4 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/25 hover:border-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40';

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const BuildingIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <path d="M8 7h1M12 7h1M16 7h1M8 11h1M12 11h1M16 11h1M8 15h1M12 15h1M16 15h1" />
  </svg>
);

export default function FieldCheckbox() {
  const [hasCompany, setHasCompany] = React.useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <FieldRoot orientation="horizontal">
        <Checkbox checked={hasCompany} onCheckedChange={setHasCompany} />
        <div className="flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <CheckIcon />
          </span>
          <FieldLabel>This is for a company</FieldLabel>
        </div>
      </FieldRoot>

      {hasCompany ? (
        <FieldRoot required>
          <div className="mb-1.5 flex items-center gap-2">
            <span className={BADGE_CLASSES}>
              <BuildingIcon />
            </span>
            <FieldLabel>Company name</FieldLabel>
          </div>
          <Input placeholder="Acme Inc" className={ACCENT_INPUT_CLASSES} />
          <FieldDescription>Appears on invoices.</FieldDescription>
        </FieldRoot>
      ) : null}
    </div>
  );
}
