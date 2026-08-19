import type { Demo } from '@/lib/demos';

import SpinnerBasic from './basic';
import SpinnerDesigns from './designs';
import SpinnerInline from './inline';
import SpinnerSpeeds from './speed';

export const spinnerDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Sizes and colour',
    description:
      'It has no tone prop — the spinner inherits `currentColor`, so it matches whatever it sits inside. Every colour below is a text utility rather than a spinner setting: five tones across the four steps of each ramp meant for foreground use, plus the four neutral foreground steps. The three solid steps of a ramp are meant to sit close together — they are interaction states of one colour, not four different ones; the token system exposes five hues in total.',
    Component: SpinnerBasic,
    minHeight: 460,
    stack: true,
  },
  {
    id: 'designs',
    title: 'Eighteen designs',
    description:
      'One `variant` prop, eighteen looks, and nothing else changes with it: every design takes the same sizes, inherits the same `currentColor`, carries the same label, and slows rather than freezes under reduced motion. They are composed from eight shared keyframes — geometry and `animation-delay` are what separate the dot ring from the spoke ring.',
    Component: SpinnerDesigns,
    minHeight: 560,
    stack: true,
  },
  {
    id: 'speed',
    title: 'Speed',
    description:
      '`speed` scales each design’s own tempo rather than replacing it, so a bounce stays slower than a ring at every setting. It multiplies `--noksha-spinner-duration`, which you can also set directly for a value between the three.',
    Component: SpinnerSpeeds,
    minHeight: 280,
    stack: true,
  },
  {
    id: 'inline',
    title: 'In context',
    description:
      'The spinner is sized off the control scale, so it drops into a button, a field or a line of text without measuring anything.',
    Component: SpinnerInline,
    minHeight: 200,
    stack: true,
  },
];
