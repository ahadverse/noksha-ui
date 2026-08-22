import type { Demo } from '@/lib/demos';

import FieldColor from './color';
import FieldCurrency from './currency';
import FieldDate from './date';
import FieldFile from './file';
import FieldNumber from './number';
import FieldPercent from './percent';
import FieldSearch from './search';
import FieldTel from './tel';
import FieldTime from './time';
import FieldUrl from './url';
import FieldVerify from './verify';

export const fieldDemos: Demo[] = [
  {
    id: 'number',
    title: 'Number',
    description:
      'Seven takes on the same stepper, all the same compact size: a pill, a card, a bare chip pair, a solid bar, stacked chevrons, plain text buttons, and dashed outlines.',
    Component: FieldNumber,
    minHeight: 140,
    stack: true,
  },
  {
    id: 'percent',
    title: 'Percentage',
    description: 'The number field and the range input underneath share one value — drag either, both move.',
    Component: FieldPercent,
    minHeight: 160,
  },
  {
    id: 'tel',
    title: 'Phone',
    description:
      'Two takes on the same field: plain digit formatting, then a calling-code dropdown stacked underneath.',
    Component: FieldTel,
    minHeight: 260,
    stack: true,
  },
  {
    id: 'verify',
    title: 'Verify',
    description:
      'Four channels, four designs: an attached send button, a two-step email with OTP boxes, a countdown ring around a call button, and a push notification with no input at all.',
    Component: FieldVerify,
    minHeight: 140,
    stack: true,
  },
  {
    id: 'url',
    title: 'URL',
    description:
      'Seven takes on a link: hostname parsing, a subdomain slug, a fixed https:// chip, a live preview card, a Go button that fetches the real favicon, a paste-from-clipboard button, and a deterministic short code.',
    Component: FieldUrl,
    minHeight: 140,
    stack: true,
  },
  {
    id: 'search',
    title: 'Search',
    description:
      'Twenty takes on searching a fixed list — the practical, the bold (frosted glass, a gradient ring, neon, a dark spotlight), and the animated (a typewriter placeholder, a pulsing ring, a sliding underline, shimmering Skeleton rows, a staggered reveal).',
    Component: FieldSearch,
    minHeight: 220,
    stack: true,
  },
  {
    id: 'date',
    title: 'Date',
    description:
      'Eight fully custom calendar popovers sharing one hook for positioning, focus-trapping and keyboard nav — a plain one, gradient, glass, neon, a boarding-pass tile, borderless minimal, a radial progress ring, and a countdown that leads with days remaining.',
    Component: FieldDate,
    minHeight: 160,
    stack: true,
  },
  {
    id: 'time',
    title: 'Time',
    description:
      'Eight takes on picking a time: a validated native input, a gradient ring, frosted glass, neon, a dark LCD tile with its own steppers, a 12-hour field with an AM/PM toggle, a small analogue dial beside an input, and a large dial that is the whole field.',
    Component: FieldTime,
    minHeight: 180,
    stack: true,
  },
  {
    id: 'color',
    title: 'Color',
    description:
      'Six takes on picking a color: a live WCAG AA ratio, brand-preset swatches, a typed hex value synced to a hidden picker, a card that fades into the color itself, real "Aa" text sitting on the swatch, and a circular swatch with a pass/fail badge.',
    Component: FieldColor,
    minHeight: 160,
    stack: true,
  },
  {
    id: 'file',
    title: 'File',
    description:
      'Thirteen takes on picking a file — real drag-and-drop throughout, several with live thumbnail previews: a plain input, a custom-Button trigger, gradient, glass and neon dropzones, a drop-zone-that-becomes-a-thumbnail, a multi-file gallery, an always-visible camera badge on the avatar, and an upload ring around it.',
    Component: FieldFile,
    minHeight: 160,
    stack: true,
  },
  {
    id: 'currency',
    title: 'Currency',
    description:
      'Six takes on money: grouped digits, an oversized price tag with quick-adjust chips, a currency-code Select with a live symbol, a gradient card that doubles as a spend progress bar, a dark ticker readout, and an input linked to a slider.',
    Component: FieldCurrency,
    minHeight: 120,
    stack: true,
  },
];
