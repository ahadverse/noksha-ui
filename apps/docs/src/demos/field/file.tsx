'use client';

import {
  Button,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldRoot,
  Input,
} from '@noksha-ui/react';
import * as React from 'react';

import { DemoTile } from '@/components/demo-tile';

const MAX_BYTES = 2 * 1024 * 1024;

function formatSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.round(bytes / 1024)}KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
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

type Picked = { id: number; file: File; url: string | null };

function isImage(file: File) {
  return file.type.startsWith('image/');
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex w-full flex-col gap-4">
      <h4 className="flex items-center gap-3 font-medium text-(--noksha-fg-subtle) text-xs uppercase tracking-wide after:h-px after:flex-1 after:bg-(--noksha-border-subtle)">
        {title}
      </h4>
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function LogoFileInput() {
  const [file, setFile] = React.useState<File | null>(null);
  const tooLarge = file != null && file.size > MAX_BYTES;

  return (
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
      <FieldDescription>
        {file ? `${file.name} — ${formatSize(file.size)}` : 'PNG or SVG, up to 2MB.'}
      </FieldDescription>
      <FieldError>That file is over the 2MB limit.</FieldError>
    </FieldRoot>
  );
}

function ResumeFilePicker() {
  const [file, setFile] = React.useState<File | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <PaperclipIcon />
        </span>
        <FieldLabel>Resume</FieldLabel>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          tone="neutral"
          icon={<PaperclipIcon />}
          onClick={() => inputRef.current?.click()}
        >
          Choose file
        </Button>
        <span className="min-w-0 flex-1 truncate text-(--noksha-fg-muted) text-sm">
          {file ? file.name : 'No file chosen'}
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
            setFile(null);
            if (inputRef.current) inputRef.current.value = '';
          }}
          className={`shrink-0 transition-all duration-200 ease-out ${file ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'}`}
        />
        <input
          ref={inputRef}
          type="file"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          className="sr-only"
        />
      </div>
      <FieldDescription>
        A real Button, not the browser's own — same file input underneath.
      </FieldDescription>
    </FieldRoot>
  );
}

function AttachmentChip() {
  const [file, setFile] = React.useState<File | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <PaperclipIcon />
        </span>
        <FieldLabel>Attachment list</FieldLabel>
      </div>
      {file ? (
        <div className="flex items-center gap-2 rounded-(--noksha-radius-md) border border-(--noksha-border-default) bg-(--noksha-bg-surface) py-2 pr-1.5 pl-3 shadow-(--noksha-shadow-xs)">
          <span className="text-(--noksha-accent-fg) [&>svg]:size-4">
            <PaperclipIcon />
          </span>
          <span className="min-w-0 flex-1 truncate text-(--noksha-fg-default) text-sm">
            {file.name}
          </span>
          <span className="shrink-0 text-(--noksha-fg-subtle) text-xs">
            {formatSize(file.size)}
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
              setFile(null);
              if (inputRef.current) inputRef.current.value = '';
            }}
          />
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          tone="neutral"
          icon={<PaperclipIcon />}
          onClick={() => inputRef.current?.click()}
        >
          Attach a file
        </Button>
      )}
      <input
        ref={inputRef}
        type="file"
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        className="sr-only"
      />
      <FieldDescription>
        Picked becomes a removable row — no native text to fight with.
      </FieldDescription>
    </FieldRoot>
  );
}

