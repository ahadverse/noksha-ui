'use client';

import { Button, Slider } from '@noksha-ui/react';
import * as React from 'react';

interface Track {
  title: string;
  artist: string;
  duration: number;
  art: string;
}

const TRACKS: [Track, ...Track[]] = [
  {
    title: 'Monsoon Static',
    artist: 'Lumen Drift',
    duration: 214,
    art: 'radial-gradient(circle at 30% 25%, #fde68a, transparent 45%), linear-gradient(135deg, #f97316, #db2777 55%, #4c1d95)',
  },
  {
    title: 'Paper Satellites',
    artist: 'Okra & the Tides',
    duration: 187,
    art: 'radial-gradient(circle at 70% 30%, #a7f3d0, transparent 40%), linear-gradient(160deg, #0ea5e9, #6366f1 60%, #1e1b4b)',
  },
  {
    title: 'Night Bus to Sylhet',
    artist: 'Dhaka Lo-Fi Club',
    duration: 251,
    art: 'radial-gradient(circle at 50% 80%, #fca5a5, transparent 45%), linear-gradient(200deg, #111827, #7c3aed 55%, #f472b6)',
  },
];

const SPEED_MARKS = [
  { value: 0.5, label: '0.5×' },
  { value: 0.75 },
  { value: 1, label: '1×' },
  { value: 1.25 },
  { value: 1.5, label: '1.5×' },
  { value: 1.75 },
  { value: 2, label: '2×' },
];

const BUFFER_AHEAD = 42;

function clock(seconds: number) {
  const whole = Math.max(0, Math.floor(seconds));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1.2" />
      <rect x="14" y="5" width="4" height="14" rx="1.2" />
    </svg>
  );
}

function PreviousIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="5" y="5" width="2.5" height="14" rx="1" />
      <path d="M19 6.2v11.6a1 1 0 0 1-1.55.83L9.6 13.3a1.6 1.6 0 0 1 0-2.6l7.85-5.33A1 1 0 0 1 19 6.2Z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="16.5" y="5" width="2.5" height="14" rx="1" />
      <path d="M5 6.2v11.6a1 1 0 0 0 1.55.83l7.85-5.33a1.6 1.6 0 0 0 0-2.6L6.55 5.37A1 1 0 0 0 5 6.2Z" />
    </svg>
  );
}

function VolumeIcon({ level }: { level: number }) {
  return (
    <Icon>
      <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" />
      {level === 0 && <path d="m16 9 5 6m0-6-5 6" />}
      {level > 0 && <path d="M15 10a3 3 0 0 1 0 4" />}
      {level >= 34 && <path d="M17.8 7.5a6.5 6.5 0 0 1 0 9" />}
      {level >= 67 && <path d="M20.5 5a10 10 0 0 1 0 14" />}
    </Icon>
  );
}

function SunSmallIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 6.5v1M12 16.5v1M6.5 12h1M16.5 12h1" />
    </Icon>
  );
}

function SunLargeIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Icon>
  );
}

function ZoomOutIcon() {
  return (
    <Icon>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5M8 11h6" />
    </Icon>
  );
}

function ZoomInIcon() {
  return (
    <Icon>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5M8 11h6M11 8v6" />
    </Icon>
  );
}

interface StepSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number) => void;
  decreaseIcon: React.ReactNode;
  increaseIcon: React.ReactNode;
}

function StepSlider({
  label,
  value,
  min,
  max,
  step,
  onValueChange,
  decreaseIcon,
  increaseIcon,
}: StepSliderProps) {
  const id = React.useId();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="font-medium text-(--noksha-fg-default) text-sm">
          {label}
        </label>
        <span className="text-(--noksha-fg-muted) text-xs tabular-nums">{value}%</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          iconOnly
          variant="outline"
          tone="neutral"
          size="sm"
          icon={decreaseIcon}
          aria-label={`Decrease ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onValueChange(Math.max(min, value - step))}
        />
        <Slider
          id={id}
          value={value}
          onValueChange={onValueChange}
          min={min}
          max={max}
          step={step}
          size="sm"
          tone="neutral"
          formatValue={(next) => `${next}%`}
          className="min-w-0 flex-1"
        />
        <Button
          iconOnly
          variant="outline"
          tone="neutral"
          size="sm"
          icon={increaseIcon}
          aria-label={`Increase ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onValueChange(Math.min(max, value + step))}
        />
      </div>
    </div>
  );
}

