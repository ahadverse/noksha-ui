import { describe, expect, it } from 'vitest';
import { pv } from './pv.js';

const button = pv({
  base: 'inline-flex items-center rounded-md',
  variants: {
    variant: {
      solid: 'bg-accent-solid text-accent-on-solid',
      ghost: 'bg-transparent text-accent-fg',
    },
    size: { sm: 'h-8 px-3', md: 'h-10 px-4' },
    loading: { true: 'pointer-events-none', false: '' },
  },
  compoundVariants: [{ variant: 'ghost', size: 'sm', class: 'tracking-tight' }],
  defaultVariants: { variant: 'solid', size: 'md', loading: false },
});

describe('pv', () => {
  it('applies base plus the defaults when called with nothing', () => {
    const result = button();
    expect(result).toContain('inline-flex');
    expect(result).toContain('bg-accent-solid');
    expect(result).toContain('h-10');
  });

  it('lets an explicit value override a default', () => {
    expect(button({ size: 'sm' })).toContain('h-8');
    expect(button({ size: 'sm' })).not.toContain('h-10');
  });

  it('treats undefined as absent so spread props do not knock out defaults', () => {
    // This is the case that bites when a parent forwards `{...rest}` and the
    // consumer never set `size` — the default must survive.
    expect(button({ size: undefined })).toContain('h-10');
  });

  it('treats null as an explicit opt-out of one variant', () => {
    const result = button({ size: null });
    expect(result).not.toContain('h-10');
    expect(result).not.toContain('h-8');
    expect(result).toContain('bg-accent-solid');
  });

  it('accepts real booleans for true/false variants', () => {
    expect(button({ loading: true })).toContain('pointer-events-none');
    expect(button({ loading: false })).not.toContain('pointer-events-none');
  });

  it('applies a compound variant only when every condition matches', () => {
    expect(button({ variant: 'ghost', size: 'sm' })).toContain('tracking-tight');
    expect(button({ variant: 'ghost', size: 'md' })).not.toContain('tracking-tight');
    expect(button({ variant: 'solid', size: 'sm' })).not.toContain('tracking-tight');
  });

  it('matches a compound variant against defaults, not just explicit props', () => {
    const chip = pv({
      variants: { tone: { accent: 'a', danger: 'd' }, outlined: { true: 'o', false: '' } },
      compoundVariants: [{ tone: 'danger', outlined: true, class: 'ring-danger' }],
      defaultVariants: { tone: 'danger', outlined: true },
    });
    expect(chip()).toContain('ring-danger');
  });

  it('accepts an array of options in a compound variant', () => {
    const chip = pv({
      variants: { size: { sm: 's', md: 'm', lg: 'l' } },
      compoundVariants: [{ size: ['sm', 'md'], class: 'compact' }],
      defaultVariants: { size: 'md' },
    });
    expect(chip({ size: 'sm' })).toContain('compact');
    expect(chip({ size: 'md' })).toContain('compact');
    expect(chip({ size: 'lg' })).not.toContain('compact');
  });

  it('lets the caller className win a Tailwind conflict', () => {
    // The whole point of routing through cx(): h-10 from the variant is replaced,
    // not merely outranked in the cascade.
    const result = button({ className: 'h-16' });
    expect(result).toContain('h-16');
    expect(result).not.toContain('h-10');
  });

  it('accepts class as an alias for className', () => {
    expect(button({ class: 'w-full' })).toContain('w-full');
  });

  it('works with no variants at all', () => {
    expect(pv({ base: 'block' })()).toBe('block');
    expect(pv({})()).toBe('');
  });

  it('exposes its definition for tooling', () => {
    expect(Object.keys(button.variants ?? {})).toEqual(['variant', 'size', 'loading']);
    expect(button.defaultVariants).toMatchObject({ variant: 'solid', size: 'md' });
  });

  it('ignores an option that does not exist rather than emitting undefined', () => {
    // @ts-expect-error — 'xl' is not a declared size.
    expect(button({ size: 'xl' })).not.toContain('undefined');
  });
});

describe('pv types', () => {
  it('requires variants that have no default and allows those that do', () => {
    const strict = pv({
      variants: {
        tone: { accent: 'a', danger: 'd' },
        size: { sm: 's', md: 'm' },
      },
      defaultVariants: { size: 'md' },
    });

    // `tone` has no default, so it must be supplied — this is what CVA misses.
    // @ts-expect-error — tone is required.
    strict({});
    // @ts-expect-error — tone is required even when another variant is given.
    strict({ size: 'sm' });

    expect(strict({ tone: 'accent' })).toContain('a');
    expect(strict({ tone: 'accent', size: 'sm' })).toContain('s');
  });

  it('rejects an unknown option for a known variant', () => {
    // @ts-expect-error — 'huge' is not a declared size.
    expect(button({ size: 'huge' })).toBeTypeOf('string');
  });
});
