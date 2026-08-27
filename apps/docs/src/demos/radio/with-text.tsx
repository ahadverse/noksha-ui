import { FieldDescription, FieldLabel, FieldRoot, Radio, RadioGroup } from '@noksha-ui/react';

const FREQUENCIES = [
  { value: 'realtime', label: 'Real-time', hint: 'Notify me the moment something happens.' },
  { value: 'daily', label: 'Daily digest', hint: 'One summary email every morning.' },
  { value: 'weekly', label: 'Weekly digest', hint: 'A roundup every Monday.' },
  { value: 'off', label: 'Off', hint: "Don't send notification emails." },
];

export default function RadioWithText() {
  return (
    <RadioGroup defaultValue="daily" className="w-full max-w-sm gap-4">
      {FREQUENCIES.map((option) => (
        <FieldRoot key={option.value} orientation="horizontal">
          <Radio value={option.value} />
          <div>
            <FieldLabel>{option.label}</FieldLabel>
            <FieldDescription>{option.hint}</FieldDescription>
          </div>
        </FieldRoot>
      ))}
    </RadioGroup>
  );
}
