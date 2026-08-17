import { generateScale, SCALE_STEPS } from '@noksha-ui/tokens';

/**
 * The eleven steps of a generated scale, rendered from the real engine.
 *
 * `@noksha-ui/tokens` never imports React, so it runs here on the server during
 * the build — the swatches are the colours the library would actually ship for
 * this seed, not a screenshot or a hand-copied hex list.
 */
export function ScaleStrip({ label, seed }: { label: string; seed: string }) {
  const scale = generateScale(seed);

  return (
    <figure>
      <figcaption className="mb-1.5 flex items-baseline gap-2">
        <span className="font-medium text-fg text-sm">{label}</span>
        <code className="font-mono text-fg-subtle text-xs">{seed}</code>
      </figcaption>

      <div className="flex overflow-hidden rounded-lg border border-line-subtle">
        {SCALE_STEPS.map((step) => (
          <div
            key={step}
            className="h-12 flex-1"
            style={{ backgroundColor: scale[step] }}
            // The value is the useful part on hover; the step number is below.
            title={`${step} · ${scale[step]}`}
          />
        ))}
      </div>

      <div className="mt-1 flex">
        {SCALE_STEPS.map((step) => (
          <span key={step} className="flex-1 text-center font-mono text-[10px] text-fg-subtle">
            {step}
          </span>
        ))}
      </div>
    </figure>
  );
}
