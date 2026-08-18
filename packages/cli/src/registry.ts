import { CliError } from './errors.js';

export interface RegistryFile {
  path: string;
  content: string;
  hash: string;
}

export interface RegistryItem {
  name: string;
  type: 'component' | 'lib';
  title: string;
  description: string;
  category?: string;
  dependencies: string[];
  registryDependencies?: string[];
  internalDependencies?: string[];
  files: RegistryFile[];
}

export interface RegistrySummary {
  name: string;
  title: string;
  description: string;
  category: string;
  registryDependencies: string[];
  /** The whole component in one value, so `diff` can skip a fetch. */
  hash: string;
}

export interface RegistryIndex {
  categories: { id: string; title: string }[];
  components: RegistrySummary[];
}

/**
 * Reads the registry `@noksha-ui/react` generates at build time and the docs
 * site serves as static JSON.
 *
 * Nothing about a component is described twice: the files written here are the
 * library's own `src/`, hashed at the same moment they were published. That is
 * what lets `diff` make a claim about upstream at all.
 */
export class Registry {
  readonly #base: string;
  readonly #cache = new Map<string, unknown>();

  constructor(base: string) {
    this.#base = base.replace(/\/$/, '');
  }

  async #get<T>(file: string): Promise<T> {
    const cached = this.#cache.get(file);
    if (cached !== undefined) return cached as T;

    const url = `${this.#base}/${file}`;
    let response: Response;

    try {
      response = await fetch(url, { headers: { accept: 'application/json' } });
    } catch (cause) {
      throw new CliError(
        `Could not reach the registry at ${url}.`,
        cause instanceof Error ? cause.message : 'Check your network connection.',
      );
    }

    if (response.status === 404) {
      throw new CliError(`The registry has nothing at ${file}.`);
    }
    if (!response.ok) {
      throw new CliError(`The registry returned ${response.status} for ${url}.`);
    }

    let parsed: T;
    try {
      parsed = (await response.json()) as T;
    } catch {
      throw new CliError(
        `${url} did not return JSON.`,
        'If this is a custom registry, check that it serves the file directly rather than an HTML page.',
      );
    }

    this.#cache.set(file, parsed);
    return parsed;
  }

  index(): Promise<RegistryIndex> {
    return this.#get<RegistryIndex>('index.json');
  }

  async item(name: string): Promise<RegistryItem> {
    const index = await this.index();
    const known = name === 'internal' || index.components.some((c) => c.name === name);

    if (!known) {
      throw new CliError(
        `There is no component called "${name}".`,
        `${
          suggest(
            name,
            index.components.map((c) => c.name),
          ) ?? 'Run `noksha list` to see what there is.'
        }`,
      );
    }
    return this.#get<RegistryItem>(`${name}.json`);
  }

  /**
   * The transitive closure of a set of components.
   *
   * Copying Select without the Field it renders hands someone a file that does
   * not compile, so `add` installs the closure rather than one directory. The
   * shared internals come back as a single `internal` item — several components
   * depend on `tone.ts` and only one copy of it should land.
   */
  async resolve(names: string[]): Promise<RegistryItem[]> {
    const seen = new Map<string, RegistryItem>();
    const queue = [...names];
    const internals = new Set<string>();

    while (queue.length > 0) {
      const name = queue.shift();
      if (name === undefined || seen.has(name)) continue;

      const item = await this.item(name);
      seen.set(name, item);

      for (const internal of item.internalDependencies ?? []) internals.add(internal);
      queue.push(...(item.registryDependencies ?? []));
    }

    const items = [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
    if (internals.size === 0) return items;

    return [await this.internals(internals), ...items];
  }

  /**
   * The shared helpers, narrowed to the ones actually reached.
   *
   * The registry ships all of them as one item so that several components
   * depending on `tone.ts` do not each bring a copy. That is right for
   * de-duplication and wrong for a consumer's tree: `add button` should not
   * leave an overlay-positioning helper in someone's project that nothing
   * imports. They have no imports between them, so taking a subset is safe.
   */
  async internals(wanted: Set<string>): Promise<RegistryItem> {
    const item = await this.item('internal');
    const files = item.files.filter((file) =>
      wanted.has(file.path.replace(/^internal\/|\.ts$/g, '')),
    );

    return { ...item, files: files.length > 0 ? files : item.files };
  }
}

/** "buton" → "Did you mean button?" — cheap Levenshtein, one suggestion. */
export function suggest(input: string, candidates: string[]): string | null {
  let best: string | null = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const candidate of candidates) {
    const distance = editDistance(input, candidate);
    if (distance < bestDistance) {
      best = candidate;
      bestDistance = distance;
    }
  }

  const tolerance = Math.max(2, Math.floor(input.length / 3));
  return best !== null && bestDistance <= tolerance ? `Did you mean "${best}"?` : null;
}

function editDistance(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(
        (current[j - 1] ?? 0) + 1,
        (previous[j] ?? 0) + 1,
        (previous[j - 1] ?? 0) + cost,
      );
    }
    previous = current;
  }
  return previous[b.length] ?? 0;
}
