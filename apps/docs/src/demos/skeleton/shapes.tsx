import { Skeleton } from '@noksha-ui/react';

export default function SkeletonShapes() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col items-center gap-2.5">
          <Skeleton variant="shimmer" shape="circle" />
          <code className="text-fg-subtle text-xs">circle</code>
        </div>

        <div className="flex flex-col items-center gap-2.5">
          <Skeleton variant="shimmer" shape="pill" />
          <code className="text-fg-subtle text-xs">pill</code>
        </div>

        <div className="flex w-32 flex-col items-center gap-2.5">
          <Skeleton variant="shimmer" shape="text" />
          <code className="text-fg-subtle text-xs">text</code>
        </div>

        <div className="flex w-32 flex-col items-center gap-2.5">
          <Skeleton variant="shimmer" shape="rect" size="xs" />
          <code className="text-fg-subtle text-xs">rect</code>
        </div>

        <div className="flex w-32 flex-col items-center gap-2.5">
          <Skeleton variant="shimmer" shape="rounded" size="xs" />
          <code className="text-fg-subtle text-xs">rounded</code>
        </div>
      </div>

      <div className="grid w-full gap-6 sm:grid-cols-3">
        <div className="flex flex-col gap-2.5">
          <Skeleton variant="shimmer" lines={2} />
          <code className="text-fg-subtle text-xs">{'lines={2}'}</code>
        </div>

        <div className="flex flex-col gap-2.5">
          <Skeleton variant="shimmer" lines={3} />
          <code className="text-fg-subtle text-xs">{'lines={3}'}</code>
        </div>

        <div className="flex flex-col gap-2.5">
          <Skeleton variant="shimmer" lines={5} />
          <code className="text-fg-subtle text-xs">{'lines={5}'}</code>
        </div>
      </div>
    </div>
  );
}
