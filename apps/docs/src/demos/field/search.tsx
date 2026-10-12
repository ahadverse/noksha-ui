'use client';

import {
  Button,
  FieldDescription,
  FieldLabel,
  FieldRoot,
  Input,
  Skeleton,
  Spinner,
} from '@noksha-ui/react';
import * as React from 'react';

import { DemoTile } from '@/components/demo-tile';

const COMPONENTS = [
  'Accordion',
  'Alert',
  'Avatar',
  'Badge',
  'Button',
  'Card',
  'Checkbox',
  'Dialog',
  'Drawer',
  'Field',
  'Input',
  'Popover',
  'Radio',
  'Select',
  'Separator',
  'Skeleton',
  'Slider',
  'Spinner',
  'Switch',
  'Tabs',
  'Textarea',
  'Toast',
  'Tooltip',
];

const GUIDES = ['Getting started', 'Theming', 'Accessibility', 'Migration'];
const RECENT_SEARCHES = ['Button', 'Dialog', 'Toast'];
const TYPE_EXAMPLES = ['Button', 'Dialog', 'Toast', 'Skeleton'];

function findMatches(list: string[], query: string, limit = 5) {
  if (!query) return [];
  return list.filter((item) => item.toLowerCase().includes(query.toLowerCase())).slice(0, limit);
}

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';
const ACCENT_INPUT_CLASSES = [
  'border border-(--noksha-border-subtle)',
  'border-s-4 border-s-(--noksha-accent-solid)',
  'bg-(--noksha-accent-subtle)/25',
  'hover:border-(--noksha-border-strong) hover:border-s-(--noksha-accent-solid) hover:bg-(--noksha-accent-subtle)/40',
].join(' ');

const GROUP_CLASSES = [
  'flex w-full items-stretch overflow-hidden rounded-(--noksha-radius-md)',
  'border border-(--noksha-border-default) bg-(--noksha-bg-surface)',
  'focus-within:border-(--noksha-border-focus)',
  'focus-within:outline-(length:--noksha-ring-width) focus-within:outline-offset-(--noksha-ring-offset)',
  'focus-within:outline-(--noksha-ring)',
].join(' ');
const GROUP_INPUT_CLASSES = 'border-0 bg-transparent focus-visible:outline-none';
const GROUP_ICON_SLOT_CLASSES =
  'flex size-9 shrink-0 items-center justify-center text-(--noksha-fg-muted) [&_svg]:size-4';

const RESULT_LIST_CLASSES =
  'mt-2 divide-y divide-(--noksha-border-subtle) rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-(--noksha-bg-surface)';
const RESULT_ITEM_CLASSES = 'px-3 py-2 text-(--noksha-fg-default) text-sm';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m16.5 16.5 4 4" strokeLinecap="round" />
  </svg>
);

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const CommandIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 4a2.5 2.5 0 0 0-2.5 2.5V9M9 20a2.5 2.5 0 0 1-2.5-2.5V15M15 4a2.5 2.5 0 0 1 2.5 2.5V9M15 20a2.5 2.5 0 0 0 2.5-2.5V15" />
    <rect x="6.5" y="9" width="11" height="6" rx="1" />
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <path d="M11 2c.6 3.4 2.6 5.4 6 6-3.4.6-5.4 2.6-6 6-.6-3.4-2.6-5.4-6-6 3.4-.6 5.4-2.6 6-6Z" />
    <path d="M18.5 15c.3 1.7 1.3 2.7 3 3-1.7.3-2.7 1.3-3 3-.3-1.7-1.3-2.7-3-3 1.7-.3 2.7-1.3 3-3Z" />
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </svg>
);

const KeyboardIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" />
  </svg>
);

const BroadcastIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="2" />
    <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.5 5.5a9 9 0 0 0 0 13M18.5 5.5a9 9 0 0 1 0 13" />
  </svg>
);

const MicIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </svg>
);

function highlightMatch(name: string, query: string) {
  if (!query) return name;
  const index = name.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return name;
  return (
    <>
      {name.slice(0, index)}
      <mark className="bg-transparent font-semibold text-(--noksha-accent-fg)">
        {name.slice(index, index + query.length)}
      </mark>
      {name.slice(index + query.length)}
    </>
  );
}

