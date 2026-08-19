import { Spinner } from '@noksha-ui/react';
import type * as React from 'react';

export default function SpinnerSpeeds() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Row name="slow">
        <Spinner variant="ring" speed="slow" size="2xl" className="text-accent" />
        <Spinner variant="dots" speed="slow" size="2xl" className="text-accent" />
        <Spinner variant="bars" speed="slow" size="2xl" className="text-accent" />
        <Spinner variant="ripple" speed="slow" size="2xl" className="text-accent" />
        <Spinner variant="grid" speed="slow" size="2xl" className="text-accent" />
      </Row>

      <Row name="normal">
        <Spinner variant="ring" size="2xl" className="text-accent" />
        <Spinner variant="dots" size="2xl" className="text-accent" />
        <Spinner variant="bars" size="2xl" className="text-accent" />
        <Spinner variant="ripple" size="2xl" className="text-accent" />
        <Spinner variant="grid" size="2xl" className="text-accent" />
      </Row>

      <Row name="fast">
        <Spinner variant="ring" speed="fast" size="2xl" className="text-accent" />
        <Spinner variant="dots" speed="fast" size="2xl" className="text-accent" />
        <Spinner variant="bars" speed="fast" size="2xl" className="text-accent" />
        <Spinner variant="ripple" speed="fast" size="2xl" className="text-accent" />
        <Spinner variant="grid" speed="fast" size="2xl" className="text-accent" />
      </Row>
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
