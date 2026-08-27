import { Switch } from '@noksha-ui/react';

const TAGS = ['Wifi', 'Bluetooth', 'Airplane mode', 'Hotspot', 'NFC'];

export default function SwitchInline() {
  return (
    <div className="flex flex-wrap items-center gap-4">
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
