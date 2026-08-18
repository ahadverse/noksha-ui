import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Button } from './button.js';
import { ButtonGroup } from './button-group.js';
import { CopyButton } from './copy-button.js';
import { FloatingButton } from './floating-button.js';
import { FloatingMenu } from './floating-menu.js';
import { ScrollToTop } from './scroll-to-top.js';
import { ToggleButton } from './toggle-button.js';

describe('ButtonGroup', () => {
  it('names itself a group so the buttons are announced as one control', () => {
    render(
      <ButtonGroup aria-label="Range">
        <Button>Day</Button>
        <Button>Week</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group', { name: 'Range' })).toBeInTheDocument();
  });

  it('collapses the shared borders when attached, and does not when detached', () => {
    const { rerender } = render(
      <ButtonGroup>
        <Button>One</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group').className).toContain('-ml-px');

    rerender(
      <ButtonGroup attached={false}>
        <Button>One</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole('group').className).not.toContain('-ml-px');
  });

  it('joins along the other edge when vertical', () => {
    render(
      <ButtonGroup orientation="vertical">
        <Button>One</Button>
      </ButtonGroup>,
    );
    const classes = screen.getByRole('group').className;

    expect(classes).toContain('-mt-px');
    expect(classes).not.toContain('-ml-px');
  });
});

describe('ToggleButton', () => {
  it('reports its state through aria-pressed', async () => {
    render(<ToggleButton>Bold</ToggleButton>);
    const button = screen.getByRole('button', { name: 'Bold' });

    expect(button).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('stays where the controlling prop puts it', async () => {
    const onPressedChange = vi.fn();
    render(
      <ToggleButton pressed={false} onPressedChange={onPressedChange}>
        Bold
      </ToggleButton>,
    );
    const button = screen.getByRole('button', { name: 'Bold' });

    await userEvent.click(button);
    expect(onPressedChange).toHaveBeenCalledWith(true);
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('honours defaultPressed', () => {
    render(<ToggleButton defaultPressed>Bold</ToggleButton>);
    expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('CopyButton', () => {
  const writeText = vi.fn(() => Promise.resolve());

  beforeEach(() => {
    writeText.mockClear();
    Object.assign(navigator, { clipboard: { writeText } });
  });

  it('writes the value and confirms it', async () => {
    render(<CopyButton value="pnpm add @noksha-ui/react" />);

    await userEvent.click(screen.getByRole('button', { name: 'Copy' }));

    expect(writeText).toHaveBeenCalledWith('pnpm add @noksha-ui/react');
    await waitFor(() => expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument());
  });

  it('calls back only after the clipboard actually accepted it', async () => {
    const onCopied = vi.fn();
    writeText.mockRejectedValueOnce(new Error('denied'));

    render(<CopyButton value="x" onCopied={onCopied} />);
    await userEvent.click(screen.getByRole('button', { name: 'Copy' }));

    expect(onCopied).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument();
  });
});

describe('ScrollToTop', () => {
  const scrollTo = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('scrollTo', scrollTo);
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
    );
    window.scrollY = 0;
    scrollTo.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('stays out of the tab order until the page has scrolled', () => {
    render(<ScrollToTop />);
    const button = screen.getByRole('button', { name: 'Back to top' });

    // visibility:hidden, not opacity-0. An opacity-0 button is still focusable
    // and still announced, which is the usual bug in this pattern.
    expect(button.className).toContain('invisible');
    expect(button.className).not.toContain('opacity-100');
  });

  it('appears once the threshold is passed', async () => {
    render(<ScrollToTop showAfter={100} />);

    window.scrollY = 500;
    window.dispatchEvent(new Event('scroll'));

    await waitFor(() => {
      const button = screen.getByRole('button', { name: 'Back to top' });
      expect(button.className).toContain('visible');
    });
  });

  it('scrolls to the top and hands focus back with it', async () => {
    render(<ScrollToTop showAfter={0} />);

    window.scrollY = 500;
    window.dispatchEvent(new Event('scroll'));

    const button = await screen.findByRole('button', { name: 'Back to top' });
    await userEvent.click(button);

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    expect(document.body).toHaveFocus();
  });
});

describe('FloatingButton', () => {
  it('carries its label as the accessible name when icon-only', () => {
    render(<FloatingButton label="New item" icon={<svg aria-hidden="true" />} />);
    expect(screen.getByRole('button', { name: 'New item' })).toBeInTheDocument();
  });

  it('shows the label as text when extended, without doubling it up', () => {
    render(<FloatingButton extended label="Compose" icon={<svg aria-hidden="true" />} />);
    const button = screen.getByRole('button', { name: 'Compose' });

    expect(button).toHaveTextContent('Compose');
    expect(button).not.toHaveAttribute('aria-label');
  });

  it('pins to the viewport until it is given a container', () => {
    const { container } = render(<FloatingButton label="New" icon={<svg aria-hidden="true" />} />);
    const anchor = container.firstElementChild as HTMLElement;

    expect(anchor.style.position).toBe('fixed');
  });
});

describe('FloatingMenu', () => {
  const actions = [
    { id: 'doc', label: 'Document', icon: <svg aria-hidden="true" /> },
    { id: 'image', label: 'Image', icon: <svg aria-hidden="true" /> },
  ];

  it('starts closed and reports it on the trigger', () => {
    render(<FloatingMenu label="Create" actions={actions} />);
    const trigger = screen.getByRole('button', { name: 'Create' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('button', { name: 'Document' })).not.toBeInTheDocument();
  });

  it('opens on click and points at the stack it opened', async () => {
    render(<FloatingMenu label="Create" actions={actions} />);

    await userEvent.click(screen.getByRole('button', { name: 'Create' }));
    const trigger = screen.getByRole('button', { name: 'Create' });

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger.getAttribute('aria-controls')).toBe(
      screen.getByRole('list', { name: 'Create' }).id,
    );
    expect(screen.getByRole('button', { name: 'Document' })).toBeInTheDocument();
  });

  it('selects an action, closes, and gives focus back to the trigger', async () => {
    const onSelect = vi.fn();
    render(
      <FloatingMenu
        label="Create"
        actions={[{ id: 'doc', label: 'Document', icon: <svg aria-hidden="true" />, onSelect }]}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Create' }));
    await userEvent.click(screen.getByRole('button', { name: 'Document' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Create' })).toHaveAttribute(
        'aria-expanded',
        'false',
      ),
    );
    expect(screen.getByRole('button', { name: 'Create' })).toHaveFocus();
  });

  it('closes on Escape', async () => {
    render(<FloatingMenu label="Create" actions={actions} />);

    await userEvent.click(screen.getByRole('button', { name: 'Create' }));
    await userEvent.keyboard('{Escape}');

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Create' })).toHaveAttribute(
        'aria-expanded',
        'false',
      ),
    );
  });

  it('labels each action once — the chip beside it is decoration', async () => {
    render(<FloatingMenu label="Create" actions={actions} />);
    await userEvent.click(screen.getByRole('button', { name: 'Create' }));

    expect(screen.getAllByRole('button', { name: 'Document' })).toHaveLength(1);
  });
});
