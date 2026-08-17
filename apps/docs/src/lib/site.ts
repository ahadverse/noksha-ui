/**
 * Where this deployment lives.
 *
 * The docs site *is* the registry endpoint, so the URL printed in the CLI
 * instructions has to be the URL the reader is actually on — a preview
 * deployment that tells people to curl production is worse than useless. The
 * order below resolves that: an explicit override wins, then Vercel's own
 * per-deployment host, then the production domain.
 */
const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const SITE_URL =
  fromEnv ?? (fromVercel ? `https://${fromVercel}` : 'https://storewike.store');

/** Base of the component registry: `${REGISTRY_URL}/button.json` is one component. */
export const REGISTRY_URL = `${SITE_URL}/r`;

/** One definition, because a stale repo link in a header is invisible until someone clicks it. */
export const REPO_URL = 'https://github.com/ahadverse/prism-ui';
