import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Reads the registry `@noksha-ui/react` generates at build time.
 *
 * The docs site never re-derives what a component is made of; it reads the same
 * JSON the CLI installs from, so "copy the source" on a page and
 * `noksha add <name>` in a terminal can never hand out different files.
 *
 * `scripts/sync-registry.mjs` puts it in `public/r` before the build runs —
 * resolving the package from here instead would not survive bundling, and this
 * way the built site serves the registry it was rendered from.
 */
const registryDir = join(process.cwd(), 'public', 'r');

export interface RegistryFile {
  path: string;
  content: string;
  hash: string;
}

export interface PropDoc {
  name: string;
  type: string;
  required: boolean;
  description: string;
  default: string | null;
}

export interface InterfaceDoc {
  name: string;
  extends: string[];
  description: string;
  props: PropDoc[];
}

export interface AliasDoc {
  name: string;
  type: string;
  options: string[] | null;
  description: string;
}

export interface RegistryItem {
  name: string;
  type: 'component' | 'lib';
  title: string;
  description: string;
  category: string;
  dependencies: string[];
  registryDependencies: string[];
  internalDependencies: string[];
  api: { interfaces: InterfaceDoc[]; aliases: AliasDoc[] };
  files: RegistryFile[];
}

export interface RegistrySummary {
  name: string;
  title: string;
  description: string;
  category: string;
  registryDependencies: string[];
  hash: string;
}

export interface RegistryIndex {
  categories: { id: string; title: string }[];
  components: RegistrySummary[];
}

async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await readFile(join(registryDir, file), 'utf8')) as T;
}

export async function getRegistryIndex(): Promise<RegistryIndex> {
  return readJson<RegistryIndex>('index.json');
}

export async function getRegistryItem(name: string): Promise<RegistryItem> {
  return readJson<RegistryItem>(`${name}.json`);
}

/** The registry grouped the way the sidebar and the index page display it. */
export async function getGroupedComponents(): Promise<
  { id: string; title: string; components: RegistrySummary[] }[]
> {
  const index = await getRegistryIndex();

  return index.categories
    .map((category) => ({
      ...category,
      components: index.components.filter((component) => component.category === category.id),
    }))
    .filter((group) => group.components.length > 0);
}
