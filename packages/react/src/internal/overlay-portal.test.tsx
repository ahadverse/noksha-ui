import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { OverlayPortal } from './overlay-portal.js';

/** The wrapper the bridge renders inside the portal, whatever else is around it. */
function bridgeOf(node: HTMLElement): HTMLElement | null {
  return node.closest('[style*="display: contents"]');
}

afterEach(() => {
  document.documentElement.className = '';
  document.documentElement.removeAttribute('data-theme');
});

describe('OverlayPortal', () => {
  it('still portals to the body', () => {
    render(
      <div data-testid="host">
        <OverlayPortal>
          <span data-testid="content" />
        </OverlayPortal>
      </div>,
    );

    const content = screen.getByTestId('content');
    expect(document.body.contains(content)).toBe(true);
    expect(screen.getByTestId('host').contains(content)).toBe(false);
  });

  it('mirrors a class marker from a wrapper the portal escaped', () => {
    render(
      <div className="dark">
        <OverlayPortal>
          <span data-testid="content" />
        </OverlayPortal>
      </div>,
    );

    expect(bridgeOf(screen.getByTestId('content'))).toHaveClass('dark');
  });

  it('mirrors a data-theme marker too', () => {
    render(
      <div data-theme="dark">
        <OverlayPortal>
          <span data-testid="content" />
        </OverlayPortal>
      </div>,
    );

    expect(bridgeOf(screen.getByTestId('content'))).toHaveAttribute('data-theme', 'dark');
  });

  it('mirrors the nearest marker, so a light island stays light', () => {
    render(
      <div className="dark">
        <div className="light">
          <OverlayPortal>
            <span data-testid="content" />
          </OverlayPortal>
        </div>
      </div>,
    );

    const bridge = bridgeOf(screen.getByTestId('content'));
    expect(bridge).toHaveClass('light');
    expect(bridge).not.toHaveClass('dark');
  });

  it('adds nothing when the theme is declared at the root, where it already reaches', () => {
    document.documentElement.classList.add('dark');

    render(
      <div>
        <OverlayPortal>
          <span data-testid="content" />
        </OverlayPortal>
      </div>,
    );

    expect(bridgeOf(screen.getByTestId('content'))?.className).toBe('');
  });

  it('follows the host when the app toggles theme with the overlay open', async () => {
    const host = document.createElement('div');
    host.className = 'light';
    document.body.appendChild(host);

    render(
      <OverlayPortal>
        <span data-testid="content" />
      </OverlayPortal>,
      { container: host },
    );

    expect(bridgeOf(screen.getByTestId('content'))).toHaveClass('light');

    // A MutationObserver delivers on a microtask, so the await is what makes
    // this deterministic rather than racy.
    await act(async () => {
      host.classList.replace('light', 'dark');
    });

    expect(bridgeOf(screen.getByTestId('content'))).toHaveClass('dark');
  });
});
