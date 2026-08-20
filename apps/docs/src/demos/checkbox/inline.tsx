import { Checkbox } from '@noksha-ui/react';

const TAGS = ['React', 'Vue', 'Svelte', 'Solid', 'Angular'];

export default function CheckboxInline() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {TAGS.map((tag, index) => (
        <label
          key={tag}
          htmlFor={tag}
          className="flex cursor-pointer items-center gap-1.5 text-fg text-sm"
        >
          <Checkbox id={tag} size="sm" defaultChecked={index === 0} />
          {tag}
        </label>
      ))}
    </div>
  );
}
