import { Skeleton } from '@noksha-ui/react';

export default function SkeletonBasic() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
        <Skeleton variant="pulse" shape="rounded" size="sm" />
        <code className="text-fg-subtle text-xs">pulse</code>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
        <Skeleton variant="breathe" shape="rounded" size="sm" />
        <code className="text-fg-subtle text-xs">breathe</code>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
        <Skeleton variant="blink" shape="rounded" size="sm" />
        <code className="text-fg-subtle text-xs">blink</code>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
        <Skeleton variant="fade" shape="rounded" size="sm" />
        <code className="text-fg-subtle text-xs">fade</code>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
        <Skeleton variant="shimmer" shape="rounded" size="sm" />
        <code className="text-fg-subtle text-xs">shimmer</code>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
        <Skeleton variant="wave" shape="rounded" size="sm" />
        <code className="text-fg-subtle text-xs">wave</code>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
        <Skeleton variant="sheen" shape="rounded" size="sm" />
        <code className="text-fg-subtle text-xs">sheen</code>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
        <Skeleton variant="slide" shape="rounded" size="sm" />
        <code className="text-fg-subtle text-xs">slide</code>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
        <Skeleton variant="ripple" shape="rounded" size="sm" />
        <code className="text-fg-subtle text-xs">ripple</code>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
        <Skeleton variant="glow" shape="rounded" size="sm" />
        <code className="text-fg-subtle text-xs">glow</code>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
        <Skeleton variant="bar" shape="rounded" size="sm" />
        <code className="text-fg-subtle text-xs">bar</code>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
        <Skeleton variant="gradient" shape="rounded" size="sm" />
        <code className="text-fg-subtle text-xs">gradient</code>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
        <Skeleton variant="stripe" shape="rounded" size="sm" />
        <code className="text-fg-subtle text-xs">stripe</code>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
        <Skeleton variant="grid" shape="rounded" size="sm" />
        <code className="text-fg-subtle text-xs">grid</code>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
        <Skeleton variant="dots" shape="rounded" size="sm" />
        <code className="text-fg-subtle text-xs">dots</code>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
        <Skeleton variant="outline" shape="rounded" size="sm" />
        <code className="text-fg-subtle text-xs">outline</code>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
        <Skeleton variant="dashed" shape="rounded" size="sm" />
        <code className="text-fg-subtle text-xs">dashed</code>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-line-subtle bg-surface p-4">
        <Skeleton variant="flat" shape="rounded" size="sm" />
        <code className="text-fg-subtle text-xs">flat</code>
      </div>
    </div>
  );
}
