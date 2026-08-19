import { Spinner } from '@noksha-ui/react';

export default function SpinnerBasic() {
  return (
    <div className="flex w-full flex-col gap-7">
      <div className="flex flex-wrap items-end gap-5">
        <Spinner size="xs" className="text-accent" />
        <Spinner size="sm" className="text-accent" />
        <Spinner size="md" className="text-accent" />
        <Spinner size="lg" className="text-accent" />
        <Spinner size="xl" className="text-accent" />
        <Spinner size="2xl" className="text-accent" />
        <Spinner size="3xl" className="text-accent" />
        <Spinner size="4xl" className="text-accent" />
      </div>

      <div className="grid w-fit grid-cols-4 gap-5 sm:grid-cols-8">
        <Spinner variant="pulse" size="2xl" className="text-accent" label={null} />
        <Spinner variant="pulse" size="2xl" className="text-danger" label={null} />
        <Spinner variant="pulse" size="2xl" className="text-success" label={null} />
        <Spinner variant="pulse" size="2xl" className="text-warning" label={null} />
        <Spinner variant="pulse" size="2xl" className="text-info" label={null} />
        <Spinner variant="pulse" size="2xl" className="text-fg" label={null} />
        <Spinner variant="pulse" size="2xl" className="text-fg-muted" label={null} />
        <Spinner variant="pulse" size="2xl" className="text-fg-subtle" label={null} />
      </div>

      <div className="grid w-fit grid-cols-4 gap-5 sm:grid-cols-8">
        <Spinner variant="pulse" size="2xl" style={{ color: '#f43f5e' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#fb7185' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#f97316' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#fb923c' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#f59e0b' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#eab308' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#a3e635' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#84cc16' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#22c55e' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#10b981' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#14b8a6' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#06b6d4' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#0ea5e9' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#3b82f6' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#6366f1' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#8b5cf6' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#a855f7' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#d946ef' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#ec4899' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#f472b6' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#be123c' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#78350f' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#0f766e' }} label={null} />
        <Spinner variant="pulse" size="2xl" style={{ color: '#1e3a8a' }} label="Ahad" />
      </div>
    </div>
  );
}
