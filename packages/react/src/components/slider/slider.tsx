import { cx, useControllableState } from '@noksha-ui/core';
import * as React from 'react';
import { useFieldControl } from '../field/field.js';
import type {
  RangeSliderProps,
  SliderMark,
  SliderOrientation,
  SliderProps,
} from './slider.types.js';
import {
  rangeSliderTrackVariants,
  rangeSliderVariants,
  sliderAreaVariants,
  sliderInputVariants,
  sliderMarksVariants,
  sliderMarkVariants,
  sliderTickVariants,
  sliderTooltipVariants,
  sliderValueVariants,
  sliderVariants,
  sliderVarsVariants,
  sliderWrapperVariants,
} from './slider.variants.js';

function toFraction(value: number, min: number, max: number): number {
  if (max === min) return 0;
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

function decimalsOf(value: number): number {
  return (String(value).split('.')[1] ?? '').length;
}

function round(value: number, min: number, step: number): number {
  return Number(value.toFixed(Math.max(decimalsOf(step), decimalsOf(min))));
}

function snap(raw: number, min: number, max: number, step: number): number {
  const snapped = Math.round((raw - min) / step) * step + min;
  return round(Math.min(max, Math.max(min, snapped)), min, step);
}

function varClassesOf(className: string | undefined): string | undefined {
  return (
    className
      ?.split(/\s+/)
      .filter((token) => token.includes('[--sl-'))
      .join(' ') || undefined
  );
}

function varStylesOf(style: React.CSSProperties | undefined): React.CSSProperties | undefined {
  if (!style) return undefined;
  const entries = Object.entries(style).filter(([key]) => key.startsWith('--sl-'));
  return entries.length > 0 ? Object.fromEntries(entries) : undefined;
}

function widestOf(format: (value: number) => string, min: number, max: number, step: number) {
  const samples = [min, max, snap(min + step, min, max, step), snap(max - step, min, max, step)];
  return Math.max(...samples.map((sample) => format(sample).length));
}

function resolveMarks(
  marks: SliderProps['marks'],
  min: number,
  max: number,
  step: number,
): SliderMark[] {
  if (!marks) return [];
  if (marks === true) {
    if (step <= 0 || max <= min) return [];
    const count = Math.floor((max - min) / step + 1e-9);
    return Array.from({ length: count + 1 }, (_, index) => ({
      value: Number((min + index * step).toFixed(Math.max(decimalsOf(step), decimalsOf(min)))),
    }));
  }
  return marks.map((mark) => (typeof mark === 'number' ? { value: mark } : mark));
}

function SliderMarks({
  marks,
  min,
  max,
  orientation,
  isActive,
}: {
  marks: SliderMark[];
  min: number;
  max: number;
  orientation: SliderOrientation;
  isActive: (value: number) => boolean;
}) {
  const labelled = marks.some((mark) => mark.label != null);

  return (
    <div aria-hidden="true" className={sliderMarksVariants({ orientation, labelled })}>
      {marks.map((mark) => {
        const active = isActive(mark.value) || undefined;
        return (
          <span
            key={mark.value}
            data-active={active}
            style={{ ['--sl-p' as string]: toFraction(mark.value, min, max) }}
            className={sliderMarkVariants({ orientation })}
          >
            <span data-active={active} className={sliderTickVariants({ orientation })} />
            {mark.label != null && <span>{mark.label}</span>}
          </span>
        );
      })}
    </div>
  );
}

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
    variant = 'default',
    thumb = 'circle',
    orientation = 'horizontal',
    invalid,
    showValue = false,
    tooltip = false,
    marks,
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

  const { 'aria-required': _ariaRequired, ...field } = useFieldControl({
    id: rest.id,
    disabled: rest.disabled,
    required: rest.required,
    'aria-invalid': invalid || undefined,
    'aria-describedby': rest['aria-describedby'],
  });

  // Guarded against max === min, which would otherwise put NaN into the
  // gradient stop and paint the whole track as unfilled.
  const fraction = toFraction(value, min, max);
  const format = (next: number) => formatValue?.(next) ?? String(next);
  const formatted = format(value);
  const resolvedMarks = resolveMarks(marks, min, max, step);
  const vars = sliderVarsVariants({ tone, size, thumb, variant, orientation });
  const wrapped = showValue || Boolean(tooltip) || resolvedMarks.length > 0;

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
      aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
      {...rest}
      {...field}
      style={{ ['--sl-fill' as string]: `${fraction * 100}%`, ...rest.style }}
      className={sliderVariants({
        tone,
        size,
        thumb,
        variant,
        orientation,
        className: cx(wrapped && 'disabled:opacity-100', className),
      })}
      onChange={(event) => setValue(event.currentTarget.valueAsNumber)}
    />
  );

  if (!wrapped) return input;

  return (
    <div
      style={varStylesOf(rest.style)}
      className={sliderWrapperVariants({
        orientation,
        className: cx(vars, varClassesOf(className), containerClassName),
      })}
    >
      <div className={sliderAreaVariants({ orientation })}>
        {input}
        {tooltip && (
          <span
            aria-hidden="true"
            style={{ ['--sl-p' as string]: fraction }}
            className={sliderTooltipVariants({ orientation, always: tooltip === 'always' })}
          >
            {formatted}
          </span>
        )}
        {resolvedMarks.length > 0 && (
          <SliderMarks
            marks={resolvedMarks}
            min={min}
            max={max}
            orientation={orientation}
            isActive={(markValue) => markValue <= value}
          />
        )}
      </div>
      {showValue && (
        <span
          aria-hidden="true"
          style={{ minWidth: `${widestOf(format, min, max, step)}ch` }}
          className={sliderValueVariants({ orientation, size })}
        >
          {formatted}
        </span>
      )}
    </div>
  );
});

