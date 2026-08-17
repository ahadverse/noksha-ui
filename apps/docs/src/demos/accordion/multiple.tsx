import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from '@noksha-ui/react';

export default function AccordionMultiple() {
  return (
    // `type` decides the shape of `value` — passing a string here is a compile
    // error, not a silent no-op.
    <AccordionRoot
      type="multiple"
      variant="separated"
      defaultValue={['build', 'deploy']}
      className="w-full max-w-lg"
    >
      <AccordionItem value="install">
        <AccordionTrigger as="h3">Install</AccordionTrigger>
        <AccordionContent>Resolved 492 packages in 2.1s.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="build">
        <AccordionTrigger as="h3">Build</AccordionTrigger>
        <AccordionContent>Compiled 22 components, 19.6 kB of CSS.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="deploy">
        <AccordionTrigger as="h3">Deploy</AccordionTrigger>
        <AccordionContent>Promoted to production in eu-west-1.</AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  );
}
