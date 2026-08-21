'use client';

import { FieldDescription, FieldLabel, FieldRoot, Input } from '@noksha-ui/react';
import * as React from 'react';

function parseHost(value: string) {
  try {
    return new URL(value).hostname;
  } catch {
    return null;
  }
}

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES =
  'border-0 border-s-4 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/25 hover:border-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40';

const LinkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8.5 12.5 6 15a3 3 0 0 0 4 4l2.5-2.5M15.5 11.5 18 9a3 3 0 0 0-4-4l-2.5 2.5M9 15l6-6" />
  </svg>
);

export default function FieldUrl() {
  const [url, setUrl] = React.useState('');
  const host = parseHost(url);

  return (
    <div className="w-full max-w-sm">
      <FieldRoot invalid={url.length > 0 && host === null}>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <LinkIcon />
          </span>
          <FieldLabel>Website</FieldLabel>
        </div>
        <Input
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          className={ACCENT_INPUT_CLASSES}
        />
        <FieldDescription>
          {host ? `Links to ${host}` : 'Include the protocol — https://…'}
        </FieldDescription>
      </FieldRoot>
    </div>
  );
}
