import * as React from 'react';
import { composeRefs } from '../utils/compose-refs.js';
import { cx } from '../utils/cx.js';

type AnyProps = Record<string, unknown>;

/**
 * Reads the ref off an element across React versions: React 19 exposes it on
 * `props.ref`, React 18 on the element itself.
 */
function getElementRef(element: React.ReactElement): React.Ref<unknown> | undefined {
  const fromProps = (element.props as AnyProps | undefined)?.ref;
  if (fromProps !== undefined) return fromProps as React.Ref<unknown>;
  return (element as unknown as { ref?: React.Ref<unknown> }).ref;
}

/**
 * Merges the Slot's own props with the child's. The child wins on plain values,
 * but nothing is silently dropped:
 *
 * - event handlers are chained, child first, so a consumer's `onClick` runs
 *   alongside the library's rather than replacing it
 * - `className` goes through `cx()`, so Tailwind conflicts resolve properly
 * - `style` objects are merged, child last
 */
function mergeProps(slotProps: AnyProps, childProps: AnyProps): AnyProps {
  const merged: AnyProps = { ...slotProps, ...childProps };

  for (const key of Object.keys(childProps)) {
    const slotValue = slotProps[key];
    const childValue = childProps[key];

    const isHandler = /^on[A-Z]/.test(key);

    if (isHandler) {
      if (typeof slotValue === 'function' && typeof childValue === 'function') {
        merged[key] = (...args: unknown[]) => {
          (childValue as (...a: unknown[]) => unknown)(...args);
          (slotValue as (...a: unknown[]) => unknown)(...args);
        };
      } else if (slotValue) {
        merged[key] = slotValue;
      }
    } else if (key === 'style') {
      merged[key] = { ...(slotValue as object), ...(childValue as object) };
    } else if (key === 'className') {
      merged[key] = cx(slotValue as string, childValue as string);
    }
  }

  return merged;
}

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/**
 * Renders its props onto its child element instead of emitting a DOM node of
 * its own — the engine behind `asChild`.
 *
 * ```tsx
 * <Button asChild>
 *   <a href="/pricing">Pricing</a>
 * </Button>
 * // → <a href="/pricing" class="…button classes…">Pricing</a>
 * ```
 */
export const Slot = React.forwardRef<HTMLElement, SlotProps>(function Slot(props, forwardedRef) {
  const { children, ...slotProps } = props;
  const childrenArray = React.Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);

  if (slottable) {
    // `<Slottable>` marks which child receives the props; everything around it
    // (icons, spinners) is re-rendered in place. Without this, a Button with an
    // icon plus `asChild` would hand its props to the icon.
    const newElement = slottable.props.children;

    const newChildren = childrenArray.map((child) => {
      if (child !== slottable) return child;
      // Unwrap the Slottable and keep only the grandchild's own children.
      if (React.Children.count(newElement) > 1) return React.Children.only(null);
      return React.isValidElement(newElement)
        ? (newElement.props as { children?: React.ReactNode }).children
        : null;
    });

    return (
      <SlotClone {...slotProps} ref={forwardedRef}>
        {React.isValidElement(newElement)
          ? React.cloneElement(newElement, undefined, newChildren)
          : null}
      </SlotClone>
    );
  }

  return (
    <SlotClone {...slotProps} ref={forwardedRef}>
      {children}
    </SlotClone>
  );
});

const SlotClone = React.forwardRef<HTMLElement, SlotProps>(function SlotClone(props, forwardedRef) {
  const { children, ...slotProps } = props;

  if (!React.isValidElement(children)) {
    if (process.env.NODE_ENV !== 'production' && React.Children.count(children) > 1) {
      console.error(
        '[@noksha-ui/core] asChild expects exactly one React element child. ' +
          'Wrap the element you want the props on in <Slottable>.',
      );
    }
    return null;
  }

  const childRef = getElementRef(children);
  const merged = mergeProps(slotProps as AnyProps, children.props as AnyProps);

  return React.cloneElement(children, {
    ...merged,
    ref: forwardedRef ? composeRefs(forwardedRef, childRef as React.Ref<HTMLElement>) : childRef,
  } as never);
});

export interface SlottableProps {
  children?: React.ReactNode;
}

const SLOTTABLE = Symbol.for('noksha.slottable');

/**
 * Marks the child that `asChild` should merge props onto, when a component
 * renders siblings around it.
 */
export function Slottable({ children }: SlottableProps) {
  return <>{children}</>;
}

Slottable.displayName = 'Slottable';
(Slottable as unknown as Record<symbol, boolean>)[SLOTTABLE] = true;

function isSlottable(child: React.ReactNode): child is React.ReactElement<SlottableProps> {
  return (
    React.isValidElement(child) &&
    typeof child.type === 'function' &&
    SLOTTABLE in (child.type as unknown as Record<symbol, boolean>)
  );
}
