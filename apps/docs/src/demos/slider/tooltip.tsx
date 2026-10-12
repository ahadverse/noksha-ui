'use client';

import { RangeSlider, Slider } from '@noksha-ui/react';

import { DemoTile } from '@/components/demo-tile';

export default function SliderTooltip() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="On hover, focus and drag">
        <Slider aria-label="Volume" defaultValue={45} tooltip />
      </DemoTile>

      <DemoTile label="Always visible">
        <Slider aria-label="Brightness" defaultValue={60} tooltip="always" />
      </DemoTile>

      <DemoTile label="Currency">
        <Slider
          aria-label="Monthly spend cap"
          min={0}
          max={5000}
          step={50}
          defaultValue={1250}
          tooltip="always"
          formatValue={(value) => `$${value.toLocaleString('en-US')}`}
        />
      </DemoTile>

      <DemoTile label="Percentage">
        <Slider
          aria-label="Layer opacity"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0.35}
          tooltip="always"
          formatValue={(value) => `${Math.round(value * 100)}%`}
        />
      </DemoTile>

      <DemoTile label="Time · m:ss">
        <Slider
          aria-label="Playback position"
          min={0}
          max={754}
          defaultValue={192}
          size="sm"
          tooltip="always"
          formatValue={(value) =>
            `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`
          }
        />
      </DemoTile>

      <DemoTile label="Temperature">
        <Slider
          aria-label="Thermostat"
          min={16}
          max={30}
          step={0.5}
          defaultValue={21.5}
          tone="warning"
          variant="soft"
          tooltip="always"
          formatValue={(value) => `${value.toFixed(1)} °C`}
        />
      </DemoTile>

      <DemoTile label="Soft · pill thumb">
        <Slider
          aria-label="Dry and wet mix"
          defaultValue={70}
          tone="info"
          variant="soft"
          thumb="pill"
          tooltip="always"
          formatValue={(value) => `${value}% wet`}
        />
      </DemoTile>

      <DemoTile label="Solid · square thumb">
        <Slider
          aria-label="Noise gate threshold"
          min={-60}
          max={0}
          defaultValue={-24}
          size="lg"
          variant="solid"
          thumb="square"
          tooltip
          formatValue={(value) => `${value} dB`}
        />
      </DemoTile>

      <DemoTile label="Minimal · thumb and tooltip on hover">
        <Slider
          aria-label="Scrub"
          defaultValue={58}
          size="sm"
          variant="minimal"
          tone="neutral"
          tooltip
          formatValue={(value) => `${value}%`}
        />
      </DemoTile>

      <DemoTile label="Range · always visible">
        <RangeSlider
          min={0}
          max={5000}
          step={100}
          defaultValue={[1200, 3800]}
          tooltip="always"
          formatValue={(value) => `$${value.toLocaleString('en-US')}`}
          thumbLabels={['Minimum budget', 'Maximum budget']}
        />
      </DemoTile>
    </div>
  );
}
