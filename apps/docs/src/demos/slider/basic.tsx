'use client';

import { FieldDescription, FieldLabel, FieldRoot, Slider } from '@noksha-ui/react';
import * as React from 'react';

export default function SliderBasic() {
  const [quality, setQuality] = React.useState(72);

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <FieldRoot>
        <FieldLabel>Compression quality</FieldLabel>
        <Slider
          value={quality}
          onValueChange={setQuality}
          showValue
          formatValue={(value) => `${value}%`}
        />
        <FieldDescription>Arrow keys step by 1, Page Up and Page Down by 10.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <FieldLabel>Replicas</FieldLabel>
        <Slider defaultValue={3} min={1} max={9} step={1} showValue tone="success" />
      </FieldRoot>
    </div>
  );
}
