import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  detect,
  detectPackageManager,
  display,
  findRoot,
  installCommand,
  missingDependencies,
  parseTsconfigPaths,
  stripJsonComments,
} from './project.js';

let root: string;

beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), 'noksha-cli-'));
});

afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

const write = async (path: string, content: string): Promise<void> => {
  const { mkdir } = await import('node:fs/promises');
  await mkdir(join(root, path, '..'), { recursive: true });
  await writeFile(join(root, path), content, 'utf8');
};

describe('stripJsonComments', () => {
  /** `create-next-app` ships a tsconfig with comments, and JSON.parse chokes on it. */
  it('removes line and block comments', () => {
    expect(stripJsonComments('{ // hi\n "a": 1 /* there */ }')).toContain('"a": 1');
    expect(stripJsonComments('{ // hi\n "a": 1 }')).not.toContain('hi');
  });

  it('leaves comment-like text inside strings alone', () => {
    expect(stripJsonComments('{ "url": "https://x.dev" }')).toContain('https://x.dev');
    expect(stripJsonComments('{ "a": "/* not a comment */" }')).toContain('/* not a comment */');
  });

  it('drops a trailing comma', () => {
    expect(JSON.parse(stripJsonComments('{ "a": 1, }'))).toEqual({ a: 1 });
  });

  it('survives an escaped quote', () => {
    expect(JSON.parse(stripJsonComments('{ "a": "say \\"hi\\"" }'))).toEqual({ a: 'say "hi"' });
  });
});

describe('parseTsconfigPaths', () => {
  it('reads paths out of a commented tsconfig', () => {
    const raw = '{\n  // generated\n  "compilerOptions": { "paths": { "@/*": ["./src/*"] } },\n}';
    expect(parseTsconfigPaths(raw)).toEqual({ '@/*': ['./src/*'] });
  });

  it('returns nothing rather than throwing on unreadable input', () => {
    expect(parseTsconfigPaths('not json at all')).toEqual({});
  });
});

describe('findRoot', () => {
  it('walks up to the nearest package.json', async () => {
    await write('package.json', '{}');
    await write('src/app/page.tsx', '');

    await expect(findRoot(join(root, 'src', 'app'))).resolves.toBe(root);
  });

  /**
   * Asserted rather than the "no package.json anywhere" path, which cannot be
   * tested without controlling every directory up to the filesystem root — and
   * on a machine with a stray manifest in the temp directory it would fail for
   * reasons that have nothing to do with this code.
   */
  it('stops at the nearest one, not the outermost', async () => {
    await write('package.json', '{}');
    await write('packages/inner/package.json', '{}');

    await expect(findRoot(join(root, 'packages', 'inner'))).resolves.toBe(
      join(root, 'packages', 'inner'),
    );
  });
});

describe('detect', () => {
  it('puts components under src when there is a src', async () => {
    await write('package.json', '{}');
    await write('src/app/globals.css', '@import "tailwindcss";');

    const detected = await detect(root);

    expect(detected.components).toBe('src/components/ui');
    expect(detected.css).toBe('src/app/globals.css');
  });

  it('falls back to the root when there is no src', async () => {
    await write('package.json', '{}');
    await write('app/globals.css', '@import "tailwindcss";');

    expect((await detect(root)).components).toBe('components/ui');
  });

  /**
   * A project can have several plausibly-named stylesheets. The one that matters
   * is the one Tailwind actually compiles, not the one that sorts first.
   */
  it('prefers the stylesheet that imports Tailwind', async () => {
    await write('package.json', '{}');
    await write('src/app/globals.css', '/* just a reset */');
    await write('src/styles/globals.css', '@import "tailwindcss";');

    expect((await detect(root)).css).toBe('src/styles/globals.css');
  });

  it('recognises the v3 directive too', async () => {
    await write('package.json', '{}');
    await write('src/index.css', '@tailwind base;');

    expect((await detect(root)).css).toBe('src/index.css');
  });

  it('derives an alias that lands on the components directory', async () => {
    await write('package.json', '{}');
    await write('src/app/globals.css', '@import "tailwindcss";');
    await write('tsconfig.json', '{ "compilerOptions": { "paths": { "@/*": ["./src/*"] } } }');

    const detected = await detect(root);

    expect(detected.alias).toBe('@/components/ui');
    expect(detected.tsx).toBe(true);
  });

  /** An alias pointing somewhere else cannot address the components; relative wins. */
  it('declines an alias that does not contain the components directory', async () => {
    await write('package.json', '{}');
    await write('src/app/globals.css', '@import "tailwindcss";');
    await write('tsconfig.json', '{ "compilerOptions": { "paths": { "~/*": ["./lib/*"] } } }');

    expect((await detect(root)).alias).toBeNull();
  });

  it('reports a JavaScript project as one', async () => {
    await write('package.json', '{}');
    expect((await detect(root)).tsx).toBe(false);
  });
});

describe('detectPackageManager', () => {
  it.each([
    ['pnpm-lock.yaml', 'pnpm'],
    ['yarn.lock', 'yarn'],
    ['bun.lockb', 'bun'],
    ['package-lock.json', 'npm'],
  ])('reads %s as %s', async (lockfile, expected) => {
    await write('package.json', '{}');
    await write(lockfile, '');

    await expect(detectPackageManager(root)).resolves.toBe(expected);
  });

  it('falls back to the packageManager field', async () => {
    await write('package.json', '{ "packageManager": "pnpm@11.15.1" }');
    await expect(detectPackageManager(root)).resolves.toBe('pnpm');
  });

  it('defaults to npm', async () => {
    await write('package.json', '{}');
    await expect(detectPackageManager(root)).resolves.toBe('npm');
  });
});

describe('installCommand', () => {
  it('uses each manager’s own verb', () => {
    expect(installCommand('npm', ['@noksha-ui/core'])).toBe('npm install @noksha-ui/core');
    expect(installCommand('pnpm', ['@noksha-ui/core'])).toBe('pnpm add @noksha-ui/core');
  });
});

describe('missingDependencies', () => {
  it('ignores what the project already declares, wherever it declares it', async () => {
    await write(
      'package.json',
      JSON.stringify({ dependencies: { a: '1' }, devDependencies: { b: '1' } }),
    );

    await expect(missingDependencies(root, ['a', 'b', 'c'])).resolves.toEqual(['c']);
  });

  it('assumes nothing is installed when the manifest is unreadable', async () => {
    await write('package.json', 'not json');
    await expect(missingDependencies(root, ['a'])).resolves.toEqual(['a']);
  });
});

describe('display', () => {
  it('prints paths relative to the project, with forward slashes', () => {
    expect(display(join('/a', 'b'), join('/a', 'b', 'c', 'd.ts'))).toBe('c/d.ts');
  });
});
