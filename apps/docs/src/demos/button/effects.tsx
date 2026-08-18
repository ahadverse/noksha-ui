import { Button } from '@noksha-ui/react';

const EFFECTS = [
  { effect: 'lift', label: 'Lift' },
  { effect: 'sheen', label: 'Sheen' },
  { effect: 'wipe', label: 'Wipe' },
  { effect: 'pulse', label: 'Pulse' },
  { effect: 'tilt', label: 'Tilt' },
] as const;

export default function ButtonEffects() {
  return (
    <>
      {EFFECTS.map(({ effect, label }) => (
        <Button key={effect} effect={effect}>
          {label}
        </Button>
      ))}
    </>
  );
}
