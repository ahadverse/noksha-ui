import { composeRefs, useIsomorphicLayoutEffect } from '@noksha-ui/core';
import * as React from 'react';
import { useFieldControl } from '../field/field.js';
import type { TextareaProps } from './textarea.types.js';
import { textareaVariants } from './textarea.variants.js';

/**
 * A multi-line text field, optionally growing with its content.
 *
 * ```tsx
 * <Textarea autoSize minRows={3} maxRows={12} placeholder="Release notes" />
 * ```
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    variant = 'outline',
    size = 'md',
    invalid,
    autoSize = false,
    minRows = 3,
    maxRows,
    resize,
    className,
    onInput,
    ...rest
  },
  forwardedRef,
) {
  const innerRef = React.useRef<HTMLTextAreaElement>(null);

  const field = useFieldControl({
    id: rest.id,
    disabled: rest.disabled,
    required: rest.required,
    'aria-invalid': invalid || undefined,
    'aria-describedby': rest['aria-describedby'],
  });

  /**
   * Measured from `scrollHeight` after collapsing the box, not from counting
   * newlines. Counting is what most implementations do and it is wrong the
   * moment a line wraps — which is most of the time in a narrow column.
   */
  const autoFit = React.useCallback(() => {
    const element = innerRef.current;
    if (!element || !autoSize) return;

    const style = window.getComputedStyle(element);

    // Every one of these can come back as a keyword or an empty string —
    // `line-height: normal` is the common case, and it is what turns the whole
    // calculation into NaN and the height into an invalid, ignored value.
    const px = (value: string): number => {
      const parsed = Number.parseFloat(value);
      return Number.isFinite(parsed) ? parsed : 0;
    };

    const fontSize = px(style.fontSize) || 16;
    const lineHeight = px(style.lineHeight) || fontSize * 1.5;
    const vertical =
      px(style.paddingTop) +
      px(style.paddingBottom) +
      px(style.borderTopWidth) +
      px(style.borderBottomWidth);

    // Collapse first: scrollHeight never reports *less* than the current
    // height, so without this the box can only ever grow.
    element.style.height = 'auto';

    const min = minRows * lineHeight + vertical;
    const max = maxRows ? maxRows * lineHeight + vertical : Number.POSITIVE_INFINITY;
    const next = Math.min(Math.max(element.scrollHeight, min), max);

    element.style.height = `${next}px`;
    element.style.overflowY = element.scrollHeight > max ? 'auto' : 'hidden';
  }, [autoSize, minRows, maxRows]);

  // Layout effect, so the first paint is already the right height — a textarea
  // that resizes after paint is a visible jump on every page load.
  useIsomorphicLayoutEffect(autoFit, [autoFit, rest.value, rest.defaultValue]);

  return (
    <textarea
      ref={composeRefs(forwardedRef, innerRef)}
      rows={rest.rows ?? minRows}
      {...rest}
      {...field}
      onInput={(event) => {
        autoFit();
        onInput?.(event);
      }}
      className={textareaVariants({
        variant,
        size,
        // A box that both auto-sizes and can be dragged fights the user: the
        // next keystroke snaps it back to the content height.
        resize: autoSize ? 'none' : resize,
        className,
      })}
    />
  );
});

Textarea.displayName = 'Textarea';

export { textareaVariants };
