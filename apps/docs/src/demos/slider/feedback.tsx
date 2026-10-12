'use client';

import { Slider, type SliderTone } from '@noksha-ui/react';
import * as React from 'react';
import { DemoTile } from '@/components/demo-tile';

const MOODS = [
  { face: '😡', label: 'Awful' },
  { face: '🙁', label: 'Not great' },
  { face: '😐', label: 'Okay' },
  { face: '🙂', label: 'Good' },
  { face: '😍', label: 'Love it' },
] as const;

function moodFor(value: number) {
  return MOODS[Math.min(MOODS.length - 1, Math.floor(value / 20))] ?? MOODS[0];
}

function toneFor(value: number): SliderTone {
  if (value < 34) return 'danger';
  if (value < 67) return 'warning';
  return 'success';
}

function SatisfactionSlider() {
  const [value, setValue] = React.useState(72);
  const mood = moodFor(value);

  return (
    <div className="flex flex-col items-center gap-4">
      <span
        aria-hidden="true"
        className="text-5xl leading-none transition-[scale] duration-200 motion-reduce:transition-none"
        style={{ scale: String(0.8 + value / 250) }}
      >
        {mood.face}
      </span>
      <span className="font-medium text-(--noksha-fg-default) text-sm">{mood.label}</span>
      <Slider
        aria-label="Satisfaction"
        value={value}
        onValueChange={setValue}
        tone={toneFor(value)}
        variant="soft"
        size="xl"
        formatValue={(next) => moodFor(next).label}
      />
    </div>
  );
}

const SATISFACTION_CODE = `import { Slider, type SliderTone } from '@noksha-ui/react';
import { useState } from 'react';

const MOODS = [
  { face: '😡', label: 'Awful' },
  { face: '🙁', label: 'Not great' },
  { face: '😐', label: 'Okay' },
  { face: '🙂', label: 'Good' },
  { face: '😍', label: 'Love it' },
] as const;

function moodFor(value: number) {
  return MOODS[Math.min(MOODS.length - 1, Math.floor(value / 20))] ?? MOODS[0];
}

function toneFor(value: number): SliderTone {
  if (value < 34) return 'danger';
  if (value < 67) return 'warning';
  return 'success';
}

export function SatisfactionSlider() {
  const [value, setValue] = useState(72);
  const mood = moodFor(value);

  return (
    <div className="flex flex-col items-center gap-4">
      <span
        aria-hidden="true"
        className="text-5xl leading-none transition-[scale] duration-200 motion-reduce:transition-none"
        style={{ scale: String(0.8 + value / 250) }}
      >
        {mood.face}
      </span>
      <span className="font-medium text-sm">{mood.label}</span>
      <Slider
        aria-label="Satisfaction"
        value={value}
        onValueChange={setValue}
        tone={toneFor(value)}
        variant="soft"
        size="xl"
        formatValue={(next) => moodFor(next).label}
      />
    </div>
  );
}`;

export default function SliderFeedback() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="Satisfaction" code={SATISFACTION_CODE}>
        <SatisfactionSlider />
      </DemoTile>

      <DemoTile label="Thermostat">
        <div className="flex items-start gap-3">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            className="mt-px size-5 shrink-0 text-sky-500"
          >
            <path d="M12 2v20M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9 3.5l3 2 3-2M9 20.5l3-2 3 2" />
          </svg>
          <Slider
            aria-label="Target temperature"
            defaultValue={21.5}
            min={10}
            max={30}
            step={0.5}
            size="lg"
            tooltip="always"
            formatValue={(value) => `${value.toFixed(1)} °C`}
            marks={[
              { value: 10, label: '10°' },
              { value: 15, label: '15°' },
              { value: 20, label: '20°' },
              { value: 25, label: '25°' },
              { value: 30, label: '30°' },
            ]}
            containerClassName="min-w-0 flex-1"
            className="[--sl-track:0.625rem] [--sl-rail:transparent] [--sl-fill-image:linear-gradient(90deg,#2563eb,#06b6d4_28%,#facc15_58%,#f97316_78%,#dc2626)] [--sl-thumb-bg:transparent] [--sl-thumb-border:#ffffff] [--sl-thumb-border-width:4px] [--sl-thumb-shadow:0_0_0_1px_rgb(0_0_0/0.25),0_2px_8px_rgb(0_0_0/0.3)]"
          />
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="mt-px size-5 shrink-0 text-orange-500"
          >
            <path d="M12 2c.6 3.4-1.6 5.3-3.3 7.2C7.2 10.9 6 12.6 6 15a6 6 0 0 0 12 0c0-2.3-1-4.1-2.3-5.6-.3 1.5-1.1 2.6-2.2 3.1C14.4 9 13.8 5.3 12 2Z" />
          </svg>
        </div>
      </DemoTile>

      <DemoTile label="Spice level">
        <Slider
          aria-label="Spice level"
          defaultValue={2}
          min={0}
          max={4}
          step={1}
          size="lg"
          thumb="pill"
          tone="danger"
          tooltip="always"
          formatValue={(value) => ['No heat', 'Mild', 'Medium', 'Hot', 'Volcanic'][value] ?? ''}
          marks={[
            { value: 0, label: '🫑' },
            { value: 1, label: '🌶️' },
            { value: 2, label: '🌶️🌶️' },
            { value: 3, label: '🌶️🌶️🌶️' },
            { value: 4, label: '🔥' },
          ]}
          className="[--sl-track:0.625rem] [--sl-rail:rgb(249_115_22/0.15)] [--sl-fill-image:linear-gradient(90deg,#facc15,#f97316,#dc2626)]"
        />
      </DemoTile>

      <DemoTile label="Pain scale">
        <div className="flex flex-col gap-2">
          <Slider
            aria-label="Pain level"
            defaultValue={4}
            min={0}
            max={10}
            step={1}
            size="lg"
            tone="neutral"
            tooltip="always"
            formatValue={(value) =>
              `${value} · ${['None', 'Very mild', 'Mild', 'Uncomfortable', 'Moderate', 'Distracting', 'Distressing', 'Intense', 'Severe', 'Excruciating', 'Unbearable'][value] ?? ''}`
            }
            marks={Array.from({ length: 11 }, (_, value) => ({ value, label: value }))}
            className="[--sl-track:0.5rem] [--sl-fill-image:linear-gradient(90deg,#22c55e,#eab308_45%,#f97316_70%,#dc2626)]"
          />
          <div className="flex justify-between gap-4 text-(--noksha-fg-subtle) text-xs">
            <span>No pain</span>
            <span>Worst imaginable</span>
          </div>
        </div>
      </DemoTile>
    </div>
  );
}
