import type { Demo } from '@/lib/demos';

import SwitchBasic from './basic';
import SwitchBoldStyles from './bold-styles';
import SwitchControlled from './controlled';
import SwitchDayNight from './day-night';
import SwitchDisabled from './disabled';
import SwitchIconToggles from './icon-toggles';
import SwitchInline from './inline';
import SwitchInstallProgress from './install-progress';
import SwitchInvalid from './invalid';
import SwitchList from './list';
import SwitchLoading from './loading';
import SwitchMenuToggle from './menu-toggle';
import SwitchPlaneMode from './plane-mode';
import SwitchSettingsPanel from './settings-panel';
import SwitchSizes from './sizes';
import SwitchTones from './tones';
import SwitchWithText from './with-text';

export const switchDemos: Demo[] = [
  {
    id: 'basic',
    title: 'Settings toggle',
    description:
      'Use a switch when the change takes effect immediately, and a checkbox when it is submitted with a form.',
    Component: SwitchBasic,
    minHeight: 240,
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description: 'Three sizes on the same control scale the rest of the library uses.',
    Component: SwitchSizes,
    minHeight: 120,
  },
  {
    id: 'tones',
    title: 'Tones',
    description:
      'The six semantic tones, each repointing the same `--sw-solid` variable the track fill is built from.',
    Component: SwitchTones,
    minHeight: 140,
  },
  {
    id: 'disabled',
    title: 'Disabled',
    description:
      'A disabled switch is still a real checkbox input — `:disabled` drives the dimmed track and the cursor together, not just the colour.',
    Component: SwitchDisabled,
    minHeight: 200,
  },
  {
    id: 'invalid',
    title: 'Invalid',
    description:
      'Field only marks the switch invalid after a first submit attempt, and `Field.Error` mounts nothing until then.',
    Component: SwitchInvalid,
    minHeight: 220,
  },
  {
    id: 'controlled',
    title: 'Controlled',
    description:
      '`checked` and `onCheckedChange` are the entire contract — the buttons below prove it by driving every switch from outside.',
    Component: SwitchControlled,
    minHeight: 260,
  },
  {
    id: 'with-text',
    title: 'With text',
    description:
      'A label and a line of helper text per switch, wired to the control through `Field.Description` rather than a hand-written `aria-describedby`.',
    Component: SwitchWithText,
    minHeight: 320,
  },
  {
    id: 'inline',
    title: 'Inline',
    description:
      'Compact, `sm`-sized switches sharing one horizontal row, for a quick-settings tray rather than a form.',
    Component: SwitchInline,
    minHeight: 100,
  },
  {
    id: 'list',
    title: 'Settings list',
    description:
      'The classic settings-page row — label on the left, switch on the right — built from `Field.Root` with `justify-between` rather than a bespoke layout.',
    Component: SwitchList,
    minHeight: 260,
  },
  {
    id: 'loading',
    title: 'Loading',
    description:
      'The switch disables itself while a change is in flight, and only commits once the request resolves — so the UI never shows a state the server rejected.',
    Component: SwitchLoading,
    minHeight: 220,
    stack: true,
  },
  {
    id: 'settings-panel',
    title: 'Settings panel',
    description:
      'A grouped, real-world settings screen — two sections of switches sharing one card, each wired the same way as the single examples above.',
    Component: SwitchSettingsPanel,
    minHeight: 420,
    stack: true,
  },
  {
    id: 'bold-styles',
    title: 'Bold styles',
    description:
      'Eleven looks built entirely from `className`, `containerClassName` and the `--sw-solid`/`--sw-w`/`--sw-h` variables — neon, glass, an oversized track, and more, with no fork of the component underneath any of them.',
    Component: SwitchBoldStyles,
    minHeight: 220,
  },
  {
    id: 'icon-toggles',
    title: 'Icon toggles',
    description:
      'A hidden checkbox behind a fully custom surface — a lock, a play button, a speaker, a power button, a bubble — each swapping icon or clip-path on `peer-checked`/`has-checked` rather than swapping the switch track.',
    Component: SwitchIconToggles,
    minHeight: 160,
  },
  {
    id: 'menu-toggle',
    title: 'Menu toggle',
    description:
      'The three-bar pattern behind most hamburger menus — the same hidden checkbox driving a track elsewhere in this page now morphs bars into an arrow.',
    Component: SwitchMenuToggle,
    minHeight: 160,
  },
  {
    id: 'day-night',
    title: 'Day / night',
    description:
      'Six takes on the same idea, from a sliding thumb that uncovers the sun or moon to a disc that rises over hills and an orb that just crossfades color and icon.',
    Component: SwitchDayNight,
    minHeight: 140,
  },
  {
    id: 'plane-mode',
    title: 'Airplane mode',
    description:
      'Five takes on the same setting: a plane taxiing into open sky, one pitching into takeoff, one that just cuts the signal bars, a window shade pulling down over the view, and a boarding pass with a plane sliding along its dashed flight path.',
    Component: SwitchPlaneMode,
    minHeight: 120,
  },
  {
    id: 'install-progress',
    title: 'Install progress',
    description:
      'Not a toggle at all — a three-phase button (idle, installing, installed) built the same way `loading.tsx` is: real state and a timeout, with the library’s own `Spinner` standing in for the progress ring.',
    Component: SwitchInstallProgress,
    minHeight: 120,
  },
];
