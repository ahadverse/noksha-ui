import { Switch, type SwitchTone } from '@noksha-ui/react';

const TONES: SwitchTone[] = ['accent', 'neutral', 'danger', 'success', 'warning', 'info'];

export default function SwitchTones() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      {TONES.map((tone) => (
        <Switch key={tone} tone={tone} defaultChecked aria-label={tone} />
      ))}
    </div>
  );
}
