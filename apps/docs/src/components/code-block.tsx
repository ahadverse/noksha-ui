import type { BundledLanguage } from 'shiki';

import { highlight } from '@/lib/highlight';

import { CopyButton } from './copy-button';
import { InstallTabs } from './install-tabs';

interface CodeBlockProps {
  code: string;
  lang?: BundledLanguage;
  /** Chrome around the code. `bare` is for code already inside a framed panel. */
  variant?: 'panel' | 'bare';
  /** Caps the height and lets long files scroll instead of pushing the page. */
  maxHeight?: number;
  className?: string;
}

/**
 * Server-rendered, highlighted code with a copy button.
 *
 * Highlighting happens during the build, so the page ships coloured HTML and
 * the browser downloads no highlighter at all.
 */
export async function CodeBlock({
  code,
  lang = 'tsx',
  variant = 'panel',
  maxHeight,
  className,
}: CodeBlockProps) {
  const html = await highlight(code, lang);

  const body = (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output, built from source we own.
      dangerouslySetInnerHTML={{ __html: html }}
      className="overflow-x-auto p-4 font-mono text-sm [&_pre]:!bg-transparent [&_pre]:font-mono"
      style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}
    />
  );

  if (variant === 'bare') {
    return (
      <div className={`group relative ${className ?? ''}`}>
        <div className="absolute top-2 right-2 z-10 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
          <CopyButton value={code} />
        </div>
        {body}
      </div>
    );
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-lg border border-line-subtle bg-subtle ${className ?? ''}`}
    >
      <div className="absolute top-2 right-2 z-10 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
        <CopyButton value={code} />
      </div>
      {body}
    </div>
  );
}

/**
 * A one-line command with a persistent copy button.
 *
 * Install commands are the single most-copied thing on a docs site, so this one
 * does not hide its button until hover.
 */
export async function CommandBlock({ command }: { command: string }) {
  const html = await highlight(command, 'bash');

  return (
    <div className="flex items-center gap-2 overflow-hidden rounded-lg border border-line-subtle bg-subtle pr-2 pl-4">
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output, built from source we own.
        dangerouslySetInnerHTML={{ __html: html }}
        className="flex-1 overflow-x-auto py-3 font-mono text-sm [&_pre]:!bg-transparent"
      />
      <CopyButton value={command} />
    </div>
  );
}

/**
 * An install command, in every package manager a reader might be using.
 *
 * Each manager's own verb, rather than a single line with `npm` in it that most
 * people have to mentally translate — `add` for pnpm, yarn and bun, `install`
 * for npm. All four are highlighted here at build time and shipped together;
 * the client component only decides which is visible.
 */
export async function InstallBlock({ packages, dev = false }: InstallBlockProps) {
  const names = Array.isArray(packages) ? packages.join(' ') : packages;

  const variants = await Promise.all(
    MANAGERS.map(async ({ manager, verb, devFlag }) => {
      const command = `${manager} ${verb}${dev ? ` ${devFlag}` : ''} ${names}`;
      return { manager, command, html: await highlight(command, 'bash') };
    }),
  );

  return <InstallTabs variants={variants} />;
}

interface InstallBlockProps {
  packages: string | string[];
  /** Emit each manager's dev-dependency flag. */
  dev?: boolean;
}

/** pnpm first: it is what the repo itself uses, and the docs should not lie about that. */
const MANAGERS = [
  { manager: 'pnpm', verb: 'add', devFlag: '-D' },
  { manager: 'npm', verb: 'install', devFlag: '--save-dev' },
  { manager: 'yarn', verb: 'add', devFlag: '-D' },
  { manager: 'bun', verb: 'add', devFlag: '-d' },
];
