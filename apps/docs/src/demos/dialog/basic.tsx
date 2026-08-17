import {
  Button,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  FieldLabel,
  FieldRoot,
  Input,
} from '@prism-ui/react';

export default function DialogBasic() {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button>Rename project</Button>
      </DialogTrigger>

      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>
            This changes the display name only. The project URL stays the same.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <FieldRoot>
            <FieldLabel>Project name</FieldLabel>
            <Input defaultValue="prism-ui" />
          </FieldRoot>
        </DialogBody>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" tone="neutral">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
