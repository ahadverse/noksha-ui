import { FieldLabel, FieldRoot, Radio } from '@noksha-ui/react';

export default function RadioDisabled() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-5">
        <Radio value="off" disabled aria-label="Disabled unchecked" />
        <Radio value="on" disabled defaultChecked aria-label="Disabled checked" />
      </div>
      <FieldRoot orientation="horizontal" disabled>
        <Radio value="renew" defaultChecked />
        <FieldLabel>Auto-renew subscription</FieldLabel>
      </FieldRoot>
    </div>
  );
}
