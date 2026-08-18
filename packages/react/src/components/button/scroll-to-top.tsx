import * as React from 'react';
import { Button } from './button.js';
import type { ScrollToTopProps } from './button.types.js';
import { anchorStyle } from './floating.js';

const ArrowUpIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const ScrollToTop = React.forwardRef<HTMLButtonElement, ScrollToTopProps>(
  function ScrollToTop(
    {
      showAfter = 400,
      placement = 'bottom-right',
      offset = 24,
      container,
      label = 'Back to top',
      focusTarget,
      variant = 'solid',
      size = 'lg',
      icon,
      className,
      style,
      onClick,
      ...rest
    },
    ref,
  ) {
    const [visible, setVisible] = React.useState(false);
    const scoped = Boolean(container);

    React.useEffect(() => {
      const element = container?.current ?? null;
      const source: HTMLElement | Window = element ?? window;

      let frame = 0;

      const read = () => {
        frame = 0;
        const distance = element ? element.scrollTop : window.scrollY;
        setVisible(distance > showAfter);
      };

      const onScroll = () => {
        if (frame === 0) frame = requestAnimationFrame(read);
      };

      read();
      source.addEventListener('scroll', onScroll, { passive: true });

      return () => {
        source.removeEventListener('scroll', onScroll);
        if (frame !== 0) cancelAnimationFrame(frame);
      };
    }, [showAfter, container]);

    const toTop = React.useCallback(() => {
      const element = container?.current ?? null;
      const behavior = prefersReducedMotion() ? 'auto' : 'smooth';

      if (element) element.scrollTo({ top: 0, behavior });
      else window.scrollTo({ top: 0, behavior });

      const target = focusTarget
        ? document.querySelector<HTMLElement>(focusTarget)
        : (element ?? document.body);

      if (!target) return;
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }, [container, focusTarget]);

    return (
      <div
        className="pointer-events-none z-(--noksha-z-sticky)"
        style={{ ...anchorStyle(placement, offset, scoped), ...style }}
      >
        <Button
          {...rest}
          ref={ref}
          iconOnly
          aria-label={label}
          variant={variant}
          size={size}
          icon={icon ?? <ArrowUpIcon />}
          className={[
            'pointer-events-auto rounded-full shadow-(--noksha-shadow-lg)',
            'transition-[opacity,transform,visibility] duration-(--noksha-duration-normal) ease-out',
            visible ? 'visible opacity-100' : 'invisible translate-y-2 opacity-0',
            'motion-reduce:translate-y-0 motion-reduce:transition-none',
            className ?? '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(event);
            if (!event.defaultPrevented) toTop();
          }}
        />
      </div>
    );
  },
);
ScrollToTop.displayName = 'ScrollToTop';
