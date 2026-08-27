import { Radio, type RadioTone } from '@noksha-ui/react';

const TONES: RadioTone[] = ['accent', 'neutral', 'danger', 'success', 'warning', 'info'];

export default function RadioTones() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      {TONES.map((tone) => (
        <Radio key={tone} value={tone} tone={tone} defaultChecked aria-label={tone} />
      ))}
    </div>
  );
}
