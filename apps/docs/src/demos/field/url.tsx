'use client';

import { Button, CopyButton, FieldDescription, FieldLabel, FieldRoot, Input, Spinner } from '@noksha-ui/react';
import * as React from 'react';

function parseHost(value: string) {
  try {
    return new URL(value).hostname;
  } catch {
    return null;
  }
}

function normalizeUrl(value: string) {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function faviconFor(host: string) {
  return `https://www.google.com/s2/favicons?sz=64&domain=${host}`;
}

function shortCode(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36).slice(0, 6);
}

const DOMAIN_SUFFIX = '.folio.dev';
const PROTOCOL_PREFIX = 'https://';

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES =
  'border-0 border-s-4 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/25 hover:border-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40';

const GROUP_CLASSES = [
  'flex w-full items-stretch overflow-hidden rounded-(--noksha-radius-md)',
  'border border-(--noksha-border-default) bg-(--noksha-bg-surface)',
  'focus-within:border-(--noksha-border-focus)',
  'focus-within:outline-(length:--noksha-ring-width) focus-within:outline-offset-(--noksha-ring-offset)',
  'focus-within:outline-(--noksha-ring)',
].join(' ');
const GROUP_INPUT_CLASSES = 'border-0 bg-transparent focus-visible:outline-none';
const SUFFIX_CLASSES =
  'flex shrink-0 items-center border-s border-(--noksha-border-default) bg-(--noksha-bg-subtle) px-3 text-(--noksha-fg-muted) text-sm';
const PREFIX_CLASSES =
  'flex shrink-0 items-center border-e border-(--noksha-border-default) bg-(--noksha-bg-subtle) px-3 text-(--noksha-fg-muted) text-sm';

const PREVIEW_CARD_CLASSES = [
  'flex items-center gap-2.5 rounded-(--noksha-radius-lg)',
  'border border-(--noksha-border-default) bg-(--noksha-bg-surface) p-2.5 shadow-(--noksha-shadow-xs)',
].join(' ');
const FAVICON_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-info-subtle) text-(--noksha-info-fg) font-semibold text-xs';

const SHORT_CHIP_CLASSES = [
  'flex w-fit items-center gap-2 rounded-full border border-(--noksha-success-solid)/40',
  'bg-(--noksha-success-subtle)/40 py-1 ps-3 pe-1.5',
].join(' ');
const SHORT_CODE_CLASSES = 'text-(--noksha-success-fg) text-sm font-medium tabular-nums';

const ICON_SLOT_CLASSES = [
  'flex size-9 shrink-0 items-center justify-center border-e border-(--noksha-border-default)',
  'bg-(--noksha-bg-subtle) text-(--noksha-fg-muted) [&_svg]:size-4 [&_img]:size-4',
].join(' ');

const LinkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8.5 12.5 6 15a3 3 0 0 0 4 4l2.5-2.5M15.5 11.5 18 9a3 3 0 0 0-4-4l-2.5 2.5M9 15l6-6" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
  </svg>
);

const LockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

const BrowserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="size-3.5 shrink-0 text-(--noksha-fg-muted)"
  >
    <path d="M14 4h6v6M10 14 20 4M19 14v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
  </svg>
);

const ClipboardIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="7" y="4" width="10" height="4" rx="1" />
    <path d="M7 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-1" />
  </svg>
);

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const ZapIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" />
  </svg>
);

