import { FieldDescription, FieldError, FieldLabel, FieldRoot, Input } from '@prism-ui/react';

export default function FieldBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <FieldRoot required>
        <FieldLabel>Workspace name</FieldLabel>
        <Input placeholder="acme-inc" />
        <FieldDescription>Lowercase letters, numbers and dashes.</FieldDescription>
      </FieldRoot>

      {/* `invalid` swaps the description for the error and wires aria-invalid
          plus aria-describedby onto the control — no ids to pass by hand. */}
      <FieldRoot invalid>
        <FieldLabel>Email</FieldLabel>
        <Input defaultValue="ada@" />
        <FieldError>Enter a complete email address.</FieldError>
      </FieldRoot>

      <FieldRoot disabled>
        <FieldLabel>Organisation ID</FieldLabel>
        <Input defaultValue="org_8Fq21" />
        <FieldDescription>Assigned when the workspace was created.</FieldDescription>
      </FieldRoot>
    </div>
  );
}
