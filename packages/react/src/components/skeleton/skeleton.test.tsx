import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skeleton } from './skeleton.js';
import type { SkeletonTone, SkeletonVariant } from './skeleton.types.js';

const VARIANTS: SkeletonVariant[] = [
  'pulse',
  'breathe',
  'blink',
  'fade',
  'shimmer',
  'wave',
  'sheen',
  'slide',
  'ripple',
  'glow',
  'bar',
  'gradient',
  'stripe',
  'grid',
  'dots',
  'outline',
  'dashed',
  'flat',
];

const TONES: SkeletonTone[] = ['accent', 'neutral', 'danger', 'success', 'warning', 'info'];

describe('Skeleton', () => {
  it('stays out of the accessibility tree by default', () => {
    const { container } = render(<Skeleton />);

    // A placeholder is furniture: the region it stands in for is what should
    // carry aria-busy, and two announcements for one wait is one too many.
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('announces itself when given a label', () => {
    render(<Skeleton label="Loading profile" />);
    expect(screen.getByRole('status')).toHaveAccessibleName('Loading profile');
  });

  describe('variants', () => {
    it('ships eighteen treatments, each marked on the element', () => {
      expect(VARIANTS).toHaveLength(18);

      for (const variant of VARIANTS) {
        const { container, unmount } = render(<Skeleton variant={variant} />);
        expect(container.firstElementChild).toHaveAttribute('data-variant', variant);
        unmount();
      }
    });

    it('gives every moving treatment a tempo and a slower reduced-motion one', () => {
      const still = new Set(['outline', 'dashed', 'flat']);

      for (const variant of VARIANTS) {
        if (still.has(variant)) continue;

        const { container, unmount } = render(<Skeleton variant={variant} />);
        const classes = (container.firstElementChild as HTMLElement).className;

        expect(classes, variant).toContain('[--noksha-skeleton-duration:');
        expect(classes, variant).toContain('motion-reduce:[--noksha-skeleton-duration:');
        unmount();
      }
    });

    it('leaves the three still treatments unanimated', () => {
      for (const variant of ['outline', 'dashed', 'flat'] as const) {
        const { container, unmount } = render(<Skeleton variant={variant} />);
        const root = container.firstElementChild as HTMLElement;

        expect(root.className).not.toContain('animate-noksha-skeleton');
        expect(root.childElementCount).toBe(0);
        unmount();
      }
    });

    it('draws the travelling treatments on an overlay rather than the box', () => {
      for (const variant of [
        'shimmer',
        'wave',
        'sheen',
        'slide',
        'ripple',
        'glow',
        'bar',
      ] as const) {
        const { container, unmount } = render(<Skeleton variant={variant} />);
        expect(
          container.querySelector('[class*="animate-noksha-skeleton"]'),
          variant,
        ).not.toBeNull();
        unmount();
      }
    });
  });

  describe('colour', () => {
    it('reaches every tone through one class', () => {
      for (const tone of TONES) {
        const { container, unmount } = render(<Skeleton tone={tone} />);
        expect(container.firstElementChild).toHaveClass(`noksha-tone-sk-${tone}`);
        unmount();
      }
    });

    it('paints from the tone slots rather than a fixed grey', () => {
      const { container } = render(<Skeleton tone="danger" />);
      expect(container.firstElementChild).toHaveClass('bg-(--sk-subtle)');
    });
  });

  describe('shape', () => {
    it('carries a default box for each outline', () => {
      const boxes = [
        ['text', 'h-4'],
        ['rect', 'h-24'],
        ['rounded', 'h-24'],
        ['circle', 'size-10'],
        ['pill', 'w-28'],
      ] as const;

      for (const [shape, box] of boxes) {
        const { container, unmount } = render(<Skeleton shape={shape} />);
        expect(container.firstElementChild, shape).toHaveClass(box);
        unmount();
      }
    });
  });

  describe('flex behaviour', () => {
    it('shrinks with the row it sits in, except for a disc', () => {
      // A fixed-width placeholder that refuses to shrink pushes itself out of
      // the card it is standing in for, which is worse than being narrow.
      const bar = render(<Skeleton shape="pill" />);
      expect(bar.container.firstElementChild).not.toHaveClass('shrink-0');
      bar.unmount();

      const disc = render(<Skeleton shape="circle" />);
      expect(disc.container.firstElementChild).toHaveClass('shrink-0');
    });
  });

  describe('size', () => {
    it('measures whatever the shape is: a line, a disc, a block', () => {
      const rungs = [
        ['text', 'xs', 'h-2.5'],
        ['text', 'xl', 'h-6'],
        ['rounded', 'xs', 'h-12'],
        ['rounded', 'xl', 'h-40'],
        ['circle', 'xs', 'size-6'],
        ['circle', 'xl', 'size-20'],
        ['pill', 'xs', 'w-20'],
        ['pill', 'xl', 'w-44'],
      ] as const;

      for (const [shape, size, box] of rungs) {
        const { container, unmount } = render(<Skeleton shape={shape} size={size} />);
        expect(container.firstElementChild, `${shape}/${size}`).toHaveClass(box);
        unmount();
      }
    });

    it('steps every rung of the scale to a different box', () => {
      const boxes = (['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => {
        const { container, unmount } = render(<Skeleton shape="circle" size={size} />);
        const classes = (container.firstElementChild as HTMLElement).className;
        unmount();
        return classes.split(' ').find((name) => name.startsWith('size-'));
      });

      expect(new Set(boxes).size).toBe(5);
    });
  });

  describe('lines', () => {
    it('renders one element when it is a single line', () => {
      const { container } = render(<Skeleton />);
      expect(container.firstElementChild?.childElementCount).toBe(0);
    });

    it('stacks the rows it is asked for and shortens the last', () => {
      const { container } = render(<Skeleton lines={4} />);
      const rows = container.firstElementChild as HTMLElement;

      expect(rows.childElementCount).toBe(4);
      expect(rows.lastElementChild).toHaveClass('w-3/5');
      expect(rows.firstElementChild).not.toHaveClass('w-3/5');
    });

    it('staggers the rows so the sweep reads as one paragraph', () => {
      const { container } = render(<Skeleton lines={3} variant="shimmer" />);
      const rows = [...(container.firstElementChild as HTMLElement).children] as HTMLElement[];

      expect(rows.map((row) => row.style.getPropertyValue('--sk-delay'))).toEqual([
        '0ms',
        '140ms',
        '280ms',
      ]);
    });
  });

  describe('speed', () => {
    it('scales the treatment tempo rather than replacing it', () => {
      const slow = render(<Skeleton variant="wave" speed="slow" />);
      const fast = render(<Skeleton variant="wave" speed="fast" />);

      for (const { container } of [slow, fast]) {
        expect(container.firstElementChild).toHaveClass('[--noksha-skeleton-duration:2s]');
      }

      expect(slow.container.firstElementChild).toHaveClass('[--noksha-skeleton-speed:1.75]');
      expect(fast.container.firstElementChild).toHaveClass('[--noksha-skeleton-speed:0.55]');
    });
  });
});
