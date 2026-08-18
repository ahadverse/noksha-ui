/**
 * Install numbers, read from npm at build time.
 *
 * Nothing here is allowed to fail a build. Every request is best-effort and
 * every failure returns `null`, because a docs page that cannot be rendered
 * without a third party's uptime is a worse page than one missing a statistic.
 */

const PACKAGE = '@noksha-ui/react';

/** Twelve hours. The number moves daily, so anything shorter is wasted traffic. */
const REVALIDATE = 60 * 60 * 12;

/** How long to wait before giving up and rendering without the number. */
const TIMEOUT_MS = 6000;

/** npm's point endpoint refuses a range longer than this. */
const MAX_RANGE_MONTHS = 18;

function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * A cached GET that resolves to `null` instead of throwing or hanging.
 *
 * The timeout is a race rather than an `AbortSignal`, deliberately: passing a
 * signal opts the request out of Next's fetch cache, which would put a call to
 * npm on the critical path of every single render.
 */
async function request(url: string): Promise<Response | null> {
  const call = fetch(url, {
    next: { revalidate: REVALIDATE },
    headers: { accept: 'application/json' },
  }).catch(() => null);

  const timeout = new Promise<null>((resolve) => {
    setTimeout(resolve, TIMEOUT_MS, null);
  });

  return Promise.race([call, timeout]);
}

async function body<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export interface InstallCount {
  /** Downloads across the whole window below. */
  total: number;
  /** The first day counted, as `YYYY-MM-DD`. */
  since: string;
}

/**
 * Total installs since the package was first published.
 *
 * npm publishes no all-time endpoint — the point API takes a date range and
 * caps it at eighteen months. Counting from the first publish is therefore the
 * genuine all-time total for as long as the package is younger than that cap,
 * and degrades into "the last eighteen months" afterwards rather than lying.
 *
 * A 404 from the statistics service is reported as zero rather than as a
 * failure, and it is only read as zero because the registry has already
 * answered for the same package: npm knows a package the moment it is
 * published but does not count it until the following day, so "the registry
 * has it and the counter does not" means nobody has installed it yet. If the
 * registry itself cannot be reached, nothing is claimed and this returns
 * `null`.
 */
export async function getInstallCount(): Promise<InstallCount | null> {
  const registry = await request(`https://registry.npmjs.org/${PACKAGE}`);
  if (!registry?.ok) return null;

  const meta = await body<{ time?: Record<string, string> }>(registry);
  const created = meta?.time?.created;
  if (!created) return null;

  const today = new Date();
  const cap = new Date(today);
  cap.setMonth(cap.getMonth() - MAX_RANGE_MONTHS);

  const published = new Date(created);
  const from = published > cap ? published : cap;
  const since = isoDay(from);

  const stats = await request(
    `https://api.npmjs.org/downloads/point/${since}:${isoDay(today)}/${PACKAGE}`,
  );
  if (!stats) return null;
  if (stats.status === 404) return { total: 0, since };
  if (!stats.ok) return null;

  const counted = await body<{ downloads?: number }>(stats);
  if (typeof counted?.downloads !== 'number') return null;

  return { total: counted.downloads, since };
}

/** `1234` → `1.2k`. Keeps a stat tile one line wide at any scale. */
export function formatCount(value: number): string {
  if (value >= 1_000_000) return `${trimZero(value / 1_000_000)}M`;
  if (value >= 1_000) return `${trimZero(value / 1_000)}k`;
  return String(value);
}

function trimZero(value: number): string {
  const fixed = value.toFixed(1);
  return fixed.endsWith('.0') ? fixed.slice(0, -2) : fixed;
}
