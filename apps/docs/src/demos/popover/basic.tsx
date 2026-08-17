import {
  Button,
  FieldLabel,
  FieldRoot,
  Input,
  PopoverClose,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from '@noksha-ui/react';

export default function PopoverBasic() {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button variant="outline" tone="neutral">
          Invite teammate
        </Button>
      </PopoverTrigger>

      <PopoverContent arrow className="w-72">
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-semibold text-fg text-sm">Invite to workspace</p>
            <p className="text-fg-muted text-sm">They will get an email with a join link.</p>
          </div>

          <FieldRoot>
            <FieldLabel>Email</FieldLabel>
            <Input size="sm" placeholder="name@company.com" type="email" />
          </FieldRoot>

          <div className="flex justify-end gap-2">
            <PopoverClose asChild>
              <Button size="sm" variant="ghost" tone="neutral">
                Cancel
              </Button>
            </PopoverClose>
            <Button size="sm">Send invite</Button>
          </div>
        </div>
      </PopoverContent>
    </PopoverRoot>
  );
}
