import { Radio, RadioGroup } from '@noksha-ui/react';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export default function RadioInline() {
  return (
    <RadioGroup defaultValue="M" orientation="horizontal" size="sm">
      {SIZES.map((size) => (
        <label
          key={size}
          htmlFor={`size-${size}`}
          className="flex cursor-pointer items-center gap-1.5 text-fg text-sm"
        >
          <Radio id={`size-${size}`} value={size} />
          {size}
        </label>
      ))}
    </RadioGroup>
  );
}
