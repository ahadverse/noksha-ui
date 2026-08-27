import { Radio } from '@noksha-ui/react';

export default function RadioSizes() {
  return (
    <div className="flex items-center gap-5">
      <Radio value="sm" size="sm" defaultChecked aria-label="Small" />
      <Radio value="md" size="md" defaultChecked aria-label="Medium" />
      <Radio value="lg" size="lg" defaultChecked aria-label="Large" />
    </div>
  );
}
