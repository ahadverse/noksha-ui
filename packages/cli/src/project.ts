import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, join, parse, posix, relative, resolve, sep } from 'node:path';

import { CliError } from './errors.js';

const exists = async (path: string): Promise<boolean> => {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
};

/**
 * The nearest ancestor with a `package.json`.
 *
 * `noksha.json` would be the more direct marker, but `init` runs before there
 * is one — so both commands agree on the root by agreeing on the package.
 */
export async function findRoot(from: string): Promise<string> {
  let dir = resolve(from);

  for (;;) {
    if (await exists(join(dir, 'package.json'))) return dir;

    const parent = dirname(dir);
    if (parent === dir) {
      throw new CliError(
        `No package.json above ${from}.`,
        'Run this from inside your project, or pass --cwd.',
      );
    }
    dir = parent;
  }
}

export interface Detected {
  /** A `tsconfig.json` was found, so components should be written as `.tsx`. */
  tsx: boolean;
  /** `src/components/ui` or `components/ui`, whichever suits the layout. */
  components: string;
  /** The stylesheet Tailwind already processes, if one can be identified. */
  css: string | null;
  /** An import alias derived from tsconfig `paths`, e.g. `@/components/ui`. */
  alias: string | null;
}

/**
 * Where a project keeps things, guessed from what is on disk.
 *
 * Every guess is offered as a default the user can overrule, so a wrong guess
 * costs a keystroke rather than a misplaced directory tree.
 */
export async function detect(root: string): Promise<Detected> {
  const tsx = await exists(join(root, 'tsconfig.json'));
  const hasSrc = await exists(join(root, 'src'));
  const components = hasSrc ? 'src/components/ui' : 'components/ui';

  return {
    tsx,
    components,
    css: await findStylesheet(root),
    alias: await findAlias(root, components),
  };
}

/**
 * The stylesheet Tailwind is already wired into.
 *
 * Preferring a file that imports Tailwind over one that merely has the right
 * name is the point: a project with both `app/globals.css` and a stray
 * `styles/index.css` should get the one the build actually compiles.
 */
