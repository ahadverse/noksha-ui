'use client';

import { Button } from '@noksha-ui/react';
import * as React from 'react';

import { DemoTile } from '@/components/demo-tile';

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

function SaveChangesButton() {
  const [saving, setSaving] = React.useState(false);

  function save() {
    setSaving(true);
    window.setTimeout(() => setSaving(false), 2000);
  }

  return (
    <Button loading={saving} onClick={save}>
      Save changes
    </Button>
  );
}

export default function ButtonLoading() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Click to save" className="items-center">
        <SaveChangesButton />
      </DemoTile>

      <DemoTile label="Loading · soft" className="items-center">
        <Button loading variant="soft">
          Saving
        </Button>
      </DemoTile>

      <DemoTile label="Icon slot · outline" className="items-center">
        <Button loading loadingPlacement="icon" icon={<SaveIcon />} variant="outline">
          Saving
        </Button>
      </DemoTile>

      <DemoTile label="Icon slot · no icon" className="items-center">
        <Button loading loadingPlacement="icon" variant="soft" tone="neutral">
          Uploading
        </Button>
      </DemoTile>

      <DemoTile label="Custom indicator · dashed" className="items-center">
        <Button loading loadingIcon={<SyncIcon />} loadingPlacement="icon" variant="dashed">
          Syncing
        </Button>
      </DemoTile>

      <DemoTile label="Custom indicator · round" className="items-center">
        <Button loading loadingIcon={<SyncIcon />} shape="round" tone="info">
          Refreshing
        </Button>
      </DemoTile>

      <DemoTile label="Circle icon-only" className="items-center">
        <Button loading shape="circle" iconOnly icon={<SaveIcon />} aria-label="Saving" />
      </DemoTile>
    </div>
  );
}
