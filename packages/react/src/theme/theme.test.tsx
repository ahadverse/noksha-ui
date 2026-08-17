import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider, useTheme } from './theme-provider.js';
import { DEFAULT_STORAGE_KEY, themeScript } from './theme-script.js';

/**
 * jsdom has no `matchMedia`. The stub is a real listener registry rather than a
 * no-op so the "system" mode can actually be driven from the OS side.
 */
function stubMatchMedia(prefersDark: boolean) {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  let matches = prefersDark;

  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      get matches() {
        return matches;
      },
      media: query,
      onchange: null,
      addEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) =>
        listeners.add(listener),
      removeEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) =>
        listeners.delete(listener),
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    })),
  );

  return {
    setSystemDark(next: boolean) {
      matches = next;
      for (const listener of listeners) listener({ matches: next } as MediaQueryListEvent);
    },
  };
}

function Probe() {
  const { mode, resolvedTheme, setMode, toggle } = useTheme();
  return (
    <>
      <span data-testid="mode">{mode}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button type="button" onClick={toggle}>
        toggle
      </button>
      <button type="button" onClick={() => setMode('system')}>
        system
      </button>
    </>
  );
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = '';
  document.documentElement.removeAttribute('data-theme');
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('themeScript', () => {
  it('is small enough to inline in <head>', () => {
    // The no-flash promise only holds if this is cheap enough to sit inline
    // before paint; a budget keeps it from quietly growing into a bundle.
    expect(themeScript().length).toBeLessThan(700);
  });

  it('is a self-contained IIFE with no external references', () => {
    const script = themeScript();
    expect(script.startsWith('(function(){')).toBe(true);
    expect(script).toContain('try{');
    expect(script).not.toContain('import');
    expect(script).not.toContain('require');
  });

  it('embeds the storage key and default mode', () => {
    expect(themeScript()).toContain(JSON.stringify(DEFAULT_STORAGE_KEY));
    expect(themeScript({ storageKey: 'app-theme', defaultMode: 'dark' })).toContain('"app-theme"');
    expect(themeScript({ defaultMode: 'dark' })).toContain('"dark"');
  });

  it('paints the theme when evaluated, before React exists', () => {
    stubMatchMedia(true);
    localStorage.setItem(DEFAULT_STORAGE_KEY, 'dark');

    // eslint-disable-next-line no-new-func -- the script is generated, not user input
    new Function(themeScript())();

    expect(document.documentElement).toHaveClass('dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');
  });

  it('survives localStorage throwing, as in Safari private mode', () => {
    stubMatchMedia(false);
    const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied');
    });

    expect(() => new Function(themeScript())()).not.toThrow();
    getItem.mockRestore();
  });
});

describe('ThemeProvider', () => {
  it('resolves "system" from the OS preference', () => {
    stubMatchMedia(true);
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('mode')).toHaveTextContent('system');
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
  });

  it('keeps following the OS while the mode stays "system"', () => {
    const media = stubMatchMedia(false);
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('resolved')).toHaveTextContent('light');

    act(() => media.setSystemDark(true));
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
  });

  it('stamps the class, attribute and color-scheme on <html>', () => {
    stubMatchMedia(false);
    render(
      <ThemeProvider defaultMode="dark">
        <Probe />
      </ThemeProvider>,
    );

    expect(document.documentElement).toHaveClass('dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(document.documentElement.style.colorScheme).toBe('dark');
  });

  it('toggle() resolves "system" first rather than cycling through it', async () => {
    stubMatchMedia(true);
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'toggle' }));
    expect(screen.getByTestId('mode')).toHaveTextContent('light');
    expect(localStorage.getItem(DEFAULT_STORAGE_KEY)).toBe('light');
  });

  it('restores the stored mode on mount', () => {
    stubMatchMedia(false);
    localStorage.setItem(DEFAULT_STORAGE_KEY, 'dark');

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
  });

  it('does not write to storage when disabled', async () => {
    stubMatchMedia(false);
    render(
      <ThemeProvider disableStorage>
        <Probe />
      </ThemeProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'toggle' }));
    expect(localStorage.getItem(DEFAULT_STORAGE_KEY)).toBeNull();
  });

  it('syncs across tabs through the storage event', () => {
    stubMatchMedia(false);
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', { key: DEFAULT_STORAGE_KEY, newValue: 'dark' }),
      );
    });
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
  });

  it('ignores storage events for other keys', () => {
    stubMatchMedia(false);
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );

    act(() => {
      window.dispatchEvent(new StorageEvent('storage', { key: 'unrelated', newValue: 'dark' }));
    });
    expect(screen.getByTestId('resolved')).toHaveTextContent('light');
  });
});

describe('useTheme', () => {
  it('fails loudly outside a provider', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Probe />)).toThrow(/ThemeProvider/);
    error.mockRestore();
  });
});
