import { Input } from '@prism-ui/react';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m16.5 16.5 4 4" strokeLinecap="round" />
  </svg>
);

export default function InputIcons() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input startIcon={<SearchIcon />} placeholder="Search components" type="search" />
      <Input
        startIcon={<span className="text-fg-muted">$</span>}
        placeholder="0.00"
        inputMode="decimal"
      />
      <Input
        endIcon={<span className="text-fg-muted text-sm">.prism.dev</span>}
        placeholder="my-app"
      />
    </div>
  );
}
