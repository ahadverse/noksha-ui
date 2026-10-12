'use client';

import { Button, CopyButton, Skeleton } from '@noksha-ui/react';
import * as React from 'react';

import { DemoTile } from '@/components/demo-tile';

const ArrowRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="transition-transform duration-200 group-hover:translate-x-1"
  >
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
);

const RefreshIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="transition-transform duration-500 group-hover:rotate-180"
  >
    <path d="M20 11A8 8 0 0 0 6 6.3L4 8M4 13a8 8 0 0 0 14 4.7l2-1.7" />
    <path d="M4 4v4h4M20 20v-4h-4" />
  </svg>
);

const SaveIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 4h11l3 3v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
    <path d="M8 4v5h7V4M8 20v-6h8v6" />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const BellIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 9a6 6 0 0 1 12 0c0 4.5 1.5 6 1.5 6h-15S6 13.5 6 9Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <path d="M11 2c.6 3.4 2.6 5.4 6 6-3.4.6-5.4 2.6-6 6-.6-3.4-2.6-5.4-6-6 3.4-.6 5.4-2.6 6-6Z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const RocketIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2c3 1.5 5 5 5 9 0 2-.5 3.5-1 4.5L12 19l-4-3.5c-.5-1-1-2.5-1-4.5 0-4 2-7.5 5-9Z" />
    <circle cx="12" cy="9" r="1.5" />
    <path d="M8 16l-2 4M16 16l2 4" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <path d="M12 20.5 4.6 13a5 5 0 0 1 7-7.1L12 6.3l.4-.4a5 5 0 0 1 7 7.1L12 20.5Z" />
  </svg>
);

interface Ripple {
  id: number;
  x: number;
  y: number;
}

function RippleButton() {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const nextId = React.useRef(0);

  return (
    <button
      type="button"
      onMouseDown={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const id = nextId.current++;
        setRipples((current) => [
          ...current,
          { id, x: event.clientX - rect.left, y: event.clientY - rect.top },
        ]);
        setTimeout(() => setRipples((current) => current.filter((r) => r.id !== id)), 650);
      }}
      className="relative overflow-hidden rounded-(--noksha-radius-md) bg-(--noksha-accent-solid) px-4 py-2 font-medium text-(--noksha-accent-on-solid) text-sm"
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute size-4 animate-ping rounded-full bg-white/70"
          style={{ left: ripple.x - 8, top: ripple.y - 8 }}
        />
      ))}
      <span className="relative">Click me</span>
    </button>
  );
}

function HoldToConfirmButton() {
  const [holding, setHolding] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  function start() {
    if (confirmed) return;
    setHolding(true);
    timerRef.current = setTimeout(() => {
      setConfirmed(true);
      setHolding(false);
      setTimeout(() => setConfirmed(false), 1400);
    }, 800);
  }
  function cancel() {
    setHolding(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  return (
    <button
      type="button"
      onMouseDown={start}
      onMouseUp={cancel}
      onMouseLeave={cancel}
      onTouchStart={start}
      onTouchEnd={cancel}
      className="relative select-none overflow-hidden rounded-(--noksha-radius-md) border border-(--noksha-danger-solid) px-4 py-2 font-medium text-(--noksha-danger-fg) text-sm"
    >
      <span
        className={
          holding
            ? 'absolute inset-0 origin-left scale-x-100 bg-(--noksha-danger-solid) duration-[800ms] ease-linear'
            : 'absolute inset-0 origin-left scale-x-0 bg-(--noksha-danger-solid) duration-150 ease-linear'
        }
      />
      <span
        className={
          holding
            ? 'relative text-white transition-colors duration-200'
            : 'relative transition-colors duration-200'
        }
      >
        {confirmed ? 'Deleted ✓' : 'Hold to delete'}
      </span>
    </button>
  );
}

function MorphButton() {
  const [saved, setSaved] = React.useState(false);
  return (
    <Button
      type="button"
      variant="solid"
      tone={saved ? 'success' : 'accent'}
      icon={saved ? <CheckIcon /> : <SaveIcon />}
      onClick={() => {
        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
      }}
      className="w-24 justify-center transition-colors duration-300"
    >
      {saved ? 'Saved' : 'Save'}
    </Button>
  );
}

const CONFETTI_COLORS = [
  'var(--noksha-accent-solid)',
  'var(--noksha-danger-solid)',
  'var(--noksha-success-solid)',
  'var(--noksha-warning-solid)',
];

function ConfettiButton() {
  const [burstId, setBurstId] = React.useState(0);
  const [bursting, setBursting] = React.useState(false);

  function pop() {
    setBurstId((id) => id + 1);
    setBursting(true);
    setTimeout(() => setBursting(false), 600);
  }

  return (
    <span className="relative inline-flex">
      <Button type="button" variant="soft" tone="accent" icon={<HeartIcon />} onClick={pop}>
        Like
      </Button>
      {bursting
        ? Array.from({ length: 8 }, (_, i) => i).map((i) => {
            const angle = (i / 8) * Math.PI * 2;
            return (
              <span
                key={`${burstId}-${i}`}
                className="pointer-events-none absolute top-1/2 left-1/2 size-1.5 animate-ping rounded-full"
                style={{
                  backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                  transform: `translate(${Math.cos(angle) * 24}px, ${Math.sin(angle) * 24}px)`,
                }}
              />
            );
          })
        : null}
    </span>
  );
}

function ProgressButton() {
  const [progress, setProgress] = React.useState(0);
  const [running, setRunning] = React.useState(false);

  function start() {
    if (running) return;
    setRunning(true);
    setProgress(0);
  }

  React.useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setProgress((value) => {
        const next = Math.min(100, value + 10);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setRunning(false), 400);
        }
        return next;
      });
    }, 150);
    return () => clearInterval(timer);
  }, [running]);

  return (
    <button
      type="button"
      onClick={start}
      className="relative w-32 overflow-hidden rounded-(--noksha-radius-md) border border-(--noksha-border-default) px-4 py-2 font-medium text-(--noksha-fg-default) text-sm"
    >
      <span
        className="absolute inset-y-0 left-0 bg-(--noksha-accent-subtle) transition-[width] duration-150 ease-linear"
        style={{ width: `${progress}%` }}
      />
      <span className="relative">{running ? `Uploading ${progress}%` : 'Upload'}</span>
    </button>
  );
}

