'use client';

import {
  FieldDescription,
  FieldLabel,
  FieldRoot,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from '@noksha-ui/react';
import { AsYouType, type CountryCode, getCountries, getCountryCallingCode } from 'libphonenumber-js';
import * as React from 'react';

/** Regional-indicator flag emoji, built from the ISO code rather than typed by hand. */
function isoToFlag(iso: string) {
  return iso
    .toUpperCase()
    .replace(/./g, (letter) => String.fromCodePoint(127397 + letter.charCodeAt(0)));
}

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

function regionName(iso: string) {
  try {
    return regionNames.of(iso) ?? iso;
  } catch {
    return iso;
  }
}

// Every ISO region libphonenumber-js has metadata for, so the list — and the
// as-you-type formatting below — covers the world instead of a hand-picked
// handful of countries.
const COUNTRIES = getCountries()
  .map((iso) => ({
    iso,
    name: regionName(iso),
    code: `+${getCountryCallingCode(iso)}`,
    flag: isoToFlag(iso),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

/** A fresh formatter per call: it's pure over the full digit string, so it stays correct through typing, pasting and backspacing alike. */
function formatPhone(digits: string, iso: CountryCode) {
  return new AsYouType(iso).input(digits);
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
  'flex items-stretch overflow-hidden rounded-(--noksha-radius-md)',
  'border border-(--noksha-border-default) bg-(--noksha-bg-surface)',
  'focus-within:border-(--noksha-border-focus)',
  'focus-within:outline-(length:--noksha-ring-width) focus-within:outline-offset-(--noksha-ring-offset)',
  'focus-within:outline-(--noksha-ring)',
].join(' ');
const CODE_TRIGGER_CLASSES = [
  'w-auto shrink-0 rounded-none border-0 border-e border-(--noksha-border-default)',
  'bg-(--noksha-bg-subtle) px-3 hover:bg-(--noksha-bg-muted) focus-visible:outline-none',
].join(' ');
const DIGITS_INPUT_CLASSES = 'border-0 bg-transparent focus-visible:outline-none';
const SEARCH_ROW_CLASSES =
  'sticky top-0 z-10 -m-1 mb-1 border-b border-(--noksha-border-subtle) bg-(--noksha-bg-surface) p-2';
const SEARCH_INPUT_CLASSES =
  'w-full rounded-(--noksha-radius-sm) border border-(--noksha-border-default) bg-(--noksha-bg-subtle) px-2 py-1.5 text-sm outline-none focus-visible:border-(--noksha-border-focus)';

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 3h4l1.5 4.5L9 9.5a12 12 0 0 0 5.5 5.5l2-2.5L21 14v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2Z" />
  </svg>
);

function CountrySearch({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Select.Content's own mount-autofocus (which lands on the first option)
  // runs in an ancestor's effect, which fires *after* this one — a plain
  // `focus()` here loses that race. Deferred a frame, this one goes last.
  React.useEffect(() => {
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={SEARCH_ROW_CLASSES}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        placeholder="Search countries…"
        aria-label="Search countries"
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'Escape') {
            event.stopPropagation();
          }
        }}
        className={SEARCH_INPUT_CLASSES}
      />
    </div>
  );
}

export default function FieldTel() {
  const [value, setValue] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [iso, setIso] = React.useState<CountryCode>('US');
  const [digits, setDigits] = React.useState('');
  const country = COUNTRIES.find((entry) => entry.iso === iso) ?? COUNTRIES[0]!;

  const query = search.trim().toLowerCase();
  const filtered = query
    ? COUNTRIES.filter(
        (entry) => entry.name.toLowerCase().includes(query) || entry.code.includes(query),
      )
    : COUNTRIES;

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <PhoneIcon />
          </span>
          <FieldLabel>Phone number</FieldLabel>
        </div>
        <Input
          type="tel"
          value={value}
          placeholder="(555) 000-0000"
          onChange={(event) => setValue(formatPhone(event.target.value.replace(/\D/g, ''), 'US'))}
          className={ACCENT_INPUT_CLASSES}
        />
        <FieldDescription>Formatted as you type — only digits are ever stored.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <PhoneIcon />
          </span>
          <FieldLabel htmlFor="tel-with-code-digits">Mobile number</FieldLabel>
        </div>
        <div className={GROUP_CLASSES}>
          <SelectRoot
            value={iso}
            onValueChange={(nextIso) => {
              setIso(nextIso as CountryCode);
              setDigits((current) => formatPhone(current.replace(/\D/g, ''), nextIso as CountryCode));
            }}
            open={open}
            onOpenChange={(next) => {
              setOpen(next);
              if (!next) setSearch('');
            }}
          >
            <SelectTrigger
              aria-label="Calling code"
              className={CODE_TRIGGER_CLASSES}
              renderValue={() => (
                <span className="flex items-center gap-1.5">
                  <span aria-hidden="true">{country.flag}</span>
                  {country.code}
                </span>
              )}
            />
            <SelectContent matchTriggerWidth={false} className="w-64">
              <CountrySearch value={search} onChange={setSearch} />
              {filtered.length === 0 ? (
                <p className="px-2 py-3 text-center text-(--noksha-fg-muted) text-sm">
                  No country matches "{search}".
                </p>
              ) : (
                filtered.map((entry) => (
                  <SelectItem
                    key={entry.iso}
                    value={entry.iso}
                    textValue={`${entry.name} ${entry.code}`}
                  >
                    <span aria-hidden="true">{entry.flag}</span>
                    <span className="flex-1 truncate">{entry.name}</span>
                    <span className="text-(--noksha-fg-muted) text-xs">{entry.code}</span>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </SelectRoot>
          <Input
            id="tel-with-code-digits"
            type="tel"
            value={digits}
            placeholder="Phone number"
            onChange={(event) => setDigits(formatPhone(event.target.value.replace(/\D/g, ''), iso))}
            className={DIGITS_INPUT_CLASSES}
          />
        </div>
        <FieldDescription>
          {COUNTRIES.length} countries, formatted with `libphonenumber-js` — stored as {country.code}{' '}
          {digits || '…'}.
        </FieldDescription>
      </FieldRoot>
    </div>
  );
}
