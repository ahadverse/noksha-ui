'use client';

import { Button, useToast } from '@prism-ui/react';

export default function ToastBasic() {
  const { toast } = useToast();

  return (
    <>
      <Button
        variant="outline"
        tone="neutral"
        onClick={() =>
          toast({
            title: 'Deployment queued',
            description: 'Build #482 started on main.',
          })
        }
      >
        Neutral
      </Button>

      <Button
        variant="outline"
        tone="success"
        onClick={() => toast({ tone: 'success', title: 'Deployed to production' })}
      >
        Success
      </Button>

      <Button
        variant="outline"
        tone="danger"
        onClick={() =>
          toast({
            tone: 'danger',
            title: 'Build failed',
            description: 'Two of six health checks did not pass.',
            duration: Number.POSITIVE_INFINITY,
            action: (
              <Button size="xs" variant="soft" tone="danger">
                View logs
              </Button>
            ),
          })
        }
      >
        Needs action
      </Button>
    </>
  );
}
