import { Button } from '@noksha-ui/react';

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const SparkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3.5 13.9 9l5.6 1.9-5.6 2L12 18.5 10.1 13l-5.6-2L10.1 9 12 3.5Z" />
  </svg>
);

export default function ButtonComposed() {
  return (
    <>
      <Button variant="gradient" effect="sheen" size="lg" icon={<SparkIcon />}>
        Upgrade To Pro
      </Button>
      <Button variant="glow" tone="success" effect="pulse" size="lg">
        Deploy
      </Button>
      <Button variant="outline" tone="neutral" effect="lift" size="lg" trailingIcon={<ArrowIcon />}>
        Learn More
      </Button>
      <Button variant="soft" tone="danger" effect="wipe" size="lg">
        Delete Account
      </Button>
    </>
  );
}
