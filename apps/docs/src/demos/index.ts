import type { Demo } from '@/lib/demos';

import { accordionDemos } from './accordion';
import { alertDemos } from './alert';
import { avatarDemos } from './avatar';
import { badgeDemos } from './badge';
import { buttonDemos } from './button';
import { cardDemos } from './card';
import { checkboxDemos } from './checkbox';
import { dialogDemos } from './dialog';
import { drawerDemos } from './drawer';
import { fieldDemos } from './field';
import { inputDemos } from './input';
import { popoverDemos } from './popover';
import { radioDemos } from './radio';
import { selectDemos } from './select';
import { separatorDemos } from './separator';
import { skeletonDemos } from './skeleton';
import { sliderDemos } from './slider';
import { spinnerDemos } from './spinner';
import { switchDemos } from './switch';
import { tabsDemos } from './tabs';
import { textareaDemos } from './textarea';
import { toastDemos } from './toast';
import { tooltipDemos } from './tooltip';

/**
 * Every example on the site, keyed by the component it documents.
 *
 * The imports are static and written out because they must be: a page needs the
 * demo bundled, and a bundler cannot follow a path built from a route
 * parameter. The registry is what the pages read; the file tree beside it is
 * what the code panels read.
 */
export const DEMOS: Record<string, Demo[]> = {
  accordion: accordionDemos,
  alert: alertDemos,
  avatar: avatarDemos,
  badge: badgeDemos,
  button: buttonDemos,
  card: cardDemos,
  checkbox: checkboxDemos,
  dialog: dialogDemos,
  drawer: drawerDemos,
  field: fieldDemos,
  input: inputDemos,
  popover: popoverDemos,
  radio: radioDemos,
  select: selectDemos,
  separator: separatorDemos,
  skeleton: skeletonDemos,
  slider: sliderDemos,
  spinner: spinnerDemos,
  switch: switchDemos,
  tabs: tabsDemos,
  textarea: textareaDemos,
  toast: toastDemos,
  tooltip: tooltipDemos,
};

export function getDemos(component: string): Demo[] {
  return DEMOS[component] ?? [];
}

/** The one shown on the components index and at the top of a component page. */
export function getHeroDemo(component: string): Demo | undefined {
  return getDemos(component)[0];
}
