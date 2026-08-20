'use client';

import { Checkbox } from '@noksha-ui/react';
import * as React from 'react';

const ADDONS = [
  { id: 'analytics', name: 'Analytics', price: 12 },
  { id: 'backups', name: 'Daily backups', price: 8 },
  { id: 'support', name: 'Priority support', price: 20 },
];

export default function CheckboxCard() {
  const [selected, setSelected] = React.useState<string[]>(['analytics']);

  function toggle(id: string, checked: boolean) {
    setSelected((current) =>
      checked ? [...current, id] : current.filter((value) => value !== id),
    );
  }

  const total = ADDONS.filter((addon) => selected.includes(addon.id)).reduce(
    (sum, addon) => sum + addon.price,
    0,
  );

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-3">
        {ADDONS.map((addon) => (
          <label
            key={addon.id}
            htmlFor={addon.id}
            className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-line-subtle bg-surface p-4 has-[:checked]:border-accent has-[:checked]:bg-accent-subtle"
          >
            <Checkbox
              id={addon.id}
              checked={selected.includes(addon.id)}
              onCheckedChange={(checked) => toggle(addon.id, checked)}
            />
            <div>
              <p className="font-medium text-fg text-sm">{addon.name}</p>
              <p className="text-fg-muted text-xs">${addon.price}/month</p>
            </div>
          </label>
        ))}
      </div>
      <p className="text-fg-muted text-sm">Total: ${total}/month</p>
    </div>
  );
}
