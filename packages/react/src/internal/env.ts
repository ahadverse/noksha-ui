/**
 * Whether the app is running a production build.
 *
 * Used to gate development-only warnings — the accessible-name check in Dialog
 * is the one caller today.
 *
 * Read off `globalThis` rather than as a bare `process.env.NODE_ENV`, which is
 * the shorter thing to write and does not survive the trip. These files are also
 * copied into consumers' projects by `@noksha-ui/cli`, and `process` is only a
 * declared name there if `@types/node` happens to be installed — which it is
 * under Next.js and is not under a plain Vite template. A component that fails
 * to typecheck in the project that owns it is not really owned, and this is the
 * only global in the library that a consumer's compiler would have to be told
 * about.
 *
 * The cost is that a bundler cannot statically replace this the way it replaces
 * the literal member expression, so the warning it guards stays in a production
 * bundle instead of being eliminated. That is one string and one comparison,
 * paid once, against source that compiles wherever it lands.
 */
export function isProduction(): boolean {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
    ?.env;

  return env?.NODE_ENV === 'production';
}
