'use client';

import { Button, useToast } from '@noksha-ui/react';

export default function ToastPromise() {
  const { toast } = useToast();

  function save() {
    // Reusing an id replaces the toast in place rather than stacking a second
    // one — a "saving" that becomes "saved".
    const id = toast({ title: 'Saving changes…', duration: Number.POSITIVE_INFINITY });

    window.setTimeout(() => {
      toast({ id, tone: 'success', title: 'Changes saved', duration: 3000 });
    }, 1600);
  }

  return <Button onClick={save}>Save changes</Button>;
}
