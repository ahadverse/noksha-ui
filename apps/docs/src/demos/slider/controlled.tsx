'use client';

import { Button, ButtonGroup, Input, RangeSlider, Slider } from '@noksha-ui/react';
import * as React from 'react';

const PRESETS = [
  { label: 'Low', value: 20 },
  { label: 'Medium', value: 50 },
  { label: 'High', value: 85 },
];

const SALARY_MIN = 30;
const SALARY_MAX = 250;
const SALARY_STEP = 5;
const SALARY_GAP_STEPS = 2;
const SALARY_GAP = SALARY_STEP * SALARY_GAP_STEPS;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-4 rounded-(--noksha-radius-lg) border border-(--noksha-border-subtle) bg-(--noksha-bg-surface) p-5">
      <span className="font-(--noksha-weight-medium) text-(length:--noksha-text-xs) text-(--noksha-fg-subtle) uppercase tracking-(--noksha-tracking-wide)">
        {label}
      </span>
      {children}
    </div>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <span className="text-(--noksha-fg-subtle) text-xs tabular-nums">{children}</span>;
}

function NumberBox({
  value,
  min,
  max,
  step = 1,
  label,
  onCommit,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  label: string;
  onCommit: (value: number) => void;
}) {
  const [draft, setDraft] = React.useState<string | null>(null);

  function snap(raw: number) {
    return clamp(Math.round(raw / step) * step, min, max);
  }

  function commit() {
    if (draft === null) return;
    const parsed = Number.parseFloat(draft);
    onCommit(Number.isFinite(parsed) ? snap(parsed) : value);
    setDraft(null);
  }

  return (
    <Input
      type="number"
      inputMode="numeric"
      size="sm"
      min={min}
      max={max}
      step={step}
      value={draft ?? String(value)}
      aria-label={label}
      className="w-20 shrink-0 text-center tabular-nums"
      onChange={(event) => {
        const next = event.currentTarget.value;
        setDraft(next);
        const parsed = Number.parseFloat(next);
        if (Number.isFinite(parsed) && parsed >= min && parsed <= max) onCommit(snap(parsed));
      }}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === 'Enter') commit();
      }}
    />
  );
}

export default function SliderControlled() {
  const [volume, setVolume] = React.useState(40);
  const [speed, setSpeed] = React.useState(50);
  const [brightness, setBrightness] = React.useState(12);
  const [zoom, setZoom] = React.useState(60);
  const [salary, setSalary] = React.useState<[number, number]>([60, 140]);
  const [log, setLog] = React.useState<{ id: number; value: number }[]>([]);
  const nextId = React.useRef(0);

  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <Section label="Slider and number input">
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <Slider value={volume} onValueChange={setVolume} aria-label="Volume" />
          </div>
          <NumberBox value={volume} min={0} max={100} label="Volume value" onCommit={setVolume} />
        </div>
        <Hint>Type 250 and press Enter — it clamps to 100.</Hint>
      </Section>

      <Section label="Preset buttons">
        <Slider
          value={speed}
          onValueChange={setSpeed}
          aria-label="Fan speed"
          showValue
          formatValue={(value) => `${value}%`}
        />
        <ButtonGroup aria-label="Fan speed presets" className="self-start">
          {PRESETS.map((preset) => (
            <Button
              key={preset.label}
              size="sm"
              variant={speed === preset.value ? 'solid' : 'outline'}
              tone={speed === preset.value ? 'accent' : 'neutral'}
              aria-pressed={speed === preset.value}
              onClick={() => setSpeed(preset.value)}
            >
              {preset.label}
            </Button>
          ))}
        </ButtonGroup>
      </Section>

      <Section label="Reset to default">
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <Slider
              value={brightness}
              onValueChange={setBrightness}
              min={-50}
              max={50}
              aria-label="Brightness"
              showValue
              formatValue={(value) => (value > 0 ? `+${value}` : String(value))}
            />
          </div>
          <Button
            size="sm"
            variant="soft"
            tone="neutral"
            disabled={brightness === 0}
            onClick={() => setBrightness(0)}
          >
            Reset
          </Button>
        </div>
        <Hint>The button disables itself once the value is back at 0.</Hint>
      </Section>

      <Section label="Two sliders, one value">
        <div className="flex flex-col gap-5">
          <Slider value={zoom} onValueChange={setZoom} aria-label="Zoom" />
          <Slider
            value={zoom}
            onValueChange={setZoom}
            aria-label="Zoom, mirrored"
            variant="soft"
            thumb="square"
            tone="info"
          />
        </div>
        <Hint>zoom: {zoom}</Hint>
      </Section>

      <Section label="Range with editable bounds">
        <RangeSlider
          value={salary}
          onValueChange={setSalary}
          min={SALARY_MIN}
          max={SALARY_MAX}
          step={SALARY_STEP}
          minStepsBetween={SALARY_GAP_STEPS}
          formatValue={(value) => `$${value}k`}
          thumbLabels={['Minimum salary', 'Maximum salary']}
        />
        <div className="flex items-center gap-3">
          <NumberBox
            value={salary[0]}
            min={SALARY_MIN}
            max={salary[1] - SALARY_GAP}
            step={SALARY_STEP}
            label="Minimum salary, in thousands"
            onCommit={(lo) => setSalary([lo, salary[1]])}
          />
          <span aria-hidden="true" className="text-(--noksha-fg-subtle)">
            –
          </span>
          <NumberBox
            value={salary[1]}
            min={salary[0] + SALARY_GAP}
            max={SALARY_MAX}
            step={SALARY_STEP}
            label="Maximum salary, in thousands"
            onCommit={(hi) => setSalary([salary[0], hi])}
          />
          <Hint>$k per year</Hint>
        </div>
      </Section>

      <Section label="onValueChange log">
        <Slider
          defaultValue={30}
          aria-label="Logged value"
          tone="success"
          onValueChange={(value) => {
            nextId.current += 1;
            const id = nextId.current;
            setLog((entries) => [{ id, value }, ...entries].slice(0, 4));
          }}
        />
        <ol className="flex min-h-19 flex-col gap-1 font-mono text-xs">
          {log.length === 0 ? (
            <li className="text-(--noksha-fg-subtle)">Drag the slider to log changes.</li>
          ) : (
            log.map((entry, index) => (
              <li
                key={entry.id}
                className={index === 0 ? 'text-(--noksha-fg-default)' : 'text-(--noksha-fg-subtle)'}
              >
                onValueChange({entry.value})
              </li>
            ))
          )}
        </ol>
      </Section>
    </div>
  );
}
