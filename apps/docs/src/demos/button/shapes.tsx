import { Button } from '@noksha-ui/react';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" strokeLinecap="round" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 3v12m0 0 4-4m-4 4-4-4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 19h16" strokeLinecap="round" />
  </svg>
);

export default function ButtonShapes() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Row label="circle">
        <Button shape="circle" iconOnly icon={<SearchIcon />} aria-label="Search" />
        {/* No iconOnly here: the shape alone makes the disc, and iconOnly is
            typed to forbid children. */}
        <Button shape="circle" variant="soft" aria-label="Account">
          A
        </Button>
        <Button
          shape="circle"
          iconOnly
          variant="outline"
          icon={<SearchIcon />}
          aria-label="Search"
        />
        <Button
          shape="circle"
          iconOnly
          variant="dashed"
          icon={<SearchIcon />}
          aria-label="Search"
        />
        <Button
          shape="circle"
          iconOnly
          variant="ghost"
          tone="danger"
          icon={<SearchIcon />}
          aria-label="Delete"
        />
      </Row>

      <Row label="round">
        <Button shape="round" icon={<SearchIcon />}>
          Search
        </Button>
        <Button shape="round" variant="outline" icon={<SearchIcon />}>
          Search
        </Button>
        <Button shape="round" variant="dashed" trailingIcon={<SearchIcon />}>
          Search
        </Button>
        <Button shape="round" variant="soft" tone="success" icon={<DownloadIcon />}>
          Download
        </Button>
      </Row>

      {/* Shape is orthogonal to size: the radius follows the box, not the scale. */}
      <Row label="sizes">
        <Button shape="circle" iconOnly size="xs" icon={<SearchIcon />} aria-label="Search" />
        <Button shape="circle" iconOnly size="sm" icon={<SearchIcon />} aria-label="Search" />
        <Button shape="circle" iconOnly size="lg" icon={<SearchIcon />} aria-label="Search" />
        <Button shape="round" size="xs">
          Extra small
        </Button>
        <Button shape="round" size="lg">
          Large
        </Button>
      </Row>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <code className="w-14 shrink-0 text-fg-subtle text-xs">{label}</code>
      {children}
    </div>
  );
}
