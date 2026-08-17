import type { Metadata } from 'next';

import { PageHeader } from '@/components/page-header';

import { ThemeBuilder } from './theme-builder';

export const metadata: Metadata = {
  title: 'Theme builder',
  description:
    'Pick a brand colour and watch the OKLCH engine generate the whole palette, live, then copy the CSS.',
};

export default function ThemesPage() {
  return (
    <main id="content" className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <PageHeader
        eyebrow="Themes"
        title="Theme builder"
        description="One seed colour in, eleven perceptually even steps out. This runs the same engine the build does — nothing here is a mock-up."
      />
      <ThemeBuilder />
    </main>
  );
}
