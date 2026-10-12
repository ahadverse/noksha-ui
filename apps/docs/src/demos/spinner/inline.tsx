'use client';

import { Button, Spinner } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function SpinnerInline() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Button, dots" className="items-center">
        <Button loading loadingIcon={<Spinner variant="dots" label={null} />}>
          Uploading
        </Button>
      </DemoTile>

      <DemoTile label="Outline button, bars icon" className="items-center">
        <Button
          loading
          loadingPlacement="icon"
          loadingIcon={<Spinner variant="bars" label={null} />}
          variant="outline"
        >
          Transcoding
        </Button>
      </DemoTile>

      <DemoTile label="Soft round button, comet" className="items-center">
        <Button
          loading
          loadingIcon={<Spinner variant="comet" label={null} />}
          variant="soft"
          shape="round"
          tone="success"
        >
          Deploying
        </Button>
      </DemoTile>

      <div className="min-w-0 sm:col-span-2">
        <DemoTile label="Line of text">
          <p className="flex items-center gap-2 text-fg-muted text-sm">
            <Spinner variant="beat" size="sm" label={null} />
            Checking 214 files — the label is silenced here because the sentence already says what
            is happening.
          </p>
        </DemoTile>
      </div>

      <DemoTile label="Status card">
        <div className="flex items-center gap-3 rounded-lg border border-line-subtle bg-surface p-4">
          <Spinner variant="ripple" className="size-6 text-accent" label={null} />
          <span className="text-fg text-sm">Waiting for the runner to pick this up…</span>
        </div>
      </DemoTile>
    </div>
  );
}