function VideoUploadProgress() {
  const [file, setFile] = React.useState<File | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleFile(next: File | null) {
    setFile(next);
    setProgress(0);
    setUploading(next !== null);
  }

  React.useEffect(() => {
    if (!uploading) return;
    const timer = setInterval(() => {
      setProgress((value) => {
        const next = Math.min(100, value + 9);
        if (next >= 100) {
          clearInterval(timer);
          setUploading(false);
        }
        return next;
      });
    }, 120);
    return () => clearInterval(timer);
  }, [uploading]);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <UploadIcon />
        </span>
        <FieldLabel>Video upload</FieldLabel>
      </div>
      <Button
        type="button"
        variant="outline"
        tone="neutral"
        fullWidth
        onClick={() => inputRef.current?.click()}
      >
        {file ? 'Choose a different file' : 'Choose file'}
      </Button>
      <input
        ref={inputRef}
        type="file"
        onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
        className="sr-only"
      />
      {file ? (
        <div className="mt-2 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-(--noksha-fg-muted) text-xs">
            <span className="truncate">{file.name}</span>
            <div className="flex shrink-0 items-center gap-1">
              <span className="font-medium text-(--noksha-accent-fg)">
                {uploading ? `${progress}%` : 'Done'}
              </span>
              <Button
                type="button"
                variant="ghost"
                tone="neutral"
                iconOnly
                size="xs"
                icon={<XIcon />}
                aria-label="Remove file"
                onClick={() => {
                  handleFile(null);
                  if (inputRef.current) inputRef.current.value = '';
                }}
              />
            </div>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-(--noksha-bg-subtle)">
            <div
              className="h-full rounded-full transition-[width] duration-150 ease-out"
              style={{
                width: `${progress}%`,
                background:
                  'linear-gradient(90deg, var(--noksha-accent-solid), var(--noksha-info-solid))',
              }}
            />
          </div>
        </div>
      ) : null}
      <FieldDescription>
        {uploading ? 'Uploading…' : 'A gradient progress bar that actually moves.'}
      </FieldDescription>
    </FieldRoot>
  );
}

function AttachmentDropzone() {
  const [file, setFile] = React.useState<File | null>(null);
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <UploadIcon />
        </span>
        <FieldLabel>Attachment</FieldLabel>
      </div>
      <div className="relative">
        <label
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            setFile(event.dataTransfer.files?.[0] ?? null);
          }}
          className={`${DROPZONE_BASE} ${dragging ? DROPZONE_ACTIVE : DROPZONE_IDLE}`}
        >
          <input
            ref={inputRef}
            type="file"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="sr-only"
          />
          <span className={DROP_ICON_CIRCLE}>
            <UploadIcon />
          </span>
          <span className="block">
            <span className="block font-medium text-(--noksha-fg-default) text-sm">
              {file ? file.name : 'Drop a file here'}
            </span>
            <span className="block text-(--noksha-fg-subtle) text-xs">
              {file ? formatSize(file.size) : 'or click to browse'}
            </span>
          </span>
        </label>
        <Button
          type="button"
          variant="soft"
          tone="neutral"
          iconOnly
          size="xs"
          icon={<XIcon />}
          aria-label="Remove file"
          onClick={() => {
            setFile(null);
            if (inputRef.current) inputRef.current.value = '';
          }}
          className={`absolute top-2 right-2 transition-all duration-200 ease-out ${file ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'}`}
        />
      </div>
      <FieldDescription>
        {dragging ? 'Drop it.' : 'Real drag-and-drop, not just a styled label.'}
      </FieldDescription>
    </FieldRoot>
  );
}

function GradientDropzone() {
  const [file, setFile] = React.useState<File | null>(null);
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <CloudIcon />
        </span>
        <FieldLabel>Import file</FieldLabel>
      </div>
      <label
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          setFile(event.dataTransfer.files?.[0] ?? null);
        }}
        className="block cursor-pointer rounded-2xl p-[2px] transition-[background]"
        style={{
          background: dragging
            ? 'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-info-solid))'
            : 'var(--noksha-border-default)',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          className="sr-only"
        />
        <span className="relative flex flex-col items-center gap-2 rounded-[calc(1rem-2px)] bg-(--noksha-bg-surface) p-8 text-center">
          <span className={DROP_ICON_CIRCLE}>
            <CloudIcon />
          </span>
          <span className="block">
            <span className="block font-medium text-(--noksha-fg-default) text-sm">
              {file ? file.name : 'Drop a file here'}
            </span>
            <span className="block text-(--noksha-fg-subtle) text-xs">
              {file ? formatSize(file.size) : 'or click to browse'}
            </span>
          </span>
          <Button
            type="button"
            variant="soft"
            tone="neutral"
            iconOnly
            size="xs"
            icon={<XIcon />}
            aria-label="Remove file"
            onClick={(event) => {
              event.preventDefault();
              setFile(null);
              if (inputRef.current) inputRef.current.value = '';
            }}
            className={`absolute top-2 right-2 transition-all duration-200 ease-out ${file ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'}`}
          />
        </span>
      </label>
      <FieldDescription>
        The border turns into a gradient the moment a file crosses it.
      </FieldDescription>
    </FieldRoot>
  );
}