function AccentSearch() {
  const [query, setQuery] = React.useState('');
  const results = findMatches(COMPONENTS, query);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <SearchIcon />
        </span>
        <FieldLabel>Search components</FieldLabel>
      </div>
      <Input
        type="search"
        startIcon={<SearchIcon />}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search…"
        className={ACCENT_INPUT_CLASSES}
      />
      {results.length > 0 ? (
        <ul className={RESULT_LIST_CLASSES}>
          {results.map((name) => (
            <li key={name} className={RESULT_ITEM_CLASSES}>
              {name}
            </li>
          ))}
        </ul>
      ) : null}
    </FieldRoot>
  );
}

function CommandPaletteSearch() {
  const [query, setQuery] = React.useState('');
  const results = findMatches(COMPONENTS, query);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <CommandIcon />
        </span>
        <FieldLabel htmlFor="search-palette">Command palette</FieldLabel>
      </div>
      <div className="rounded-(--noksha-radius-lg) border border-(--noksha-border-default) bg-(--noksha-bg-muted) p-1.5 shadow-(--noksha-shadow-md)">
        <Input
          id="search-palette"
          startIcon={<SearchIcon />}
          endIcon={
            <kbd className="rounded-(--noksha-radius-sm) border border-(--noksha-border-default) bg-(--noksha-bg-subtle) px-1.5 py-0.5 font-medium text-(--noksha-fg-muted) text-xs">
              ⌘K
            </kbd>
          }
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type a command…"
          variant="ghost"
        />
        {results.length > 0 ? (
          <ul className="mt-1.5 divide-y divide-(--noksha-border-subtle)">
            {results.map((name) => (
              <li
                key={name}
                className="rounded-(--noksha-radius-sm) px-2 py-1.5 text-(--noksha-fg-default) text-sm hover:bg-(--noksha-bg-subtle)"
              >
                {name}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <FieldDescription>
        Dark chrome and a shortcut chip — built to float over a page.
      </FieldDescription>
    </FieldRoot>
  );
}

function ClearableSearch() {
  const [query, setQuery] = React.useState('');

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <SearchIcon />
        </span>
        <FieldLabel htmlFor="search-clearable">Clearable</FieldLabel>
      </div>
      <div className={GROUP_CLASSES}>
        <span className={GROUP_ICON_SLOT_CLASSES}>
          <SearchIcon />
        </span>
        <Input
          id="search-clearable"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search…"
          className={GROUP_INPUT_CLASSES}
        />
        {query ? (
          <Button
            type="button"
            variant="ghost"
            tone="neutral"
            iconOnly
            icon={<XIcon />}
            aria-label="Clear search"
            onClick={() => setQuery('')}
            className="shrink-0 rounded-none"
          />
        ) : null}
      </div>
      <FieldDescription>The × only exists once there's something to clear.</FieldDescription>
    </FieldRoot>
  );
}

function LoadingSearch() {
  const [query, setQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      setResults(findMatches(COMPONENTS, query));
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <SearchIcon />
        </span>
        <FieldLabel>Loading state</FieldLabel>
      </div>
      <Input
        type="search"
        startIcon={loading ? <Spinner size="xs" label="Searching" /> : <SearchIcon />}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search…"
      />
      {results.length > 0 ? (
        <ul className={RESULT_LIST_CLASSES}>
          {results.map((name) => (
            <li key={name} className={RESULT_ITEM_CLASSES}>
              {name}
            </li>
          ))}
        </ul>
      ) : null}
      <FieldDescription>
        {loading ? 'Searching…' : 'A real 500ms debounce, not an instant filter.'}
      </FieldDescription>
    </FieldRoot>
  );
}

function RecentSearches() {
  const [query, setQuery] = React.useState('');
  const [focused, setFocused] = React.useState(false);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <SearchIcon />
        </span>
        <FieldLabel htmlFor="search-recent">Recent searches</FieldLabel>
      </div>
      <Input
        id="search-recent"
        type="search"
        startIcon={<SearchIcon />}
        value={query}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search…"
      />
      {focused && !query ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {RECENT_SEARCHES.map((name) => (
            <Button
              key={name}
              type="button"
              variant="soft"
              tone="neutral"
              size="xs"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => setQuery(name)}
            >
              {name}
            </Button>
          ))}
        </div>
      ) : null}
      <FieldDescription>Empty and focused reveals history instead of nothing.</FieldDescription>
    </FieldRoot>
  );
}

