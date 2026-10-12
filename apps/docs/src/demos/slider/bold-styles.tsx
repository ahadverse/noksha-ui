'use client';

import { Slider } from '@noksha-ui/react';
import { DemoTile } from '@/components/demo-tile';

const GLASS =
  '[--sl-track:0.625rem] [--sl-rail:rgb(255_255_255/0.22)] [--sl-fill-image:linear-gradient(rgb(255_255_255/0.92),rgb(255_255_255/0.92))] [--sl-track-shadow:inset_0_0_0_1px_rgb(255_255_255/0.3)] [--sl-thumb:1.375rem] [--sl-thumb-bg:rgb(255_255_255/0.35)] [--sl-thumb-border:rgb(255_255_255/0.95)] [--sl-thumb-border-width:1.5px] [--sl-thumb-shadow:0_4px_14px_rgb(0_0_0/0.25)]';

const FADER =
  '[--sl-track:0.375rem] [--sl-rail:#050505] [--sl-track-shadow:inset_0_1px_3px_rgb(0_0_0/0.9),0_1px_0_rgb(255_255_255/0.08)] [--sl-fill-image:linear-gradient(to_top,#22c55e_55%,#facc15_78%,#ef4444_94%)] [--sl-thumb-w:0.875rem] [--sl-thumb-h:2.25rem] [--sl-thumb-radius:3px] [--sl-thumb-bg:#fafafa] [--sl-thumb-border:#0a0a0a] [--sl-thumb-border-width:1px] [--sl-thumb-shadow:inset_0_5px_0_#d4d4d4,inset_0_-5px_0_#a3a3a3,0_3px_8px_rgb(0_0_0/0.7)]';

const CHANNELS = [
  { name: 'Kick', level: 78 },
  { name: 'Snare', level: 64 },
  { name: 'Bass', level: 71 },
  { name: 'Keys', level: 46 },
  { name: 'Vox', level: 86 },
];

