import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spinner } from './spinner.js';

describe('Spinner', () => {
  it('announces itself as a status region by default', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAccessibleName('Loading');
  });

  it('takes a custom label', () => {
    render(<Spinner label="Uploading" />);
    expect(screen.getByRole('status')).toHaveAccessibleName('Uploading');
  });

  it('goes silent when label is null', () => {
    const { container } = render(<Spinner label={null} />);

    // Inside a control that already announces `aria-busy`, a second live region
    // would make the state be read out twice.
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('sizes from the shared control scale', () => {
    const { container } = render(<Spinner size="lg" />);
    expect(container.querySelector('svg')).toHaveClass('size-5');
  });

  it('keeps turning under prefers-reduced-motion, only slower', () => {
    const { container } = render(<Spinner />);

    // A frozen spinner reads as a hung UI, so this one slows rather than stops.
    expect(container.querySelector('svg')?.className.baseVal ?? '').toContain(
      'motion-reduce:[animation-duration:1800ms]',
    );
  });
});
