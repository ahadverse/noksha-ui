import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';
import type { AxeMatchers } from 'vitest-axe/matchers';
import * as axeMatchers from 'vitest-axe/matchers';

expect.extend(axeMatchers);

/**
 * vitest-axe@0.1.0 ships its declarations as a `declare global { namespace Vi }`
 * augmentation, which is the Vitest 1.x convention — Vitest 3 reads custom
 * matchers off the `Matchers` interface exported from the `vitest` module
 * instead, so the bundled types register nothing and `toHaveNoViolations()`
 * fails to typecheck. Re-declaring it here against the current interface is
 * what keeps `pnpm typecheck` honest about the a11y gate.
 */
declare module 'vitest' {
  // The parameter is unused but cannot be renamed to `_T`: TypeScript merges
  // interfaces only when the type parameters match upstream's name and default.
  // biome-ignore lint/suspicious/noExplicitAny: mirrors upstream's `Matchers<T = any>`.
  // biome-ignore lint/correctness/noUnusedVariables: see above.
  interface Matchers<T = any> extends AxeMatchers {}
}

afterEach(cleanup);
