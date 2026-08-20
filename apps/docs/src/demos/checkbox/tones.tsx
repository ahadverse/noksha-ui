import { Checkbox, type CheckboxTone } from '@noksha-ui/react';

const TONES: CheckboxTone[] = ['accent', 'neutral', 'danger', 'success', 'warning', 'info'];

export default function CheckboxTones() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      {TONES.map((tone) => (
        <Checkbox key={tone} tone={tone} defaultChecked aria-label={tone} />
      ))}
    </div>
  );
}