export default function SliderBoldStyles() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <DemoTile label="Neon glow">
        <div className="rounded-xl bg-[#05060a] px-5 py-7 ring-1 ring-white/10">
          <Slider
            aria-label="Neon glow"
            defaultValue={62}
            className="[--sl-solid:#22d3ee] [--sl-rail:rgb(34_211_238/0.14)] [--sl-track:0.25rem] [--sl-thumb-bg:#ecfeff] [--sl-thumb-border:#22d3ee] [--sl-thumb-shadow:0_0_0_4px_rgb(34_211_238/0.2),0_0_18px_4px_#22d3ee] [filter:drop-shadow(0_0_6px_rgb(34_211_238/0.75))]"
          />
        </div>
      </DemoTile>

      <DemoTile label="Gradient fill">
        <Slider
          aria-label="Gradient fill"
          defaultValue={70}
          size="lg"
          className="[--sl-fill-image:linear-gradient(90deg,#06b6d4,#8b5cf6,#ec4899)] [--sl-thumb-bg:#ffffff] [--sl-thumb-border:#8b5cf6] [--sl-thumb-border-width:3px] [--sl-thumb-shadow:0_2px_10px_rgb(139_92_246/0.45)]"
        />
      </DemoTile>

      <DemoTile label="Sunset thick">
        <Slider
          aria-label="Sunset thick"
          defaultValue={58}
          size="xl"
          thumb="pill"
          className="[--sl-track:1rem] [--sl-rail:rgb(249_115_22/0.14)] [--sl-fill-image:linear-gradient(90deg,#fde047,#fb923c,#f43f5e,#a21caf)] [--sl-thumb-bg:#fff7ed] [--sl-thumb-border:#f97316] [--sl-thumb-border-width:3px] [--sl-thumb-shadow:0_4px_14px_rgb(244_63_94/0.4)]"
        />
      </DemoTile>

      <DemoTile label="iOS chunky">
        <div className="relative">
          <Slider
            aria-label="Brightness"
            defaultValue={45}
            className="[--sl-track:2.25rem] [--sl-thumb:2.25rem] [--sl-thumb-bg:var(--sl-solid)] [--sl-thumb-border-width:0px] [--sl-thumb-shadow:none] [&::-moz-range-thumb]:hover:scale-100 [&::-webkit-slider-thumb]:hover:scale-100"
          />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-white"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </div>
      </DemoTile>

      <DemoTile label="Glass">
        <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#4f46e5,#c026d3_55%,#f97316)] p-5">
          <span
            aria-hidden="true"
            className="absolute -top-6 -left-4 size-24 rounded-full bg-cyan-300/70 blur-2xl"
          />
          <div className="relative flex flex-col gap-5 rounded-xl border border-white/30 bg-white/10 p-4 shadow-[0_8px_30px_rgb(0_0_0/0.18)] backdrop-blur-md">
            <Slider aria-label="Ambient light" defaultValue={68} className={GLASS} />
            <Slider aria-label="Glow" defaultValue={34} className={GLASS} />
          </div>
        </div>
      </DemoTile>

      <DemoTile label="Hairline">
        <Slider
          aria-label="Hairline"
          defaultValue={35}
          className="[--sl-track:1px] [--sl-thumb:0.75rem] [--sl-solid:var(--noksha-fg-default)] [--sl-rail:var(--noksha-border-default)] [--sl-thumb-bg:var(--noksha-fg-default)] [--sl-thumb-border-width:0px] [--sl-thumb-shadow:0_0_0_5px_var(--noksha-bg-surface)]"
        />
      </DemoTile>

      <DemoTile label="Inverse slab">
        <Slider
          aria-label="Inverse slab"
          defaultValue={52}
          className="[--sl-track:1.5rem] [--sl-track-radius:0.5rem] [--sl-rail:var(--noksha-bg-inverse)] [--sl-track-shadow:inset_0_0_0_3px_var(--noksha-bg-inverse)] [--sl-thumb-w:0.25rem] [--sl-thumb-h:0.875rem] [--sl-thumb-radius:9999px] [--sl-thumb-bg:var(--noksha-fg-inverse)] [--sl-thumb-border-width:0px] [--sl-thumb-shadow:none]"
        />
      </DemoTile>

      <DemoTile label="Square brutalist">
        <div className="border-2 border-black bg-[#fde047] px-5 py-6 shadow-[6px_6px_0_0_#000]">
          <Slider
            aria-label="Square brutalist"
            defaultValue={40}
            thumb="square"
            className="[--sl-track:0.875rem] [--sl-track-radius:0px] [--sl-rail:#ffffff] [--sl-solid:#ff5c8a] [--sl-track-shadow:inset_0_0_0_2px_#000] [--sl-thumb:1.75rem] [--sl-thumb-radius:0px] [--sl-thumb-bg:#ffffff] [--sl-thumb-border:#000] [--sl-thumb-border-width:2px] [--sl-thumb-shadow:4px_4px_0_0_#000] active:[--sl-thumb-shadow:1px_1px_0_0_#000]"
          />
        </div>
      </DemoTile>

      <DemoTile label="Outline ring">
        <Slider
          aria-label="Outline ring"
          defaultValue={55}
          variant="outline"
          tone="info"
          size="lg"
          className="[--sl-thumb:1.5rem] [--sl-thumb-bg:transparent] [--sl-thumb-border-width:3px] [--sl-thumb-shadow:0_0_0_4px_var(--sl-subtle)]"
        />
      </DemoTile>

      <DemoTile label="Pill thumb, soft">
        <Slider
          aria-label="Pill thumb, soft"
          defaultValue={48}
          variant="soft"
          thumb="pill"
          size="lg"
          tone="success"
          tooltip
          formatValue={(value) => `${value}%`}
        />
      </DemoTile>

      <DemoTile label="Striped fill">
        <Slider
          aria-label="Striped fill"
          defaultValue={66}
          tone="warning"
          size="lg"
          className="[--sl-track:0.75rem] [--sl-fill-image:repeating-linear-gradient(-45deg,var(--sl-solid)_0_6px,color-mix(in_oklab,var(--sl-solid)_50%,var(--noksha-bg-surface))_6px_12px)]"
        />
      </DemoTile>

      <DemoTile label="Segmented rail">
        <Slider
          aria-label="Segmented rail"
          defaultValue={70}
          thumb="bar"
          className="[--sl-track:0.625rem] [--sl-track-radius:2px] [--sl-rail:transparent] [--sl-fill-image:repeating-linear-gradient(90deg,var(--noksha-bg-surface)_0_1.5px,transparent_1.5px_calc(10%-1.5px),var(--noksha-bg-surface)_calc(10%-1.5px)_10%),linear-gradient(90deg,transparent_var(--sl-fill),var(--noksha-bg-muted)_var(--sl-fill)),linear-gradient(90deg,#22c55e,#eab308_65%,#ef4444)] [--sl-thumb-bg:var(--noksha-fg-default)] [--sl-thumb-border-width:0px]"
        />
      </DemoTile>

      <DemoTile label="Retro pixel">
        <div className="flex items-center gap-4 bg-[#5c94fc] px-5 py-6 shadow-[inset_0_-8px_0_#c84c0c]">
          <span className="font-black font-mono text-sm text-white [text-shadow:2px_2px_0_#000]">
            HP
          </span>
          <Slider
            aria-label="Hit points"
            defaultValue={70}
            step={10}
            thumb="square"
            className="min-w-0 flex-1 [--sl-track:0.75rem] [--sl-track-radius:0px] [--sl-rail:#3f3f46] [--sl-fill-image:linear-gradient(#86efac_0_3px,#22c55e_3px)] [--sl-track-shadow:0_-3px_0_#000,0_3px_0_#000,-3px_0_0_#000,3px_0_0_#000] [--sl-thumb:1.25rem] [--sl-thumb-radius:0px] [--sl-thumb-bg:#facc15] [--sl-thumb-border-width:0px] [--sl-thumb-shadow:inset_-3px_-3px_0_#ca8a04,0_-3px_0_#000,0_3px_0_#000,-3px_0_0_#000,3px_0_0_#000]"
          />
        </div>
      </DemoTile>

      <DemoTile label="Candy pastel">
        <Slider
          aria-label="Candy pastel"
          defaultValue={75}
          size="lg"
          className="[--sl-track:0.75rem] [--sl-rail:rgb(244_114_182/0.18)] [--sl-fill-image:linear-gradient(90deg,#f9a8d4,#c4b5fd,#93c5fd,#86efac)] [--sl-thumb:1.5rem] [--sl-thumb-bg:#ffffff] [--sl-thumb-border:#f9a8d4] [--sl-thumb-border-width:5px] [--sl-thumb-shadow:0_4px_12px_rgb(244_114_182/0.35)]"
        />
      </DemoTile>

      <DemoTile label="Dotted rail">
        <Slider
          aria-label="Dotted rail"
          defaultValue={30}
          className="[--sl-rail:transparent] [--sl-fill-image:linear-gradient(90deg,var(--sl-solid)_var(--sl-fill),transparent_var(--sl-fill)),radial-gradient(circle,var(--noksha-border-strong)_0_1.5px,transparent_2px)_0_50%/9px_100%]"
        />
      </DemoTile>

      <DemoTile label="DAW faders">
        <div className="flex items-end justify-between gap-2 rounded-xl bg-[#111113] px-4 py-4 ring-1 ring-white/10">
          {CHANNELS.map((channel) => (
            <div key={channel.name} className="flex flex-col items-center gap-2">
              <div className="h-32 bg-[repeating-linear-gradient(to_bottom,rgb(255_255_255/0.12)_0_1px,transparent_1px_12px)]">
                <Slider
                  orientation="vertical"
                  aria-label={`${channel.name} fader`}
                  defaultValue={channel.level}
                  className={FADER}
                />
              </div>
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                {channel.name}
              </span>
            </div>
          ))}
        </div>
      </DemoTile>
    </div>
  );
}
