import { Badge } from '@noksha-ui/react';

export default function BadgeStatus() {
  return (
    <>
      <Badge dot variant="soft" tone="success">
        Operational
      </Badge>
      <Badge dot variant="soft" tone="warning">
        Degraded
      </Badge>
      <Badge dot variant="soft" tone="danger">
        Outage
      </Badge>
      <Badge dot variant="soft" tone="neutral">
        Unknown
      </Badge>
    </>
  );
}
