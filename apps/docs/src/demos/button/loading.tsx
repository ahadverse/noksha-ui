'use client';

import { Button } from '@noksha-ui/react';
import * as React from 'react';

const SaveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 4h11l3 3v13H5z" strokeLinejoin="round" />
    <path d="M9 4v5h6M8 20v-6h8v6" strokeLinejoin="round" />
  </svg>
);

const SyncIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
    className="animate-spin [animation-duration:1.4s]"
  >
    <path d="M20 12a8 8 0 1 1-2.3-5.6" strokeLinecap="round" />
    <path d="M20 4v5h-5" strokeLinejoin="round" />
  </svg>
);

export default function ButtonLoading() {
  const [saving, setSaving] = React.useState(false);

  function save() {
    setSaving(true);
    window.setTimeout(() => setSaving(false), 2000);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* The label stays in the box while hidden, so the width never jumps. */}
      <Button loading={saving} onClick={save}>
        Save changes
      </Button>
      <Button loading variant="soft">
        Saving
      </Button>

      {/* loadingPlacement="icon" keeps the label readable and takes the icon's slot. */}
      <Button loading loadingPlacement="icon" icon={<SaveIcon />} variant="outline">
        Saving
      </Button>
      <Button loading loadingPlacement="icon" variant="soft" tone="neutral">
        Uploading
      </Button>

      {/* Any node can be the indicator — it inherits the size's icon box. */}
      <Button loading loadingIcon={<SyncIcon />} loadingPlacement="icon" variant="dashed">
        Syncing
      </Button>
      <Button loading loadingIcon={<SyncIcon />} shape="round" tone="info">
        Refreshing
      </Button>

      <Button loading shape="circle" iconOnly icon={<SaveIcon />} aria-label="Saving" />
    </div>
  );
}
