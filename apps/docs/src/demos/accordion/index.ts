import type { Demo } from '@/lib/demos';

import AccordionBasic from './basic';
import AccordionMultiple from './multiple';

export const accordionDemos: Demo[] = [
  {
    id: 'basic',
    title: 'One at a time',
    description:
      'The panel animates to its own content height using a 0fr→1fr grid row — nothing is measured in JavaScript, so it stays correct when the content reflows.',
    Component: AccordionBasic,
    minHeight: 300,
  },
  {
    id: 'multiple',
    title: 'Several open',
    Component: AccordionMultiple,
    minHeight: 320,
  },
];
