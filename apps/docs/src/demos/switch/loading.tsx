'use client';

import { FieldDescription, FieldLabel, FieldRoot, Spinner, Switch } from '@noksha-ui/react';
import * as React from 'react';

import { DemoTile } from '@/components/demo-tile';

function PendingTwoFactor() {
  const [enabled, setEnabled] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  function toggle(next: boolean) {
    setPending(true);
    window.setTimeout(() => {
      setEnabled(next);
      setPending(false);
    }, 1200);
  }

  return (
    <FieldRoot orientation="horizontal" className="items-center justify-between gap-6">
      <div>
        <FieldLabel>Two-factor authentication</FieldLabel>
        <FieldDescription>
          {pending ? 'Saving…' : enabled ? 'Enabled' : 'Disabled'}
        </FieldDescription>
      </div>
      <div className="flex items-center gap-2">
        {pending ? <Spinner size="sm" label={null} /> : null}
        <Switch checked={enabled} disabled={pending} onCheckedChange={toggle} />
      </div>
    </FieldRoot>
  );
}

export default function SwitchLoading() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="Saving on toggle">
        <PendingTwoFactor />
      </DemoTile>

      <DemoTile label="Syncing">
        <FieldRoot orientation="horizontal" className="items-center justify-between gap-6">
          <div>
            <FieldLabel>Sync contacts</FieldLabel>
            <FieldDescription>Syncing…</FieldDescription>
          </div>
          <div className="flex items-center gap-2">
            <Spinner size="sm" label={null} />
            <Switch disabled aria-label="Syncing contacts" />
          </div>
        </FieldRoot>
      </DemoTile>
    </div>
  );
}
