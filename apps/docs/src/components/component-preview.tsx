import { type Demo, readDemoSource } from '@/lib/demos';

import { CodeBlock } from './code-block';
import { PreviewFrame } from './preview-frame';

/**
 * Renders one demo: the live component, and the exact file that produced it.
 *
 * The source is read from disk here rather than passed in, so nothing between
 * the file and the page can paraphrase it.
 */
export async function ComponentPreview({ component, demo }: { component: string; demo: Demo }) {
  const source = await readDemoSource(component, demo.id);

  return (
    <PreviewFrame
      title={demo.title}
      description={demo.description}
      source={source}
      minHeight={demo.minHeight}
      stack={demo.stack}
      preview={<demo.Component />}
      code={<CodeBlock code={source} variant="bare" maxHeight={520} />}
    />
  );
}
