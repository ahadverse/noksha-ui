import { FieldLabel, FieldRoot, Switch } from '@noksha-ui/react';

export default function SwitchDisabled() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-5">
        <Switch disabled aria-label="Disabled off" />
        <Switch disabled defaultChecked aria-label="Disabled on" />
      </div>
      <FieldRoot orientation="horizontal" disabled>
        <Switch defaultChecked />
        <FieldLabel>Auto-renew subscription</FieldLabel>
      </FieldRoot>
    </div>
  );
}
