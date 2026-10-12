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
      'Use a switch when the change takes effect immediately, and a checkbox when it is submitted with a form. Each tile copies on its own.',
    Component: SwitchBasic,
    minHeight: 320,
    wide: true,
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description:
      'Three sizes on the same control scale the rest of the library uses. Each tile copies on its own.',
    Component: SwitchSizes,
    minHeight: 200,
    wide: true,
  },
  {
    id: 'tones',
    title: 'Tones',
    description:
      'The six semantic tones, each repointing the same `--sw-solid` variable the track fill is built from. Each tile copies on its own.',
    Component: SwitchTones,
    minHeight: 320,
    wide: true,
  },
  {
    id: 'disabled',
    title: 'Disabled',
    description:
      'A disabled switch is still a real checkbox input — `:disabled` drives the dimmed track and the cursor together, not just the colour. Each tile copies on its own.',
    Component: SwitchDisabled,
    minHeight: 200,
    wide: true,
  },
  {
    id: 'invalid',
    title: 'Invalid',
    description:
      'Field only marks the switch invalid after a first submit attempt, and `Field.Error` mounts nothing until then.',
    Component: SwitchInvalid,
    minHeight: 240,
    wide: true,
  },
  {
    id: 'controlled',
    title: 'Controlled',
    description:
      '`checked` and `onCheckedChange` are the entire contract — the buttons below prove it by driving every switch from outside.',
    Component: SwitchControlled,
    minHeight: 280,
    wide: true,
  },
  {
    id: 'with-text',
    title: 'With text',
    description:
      'A label and a line of helper text per switch, wired to the control through `Field.Description` rather than a hand-written `aria-describedby`.',
    Component: SwitchWithText,
    minHeight: 300,
    wide: true,
  },
  {
    id: 'inline',
    title: 'Inline',
    description:
      'Compact, `sm`-sized switches sharing one horizontal row, for a quick-settings tray rather than a form.',
    Component: SwitchInline,
    minHeight: 200,
    wide: true,
  },
  {
    id: 'list',
    title: 'Settings list',
    description:
      'The classic settings-page row — label on the left, switch on the right — built from `Field.Root` with `justify-between` rather than a bespoke layout.',
    Component: SwitchList,
    minHeight: 280,
    wide: true,
  },
  {
    id: 'loading',
    title: 'Loading',
    description:
      'The switch disables itself while a change is in flight, and only commits once the request resolves — so the UI never shows a state the server rejected. Each tile copies on its own.',
    Component: SwitchLoading,
    minHeight: 220,
    wide: true,
  },
  {
    id: 'settings-panel',
    title: 'Settings panel',
    description:
      'A grouped, real-world settings screen — two sections of switches sharing one card, each wired the same way as the single examples above.',
    Component: SwitchSettingsPanel,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'bold-styles',
    title: 'Bold styles',
    description:
      'Sixteen looks built entirely from `className`, `containerClassName` and the `--sw-solid`/`--sw-w`/`--sw-h` variables — neon, glass, an oversized track, and more, with no fork of the component underneath any of them. Each tile copies on its own.',
    Component: SwitchBoldStyles,
    minHeight: 420,
    wide: true,
  },
  {
    id: 'icon-toggles',
    title: 'Icon toggles',
    description:
      'A hidden checkbox behind a fully custom surface — a lock, a play button, a speaker, a power button, a bubble — each swapping icon or clip-path on `peer-checked`/`has-checked` rather than swapping the switch track. Each tile copies on its own.',
    Component: SwitchIconToggles,
    minHeight: 360,
    wide: true,
  },
  {
    id: 'menu-toggle',
    title: 'Menu toggle',
    description:
      'The three-bar pattern behind most hamburger menus — the same hidden checkbox driving a track elsewhere in this page now morphs bars into an arrow. Each tile copies on its own.',
    Component: SwitchMenuToggle,
    minHeight: 240,
    wide: true,
  },
  {
    id: 'day-night',
    title: 'Day / night',
    description:
      'Six takes on the same idea, from a sliding thumb that uncovers the sun or moon to a disc that rises over hills and an orb that just crossfades color and icon. Each tile copies on its own.',
    Component: SwitchDayNight,
    minHeight: 360,
    wide: true,
  },
  {
    id: 'plane-mode',
    title: 'Airplane mode',
    description:
      'Five takes on the same setting: a plane taxiing into open sky, one pitching into takeoff, one that just cuts the signal bars, a window shade pulling down over the view, and a boarding pass with a plane sliding along its dashed flight path. Each tile copies on its own.',
    Component: SwitchPlaneMode,
    minHeight: 360,
    wide: true,
  },
  {
    id: 'install-progress',
    title: 'Install progress',
    description:
      'Not a toggle at all — a three-phase button (idle, installing, installed) built the same way `loading.tsx` is: real state and a timeout, with the library’s own `Spinner` standing in for the progress ring.',
    Component: SwitchInstallProgress,
    minHeight: 200,
    wide: true,
  },
];
