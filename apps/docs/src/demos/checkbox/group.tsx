'use client';

import { Checkbox, FieldLabel, FieldRoot } from '@noksha-ui/react';
import * as React from 'react';

const SKILLS = ['TypeScript', 'Rust', 'Go', 'Python', 'Swift'];

export default function CheckboxGroup() {
  const [selected, setSelected] = React.useState<string[]>(['TypeScript']);

  function toggle(skill: string, checked: boolean) {
    setSelected((current) =>
      checked ? [...current, skill] : current.filter((value) => value !== skill),
    );
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {SKILLS.map((skill) => (
        <FieldRoot key={skill} orientation="horizontal">
          <Checkbox
            checked={selected.includes(skill)}
            onCheckedChange={(checked) => toggle(skill, checked)}
          />
          <FieldLabel>{skill}</FieldLabel>
        </FieldRoot>
      ))}
      <p className="text-fg-muted text-sm">
        {selected.length} of {SKILLS.length} selected
      </p>
    </div>
  );
}
