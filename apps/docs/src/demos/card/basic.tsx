import {
  Badge,
  Button,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
} from '@prism-ui/react';

export default function CardBasic() {
  return (
    <CardRoot className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle as="h3">Production</CardTitle>
          <Badge dot variant="soft" tone="success">
            Healthy
          </Badge>
        </div>
        <CardDescription>Deployed 12 minutes ago from main.</CardDescription>
      </CardHeader>

      <CardContent className="text-fg-muted text-sm">
        <dl className="grid grid-cols-2 gap-y-2">
          <dt>Region</dt>
          <dd className="text-right text-fg">eu-west-1</dd>
          <dt>Instances</dt>
          <dd className="text-right text-fg">6</dd>
          <dt>p99 latency</dt>
          <dd className="text-right text-fg">84 ms</dd>
        </dl>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost" tone="neutral" size="sm">
          Logs
        </Button>
        <Button size="sm">Redeploy</Button>
      </CardFooter>
    </CardRoot>
  );
}
