import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type * as React from 'react';

/**
 * A copyable example.
 *
 * `Component` and the code shown under it are the *same file* — the source is
 * read off disk rather than written out a second time in a template string.
 * That is the whole reason demos are real modules: a snippet that drifts from
 * what it renders is worse than no snippet, and there is no way for these two
 * to disagree.
 */
export interface Demo {
  /** File name without its extension, unique inside the component's folder. */
  id: string;
  title: string;
  description?: string;
  Component: React.ComponentType;
  /**
   * Preview sizing hints. Overlays need room to open downwards; a lone switch
   * looks lost in a tall box.
   */
  minHeight?: number;
  /** Lay the preview out as a column instead of a wrapped row. */
  stack?: boolean;
}

const demosDir = join(process.cwd(), 'src', 'demos');

/**
 * Pages are statically generated, so this runs at build time and the file tree
 * never has to exist at request time.
 */
export async function readDemoSource(component: string, id: string): Promise<string> {
  return (await readFile(join(demosDir, component, `${id}.tsx`), 'utf8')).trim();
}
