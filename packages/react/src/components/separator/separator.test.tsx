import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { Separator } from './separator.js';

describe('Separator', () => {
  it('is decorative by default and stays out of the a11y tree', () => {
    render(<Separator data-testid="rule" />);

    // "separator, separator, separator" between list rows is noise; the rule
    // only earns a role when it genuinely divides sections.
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    expect(screen.getByTestId('rule')).toHaveAttribute('role', 'none');
  });

  it('announces itself when it is meaningful', () => {
    render(<Separator decorative={false} />);

    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('carries the orientation through to aria and data attributes', () => {
    render(<Separator decorative={false} orientation="vertical" />);

    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
  });

  it('renders a label between two hairlines', () => {
    render(<Separator decorative={false}>or</Separator>);

    const separator = screen.getByRole('separator');
    expect(separator).toHaveTextContent('or');
    expect(separator.querySelectorAll('span')).toHaveLength(2);
  });

  it('draws a bare rule with no children', () => {
    render(<Separator data-testid="rule" />);
    expect(screen.getByTestId('rule').children).toHaveLength(0);
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Separator ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('lets caller classes win', () => {
    render(<Separator data-testid="rule" className="bg-red-500" />);
    expect(screen.getByTestId('rule').className).toContain('bg-red-500');
    expect(screen.getByTestId('rule').className).not.toContain('bg-(--noksha-border-subtle)');
  });
});
