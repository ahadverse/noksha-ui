'use client';

import { Input } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function InputBasic() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="Outline">
        <Input variant="outline" aria-label="Outline" placeholder="Outline" />
      </DemoTile>

      <DemoTile label="Soft">
        <Input variant="soft" aria-label="Soft" placeholder="Soft" />
      </DemoTile>

      <DemoTile label="Ghost">
        <Input variant="ghost" aria-label="Ghost" placeholder="Ghost" />
      </DemoTile>

      <DemoTile label="Disabled">
        <Input aria-label="Disabled" placeholder="Disabled" disabled />
      </DemoTile>

      <div className="min-w-0 sm:col-span-2">
        <DemoTile label="Invalid">
          <Input aria-label="Email" placeholder="Invalid" invalid defaultValue="not-an-email" />
        </DemoTile>
      </div>
    </div>
  );
}
