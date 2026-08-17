/**
 * The build's entry list, in one place.
 *
 * `tsup.config.ts` and `scripts/add-use-client.mjs` both need to agree on which
 * entries are client components; keeping the list here means adding a component
 * cannot stamp the directive on one but not the other.
 */

/** One entry per component — `@prism-ui/react/button` resolves to its own file. */
export const components = [
  'accordion',
  'alert',
  'avatar',
  'badge',
  'button',
  'card',
  'checkbox',
  'dialog',
  'drawer',
  'field',
  'input',
  'popover',
  'radio',
  'select',
  'separator',
  'slider',
  'spinner',
  'switch',
  'tabs',
  'textarea',
  'toast',
  'tooltip',
];

/**
 * Entries that own state, listen to the document, or render something that
 * does — everything except the `theme-script` string.
 */
export const clientEntries = ['index', 'theme', ...components];
