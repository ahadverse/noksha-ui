import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { CliError } from './errors.js';

export const CONFIG_FILE = 'noksha.json';

export const DEFAULT_REGISTRY = 'https://nokshaui.com/r';

/** What one component looked like at the moment it was copied. */
export interface InstallRecord {
  /** The registry's whole-component hash, as `index.json` reported it. */
  hash: string;
  /** Per-file registry hash, keyed by the path relative to the components dir. */
  files: Record<string, string>;
}

export interface Config {
  $schema?: string;
  /** Base URL of the registry. Point it at a fork to serve your own components. */
  registry: string;
  /** The brand seed the stylesheet was generated from. */
  brand: string;
  /** The stylesheet `init` wrote, relative to the project root. */
  css: string;
  /** Where components land, relative to the project root. */
  components: string;
  /**
   * Import prefix for cross-directory imports between copied files, e.g.
   * `@/components/ui`. `null` falls back to relative paths, which always work.
   */
  alias: string | null;
  /** `.tsx` when true, `.jsx` when the project is plain JavaScript. */
  tsx: boolean;
  /**
   * What `add` wrote, and from which upstream revision.
   *
   * This is the whole reason `diff` can say something useful. Without a record
   * of what was copied, a tool can only tell you that your file differs from
   * upstream — which it always will, the moment you change anything. With it,
   * "you edited this" and "upstream moved" are separable.
   */
  installed: Record<string, InstallRecord>;
}

export const SCHEMA_URL = 'https://nokshaui.com/schema/noksha.json';

export function configPath(root: string): string {
  return join(root, CONFIG_FILE);
}

export async function readConfig(root: string): Promise<Config> {
  let raw: string;

  try {
    raw = await readFile(configPath(root), 'utf8');
  } catch {
    throw new CliError(
      `No ${CONFIG_FILE} in ${root}.`,
      'Run `npx @noksha-ui/cli init` first — it writes the stylesheet and records where components should go.',
    );
  }

  let parsed: Partial<Config>;
  try {
    parsed = JSON.parse(raw) as Partial<Config>;
  } catch (cause) {
    throw new CliError(
      `${CONFIG_FILE} is not valid JSON.`,
      cause instanceof Error ? cause.message : undefined,
    );
  }

  for (const key of ['registry', 'components', 'css', 'brand'] as const) {
    if (typeof parsed[key] !== 'string') {
      throw new CliError(
        `${CONFIG_FILE} is missing "${key}".`,
        'Re-run `init --force` to rewrite it.',
      );
    }
  }

  return {
    $schema: parsed.$schema ?? SCHEMA_URL,
    registry: parsed.registry as string,
    brand: parsed.brand as string,
    css: parsed.css as string,
    components: parsed.components as string,
    alias: typeof parsed.alias === 'string' ? parsed.alias : null,
    tsx: parsed.tsx !== false,
    installed: parsed.installed ?? {},
  };
}

/**
 * Key order is fixed so the file reads the same however it was produced, and so
 * a later `add` shows up in version control as one changed record rather than a
 * reshuffled document.
 */
export async function writeConfig(root: string, config: Config): Promise<void> {
  const ordered: Config = {
    $schema: config.$schema ?? SCHEMA_URL,
    registry: config.registry,
    brand: config.brand,
    css: config.css,
    components: config.components,
    alias: config.alias,
    tsx: config.tsx,
    installed: Object.fromEntries(
      Object.entries(config.installed).sort(([a], [b]) => a.localeCompare(b)),
    ),
  };

  await writeFile(configPath(root), `${JSON.stringify(ordered, null, 2)}\n`, 'utf8');
}
