/**
 * Generates `dist/registry/*.json` — the source of truth for the ownership path.
 *
 * The same JSON feeds three consumers, which is the point of generating it
 * rather than maintaining copies: the docs site's "copy the source" button, the
 * CLI's `add`, and the CLI's `diff` (via the per-file hash). Because it is read
 * straight off `src/`, copied code can never describe a component the library
 * does not actually ship (ARCHITECTURE.md §7).
 */
import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { components } from '../entries.mjs';
import { CATEGORIES, META } from '../registry.meta.mjs';
import { extractProps } from './extract-props.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'src');
const outDir = join(root, 'dist', 'registry');

/** Tests and stories are dev-only — nobody copying a component wants them. */
const EXCLUDED = /\.(test|stories)\.tsx?$/;

/** Peers a consumer's app already has; listing them as installs would be noise. */
const ASSUMED = new Set(['react', 'react-dom', 'react/jsx-runtime']);

const sha = (text) => createHash('sha256').update(text).digest('hex').slice(0, 16);

/**
 * Pulls every module specifier out of a file.
 *
 * A regex rather than a parser: the sources are the library's own, they are
 * formatted by Biome, and every import in them is a static top-level one.
 */
function importsOf(source) {
  const specifiers = [];
  const pattern = /(?:from|import)\s*['"]([^'"]+)['"]/g;
  let match = pattern.exec(source);

  while (match !== null) {
    specifiers.push(match[1]);
    match = pattern.exec(source);
  }
  return specifiers;
}

/** `@noksha-ui/core` → an install; `react` → assumed; `./button.js` → neither. */
function packageOf(specifier) {
  if (specifier.startsWith('.') || ASSUMED.has(specifier)) return null;

  const parts = specifier.split('/');
  return specifier.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
}

async function filesIn(dir, prefix) {
  const entries = await readdir(join(srcDir, dir), { withFileTypes: true });
  const wanted = entries.filter((e) => e.isFile() && !EXCLUDED.test(e.name)).map((e) => e.name);

  return Promise.all(
    wanted.sort().map(async (name) => {
      const content = await readFile(join(srcDir, dir, name), 'utf8');
      return { path: `${prefix}/${name}`, content, hash: sha(content) };
    }),
  );
}

/**
 * Walks a component's imports to the components and shared internals it needs.
 *
 * Copying Select without the Field it renders would hand someone a file that
 * does not compile, so the graph is resolved here and the CLI installs the
 * closure rather than one directory.
 */
function resolveDeps(files) {
  const registryDeps = new Set();
  const internals = new Set();
  const dependencies = new Set();

  for (const file of files) {
    for (const specifier of importsOf(file.content)) {
      const sibling = specifier.match(/^\.\.\/([^/]+)\//);
      const internal = specifier.match(/^\.\.\/\.\.\/internal\/([^/]+)\.js$/);
      const pkg = packageOf(specifier);

      if (internal) internals.add(internal[1]);
      else if (sibling && components.includes(sibling[1])) registryDeps.add(sibling[1]);

      if (pkg) dependencies.add(pkg);
    }
  }
  return { registryDeps, internals, dependencies };
}

await mkdir(outDir, { recursive: true });

const index = [];
const allInternals = new Set();

for (const name of components) {
  const meta = META[name];
  if (!meta) throw new Error(`registry.meta.mjs is missing an entry for "${name}"`);

  const files = await filesIn(join('components', name), name);
  const { registryDeps, internals, dependencies } = resolveDeps(files);

  for (const internal of internals) allInternals.add(internal);

  // A component without a `.types.ts` simply publishes no API table.
  const typesFile = files.find((file) => file.path.endsWith('.types.ts'));
  const api = typesFile
    ? extractProps(typesFile.path, typesFile.content)
    : { interfaces: [], aliases: [] };

  const item = {
    name,
    type: 'component',
    title: meta.title,
    description: meta.description,
    category: meta.category,
    dependencies: [...dependencies].sort(),
    registryDependencies: [...registryDeps].sort(),
    internalDependencies: [...internals].sort(),
    api,
    files,
  };

  await writeFile(join(outDir, `${name}.json`), `${JSON.stringify(item, null, 2)}\n`, 'utf8');

  index.push({
    name,
    title: meta.title,
    description: meta.description,
    category: meta.category,
    registryDependencies: item.registryDependencies,
    // Lets `diff` ask one question about a whole component instead of per file.
    hash: sha(files.map((f) => f.hash).join('')),
  });
}

// The shared internals ship as their own item so several components can depend
// on `tone.ts` without three copies of it landing in the consumer's tree.
const internalFiles = await filesIn('internal', 'internal');
const usedInternals = internalFiles.filter((f) =>
  // `.tsx?`, not `.ts`: an internal that renders — the portal theme bridge —
  // is a .tsx, and matching only .ts would drop it from the registry without a
  // word, leaving every copied overlay importing a file nobody wrote.
  allInternals.has(f.path.replace(/^internal\/|\.tsx?$/g, '')),
);

await writeFile(
  join(outDir, 'internal.json'),
  `${JSON.stringify(
    {
      name: 'internal',
      type: 'lib',
      title: 'Internals',
      description: 'Shared variant tables and helpers the components build on.',
      dependencies: [...new Set(usedInternals.flatMap((f) => importsOf(f.content).map(packageOf)))]
        .filter(Boolean)
        .sort(),
      files: usedInternals,
    },
    null,
    2,
  )}\n`,
  'utf8',
);

await writeFile(
  join(outDir, 'index.json'),
  `${JSON.stringify({ categories: CATEGORIES, components: index }, null, 2)}\n`,
  'utf8',
);

console.log(
  `[@noksha-ui/react] wrote dist/registry — ${index.length} components, ${usedInternals.length} internals`,
);
