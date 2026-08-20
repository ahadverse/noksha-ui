'use client';

import { Checkbox, FieldLabel, FieldRoot } from '@noksha-ui/react';
import * as React from 'react';

const GROUPS = [
  { name: 'Repository', items: ['Read', 'Write', 'Admin'] },
  { name: 'Project', items: ['View boards', 'Manage issues'] },
];

export default function CheckboxNestedGroups() {
  const [state, setState] = React.useState<boolean[][]>(
    GROUPS.map((group) => group.items.map(() => false)),
  );

  function toggleItem(groupIndex: number, itemIndex: number, checked: boolean) {
    setState((current) =>
      current.map((group, gi) =>
        gi === groupIndex ? group.map((value, ii) => (ii === itemIndex ? checked : value)) : group,
      ),
    );
  }

  function toggleGroup(groupIndex: number, checked: boolean) {
    setState((current) =>
      current.map((group, gi) => (gi === groupIndex ? group.map(() => checked) : group)),
    );
  }

  function toggleAll(checked: boolean) {
    setState((current) => current.map((group) => group.map(() => checked)));
  }

  const flat = state.flat();
  const allChecked = flat.every(Boolean);
  const someChecked = flat.some(Boolean) && !allChecked;

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <FieldRoot orientation="horizontal">
        <Checkbox checked={allChecked} indeterminate={someChecked} onCheckedChange={toggleAll} />
        <FieldLabel>All permissions</FieldLabel>
      </FieldRoot>

      <div className="ml-6 flex flex-col gap-3 border-line-subtle border-l pl-4">
        {GROUPS.map((group, gi) => {
          const groupState = state[gi] ?? [];
          const groupChecked = groupState.every(Boolean);
          const groupSome = groupState.some(Boolean) && !groupChecked;

          return (
            <div key={group.name} className="flex flex-col gap-2">
              <FieldRoot orientation="horizontal">
                <Checkbox
                  checked={groupChecked}
                  indeterminate={groupSome}
                  onCheckedChange={(checked) => toggleGroup(gi, checked)}
                />
                <FieldLabel>{group.name}</FieldLabel>
              </FieldRoot>

              <div className="ml-6 flex flex-col gap-2 border-line-subtle border-l pl-4">
                {group.items.map((item, ii) => (
                  <FieldRoot key={item} orientation="horizontal">
                    <Checkbox
                      checked={groupState[ii] ?? false}
                      onCheckedChange={(checked) => toggleItem(gi, ii, checked)}
                    />
                    <FieldLabel>{item}</FieldLabel>
                  </FieldRoot>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
