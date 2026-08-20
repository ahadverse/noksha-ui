import { Checkbox, FieldDescription, FieldLabel, FieldRoot } from '@noksha-ui/react';

const CHANNELS = [
  {
    label: 'Product updates',
    hint: 'New features and improvements, a few times a month.',
  },
  {
    label: 'Security alerts',
    hint: 'Sign-ins from a new device or location.',
    defaultChecked: true,
  },
  {
    label: 'Marketing',
    hint: 'Offers and other promotional email.',
  },
];

export default function CheckboxWithText() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {CHANNELS.map((channel) => (
        <FieldRoot key={channel.label} orientation="horizontal">
          <Checkbox defaultChecked={channel.defaultChecked} />
          <div>
            <FieldLabel>{channel.label}</FieldLabel>
            <FieldDescription>{channel.hint}</FieldDescription>
          </div>
        </FieldRoot>
      ))}
    </div>
  );
}