export default function SliderMediaControls() {
  const [trackIndex, setTrackIndex] = React.useState(0);
  const [position, setPosition] = React.useState(71);
  const [playing, setPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(64);
  const [muted, setMuted] = React.useState(false);
  const [speed, setSpeed] = React.useState(1);
  const [brightness, setBrightness] = React.useState(70);
  const [zoom, setZoom] = React.useState(100);

  const track = TRACKS[trackIndex] ?? TRACKS[0];
  const { duration } = track;
  const audible = muted ? 0 : volume;
  const buffered = (Math.min(duration, position + BUFFER_AHEAD) / duration) * 100;

  React.useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setPosition((current) => Math.min(duration, current + 1));
    }, 1000 / speed);
    return () => window.clearInterval(timer);
  }, [playing, speed, duration]);

  React.useEffect(() => {
    if (playing && position >= duration) setPlaying(false);
  }, [playing, position, duration]);

  const changeTrack = (offset: number) => {
    setTrackIndex((current) => (current + offset + TRACKS.length) % TRACKS.length);
    setPosition(0);
  };

  const togglePlay = () => {
    if (!playing && position >= duration) setPosition(0);
    setPlaying((current) => !current);
  };

  const toggleMute = () => {
    if (audible > 0) {
      setMuted(true);
      return;
    }
    setMuted(false);
    if (volume === 0) setVolume(40);
  };

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-(--noksha-border-subtle) bg-(--noksha-bg-surface) shadow-(--noksha-shadow-lg)">
      <section aria-label="Player" className="flex flex-col gap-7 p-6 sm:p-8">
        <div className="flex items-center gap-5">
          <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-(--noksha-bg-muted) shadow-(--noksha-shadow-md)">
            <div
              className="absolute inset-0 transition-[filter,transform] duration-300 ease-out motion-reduce:transition-none"
              style={{
                background: track.art,
                filter: `brightness(${0.3 + brightness / 100})`,
                transform: `scale(${zoom / 100})`,
              }}
            >
              <span className="absolute inset-1/4 rounded-full border-2 border-white/40" />
              <span className="absolute inset-[45%] rounded-full bg-white/70" />
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className="flex items-center gap-2 font-medium text-(--noksha-fg-subtle) text-xs uppercase tracking-wide">
              <span
                className={
                  playing
                    ? 'size-1.5 animate-pulse rounded-full bg-(--noksha-success-solid) motion-reduce:animate-none'
                    : 'size-1.5 rounded-full bg-(--noksha-fg-subtle)'
                }
              />
              {playing ? 'Now playing' : 'Paused'}
            </span>
            <span className="truncate font-semibold text-(--noksha-fg-default) text-lg">
              {track.title}
            </span>
            <span className="truncate text-(--noksha-fg-muted) text-sm">{track.artist}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <Slider
            aria-label="Seek"
            value={position}
            onValueChange={setPosition}
            max={duration}
            variant="minimal"
            tooltip
            formatValue={clock}
            className="[--sl-rail:transparent] [--sl-track:0.25rem] hover:[--sl-track:0.4375rem]"
            style={
              {
                '--sl-fill-image': `linear-gradient(90deg, var(--sl-solid) var(--sl-fill), transparent var(--sl-fill)), linear-gradient(90deg, color-mix(in oklab, var(--noksha-fg-default) 26%, var(--noksha-bg-muted)) ${buffered}%, var(--noksha-bg-muted) ${buffered}%)`,
              } as React.CSSProperties
            }
          />
          <div className="flex justify-between text-(--noksha-fg-muted) text-xs tabular-nums">
            <span>{clock(position)}</span>
            <span>-{clock(duration - position)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5">
          <Button
            iconOnly
            variant="ghost"
            tone="neutral"
            size="lg"
            icon={<PreviousIcon />}
            aria-label="Previous track"
            onClick={() => (position > 3 ? setPosition(0) : changeTrack(-1))}
          />
          <Button
            iconOnly
            shape="circle"
            size="xl"
            icon={playing ? <PauseIcon /> : <PlayIcon />}
            aria-label={playing ? 'Pause' : 'Play'}
            onClick={togglePlay}
          />
          <Button
            iconOnly
            variant="ghost"
            tone="neutral"
            size="lg"
            icon={<NextIcon />}
            aria-label="Next track"
            onClick={() => changeTrack(1)}
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            iconOnly
            variant="ghost"
            tone="neutral"
            size="sm"
            icon={<VolumeIcon level={audible} />}
            aria-label="Mute"
            aria-pressed={audible === 0}
            onClick={toggleMute}
          />
          <Slider
            aria-label="Volume"
            value={audible}
            onValueChange={(next) => {
              setVolume(next);
              setMuted(false);
            }}
            size="sm"
            tone="neutral"
            formatValue={(next) => `${next}%`}
            className="min-w-0 flex-1"
          />
          <span className="w-10 shrink-0 text-end text-(--noksha-fg-muted) text-xs tabular-nums">
            {audible}%
          </span>
        </div>
      </section>

      <section
        aria-label="Playback settings"
        className="grid gap-8 border-(--noksha-border-subtle) border-t bg-(--noksha-bg-subtle) p-6 sm:grid-cols-2 sm:p-8"
      >
        <div className="flex flex-col gap-3 sm:col-span-2">
          <span className="font-medium text-(--noksha-fg-default) text-sm">Playback speed</span>
          <Slider
            aria-label="Playback speed"
            value={speed}
            onValueChange={setSpeed}
            min={0.5}
            max={2}
            step={0.25}
            marks={SPEED_MARKS}
            showValue
            formatValue={(next) => `${next}×`}
          />
        </div>

        <StepSlider
          label="Brightness"
          value={brightness}
          onValueChange={setBrightness}
          min={0}
          max={100}
          step={10}
          decreaseIcon={<SunSmallIcon />}
          increaseIcon={<SunLargeIcon />}
        />

        <StepSlider
          label="Zoom"
          value={zoom}
          onValueChange={setZoom}
          min={50}
          max={200}
          step={25}
          decreaseIcon={<ZoomOutIcon />}
          increaseIcon={<ZoomInIcon />}
        />
      </section>
    </div>
  );
}
