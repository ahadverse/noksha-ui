import { AlertActions, AlertDescription, AlertRoot, AlertTitle, Button } from '@prism-ui/react';

export default function AlertWithActions() {
  return (
    <AlertRoot tone="warning" variant="outline">
      <AlertTitle>Your trial ends in 3 days</AlertTitle>
      <AlertDescription>
        Add a payment method to keep your projects running after Friday.
      </AlertDescription>
      <AlertActions>
        <Button size="sm" tone="warning">
          Add payment method
        </Button>
        <Button size="sm" variant="ghost" tone="neutral">
          Remind me later
        </Button>
      </AlertActions>
    </AlertRoot>
  );
}
