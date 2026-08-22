'use client';

import { Button, FieldDescription, FieldLabel, FieldRoot, Input, Skeleton, Spinner } from '@noksha-ui/react';
import * as React from 'react';

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

function matches(list: string[], query: string, limit = 5) {
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
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    aria-hidden="true"
  >
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

function highlight(name: string, query: string) {
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

export default function FieldSearch() {
  // 1. Existing: accent-bar input, plain result list.
  const [query1, setQuery1] = React.useState('');
  const results1 = matches(COMPONENTS, query1);

  // 2. Command palette: dark chrome, keyboard-shortcut chip.
  const [query2, setQuery2] = React.useState('');
  const results2 = matches(COMPONENTS, query2);

  // 3. Clearable: attached × button that only shows once there's text.
  const [query3, setQuery3] = React.useState('');

  // 4. Loading: debounced, spinner swaps in for the icon while "searching".
  const [query4, setQuery4] = React.useState('');
  const [loading4, setLoading4] = React.useState(false);
  const [results4, setResults4] = React.useState<string[]>([]);
  React.useEffect(() => {
    if (!query4) {
      setResults4([]);
      setLoading4(false);
      return;
    }
    setLoading4(true);
    const timer = setTimeout(() => {
      setResults4(matches(COMPONENTS, query4));
      setLoading4(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [query4]);

  // 5. Recent searches: shown on focus, before anything is typed.
  const [query5, setQuery5] = React.useState('');
  const [focused5, setFocused5] = React.useState(false);

  // 6. Grouped results: two labelled sections instead of one flat list.
  const [query6, setQuery6] = React.useState('');
  const componentResults6 = matches(COMPONENTS, query6, 3);
  const guideResults6 = matches(GUIDES, query6, 3);

  // 7. Voice search: an attached mic button that "listens", then fills the field.
  const [query7, setQuery7] = React.useState('');
  const [listening7, setListening7] = React.useState(false);
  function toggleListening() {
    if (listening7) return;
    setListening7(true);
    setTimeout(() => {
      setQuery7('Dialog');
      setListening7(false);
    }, 1200);
  }

  // 8. Expanding: a round icon button that grows into a field on click.
  const [expanded8, setExpanded8] = React.useState(false);
  const [query8, setQuery8] = React.useState('');
  const input8Ref = React.useRef<HTMLInputElement>(null);

  // 9. Keyboard-navigable: arrow keys move the highlight, Enter picks it.
  const [query9, setQuery9] = React.useState('');
  const [active9, setActive9] = React.useState(0);
  const results9 = matches(COMPONENTS, query9);
  React.useEffect(() => setActive9(0), [query9]);

  // 10. Match count: a live badge showing how many results exist.
  const [query10, setQuery10] = React.useState('');
  const count10 = query10
    ? COMPONENTS.filter((name) => name.toLowerCase().includes(query10.toLowerCase())).length
    : 0;

  // 11. Highlighted: the matched substring is bolded in accent colour.
  const [query11, setQuery11] = React.useState('');
  const results11 = matches(COMPONENTS, query11);

  // 12. Glass: a frosted panel floating over a gradient.
  const [query12, setQuery12] = React.useState('');

  // 13. Gradient ring: a pill with a gradient border and a gradient submit button.
  const [query13, setQuery13] = React.useState('');

  // 14. Neon: dark chrome, a glow that switches on with focus.
  const [query14, setQuery14] = React.useState('');

  // 15. Spotlight: an oversized launcher-style card.
  const [query15, setQuery15] = React.useState('');
  const results15 = matches(COMPONENTS, query15, 4);

  // 16. Typewriter: an idle placeholder that types itself out, phrase by phrase.
  const [query16, setQuery16] = React.useState('');
  const [phrase16, setPhrase16] = React.useState(0);
  const [typed16, setTyped16] = React.useState(0);
  React.useEffect(() => {
    const full = TYPE_EXAMPLES[phrase16] ?? '';
    if (typed16 >= full.length) {
      const pause = setTimeout(() => {
        setTyped16(0);
        setPhrase16((index) => (index + 1) % TYPE_EXAMPLES.length);
      }, 1200);
      return () => clearTimeout(pause);
    }
    const step = setTimeout(() => setTyped16((count) => count + 1), 80);
    return () => clearTimeout(step);
  }, [typed16, phrase16]);
  const typedPlaceholder = TYPE_EXAMPLES[phrase16]?.slice(0, typed16) ?? '';

  // 17. Pulsing: a continuous "always listening" ring behind the icon.
  const [query17, setQuery17] = React.useState('');

  // 18. Sliding underline: an accent bar that grows from the centre on focus.
  const [query18, setQuery18] = React.useState('');
  const [focused18, setFocused18] = React.useState(false);

  // 19. Shimmer: real Skeleton rows stand in while a debounced search "loads".
  const [query19, setQuery19] = React.useState('');
  const [loading19, setLoading19] = React.useState(false);
  const [results19, setResults19] = React.useState<string[]>([]);
  React.useEffect(() => {
    if (!query19) {
      setResults19([]);
      setLoading19(false);
      return;
    }
    setLoading19(true);
    const timer = setTimeout(() => {
      setResults19(matches(COMPONENTS, query19));
      setLoading19(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [query19]);

  // 20. Staggered: each row eases in a little after the one before it.
  const [query20, setQuery20] = React.useState('');
  const results20 = matches(COMPONENTS, query20);
  const [revealed20, setRevealed20] = React.useState(0);
  React.useEffect(() => {
    setRevealed20(0);
    const list = matches(COMPONENTS, query20);
    if (list.length === 0) return;
    const timers = list.map((_, index) =>
      setTimeout(() => setRevealed20((count) => Math.max(count, index + 1)), index * 70),
    );
    return () => timers.forEach(clearTimeout);
  }, [query20]);

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
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
          value={query1}
          onChange={(event) => setQuery1(event.target.value)}
          placeholder="Search…"
          className={ACCENT_INPUT_CLASSES}
        />
        {results1.length > 0 ? (
          <ul className={RESULT_LIST_CLASSES}>
            {results1.map((name) => (
              <li key={name} className={RESULT_ITEM_CLASSES}>
                {name}
              </li>
            ))}
          </ul>
        ) : null}
      </FieldRoot>

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
            value={query2}
            onChange={(event) => setQuery2(event.target.value)}
            placeholder="Type a command…"
            variant="ghost"
          />
          {results2.length > 0 ? (
            <ul className="mt-1.5 divide-y divide-(--noksha-border-subtle)">
              {results2.map((name) => (
                <li key={name} className="rounded-(--noksha-radius-sm) px-2 py-1.5 text-(--noksha-fg-default) text-sm hover:bg-(--noksha-bg-subtle)">
                  {name}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <FieldDescription>Dark chrome and a shortcut chip — built to float over a page.</FieldDescription>
      </FieldRoot>

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
            value={query3}
            onChange={(event) => setQuery3(event.target.value)}
            placeholder="Search…"
            className={GROUP_INPUT_CLASSES}
          />
          {query3 ? (
            <Button
              type="button"
              variant="ghost"
              tone="neutral"
              iconOnly
              icon={<XIcon />}
              aria-label="Clear search"
              onClick={() => setQuery3('')}
              className="shrink-0 rounded-none"
            />
          ) : null}
        </div>
        <FieldDescription>The × only exists once there's something to clear.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <SearchIcon />
          </span>
          <FieldLabel>Loading state</FieldLabel>
        </div>
        <Input
          type="search"
          startIcon={loading4 ? <Spinner size="xs" label="Searching" /> : <SearchIcon />}
          value={query4}
          onChange={(event) => setQuery4(event.target.value)}
          placeholder="Search…"
        />
        {results4.length > 0 ? (
          <ul className={RESULT_LIST_CLASSES}>
            {results4.map((name) => (
              <li key={name} className={RESULT_ITEM_CLASSES}>
                {name}
              </li>
            ))}
          </ul>
        ) : null}
        <FieldDescription>{loading4 ? 'Searching…' : 'A real 500ms debounce, not an instant filter.'}</FieldDescription>
      </FieldRoot>

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
          value={query5}
          onFocus={() => setFocused5(true)}
          onBlur={() => setFocused5(false)}
          onChange={(event) => setQuery5(event.target.value)}
          placeholder="Search…"
        />
        {focused5 && !query5 ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {RECENT_SEARCHES.map((name) => (
              <Button
                key={name}
                type="button"
                variant="soft"
                tone="neutral"
                size="xs"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => setQuery5(name)}
              >
                {name}
              </Button>
            ))}
          </div>
        ) : null}
        <FieldDescription>Empty and focused reveals history instead of nothing.</FieldDescription>
      </FieldRoot>

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
          value={query6}
          onChange={(event) => setQuery6(event.target.value)}
          placeholder="Search…"
        />
        {componentResults6.length > 0 || guideResults6.length > 0 ? (
          <div className={RESULT_LIST_CLASSES}>
            {componentResults6.length > 0 ? (
              <div className="p-1.5">
                <p className="px-1.5 py-1 font-medium text-(--noksha-fg-muted) text-xs uppercase">Components</p>
                {componentResults6.map((name) => (
                  <p key={name} className="rounded-(--noksha-radius-sm) px-1.5 py-1 text-(--noksha-fg-default) text-sm">
                    {name}
                  </p>
                ))}
              </div>
            ) : null}
            {guideResults6.length > 0 ? (
              <div className="p-1.5">
                <p className="px-1.5 py-1 font-medium text-(--noksha-fg-muted) text-xs uppercase">Guides</p>
                {guideResults6.map((name) => (
                  <p key={name} className="rounded-(--noksha-radius-sm) px-1.5 py-1 text-(--noksha-fg-default) text-sm">
                    {name}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
        <FieldDescription>One list, two sources — components and guides side by side.</FieldDescription>
      </FieldRoot>

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
            value={query7}
            onChange={(event) => setQuery7(event.target.value)}
            placeholder={listening7 ? 'Listening…' : 'Search…'}
            className={GROUP_INPUT_CLASSES}
          />
          <Button
            type="button"
            variant="ghost"
            tone={listening7 ? 'danger' : 'neutral'}
            iconOnly
            icon={<MicIcon />}
            aria-label="Search by voice"
            disabled={listening7}
            onClick={toggleListening}
            className="shrink-0 rounded-none"
          />
        </div>
        <FieldDescription>{listening7 ? 'Listening — release to fill the field.' : 'Tap the mic and the field fills itself.'}</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <SearchIcon />
          </span>
          <FieldLabel>Expanding</FieldLabel>
        </div>
        {expanded8 ? (
          <Input
            ref={input8Ref}
            type="search"
            startIcon={<SearchIcon />}
            value={query8}
            onChange={(event) => setQuery8(event.target.value)}
            onBlur={() => {
              if (!query8) setExpanded8(false);
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
              setExpanded8(true);
              requestAnimationFrame(() => input8Ref.current?.focus());
            }}
          />
        )}
        <FieldDescription>Starts as a button — becomes a field on click.</FieldDescription>
      </FieldRoot>

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
          value={query9}
          onChange={(event) => setQuery9(event.target.value)}
          onKeyDown={(event) => {
            if (results9.length === 0) return;
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setActive9((index) => Math.min(index + 1, results9.length - 1));
            } else if (event.key === 'ArrowUp') {
              event.preventDefault();
              setActive9((index) => Math.max(index - 1, 0));
            } else if (event.key === 'Enter') {
              event.preventDefault();
              setQuery9(results9[active9] ?? query9);
            }
          }}
          placeholder="Search…"
        />
        {results9.length > 0 ? (
          <ul className={RESULT_LIST_CLASSES}>
            {results9.map((name, index) => (
              <li
                key={name}
                data-active={index === active9 || undefined}
                className={`${RESULT_ITEM_CLASSES} data-active:bg-(--noksha-accent-subtle) data-active:text-(--noksha-accent-fg)`}
              >
                {name}
              </li>
            ))}
          </ul>
        ) : null}
        <FieldDescription>Arrow keys move the highlight, Enter picks it.</FieldDescription>
      </FieldRoot>

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
            query10 ? (
              <span className="rounded-full bg-(--noksha-accent-solid) px-1.5 py-0.5 font-semibold text-(--noksha-accent-on-solid) text-xs">
                {count10}
              </span>
            ) : undefined
          }
          value={query10}
          onChange={(event) => setQuery10(event.target.value)}
          placeholder="Search…"
        />
        <FieldDescription>The badge counts every match, not just the five shown elsewhere.</FieldDescription>
      </FieldRoot>

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
          value={query11}
          onChange={(event) => setQuery11(event.target.value)}
          placeholder="Search…"
        />
        {results11.length > 0 ? (
          <ul className={RESULT_LIST_CLASSES}>
            {results11.map((name) => (
              <li key={name} className={RESULT_ITEM_CLASSES}>
                {highlight(name, query11)}
              </li>
            ))}
          </ul>
        ) : null}
        <FieldDescription>The matched letters are bolded, not just the row.</FieldDescription>
      </FieldRoot>

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
            background: 'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-info-solid))',
          }}
        >
          <div className="flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-3 backdrop-blur-md transition-colors focus-within:border-white/50 focus-within:bg-white/15">
            <span className="text-white/80 [&_svg]:size-5">
              <SearchIcon />
            </span>
            <input
              id="search-glass"
              value={query12}
              onChange={(event) => setQuery12(event.target.value)}
              placeholder="Search anything…"
              className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/60"
            />
          </div>
        </div>
        <FieldDescription>Frosted glass over a live gradient, not a flat colour.</FieldDescription>
      </FieldRoot>

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
              background: 'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-danger-solid))',
            }}
          >
            <div className="flex items-center gap-2 rounded-full bg-(--noksha-bg-surface) px-4 py-2.5">
              <span className="text-(--noksha-accent-fg) [&_svg]:size-4">
                <SearchIcon />
              </span>
              <input
                id="search-gradient-ring"
                value={query13}
                onChange={(event) => setQuery13(event.target.value)}
                placeholder="Search…"
                className="w-full bg-transparent text-(--noksha-fg-default) text-base outline-none placeholder:text-(--noksha-fg-subtle)"
              />
            </div>
          </div>
          <Button type="button" variant="gradient" shape="circle" iconOnly icon={<SearchIcon />} aria-label="Search" />
        </div>
        <FieldDescription>A gradient border and a gradient button — same two colours, twice.</FieldDescription>
      </FieldRoot>

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
              value={query14}
              onChange={(event) => setQuery14(event.target.value)}
              placeholder="Search…"
              className="w-full bg-transparent py-2.5 font-mono text-(--noksha-fg-inverse) text-sm outline-none placeholder:text-(--noksha-fg-inverse)/40"
            />
          </div>
          <Button type="button" variant="glow" shape="circle" iconOnly icon={<BoltIcon />} aria-label="Search" />
        </div>
        <FieldDescription>Focus the field and the border lights up.</FieldDescription>
      </FieldRoot>

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
              value={query15}
              onChange={(event) => setQuery15(event.target.value)}
              placeholder="Jump to anything…"
              className="w-full bg-transparent py-1 text-(--noksha-fg-inverse) text-lg outline-none placeholder:text-(--noksha-fg-inverse)/40"
            />
          </div>
          {results15.length > 0 ? (
            <div className="border-(--noksha-fg-inverse)/10 border-t">
              {results15.map((name) => (
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
        <FieldDescription>Oversized and dark — built to sit on top of everything else.</FieldDescription>
      </FieldRoot>

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
              value={query16}
              onChange={(event) => setQuery16(event.target.value)}
              className="w-full bg-transparent font-mono text-(--noksha-fg-inverse) text-base outline-none"
            />
            {query16 ? null : (
              <div className="pointer-events-none absolute inset-0 flex items-center font-mono text-(--noksha-fg-inverse)/50 text-base">
                <span>{typedPlaceholder}</span>
                <span className="ms-0.5 animate-pulse">▍</span>
              </div>
            )}
          </div>
        </div>
        <FieldDescription>The placeholder types itself, one letter at a time.</FieldDescription>
      </FieldRoot>

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
              background: 'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-danger-solid))',
            }}
          />
          <div className="relative flex items-center gap-3 rounded-full border border-(--noksha-border-default) bg-(--noksha-bg-surface) px-4 py-3 shadow-(--noksha-shadow-md)">
            <span className="text-(--noksha-accent-fg) [&_svg]:size-4">
              <SearchIcon />
            </span>
            <input
              id="search-pulsing"
              value={query17}
              onChange={(event) => setQuery17(event.target.value)}
              placeholder="Search…"
              className="w-full bg-transparent text-(--noksha-fg-default) text-base outline-none placeholder:text-(--noksha-fg-subtle)"
            />
          </div>
        </div>
        <FieldDescription>A blurred glow breathes behind the whole field, always.</FieldDescription>
      </FieldRoot>

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
            value={query18}
            onChange={(event) => setQuery18(event.target.value)}
            onFocus={() => setFocused18(true)}
            onBlur={() => setFocused18(false)}
            placeholder="Search…"
            className="w-full bg-transparent text-(--noksha-fg-default) text-lg outline-none placeholder:text-(--noksha-fg-subtle)"
          />
          <span
            className={`pointer-events-none absolute inset-x-0 bottom-[-2px] h-0.5 origin-center transition-transform duration-300 ease-out ${focused18 ? 'scale-x-100' : 'scale-x-0'}`}
            style={{
              background: 'linear-gradient(90deg, var(--noksha-accent-solid), var(--noksha-danger-solid))',
            }}
          />
        </div>
        <FieldDescription>No box at all — a gradient bar grows from the centre on focus.</FieldDescription>
      </FieldRoot>

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
              value={query19}
              onChange={(event) => setQuery19(event.target.value)}
              placeholder="Search…"
              className="w-full bg-transparent text-(--noksha-fg-inverse) text-base outline-none placeholder:text-(--noksha-fg-inverse)/40"
            />
          </div>
          {loading19 ? (
            <div className="pt-3">
              <Skeleton variant="shimmer" tone="accent" shape="text" lines={3} />
            </div>
          ) : results19.length > 0 ? (
            <div className="pt-2">
              {results19.map((name) => (
                <p key={name} className="rounded-(--noksha-radius-md) px-2 py-1.5 text-(--noksha-fg-inverse)/90 text-sm hover:bg-(--noksha-fg-inverse)/5">
                  {name}
                </p>
              ))}
            </div>
          ) : null}
        </div>
        <FieldDescription>Real Skeleton rows, not a spinner, while the 700ms debounce runs.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <SearchIcon />
          </span>
          <FieldLabel htmlFor="search-staggered">Staggered</FieldLabel>
        </div>
        <div
          className="rounded-full p-[2px]"
          style={{ background: 'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-info-solid))' }}
        >
          <div className="flex items-center gap-3 rounded-full bg-(--noksha-bg-surface) px-4 py-2.5">
            <span className="text-(--noksha-accent-fg) [&_svg]:size-4">
              <SearchIcon />
            </span>
            <input
              id="search-staggered"
              value={query20}
              onChange={(event) => setQuery20(event.target.value)}
              placeholder="Search…"
              className="w-full bg-transparent text-(--noksha-fg-default) text-base outline-none placeholder:text-(--noksha-fg-subtle)"
            />
          </div>
        </div>
        {results20.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {results20.map((name, index) => (
              <span
                key={name}
                className={`rounded-full border border-(--noksha-accent-solid)/30 bg-(--noksha-accent-subtle)/50 px-3 py-1 font-medium text-(--noksha-accent-fg) text-sm transition-all duration-300 ease-out ${
                  index < revealed20 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                }`}
              >
                {name}
              </span>
            ))}
          </div>
        ) : null}
        <FieldDescription>Each chip scales in slightly after the last.</FieldDescription>
      </FieldRoot>
    </div>
  );
}
