/**
 * Authored metadata for the registry.
 *
 * The generator reads source and resolves imports; it cannot invent a sentence
 * describing what a component is for. That copy lives here, so it is written
 * once and shows up identically in the docs site, the CLI listing, and the
 * registry JSON a consumer fetches.
 *
 * `category` mirrors the v0.1 build phases in ARCHITECTURE.md §10.
 */

export const CATEGORIES = [
  { id: 'actions', title: 'Actions' },
  { id: 'forms', title: 'Forms' },
  { id: 'display', title: 'Display' },
  { id: 'overlay', title: 'Overlay' },
  { id: 'navigation', title: 'Navigation' },
];

/** @type {Record<string, { title: string; description: string; category: string }>} */
export const META = {
  button: {
    title: 'Button',
    category: 'actions',
    description:
      'Nine visual weights across six tones, six hover effects on a separate axis, and the grouped, toggle, copy and back-to-top patterns built on them.',
  },
  spinner: {
    title: 'Spinner',
    category: 'actions',
    description: 'A pure-CSS activity indicator that inherits its colour from the text around it.',
  },

  field: {
    title: 'Field',
    category: 'forms',
    description:
      'The label, description and error wrapper every control shares — wiring up ids and aria attributes for you.',
  },
  input: {
    title: 'Input',
    category: 'forms',
    description: 'A single-line text control with addons, sizes and native form participation.',
  },
  textarea: {
    title: 'Textarea',
    category: 'forms',
    description: 'A multi-line text control that can grow with its content instead of scrolling.',
  },
  checkbox: {
    title: 'Checkbox',
    category: 'forms',
    description: 'A real checkbox input with a drawn indicator, including the indeterminate state.',
  },
  radio: {
    title: 'Radio',
    category: 'forms',
    description: 'Grouped single-choice inputs with arrow-key roving focus.',
  },
  switch: {
    title: 'Switch',
    category: 'forms',
    description: 'An on/off toggle for settings that apply the moment they change.',
  },
  slider: {
    title: 'Slider',
    category: 'forms',
    description: 'A draggable range control with full keyboard support and step snapping.',
  },
  select: {
    title: 'Select',
    category: 'forms',
    description:
      'A listbox with typeahead, roving focus and collision-aware positioning — not a native select.',
  },

  badge: {
    title: 'Badge',
    category: 'display',
    description: 'A compact status label sharing the same variant and tone table as Button.',
  },
  avatar: {
    title: 'Avatar',
    category: 'display',
    description:
      'A user image with an initials fallback that only appears once the image is known to have failed.',
  },
  card: {
    title: 'Card',
    category: 'display',
    description: 'A surface with header, content and footer parts for grouping related content.',
  },
  alert: {
    title: 'Alert',
    category: 'display',
    description: 'An inline message with a tone, a title, a description and optional actions.',
  },
  separator: {
    title: 'Separator',
    category: 'display',
    description: 'A horizontal or vertical divider that stays out of the accessibility tree.',
  },

  tooltip: {
    title: 'Tooltip',
    category: 'overlay',
    description:
      'A hover and focus label with a shared open delay, so moving between triggers stays instant.',
  },
  popover: {
    title: 'Popover',
    category: 'overlay',
    description:
      'Rich floating content anchored to a trigger, with focus management and dismissal.',
  },
  dialog: {
    title: 'Dialog',
    category: 'overlay',
    description:
      'A modal with a focus trap, scroll lock and restore-on-close — the reference for the layer stack.',
  },
  drawer: {
    title: 'Drawer',
    category: 'overlay',
    description: 'A dialog that enters from an edge, for navigation and side panels.',
  },
  toast: {
    title: 'Toast',
    category: 'overlay',
    description:
      'Stacked notifications driven by a hook, with pause-on-hover and a swipe-to-dismiss region.',
  },

  tabs: {
    title: 'Tabs',
    category: 'navigation',
    description:
      'Panels behind a roving-focus tablist, in automatic or manual activation and either orientation.',
  },
  accordion: {
    title: 'Accordion',
    category: 'navigation',
    description:
      'Collapsible sections that animate to their own content height with no JavaScript measurement.',
  },
};
