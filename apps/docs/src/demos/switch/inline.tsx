import { Switch } from '@noksha-ui/react';

const TAGS = ['Wifi', 'Bluetooth', 'Airplane mode', 'Hotspot', 'NFC'];

export default function SwitchInline() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-4">
      {TAGS.map((tag, index) => (
        <label
          key={tag}
          htmlFor={tag}
          className="flex cursor-pointer items-center gap-1.5 text-fg text-sm"
        >
          <Switch id={tag} size="sm" defaultChecked={index === 0} />
          {tag}
        </label>
      ))}
    </div>
  );
}