async function findStylesheet(root: string): Promise<string | null> {
  const candidates = [
    'src/app/globals.css',
    'app/globals.css',
    'src/styles/globals.css',
    'styles/globals.css',
    'src/index.css',
    'src/app.css',
    'src/main.css',
    'app.css',
    'styles.css',
  ];

  const found: string[] = [];

  for (const candidate of candidates) {
    if (await exists(join(root, candidate))) found.push(candidate);
  }

  for (const candidate of found) {
    const source = await readFile(join(root, candidate), 'utf8');
    if (/@import\s+['"]tailwindcss|@tailwind\s+/.test(source)) return candidate;
  }

  return found[0] ?? null;
}

/**
 * Turns a tsconfig `paths` entry into the prefix copied files should import
 * each other through.
 *
 * Only a prefix mapping onto the components directory is useful here — `@/*`
 * pointing at `src/*` becomes `@/components/ui`. Anything more exotic is left
 * alone and the files fall back to relative imports, which need no config to
 * resolve and are never wrong.
 */
async function findAlias(root: string, components: string): Promise<string | null> {
  for (const file of ['tsconfig.json', 'jsconfig.json']) {
    const raw = await readOptional(join(root, file));
    if (raw === null) continue;

    const paths = parseTsconfigPaths(raw);

    for (const [pattern, targets] of Object.entries(paths)) {
      if (!pattern.endsWith('/*')) continue;

      for (const target of targets) {
        if (!target.endsWith('/*')) continue;

        const base = target.slice(0, -2).replace(/^\.\//, '').replace(/\/$/, '');
        const withinBase = base === '' ? components : relativeWithin(base, components);
        if (withinBase === null) continue;

        return posix.join(pattern.slice(0, -2), withinBase);
      }
    }
  }
  return null;
}

/** `src` + `src/components/ui` → `components/ui`; unrelated paths → null. */
function relativeWithin(base: string, target: string): string | null {
  const rel = relative(base, target);
  return rel.startsWith('..') || rel === '' ? null : rel.split(sep).join('/');
}

/**
 * `compilerOptions.paths`, read without a JSON5 parser.
 *
 * tsconfig files are JSONC in practice, and `JSON.parse` chokes on the comments
 * `create-next-app` ships. Stripping comments is enough here because the only
 * thing being read is a map of strings — a fully general parser would be a
 * dependency bought for one field.
 */
export function parseTsconfigPaths(raw: string): Record<string, string[]> {
  try {
    const parsed = JSON.parse(stripJsonComments(raw)) as {
      compilerOptions?: { paths?: Record<string, string[]> };
    };
    return parsed.compilerOptions?.paths ?? {};
  } catch {
    return {};
  }
}

export function stripJsonComments(raw: string): string {
  let out = '';
  let inString = false;
  let inLine = false;
  let inBlock = false;

  for (let i = 0; i < raw.length; i += 1) {
    const char = raw[i] as string;
    const next = raw[i + 1];

    if (inLine) {
      if (char === '\n') {
        inLine = false;
        out += char;
      }
      continue;
    }
    if (inBlock) {
      if (char === '*' && next === '/') {
        inBlock = false;
        i += 1;
      }
      continue;
    }
    if (inString) {
      out += char;
      if (char === '\\') {
        out += raw[i + 1] ?? '';
        i += 1;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }
    if (char === '"') {
      inString = true;
      out += char;
      continue;
    }
    if (char === '/' && next === '/') {
      inLine = true;
      i += 1;
      continue;
    }
    if (char === '/' && next === '*') {
      inBlock = true;
      i += 1;
      continue;
    }
    out += char;
  }

  // Trailing commas are legal in tsconfig and fatal to JSON.parse.
  return out.replace(/,(\s*[}\]])/g, '$1');
}

async function readOptional(path: string): Promise<string | null> {
  try {
    return await readFile(path, 'utf8');
  } catch {
    return null;
  }
}

/** The lockfile decides, so the printed install command is the one that works. */
export async function detectPackageManager(root: string): Promise<'pnpm' | 'yarn' | 'bun' | 'npm'> {
  const entries = new Set(await readdir(root).catch(() => [] as string[]));

  if (entries.has('pnpm-lock.yaml')) return 'pnpm';
  if (entries.has('bun.lockb') || entries.has('bun.lock')) return 'bun';
  if (entries.has('yarn.lock')) return 'yarn';
  if (entries.has('package-lock.json')) return 'npm';

  const raw = await readOptional(join(root, 'package.json'));
  const declared = raw === null ? null : /"packageManager"\s*:\s*"([a-z]+)@/.exec(raw)?.[1];

  if (declared === 'pnpm' || declared === 'yarn' || declared === 'bun') return declared;
  return 'npm';
}

export function installCommand(manager: string, packages: string[]): string {
  const verb = manager === 'npm' ? 'install' : 'add';
  return `${manager} ${verb} ${packages.join(' ')}`;
}

/** Which of `packages` the project does not already depend on. */
export async function missingDependencies(root: string, packages: string[]): Promise<string[]> {
  const raw = await readOptional(join(root, 'package.json'));
  if (raw === null) return packages;

  let manifest: { dependencies?: object; devDependencies?: object; peerDependencies?: object };
  try {
    manifest = JSON.parse(raw) as typeof manifest;
  } catch {
    return packages;
  }

  const declared = new Set([
    ...Object.keys(manifest.dependencies ?? {}),
    ...Object.keys(manifest.devDependencies ?? {}),
    ...Object.keys(manifest.peerDependencies ?? {}),
  ]);

  return packages.filter((name) => !declared.has(name));
}

/** Absolute path, printed relative to the root — terminal output stays readable. */
export function display(root: string, absolute: string): string {
  const rel = relative(root, absolute);
  return rel === '' ? parse(absolute).base : rel.split(sep).join('/');
}
