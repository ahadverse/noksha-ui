'use client';

import {
  Badge,
  Button,
  CardContent,
  CardDescription,
  CardHeader,
  CardRoot,
  CardTitle,
  Slider,
  type Tone,
} from '@noksha-ui/react';
import * as React from 'react';

interface Channel {
  id: string;
  name: string;
  level: number;
  muted: boolean;
  soloed: boolean;
}

const FLOOR = -60;
const CEILING = 6;

const CHANNELS: Channel[] = [
  { id: 'kick', name: 'Kick', level: -4, muted: false, soloed: false },
  { id: 'snare', name: 'Snare', level: -7.5, muted: false, soloed: false },
  { id: 'bass', name: 'Bass', level: -9, muted: false, soloed: false },
  { id: 'keys', name: 'Keys', level: -16.5, muted: true, soloed: false },
  { id: 'vocals', name: 'Vocals', level: -2.5, muted: false, soloed: false },
];

function formatDb(value: number) {
  if (value <= FLOOR) return '−∞ dB';
  if (value === 0) return '0.0 dB';
  return `${value > 0 ? '+' : '−'}${Math.abs(value).toFixed(1)} dB`;
}

function percentOf(db: number) {
  return ((db - FLOOR) / (CEILING - FLOOR)) * 100;
}

const METER = [
  'repeating-linear-gradient(to top, transparent 0 5px, var(--noksha-bg-subtle) 5px 7px)',
  `linear-gradient(to top, var(--noksha-success-solid) ${percentOf(-12)}%, var(--noksha-warning-solid) ${percentOf(-12)}% ${percentOf(0)}%, var(--noksha-danger-solid) ${percentOf(0)}%)`,
].join(', ');

function channelTone(channel: Channel, anySolo: boolean): Tone {
  if (channel.muted) return 'neutral';
  if (channel.soloed) return 'warning';
  if (anySolo) return 'neutral';
  return 'accent';
}

function Strip({
  name,
  silent,
  master,
  children,
  footer,
}: {
  name: string;
  silent?: boolean;
  master?: boolean;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div
      className={
        master
          ? 'flex w-18 flex-col items-center gap-4 rounded-(--noksha-radius-lg) border border-(--noksha-border-strong) bg-subtle px-2 py-4 shadow-(--noksha-shadow-sm)'
          : 'flex w-18 flex-col items-center gap-4 rounded-(--noksha-radius-lg) border border-(--noksha-border-subtle) bg-subtle px-2 py-4'
      }
    >
      <span
        className={
          silent
            ? 'w-full truncate text-center font-medium text-fg-subtle text-xs'
            : 'w-full truncate text-center font-medium text-fg text-xs'
        }
      >
        {name}
      </span>
      <div className="h-52">{children}</div>
      <div className="flex h-7 items-center gap-1.5">{footer}</div>
    </div>
  );
}

export default function SliderMixer() {
  const [channels, setChannels] = React.useState(CHANNELS);
  const [master, setMaster] = React.useState(-3);

  const anySolo = channels.some((channel) => channel.soloed);
  const hot = master > 0;

  const update = (id: string, patch: Partial<Channel>) =>
    setChannels((current) =>
      current.map((channel) => (channel.id === id ? { ...channel, ...patch } : channel)),
    );

  return (
    <CardRoot variant="outline" padding="lg" className="w-full">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <CardTitle as="h3">Mix bus</CardTitle>
            <CardDescription>
              Mute locks a channel's fader. Solo silences every channel that is not soloed.
            </CardDescription>
          </div>
          {anySolo ? (
            <Badge dot tone="warning">
              Solo active
            </Badge>
          ) : null}
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-stretch sm:justify-center">
          <div className="flex flex-wrap justify-center gap-4">
            {channels.map((channel) => (
              <Strip
                key={channel.id}
                name={channel.name}
                silent={channel.muted || (anySolo && !channel.soloed)}
                footer={
                  <>
                    <Button
                      size="xs"
                      variant={channel.muted ? 'solid' : 'outline'}
                      tone={channel.muted ? 'danger' : 'neutral'}
                      aria-pressed={channel.muted}
                      aria-label={`Mute ${channel.name}`}
                      className="w-7 px-0"
                      onClick={() => update(channel.id, { muted: !channel.muted })}
                    >
                      M
                    </Button>
                    <Button
                      size="xs"
                      variant={channel.soloed ? 'solid' : 'outline'}
                      tone={channel.soloed ? 'warning' : 'neutral'}
                      aria-pressed={channel.soloed}
                      aria-label={`Solo ${channel.name}`}
                      className="w-7 px-0"
                      onClick={() => update(channel.id, { soloed: !channel.soloed })}
                    >
                      S
                    </Button>
                  </>
                }
              >
                <Slider
                  orientation="vertical"
                  thumb="bar"
                  variant="solid"
                  size="sm"
                  min={FLOOR}
                  max={CEILING}
                  step={0.5}
                  value={channel.level}
                  onValueChange={(level) => update(channel.id, { level })}
                  disabled={channel.muted}
                  tone={channelTone(channel, anySolo)}
                  showValue
                  formatValue={formatDb}
                  aria-label={`${channel.name} level`}
                  className="[--sl-thumb-h:1.75rem] [--sl-thumb-radius:0.1875rem] [--sl-thumb-w:0.5rem]"
                />
              </Strip>
            ))}
          </div>

          <Strip
            master
            name="Master"
            footer={
              <Badge
                dot
                size="sm"
                variant={hot ? 'solid' : 'soft'}
                tone={hot ? 'danger' : 'neutral'}
              >
                {hot ? 'Clip' : 'OK'}
              </Badge>
            }
          >
            <Slider
              orientation="vertical"
              thumb="bar"
              variant="solid"
              size="sm"
              min={FLOOR}
              max={CEILING}
              step={0.5}
              value={master}
              onValueChange={setMaster}
              tone={hot ? 'danger' : 'neutral'}
              showValue
              formatValue={formatDb}
              aria-label="Master level"
              className="[--sl-thumb-h:2rem] [--sl-thumb-radius:0.1875rem] [--sl-thumb-w:0.5rem] [--sl-track-radius:0.1875rem] [--sl-track:0.625rem]"
              style={{ ['--sl-fill-image' as string]: METER }}
            />
          </Strip>
        </div>
      </CardContent>
    </CardRoot>
  );
}
