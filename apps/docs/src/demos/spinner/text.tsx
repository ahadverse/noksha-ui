import { Spinner } from '@noksha-ui/react';

export default function SpinnerText() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="flex flex-col items-center gap-3 rounded-lg border border-line-subtle bg-surface p-4">
          <div className="flex h-16 items-center justify-center">
            <Spinner size="lg" className="text-accent">
              <span className="text-fg text-sm">Loading</span>
            </Spinner>
          </div>
          <code className="text-fg-subtle text-xs">end</code>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-lg border border-line-subtle bg-surface p-4">
          <div className="flex h-16 items-center justify-center">
            <Spinner size="lg" placement="start" className="text-accent">
              <span className="text-fg text-sm">Loading</span>
            </Spinner>
          </div>
          <code className="text-fg-subtle text-xs">start</code>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-lg border border-line-subtle bg-surface p-4">
          <div className="flex h-16 items-center justify-center">
            <Spinner size="lg" placement="top" className="text-accent">
              <span className="text-fg text-sm">Loading</span>
            </Spinner>
          </div>
          <code className="text-fg-subtle text-xs">top</code>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-lg border border-line-subtle bg-surface p-4">
          <div className="flex h-16 items-center justify-center">
            <Spinner size="lg" placement="bottom" className="text-accent">
              <span className="text-fg text-sm">Loading</span>
            </Spinner>
          </div>
          <code className="text-fg-subtle text-xs">bottom</code>
        </div>
      </div>

      <div className="grid w-full gap-3 sm:grid-cols-3">
        <div className="flex items-center rounded-lg border border-line-subtle bg-surface px-4 py-3">
          <Spinner variant="dots" size="md" className="text-accent">
            <span className="text-fg text-sm">Uploading 3 files</span>
          </Spinner>
        </div>

        <div className="flex items-center rounded-lg border border-line-subtle bg-surface px-4 py-3">
          <Spinner variant="bars" size="md" placement="start" className="text-accent">
            <span className="text-fg text-sm">Publishing the build</span>
          </Spinner>
        </div>

        <div className="flex items-center rounded-lg border border-line-subtle bg-surface px-4 py-3">
          <Spinner variant="beat" size="sm" label={null} className="text-fg-subtle">
            <span className="text-fg-muted text-sm">Checking 214 files</span>
          </Spinner>
        </div>
      </div>
    </div>
  );
}