function GlassDropzone() {
  const [file, setFile] = React.useState<File | null>(null);
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <CloudIcon />
        </span>
        <FieldLabel>Design asset</FieldLabel>
      </div>
      <div
        className="rounded-2xl p-4"
        style={{
          background:
            'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-danger-solid))',
        }}
      >
        <label
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            setFile(event.dataTransfer.files?.[0] ?? null);
          }}
          className={`relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-7 text-center backdrop-blur-md transition-colors ${
            dragging ? 'border-white bg-white/20' : 'border-white/30 bg-white/10 hover:bg-white/15'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="sr-only"
          />
          <span className="flex size-12 items-center justify-center rounded-full bg-white/15 text-white [&>svg]:size-5">
            <CloudIcon />
          </span>
          <span className="block">
            <span className="block font-medium text-sm text-white">
              {file ? file.name : 'Drop a file here'}
            </span>
            <span className="block text-white/70 text-xs">
              {file ? formatSize(file.size) : 'or click to browse'}
            </span>
          </span>
          <button
            type="button"
            aria-label="Remove file"
            onClick={(event) => {
              event.preventDefault();
              setFile(null);
              if (inputRef.current) inputRef.current.value = '';
            }}
            className={`absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-white/20 text-white outline-none transition-all duration-200 ease-out hover:bg-white/30 [&>svg]:size-3.5 ${
              file ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'
            }`}
          >
            <XIcon />
          </button>
        </label>
      </div>
      <FieldDescription>
        Frosted glass over a gradient — the dropzone itself, not a card behind it.
      </FieldDescription>
    </FieldRoot>
  );
}

function NeonDropzone() {
  const [file, setFile] = React.useState<File | null>(null);
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <UploadIcon />
        </span>
        <FieldLabel>Backup archive</FieldLabel>
      </div>
      <label
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          setFile(event.dataTransfer.files?.[0] ?? null);
        }}
        className={`relative flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed bg-(--noksha-bg-inverse) p-8 text-center transition-[box-shadow,border-color] ${
          dragging
            ? 'border-(--noksha-accent-solid) shadow-[0_0_28px_-4px_var(--noksha-accent-solid)]'
            : 'border-(--noksha-fg-inverse)/20'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          className="sr-only"
        />
        <span className="flex size-12 items-center justify-center rounded-full bg-(--noksha-fg-inverse)/10 text-(--noksha-accent-solid) [&>svg]:size-5">
          <UploadIcon />
        </span>
        <span className="block">
          <span className="block font-medium text-(--noksha-fg-inverse) text-sm">
            {file ? file.name : 'Drop a file here'}
          </span>
          <span className="block text-(--noksha-fg-inverse)/50 text-xs">
            {file ? formatSize(file.size) : 'or click to browse'}
          </span>
        </span>
        <button
          type="button"
          aria-label="Remove file"
          onClick={(event) => {
            event.preventDefault();
            setFile(null);
            if (inputRef.current) inputRef.current.value = '';
          }}
          className={`absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-(--noksha-fg-inverse)/10 text-(--noksha-fg-inverse) outline-none transition-all duration-200 ease-out hover:bg-(--noksha-fg-inverse)/20 [&>svg]:size-3.5 ${
            file ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'
          }`}
        >
          <XIcon />
        </button>
      </label>
      <FieldDescription>
        Dark in both themes — the border glows the moment a file crosses it.
      </FieldDescription>
    </FieldRoot>
  );
}

