import { Separator } from '@prism-ui/react';

export default function SeparatorBasic() {
  return (
    <div className="w-full max-w-sm">
      <p className="text-fg-muted text-sm">Signed in as ada@example.com</p>

      <Separator className="my-4" />

      <div className="flex h-5 items-center gap-4 text-fg-muted text-sm">
        <span>Profile</span>
        <Separator orientation="vertical" />
        <span>Billing</span>
        <Separator orientation="vertical" />
        <span>Team</span>
      </div>

      {/* A labelled rule — the label sits inside the line. */}
      <Separator className="my-4">or</Separator>

      <p className="text-fg-muted text-sm">Continue with a single sign-on provider</p>
    </div>
  );
}
