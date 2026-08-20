'use client';

import { Checkbox } from '@noksha-ui/react';
import * as React from 'react';

const ROWS = [
  { id: 1, name: 'invoice-0142.pdf', size: '128 KB' },
  { id: 2, name: 'invoice-0143.pdf', size: '96 KB' },
  { id: 3, name: 'invoice-0144.pdf', size: '212 KB' },
  { id: 4, name: 'invoice-0145.pdf', size: '84 KB' },
];

export default function CheckboxTable() {
  const [selected, setSelected] = React.useState<number[]>([2]);

  const allChecked = selected.length === ROWS.length;
  const someChecked = selected.length > 0 && !allChecked;

  function toggleAll(checked: boolean) {
    setSelected(checked ? ROWS.map((row) => row.id) : []);
  }

  function toggleRow(id: number, checked: boolean) {
    setSelected((current) =>
      checked ? [...current, id] : current.filter((value) => value !== id),
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-lg border border-line-subtle">
      <table className="w-full text-sm">
        <thead className="border-line-subtle border-b bg-subtle">
          <tr>
            <th className="w-10 p-3">
              <Checkbox
                checked={allChecked}
                indeterminate={someChecked}
                onCheckedChange={toggleAll}
                aria-label="Select all rows"
              />
            </th>
            <th className="p-3 text-left font-medium text-fg-muted">Name</th>
            <th className="p-3 text-left font-medium text-fg-muted">Size</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr
              key={row.id}
              className={
                selected.includes(row.id)
                  ? 'border-line-subtle border-t bg-accent-subtle'
                  : 'border-line-subtle border-t'
              }
            >
              <td className="p-3">
                <Checkbox
                  checked={selected.includes(row.id)}
                  onCheckedChange={(checked) => toggleRow(row.id, checked)}
                  aria-label={`Select ${row.name}`}
                />
              </td>
              <td className="p-3 text-fg">{row.name}</td>
              <td className="p-3 text-fg-muted">{row.size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