Slider.displayName = 'Slider';

export const RangeSlider = React.forwardRef<HTMLDivElement, RangeSliderProps>(function RangeSlider(
  {
    value: valueProp,
    defaultValue,
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    minStepsBetween = 0,
    size = 'md',
    tone = 'accent',
    variant = 'default',
    thumb = 'circle',
    invalid,
    disabled,
    name,
    showValue = false,
    tooltip = false,
    marks,
    formatValue,
    thumbLabels = ['Minimum', 'Maximum'],
    className,
    'aria-describedby': ariaDescribedBy,
    ...rest
  },
  ref,
) {
  const [range, setRange] = useControllableState<[number, number]>({
    value: valueProp,
    defaultValue: defaultValue ?? [min, max],
    onChange: onValueChange,
  });

  const field = useFieldControl({
    disabled,
    'aria-invalid': invalid || undefined,
    'aria-describedby': ariaDescribedBy,
  });

  const loRef = React.useRef<HTMLInputElement>(null);
  const hiRef = React.useRef<HTMLInputElement>(null);

  const [lo, hi] = range[0] <= range[1] ? range : [range[1], range[0]];
  const gap = round(minStepsBetween * step, 0, step);
  const isDisabled = Boolean(field.disabled);
  const isInvalid = Boolean(field['aria-invalid']);
  const format = (value: number) => formatValue?.(value) ?? String(value);
  const loFraction = toFraction(lo, min, max);
  const hiFraction = toFraction(hi, min, max);
  const resolvedMarks = resolveMarks(marks, min, max, step);
  const vars = sliderVarsVariants({ tone, size, thumb, variant, orientation: 'horizontal' });

  const commit = (index: 0 | 1, next: number) => {
    const touching = round(hi - lo, 0, step) <= gap;
    const moveLo = index === 0 ? !(touching && next > lo) : touching && next < hi;
    const nextLo = moveLo ? round(Math.max(min, Math.min(next, hi - gap)), min, step) : lo;
    const nextHi = moveLo ? hi : round(Math.min(max, Math.max(next, lo + gap)), min, step);
    if (nextLo === lo && nextHi === hi) return;
    setRange([nextLo, nextHi]);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isDisabled || event.button !== 0 || event.target instanceof HTMLInputElement) return;

    const area = event.currentTarget;
    const rect = area.getBoundingClientRect();
    if (rect.width === 0) return;

    const rtl = getComputedStyle(area).direction === 'rtl';
    const offset = (event.clientX - rect.left) / rect.width;
    const raw = min + (rtl ? 1 - offset : offset) * (max - min);
    const next = snap(raw, min, max, step);
    const index = Math.abs(next - lo) < Math.abs(next - hi) || (next < lo && lo === hi) ? 0 : 1;

    event.preventDefault();
    commit(index, next);
    (index === 0 ? loRef : hiRef).current?.focus();
  };

  const shared = {
    min,
    max,
    step,
    name,
    disabled: isDisabled,
    'aria-invalid': field['aria-invalid'],
    'aria-describedby': field['aria-describedby'],
  };

  return (
    <div
      ref={ref}
      data-invalid={isInvalid || undefined}
      data-disabled={isDisabled || undefined}
      {...rest}
      className={rangeSliderVariants({ className: cx(vars, className) })}
    >
      <div className={sliderAreaVariants()} onPointerDown={handlePointerDown}>
        <div
          aria-hidden="true"
          style={{ ['--sl-from' as string]: loFraction, ['--sl-to' as string]: hiFraction }}
          className={rangeSliderTrackVariants()}
        />
        <input
          ref={loRef}
          type="range"
          {...shared}
          id={field.id}
          value={lo}
          aria-label={thumbLabels[0]}
          aria-valuetext={formatValue ? format(lo) : undefined}
          className={sliderInputVariants({
            track: 'overlay',
            variant,
            className: cx('peer/lo', lo > min + (max - min) / 2 && 'z-[1]'),
          })}
          onChange={(event) => commit(0, event.currentTarget.valueAsNumber)}
        />
        <input
          ref={hiRef}
          type="range"
          {...shared}
          value={hi}
          aria-label={thumbLabels[1]}
          aria-valuetext={formatValue ? format(hi) : undefined}
          className={sliderInputVariants({
            track: 'overlay',
            variant,
            className: 'peer/hi absolute inset-x-0 top-0',
          })}
          onChange={(event) => commit(1, event.currentTarget.valueAsNumber)}
        />
        {tooltip && (
          <>
            <span
              aria-hidden="true"
              style={{ ['--sl-p' as string]: loFraction }}
              className={sliderTooltipVariants({ peer: 'lo', always: tooltip === 'always' })}
            >
              {format(lo)}
            </span>
            <span
              aria-hidden="true"
              style={{ ['--sl-p' as string]: hiFraction }}
              className={sliderTooltipVariants({ peer: 'hi', always: tooltip === 'always' })}
            >
              {format(hi)}
            </span>
          </>
        )}
        {resolvedMarks.length > 0 && (
          <SliderMarks
            marks={resolvedMarks}
            min={min}
            max={max}
            orientation="horizontal"
            isActive={(markValue) => markValue >= lo && markValue <= hi}
          />
        )}
      </div>
      {showValue && (
        <span
          aria-hidden="true"
          style={{ minWidth: `${widestOf(format, min, max, step) * 2 + 1}ch` }}
          className={sliderValueVariants({ size })}
        >
          {format(lo)} – {format(hi)}
        </span>
      )}
    </div>
  );
});

RangeSlider.displayName = 'RangeSlider';

export { rangeSliderVariants, sliderVariants };
