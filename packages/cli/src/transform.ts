/**
 * Turns a registry file into a file that compiles in someone else's project.
 *
 * The registry serves `packages/react/src` verbatim — that is what makes it
 * impossible for the documented source to drift from the shipped source. The
 * cost is that those files are written for the library's own layout and its own
 * build, so two things have to be adjusted on the way in.
 */

export interface TransformOptions {
  /** Import prefix for cross-directory imports, or `null` for relative paths. */
  alias: string | null;
}

/**
 * In the library, components live at `src/components/<name>/` and the shared
 * helpers at `src/internal/` — two levels up. A consumer gets both under one
 * directory, so the internals are one level up instead.
 */
const INTERNAL = /(['"])\.\.\/\.\.\/internal\/([\w-]+)\.js\1/g;

/** `../spinner/spinner.js` — a sibling component, same depth in both layouts. */
const SIBLING = /(['"])\.\.\/([\w-]+)\/([\w-]+(?:\.[\w-]+)*)\.js\1/g;

/** `./button.types.js` — same directory. */
const LOCAL = /(['"])\.\/([\w-]+(?:\.[\w-]+)*)\.js\1/g;

/**
 * Rewrites the import specifiers in one file.
 *
 * The `.js` extensions go because they are an artefact of how the library
 * compiles, not of how it is read: TypeScript resolves `./button.types.js` to
 * `button.types.ts`, but the bundler in a consumer's app sees the emitted
 * import and looks for a `.js` file that was never written. Dropping the
 * extension is the form that works under every bundler.
 *
 * `@noksha-ui/core` is deliberately left alone. Owning a component means owning
 * its markup and its classes; the focus traps and the dismiss-layer stack stay
 * a dependency, which is the split ADR-002 draws.
 */
export function rewriteImports(source: string, options: TransformOptions): string {
  const { alias } = options;
  const prefix = (path: string, fallback: string): string =>
    alias === null ? fallback : `${alias}/${path}`;

  return source
    .replace(
      INTERNAL,
      (_match, quote: string, name: string) =>
        `${quote}${prefix(`internal/${name}`, `../internal/${name}`)}${quote}`,
    )
    .replace(
      SIBLING,
      (_match, quote: string, dir: string, file: string) =>
        `${quote}${prefix(`${dir}/${file}`, `../${dir}/${file}`)}${quote}`,
    )
    .replace(LOCAL, (_match, quote: string, file: string) => `${quote}./${file}${quote}`);
}

const DIRECTIVE = "'use client';\n\n";

/**
 * Whether a file has to declare the client boundary.
 *
 * The package stamps the directive on its built entries instead
 * (`scripts/add-use-client.mjs`), so the registry sources carry none — and a
 * copied component without it throws the moment a Server Component renders it.
 *
 * Anything touching the React runtime needs it. A barrel needs it because it is
 * what the consumer actually imports. Type and variant files need nothing:
 * types are erased, and the variant tables are plain string maps.
 */
export function needsUseClient(path: string, source: string): boolean {
  if (/^\s*['"]use client['"]/.test(source)) return false;

  const isBarrel = /(^|\/)index\.tsx?$/.test(path);
  return isBarrel || /\bfrom\s+['"]react['"]/.test(source);
}

/** The full transform for one registry file. */
export function transform(path: string, content: string, options: TransformOptions): string {
  const source = rewriteImports(content, options);
  return needsUseClient(path, source) ? DIRECTIVE + source : source;
}
