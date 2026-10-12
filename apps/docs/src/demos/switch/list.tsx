import { FieldLabel, FieldRoot, Switch } from '@noksha-ui/react';

const ROWS = [
  { label: 'Wi-Fi', defaultChecked: true },
  { label: 'Bluetooth', defaultChecked: true },
  { label: 'Airplane mode' },
  { label: 'Low power mode' },
];

export default function SwitchList() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col divide-y divide-(--noksha-border-subtle) rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-surface">
      {ROWS.map((row) => (
        <FieldRoot
          key={row.label}
          orientation="horizontal"
          className="items-center justify-between gap-6 px-4 py-3.5"
        >
          <FieldLabel>{row.label}</FieldLabel>
          <Switch defaultChecked={row.defaultChecked} />
        </FieldRoot>
      ))}
    </div>
  );
}
