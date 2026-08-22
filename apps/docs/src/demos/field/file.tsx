'use client';

import { Button, FieldDescription, FieldError, FieldLabel, FieldRoot, Input } from '@noksha-ui/react';
import * as React from 'react';

const MAX_BYTES = 2 * 1024 * 1024;

function formatSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)}KB` : `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES = [
  'border border-(--noksha-border-subtle)',
  'border-s-4 border-s-(--noksha-accent-solid)',
  'bg-(--noksha-accent-subtle)/25',
  'hover:border-(--noksha-border-strong) hover:border-s-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40',
].join(' ');

const DROPZONE_BASE =
  'flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed p-8 text-center transition-colors';
const DROPZONE_IDLE =
  'border-(--noksha-border-default) hover:border-(--noksha-border-strong) hover:bg-(--noksha-bg-subtle)/60';
const DROPZONE_ACTIVE = 'border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/30';
const DROP_ICON_CIRCLE =
  'flex size-12 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-5';

const PaperclipIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M17 7v9a4 4 0 0 1-8 0V6a2.5 2.5 0 0 1 5 0v9a1 1 0 0 1-2 0V8" />
  </svg>
);

const UploadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 16V4m0 0-4 4m4-4 4 4M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
  </svg>
);

const ImageIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="m21 15-5-5L5 21" />
  </svg>
);

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
  </svg>
);

const CameraIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 8a2 2 0 0 1 2-2h1.5l1-2h7l1 2H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);

const CloudIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 18a4.5 4.5 0 0 1-1-8.9A5.5 5.5 0 0 1 16.6 7 4.5 4.5 0 0 1 17 18H7Z" />
    <path d="M12 12v6m0-6-2.5 2.5M12 12l2.5 2.5" />
  </svg>
);

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const FileIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
    <path d="M14 2v5h5" />
  </svg>
);

type Picked = { file: File; url: string | null };

function isImage(file: File) {
  return file.type.startsWith('image/');
}

