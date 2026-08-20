import { Skeleton } from '@noksha-ui/react';

export default function SkeletonSizes() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-wrap items-end gap-6 rounded-lg border border-line-subtle bg-surface p-5">
        <div className="flex flex-col items-center gap-3">
          <Skeleton variant="shimmer" shape="circle" size="xs" />
          <code className="text-fg-subtle text-xs">xs</code>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Skeleton variant="shimmer" shape="circle" size="sm" />
          <code className="text-fg-subtle text-xs">sm</code>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Skeleton variant="shimmer" shape="circle" size="md" />
          <code className="text-fg-subtle text-xs">md</code>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Skeleton variant="shimmer" shape="circle" size="lg" />
          <code className="text-fg-subtle text-xs">lg</code>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Skeleton variant="shimmer" shape="circle" size="xl" />
          <code className="text-fg-subtle text-xs">xl</code>
        </div>
      </div>

      <div className="grid w-full gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-5">
          <Skeleton variant="wave" size="xs" />
          <Skeleton variant="wave" size="sm" />
          <Skeleton variant="wave" size="md" />
          <Skeleton variant="wave" size="lg" />
          <Skeleton variant="wave" size="xl" />
          <code className="text-fg-subtle text-xs">shape="text"</code>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-5">
          <Skeleton variant="wave" shape="pill" size="xs" />
          <Skeleton variant="wave" shape="pill" size="sm" />
          <Skeleton variant="wave" shape="pill" size="md" />
          <Skeleton variant="wave" shape="pill" size="lg" />
          <Skeleton variant="wave" shape="pill" size="xl" />
          <code className="text-fg-subtle text-xs">shape="pill"</code>
        </div>
      </div>

      <div className="grid w-full gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-5">
          <Skeleton variant="sheen" shape="rounded" size="xs" />
          <code className="text-fg-subtle text-xs">rounded · xs</code>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-5">
          <Skeleton variant="sheen" shape="rounded" size="md" />
          <code className="text-fg-subtle text-xs">rounded · md</code>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-5">
          <Skeleton variant="sheen" shape="rounded" size="xl" />
          <code className="text-fg-subtle text-xs">rounded · xl</code>
        </div>
      </div>
    </div>
  );
}
