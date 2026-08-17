import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Portal } from './portal.js';

describe('Portal', () => {
  it('renders into document.body by default', () => {
    const { container } = render(
      <div data-testid="origin">
        <Portal>
          <span data-testid="content">portalled</span>
        </Portal>
      </div>,
    );

    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
    expect(container.querySelector('[data-testid="content"]')).toBeNull();
    expect(content.parentElement).toBe(document.body);
  });

  it('renders into a supplied container', () => {
    const target = document.createElement('div');
    target.id = 'overlay-root';
    document.body.append(target);

    render(
      <Portal container={target}>
        <span data-testid="content">portalled</span>
      </Portal>,
    );

    expect(target.querySelector('[data-testid="content"]')).not.toBeNull();
    target.remove();
  });

  it('renders nothing when the container is explicitly null', () => {
    // `null` is how a component says "not yet" — the ref for the container has
    // not resolved. Falling back to body there would flash content in the wrong
    // place for one frame.
    render(
      <Portal container={null}>
        <span data-testid="content">portalled</span>
      </Portal>,
    );

    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });

  it('cleans up when unmounted', () => {
    const { unmount } = render(
      <Portal>
        <span data-testid="content">portalled</span>
      </Portal>,
    );

    unmount();
    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });
});
