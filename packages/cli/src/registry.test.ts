import { afterEach, describe, expect, it, vi } from 'vitest';

import { Registry, suggest } from './registry.js';

const INDEX = {
  categories: [{ id: 'actions', title: 'Actions' }],
  components: [
    {
      name: 'button',
      title: 'Button',
      description: '',
      category: 'actions',
      registryDependencies: ['spinner'],
      hash: 'a',
    },
    {
      name: 'spinner',
      title: 'Spinner',
      description: '',
      category: 'actions',
      registryDependencies: [],
      hash: 'b',
    },
    {
      name: 'dialog',
      title: 'Dialog',
      description: '',
      category: 'overlay',
      registryDependencies: [],
      hash: 'c',
    },
  ],
};

const ITEMS: Record<string, unknown> = {
  'index.json': INDEX,
  'button.json': {
    name: 'button',
    type: 'component',
    dependencies: ['@noksha-ui/core'],
    registryDependencies: ['spinner'],
    internalDependencies: ['tone'],
    files: [{ path: 'button/button.tsx', content: 'b', hash: '1' }],
  },
  'spinner.json': {
    name: 'spinner',
    type: 'component',
    dependencies: ['@noksha-ui/core'],
    registryDependencies: [],
    internalDependencies: [],
    files: [{ path: 'spinner/spinner.tsx', content: 's', hash: '2' }],
  },
  'dialog.json': {
    name: 'dialog',
    type: 'component',
    dependencies: [],
    registryDependencies: [],
    internalDependencies: ['overlay'],
    files: [{ path: 'dialog/dialog.tsx', content: 'd', hash: '3' }],
  },
  'internal.json': {
    name: 'internal',
    type: 'lib',
    dependencies: [],
    files: [
      { path: 'internal/control.ts', content: 'c', hash: '4' },
      { path: 'internal/overlay.ts', content: 'o', hash: '5' },
      { path: 'internal/tone.ts', content: 't', hash: '6' },
    ],
  },
};

let requests: string[] = [];

function serve(): void {
  requests = [];
  vi.stubGlobal('fetch', (url: string) => {
    const file = url.split('/').pop() as string;
    requests.push(file);

    const body = ITEMS[file];
    if (body === undefined) return Promise.resolve(new Response('no', { status: 404 }));

    return Promise.resolve(
      new Response(JSON.stringify(body), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    );
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Registry.resolve', () => {
  it('follows registryDependencies so a copied component compiles', async () => {
    serve();
    const items = await new Registry('https://example.test/r').resolve(['button']);

    expect(items.map((item) => item.name)).toEqual(['internal', 'button', 'spinner']);
  });

  /**
   * The registry ships every shared helper as one item so components can share
   * a copy of `tone.ts`. A consumer's tree should still only receive the ones
   * something in it imports.
   */
  it('narrows the shared helpers to the ones actually reached', async () => {
    serve();
    const items = await new Registry('https://example.test/r').resolve(['button']);
    const internal = items.find((item) => item.name === 'internal');

    expect(internal?.files.map((file) => file.path)).toEqual(['internal/tone.ts']);
  });

  it('unions the helpers across everything requested', async () => {
    serve();
    const items = await new Registry('https://example.test/r').resolve(['button', 'dialog']);
    const internal = items.find((item) => item.name === 'internal');

    expect(internal?.files.map((file) => file.path)).toEqual([
      'internal/overlay.ts',
      'internal/tone.ts',
    ]);
  });

  it('omits the helpers entirely when nothing needs them', async () => {
    serve();
    const items = await new Registry('https://example.test/r').resolve(['spinner']);

    expect(items.map((item) => item.name)).toEqual(['spinner']);
  });

  it('fetches each item once however many things depend on it', async () => {
    serve();
    await new Registry('https://example.test/r').resolve(['button', 'spinner', 'button']);

    expect(requests.filter((file) => file === 'spinner.json')).toHaveLength(1);
  });

  it('names the component that does not exist, and guesses', async () => {
    serve();
    await expect(new Registry('https://example.test/r').item('buton')).rejects.toThrow(
      /no component called "buton"/,
    );
  });
});

describe('Registry error handling', () => {
  it('reports an unreachable registry as such', async () => {
    vi.stubGlobal('fetch', () => Promise.reject(new Error('ECONNREFUSED')));

    await expect(new Registry('https://example.test/r').index()).rejects.toThrow(
      /Could not reach the registry/,
    );
  });

  it('reports a non-JSON response rather than a parse error', async () => {
    vi.stubGlobal('fetch', () => Promise.resolve(new Response('<!doctype html>', { status: 200 })));

    await expect(new Registry('https://example.test/r').index()).rejects.toThrow(
      /did not return JSON/,
    );
  });

  it('reports a server error with its status', async () => {
    vi.stubGlobal('fetch', () => Promise.resolve(new Response('nope', { status: 500 })));

    await expect(new Registry('https://example.test/r').index()).rejects.toThrow(/returned 500/);
  });
});

describe('suggest', () => {
  it('catches a typo', () => {
    expect(suggest('buton', ['button', 'badge'])).toBe('Did you mean "button"?');
  });

  it('says nothing when nothing is close', () => {
    expect(suggest('carousel', ['button', 'badge'])).toBeNull();
  });
});
