import { Button, Spinner } from '@noksha-ui/react';

export default function SpinnerInline() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button loading loadingIcon={<Spinner variant="dots" label={null} />}>
          Uploading
        </Button>
        <Button
          loading
          loadingPlacement="icon"
          loadingIcon={<Spinner variant="bars" label={null} />}
          variant="outline"
        >
          Transcoding
        </Button>
        <Button
          loading
          loadingIcon={<Spinner variant="comet" label={null} />}
          variant="soft"
          shape="round"
          tone="success"
        >
          Deploying
        </Button>
      </div>

      <p className="flex items-center gap-2 text-fg-muted text-sm">
        <Spinner variant="beat" size="sm" label={null} />
        Checking 214 files — the label is silenced here because the sentence already says what is
        happening.
      </p>

      <div className="flex items-center gap-3 rounded-lg border border-line-subtle bg-surface p-4">
        <Spinner variant="ripple" className="size-6 text-accent" label={null} />
        <span className="text-fg text-sm">Waiting for the runner to pick this up…</span>
      </div>
    </div>
  );
}
