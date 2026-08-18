import { Button } from '@noksha-ui/react';

export default function ButtonSurfaces() {
  return (
    <>
      <Button variant="gradient">Gradient</Button>
      <Button variant="glow">Glow</Button>
      <Button variant="glass">Glass</Button>
      <Button variant="dashed">Dashed</Button>
      <Button variant="gradient" tone="danger">
        Danger
      </Button>
      <Button variant="glow" tone="success">
        Success
      </Button>
    </>
  );
}
