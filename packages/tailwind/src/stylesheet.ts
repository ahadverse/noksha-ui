import { type BuildThemeOptions, DEFAULT_BRAND, emitThemeCss } from '@noksha-ui/tokens';
import { emitTailwindTheme } from './theme.js';
import { emitToneLayer } from './tone.js';

const DEFAULT_BANNER = `/*!
 * Noksha UI — generated stylesheet. Do not edit.
 *
 * Usage (Tailwind v4):
 *   @import 'tailwindcss';
 *   @import '@noksha-ui/react/styles.css';
 */`;

/**
 * One enter/exit pair — `animate-noksha-in` and `animate-noksha-out` — for every
 * overlay in the library.
 *
 * The direction and the scale are read from variables rather than baked in, so
 * a tooltip that flipped from `top` to `bottom` animates the right way with a
 * single class and no per-side keyframes. Components set `--noksha-enter-y` and
 * friends from their resolved `data-side`.
 *
 * Because both durations come from the motion scale, `prefers-reduced-motion`
 * zeroes them from the token layer — and `usePresence` sees a zero-length
 * animation and unmounts immediately instead of waiting on an event that will
 * never arrive.
 */
const MOTION = `@keyframes noksha-in {
  from {
    opacity: 0;
    transform: translate3d(var(--noksha-enter-x, 0), var(--noksha-enter-y, 0), 0)
      scale(var(--noksha-enter-scale, 1));
  }
}

@keyframes noksha-out {
  to {
    opacity: 0;
    transform: translate3d(var(--noksha-exit-x, 0), var(--noksha-exit-y, 0), 0)
      scale(var(--noksha-exit-scale, 1));
  }
}

/* Collapse animates \`grid-template-rows\` between 0fr and 1fr, which resolves to
   the content's own height — so nothing has to be measured in JavaScript, and
   the animation stays correct when the content reflows or an image loads. The
   inner wrapper owns \`overflow: hidden\`, which is what makes the 0fr row clip. */
@keyframes noksha-collapse-in {
  from { grid-template-rows: 0fr; opacity: 0; }
  to { grid-template-rows: 1fr; opacity: 1; }
}

@keyframes noksha-collapse-out {
  from { grid-template-rows: 1fr; opacity: 1; }
  to { grid-template-rows: 0fr; opacity: 0; }
}

/* The attention halo behind Button's \`effect="pulse"\`. It is the only button
   effect that needs a keyframe — the rest are hover transitions, which reverse
   on their own when the pointer leaves and cost nothing while idle. It is drawn
   on a pseudo-element, so the button's own box, and therefore its hit area,
   never moves. */
@keyframes noksha-pulse {
  0% { opacity: 0.55; transform: scale(1); }
  70% { opacity: 0; transform: scale(1.14); }
  100% { opacity: 0; transform: scale(1.14); }
}

/* Spinner's eighteen designs are built from these eight loops rather than from a
   keyframe each: geometry and \`animation-delay\` are what separate the dot ring
   from the spoke ring, not a second copy of the same fade. All of them read
   their duration from \`--noksha-spinner-duration\`, the one knob the component
   turns down — never off — under prefers-reduced-motion. */
@keyframes noksha-spinner-spin {
  to { transform: rotate(360deg); }
}

@keyframes noksha-spinner-dash {
  0%   { stroke-dasharray: 1 60; stroke-dashoffset: 0; }
  50%  { stroke-dasharray: 42 60; stroke-dashoffset: -14; }
  100% { stroke-dasharray: 42 60; stroke-dashoffset: -56; }
}

@keyframes noksha-spinner-fade {
  0%, 100% { opacity: 0.15; }
  40%      { opacity: 1; }
}

@keyframes noksha-spinner-bounce {
  0%, 100% { transform: translateY(35%); }
  50%      { transform: translateY(-35%); }
}

@keyframes noksha-spinner-beat {
  0%, 100% { transform: scale(0.4); opacity: 0.35; }
  50%      { transform: scale(1); opacity: 1; }
}

@keyframes noksha-spinner-stretch {
  0%, 100% { transform: scaleY(0.35); }
  50%      { transform: scaleY(1); }
}

@keyframes noksha-spinner-ripple {
  0%   { transform: scale(0); opacity: 0; }
  15%  { opacity: 0.85; }
  100% { transform: scale(1); opacity: 0; }
}

@keyframes noksha-spinner-flip {
  0%   { transform: rotateY(0) rotateX(0); }
  50%  { transform: rotateY(180deg) rotateX(0); }
  100% { transform: rotateY(180deg) rotateX(180deg); }
}

/* Registered as animations rather than as bespoke utilities, so the class is
   \`animate-noksha-in\` on Tailwind v4 and on the v3 preset alike. */
@theme {
  --animate-noksha-in: noksha-in var(--noksha-duration-normal) var(--noksha-ease-out);
  --animate-noksha-out: noksha-out var(--noksha-duration-fast) var(--noksha-ease-in) forwards;
  --animate-noksha-collapse-in: noksha-collapse-in var(--noksha-duration-normal) var(--noksha-ease-out);
  --animate-noksha-collapse-out: noksha-collapse-out var(--noksha-duration-fast) var(--noksha-ease-in) forwards;
  /* Long and slow on purpose: this one loops, and anything quicker reads as an
     error state rather than as an invitation. */
  --animate-noksha-pulse: noksha-pulse 1.8s var(--noksha-ease-out) infinite;

  /* Durations are literal on purpose. These tokens are emitted on :root, and a
     var() nested inside a custom property is substituted where that property is
     computed — so reading --noksha-spinner-duration here would resolve against
     :root and ignore whatever the spinner set on itself. Spinner overrides
     animation-duration as a real property instead, which does resolve per
     element. */
  --animate-noksha-spinner-spin: noksha-spinner-spin 700ms linear infinite;
  --animate-noksha-spinner-dash: noksha-spinner-dash 1.5s var(--noksha-ease-in-out) infinite;
  --animate-noksha-spinner-fade: noksha-spinner-fade 1.2s linear infinite;
  --animate-noksha-spinner-bounce: noksha-spinner-bounce 1s var(--noksha-ease-in-out) infinite;
  --animate-noksha-spinner-beat: noksha-spinner-beat 1.2s var(--noksha-ease-in-out) infinite;
  --animate-noksha-spinner-stretch: noksha-spinner-stretch 1.1s var(--noksha-ease-in-out) infinite;
  --animate-noksha-spinner-ripple: noksha-spinner-ripple 1.4s var(--noksha-ease-out) infinite;
  --animate-noksha-spinner-flip: noksha-spinner-flip 1.6s var(--noksha-ease-in-out) infinite;
}`;

