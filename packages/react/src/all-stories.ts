import { accordionStories } from './components/accordion/accordion.stories.js';
import { alertStories } from './components/alert/alert.stories.js';
import { avatarStories } from './components/avatar/avatar.stories.js';
import { badgeStories } from './components/badge/badge.stories.js';
import { buttonStories } from './components/button/button.stories.js';
import { cardStories } from './components/card/card.stories.js';
import { checkboxStories } from './components/checkbox/checkbox.stories.js';
import { dialogStories } from './components/dialog/dialog.stories.js';
import { drawerStories } from './components/drawer/drawer.stories.js';
import { fieldStories } from './components/field/field.stories.js';
import { inputStories } from './components/input/input.stories.js';
import { popoverStories } from './components/popover/popover.stories.js';
import { radioStories } from './components/radio/radio.stories.js';
import { selectStories } from './components/select/select.stories.js';
import { separatorStories } from './components/separator/separator.stories.js';
import { sliderStories } from './components/slider/slider.stories.js';
import { spinnerStories } from './components/spinner/spinner.stories.js';
import { switchStories } from './components/switch/switch.stories.js';
import { tabsStories } from './components/tabs/tabs.stories.js';
import { textareaStories } from './components/textarea/textarea.stories.js';
import { toastStories } from './components/toast/toast.stories.js';
import { tooltipStories } from './components/tooltip/tooltip.stories.js';
import type { StoryGroup } from './stories.js';

/**
 * Every component's states, in one array.
 *
 * The same list feeds the local preview builder, the docs site and the
 * Playwright visual-regression run, so a component's states are declared once
 * (ARCHITECTURE.md §8). Nothing here is part of a build entry, so none of it
 * ships to consumers.
 */
export const allStories: StoryGroup[] = [
  buttonStories,
  spinnerStories,
  badgeStories,
  avatarStories,
  cardStories,
  alertStories,
  separatorStories,
  fieldStories,
  inputStories,
  textareaStories,
  checkboxStories,
  radioStories,
  switchStories,
  sliderStories,
  selectStories,
  tooltipStories,
  popoverStories,
  dialogStories,
  drawerStories,
  toastStories,
  tabsStories,
  accordionStories,
];

export type { Story, StoryGroup } from './stories.js';
