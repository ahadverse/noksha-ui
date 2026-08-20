import { Skeleton } from '@noksha-ui/react';

export default function SkeletonCards() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid w-full gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-5 rounded-lg border border-line-subtle bg-surface p-5">
          <Skeleton variant="shimmer" shape="rounded" size="xl" />

          <div className="flex flex-col gap-3">
            <Skeleton variant="shimmer" size="xl" className="w-2/3" />
            <Skeleton variant="shimmer" lines={2} size="md" />
          </div>

          <div className="mt-auto flex items-center gap-3 border-line-subtle border-t pt-4">
            <Skeleton variant="shimmer" shape="circle" size="md" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <Skeleton variant="shimmer" size="md" className="w-1/2" />
              <Skeleton variant="shimmer" size="sm" className="w-1/3" />
            </div>
            <Skeleton variant="shimmer" shape="pill" size="md" className="w-16" />
          </div>
        </div>

        <div className="flex flex-col gap-5 rounded-lg border border-line-subtle bg-surface p-5">
          <div className="flex items-center gap-4">
            <Skeleton variant="wave" shape="circle" size="xl" />
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <Skeleton variant="wave" size="xl" className="w-2/3" />
              <Skeleton variant="wave" size="md" className="w-2/5" />
            </div>
          </div>

          <Skeleton variant="wave" lines={4} size="md" />

          <div className="mt-auto flex items-center gap-3 border-line-subtle border-t pt-4">
            <Skeleton variant="wave" shape="pill" size="md" className="w-24" />
            <Skeleton variant="wave" shape="pill" size="md" className="w-20" />
          </div>
        </div>
      </div>

      <div className="grid w-full gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-4 rounded-lg border border-line-subtle bg-surface p-5">
          <div className="flex items-center justify-between gap-3">
            <Skeleton variant="glow" size="md" className="w-20" />
            <Skeleton variant="glow" shape="circle" size="sm" />
          </div>
          <Skeleton variant="glow" size="xl" className="w-1/2" />
          <Skeleton variant="glow" size="sm" className="w-2/3" />
        </div>

        <div className="flex flex-col gap-4 rounded-lg border border-line-subtle bg-surface p-5">
          <div className="flex items-center justify-between gap-3">
            <Skeleton variant="glow" size="md" className="w-20" />
            <Skeleton variant="glow" shape="circle" size="sm" />
          </div>
          <Skeleton variant="glow" size="xl" className="w-2/5" />
          <Skeleton variant="glow" size="sm" className="w-2/3" />
        </div>

        <div className="flex flex-col gap-4 rounded-lg border border-line-subtle bg-surface p-5">
          <div className="flex items-center justify-between gap-3">
            <Skeleton variant="glow" size="md" className="w-20" />
            <Skeleton variant="glow" shape="circle" size="sm" />
          </div>
          <Skeleton variant="glow" size="xl" className="w-1/2" />
          <Skeleton variant="glow" size="sm" className="w-2/3" />
        </div>
      </div>
    </div>
  );
}