export default function ButtonBoldStyles() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DemoTile label="Neon glow" className="items-center">
        <button
          type="button"
          className="rounded-(--noksha-radius-md) border border-(--noksha-accent-solid) bg-(--noksha-bg-inverse) px-4 py-2 font-medium text-(--noksha-fg-inverse) text-sm transition-shadow duration-200 hover:shadow-[0_0_16px_-1px_var(--noksha-accent-solid)]"
        >
          Neon
        </button>
      </DemoTile>

      <DemoTile label="Shimmer sweep" className="items-center">
        <button
          type="button"
          className="relative isolate overflow-hidden rounded-(--noksha-radius-md) bg-(--noksha-accent-solid) px-4 py-2 font-medium text-(--noksha-accent-on-solid) text-sm before:absolute before:inset-y-0 before:-left-1/2 before:z-10 before:w-1/3 before:-skew-x-12 before:bg-white/40 before:transition-transform before:duration-700 hover:before:translate-x-[400%]"
        >
          Hover me
        </button>
      </DemoTile>

      <DemoTile label="Glass" className="items-center">
        <div className="rounded-(--noksha-radius-lg) bg-[linear-gradient(135deg,var(--noksha-accent-solid),var(--noksha-info-solid))] p-3">
          <button
            type="button"
            className="rounded-(--noksha-radius-md) border border-white/30 bg-white/10 px-4 py-2 font-medium text-sm text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            Glass
          </button>
        </div>
      </DemoTile>

      <DemoTile label="Neumorphic" className="items-center">
        <button
          type="button"
          className="rounded-(--noksha-radius-lg) bg-neutral-200 px-4 py-2 font-medium text-neutral-700 text-sm shadow-[5px_5px_10px_rgba(0,0,0,0.18),-5px_-5px_10px_rgba(255,255,255,0.85)] transition-shadow active:shadow-[inset_3px_3px_7px_rgba(0,0,0,0.18),inset_-3px_-3px_7px_rgba(255,255,255,0.85)]"
        >
          Soft UI
        </button>
      </DemoTile>

      <DemoTile label="Gradient ring" className="items-center">
        <span
          className="inline-flex rounded-(--noksha-radius-md) p-[2px]"
          style={{
            background:
              'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-danger-solid))',
          }}
        >
          <button
            type="button"
            className="rounded-[calc(var(--noksha-radius-md)-2px)] bg-(--noksha-bg-surface) px-4 py-2 font-medium text-(--noksha-fg-default) text-sm"
          >
            Ringed
          </button>
        </span>
      </DemoTile>

      <DemoTile label="Color swap" className="items-center">
        <button
          type="button"
          className="rounded-(--noksha-radius-md) bg-(--noksha-accent-subtle) px-4 py-2 font-medium text-(--noksha-accent-fg) text-sm transition-colors duration-300 hover:bg-(--noksha-accent-solid) hover:text-(--noksha-accent-on-solid)"
        >
          Hover me
        </button>
      </DemoTile>

      <DemoTile label="Ripple" className="items-center">
        <RippleButton />
      </DemoTile>

      <DemoTile label="Magnetic arrow" className="items-center">
        <Button
          type="button"
          variant="outline"
          tone="neutral"
          className="group"
          trailingIcon={<ArrowRightIcon />}
        >
          Continue
        </Button>
      </DemoTile>

      <DemoTile label="Underline draw" className="items-center">
        <button
          type="button"
          className="group relative py-1 font-medium text-(--noksha-accent-fg) text-sm"
        >
          Learn more
          <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-(--noksha-accent-solid) transition-transform duration-300 group-hover:scale-x-100" />
        </button>
      </DemoTile>

      <DemoTile label="Spin on hover" className="items-center">
        <Button type="button" variant="soft" tone="info" className="group" icon={<RefreshIcon />}>
          Refresh
        </Button>
      </DemoTile>

      <DemoTile label="Glossy" className="items-center">
        <button
          type="button"
          className="relative overflow-hidden rounded-(--noksha-radius-md) bg-(--noksha-accent-solid) px-4 py-2 font-medium text-(--noksha-accent-on-solid) text-sm shadow-(--noksha-shadow-sm) before:absolute before:inset-x-0 before:top-0 before:h-1/2 before:rounded-t-(--noksha-radius-md) before:bg-white/25"
        >
          Glossy
        </button>
      </DemoTile>

      <DemoTile label="Split" className="items-center">
        <div className="inline-flex overflow-hidden rounded-(--noksha-radius-md) border border-(--noksha-border-default)">
          <button
            type="button"
            className="bg-(--noksha-bg-surface) px-4 py-2 font-medium text-(--noksha-fg-default) text-sm hover:bg-(--noksha-bg-subtle)"
          >
            Deploy
          </button>
          <button
            type="button"
            aria-label="More options"
            className="flex items-center border-(--noksha-border-default) border-s bg-(--noksha-bg-surface) px-2.5 text-(--noksha-fg-muted) hover:bg-(--noksha-bg-subtle) [&_svg]:size-4"
          >
            <ChevronDownIcon />
          </button>
        </div>
      </DemoTile>

      <DemoTile label="Notification" className="items-center">
        <span className="relative inline-flex">
          <Button
            type="button"
            variant="outline"
            tone="neutral"
            iconOnly
            icon={<BellIcon />}
            aria-label="Notifications"
          />
          <span className="pointer-events-none absolute top-1 right-1 size-2 animate-ping rounded-full bg-(--noksha-danger-solid)" />
          <span className="pointer-events-none absolute top-1 right-1 size-2 rounded-full bg-(--noksha-danger-solid)" />
        </span>
      </DemoTile>

      <DemoTile label="Gradient text" className="items-center">
        <button
          type="button"
          className="group relative bg-[linear-gradient(135deg,var(--noksha-accent-solid),var(--noksha-danger-solid))] bg-clip-text px-1 py-2 font-semibold text-sm text-transparent"
        >
          Upgrade to Pro
          <span className="absolute inset-x-1 bottom-0.5 h-0.5 origin-left scale-x-0 bg-[linear-gradient(135deg,var(--noksha-accent-solid),var(--noksha-danger-solid))] transition-transform duration-300 group-hover:scale-x-100" />
        </button>
      </DemoTile>

      <DemoTile label="Hold to confirm" className="items-center">
        <HoldToConfirmButton />
      </DemoTile>

      <DemoTile label="Morph to check" className="items-center">
        <MorphButton />
      </DemoTile>

      <DemoTile label="Equalizer" className="items-center">
        <button
          type="button"
          className="flex items-center gap-2 rounded-(--noksha-radius-md) bg-(--noksha-bg-inverse) px-4 py-2 font-medium text-(--noksha-fg-inverse) text-sm"
        >
          <span className="flex h-3.5 items-end gap-0.5">
            <span
              className="h-2 w-1 animate-bounce rounded-full bg-(--noksha-accent-solid)"
              style={{ animationDelay: '0ms', animationDuration: '600ms' }}
            />
            <span
              className="h-3.5 w-1 animate-bounce rounded-full bg-(--noksha-accent-solid)"
              style={{ animationDelay: '200ms', animationDuration: '600ms' }}
            />
            <span
              className="h-1.5 w-1 animate-bounce rounded-full bg-(--noksha-accent-solid)"
              style={{ animationDelay: '400ms', animationDuration: '600ms' }}
            />
          </span>
          Now playing
        </button>
      </DemoTile>

      <DemoTile label="Sticker" className="items-center">
        <button
          type="button"
          className="rounded-(--noksha-radius-md) border-2 border-(--noksha-fg-default) bg-(--noksha-accent-solid) px-4 py-2 font-semibold text-(--noksha-accent-on-solid) text-sm shadow-[3px_3px_0_0_var(--noksha-fg-default)] transition-transform active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
        >
          Sticker
        </button>
      </DemoTile>

      <DemoTile label="Brutalist" className="items-center">
        <button
          type="button"
          className="rounded-none border-2 border-(--noksha-fg-default) bg-(--noksha-bg-surface) px-4 py-2 font-bold text-(--noksha-fg-default) text-sm uppercase tracking-wide hover:bg-(--noksha-fg-default) hover:text-(--noksha-bg-surface)"
        >
          Raw
        </button>
      </DemoTile>

      <DemoTile label="Bounce on hover" className="items-center">
        <button
          type="button"
          className="rounded-(--noksha-radius-md) bg-(--noksha-accent-solid) px-4 py-2 font-medium text-(--noksha-accent-on-solid) text-sm hover:animate-bounce"
        >
          Hey!
        </button>
      </DemoTile>

      <DemoTile label="Rotating border" className="items-center">
        <div className="relative inline-flex overflow-hidden rounded-(--noksha-radius-md) p-[2px]">
          <span
            className="absolute inset-[-60%] animate-spin"
            style={{
              animationDuration: '3s',
              background:
                'conic-gradient(from 0deg, var(--noksha-accent-solid), var(--noksha-info-solid), var(--noksha-danger-solid), var(--noksha-accent-solid))',
            }}
          />
          <button
            type="button"
            className="relative rounded-[calc(var(--noksha-radius-md)-2px)] bg-(--noksha-bg-surface) px-4 py-2 font-medium text-(--noksha-fg-default) text-sm"
          >
            Rotating
          </button>
        </div>
      </DemoTile>

      <DemoTile label="Sparkle badge" className="items-center">
        <Button
          type="button"
          variant="soft"
          tone="accent"
          className="relative"
          icon={<SparkleIcon />}
        >
          Ask AI
          <span className="absolute -top-1 -right-1 text-(--noksha-warning-solid) [&_svg]:size-3 [&_svg]:animate-pulse">
            <SparkleIcon />
          </span>
        </Button>
      </DemoTile>

      <DemoTile label="Loading shell" className="items-center">
        <Skeleton variant="shimmer" shape="pill" size="md" className="w-24" />
      </DemoTile>

      <DemoTile label="Copy link" className="items-center">
        <CopyButton
          value="https://noksha-ui.dev"
          withLabel
          label="Copy link"
          copiedLabel="Copied!"
          variant="soft"
          tone="success"
        />
      </DemoTile>

      <DemoTile label="Confetti" className="items-center">
        <ConfettiButton />
      </DemoTile>

      <DemoTile label="Progress" className="items-center">
        <ProgressButton />
      </DemoTile>

      <DemoTile label="3D flip" className="items-center">
        <button
          type="button"
          className="group flex items-center gap-2 rounded-(--noksha-radius-md) bg-(--noksha-accent-solid) px-4 py-2 font-medium text-(--noksha-accent-on-solid) text-sm [perspective:200px]"
        >
          <span className="inline-block transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(360deg)] [&_svg]:size-4">
            <RocketIcon />
          </span>
          Launch
        </button>
      </DemoTile>

      <DemoTile label="Floating action" className="items-center">
        <button
          type="button"
          aria-label="Compose"
          className="flex size-12 items-center justify-center rounded-full bg-(--noksha-accent-solid) text-(--noksha-accent-on-solid) shadow-(--noksha-shadow-md) transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-(--noksha-shadow-lg) [&_svg]:size-5"
        >
          <SparkleIcon />
        </button>
      </DemoTile>
    </div>
  );
}
