import type { StoryGroup } from '../../stories.js';
import { Button } from '../button/button.js';
import { ToastProvider, useToast } from './toast.js';
import type { ToastPosition, ToastTone } from './toast.types.js';

const TONES: ToastTone[] = ['neutral', 'success', 'warning', 'danger', 'info'];

function ToneButtons() {
  const { toast } = useToast();

  return (
    <>
      {TONES.map((tone) => (
        <Button
          key={tone}
          variant="outline"
          tone={tone === 'neutral' ? 'neutral' : tone}
          onClick={() =>
            toast({
              tone,
              title: `${tone[0]?.toUpperCase()}${tone.slice(1)}`,
              description: 'Something happened worth mentioning.',
            })
          }
        >
          {tone}
        </Button>
      ))}
    </>
  );
}

function ActionButtons() {
  const { toast } = useToast();

  return (
    <>
      <Button
        onClick={() =>
          toast({
            tone: 'danger',
            title: 'Deployment failed',
            description: 'Build step 3 exited with code 1.',
            duration: Number.POSITIVE_INFINITY,
            action: (
              <Button size="sm" variant="outline" tone="danger">
                Retry
              </Button>
            ),
          })
        }
      >
        With an action
      </Button>
      <Button
        variant="soft"
        tone="neutral"
        onClick={() => {
          toast({ id: 'save', title: 'Saving…' });
          setTimeout(() => toast({ id: 'save', tone: 'success', title: 'Saved' }), 900);
        }}
      >
        Replace in place
      </Button>
    </>
  );
}

function PositionButtons() {
  const positions: ToastPosition[] = ['top-left', 'top-center', 'top-right'];
  const { toast } = useToast();

  return (
    <>
      {positions.map((position) => (
        <Button
          key={position}
          variant="ghost"
          tone="neutral"
          onClick={() => toast({ title: position })}
        >
          {position}
        </Button>
      ))}
    </>
  );
}

export const toastStories: StoryGroup = {
  component: 'Toast',
  stories: [
    {
      name: 'Tones',
      description: 'Errors announce assertively; everything else waits for a natural pause.',
      render: () => (
        <ToastProvider>
          <ToneButtons />
        </ToastProvider>
      ),
    },
    {
      name: 'Actions and replacement',
      description:
        'Reusing an id updates the toast in place, so "Saving…" becomes "Saved" without a second card.',
      render: () => (
        <ToastProvider>
          <ActionButtons />
        </ToastProvider>
      ),
    },
    {
      name: 'Position',
      description: 'The viewport ignores the pointer, so an empty corner does not swallow clicks.',
      render: () => (
        <ToastProvider position="top-right">
          <PositionButtons />
        </ToastProvider>
      ),
    },
  ],
};