function GroupedResultsSearch() {
  const [query, setQuery] = React.useState('');
  const componentResults = findMatches(COMPONENTS, query, 3);
  const guideResults = findMatches(GUIDES, query, 3);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <SearchIcon />
        </span>
        <FieldLabel>Grouped results</FieldLabel>
      </div>
      <Input
        type="search"
        startIcon={<SearchIcon />}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search…"
      />
      {componentResults.length > 0 || guideResults.length > 0 ? (
        <div className={RESULT_LIST_CLASSES}>
          {componentResults.length > 0 ? (
            <div className="p-1.5">
              <p className="px-1.5 py-1 font-medium text-(--noksha-fg-muted) text-xs uppercase">
                Components
              </p>
              {componentResults.map((name) => (
                <p
                  key={name}
                  className="rounded-(--noksha-radius-sm) px-1.5 py-1 text-(--noksha-fg-default) text-sm"
                >
                  {name}
                </p>
              ))}
            </div>
          ) : null}
          {guideResults.length > 0 ? (
            <div className="p-1.5">
              <p className="px-1.5 py-1 font-medium text-(--noksha-fg-muted) text-xs uppercase">
                Guides
              </p>
              {guideResults.map((name) => (
                <p
                  key={name}
                  className="rounded-(--noksha-radius-sm) px-1.5 py-1 text-(--noksha-fg-default) text-sm"
                >
                  {name}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
      <FieldDescription>
        One list, two sources — components and guides side by side.
      </FieldDescription>
    </FieldRoot>
  );
}

function VoiceSearch() {
  const [query, setQuery] = React.useState('');
  const [listening, setListening] = React.useState(false);

  function startListening() {
    if (listening) return;
    setListening(true);
    setTimeout(() => {
      setQuery('Dialog');
      setListening(false);
    }, 1200);
  }

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <MicIcon />
        </span>
        <FieldLabel htmlFor="search-voice">Voice search</FieldLabel>
      </div>
      <div className={GROUP_CLASSES}>
        <span className={GROUP_ICON_SLOT_CLASSES}>
          <SearchIcon />
        </span>
        <Input
          id="search-voice"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={listening ? 'Listening…' : 'Search…'}
          className={GROUP_INPUT_CLASSES}
        />
        <Button
          type="button"
          variant="ghost"
          tone={listening ? 'danger' : 'neutral'}
          iconOnly
          icon={<MicIcon />}
          aria-label="Search by voice"
          disabled={listening}
          onClick={startListening}
          className="shrink-0 rounded-none"
        />
      </div>
      <FieldDescription>
        {listening
          ? 'Listening — release to fill the field.'
          : 'Tap the mic and the field fills itself.'}
      </FieldDescription>
    </FieldRoot>
  );
}

function ExpandingSearch() {
  const [expanded, setExpanded] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <SearchIcon />
        </span>
        <FieldLabel>Expanding</FieldLabel>
      </div>
      {expanded ? (
        <Input
          ref={inputRef}
          type="search"
          startIcon={<SearchIcon />}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => {
            if (!query) setExpanded(false);
          }}
          placeholder="Search…"
          className={ACCENT_INPUT_CLASSES}
        />
      ) : (
        <Button
          type="button"
          shape="circle"
          variant="outline"
          tone="neutral"
          iconOnly
          icon={<SearchIcon />}
          aria-label="Open search"
          onClick={() => {
            setExpanded(true);
            requestAnimationFrame(() => inputRef.current?.focus());
          }}
        />
      )}
      <FieldDescription>Starts as a button — becomes a field on click.</FieldDescription>
    </FieldRoot>
  );
}

function KeyboardNavSearch() {
  const [query, setQuery] = React.useState('');
  const [active, setActive] = React.useState(0);
  const results = findMatches(COMPONENTS, query);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <SearchIcon />
        </span>
        <FieldLabel htmlFor="search-keyboard">Keyboard nav</FieldLabel>
      </div>
      <Input
        id="search-keyboard"
        type="search"
        startIcon={<SearchIcon />}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setActive(0);
        }}
        onKeyDown={(event) => {
          if (results.length === 0) return;
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActive((index) => Math.min(index + 1, results.length - 1));
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActive((index) => Math.max(index - 1, 0));
          } else if (event.key === 'Enter') {
            event.preventDefault();
            setQuery(results[active] ?? query);
            setActive(0);
          }
        }}
        placeholder="Search…"
      />
      {results.length > 0 ? (
        <ul className={RESULT_LIST_CLASSES}>
          {results.map((name, index) => (
            <li
              key={name}
              data-active={index === active || undefined}
              className={`${RESULT_ITEM_CLASSES} data-active:bg-(--noksha-accent-subtle) data-active:text-(--noksha-accent-fg)`}
            >
              {name}
            </li>
          ))}
        </ul>
      ) : null}
      <FieldDescription>Arrow keys move the highlight, Enter picks it.</FieldDescription>
    </FieldRoot>
  );
}

