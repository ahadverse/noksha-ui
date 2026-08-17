'use client';

import { Button } from '@prism-ui/react';
import * as React from 'react';

export default function ButtonLoading() {
  const [saving, setSaving] = React.useState(false);

  function save() {
    setSaving(true);
    window.setTimeout(() => setSaving(false), 2000);
  }

  return (
    <>
      {/* The label stays in the box while hidden, so the width never jumps. */}
      <Button loading={saving} onClick={save}>
        Save changes
      </Button>
      <Button loading variant="soft">
        Saving
      </Button>
      <Button loading variant="outline" tone="neutral">
        Uploading
      </Button>
    </>
  );
}
