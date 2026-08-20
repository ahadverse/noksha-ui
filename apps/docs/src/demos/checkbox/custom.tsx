import { Checkbox } from '@noksha-ui/react';

export default function CheckboxCustom() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Checkbox className="rounded-full" defaultChecked aria-label="Pill" />
      <Checkbox
        containerClassName="[--cb-solid:#ec4899] [--cb-ink:#ffffff]"
        defaultChecked
        aria-label="Brand pink"
      />
      <Checkbox className="border-4" defaultChecked aria-label="Thick border" />
      <Checkbox containerClassName="size-7" defaultChecked aria-label="Oversized" />
    </div>
  );
}