function MatchCountSearch() {
  const [query, setQuery] = React.useState('');
  const count = query
    ? COMPONENTS.filter((name) => name.toLowerCase().includes(query.toLowerCase())).length
    : 0;

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <SearchIcon />
        </span>
        <FieldLabel htmlFor="search-count">Match count</FieldLabel>
      </div>
      <Input
        id="search-count"
        type="search"
        startIcon={<SearchIcon />}
        endIcon={
          query ? (
            <span className="rounded-full bg-(--noksha-accent-solid) px-1.5 py-0.5 font-semibold text-(--noksha-accent-on-solid) text-xs">
              {count}
            </span>
          ) : undefined
        }
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search…"
      />
      <FieldDescription>
        The badge counts every match, not just the five shown elsewhere.
      </FieldDescription>
    </FieldRoot>
  );
}

function HighlightedSearch() {
  const [query, setQuery] = React.useState('');
  const results = findMatches(COMPONENTS, query);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <SearchIcon />
        </span>
        <FieldLabel>Highlighted match</FieldLabel>
      </div>
      <Input
        type="search"
        startIcon={<SearchIcon />}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search…"
      />
      {results.length > 0 ? (
        <ul className={RESULT_LIST_CLASSES}>
          {results.map((name) => (
            <li key={name} className={RESULT_ITEM_CLASSES}>
              {highlightMatch(name, query)}
            </li>
          ))}
        </ul>
      ) : null}
      <FieldDescription>The matched letters are bolded, not just the row.</FieldDescription>
    </FieldRoot>
  );
}

function GlassSearch() {
  const [query, setQuery] = React.useState('');

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <SparkleIcon />
        </span>
        <FieldLabel htmlFor="search-glass">Glass</FieldLabel>
      </div>
      <div
        className="rounded-3xl p-5 shadow-(--noksha-shadow-lg)"
        style={{
          background:
            'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-info-solid))',
        }}
      >
        <div className="flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-3 backdrop-blur-md transition-colors focus-within:border-white/50 focus-within:bg-white/15">
          <span className="text-white/80 [&_svg]:size-5">
            <SearchIcon />
          </span>
          <input
            id="search-glass"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search anything…"
            className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/60"
          />
        </div>
      </div>
      <FieldDescription>Frosted glass over a live gradient, not a flat colour.</FieldDescription>
    </FieldRoot>
  );
}

function GradientRingSearch() {
  const [query, setQuery] = React.useState('');

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <SearchIcon />
        </span>
        <FieldLabel htmlFor="search-gradient-ring">Gradient ring</FieldLabel>
      </div>
      <div className="flex items-stretch gap-2">
        <div
          className="min-w-0 flex-1 rounded-full p-[2px]"
          style={{
            background:
              'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-danger-solid))',
          }}
        >
          <div className="flex items-center gap-2 rounded-full bg-(--noksha-bg-surface) px-4 py-2.5">
            <span className="text-(--noksha-accent-fg) [&_svg]:size-4">
              <SearchIcon />
            </span>
            <input
              id="search-gradient-ring"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search…"
              className="w-full bg-transparent text-(--noksha-fg-default) text-base outline-none placeholder:text-(--noksha-fg-subtle)"
            />
          </div>
        </div>
        <Button
          type="button"
          variant="gradient"
          shape="circle"
          iconOnly
          icon={<SearchIcon />}
          aria-label="Search"
        />
      </div>
      <FieldDescription>
        A gradient border and a gradient button — same two colours, twice.
      </FieldDescription>
    </FieldRoot>
  );
}

