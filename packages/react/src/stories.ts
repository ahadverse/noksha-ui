import type * as React from 'react';

/**
 * The shape of a dev-harness story.
 *
 * Deliberately tiny and framework-free: the same array feeds the local preview
 * builder, the docs site, and the Playwright visual-regression run, so a
 * component's states are declared once (ARCHITECTURE.md §8).
 *
 * Story files are not part of any build entry, so none of this ships.
 */
export interface Story {
  name: string;
  description?: string;
  /** Rendered inside a flex row with a gap; return a fragment for multiples. */
  render: () => React.ReactNode;
}

export interface StoryGroup {
  component: string;
  stories: Story[];
}
