import { Spinner } from '@noksha-ui/react';

export default function SpinnerBasic() {
  return (
    <>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="lg" className="text-danger" />
      <Spinner size="lg" className="text-success" />
    </>
  );
}