function DropPreview() {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const previewRef = React.useRef<string | null>(null);

  function handleFile(next: File | null) {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    const url = next && isImage(next) ? URL.createObjectURL(next) : null;
    previewRef.current = url;
    setFile(next);
    setPreview(url);
  }

  React.useEffect(
    () => () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    },
    [],
  );

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <ImageIcon />
        </span>
        <FieldLabel>Drop &amp; preview</FieldLabel>
      </div>
      <label
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          handleFile(event.dataTransfer.files?.[0] ?? null);
        }}
        className={
          preview
            ? 'relative block cursor-pointer overflow-hidden rounded-2xl border border-(--noksha-border-default)'
            : `${DROPZONE_BASE} ${dragging ? DROPZONE_ACTIVE : DROPZONE_IDLE}`
        }
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
          className="sr-only"
        />
        {preview ? (
          <>
            <span
              className="block h-36 w-full bg-center bg-cover"
              style={{ backgroundImage: `url(${preview})` }}
            />
            <span className="flex items-center justify-between bg-(--noksha-bg-surface) px-3 py-2">
              <span className="truncate text-(--noksha-fg-default) text-xs">{file?.name}</span>
              <Button
                type="button"
                variant="ghost"
                tone="neutral"
                iconOnly
                size="xs"
                icon={<XIcon />}
                aria-label="Remove image"
                onClick={(event) => {
                  event.preventDefault();
                  handleFile(null);
                  if (inputRef.current) inputRef.current.value = '';
                }}
              />
            </span>
          </>
        ) : (
          <>
            <span className={DROP_ICON_CIRCLE}>
              <ImageIcon />
            </span>
            <span className="block font-medium text-(--noksha-fg-default) text-sm">
              Drop an image to preview it here
            </span>
            <span className="block text-(--noksha-fg-subtle) text-xs">or click to browse</span>
          </>
        )}
      </label>
      <FieldDescription>
        Drop and preview in one motion — the zone becomes the thumbnail.
      </FieldDescription>
    </FieldRoot>
  );
}

function CoverImagePicker() {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const previewRef = React.useRef<string | null>(null);

  function handleFile(next: File | null) {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    const url = next && isImage(next) ? URL.createObjectURL(next) : null;
    previewRef.current = url;
    setFile(next);
    setPreview(url);
  }

  React.useEffect(
    () => () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    },
    [],
  );

  return (
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
            aria-label={file ? 'Replace cover image' : 'Upload cover image'}
            onClick={() => inputRef.current?.click()}
            className="flex size-16 items-center justify-center overflow-hidden rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-(--noksha-bg-subtle) text-(--noksha-fg-muted) shadow-(--noksha-shadow-xs) outline-none focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2 [&>svg]:size-6"
          >
            {preview ? (
              <span
                className="size-full bg-center bg-cover"
                style={{ backgroundImage: `url(${preview})` }}
              />
            ) : (
              <ImageIcon />
            )}
          </button>
          <button
            type="button"
            aria-label="Remove image"
            onClick={() => {
              handleFile(null);
              if (inputRef.current) inputRef.current.value = '';
            }}
            className={`absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full border-2 border-(--noksha-bg-surface) bg-(--noksha-danger-solid) text-white outline-none transition-all duration-200 ease-out [&>svg]:size-3 ${
              preview ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'
            }`}
          >
            <XIcon />
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <Button
            type="button"
            variant="outline"
            tone="neutral"
            size="sm"
            onClick={() => inputRef.current?.click()}
          >
            {file ? 'Replace' : 'Upload'}
          </Button>
          <span className="text-(--noksha-fg-muted) text-xs">
            {file ? file.name : 'JPG or PNG'}
          </span>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
        className="sr-only"
      />
      <FieldDescription>
        A real thumbnail, built from the file itself — not a filename.
      </FieldDescription>
    </FieldRoot>
  );
}

