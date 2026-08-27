'use client';

import { FieldDescription, FieldLabel, FieldRoot, Spinner, Switch } from '@noksha-ui/react';
import * as React from 'react';

export default function SwitchLoading() {
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
    <div className="flex w-full max-w-sm flex-col gap-4">
      <FieldRoot orientation="horizontal" className="items-center justify-between">
        <div>
          <FieldLabel>Two-factor authentication</FieldLabel>
          <FieldDescription>{pending ? 'Saving…' : enabled ? 'Enabled' : 'Disabled'}</FieldDescription>
        </div>
        <div className="flex items-center gap-2">
          {pending ? <Spinner size="sm" label={null} /> : null}
          <Switch checked={enabled} disabled={pending} onCheckedChange={toggle} />
        </div>
      </FieldRoot>

      <FieldRoot orientation="horizontal" className="items-center justify-between">
        <div>
          <FieldLabel>Sync contacts</FieldLabel>
          <FieldDescription>Syncing…</FieldDescription>
        </div>
        <div className="flex items-center gap-2">
          <Spinner size="sm" label={null} />
          <Switch disabled aria-label="Syncing contacts" />
        </div>
      </FieldRoot>
    </div>
  );
}
