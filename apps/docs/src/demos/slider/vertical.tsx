'use client';

import { Slider } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

const BANDS = [
  { label: '60Hz', name: '60 hertz', gain: 4 },
  { label: '150Hz', name: '150 hertz', gain: 2 },
  { label: '400Hz', name: '400 hertz', gain: -1 },
  { label: '1k', name: '1 kilohertz', gain: -3 },
  { label: '2.4k', name: '2.4 kilohertz', gain: 1 },
  { label: '6k', name: '6 kilohertz', gain: 3 },
  { label: '14k', name: '14 kilohertz', gain: 5 },
];

export default function SliderVertical() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="min-w-0 sm:col-span-2">
        <DemoTile label="Equalizer · ±12 dB">
          <div className="mx-auto flex h-56 w-full max-w-md justify-between gap-1">
            {BANDS.map((band) => (
              <div key={band.label} className="flex flex-col items-center gap-2">
                <div className="min-h-0 flex-1">
                  <Slider
                    orientation="vertical"
                    aria-label={`${band.name} gain, decibels`}
                    min={-12}
                    max={12}
                    defaultValue={band.gain}
                    size="sm"
                    thumb="bar"
                    variant="solid"
                    showValue
                    formatValue={(value) => (value > 0 ? `+${value}` : String(value))}
                  />
                </div>
                <span className="text-(--noksha-fg-muted) text-xs tabular-nums">{band.label}</span>
              </div>
            ))}
          </div>
        </DemoTile>
      </div>

      <DemoTile label="Volume fader" className="flex-row items-center justify-center">
        <div className="h-48">
          <Slider
            orientation="vertical"
            aria-label="Master volume"
            defaultValue={68}
            size="xl"
            thumb="bar"
            variant="soft"
            tone="success"
            showValue
            formatValue={(value) => `${value}%`}
          />
        </div>
      </DemoTile>

      <DemoTile label="Labelled stops" className="flex-row items-center justify-center">
        <div className="h-48">
          <Slider
            orientation="vertical"
            aria-label="Fan speed"
            min={0}
            max={4}
            defaultValue={2}
            marks={[
              { value: 0, label: 'Off' },
              { value: 1, label: 'Low' },
              { value: 2, label: 'Mid' },
              { value: 3, label: 'High' },
              { value: 4, label: 'Max' },
            ]}
            formatValue={(value) => ['Off', 'Low', 'Mid', 'High', 'Max'][value] ?? ''}
          />
        </div>
      </DemoTile>

      <DemoTile label="Tooltip" className="flex-row items-center justify-center">
        <div className="h-48">
          <Slider
            orientation="vertical"
            aria-label="Lamp brightness"
            defaultValue={72}
            variant="solid"
            tone="warning"
            tooltip="always"
            formatValue={(value) => `${value}%`}
          />
        </div>
      </DemoTile>

      <DemoTile label="Control-centre bar" className="flex-row items-center justify-center">
        <div className="h-48">
          <Slider
            orientation="vertical"
            aria-label="Display brightness"
            defaultValue={55}
            tone="neutral"
            className="[--sl-track:3rem] [--sl-thumb-w:0.5rem] [--sl-thumb-h:3rem] [--sl-track-radius:1rem] [--sl-thumb-bg:transparent] [--sl-thumb-border-width:0px] [--sl-thumb-shadow:none]"
          />
        </div>
      </DemoTile>
    </div>
  );
}
