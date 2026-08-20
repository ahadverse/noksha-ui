import { Skeleton } from '@noksha-ui/react';

export default function SkeletonLayouts() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-col gap-5 rounded-lg border border-line-subtle bg-surface p-5">
        <div className="flex items-center gap-4">
          <Skeleton variant="sheen" shape="circle" size="lg" />
          <div className="flex w-full flex-col gap-3">
            <Skeleton variant="sheen" size="lg" className="w-1/2" />
            <Skeleton variant="sheen" className="w-1/3" />
          </div>
          <Skeleton variant="sheen" shape="pill" size="lg" />
        </div>

        <div className="flex items-center gap-4">
          <Skeleton variant="sheen" shape="circle" size="lg" />
          <div className="flex w-full flex-col gap-3">
            <Skeleton variant="sheen" size="lg" className="w-2/3" />
            <Skeleton variant="sheen" className="w-1/4" />
          </div>
          <Skeleton variant="sheen" shape="pill" size="lg" />
        </div>

        <div className="flex items-center gap-4">
          <Skeleton variant="sheen" shape="circle" size="lg" />
          <div className="flex w-full flex-col gap-3">
            <Skeleton variant="sheen" size="lg" className="w-2/5" />
            <Skeleton variant="sheen" className="w-2/5" />
          </div>
          <Skeleton variant="sheen" shape="pill" size="lg" />
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 rounded-lg border border-line-subtle bg-surface p-5">
        <div className="flex items-center justify-between gap-4">
          <Skeleton variant="flat" size="lg" className="w-40" />
          <Skeleton variant="flat" size="lg" className="w-24" />
          <Skeleton variant="flat" size="lg" className="w-16" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <Skeleton variant="flat" size="lg" className="w-56" />
          <Skeleton variant="flat" size="lg" className="w-20" />
          <Skeleton variant="flat" size="lg" className="w-12" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <Skeleton variant="flat" size="lg" className="w-32" />
          <Skeleton variant="flat" size="lg" className="w-28" />
          <Skeleton variant="flat" size="lg" className="w-14" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <Skeleton variant="flat" size="lg" className="w-48" />
          <Skeleton variant="flat" size="lg" className="w-16" />
          <Skeleton variant="flat" size="lg" className="w-20" />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton variant="dashed" shape="pill" size="lg" />
          <Skeleton variant="outline" shape="pill" size="lg" className="w-24" />
        </div>
      </div>
    </div>
  );
}
