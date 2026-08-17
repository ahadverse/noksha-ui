import { FieldDescription, FieldLabel, FieldRoot, Textarea } from '@noksha-ui/react';

export default function TextareaBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <FieldRoot>
        <FieldLabel>Release notes</FieldLabel>
        <Textarea placeholder="What changed?" minRows={3} />
      </FieldRoot>

      <FieldRoot>
        <FieldLabel>Auto-sizing</FieldLabel>
        {/* Grows with the content up to maxRows, then scrolls. */}
        <Textarea autoSize minRows={2} maxRows={8} defaultValue="Type — this box grows with you." />
        <FieldDescription>Starts at 2 rows, stops growing at 8.</FieldDescription>
      </FieldRoot>
    </div>
  );
}