export default function FieldFile() {
  // 1. Plain — the original, now with a visible border on all sides.
  const [file, setFile] = React.useState<File | null>(null);
  const tooLarge = file != null && file.size > MAX_BYTES;

  // 2. Custom trigger — a real Button drives a hidden native input.
  const [file2, setFile2] = React.useState<File | null>(null);
  const inputRef2 = React.useRef<HTMLInputElement>(null);

  // 3. Dropzone — drag-and-drop, wired to real drag events.
  const [file3, setFile3] = React.useState<File | null>(null);
  const [dragging3, setDragging3] = React.useState(false);
  const inputRef3 = React.useRef<HTMLInputElement>(null);

  // 4. Cover preview — a real thumbnail beside the trigger.
  const [file4, setFile4] = React.useState<File | null>(null);
  const [preview4, setPreview4] = React.useState<string | null>(null);
  const inputRef4 = React.useRef<HTMLInputElement>(null);
  const previewRef4 = React.useRef<string | null>(null);
  function handleFile4(next: File | null) {
    if (previewRef4.current) URL.revokeObjectURL(previewRef4.current);
    const url = next && isImage(next) ? URL.createObjectURL(next) : null;
    previewRef4.current = url;
    setFile4(next);
    setPreview4(url);
  }
  React.useEffect(
    () => () => {
      if (previewRef4.current) URL.revokeObjectURL(previewRef4.current);
    },
    [],
  );

  // 5. Avatar — a badge that's always visible, not a hover-only overlay.
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
  const [avatarDragging, setAvatarDragging] = React.useState(false);
  const avatarInputRef = React.useRef<HTMLInputElement>(null);
  const avatarPreviewRef = React.useRef<string | null>(null);
  function handleAvatar(next: File | null) {
    if (avatarPreviewRef.current) URL.revokeObjectURL(avatarPreviewRef.current);
    const url = next ? URL.createObjectURL(next) : null;
    avatarPreviewRef.current = url;
    setAvatarPreview(url);
  }
  React.useEffect(
    () => () => {
      if (avatarPreviewRef.current) URL.revokeObjectURL(avatarPreviewRef.current);
    },
    [],
  );

  // 6. Gradient dropzone — the bold card language, drag-enabled.
  const [file6, setFile6] = React.useState<File | null>(null);
  const [dragging6, setDragging6] = React.useState(false);
  const inputRef6 = React.useRef<HTMLInputElement>(null);

  // 7. Progress — a simulated upload with a gradient-filled bar.
  const [file7, setFile7] = React.useState<File | null>(null);
  const [progress7, setProgress7] = React.useState(0);
  const [uploading7, setUploading7] = React.useState(false);
  const inputRef7 = React.useRef<HTMLInputElement>(null);
  function handleFile7(next: File | null) {
    setFile7(next);
    if (!next) {
      setUploading7(false);
      setProgress7(0);
      return;
    }
    setUploading7(true);
    setProgress7(0);
  }
  React.useEffect(() => {
    if (!uploading7) return;
    const timer = setInterval(() => {
      setProgress7((value) => {
        const next = Math.min(100, value + 9);
        if (next >= 100) {
          clearInterval(timer);
          setUploading7(false);
        }
        return next;
      });
    }, 120);
    return () => clearInterval(timer);
  }, [uploading7]);

  // 8. Chip — the picked file renders as a removable row.
  const [file8, setFile8] = React.useState<File | null>(null);
  const inputRef8 = React.useRef<HTMLInputElement>(null);

  // 9. Drop + preview — the dropzone becomes the thumbnail once a file lands.
  const [file9, setFile9] = React.useState<File | null>(null);
  const [preview9, setPreview9] = React.useState<string | null>(null);
  const [dragging9, setDragging9] = React.useState(false);
  const inputRef9 = React.useRef<HTMLInputElement>(null);
  const previewRef9 = React.useRef<string | null>(null);
  function handleFile9(next: File | null) {
    if (previewRef9.current) URL.revokeObjectURL(previewRef9.current);
    const url = next && isImage(next) ? URL.createObjectURL(next) : null;
    previewRef9.current = url;
    setFile9(next);
    setPreview9(url);
  }
  React.useEffect(
    () => () => {
      if (previewRef9.current) URL.revokeObjectURL(previewRef9.current);
    },
    [],
  );

  // 10. Glass dropzone — frosted glass over a gradient card.
  const [file10, setFile10] = React.useState<File | null>(null);
  const [dragging10, setDragging10] = React.useState(false);
  const inputRef10 = React.useRef<HTMLInputElement>(null);

  // 11. Neon dropzone — dark, theme-adjustable, glows while a file hovers.
  const [file11, setFile11] = React.useState<File | null>(null);
  const [dragging11, setDragging11] = React.useState(false);
  const inputRef11 = React.useRef<HTMLInputElement>(null);

  // 12. Gallery — multiple files, each its own removable thumbnail.
  const [files12, setFiles12] = React.useState<Picked[]>([]);
  const inputRef12 = React.useRef<HTMLInputElement>(null);
  function addFiles12(list: FileList | null) {
    if (!list || list.length === 0) return;
    const next = Array.from(list).map((f) => ({ file: f, url: isImage(f) ? URL.createObjectURL(f) : null }));
    setFiles12((current) => [...current, ...next]);
  }
  function removeFile12(index: number) {
    setFiles12((current) => {
      const target = current[index];
      if (target?.url) URL.revokeObjectURL(target.url);
      return current.filter((_, i) => i !== index);
    });
  }

  // 13. Avatar with progress ring — drag-and-drop plus a conic-gradient upload ring.
  const [avatarPreview13, setAvatarPreview13] = React.useState<string | null>(null);
  const [progress13, setProgress13] = React.useState(0);
  const [uploading13, setUploading13] = React.useState(false);
  const [dragging13, setDragging13] = React.useState(false);
  const inputRef13 = React.useRef<HTMLInputElement>(null);
  const previewRef13 = React.useRef<string | null>(null);
  function handleAvatar13(next: File | null) {
    if (previewRef13.current) URL.revokeObjectURL(previewRef13.current);
    const url = next ? URL.createObjectURL(next) : null;
    previewRef13.current = url;
    setAvatarPreview13(url);
    if (next) {
      setUploading13(true);
      setProgress13(0);
    }
  }
  React.useEffect(() => {
    if (!uploading13) return;
    const timer = setInterval(() => {
      setProgress13((value) => {
        const next = Math.min(100, value + 10);
        if (next >= 100) {
          clearInterval(timer);
          setUploading13(false);
        }
        return next;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [uploading13]);
  React.useEffect(
    () => () => {
      if (previewRef13.current) URL.revokeObjectURL(previewRef13.current);
    },
    [],
  );

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <FieldRoot invalid={tooLarge}>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <PaperclipIcon />
          </span>
          <FieldLabel>Logo</FieldLabel>
        </div>
        <Input
          type="file"
          accept="image/png,image/svg+xml"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          className={ACCENT_INPUT_CLASSES}
        />
        <FieldDescription>{file ? `${file.name} — ${formatSize(file.size)}` : 'PNG or SVG, up to 2MB.'}</FieldDescription>
        <FieldError>That file is over the 2MB limit.</FieldError>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <PaperclipIcon />
          </span>
          <FieldLabel>Resume</FieldLabel>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" tone="neutral" icon={<PaperclipIcon />} onClick={() => inputRef2.current?.click()}>
            Choose file
          </Button>
          <span className="min-w-0 flex-1 truncate text-(--noksha-fg-muted) text-sm">
            {file2 ? file2.name : 'No file chosen'}
          </span>
          <Button
            type="button"
            variant="ghost"
            tone="neutral"
            iconOnly
            size="sm"
            icon={<XIcon />}
            aria-label="Remove file"
            onClick={() => {
              setFile2(null);
              if (inputRef2.current) inputRef2.current.value = '';
            }}
            className={`shrink-0 transition-all duration-200 ease-out ${file2 ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'}`}
          />
          <input ref={inputRef2} type="file" onChange={(event) => setFile2(event.target.files?.[0] ?? null)} className="sr-only" />
        </div>
        <FieldDescription>A real Button, not the browser's own — same file input underneath.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <UploadIcon />
          </span>
          <FieldLabel>Attachment</FieldLabel>
        </div>
        <div className="relative">
          <div
            onClick={() => inputRef3.current?.click()}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging3(true);
            }}
            onDragLeave={() => setDragging3(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging3(false);
              setFile3(event.dataTransfer.files?.[0] ?? null);
            }}
            className={`${DROPZONE_BASE} ${dragging3 ? DROPZONE_ACTIVE : DROPZONE_IDLE}`}
          >
            <span className={DROP_ICON_CIRCLE}>
              <UploadIcon />
            </span>
            <div>
              <p className="font-medium text-(--noksha-fg-default) text-sm">
                {file3 ? file3.name : 'Drop a file here'}
              </p>
              <p className="text-(--noksha-fg-subtle) text-xs">{file3 ? formatSize(file3.size) : 'or click to browse'}</p>
            </div>
          </div>
          <Button
            type="button"
            variant="soft"
            tone="neutral"
            iconOnly
            size="xs"
            icon={<XIcon />}
            aria-label="Remove file"
            onClick={(event) => {
              event.stopPropagation();
              setFile3(null);
              if (inputRef3.current) inputRef3.current.value = '';
            }}
            className={`absolute top-2 right-2 transition-all duration-200 ease-out ${file3 ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'}`}
          />
        </div>
        <input ref={inputRef3} type="file" onChange={(event) => setFile3(event.target.files?.[0] ?? null)} className="sr-only" />
        <FieldDescription>{dragging3 ? 'Drop it.' : 'Real drag-and-drop, not just a styled label.'}</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <ImageIcon />
          </span>
          <FieldLabel>Cover image</FieldLabel>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => inputRef4.current?.click()}
              className="flex size-16 items-center justify-center overflow-hidden rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-(--noksha-bg-subtle) text-(--noksha-fg-muted) shadow-(--noksha-shadow-xs) outline-none focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2"
            >
              {preview4 ? (
                // biome-ignore lint/performance/noImgElement: a blob: preview URL from a locally picked file isn't something next/image's remote-pattern allowlist covers
                <img src={preview4} alt="" className="size-full object-cover" />
              ) : (
                <ImageIcon />
              )}
            </button>
            <button
              type="button"
              aria-label="Remove image"
              onClick={() => {
                handleFile4(null);
                if (inputRef4.current) inputRef4.current.value = '';
              }}
              className={`absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full border-2 border-(--noksha-bg-surface) bg-(--noksha-danger-solid) text-white outline-none transition-all duration-200 ease-out [&>svg]:size-3 ${
                preview4 ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'
              }`}
            >
              <XIcon />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <Button type="button" variant="outline" tone="neutral" size="sm" onClick={() => inputRef4.current?.click()}>
              {file4 ? 'Replace' : 'Upload'}
            </Button>
            <span className="text-(--noksha-fg-muted) text-xs">{file4 ? file4.name : 'JPG or PNG'}</span>
          </div>
        </div>
        <input
          ref={inputRef4}
          type="file"
          accept="image/*"
          onChange={(event) => handleFile4(event.target.files?.[0] ?? null)}
          className="sr-only"
        />
        <FieldDescription>A real thumbnail, built from the file itself — not a filename.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <UserIcon />
          </span>
          <FieldLabel>Avatar</FieldLabel>
        </div>
        <div className="relative w-fit">
          <button
            type="button"
            onClick={() => avatarInputRef.current?.click()}
            onDragOver={(event) => {
              event.preventDefault();
              setAvatarDragging(true);
            }}
            onDragLeave={() => setAvatarDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setAvatarDragging(false);
              handleAvatar(event.dataTransfer.files?.[0] ?? null);
            }}
            className={`flex size-20 items-center justify-center overflow-hidden rounded-full outline-none transition-colors focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2 ${
              avatarDragging
                ? 'border-2 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/30'
                : avatarPreview
                  ? 'border border-(--noksha-border-default)'
                  : 'border-2 border-(--noksha-border-default) border-dashed bg-(--noksha-bg-subtle) hover:border-(--noksha-border-strong)'
            }`}
          >
            {avatarPreview ? (
              // biome-ignore lint/performance/noImgElement: a blob: preview URL from a locally picked file isn't something next/image's remote-pattern allowlist covers
              <img src={avatarPreview} alt="" className="size-full object-cover" />
            ) : (
              <span className="text-(--noksha-fg-subtle) [&>svg]:size-8">
                <UserIcon />
              </span>
            )}
          </button>
          <span className="pointer-events-none absolute right-0 bottom-0 flex size-7 items-center justify-center rounded-full border-2 border-(--noksha-bg-surface) bg-(--noksha-accent-solid) text-(--noksha-accent-ink) [&>svg]:size-3.5">
            <CameraIcon />
          </span>
          <button
            type="button"
            aria-label="Remove photo"
            onClick={() => {
              handleAvatar(null);
              if (avatarInputRef.current) avatarInputRef.current.value = '';
            }}
            className={`absolute top-0 right-0 flex size-6 items-center justify-center rounded-full border-2 border-(--noksha-bg-surface) bg-(--noksha-danger-solid) text-white outline-none transition-all duration-200 ease-out [&>svg]:size-3 ${
              avatarPreview ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'
            }`}
          >
            <XIcon />
          </button>
        </div>
        <input
          ref={avatarInputRef}
          type="file"
          accept="image/*"
          onChange={(event) => handleAvatar(event.target.files?.[0] ?? null)}
          className="sr-only"
        />
        <FieldDescription>A camera badge that's always visible, not one that only shows up on hover.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <CloudIcon />
          </span>
          <FieldLabel>Import file</FieldLabel>
        </div>
        <div
          onClick={() => inputRef6.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging6(true);
          }}
          onDragLeave={() => setDragging6(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging6(false);
            setFile6(event.dataTransfer.files?.[0] ?? null);
          }}
          className="cursor-pointer rounded-2xl p-[2px] transition-[background]"
          style={{
            background: dragging6
              ? 'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-info-solid))'
              : 'var(--noksha-border-default)',
          }}
        >
          <div className="relative flex flex-col items-center gap-2 rounded-[calc(1rem-2px)] bg-(--noksha-bg-surface) p-8 text-center">
            <span className={DROP_ICON_CIRCLE}>
              <CloudIcon />
            </span>
            <div>
              <p className="font-medium text-(--noksha-fg-default) text-sm">{file6 ? file6.name : 'Drop a file here'}</p>
              <p className="text-(--noksha-fg-subtle) text-xs">{file6 ? formatSize(file6.size) : 'or click to browse'}</p>
            </div>
            <Button
              type="button"
              variant="soft"
              tone="neutral"
              iconOnly
              size="xs"
              icon={<XIcon />}
              aria-label="Remove file"
              onClick={(event) => {
                event.stopPropagation();
                setFile6(null);
                if (inputRef6.current) inputRef6.current.value = '';
              }}
              className={`absolute top-2 right-2 transition-all duration-200 ease-out ${file6 ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'}`}
            />
          </div>
        </div>
        <input ref={inputRef6} type="file" onChange={(event) => setFile6(event.target.files?.[0] ?? null)} className="sr-only" />
        <FieldDescription>The border turns into a gradient the moment a file crosses it.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <UploadIcon />
          </span>
          <FieldLabel>Video upload</FieldLabel>
        </div>
        <Button type="button" variant="outline" tone="neutral" fullWidth onClick={() => inputRef7.current?.click()}>
          {file7 ? 'Choose a different file' : 'Choose file'}
        </Button>
        <input ref={inputRef7} type="file" onChange={(event) => handleFile7(event.target.files?.[0] ?? null)} className="sr-only" />
        {file7 ? (
          <div className="mt-2 flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-(--noksha-fg-muted) text-xs">
              <span className="truncate">{file7.name}</span>
              <div className="flex shrink-0 items-center gap-1">
                <span className="font-medium text-(--noksha-accent-fg)">{uploading7 ? `${progress7}%` : 'Done'}</span>
                <Button
                  type="button"
                  variant="ghost"
                  tone="neutral"
                  iconOnly
                  size="xs"
                  icon={<XIcon />}
                  aria-label="Remove file"
                  onClick={() => {
                    handleFile7(null);
                    if (inputRef7.current) inputRef7.current.value = '';
                  }}
                />
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-(--noksha-bg-subtle)">
              <div
                className="h-full rounded-full transition-[width] duration-150 ease-out"
                style={{
                  width: `${progress7}%`,
                  background: 'linear-gradient(90deg, var(--noksha-accent-solid), var(--noksha-info-solid))',
                }}
              />
            </div>
          </div>
        ) : null}
        <FieldDescription>{uploading7 ? 'Uploading…' : 'A gradient progress bar that actually moves.'}</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <PaperclipIcon />
          </span>
          <FieldLabel>Attachment list</FieldLabel>
        </div>
        {file8 ? (
          <div className="flex items-center gap-2 rounded-(--noksha-radius-md) border border-(--noksha-border-default) bg-(--noksha-bg-surface) py-2 pr-1.5 pl-3 shadow-(--noksha-shadow-xs)">
            <span className="text-(--noksha-accent-fg) [&>svg]:size-4">
              <PaperclipIcon />
            </span>
            <span className="min-w-0 flex-1 truncate text-(--noksha-fg-default) text-sm">{file8.name}</span>
            <span className="shrink-0 text-(--noksha-fg-subtle) text-xs">{formatSize(file8.size)}</span>
            <Button type="button" variant="ghost" tone="neutral" iconOnly size="sm" icon={<XIcon />} aria-label="Remove file" onClick={() => setFile8(null)} />
          </div>
        ) : (
          <Button type="button" variant="outline" tone="neutral" icon={<PaperclipIcon />} onClick={() => inputRef8.current?.click()}>
            Attach a file
          </Button>
        )}
        <input ref={inputRef8} type="file" onChange={(event) => setFile8(event.target.files?.[0] ?? null)} className="sr-only" />
        <FieldDescription>Picked becomes a removable row — no native text to fight with.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <ImageIcon />
          </span>
          <FieldLabel>Drop &amp; preview</FieldLabel>
        </div>
        <div
          onClick={() => inputRef9.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging9(true);
          }}
          onDragLeave={() => setDragging9(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging9(false);
            handleFile9(event.dataTransfer.files?.[0] ?? null);
          }}
          className={
            preview9
              ? 'relative cursor-pointer overflow-hidden rounded-2xl border border-(--noksha-border-default)'
              : `${DROPZONE_BASE} ${dragging9 ? DROPZONE_ACTIVE : DROPZONE_IDLE}`
          }
        >
          {preview9 ? (
            <>
              {/* biome-ignore lint/performance/noImgElement: a blob: preview URL from a locally picked file isn't something next/image's remote-pattern allowlist covers */}
              <img src={preview9} alt="" className="h-36 w-full object-cover" />
              <div className="flex items-center justify-between bg-(--noksha-bg-surface) px-3 py-2">
                <span className="truncate text-(--noksha-fg-default) text-xs">{file9?.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  tone="neutral"
                  iconOnly
                  size="xs"
                  icon={<XIcon />}
                  aria-label="Remove image"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleFile9(null);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <span className={DROP_ICON_CIRCLE}>
                <ImageIcon />
              </span>
              <p className="font-medium text-(--noksha-fg-default) text-sm">Drop an image to preview it here</p>
              <p className="text-(--noksha-fg-subtle) text-xs">or click to browse</p>
            </>
          )}
        </div>
        <input ref={inputRef9} type="file" accept="image/*" onChange={(event) => handleFile9(event.target.files?.[0] ?? null)} className="sr-only" />
        <FieldDescription>Drop and preview in one motion — the zone becomes the thumbnail.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <CloudIcon />
          </span>
          <FieldLabel>Design asset</FieldLabel>
        </div>
        <div
          className="rounded-2xl p-4"
          style={{ background: 'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-danger-solid))' }}
        >
          <div
            onClick={() => inputRef10.current?.click()}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging10(true);
            }}
            onDragLeave={() => setDragging10(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging10(false);
              setFile10(event.dataTransfer.files?.[0] ?? null);
            }}
            className={`relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-7 text-center backdrop-blur-md transition-colors ${
              dragging10 ? 'border-white bg-white/20' : 'border-white/30 bg-white/10 hover:bg-white/15'
            }`}
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-white/15 text-white [&>svg]:size-5">
              <CloudIcon />
            </span>
            <div>
              <p className="font-medium text-sm text-white">{file10 ? file10.name : 'Drop a file here'}</p>
              <p className="text-white/70 text-xs">{file10 ? formatSize(file10.size) : 'or click to browse'}</p>
            </div>
            <button
              type="button"
              aria-label="Remove file"
              onClick={(event) => {
                event.stopPropagation();
                setFile10(null);
                if (inputRef10.current) inputRef10.current.value = '';
              }}
              className={`absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-white/20 text-white outline-none transition-all duration-200 ease-out hover:bg-white/30 [&>svg]:size-3.5 ${
                file10 ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'
              }`}
            >
              <XIcon />
            </button>
          </div>
        </div>
        <input ref={inputRef10} type="file" onChange={(event) => setFile10(event.target.files?.[0] ?? null)} className="sr-only" />
        <FieldDescription>Frosted glass over a gradient — the dropzone itself, not a card behind it.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <UploadIcon />
          </span>
          <FieldLabel>Backup archive</FieldLabel>
        </div>
        <div
          onClick={() => inputRef11.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging11(true);
          }}
          onDragLeave={() => setDragging11(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging11(false);
            setFile11(event.dataTransfer.files?.[0] ?? null);
          }}
          className={`relative flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed bg-(--noksha-bg-inverse) p-8 text-center transition-[box-shadow,border-color] ${
            dragging11
              ? 'border-(--noksha-accent-solid) shadow-[0_0_28px_-4px_var(--noksha-accent-solid)]'
              : 'border-(--noksha-fg-inverse)/20'
          }`}
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-(--noksha-fg-inverse)/10 text-(--noksha-accent-solid) [&>svg]:size-5">
            <UploadIcon />
          </span>
          <div>
            <p className="font-medium text-(--noksha-fg-inverse) text-sm">{file11 ? file11.name : 'Drop a file here'}</p>
            <p className="text-(--noksha-fg-inverse)/50 text-xs">{file11 ? formatSize(file11.size) : 'or click to browse'}</p>
          </div>
          <button
            type="button"
            aria-label="Remove file"
            onClick={(event) => {
              event.stopPropagation();
              setFile11(null);
              if (inputRef11.current) inputRef11.current.value = '';
            }}
            className={`absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-(--noksha-fg-inverse)/10 text-(--noksha-fg-inverse) outline-none transition-all duration-200 ease-out hover:bg-(--noksha-fg-inverse)/20 [&>svg]:size-3.5 ${
              file11 ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'
            }`}
          >
            <XIcon />
          </button>
        </div>
        <input ref={inputRef11} type="file" onChange={(event) => setFile11(event.target.files?.[0] ?? null)} className="sr-only" />
        <FieldDescription>Dark in both themes — the border glows the moment a file crosses it.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <ImageIcon />
          </span>
          <FieldLabel>Gallery</FieldLabel>
        </div>
        <div className="flex flex-wrap gap-2">
          {files12.map((picked, index) => (
            <div key={`${picked.file.name}-${index}`} className="group relative size-14 shrink-0 overflow-hidden rounded-(--noksha-radius-md) border border-(--noksha-border-default)">
              {picked.url ? (
                // biome-ignore lint/performance/noImgElement: a blob: preview URL from a locally picked file isn't something next/image's remote-pattern allowlist covers
                <img src={picked.url} alt="" className="size-full object-cover" />
              ) : (
                <span className="flex size-full items-center justify-center bg-(--noksha-bg-subtle) text-(--noksha-fg-muted) [&>svg]:size-5">
                  <FileIcon />
                </span>
              )}
              <button
                type="button"
                aria-label={`Remove ${picked.file.name}`}
                onClick={() => removeFile12(index)}
                className="absolute inset-0 flex items-center justify-center bg-black/0 text-transparent outline-none transition-colors group-hover:bg-black/50 group-hover:text-white focus-visible:bg-black/50 focus-visible:text-white"
              >
                <XIcon />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => inputRef12.current?.click()}
            aria-label="Add files"
            className="flex size-14 shrink-0 items-center justify-center rounded-(--noksha-radius-md) border-2 border-(--noksha-border-default) border-dashed text-(--noksha-fg-muted) outline-none hover:border-(--noksha-border-strong) hover:text-(--noksha-fg-default) focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2"
          >
            <UploadIcon />
          </button>
        </div>
        <input ref={inputRef12} type="file" multiple onChange={(event) => addFiles12(event.target.files)} className="sr-only" />
        <FieldDescription>{files12.length} file{files12.length === 1 ? '' : 's'} — each tile removable on its own.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <UserIcon />
          </span>
          <FieldLabel>Profile photo</FieldLabel>
        </div>
        <div className="relative w-fit">
          <div
            className="rounded-full p-1"
            style={{
              background:
                uploading13 || dragging13
                  ? `conic-gradient(var(--noksha-accent-solid) ${dragging13 ? 100 : progress13}%, var(--noksha-bg-subtle) ${dragging13 ? 100 : progress13}% 100%)`
                  : 'var(--noksha-bg-subtle)',
            }}
          >
            <button
              type="button"
              onClick={() => inputRef13.current?.click()}
              onDragOver={(event) => {
                event.preventDefault();
                setDragging13(true);
              }}
              onDragLeave={() => setDragging13(false)}
              onDrop={(event) => {
                event.preventDefault();
                setDragging13(false);
                handleAvatar13(event.dataTransfer.files?.[0] ?? null);
              }}
              className="flex size-20 items-center justify-center overflow-hidden rounded-full bg-(--noksha-bg-surface) text-(--noksha-fg-subtle) outline-none [&>svg]:size-8"
            >
              {avatarPreview13 ? (
                // biome-ignore lint/performance/noImgElement: a blob: preview URL from a locally picked file isn't something next/image's remote-pattern allowlist covers
                <img src={avatarPreview13} alt="" className="size-full object-cover" />
              ) : (
                <UserIcon />
              )}
            </button>
          </div>
          <button
            type="button"
            aria-label="Remove photo"
            onClick={() => {
              handleAvatar13(null);
              setUploading13(false);
              setProgress13(0);
              if (inputRef13.current) inputRef13.current.value = '';
            }}
            className={`absolute top-0 right-0 flex size-6 items-center justify-center rounded-full border-2 border-(--noksha-bg-surface) bg-(--noksha-danger-solid) text-white outline-none transition-all duration-200 ease-out [&>svg]:size-3 ${
              avatarPreview13 ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'
            }`}
          >
            <XIcon />
          </button>
        </div>
        <input
          ref={inputRef13}
          type="file"
          accept="image/*"
          onChange={(event) => handleAvatar13(event.target.files?.[0] ?? null)}
          className="sr-only"
        />
        <FieldDescription>
          {uploading13 ? `${progress13}% uploaded` : 'Drop or click — the ring around it is upload progress.'}
        </FieldDescription>
      </FieldRoot>
    </div>
  );
}
