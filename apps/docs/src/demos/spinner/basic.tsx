import { Spinner } from '@noksha-ui/react';
import type * as React from 'react';

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
      </div>

      <div className="flex flex-col gap-3">
        <Row name="accent">
          <Spinner variant="bars" size="2xl" className="text-accent" label={null} />
          <Spinner variant="bars" size="2xl" className="text-accent-hover" label={null} />
          <Spinner variant="bars" size="2xl" className="text-accent-active" label={null} />
          <Spinner variant="bars" size="2xl" className="text-accent-fg" label={null} />
        </Row>

        <Row name="danger">
          <Spinner variant="bars" size="2xl" className="text-danger" label={null} />
          <Spinner variant="bars" size="2xl" className="text-danger-hover" label={null} />
          <Spinner variant="bars" size="2xl" className="text-danger-active" label={null} />
          <Spinner variant="bars" size="2xl" className="text-danger-fg" label={null} />
        </Row>

        <Row name="success">
          <Spinner variant="bars" size="2xl" className="text-success" label={null} />
          <Spinner variant="bars" size="2xl" className="text-success-hover" label={null} />
          <Spinner variant="bars" size="2xl" className="text-success-active" label={null} />
          <Spinner variant="bars" size="2xl" className="text-success-fg" label={null} />
        </Row>

        <Row name="warning">
          <Spinner variant="bars" size="2xl" className="text-warning" label={null} />
          <Spinner variant="bars" size="2xl" className="text-warning-hover" label={null} />
          <Spinner variant="bars" size="2xl" className="text-warning-active" label={null} />
          <Spinner variant="bars" size="2xl" className="text-warning-fg" label={null} />
        </Row>

        <Row name="info">
          <Spinner variant="bars" size="2xl" className="text-info" label={null} />
          <Spinner variant="bars" size="2xl" className="text-info-hover" label={null} />
          <Spinner variant="bars" size="2xl" className="text-info-active" label={null} />
          <Spinner variant="bars" size="2xl" className="text-info-fg" label={null} />
        </Row>

        <Row name="neutral">
          <Spinner variant="bars" size="2xl" className="text-fg" label={null} />
          <Spinner variant="bars" size="2xl" className="text-fg-muted" label={null} />
          <Spinner variant="bars" size="2xl" className="text-fg-subtle" label={null} />
          <Spinner variant="bars" size="2xl" className="text-fg-disabled" label={null} />
        </Row>
      </div>
    </div>
  );
}

function Row({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-6">
      <code className="w-16 shrink-0 text-fg-muted text-xs">{name}</code>
      {children}
    </div>
  );
}