export default function FieldUrl() {
  const [url, setUrl] = React.useState('');
  const host = parseHost(url);

  const [slug, setSlug] = React.useState('yourname');

  const [securePath, setSecurePath] = React.useState('');
  const secureHost = securePath ? parseHost(`${PROTOCOL_PREFIX}${securePath}`) : null;

  const [previewUrl, setPreviewUrl] = React.useState('');
  const previewHost = parseHost(previewUrl);

  const [checkUrl, setCheckUrl] = React.useState('');
  const [checking, setChecking] = React.useState(false);
  const [checkedHost, setCheckedHost] = React.useState<string | null>(null);
  const checkHostPreview = checkUrl ? parseHost(normalizeUrl(checkUrl)) : null;

  function handleCheck() {
    const host = parseHost(normalizeUrl(checkUrl));
    if (!host) return;

    setChecking(true);
    setCheckedHost(null);

    // A real network request — a favicon load, not a fake timer — with a floor
    // so the loading state is still visible even when it resolves instantly.
    const startedAt = Date.now();
    const finish = () => {
      const remaining = Math.max(0, 500 - (Date.now() - startedAt));
      setTimeout(() => {
        setChecking(false);
        setCheckedHost(host);
      }, remaining);
    };

    const img = new Image();
    img.onload = finish;
    img.onerror = finish;
    img.src = faviconFor(host);
  }

  const [pasteUrl, setPasteUrl] = React.useState('');
  const [pasteBlocked, setPasteBlocked] = React.useState(false);
  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setPasteUrl(text);
      setPasteBlocked(false);
    } catch {
      setPasteBlocked(true);
    }
  }

  const [longUrl, setLongUrl] = React.useState('');
  const code = longUrl ? shortCode(longUrl) : null;

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <FieldRoot invalid={url.length > 0 && host === null}>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <LinkIcon />
          </span>
          <FieldLabel>Website</FieldLabel>
        </div>
        <Input
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          className={ACCENT_INPUT_CLASSES}
        />
        <FieldDescription>{host ? `Links to ${host}` : 'Include the protocol — https://…'}</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <GlobeIcon />
          </span>
          <FieldLabel htmlFor="url-slug">Custom domain</FieldLabel>
        </div>
        <div className={GROUP_CLASSES}>
          <Input
            id="url-slug"
            value={slug}
            onChange={(event) => setSlug(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
            placeholder="yourname"
            className={GROUP_INPUT_CLASSES}
          />
          <span className={SUFFIX_CLASSES}>{DOMAIN_SUFFIX}</span>
        </div>
        <FieldDescription>Live at {slug || 'yourname'}{DOMAIN_SUFFIX}</FieldDescription>
      </FieldRoot>

      <FieldRoot invalid={securePath.length > 0 && secureHost === null}>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <LockIcon />
          </span>
          <FieldLabel htmlFor="url-secure">Secure link</FieldLabel>
        </div>
        <div className={GROUP_CLASSES}>
          <span className={PREFIX_CLASSES}>{PROTOCOL_PREFIX}</span>
          <Input
            id="url-secure"
            value={securePath}
            onChange={(event) => setSecurePath(event.target.value.trim())}
            placeholder="example.com"
            className={GROUP_INPUT_CLASSES}
          />
        </div>
        <FieldDescription>
          {secureHost ? `Resolves to ${secureHost} — https:// is never typed.` : 'The protocol is a fixed chip, not something you type.'}
        </FieldDescription>
      </FieldRoot>

      <FieldRoot invalid={previewUrl.length > 0 && previewHost === null}>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <BrowserIcon />
          </span>
          <FieldLabel>Link preview</FieldLabel>
        </div>
        <div className="flex flex-col gap-2">
          <Input
            type="url"
            value={previewUrl}
            onChange={(event) => setPreviewUrl(event.target.value)}
            placeholder="https://example.com"
          />
          {previewHost ? (
            <div className={PREVIEW_CARD_CLASSES}>
              <span className={FAVICON_CLASSES}>{previewHost[0]?.toUpperCase()}</span>
              <span className="flex-1 truncate text-(--noksha-fg-default) text-sm">{previewHost}</span>
              <ExternalLinkIcon />
            </div>
          ) : null}
        </div>
        <FieldDescription>
          {previewHost ? 'A live card, not just text — built from the same parsed value.' : 'Paste a link to preview it.'}
        </FieldDescription>
      </FieldRoot>

      <FieldRoot invalid={checkUrl.length > 0 && checkHostPreview === null}>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <SearchIcon />
          </span>
          <FieldLabel htmlFor="url-check">Check URL</FieldLabel>
        </div>
        <div className={GROUP_CLASSES}>
          <span className={ICON_SLOT_CLASSES}>
            {checking ? (
              <Spinner size="xs" label="Checking" />
            ) : checkedHost ? (
              // biome-ignore lint/performance/noImgElement: a live favicon fetch from an arbitrary host isn't something next/image's remote-pattern allowlist can cover
              <img src={faviconFor(checkedHost)} alt="" />
            ) : (
              <GlobeIcon />
            )}
          </span>
          <Input
            id="url-check"
            value={checkUrl}
            onChange={(event) => {
              setCheckUrl(event.target.value);
              setCheckedHost(null);
            }}
            placeholder="example.com"
            className={GROUP_INPUT_CLASSES}
          />
          <Button
            type="button"
            tone="accent"
            loading={checking}
            loadingLabel="Checking"
            disabled={!checkUrl || checkHostPreview === null}
            onClick={handleCheck}
            className="shrink-0 rounded-none border-s border-(--noksha-border-default)"
          >
            Go
          </Button>
        </div>
        <FieldDescription>
          {checking
            ? 'Fetching the favicon to confirm the host responds…'
            : checkedHost
              ? `Reached ${checkedHost} — that's its real favicon on the left.`
              : "Press Go to fetch the site's favicon — a real request, not a fake timer."}
        </FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <ClipboardIcon />
          </span>
          <FieldLabel htmlFor="url-paste">Paste to fill</FieldLabel>
        </div>
        <div className={GROUP_CLASSES}>
          <Input
            id="url-paste"
            type="url"
            value={pasteUrl}
            onChange={(event) => setPasteUrl(event.target.value)}
            placeholder="https://example.com"
            className={GROUP_INPUT_CLASSES}
          />
          <Button
            type="button"
            variant="ghost"
            tone="neutral"
            iconOnly
            icon={<ClipboardIcon />}
            aria-label="Paste from clipboard"
            onClick={handlePaste}
            className="shrink-0 rounded-none border-s border-(--noksha-border-default)"
          />
        </div>
        <FieldDescription>
          {pasteBlocked ? 'Clipboard access was blocked — type it in instead.' : 'Click the icon to paste instead of typing.'}
        </FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <ZapIcon />
          </span>
          <FieldLabel>Short link</FieldLabel>
        </div>
        <div className="flex flex-col gap-2">
          <Input
            type="url"
            value={longUrl}
            onChange={(event) => setLongUrl(event.target.value)}
            placeholder="https://example.com/a/very/long/path"
          />
          {code ? (
            <div className={SHORT_CHIP_CLASSES}>
              <span className={SHORT_CODE_CLASSES}>ux.ly/{code}</span>
              <CopyButton value={`ux.ly/${code}`} variant="ghost" tone="success" size="xs" />
            </div>
          ) : null}
        </div>
        <FieldDescription>A 6-character code, deterministically derived from the URL.</FieldDescription>
      </FieldRoot>
    </div>
  );
}
