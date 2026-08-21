'use client';

import { FieldDescription, FieldLabel, FieldRoot, Input } from '@noksha-ui/react';
import * as React from 'react';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES =
  'border-0 border-s-4 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/25 hover:border-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40';

const TagIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2 4 10v6l8 6 8-6v-6z" />
    <circle cx="12" cy="10" r="1.5" fill="currentColor" />
  </svg>
);

export default function FieldText() {
  const [name, setName] = React.useState('Acme Inc');
  const slug = slugify(name);

  return (
    <div className="w-full max-w-sm">
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <TagIcon />
          </span>
          <FieldLabel>Workspace name</FieldLabel>
        </div>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          endIcon={<span className="text-fg-muted text-sm">.noksha.dev</span>}
          className={ACCENT_INPUT_CLASSES}
        />
        <FieldDescription>
          {slug
            ? `Reachable at ${slug}.noksha.dev`
            : 'Type a name — the URL below updates as you go.'}
        </FieldDescription>
      </FieldRoot>
    </div>
  );
}
