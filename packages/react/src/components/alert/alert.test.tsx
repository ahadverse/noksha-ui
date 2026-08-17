import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { Alert } from './alert.js';

describe('Alert', () => {
  it('renders a title and description', () => {
    render(
      <Alert.Root>
        <Alert.Title>Heads up</Alert.Title>
        <Alert.Description>Your trial ends on Friday.</Alert.Description>
      </Alert.Root>,
    );

    expect(screen.getByText('Heads up')).toBeInTheDocument();
    expect(screen.getByText('Your trial ends on Friday.')).toBeInTheDocument();
  });

  it('stays out of the live region by default', () => {
    render(
      <Alert.Root>
        <Alert.Title>Heads up</Alert.Title>
      </Alert.Root>,
    );

    // A banner that was on the page at load time is not news, and announcing
    // it assertively interrupts the user for nothing.
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('announces assertively when live', () => {
    render(
      <Alert.Root live tone="danger">
        <Alert.Title>Deployment failed</Alert.Title>
      </Alert.Root>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Deployment failed');
  });

  it('picks a distinct icon shape per tone', () => {
    const { container, rerender } = render(
      <Alert.Root tone="warning">
        <Alert.Title>x</Alert.Title>
      </Alert.Root>,
    );
    const warning = container.querySelector('svg')?.innerHTML;

    rerender(
      <Alert.Root tone="success">
        <Alert.Title>x</Alert.Title>
      </Alert.Root>,
    );

    // Shape has to carry the meaning too — colour alone fails anyone who
    // cannot tell the amber from the red.
    expect(container.querySelector('svg')?.innerHTML).not.toBe(warning);
  });

  it('hides the icon from assistive tech', () => {
    const { container } = render(
      <Alert.Root>
        <Alert.Title>x</Alert.Title>
      </Alert.Root>,
    );
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('drops the icon column when icon is null', () => {
    const { container } = render(
      <Alert.Root data-testid="alert" icon={null}>
        <Alert.Title>x</Alert.Title>
      </Alert.Root>,
    );

    expect(container.querySelector('svg')).toBeNull();
    // The text column moves to 1, and the title follows it through the variable.
    expect(screen.getByTestId('alert').className).toContain('[--alert-col:1]');
  });

  it('takes a custom icon', () => {
    render(
      <Alert.Root icon={<svg data-testid="custom" />}>
        <Alert.Title>x</Alert.Title>
      </Alert.Root>,
    );
    expect(screen.getByTestId('custom')).toBeInTheDocument();
  });

  it('keeps the title and description in the same grid column', () => {
    render(
      <Alert.Root>
        <Alert.Title data-testid="title">Heads up</Alert.Title>
        <Alert.Description data-testid="description">More</Alert.Description>
      </Alert.Root>,
    );

    // Both read the root's variable, so a wrapping description never slides
    // back under the icon.
    for (const id of ['title', 'description']) {
      expect(screen.getByTestId(id).className).toContain('col-start-(--alert-col)');
    }
  });

  it('forwards refs', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Alert.Root ref={ref}>
        <Alert.Title>x</Alert.Title>
      </Alert.Root>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
