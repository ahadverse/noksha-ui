import { Button, TooltipContent, TooltipRoot, TooltipTrigger } from '@noksha-ui/react';

const BoldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z" strokeLinejoin="round" />
  </svg>
);

const ItalicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M15 5h-5M14 19H9M13.5 5 10.5 19" strokeLinecap="round" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M10 13a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" strokeLinecap="round" />
    <path d="M14 11a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" strokeLinecap="round" />
  </svg>
);

const TOOLS = [
  { label: 'Bold', hint: 'Bold ⌘B', Icon: BoldIcon },
  { label: 'Italic', hint: 'Italic ⌘I', Icon: ItalicIcon },
  { label: 'Link', hint: 'Insert link ⌘K', Icon: LinkIcon },
];

export default function TooltipBasic() {
  return (
    <>
      {TOOLS.map((tool) => (
        <TooltipRoot key={tool.label}>
          <TooltipTrigger asChild>
            <Button
              iconOnly
              variant="ghost"
              tone="neutral"
              icon={<tool.Icon />}
              aria-label={tool.label}
            />
          </TooltipTrigger>
          <TooltipContent>{tool.hint}</TooltipContent>
        </TooltipRoot>
      ))}
    </>
  );
}
