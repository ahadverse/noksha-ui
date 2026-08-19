import type { Demo } from '@/lib/demos';

import SpinnerBasic from './basic';
import SpinnerDesigns from './designs';
import SpinnerIcons from './icons';
import SpinnerInline from './inline';
import SpinnerSpeeds from './speed';
import SpinnerText from './text';

export const spinnerDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Sizes and colour',
    description:
      'It has no tone prop — the spinner inherits `currentColor`, so it matches whatever it sits inside. Nothing below is a spinner setting: the first group is the five hues the token system exposes plus three neutral foreground steps, and the second is plain CSS colours set straight on the element. Any colour reaches it, token or not.',
    Component: SpinnerBasic,
    minHeight: 380,
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
    id: 'text',
    title: 'Loading with text',
    description:
      'Give the spinner children and it becomes a labelled group instead of a bare mark: `placement` puts the text before, after, above or below it, and the text is what a screen reader reads out — the group is the live region, so no hidden `label` competes with the sentence on screen. `label={null}` drops the live region and leaves the text as ordinary prose, which is what you want inside something that already announces itself.',
    Component: SpinnerText,
    minHeight: 300,
    stack: true,
  },
  {
    id: 'icons',
    title: 'Your own icon',
    description:
      '`icon` swaps the drawing for any element you pass — a Lucide or react-icons component, or the eight hand-written SVGs below — and the component keeps the tedious half: `size` scales it, `speed` paces it, reduced motion slows it instead of freezing it, and the label contract is unchanged. A custom mark turns once a second and `variant` no longer applies, since the variant is the drawing it replaced.',
    Component: SpinnerIcons,
    minHeight: 420,
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