const BASE = `@layer base {
  html {
    -webkit-text-size-adjust: 100%;
    font-family: var(--noksha-font-sans);
  }

  body {
    background-color: var(--noksha-bg-canvas);
    color: var(--noksha-fg-default);
    font-size: var(--noksha-text-md);
    line-height: var(--noksha-leading-normal);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Native controls, scrollbars and the browser canvas follow the theme.
     Scoped to the marker element, not to :root, so an app that puts the class
     on <body> or on a wrapper gets the right scrollbars too. */
  :root { color-scheme: light; }
  :root.dark, .dark, [data-theme='dark'] { color-scheme: dark; }
  :root.light, .light, [data-theme='light'] { color-scheme: light; }

  @media (prefers-color-scheme: dark) {
    :root:not(.light):not([data-theme='light']) { color-scheme: dark; }
  }

  ::selection {
    background-color: var(--noksha-accent-subtle);
    color: var(--noksha-accent-fg);
  }
}`;

export interface StylesheetOptions extends Partial<BuildThemeOptions> {
  /** Header comment. Defaults to the one on the published package stylesheet. */
  banner?: string;
  /**
   * Paths to register with Tailwind v4's class scanner.
   *
   * The published package passes `['./']` because Tailwind skips `node_modules`
   * and would otherwise generate none of the utilities the compiled components
   * use. A consumer who owns the source instead points this at their own
   * component directory.
   */
  sources?: string[];
}

/**
 * The complete Noksha stylesheet for one brand: tokens, the Tailwind theme
 * mapping, the animation keyframes, the tone rules and the base layer.
 *
 * Two callers share this, and the whole reason it is a function is that neither
 * may drift from the other: `@noksha-ui/react`'s build bakes it into
 * `dist/styles.css` for the package path, and `@noksha-ui/cli init` writes it
 * into the consumer's own tree for the ownership path. A brand seed is the only
 * thing that changes between them — everything after the token block is
 * expressed against semantic variables and is identical for every theme.
 */
export function emitStylesheet(options: StylesheetOptions = {}): string {
  const { banner = DEFAULT_BANNER, sources = [], brand = DEFAULT_BRAND, ...seeds } = options;

  const sourceDirectives = sources.map((path) => `@source "${path}";`).join('\n');

  return [
    banner,
    '',
    ...(sourceDirectives ? [sourceDirectives, ''] : []),
    emitThemeCss({ ...seeds, brand }),
    emitTailwindTheme(),
    '',
    MOTION,
    '',
    emitToneLayer(),
    '',
    BASE,
    '',
  ].join('\n');
}
