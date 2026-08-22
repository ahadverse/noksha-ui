/**
 * The one place a heading's text turns into its anchor id. `PreviewFrame` and
 * the table of contents both call this — if they used their own copies, a
 * rename of either would silently break every "on this page" link pointing
 * at it.
 */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
