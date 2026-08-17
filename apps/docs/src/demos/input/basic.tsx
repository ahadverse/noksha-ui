import { Input } from '@prism-ui/react';

export default function InputBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input variant="outline" placeholder="Outline" />
      <Input variant="soft" placeholder="Soft" />
      <Input variant="ghost" placeholder="Ghost" />
      <Input placeholder="Disabled" disabled />
      <Input placeholder="Invalid" invalid defaultValue="not-an-email" />
    </div>
  );
}
