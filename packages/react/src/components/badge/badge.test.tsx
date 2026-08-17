import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { Badge } from './badge.js';

describe('Badge', () => {
  it('renders its label', () => {
    render(<Badge>Live</Badge>);
    expect(screen.getByText('Live')).toBeInTheDocument();
  });

  it('is a span, not an interactive element', () => {
    render(<Badge data-testid="badge">Live</Badge>);

    // A clickable badge is a different control with different a11y needs.
    // Keeping this inert is what stops it becoming an unfocusable fake button.
    expect(screen.getByTestId('badge').tagName).toBe('SPAN');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('hides the dot from assistive tech', () => {
    render(
      <Badge dot data-testid="badge">
        Live
      </Badge>,
    );

    const dot = screen.getByTestId('badge').querySelector('span[aria-hidden="true"]');
    expect(dot).not.toBeNull();
    // currentColor, so the dot stays visible on a solid fill too.
    expect(dot).toHaveClass('bg-current');
  });

  it('repaints from one tone class', () => {
    const { rerender } = render(<Badge data-testid="badge">Live</Badge>);
    const accent = screen.getByTestId('badge').className;

    rerender(
      <Badge data-testid="badge" tone="danger">
        Live
      </Badge>,
    );
    expect(screen.getByTestId('badge').className).not.toBe(accent);

    // One static class carries all seven slots. It has to be static: the rule
    // behind it is generated into the stylesheet, and a name built by string
    // interpolation is invisible to Tailwind's scanner — which is how tones
    // once shipped with every colour variable undefined.
    expect(screen.getByTestId('badge')).toHaveClass('noksha-tone-badge-danger');
  });

  it('renders the child element with asChild', () => {
    render(
      <Badge asChild>
        <a href="/releases">v1.2</a>
      </Badge>,
    );

    const link = screen.getByRole('link', { name: 'v1.2' });
    expect(link).toHaveClass('inline-flex');
  });

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Live</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('lets caller classes win', () => {
    render(
      <Badge data-testid="badge" className="rounded-none">
        Live
      </Badge>,
    );

    const classes = screen.getByTestId('badge').className;
    expect(classes).toContain('rounded-none');
    expect(classes).not.toContain('rounded-(--noksha-radius-full)');
  });
});
