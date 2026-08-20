import { Checkbox, FieldLabel, FieldRoot } from '@noksha-ui/react';

export default function CheckboxBasic() {
  return (
    <div className="flex flex-col gap-3">
      <FieldRoot orientation="horizontal">
        <Checkbox />
        <FieldLabel>Unchecked</FieldLabel>
      </FieldRoot>
      <FieldRoot orientation="horizontal">
        <Checkbox defaultChecked />
        <FieldLabel>Checked</FieldLabel>
      </FieldRoot>
      <FieldRoot orientation="horizontal">
        <Checkbox indeterminate />
        <FieldLabel>Indeterminate</FieldLabel>
      </FieldRoot>
    </div>
  );
}
