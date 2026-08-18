/**
 * Where this deployment lives.
 *
 * The docs site *is* the registry endpoint, so the URL printed in the CLI
 * instructions has to be one the reader can actually curl — and on a preview
 * deployment that is the preview's own host, not production.
 *
 * Resolution order, and why it is not simply "whatever Vercel says":
 *
 * 1. `NEXT_PUBLIC_SITE_URL`, for a deployment that knows better than any of this.
 * 2. The canonical domain, whenever this is a production build. Vercel's
 *    `VERCEL_PROJECT_PRODUCTION_URL` is the project's `*.vercel.app` host, *not*
 *    the custom domain attached to it — preferring it is what had production
 *    telling readers to curl `noksha-ui-docs.vercel.app` while they were sitting
 *    on `storewike.store`.
 * 3. The per-deployment host, for previews, which is the case Vercel's variables
 *    genuinely answer.
 */
const CANONICAL = 'https://storewike.store';

const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
const isProduction = process.env.VERCEL_ENV === 'production';
const fromVercel = process.env.VERCEL_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL =
  fromEnv ?? (isProduction || !fromVercel ? CANONICAL : `https://${fromVercel}`);

/** Base of the component registry: `${REGISTRY_URL}/button.json` is one component. */
export const REGISTRY_URL = `${SITE_URL}/r`;

/** One definition, because a stale repo link in a header is invisible until someone clicks it. */
export const REPO_URL = 'https://github.com/ahadverse/noksha-ui';
