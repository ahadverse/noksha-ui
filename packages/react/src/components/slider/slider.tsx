import { useControllableState } from '@prism-ui/core';
import * as React from 'react';
import { useFieldControl } from '../field/field.js';
import type { SliderProps } from './slider.types.js';
import { sliderValueVariants, sliderVariants, sliderWrapperVariants } from './slider.variants.js';

/**
 * A single-value range control.
 *
 * ```tsx
 * <Slider min={0} max={100} defaultValue={40} showValue />
 * <Slider max={1} step={0.05} formatValue={(v) => `${Math.round(v * 100)}%`} />
 * ```
 */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(function Slider(
  {
    value: valueProp,
    defaultValue,
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    size = 'md',
    tone = 'accent',
    invalid,
    showValue = false,
    formatValue,
    containerClassName,
    className,
    ...rest
  },
  ref,
) {
  const [value, setValue] = useControllableState<number>({
    value: valueProp,
    defaultValue: defaultValue ?? min,
    onChange: onValueChange,
  });

  const field = useFieldControl({
    id: rest.id,
    disabled: rest.disabled,
    required: rest.required,
    'aria-invalid': invalid || undefined,
    'aria-describedby': rest['aria-describedby'],
  });

  // Guarded against max === min, which would otherwise put NaN into the
  // gradient stop and paint the whole track as unfilled.
  const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;
  const formatted = formatValue?.(value) ?? String(value);

  const input = (
    <input
      ref={ref}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      // `aria-valuetext` is what makes a formatted slider announce "40 percent"
      // instead of the bare number the platform would otherwise read.
      aria-valuetext={formatValue ? formatted : undefined}
      {...rest}
      {...field}
      style={{ ['--sl-fill' as string]: `${percent}%`, ...rest.style }}
      className={sliderVariants({ tone, size, className })}
      onChange={(event) => setValue(event.currentTarget.valueAsNumber)}
    />
  );

  if (!showValue) return input;

  return (
    <div className={sliderWrapperVariants({ className: containerClassName })}>
      {input}
      <span aria-hidden="true" className={sliderValueVariants({ size })}>
        {formatted}
      </span>
    </div>
  );
});

Slider.displayName = 'Slider';

export { sliderVariants };
