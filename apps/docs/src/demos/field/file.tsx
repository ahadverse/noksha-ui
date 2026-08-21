'use client';

import { FieldDescription, FieldError, FieldLabel, FieldRoot, Input } from '@noksha-ui/react';
import * as React from 'react';

const MAX_BYTES = 2 * 1024 * 1024;

function formatSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.round(bytes / 1024)}KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES =
  'border-0 border-s-4 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/25 hover:border-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40';

const PaperclipIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M17 7v9a4 4 0 0 1-8 0V6a2.5 2.5 0 0 1 5 0v9a1 1 0 0 1-2 0V8" />
  </svg>
);

export default function FieldFile() {
  const [file, setFile] = React.useState<File | null>(null);
  const tooLarge = file != null && file.size > MAX_BYTES;

  return (
    <div className="w-full max-w-sm">
      <FieldRoot invalid={tooLarge}>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <PaperclipIcon />
          </span>
          <FieldLabel>Logo</FieldLabel>
        </div>
        <Input
          type="file"
          accept="image/png,image/svg+xml"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          className={ACCENT_INPUT_CLASSES}
        />
        <FieldDescription>
          {file ? `${file.name} — ${formatSize(file.size)}` : 'PNG or SVG, up to 2MB.'}
        </FieldDescription>
        <FieldError>That file is over the 2MB limit.</FieldError>
      </FieldRoot>
    </div>
  );
}
