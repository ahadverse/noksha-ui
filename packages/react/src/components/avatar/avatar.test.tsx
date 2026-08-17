import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Avatar } from './avatar.js';

function Basic({ src }: { src?: string }) {
  return (
    <Avatar.Root data-testid="avatar">
      <Avatar.Image src={src} alt="Ada Lovelace" />
      <Avatar.Fallback>AL</Avatar.Fallback>
    </Avatar.Root>
  );
}

describe('Avatar', () => {
  it('shows the fallback until the image resolves', () => {
    render(<Basic src="/ada.jpg" />);
    expect(screen.getByText('AL')).toBeInTheDocument();
  });

  it('hides the fallback once the image loads', async () => {
    render(<Basic src="/ada.jpg" />);

    fireEvent.load(screen.getByAltText('Ada Lovelace'));
    await waitFor(() => expect(screen.queryByText('AL')).not.toBeInTheDocument());
  });

  it('keeps the fallback when the image fails', async () => {
    render(<Basic src="/missing.jpg" />);

    fireEvent.error(screen.getByAltText('Ada Lovelace'));
    await waitFor(() =>
      expect(screen.getByTestId('avatar')).toHaveAttribute('data-status', 'error'),
    );
    expect(screen.getByText('AL')).toBeInTheDocument();
  });

  it('treats a missing src as a failure rather than a pending load', async () => {
    render(<Basic />);

    // Without this the fallback would sit in "loading" forever, waiting on an
    // event that is never coming.
    await waitFor(() =>
      expect(screen.getByTestId('avatar')).toHaveAttribute('data-status', 'error'),
    );
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('AL')).toBeInTheDocument();
  });

  it('reports status changes to the consumer', async () => {
    const onLoadingStatusChange = vi.fn();
    render(
      <Avatar.Root>
        <Avatar.Image src="/ada.jpg" alt="Ada" onLoadingStatusChange={onLoadingStatusChange} />
      </Avatar.Root>,
    );

    await waitFor(() => expect(onLoadingStatusChange).toHaveBeenCalledWith('loading'));

    fireEvent.error(screen.getByAltText('Ada'));
    expect(onLoadingStatusChange).toHaveBeenCalledWith('error');
  });

  it('keeps the fallback out of the a11y tree', () => {
    render(<Basic src="/ada.jpg" />);

    // The image's alt text already names the person; announcing the initials
    // as well reads the same name twice.
    expect(screen.getByText('AL')).toHaveAttribute('aria-hidden', 'true');
  });

  it('holds a delayed fallback back', async () => {
    vi.useFakeTimers();
    render(
      <Avatar.Root>
        <Avatar.Image src="/ada.jpg" alt="Ada" />
        <Avatar.Fallback delayMs={600}>AL</Avatar.Fallback>
      </Avatar.Root>,
    );

    expect(screen.queryByText('AL')).not.toBeInTheDocument();
    await React.act(async () => {
      vi.advanceTimersByTime(700);
    });
    expect(screen.getByText('AL')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('fails loudly when a part is used outside the root', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Avatar.Fallback>AL</Avatar.Fallback>)).toThrow(/Avatar.Root/);
    error.mockRestore();
  });

  describe('Group', () => {
    it('clamps to max and counts the rest', () => {
      render(
        <Avatar.Group max={2}>
          <Avatar.Root>
            <Avatar.Fallback>A</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root>
            <Avatar.Fallback>B</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root>
            <Avatar.Fallback>C</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root>
            <Avatar.Fallback>D</Avatar.Fallback>
          </Avatar.Root>
        </Avatar.Group>,
      );

      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
      expect(screen.queryByText('C')).not.toBeInTheDocument();
      expect(screen.getByText('+2')).toBeInTheDocument();
      expect(screen.getByLabelText('2 more')).toBeInTheDocument();
    });

    it('applies one size to every child', () => {
      render(
        <Avatar.Group size="lg">
          <Avatar.Root data-testid="one">
            <Avatar.Fallback>A</Avatar.Fallback>
          </Avatar.Root>
        </Avatar.Group>,
      );

      expect(screen.getByTestId('one')).toHaveClass('size-12');
    });

    it('shows no counter when everything fits', () => {
      render(
        <Avatar.Group max={3}>
          <Avatar.Root>
            <Avatar.Fallback>A</Avatar.Fallback>
          </Avatar.Root>
        </Avatar.Group>,
      );

      expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
    });
  });
});
