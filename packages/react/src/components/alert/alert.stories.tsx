import type { StoryGroup } from '../../stories.js';
import { Button } from '../button/button.js';
import { Alert } from './alert.js';
import type { AlertTone, AlertVariant } from './alert.types.js';

const VARIANTS: AlertVariant[] = ['soft', 'outline', 'solid'];
const TONES: AlertTone[] = ['info', 'success', 'warning', 'danger'];

export const alertStories: StoryGroup = {
  component: 'Alert',
  stories: [
    {
      name: 'Tones',
      description: 'Each tone brings its own icon shape, so meaning survives without colour.',
      render: () => (
        <div className="flex w-full max-w-md flex-col gap-3">
          {TONES.map((tone) => (
            <Alert.Root key={tone} tone={tone}>
              <Alert.Title>{tone}</Alert.Title>
              <Alert.Description>A short explanation of what happened.</Alert.Description>
            </Alert.Root>
          ))}
        </div>
      ),
    },
    {
      name: 'Variants',
      render: () => (
        <div className="flex w-full max-w-md flex-col gap-3">
          {VARIANTS.map((variant) => (
            <Alert.Root key={variant} variant={variant} tone="warning">
              <Alert.Title>{variant}</Alert.Title>
              <Alert.Description>Your certificate expires in three days.</Alert.Description>
            </Alert.Root>
          ))}
        </div>
      ),
    },
    {
      name: 'With actions',
      description:
        'The action column spans both rows, so one button centres against two lines of text.',
      render: () => (
        <div className="w-full max-w-md">
          <Alert.Root tone="danger" live>
            <Alert.Title>Deployment failed</Alert.Title>
            <Alert.Description>Build step 3 exited with code 1.</Alert.Description>
            <Alert.Actions>
              <Button size="sm" variant="outline" tone="danger">
                Retry
              </Button>
            </Alert.Actions>
          </Alert.Root>
        </div>
      ),
    },
    {
      name: 'Title only',
      render: () => (
        <div className="w-full max-w-md">
          <Alert.Root tone="success">
            <Alert.Title>Saved</Alert.Title>
          </Alert.Root>
        </div>
      ),
    },
    {
      name: 'No icon',
      render: () => (
        <div className="w-full max-w-md">
          <Alert.Root icon={null} tone="neutral" variant="outline">
            <Alert.Title>Scheduled maintenance</Alert.Title>
            <Alert.Description>Sunday 02:00–04:00 UTC.</Alert.Description>
          </Alert.Root>
        </div>
      ),
    },
    {
      name: 'Long description',
      description:
        'The grid keeps wrapped text in its own column instead of sliding back under the icon.',
      render: () => (
        <div className="w-full max-w-md">
          <Alert.Root tone="info">
            <Alert.Title>Rate limit raised</Alert.Title>
            <Alert.Description>
              Your account now allows 10,000 requests per minute. The change applies to every key in
              this workspace and takes effect immediately, including keys created before today.
            </Alert.Description>
          </Alert.Root>
        </div>
      ),
    },
  ],
};
