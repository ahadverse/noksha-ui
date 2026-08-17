'use client';

import {
  FieldDescription,
  FieldLabel,
  FieldRoot,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from '@prism-ui/react';
import * as React from 'react';

export default function SelectBasic() {
  const [region, setRegion] = React.useState('eu-west-1');

  return (
    <div className="w-full max-w-sm">
      <FieldRoot>
        <FieldLabel>Deploy region</FieldLabel>
        <SelectRoot value={region} onValueChange={setRegion}>
          <SelectTrigger placeholder="Choose a region" />
          <SelectContent>
            <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
            <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
            <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
            <SelectItem value="ap-south-1">Asia Pacific (Mumbai)</SelectItem>
            <SelectItem value="sa-east-1" disabled>
              South America (São Paulo) — at capacity
            </SelectItem>
          </SelectContent>
        </SelectRoot>
        <FieldDescription>Type a letter with the list open to jump to it.</FieldDescription>
      </FieldRoot>
    </div>
  );
}
