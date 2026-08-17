import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@noksha-ui/react';

export default function DialogDestructive() {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="soft" tone="danger">
          Delete workspace
        </Button>
      </DialogTrigger>

      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Delete this workspace?</DialogTitle>
          <DialogDescription>
            All 14 projects and their deployment history will be removed. This cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" tone="neutral">
              Keep workspace
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button tone="danger">Delete permanently</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
