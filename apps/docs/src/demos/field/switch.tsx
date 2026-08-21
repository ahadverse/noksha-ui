'use client';

import { FieldDescription, FieldLabel, FieldRoot, Input, Switch } from '@noksha-ui/react';
import * as React from 'react';

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES =
  'border-0 border-s-4 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/25 hover:border-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40';

const ShieldIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

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
    <rect x="7" y="2" width="10" height="20" rx="2" />
    <path d="M11 18h2" />
  </svg>
);

export default function FieldSwitch() {
  const [twoFactor, setTwoFactor] = React.useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <FieldRoot orientation="horizontal">
        <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
        <div>
          <div className="flex items-center gap-2">
            <span className={BADGE_CLASSES}>
              <ShieldIcon />
            </span>
            <FieldLabel>Two-factor authentication</FieldLabel>
          </div>
          <FieldDescription>Applies the moment you flip it — no Save button.</FieldDescription>
        </div>
      </FieldRoot>

      <FieldRoot required={twoFactor} disabled={!twoFactor}>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <PhoneIcon />
          </span>
          <FieldLabel>Recovery phone</FieldLabel>
        </div>
        <Input type="tel" placeholder="+1 (555) 000-0000" className={ACCENT_INPUT_CLASSES} />
        <FieldDescription>
          {twoFactor ? 'Required while two-factor is on.' : 'Turn on two-factor to require this.'}
        </FieldDescription>
      </FieldRoot>
    </div>
  );
}
