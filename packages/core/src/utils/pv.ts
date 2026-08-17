import { type ClassValue, cx } from './cx.js';

/** `{ size: { sm: '…', md: '…' } }` — a variant name mapped to its options. */
export type VariantShape = Record<string, Record<string, ClassValue>>;

/**
 * The values a single variant accepts. A variant whose options are `true` /
 * `false` accepts real booleans, so `<Button loading />` type-checks without
 * the caller writing `loading="true"`.
 */
export type VariantValue<Options> = 'true' extends keyof Options
  ? boolean | (keyof Options & string)
  : keyof Options & string;

/** Every variant, all optional and nullable — used for defaults and matching. */
export type VariantSelection<V extends VariantShape> = {
  [K in keyof V]?: VariantValue<V[K]> | null;
};

/**
 * The props the generated function accepts.
 *
 * Variants covered by `defaultVariants` are optional; the rest are required.
 * This is the inference win over CVA, which makes every variant optional and so
 * lets `button({})` compile even when `size` has no default and the component
 * ends up with no size class at all.
 */
export type VariantProps<V extends VariantShape, D> = {
  [K in keyof V as K extends keyof D ? never : K]: VariantValue<V[K]> | null;
} & {
  [K in keyof V as K extends keyof D ? K : never]?: VariantValue<V[K]> | null;
};

export type CompoundVariant<V extends VariantShape> = {
  [K in keyof V]?: VariantValue<V[K]> | ReadonlyArray<VariantValue<V[K]>>;
} & {
  class?: ClassValue;
  className?: ClassValue;
};

export interface PvConfig<V extends VariantShape, D extends VariantSelection<V>> {
  /** Classes applied to every instance. */
  base?: ClassValue;
  variants?: V;
  /** Classes applied only when several variants line up at once. */
  compoundVariants?: ReadonlyArray<CompoundVariant<V>>;
  defaultVariants?: D;
}

export type PvFunction<V extends VariantShape, D extends VariantSelection<V>> = ((
  props?: VariantProps<V, D> & { class?: ClassValue; className?: ClassValue },
) => string) & {
  /** Introspection for the docs site and the CLI registry. */
  readonly variants: V | undefined;
  readonly defaultVariants: D | undefined;
};

/**
 * Builds a class-name function from a variant definition.
 *
 * ```ts
 * const button = pv({
 *   base: 'inline-flex items-center rounded-md',
 *   variants: {
 *     variant: { solid: 'bg-accent-solid', ghost: 'bg-transparent' },
 *     size: { sm: 'h-8 px-3', md: 'h-10 px-4' },
 *   },
 *   defaultVariants: { variant: 'solid', size: 'md' },
 * });
 *
 * button({ size: 'sm', className: 'w-full' });
 * ```
 *
 * The returned function always merges `className` last, so caller classes win.
 */
export function pv<const V extends VariantShape, const D extends VariantSelection<V>>(
  config: PvConfig<V, D>,
): PvFunction<V, D> {
  const { base, variants, compoundVariants, defaultVariants } = config;

  const fn = (props?: Record<string, unknown>): string => {
    const { class: classProp, className, ...selection } = props ?? {};

    /**
     * `undefined` falls through to the default — spreading optional props must
     * not knock a variant out. An explicit `null` does knock it out, which is
     * how a caller opts a single variant off without redefining the component.
     */
    const resolve = (name: string): unknown => {
      const given = selection[name];
      if (given !== undefined) return given;
      return (defaultVariants as Record<string, unknown> | undefined)?.[name];
    };

    const classes: ClassValue[] = [base];

    if (variants) {
      for (const name of Object.keys(variants)) {
        const value = resolve(name);
        if (value === null || value === undefined) continue;
        classes.push(variants[name]?.[String(value)]);
      }
    }

    if (compoundVariants) {
      for (const compound of compoundVariants) {
        const {
          class: cvClass,
          className: cvClassName,
          ...conditions
        } = compound as Record<string, unknown>;

        const matches = Object.keys(conditions).every((name) => {
          const expected = conditions[name];
          const actual = resolve(name);
          return Array.isArray(expected)
            ? expected.some((option) => String(option) === String(actual))
            : String(expected) === String(actual);
        });

        if (matches) classes.push(cvClass as ClassValue, cvClassName as ClassValue);
      }
    }

    // Caller classes go last so tailwind-merge resolves them as the winner.
    classes.push(classProp as ClassValue, className as ClassValue);

    return cx(classes);
  };

  return Object.assign(fn as PvFunction<V, D>, {
    variants,
    defaultVariants,
  }) as PvFunction<V, D>;
}

/** Extracts the props type from a `pv()` result, for a component's own props. */
export type VariantPropsOf<F> = F extends PvFunction<infer V, infer D> ? VariantProps<V, D> : never;
