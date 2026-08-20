import { Checkbox, FieldLabel, FieldRoot } from '@noksha-ui/react';

export default function CheckboxDisabled() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-5">
        <Checkbox disabled aria-label="Disabled unchecked" />
        <Checkbox disabled defaultChecked aria-label="Disabled checked" />
        <Checkbox disabled indeterminate aria-label="Disabled indeterminate" />
      </div>
      <FieldRoot orientation="horizontal" disabled>
        <Checkbox defaultChecked />
        <FieldLabel>Auto-renew subscription</FieldLabel>
      </FieldRoot>
    </div>
  );
}