function NeonSearch() {
  const [query, setQuery] = React.useState('');

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <BoltIcon />
        </span>
        <FieldLabel htmlFor="search-neon">Neon</FieldLabel>
      </div>
      <div className="flex items-stretch gap-2 rounded-(--noksha-radius-lg) bg-(--noksha-bg-inverse) p-1.5 shadow-(--noksha-shadow-md)">
        <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-(--noksha-radius-md) border border-transparent bg-(--noksha-fg-inverse)/10 px-3 transition-[box-shadow,border-color] focus-within:border-(--noksha-accent-solid) focus-within:shadow-[0_0_20px_-2px_var(--noksha-accent-solid)]">
          <span className="text-(--noksha-accent-solid) [&_svg]:size-4">
            <SearchIcon />
          </span>
          <input
            id="search-neon"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search…"
            className="w-full bg-transparent py-2.5 font-mono text-(--noksha-fg-inverse) text-sm outline-none placeholder:text-(--noksha-fg-inverse)/40"
          />
        </div>
        <Button
          type="button"
          variant="glow"
          shape="circle"
          iconOnly
          icon={<BoltIcon />}
          aria-label="Search"
        />
      </div>
      <FieldDescription>Focus the field and the border lights up.</FieldDescription>
    </FieldRoot>
  );
}

function SpotlightSearch() {
  const [query, setQuery] = React.useState('');
  const results = findMatches(COMPONENTS, query, 4);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <SearchIcon />
        </span>
        <FieldLabel htmlFor="search-spotlight">Spotlight</FieldLabel>
      </div>
      <div className="rounded-3xl border border-(--noksha-fg-inverse)/10 bg-(--noksha-bg-inverse) p-2 shadow-(--noksha-shadow-lg)">
        <div className="flex items-center gap-3 px-3 py-2">
          <span className="text-(--noksha-fg-inverse)/50 [&_svg]:size-6">
            <SearchIcon />
          </span>
          <input
            id="search-spotlight"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Jump to anything…"
            className="w-full bg-transparent py-1 text-(--noksha-fg-inverse) text-lg outline-none placeholder:text-(--noksha-fg-inverse)/40"
          />
        </div>
        {results.length > 0 ? (
          <div className="border-(--noksha-fg-inverse)/10 border-t">
            {results.map((name) => (
              <p
                key={name}
                className="rounded-(--noksha-radius-md) px-4 py-2 text-(--noksha-fg-inverse)/90 text-sm hover:bg-(--noksha-fg-inverse)/5"
              >
                {name}
              </p>
            ))}
          </div>
        ) : null}
      </div>
      <FieldDescription>
        Oversized and dark — built to sit on top of everything else.
      </FieldDescription>
    </FieldRoot>
  );
}

function TypewriterSearch() {
  const [query, setQuery] = React.useState('');
  const [phrase, setPhrase] = React.useState(0);
  const [typed, setTyped] = React.useState(0);

  React.useEffect(() => {
    const full = TYPE_EXAMPLES[phrase] ?? '';
    if (typed >= full.length) {
      const pause = setTimeout(() => {
        setTyped(0);
        setPhrase((index) => (index + 1) % TYPE_EXAMPLES.length);
      }, 1200);
      return () => clearTimeout(pause);
    }
    const step = setTimeout(() => setTyped((count) => count + 1), 80);
    return () => clearTimeout(step);
  }, [typed, phrase]);

  const typedPlaceholder = TYPE_EXAMPLES[phrase]?.slice(0, typed) ?? '';

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <KeyboardIcon />
        </span>
        <FieldLabel htmlFor="search-typewriter">Typewriter</FieldLabel>
      </div>
      <div className="flex items-center gap-3 rounded-full bg-(--noksha-bg-inverse) px-4 py-3 shadow-(--noksha-shadow-md)">
        <span className="text-(--noksha-accent-solid) [&_svg]:size-5">
          <SearchIcon />
        </span>
        <div className="relative min-w-0 flex-1">
          <input
            id="search-typewriter"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent font-mono text-(--noksha-fg-inverse) text-base outline-none"
          />
          {query ? null : (
            <div className="pointer-events-none absolute inset-0 flex items-center font-mono text-(--noksha-fg-inverse)/50 text-base">
              <span>{typedPlaceholder}</span>
              <span className="ms-0.5 animate-pulse">▍</span>
            </div>
          )}
        </div>
      </div>
      <FieldDescription>The placeholder types itself, one letter at a time.</FieldDescription>
    </FieldRoot>
  );
}

