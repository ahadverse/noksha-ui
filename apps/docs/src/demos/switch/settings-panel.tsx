import { FieldDescription, FieldLabel, FieldRoot, Switch } from '@noksha-ui/react';

const GROUPS = [
  {
    title: 'Notifications',
    rows: [
      { label: 'Email', hint: 'Receipts, invoices, and account activity.', defaultChecked: true },
      { label: 'Push', hint: 'Real-time alerts on this device.', defaultChecked: true },
      { label: 'SMS', hint: 'Reserved for security codes.' },
    ],
  },
  {
    title: 'Privacy',
    rows: [
      { label: 'Show activity status', hint: 'Let others see when you were last online.' },
      { label: 'Read receipts', hint: 'Show that a message has been read.', defaultChecked: true },
      { label: 'Personalized ads', hint: 'Use activity across apps to tailor ads.' },
    ],
  },
];

export default function SwitchSettingsPanel() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      {GROUPS.map((group) => (
        <div key={group.title} className="flex flex-col gap-1">
          <h3 className="px-1 font-medium text-fg-muted text-xs uppercase tracking-wide">
            {group.title}
          </h3>
          <div className="flex flex-col divide-y divide-(--noksha-border-subtle) rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-surface">
            {group.rows.map((row) => (
              <FieldRoot
                key={row.label}
                orientation="horizontal"
                className="items-center justify-between p-3.5"
              >
                <div>
                  <FieldLabel>{row.label}</FieldLabel>
                  <FieldDescription>{row.hint}</FieldDescription>
                </div>
                <Switch defaultChecked={row.defaultChecked} />
              </FieldRoot>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
