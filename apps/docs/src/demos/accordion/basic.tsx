import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from '@prism-ui/react';

const FAQ = [
  {
    value: 'theming',
    question: 'Do I need a ThemeProvider?',
    answer:
      'No. Every token is a plain CSS custom property, so theming works with no React context at all. The provider exists only to toggle and persist the mode.',
  },
  {
    value: 'runtime',
    question: 'Is there any runtime CSS-in-JS?',
    answer:
      'None. Classes are computed at build time by the variant engine, and the shipped stylesheet is generated from the token engine.',
  },
  {
    value: 'rsc',
    question: 'Can I import it from a Server Component?',
    answer:
      'Yes — using the flat exports, as this file does. Every client entry carries a "use client" directive, so importing them from a server file simply makes them client components, which they are.',
  },
];

export default function AccordionBasic() {
  return (
    <AccordionRoot type="single" collapsible defaultValue="theming" className="w-full max-w-lg">
      {FAQ.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger as="h3">{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
}
