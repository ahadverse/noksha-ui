'use client';

import { Checkbox, FieldLabel, FieldRoot } from '@noksha-ui/react';
import * as React from 'react';

const SCOPES = ['Read repositories', 'Write repositories', 'Manage webhooks'];

export default function CheckboxBasic() {
  const [checked, setChecked] = React.useState([true, false, false]);

  const all = checked.every(Boolean);
  const some = checked.some(Boolean) && !all;

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <FieldRoot orientation="horizontal">
        <Checkbox
          checked={all}
          // `indeterminate` is a DOM property, not an attribute — which is why
          // it needs a prop of its own rather than living in the markup.
          indeterminate={some}
          onCheckedChange={(next) => setChecked(checked.map(() => next))}
        />
        <FieldLabel>All scopes</FieldLabel>
      </FieldRoot>

      <div className="ml-6 flex flex-col gap-3 border-line-subtle border-l pl-4">
        {SCOPES.map((scope, index) => (
          <FieldRoot key={scope} orientation="horizontal">
            <Checkbox
              checked={checked[index]}
              onCheckedChange={(next) =>
                setChecked(checked.map((value, i) => (i === index ? next : value)))
              }
            />
            <FieldLabel>{scope}</FieldLabel>
          </FieldRoot>
        ))}
      </div>
    </div>
  );
}
