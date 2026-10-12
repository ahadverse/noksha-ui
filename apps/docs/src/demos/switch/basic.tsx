'use client';

import { Field, Switch } from '@noksha-ui/react';
import * as React from 'react';

import { DemoTile } from '@/components/demo-tile';

function DeployNotifications() {
  const [notify, setNotify] = React.useState(true);

  return (
    <Field.Root orientation="horizontal">
      <Switch checked={notify} onCheckedChange={setNotify} />
      <div>
        <Field.Label>Deploy notifications</Field.Label>
        <Field.Description>Applies the moment you flip it — no Save button.</Field.Description>
      </div>
    </Field.Root>
  );
}

export default function SwitchBasic() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Labelled field">
        <DeployNotifications />
      </DemoTile>

      <DemoTile label="Small" className="items-center">
        <Switch size="sm" defaultChecked aria-label="Small switch" />
      </DemoTile>

      <DemoTile label="Medium" className="items-center">
        <Switch size="md" defaultChecked aria-label="Medium switch" />
      </DemoTile>

      <DemoTile label="Large" className="items-center">
        <Switch size="lg" defaultChecked aria-label="Large switch" />
      </DemoTile>

      <DemoTile label="Large · success" className="items-center">
        <Switch size="lg" defaultChecked tone="success" aria-label="Large success switch" />
      </DemoTile>

      <DemoTile label="Large · disabled" className="items-center">
        <Switch size="lg" disabled defaultChecked aria-label="Large disabled switch" />
      </DemoTile>
    </div>
  );
}
