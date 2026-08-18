import { readFile } from 'node:fs/promises';

import { CONFIG_FILE, configPath, DEFAULT_REGISTRY } from '../config.js';
import { Registry } from '../registry.js';
import { color, columns, log, symbol } from '../ui.js';

export interface ListOptions {
  root: string;
  registry?: string | undefined;
  /** Only what this project has already copied. */
  installed: boolean;
}

/**
 * The catalogue.
 *
 * Reads `noksha.json` if there is one, so the listing marks what this project
 * already has — but works without one, because someone deciding whether to use
 * the library at all should not have to initialise it first.
 */
export async function list(options: ListOptions): Promise<void> {
  const config = await readOptionalConfig(options.root);
  const registry = new Registry(options.registry ?? config?.registry ?? DEFAULT_REGISTRY);
  const index = await registry.index();

  const installed = new Set(Object.keys(config?.installed ?? {}));

  if (options.installed && installed.size === 0) {
    log.info(`Nothing installed yet — no ${CONFIG_FILE}, or no components added.`);
    return;
  }

  for (const category of index.categories) {
    const components = index.components.filter(
      (component) =>
        component.category === category.id && (!options.installed || installed.has(component.name)),
    );

    if (components.length === 0) continue;

    log.plain();
    log.plain(color.bold(category.title));
    log.plain(
      columns(
        components.map((component) => [
          `  ${installed.has(component.name) ? color.green(symbol.tick) : ' '} ${component.name}`,
          color.dim(component.description),
        ]),
      ).join('\n'),
    );
  }

  log.plain();
  const total = index.components.length;
  log.info(
    installed.size > 0
      ? `${total} components, ${installed.size} installed here.`
      : `${total} components. Add one with \`noksha add <name>\`.`,
  );
}

async function readOptionalConfig(
  root: string,
): Promise<{ registry: string; installed: Record<string, unknown> } | null> {
  try {
    const raw = await readFile(configPath(root), 'utf8');
    const parsed = JSON.parse(raw) as { registry?: string; installed?: Record<string, unknown> };

    return {
      registry: parsed.registry ?? DEFAULT_REGISTRY,
      installed: parsed.installed ?? {},
    };
  } catch {
    return null;
  }
}
