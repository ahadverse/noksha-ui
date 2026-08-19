import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spinner } from './spinner.js';
import type { SpinnerVariant } from './spinner.types.js';

const VARIANTS: SpinnerVariant[] = [
  'ring',
  'arc',
  'dual',
  'dash',
  'segment',
  'comet',
  'dots',
  'bounce',
  'beat',
  'orbit',
  'halo',
  'bars',
  'wave',
  'spokes',
  'pulse',
  'ripple',
  'grid',
  'flip',
];

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
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('steps on every rung of the size scale', () => {
    const boxes = [
      'size-3',
      'size-3.5',
      'size-4',
      'size-5',
      'size-6',
      'size-8',
      'size-12',
      'size-16',
    ];
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const;

    // A scale with two rungs the same size is two names for one thing.
    expect(new Set(boxes).size).toBe(sizes.length);

    sizes.forEach((size, index) => {
      const { container, unmount } = render(<Spinner size={size} />);
      expect(container.firstElementChild).toHaveClass(boxes[index] as string);
      unmount();
    });
  });

  describe('variants', () => {
    it('ships eighteen designs, each of which renders something', () => {
      expect(VARIANTS).toHaveLength(18);

      for (const variant of VARIANTS) {
        const { container, unmount } = render(<Spinner variant={variant} label={null} />);
        const root = container.firstElementChild as HTMLElement;

        expect(root).toHaveAttribute('data-variant', variant);
        // Every design draws parts inside the box rather than styling the box
        // itself, so an empty root means a design that renders nothing.
        expect(root.childElementCount).toBeGreaterThan(0);
        unmount();
      }
    });

    it('keeps the accessibility contract identical across the set', () => {
      for (const variant of VARIANTS) {
        const { unmount } = render(<Spinner variant={variant} label="Working" />);
        expect(screen.getByRole('status')).toHaveAccessibleName('Working');
        unmount();
      }
    });

    it('sizes every design from the same box', () => {
      for (const variant of VARIANTS) {
        const { container, unmount } = render(<Spinner variant={variant} size="xl" label={null} />);
        expect(container.firstElementChild).toHaveClass('size-6');
        unmount();
      }
    });
  });

  describe('speed', () => {
    it('runs at the design tempo unless asked otherwise', () => {
      const { container } = render(<Spinner />);
      expect(container.firstElementChild).toHaveClass('[--noksha-spinner-speed:1]');
    });

    it('scales the tempo rather than replacing it', () => {
      const slow = render(<Spinner variant="bounce" speed="slow" label={null} />);
      const fast = render(<Spinner variant="bounce" speed="fast" label={null} />);

      // Both keep the bounce's own 1s tempo; only the multiplier differs, which
      // is what stops every design collapsing onto one duration at a setting.
      for (const { container } of [slow, fast]) {
        expect(container.firstElementChild).toHaveClass('[--noksha-spinner-duration:1s]');
      }

      expect(slow.container.firstElementChild).toHaveClass('[--noksha-spinner-speed:1.75]');
      expect(fast.container.firstElementChild).toHaveClass('[--noksha-spinner-speed:0.55]');
    });
  });

  describe('text', () => {
    it('announces the visible text rather than a hidden label', () => {
      render(<Spinner>Uploading 3 files</Spinner>);
      const status = screen.getByRole('status');

      // A live region is read out by its content, so a label on top of the
      // text would be a second name for something already spelled out.
      expect(status).toHaveTextContent('Uploading 3 files');
      expect(status).not.toHaveAttribute('aria-label');
    });

    it('sits the text on any of the four sides', () => {
      const sides = [
        ['end', 'flex-row'],
        ['start', 'flex-row-reverse'],
        ['bottom', 'flex-col'],
        ['top', 'flex-col-reverse'],
      ] as const;

      for (const [placement, direction] of sides) {
        const { container, unmount } = render(<Spinner placement={placement}>Loading</Spinner>);
        expect(container.firstElementChild).toHaveClass(direction);
        unmount();
      }
    });

    it('keeps sizing the mark rather than the group', () => {
      const { container } = render(<Spinner size="xl">Loading</Spinner>);
      expect(container.firstElementChild?.firstElementChild).toHaveClass('size-6');
    });

    it('drops the live region on a null label but leaves the text readable', () => {
      const { container } = render(<Spinner label={null}>Checking files</Spinner>);

      // The sentence is real content — hiding it with the mark would take the
      // only information in the group away from a screen reader.
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      expect(container.firstElementChild).not.toHaveAttribute('aria-hidden');
      expect(screen.getByText('Checking files')).toBeInTheDocument();
    });
  });

  describe('icon', () => {
    it('spins a caller-supplied mark in place of a design', () => {
      const { container } = render(<Spinner icon={<svg data-testid="mark" />} label={null} />);

      expect(screen.getByTestId('mark')).toBeInTheDocument();
      expect(container.firstElementChild).toHaveAttribute('data-variant', 'icon');
      expect(container.querySelector('.animate-noksha-spinner-spin')).not.toBeNull();
    });

    it('still takes its box and its tempo from the same props', () => {
      const { container } = render(<Spinner icon={<svg />} size="2xl" speed="fast" label={null} />);

      expect(container.firstElementChild).toHaveClass(
        'size-8',
        '[--noksha-spinner-speed:0.55]',
        '[--noksha-spinner-duration:1s]',
      );
    });

    it('drops the design tempo it replaces', () => {
      const { container } = render(<Spinner icon={<svg />} variant="dash" label={null} />);
      expect(container.firstElementChild).not.toHaveClass('[--noksha-spinner-duration:1.5s]');
    });
  });

  describe('motion', () => {
    it('keeps turning under prefers-reduced-motion, only slower', () => {
      const { container } = render(<Spinner />);

      // A frozen spinner reads as a hung UI, so this one slows rather than stops.
      expect(container.firstElementChild).toHaveClass('[--noksha-spinner-duration:700ms]');
      expect(container.firstElementChild).toHaveClass(
        'motion-reduce:[--noksha-spinner-duration:1800ms]',
      );
    });

    it('gives every design a tempo and a slower reduced-motion one', () => {
      for (const variant of VARIANTS) {
        const { container, unmount } = render(<Spinner variant={variant} label={null} />);
        const classes = (container.firstElementChild as HTMLElement).className;

        expect(classes).toContain('[--noksha-spinner-duration:');
        expect(classes).toContain('motion-reduce:[--noksha-spinner-duration:');
        unmount();
      }
    });
  });
});
