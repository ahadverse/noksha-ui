import type { Demo } from '@/lib/demos';

import SliderBasic from './basic';
import SliderBoldStyles from './bold-styles';
import SliderColorSliders from './color-sliders';
import SliderControlled from './controlled';
import SliderFeedback from './feedback';
import SliderFilters from './filters';
import SliderForms from './forms';
import SliderLoan from './loan';
import SliderMarks from './marks';
import SliderMediaControls from './media-controls';
import SliderMixer from './mixer';
import SliderPricing from './pricing';
import SliderRange from './range';
import SliderSettings from './settings';
import SliderSizes from './sizes';
import SliderStates from './states';
import SliderThumbs from './thumbs';
import SliderTones from './tones';
import SliderTooltip from './tooltip';
import SliderVariants from './variants';
import SliderVertical from './vertical';

export const sliderDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Value and steps',
    description:
      '`formatValue` shapes both the visible number and the one `aria-valuetext` announces, so the two cannot disagree.',
    Component: SliderBasic,
    minHeight: 280,
  },
  {
    id: 'variants',
    title: 'Variants',
    description:
      'All five `variant` values beside the same five in the `success` tone — `minimal` keeps the thumb hidden until hover or focus. Every tile copies on its own.',
    Component: SliderVariants,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description:
      '`size` from `xs` to `xl` with `showValue`, then the same scale paired with each `thumb` shape.',
    Component: SliderSizes,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'tones',
    title: 'Semantic tones',
    description:
      'Six `tone` values across the `default`, `solid` and `soft` variants — fill, thumb and soft rail all come from the tone tokens.',
    Component: SliderTones,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'thumbs',
    title: 'Thumb shapes',
    description:
      '`thumb` as circle, square, bar or pill across sizes and variants, then custom thumbs built from `--sl-thumb-w`, `--sl-thumb-bg` and `--sl-thumb-shadow` in `className`.',
    Component: SliderThumbs,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'marks',
    title: 'Marks',
    description:
      '`marks` as one tick per step, ticks at chosen values, or `{ value, label }` stops — with `tooltip`, `showValue` and on a `RangeSlider`.',
    Component: SliderMarks,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'tooltip',
    title: 'Tooltips',
    description:
      '`tooltip` on hover, focus and drag, or pinned with `"always"`; `formatValue` turns the bubble into currency, a percentage, m:ss or °C and announces the same text.',
    Component: SliderTooltip,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'vertical',
    title: 'Vertical',
    description:
      '`orientation="vertical"` fills its parent’s height — an equalizer, a fader with `showValue`, labelled marks, a pinned tooltip and a track-only bar.',
    Component: SliderVertical,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'range',
    title: 'Range slider',
    description:
      'Two native range inputs over one track — `minStepsBetween` keeps them apart, `formatValue` shapes the label, tooltip and `aria-valuetext`, and `thumbLabels` names each thumb.',
    Component: SliderRange,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'bold-styles',
    title: 'Bold styles',
    description:
      'Sixteen looks built only from `className` and the `--sl-*` variables — neon, glass, iOS chunky, brutalist, striped, segmented and more, with no fork of the component. Copy any tile on its own.',
    Component: SliderBoldStyles,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'media-controls',
    title: 'Media controls',
    description:
      'A player card: a `minimal` scrubber with an m:ss tooltip and buffered fill, a volume slider whose icon follows the level, playback speed on marks, and stepper buttons for zoom.',
    Component: SliderMediaControls,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'color-sliders',
    title: 'Colour sliders',
    description:
      'Hue, saturation, lightness and alpha — a transparent `--sl-rail` lets each `--sl-fill-image` gradient show across the whole track, recomputed from the current colour.',
    Component: SliderColorSliders,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'feedback',
    title: 'Expressive scales',
    description:
      'Satisfaction with a face that changes and a tone that follows, a thermostat on a cold-to-hot gradient, a spice level and a 0–10 effort scale with labelled marks.',
    Component: SliderFeedback,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'states',
    title: 'States',
    description:
      '`disabled` and `invalid` on `Slider` and `RangeSlider`, plus `FieldRoot` wiring the label, description, required marker and error text.',
    Component: SliderStates,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'controlled',
    title: 'Controlled patterns',
    description:
      'A number input with clamping, preset buttons, a reset, two sliders on one value, editable range bounds and an `onValueChange` log.',
    Component: SliderControlled,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'forms',
    title: 'Forms',
    description:
      '`name` posts the raw number, a range posts two values under one name, disabled controls drop out, and a threshold check drives `FieldRoot invalid`.',
    Component: SliderForms,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'filters',
    title: 'Product filters',
    description:
      'A real filter panel — a price histogram over a range, a marked rating floor and a distance tooltip, all feeding one live result count.',
    Component: SliderFilters,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'pricing',
    title: 'Pricing calculator',
    description:
      'Seats, storage and billing period feed one live total — the storage slider walks an index so its labelled marks sit on a non-linear 10 GB to 1 TB scale.',
    Component: SliderPricing,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'mixer',
    title: 'Mixer console',
    description:
      'Vertical faders with `bar` thumbs and dB readouts — mute disables a channel, solo repaints the rest, and the master’s segmented `--sl-fill-image` turns `danger` past 0 dB.',
    Component: SliderMixer,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'settings',
    title: 'Reading settings',
    description:
      'Four sliders writing straight into a live preview’s inline style — labelled marks on font size, `formatValue` on line height and tracking, and a contrast warning below 60%.',
    Component: SliderSettings,
    minHeight: 400,
    wide: true,
  },
  {
    id: 'loan',
    title: 'Loan calculator',
    description:
      'Amount, term and rate drive an amortised monthly payment and a principal-versus-interest bar, with the rate slider’s `tone` tracking how expensive the loan is getting.',
    Component: SliderLoan,
    minHeight: 420,
    wide: true,
  },
];