function AvatarBadgePicker() {
  const [preview, setPreview] = React.useState<string | null>(null);
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const previewRef = React.useRef<string | null>(null);

  function handleFile(next: File | null) {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    const url = next ? URL.createObjectURL(next) : null;
    previewRef.current = url;
    setPreview(url);
  }

  React.useEffect(
    () => () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    },
    [],
  );

  return (
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
          aria-label={preview ? 'Change avatar' : 'Upload avatar'}
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            handleFile(event.dataTransfer.files?.[0] ?? null);
          }}
          className={`flex size-20 items-center justify-center overflow-hidden rounded-full outline-none transition-colors focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2 ${
            dragging
              ? 'border-2 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/30'
              : preview
                ? 'border border-(--noksha-border-default)'
                : 'border-2 border-(--noksha-border-default) border-dashed bg-(--noksha-bg-subtle) hover:border-(--noksha-border-strong)'
          }`}
        >
          {preview ? (
            <span
              className="size-full bg-center bg-cover"
              style={{ backgroundImage: `url(${preview})` }}
            />
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
            handleFile(null);
            if (inputRef.current) inputRef.current.value = '';
          }}
          className={`absolute top-0 right-0 flex size-6 items-center justify-center rounded-full border-2 border-(--noksha-bg-surface) bg-(--noksha-danger-solid) text-white outline-none transition-all duration-200 ease-out [&>svg]:size-3 ${
            preview ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'
          }`}
        >
          <XIcon />
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
        className="sr-only"
      />
      <FieldDescription>
        A camera badge that's always visible, not one that only shows up on hover.
      </FieldDescription>
    </FieldRoot>
  );
}

