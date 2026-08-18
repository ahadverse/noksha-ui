import {
  AvatarFallback,
  AvatarGroup,
  AvatarRoot,
  Badge,
  Button,
  CardContent,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
  FieldDescription,
  FieldLabel,
  FieldRoot,
  Separator,
  Switch,
} from '@noksha-ui/react';

const REVIEWERS = ['AL', 'GH', 'KJ', 'RP'];

/**
 * The specimen in the introduction hero.
 *
 * Eight components in one panel, rendered live — and rendered from a *server*
 * file, with no `'use client'` anywhere in it. That is not a detail of the
 * page; it is the claim the installation guide makes, standing where a reader
 * will see it first. If the flat exports ever stopped crossing the boundary,
 * this build would fail rather than the documentation quietly going stale.
 */
export function IntroSpecimen() {
  return (
    <CardRoot variant="elevated" padding="lg" className="w-full">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Deploy to production</CardTitle>
          <p className="mt-1 text-fg-muted text-sm">noksha-ui · main · 4f2a1c9</p>
        </div>
        <Badge dot variant="soft" tone="success">
          Checks passed
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <FieldRoot orientation="horizontal">
          <Switch defaultChecked />
          <div>
            <FieldLabel>Run migrations first</FieldLabel>
            <FieldDescription>Applies the moment you flip it.</FieldDescription>
          </div>
        </FieldRoot>

        <Separator />

        <div className="flex items-center gap-3">
          <AvatarGroup max={3} size="sm">
            {REVIEWERS.map((initials) => (
              <AvatarRoot key={initials}>
                <AvatarFallback>{initials}</AvatarFallback>
              </AvatarRoot>
            ))}
          </AvatarGroup>
          <span className="text-fg-muted text-sm">4 reviewers approved</span>
        </div>
      </CardContent>

      <CardFooter className="justify-end gap-2">
        <Button variant="ghost" tone="neutral" size="sm">
          Cancel
        </Button>
        <Button size="sm">Deploy</Button>
      </CardFooter>
    </CardRoot>
  );
}
