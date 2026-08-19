import { Spinner } from '@noksha-ui/react';

function ArcIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function AtomIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" opacity="0.3" />
      <path d="M12 3.5 15 12H9Z" fill="currentColor" stroke="none" />
      <path d="M12 20.5 15 12H9Z" fill="currentColor" stroke="none" opacity="0.35" />
    </svg>
  );
}

function PinwheelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 12V3a9 9 0 0 1 9 9Z" />
      <path d="M12 12h9a9 9 0 0 1-9 9Z" opacity="0.7" />
      <path d="M12 12v9a9 9 0 0 1-9-9Z" opacity="0.45" />
      <path d="M12 12H3a9 9 0 0 1 9-9Z" opacity="0.22" />
    </svg>
  );
}

function HexIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 2 8.66 5v10L12 22l-8.66-5V7Z" />
      <circle cx="12" cy="12" r="3.4" opacity="0.45" />
    </svg>
  );
}

function OrbitIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" opacity="0.3" />
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
      <circle cx="12" cy="3" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function RadarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M12 12V3a9 9 0 0 1 6.36 2.64Z" fill="currentColor" />
    </svg>
  );
}

function PetalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="4.5" r="3" />
      <circle cx="19.5" cy="12" r="3" opacity="0.75" />
      <circle cx="12" cy="19.5" r="3" opacity="0.5" />
      <circle cx="4.5" cy="12" r="3" opacity="0.3" />
    </svg>
  );
}

export default function SpinnerIcons() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="flex flex-col items-center gap-3 rounded-lg border border-line-subtle bg-surface p-4">
          <Spinner icon={<ArcIcon />} size="2xl" className="text-accent" />
          <code className="text-fg-subtle text-xs">arc</code>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-lg border border-line-subtle bg-surface p-4">
          <Spinner icon={<AtomIcon />} size="2xl" className="text-accent" />
          <code className="text-fg-subtle text-xs">atom</code>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-lg border border-line-subtle bg-surface p-4">
          <Spinner icon={<CompassIcon />} size="2xl" className="text-accent" />
          <code className="text-fg-subtle text-xs">compass</code>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-lg border border-line-subtle bg-surface p-4">
          <Spinner icon={<PinwheelIcon />} size="2xl" className="text-accent" />
          <code className="text-fg-subtle text-xs">pinwheel</code>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-lg border border-line-subtle bg-surface p-4">
          <Spinner icon={<HexIcon />} size="2xl" className="text-accent" />
          <code className="text-fg-subtle text-xs">hex</code>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-lg border border-line-subtle bg-surface p-4">
          <Spinner icon={<OrbitIcon />} size="2xl" className="text-accent" />
          <code className="text-fg-subtle text-xs">orbit</code>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-lg border border-line-subtle bg-surface p-4">
          <Spinner icon={<RadarIcon />} size="2xl" className="text-accent" />
          <code className="text-fg-subtle text-xs">radar</code>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-lg border border-line-subtle bg-surface p-4">
          <Spinner icon={<PetalIcon />} size="2xl" className="text-accent" />
          <code className="text-fg-subtle text-xs">petals</code>
        </div>
      </div>

      <div className="grid w-full gap-3 sm:grid-cols-2">
        <div className="flex items-center rounded-lg border border-line-subtle bg-surface px-4 py-3">
          <Spinner icon={<HexIcon />} size="md" className="text-accent">
            <span className="text-fg text-sm">Building the bundle</span>
          </Spinner>
        </div>

        <div className="flex items-center rounded-lg border border-line-subtle bg-surface px-4 py-3">
          <Spinner icon={<RadarIcon />} size="md" speed="slow" className="text-accent">
            <span className="text-fg text-sm">Finding the nearest region</span>
          </Spinner>
        </div>
      </div>
    </div>
  );
}