function PulsingSearch() {
  const [query, setQuery] = React.useState('');

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className="relative flex size-7 shrink-0 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-(--noksha-accent-solid)/40" />
          <span className={`relative ${BADGE_CLASSES}`}>
            <BroadcastIcon />
          </span>
        </span>
        <FieldLabel htmlFor="search-pulsing">Pulsing</FieldLabel>
      </div>
      <div className="relative">
        <span
          className="absolute -inset-1.5 animate-pulse rounded-full opacity-70 blur-lg"
          style={{
            background:
              'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-danger-solid))',
          }}
        />
        <div className="relative flex items-center gap-3 rounded-full border border-(--noksha-border-default) bg-(--noksha-bg-surface) px-4 py-3 shadow-(--noksha-shadow-md)">
          <span className="text-(--noksha-accent-fg) [&_svg]:size-4">
            <SearchIcon />
          </span>
          <input
            id="search-pulsing"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search…"
            className="w-full bg-transparent text-(--noksha-fg-default) text-base outline-none placeholder:text-(--noksha-fg-subtle)"
          />
        </div>
      </div>
      <FieldDescription>A blurred glow breathes behind the whole field, always.</FieldDescription>
    </FieldRoot>
  );
}

function UnderlineSearch() {
  const [query, setQuery] = React.useState('');
  const [focused, setFocused] = React.useState(false);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <SearchIcon />
        </span>
        <FieldLabel htmlFor="search-underline">Sliding underline</FieldLabel>
      </div>
      <div className="relative flex items-center gap-3 border-(--noksha-border-default) border-b-2 pb-3">
        <span className="text-(--noksha-fg-muted) [&_svg]:size-5">
          <SearchIcon />
        </span>
        <input
          id="search-underline"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search…"
          className="w-full bg-transparent text-(--noksha-fg-default) text-lg outline-none placeholder:text-(--noksha-fg-subtle)"
        />
        <span
          className={
            focused
              ? 'pointer-events-none absolute inset-x-0 bottom-[-2px] h-0.5 origin-center scale-x-100 transition-transform duration-300 ease-out'
              : 'pointer-events-none absolute inset-x-0 bottom-[-2px] h-0.5 origin-center scale-x-0 transition-transform duration-300 ease-out'
          }
          style={{
            background:
              'linear-gradient(90deg, var(--noksha-accent-solid), var(--noksha-danger-solid))',
          }}
        />
      </div>
      <FieldDescription>
        No box at all — a gradient bar grows from the centre on focus.
      </FieldDescription>
    </FieldRoot>
  );
}

function ShimmerSearch() {
  const [query, setQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      setResults(findMatches(COMPONENTS, query));
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <SearchIcon />
        </span>
        <FieldLabel htmlFor="search-shimmer">Shimmer</FieldLabel>
      </div>
      <div className="rounded-2xl bg-(--noksha-bg-inverse) p-4 shadow-(--noksha-shadow-md)">
        <div className="flex items-center gap-3 border-(--noksha-fg-inverse)/15 border-b pb-3">
          <span className="text-(--noksha-fg-inverse)/60 [&_svg]:size-4">
            <SearchIcon />
          </span>
          <input
            id="search-shimmer"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search…"
            className="w-full bg-transparent text-(--noksha-fg-inverse) text-base outline-none placeholder:text-(--noksha-fg-inverse)/40"
          />
        </div>
        {loading ? (
          <div className="pt-3">
            <Skeleton variant="shimmer" tone="accent" shape="text" lines={3} />
          </div>
        ) : results.length > 0 ? (
          <div className="pt-2">
            {results.map((name) => (
              <p
                key={name}
                className="rounded-(--noksha-radius-md) px-2 py-1.5 text-(--noksha-fg-inverse)/90 text-sm hover:bg-(--noksha-fg-inverse)/5"
              >
                {name}
              </p>
            ))}
          </div>
        ) : null}
      </div>
      <FieldDescription>
        Real Skeleton rows, not a spinner, while the 700ms debounce runs.
      </FieldDescription>
    </FieldRoot>
  );
}

