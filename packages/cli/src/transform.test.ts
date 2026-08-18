import { describe, expect, it } from 'vitest';

import { needsUseClient, rewriteImports, transform } from './transform.js';

const withAlias = { alias: '@/components/ui' };
const relative = { alias: null };

describe('rewriteImports', () => {
  it('flattens the internal helpers up one level', () => {
    const source = "import { toneVariants } from '../../internal/tone.js';";

    expect(rewriteImports(source, withAlias)).toBe(
      "import { toneVariants } from '@/components/ui/internal/tone';",
    );
    expect(rewriteImports(source, relative)).toBe(
      "import { toneVariants } from '../internal/tone';",
    );
  });

  it('keeps a sibling component at the same depth', () => {
    const source = "import { Spinner } from '../spinner/spinner.js';";

    expect(rewriteImports(source, withAlias)).toBe(
      "import { Spinner } from '@/components/ui/spinner/spinner';",
    );
    expect(rewriteImports(source, relative)).toBe("import { Spinner } from '../spinner/spinner';");
  });

  /**
   * The extension is the part that actually breaks a consumer's build: TypeScript
   * resolves `./button.types.js` back to the `.ts` file, but the bundler sees the
   * emitted import and looks for a `.js` that was never written.
   */
  it('drops the .js extension from same-directory imports', () => {
    expect(rewriteImports("import type { P } from './button.types.js';", withAlias)).toBe(
      "import type { P } from './button.types';",
    );
    expect(rewriteImports("import { v } from './button.variants.js';", relative)).toBe(
      "import { v } from './button.variants';",
    );
  });

  it('leaves the package dependency alone', () => {
    const source = "import { Slot } from '@noksha-ui/core';\nimport * as React from 'react';";
    expect(rewriteImports(source, withAlias)).toBe(source);
  });

  it('handles double quotes as well as single', () => {
    expect(rewriteImports('from "../../internal/tone.js"', withAlias)).toBe(
      'from "@/components/ui/internal/tone"',
    );
  });

  it('does not touch a .js inside a string that is not an import', () => {
    const source = "const help = 'see button.js for details';";
    expect(rewriteImports(source, withAlias)).toBe(source);
  });
});

describe('needsUseClient', () => {
  it('marks anything touching the React runtime', () => {
    expect(needsUseClient('button/button.tsx', "import * as React from 'react';")).toBe(true);
  });

  /** The barrel is what a consumer imports, so it is where the boundary lands. */
  it('marks a component barrel', () => {
    expect(needsUseClient('button/index.ts', "export { Button } from './button';")).toBe(true);
  });

  it('leaves type and variant files alone', () => {
    expect(needsUseClient('button/button.types.ts', 'export interface ButtonProps {}')).toBe(false);
    expect(
      needsUseClient('button/button.variants.ts', "import { pv } from '@noksha-ui/core';"),
    ).toBe(false);
  });

  it('does not double-stamp', () => {
    expect(needsUseClient('button/button.tsx', "'use client';\nimport 'react';")).toBe(false);
  });
});

describe('transform', () => {
  it('rewrites and stamps in one pass', () => {
    const source = [
      "import * as React from 'react';",
      "import { Spinner } from '../spinner/spinner.js';",
      "import type { ButtonProps } from './button.types.js';",
    ].join('\n');

    expect(transform('button/button.tsx', source, withAlias)).toBe(
      [
        "'use client';",
        '',
        "import * as React from 'react';",
        "import { Spinner } from '@/components/ui/spinner/spinner';",
        "import type { ButtonProps } from './button.types';",
      ].join('\n'),
    );
  });

  /**
   * `diff` compares a local file against the transform's output, so the same
   * input has to produce the same bytes every time — otherwise every component
   * would read as locally modified on the next run.
   */
  it('is stable under repetition', () => {
    const source = "import * as React from 'react';\nimport { x } from '../../internal/tone.js';";
    const once = transform('button/button.tsx', source, withAlias);

    expect(transform('button/button.tsx', once, withAlias)).toBe(once);
  });
});
