import { Checkbox } from '@noksha-ui/react';

export default function CheckboxSizes() {
  return (
    <div className="flex items-center gap-5">
      <Checkbox size="sm" defaultChecked aria-label="Small" />
      <Checkbox size="md" defaultChecked aria-label="Medium" />
      <Checkbox size="lg" defaultChecked aria-label="Large" />
    </div>
  );
}