function GalleryPicker() {
  const [files, setFiles] = React.useState<Picked[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const nextId = React.useRef(0);

  function addFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    const next = Array.from(list).map((file) => ({
      id: nextId.current++,
      file,
      url: isImage(file) ? URL.createObjectURL(file) : null,
    }));
    setFiles((current) => [...current, ...next]);
  }

  function removeFile(id: number) {
    setFiles((current) => {
      const target = current.find((picked) => picked.id === id);
      if (target?.url) URL.revokeObjectURL(target.url);
      return current.filter((picked) => picked.id !== id);
    });
  }

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <ImageIcon />
        </span>
        <FieldLabel>Gallery</FieldLabel>
      </div>
      <div className="flex flex-wrap gap-2">
        {files.map((picked) => (
          <div
            key={picked.id}
            className="group relative size-14 shrink-0 overflow-hidden rounded-(--noksha-radius-md) border border-(--noksha-border-default)"
          >
            {picked.url ? (
              <span
                className="block size-full bg-center bg-cover"
                style={{ backgroundImage: `url(${picked.url})` }}
              />
            ) : (
              <span className="flex size-full items-center justify-center bg-(--noksha-bg-subtle) text-(--noksha-fg-muted) [&>svg]:size-5">
                <FileIcon />
              </span>
            )}
            <button
              type="button"
              aria-label={`Remove ${picked.file.name}`}
              onClick={() => removeFile(picked.id)}
              className="absolute inset-0 flex items-center justify-center bg-black/0 text-transparent outline-none transition-colors group-hover:bg-black/50 group-hover:text-white focus-visible:bg-black/50 focus-visible:text-white"
            >
              <XIcon />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label="Add files"
          className="flex size-14 shrink-0 items-center justify-center rounded-(--noksha-radius-md) border-2 border-(--noksha-border-default) border-dashed text-(--noksha-fg-muted) outline-none hover:border-(--noksha-border-strong) hover:text-(--noksha-fg-default) focus-visible:outline-2 focus-visible:outline-(--noksha-ring) focus-visible:outline-offset-2 [&>svg]:size-6"
        >
          <UploadIcon />
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        onChange={(event) => addFiles(event.target.files)}
        className="sr-only"
      />
      <FieldDescription>
        {files.length} file{files.length === 1 ? '' : 's'} — each tile removable on its own.
      </FieldDescription>
    </FieldRoot>
  );
}

function AvatarRingPicker() {
  const [preview, setPreview] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const previewRef = React.useRef<string | null>(null);

  function handleFile(next: File | null) {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    const url = next ? URL.createObjectURL(next) : null;
    previewRef.current = url;
    setPreview(url);
    if (next) {
      setUploading(true);
      setProgress(0);
    }
  }

  React.useEffect(() => {
    if (!uploading) return;
    const timer = setInterval(() => {
      setProgress((value) => {
        const next = Math.min(100, value + 10);
        if (next >= 100) {
          clearInterval(timer);
          setUploading(false);
        }
        return next;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [uploading]);

  React.useEffect(
    () => () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    },
    [],
  );

  const ring = dragging ? 100 : progress;

  return (
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
              uploading || dragging
                ? `conic-gradient(var(--noksha-accent-solid) ${ring}%, var(--noksha-bg-subtle) ${ring}% 100%)`
                : 'var(--noksha-bg-subtle)',
          }}
        >
          <button
            type="button"
            aria-label={preview ? 'Change profile photo' : 'Upload profile photo'}
            onClick={() => inputRef.current?.click()}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              handleFile(event.dataTransfer.files?.[0] ?? null);
            }}
            className="flex size-20 items-center justify-center overflow-hidden rounded-full bg-(--noksha-bg-surface) text-(--noksha-fg-subtle) outline-none [&>svg]:size-8"
          >
            {preview ? (
              <span
                className="size-full bg-center bg-cover"
                style={{ backgroundImage: `url(${preview})` }}
              />
            ) : (
              <UserIcon />
            )}
          </button>
        </div>
        <button
          type="button"
          aria-label="Remove photo"
          onClick={() => {
            handleFile(null);
            setUploading(false);
            setProgress(0);
            if (inputRef.current) inputRef.current.value = '';
          }}
          className={`absolute top-0 right-0 flex size-6 items-center justify-center rounded-full border-2 border-(--noksha-bg-surface) bg-(--noksha-danger-solid) text-white outline-none transition-all duration-200 ease-out [&>svg]:size-3 ${
            preview ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'
          }`}
        >
          <XIcon />
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
        className="sr-only"
      />
      <FieldDescription>
        {uploading
          ? `${progress}% uploaded`
          : 'Drop or click — the ring around it is upload progress.'}
      </FieldDescription>
    </FieldRoot>
  );
}

export default function FieldFile() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Group title="Inputs and buttons">
        <DemoTile label="Plain input">
          <LogoFileInput />
        </DemoTile>

        <DemoTile label="Button trigger">
          <ResumeFilePicker />
        </DemoTile>

        <DemoTile label="Removable row">
          <AttachmentChip />
        </DemoTile>

        <DemoTile label="Upload progress">
          <VideoUploadProgress />
        </DemoTile>
      </Group>

      <Group title="Dropzones">
        <DemoTile label="Dropzone">
          <AttachmentDropzone />
        </DemoTile>

        <DemoTile label="Gradient border">
          <GradientDropzone />
        </DemoTile>

        <DemoTile label="Glass">
          <GlassDropzone />
        </DemoTile>

        <DemoTile label="Neon">
          <NeonDropzone />
        </DemoTile>

        <div className="min-w-0 sm:col-span-2">
          <DemoTile label="Drop and preview">
            <DropPreview />
          </DemoTile>
        </div>
      </Group>

      <Group title="Images and avatars">
        <DemoTile label="Thumbnail beside">
          <CoverImagePicker />
        </DemoTile>

        <DemoTile label="Avatar with camera badge">
          <AvatarBadgePicker />
        </DemoTile>

        <DemoTile label="Multi-file gallery">
          <GalleryPicker />
        </DemoTile>

        <DemoTile label="Avatar upload ring">
          <AvatarRingPicker />
        </DemoTile>
      </Group>
    </div>
  );
}
