'use client';

import { FieldDescription, FieldLabel, FieldRoot, Input } from '@noksha-ui/react';
import * as React from 'react';

const LEVELS = ['Too short', 'Weak', 'Fair', 'Strong'] as const;

function scoreOf(password: string) {
  if (password.length === 0) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 3);
}

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES =
  'border-0 border-s-4 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/25 hover:border-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40';

const LockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

export default function FieldPassword() {
  const [password, setPassword] = React.useState('');
  const score = scoreOf(password);

  return (
    <div className="w-full max-w-sm">
      <FieldRoot required>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <LockIcon />
          </span>
          <FieldLabel>Password</FieldLabel>
        </div>
        <Input
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={ACCENT_INPUT_CLASSES}
        />
        <div className="flex gap-1">
          {[0, 1, 2].map((bar) => (
            <span
              key={bar}
              className={`h-1 flex-1 rounded-full ${bar < score ? 'bg-accent' : 'bg-subtle'}`}
            />
          ))}
        </div>
        <FieldDescription>
          {password ? LEVELS[score] : 'At least 8 characters, mixed case and a number.'}
        </FieldDescription>
      </FieldRoot>
    </div>
  );
}
