import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@prism-ui/react';

export default function TabsVertical() {
  return (
    <TabsRoot
      defaultValue="general"
      orientation="vertical"
      variant="pill"
      className="flex w-full max-w-md gap-6"
    >
      <TabsList className="w-40 shrink-0">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="members">Members</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>

      <div className="flex-1 text-fg-muted text-sm">
        <TabsContent value="general">Workspace name, slug and default region.</TabsContent>
        <TabsContent value="members">Six people, two pending invitations.</TabsContent>
        <TabsContent value="billing">Pro plan, renews on the 1st.</TabsContent>
      </div>
    </TabsRoot>
  );
}