function StaggeredSearch() {
  const [query, setQuery] = React.useState('');
  const [revealed, setRevealed] = React.useState(0);
  const results = findMatches(COMPONENTS, query);

  React.useEffect(() => {
    setRevealed(0);
    const list = findMatches(COMPONENTS, query);
    if (list.length === 0) return;
    const timers = list.map((_, index) =>
      setTimeout(() => setRevealed((count) => Math.max(count, index + 1)), index * 70),
    );
    return () => timers.forEach(clearTimeout);
  }, [query]);

  return (
    <FieldRoot>
      <div className="mb-1.5 flex items-center gap-2">
        <span className={BADGE_CLASSES}>
          <SearchIcon />
        </span>
        <FieldLabel htmlFor="search-staggered">Staggered</FieldLabel>
      </div>
      <div
        className="rounded-full p-[2px]"
        style={{
          background:
            'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-info-solid))',
        }}
      >
        <div className="flex items-center gap-3 rounded-full bg-(--noksha-bg-surface) px-4 py-2.5">
          <span className="text-(--noksha-accent-fg) [&_svg]:size-4">
            <SearchIcon />
          </span>
          <input
            id="search-staggered"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search…"
            className="w-full bg-transparent text-(--noksha-fg-default) text-base outline-none placeholder:text-(--noksha-fg-subtle)"
          />
        </div>
      </div>
      {results.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {results.map((name, index) => (
            <span
              key={name}
              className={
                index < revealed
                  ? 'scale-100 rounded-full border border-(--noksha-accent-solid)/30 bg-(--noksha-accent-subtle)/50 px-3 py-1 font-medium text-(--noksha-accent-fg) text-sm opacity-100 transition-all duration-300 ease-out'
                  : 'scale-75 rounded-full border border-(--noksha-accent-solid)/30 bg-(--noksha-accent-subtle)/50 px-3 py-1 font-medium text-(--noksha-accent-fg) text-sm opacity-0 transition-all duration-300 ease-out'
              }
            >
              {name}
            </span>
          ))}
        </div>
      ) : null}
      <FieldDescription>Each chip scales in slightly after the last.</FieldDescription>
    </FieldRoot>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex w-full flex-col gap-4">
      <h4 className="flex items-center gap-3 font-medium text-(--noksha-fg-subtle) text-xs uppercase tracking-wide after:h-px after:flex-1 after:bg-(--noksha-border-subtle)">
        {title}
      </h4>
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">{children}</div>
    </section>
  );
}

export default function FieldSearch() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Group title="Practical">
        <DemoTile label="Accent bar">
          <AccentSearch />
        </DemoTile>
        <DemoTile label="Command palette">
          <CommandPaletteSearch />
        </DemoTile>
        <DemoTile label="Clearable">
          <ClearableSearch />
        </DemoTile>
        <DemoTile label="Loading state">
          <LoadingSearch />
        </DemoTile>
        <DemoTile label="Recent searches">
          <RecentSearches />
        </DemoTile>
        <DemoTile label="Grouped results">
          <GroupedResultsSearch />
        </DemoTile>
        <DemoTile label="Voice search">
          <VoiceSearch />
        </DemoTile>
        <DemoTile label="Expanding">
          <ExpandingSearch />
        </DemoTile>
        <DemoTile label="Keyboard nav">
          <KeyboardNavSearch />
        </DemoTile>
        <DemoTile label="Match count">
          <MatchCountSearch />
        </DemoTile>
        <DemoTile label="Highlighted match">
          <HighlightedSearch />
        </DemoTile>
      </Group>

      <Group title="Bold">
        <DemoTile label="Glass">
          <GlassSearch />
        </DemoTile>
        <DemoTile label="Gradient ring">
          <GradientRingSearch />
        </DemoTile>
        <DemoTile label="Neon">
          <NeonSearch />
        </DemoTile>
        <DemoTile label="Spotlight">
          <SpotlightSearch />
        </DemoTile>
      </Group>

      <Group title="Animated">
        <DemoTile label="Typewriter">
          <TypewriterSearch />
        </DemoTile>
        <DemoTile label="Pulsing">
          <PulsingSearch />
        </DemoTile>
        <DemoTile label="Sliding underline">
          <UnderlineSearch />
        </DemoTile>
        <DemoTile label="Shimmer">
          <ShimmerSearch />
        </DemoTile>
        <div className="min-w-0 sm:col-span-2">
          <DemoTile label="Staggered">
            <StaggeredSearch />
          </DemoTile>
        </div>
      </Group>
    </div>
  );
}
