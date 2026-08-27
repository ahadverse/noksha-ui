import { Switch } from '@noksha-ui/react';

export default function SwitchSizes() {
  return (
    <div className="flex items-center gap-5">
      <Switch size="sm" defaultChecked aria-label="Small" />
      <Switch size="md" defaultChecked aria-label="Medium" />
      <Switch size="lg" defaultChecked aria-label="Large" />
    </div>
  );
}
