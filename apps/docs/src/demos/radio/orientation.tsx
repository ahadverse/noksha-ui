import { FieldLabel, FieldRoot, Radio, RadioGroup } from '@noksha-ui/react';

const OPTIONS = [
  { value: 'card', label: 'Card' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'bank', label: 'Bank transfer' },
];

export default function RadioOrientation() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div>
        <p className="mb-2 text-fg-muted text-xs uppercase tracking-wide">Horizontal</p>
        <RadioGroup defaultValue="card" orientation="horizontal">
          {OPTIONS.map((option) => (
            <FieldRoot key={option.value} orientation="horizontal">
              <Radio value={option.value} />
              <FieldLabel>{option.label}</FieldLabel>
            </FieldRoot>
          ))}
        </RadioGroup>
      </div>
      <div>
        <p className="mb-2 text-fg-muted text-xs uppercase tracking-wide">Vertical</p>
        <RadioGroup defaultValue="card">
          {OPTIONS.map((option) => (
            <FieldRoot key={option.value} orientation="horizontal">
              <Radio value={option.value} />
              <FieldLabel>{option.label}</FieldLabel>
            </FieldRoot>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
