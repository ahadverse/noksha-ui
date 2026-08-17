/**
 * The accessibility gate: axe over every story, zero violations (ARCHITECTURE.md §8).
 *
 * It reaches the stories through a glob rather than an import list, so the gate
 * cannot be bypassed by forgetting to register a component here — a new
 * `*.stories.tsx` file is picked up the moment it exists. That matters more
 * than it sounds: an a11y suite you have to opt into stops covering the
 * components added after everyone stopped thinking about it.
 *
 * Two rules are switched off, both because jsdom cannot answer them rather
 * than because the library is excused from them:
 *
 * - `color-contrast` needs real layout and computed colours. Every token pair
 *   is already checked against WCAG at generation time in `@noksha-ui/tokens`,
 *   and the rendered result is checked in the Playwright run.
 * - `region` wants top-level content inside a landmark. Stories are fragments
 *   mounted into a bare div — the page they would live in supplies the landmark.
 */
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import type { StoryGroup } from './stories.js';

const AXE_OPTIONS = {
  rules: {
    'color-contrast': { enabled: false },
    region: { enabled: false },
  },
} as const;

const modules = import.meta.glob<Record<string, unknown>>('./components/*/*.stories.tsx', {
  eager: true,
});

function isStoryGroup(value: unknown): value is StoryGroup {
  return (
    typeof value === 'object' &&
    value !== null &&
    'component' in value &&
    Array.isArray((value as StoryGroup).stories)
  );
}

const groups = Object.values(modules)
  .flatMap((module) => Object.values(module))
  .filter(isStoryGroup)
  .sort((a, b) => a.component.localeCompare(b.component));

// A glob that silently matches nothing would turn this whole file into a
// no-op that still reports as passing — the one failure mode a gate must not have.
it('found the story files', () => {
  expect(groups.length).toBeGreaterThanOrEqual(20);
});

describe.each(groups.map((group) => [group.component, group] as const))(
  'a11y: %s',
  (_component, group) => {
    it.each(group.stories.map((story) => [story.name, story] as const))(
      '%s has no axe violations',
      async (_name, story) => {
        // biome-ignore lint/complexity/noUselessFragments: load-bearing — `render` takes a ReactElement, and a story renders to the wider ReactNode.
        const { container } = render(<>{story.render()}</>);
        expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
      },
      20_000,
    );
  },
);
