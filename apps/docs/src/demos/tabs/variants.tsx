import type { TabsVariant } from '@noksha-ui/react';
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@noksha-ui/react';

const VARIANTS: TabsVariant[] = ['line', 'solid', 'pill'];

export default function TabsVariants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      {VARIANTS.map((variant) => (
        <TabsRoot key={variant} defaultValue="overview" variant={variant}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="pt-3 text-fg-muted text-sm">
            The <code>{variant}</code> variant.
          </TabsContent>
          <TabsContent value="activity" className="pt-3 text-fg-muted text-sm">
            Nothing in the last 7 days.
          </TabsContent>
          <TabsContent value="settings" className="pt-3 text-fg-muted text-sm">
            Only owners can change these.
          </TabsContent>
        </TabsRoot>
      ))}
    </div>
  );
}
