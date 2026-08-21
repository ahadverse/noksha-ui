'use client';

import { FieldDescription, FieldError, FieldLabel, FieldRoot, Input } from '@noksha-ui/react';
import * as React from 'react';

const TAKEN = new Set(['ada@example.com', 'grace@example.com']);

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES =
  'border-0 border-s-4 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/25 hover:border-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40';

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export default function FieldEmail() {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

  React.useEffect(() => {
    if (!email.includes('@')) {
      setStatus('idle');
      return;
    }
    setStatus('checking');
    const timer = setTimeout(() => {
      setStatus(TAKEN.has(email.toLowerCase()) ? 'taken' : 'available');
    }, 500);
    return () => clearTimeout(timer);
  }, [email]);

  return (
    <div className="w-full max-w-sm">
      <FieldRoot invalid={status === 'taken'}>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <MailIcon />
          </span>
          <FieldLabel>Email</FieldLabel>
        </div>
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className={ACCENT_INPUT_CLASSES}
        />
        {status === 'checking' ? <FieldDescription>Checking availability…</FieldDescription> : null}
        {status === 'available' ? <FieldDescription>That address is free.</FieldDescription> : null}
        <FieldError>Try ada@example.com — already taken on this demo.</FieldError>
      </FieldRoot>
    </div>
  );
}
