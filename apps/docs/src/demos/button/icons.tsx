import { Button } from '@noksha-ui/react';

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ButtonIcons() {
  return (
    <>
      <Button icon={<PlusIcon />}>New project</Button>
      <Button variant="outline" trailingIcon={<ArrowIcon />}>
        Continue
      </Button>

      {/* iconOnly demands an aria-label — the type will not compile without one. */}
      <Button iconOnly variant="soft" icon={<PlusIcon />} aria-label="Add item" />
    </>
  );
}
