import { Skeleton } from '@noksha-ui/react';

export default function SkeletonTones() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
          <Skeleton variant="shimmer" shape="rounded" size="sm" tone="neutral" />
          <code className="text-fg-subtle text-xs">neutral</code>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
          <Skeleton variant="shimmer" shape="rounded" size="sm" tone="accent" />
          <code className="text-fg-subtle text-xs">accent</code>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
          <Skeleton variant="shimmer" shape="rounded" size="sm" tone="danger" />
          <code className="text-fg-subtle text-xs">danger</code>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
          <Skeleton variant="shimmer" shape="rounded" size="sm" tone="success" />
          <code className="text-fg-subtle text-xs">success</code>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
          <Skeleton variant="shimmer" shape="rounded" size="sm" tone="warning" />
          <code className="text-fg-subtle text-xs">warning</code>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
          <Skeleton variant="shimmer" shape="rounded" size="sm" tone="info" />
          <code className="text-fg-subtle text-xs">info</code>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <Skeleton
          variant="wave"
          shape="rounded"
          size="sm"
          className="[--sk-subtle-hover:#fda4af] [--sk-subtle:#fecdd3]"
        />

        <Skeleton
          variant="wave"
          shape="rounded"
          size="sm"
          className="[--sk-subtle-hover:#fdba74] [--sk-subtle:#fed7aa]"
        />

        <Skeleton
          variant="wave"
          shape="rounded"
          size="sm"
          className="[--sk-subtle-hover:#86efac] [--sk-subtle:#bbf7d0]"
        />

        <Skeleton
          variant="wave"
          shape="rounded"
          size="sm"
          className="[--sk-subtle-hover:#7dd3fc] [--sk-subtle:#bae6fd]"
        />

        <Skeleton
          variant="wave"
          shape="rounded"
          size="sm"
          className="[--sk-subtle-hover:#c4b5fd] [--sk-subtle:#ddd6fe]"
        />

        <Skeleton
          variant="wave"
          shape="rounded"
          size="sm"
          className="[--sk-subtle-hover:#f0abfc] [--sk-subtle:#f5d0fe]"
        />
      </div>
    </div>
  );
}
