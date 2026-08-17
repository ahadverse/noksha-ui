import type { CardVariant } from '@noksha-ui/react';
import { CardContent, CardHeader, CardRoot, CardTitle } from '@noksha-ui/react';

const VARIANTS: CardVariant[] = ['elevated', 'outline', 'subtle', 'ghost'];

export default function CardVariants() {
  return (
    <>
      {VARIANTS.map((variant) => (
        <CardRoot key={variant} variant={variant} className="w-44">
          <CardHeader>
            <CardTitle as="h3" className="text-base capitalize">
              {variant}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-fg-muted text-sm">
            The surface changes; the parts inside do not.
          </CardContent>
        </CardRoot>
      ))}
    </>
  );
}
