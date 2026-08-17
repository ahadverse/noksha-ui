import type * as React from 'react';

export type SeparatorOrientation = 'horizontal' | 'vertical';

export interface SeparatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  orientation?: SeparatorOrientation;
  /**
   * Purely visual — the rule carries no meaning a screen reader needs.
   *
   * Default is `true`, because most separators in a UI are decoration between
   * things that are already grouped by other means. Set it to `false` for the
   * rules that genuinely divide sections of content, where the boundary is part
   * of the document's structure.
   */
  decorative?: boolean;
  /** Optional label rendered inside the rule, as in "or". */
  children?: React.ReactNode;
}
