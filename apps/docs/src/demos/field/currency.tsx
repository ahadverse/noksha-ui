'use client';

import {
  Button,
  FieldDescription,
  FieldLabel,
  FieldRoot,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  sliderVariants,
} from '@noksha-ui/react';
import * as React from 'react';

function formatAmount(raw: string) {
  const digits = raw.replace(/\D/g, '');
  return digits ? new Intl.NumberFormat('en-US').format(Number(digits)) : '';
}

function toNumber(formatted: string) {
  return Number(formatted.replace(/\D/g, '')) || 0;
}

const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' },
];

const BUDGET_LIMIT = 5000;
const SLIDER_MAX = 10000;

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
const CODE_TRIGGER_CLASSES = [
  'w-auto shrink-0 rounded-none border-0 border-e border-(--noksha-border-default)',
  'bg-(--noksha-bg-subtle) px-3 font-medium hover:bg-(--noksha-bg-muted) focus-visible:outline-none',
].join(' ');

const CoinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="8" />
    <path d="M12 7v10M14.5 9.5a2.5 2 0 0 0-2.5-1c-1.4 0-2.5.8-2.5 1.8s1.1 1.7 2.5 1.7 2.5.7 2.5 1.7-1.1 1.8-2.5 1.8a2.5 2 0 0 1-2.5-1" />
  </svg>
);

const TagIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12.6 3.2 20 10.6a2 2 0 0 1 0 2.8l-6.6 6.6a2 2 0 0 1-2.8 0L3.2 12.6a2 2 0 0 1-.6-1.4V4a1 1 0 0 1 1-1h7.2a2 2 0 0 1 1.8.2Z" />
    <circle cx="7.5" cy="7.5" r="1.5" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
  </svg>
);

const PieIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
    <path d="M15 2.5A10 10 0 0 1 21.5 9H15V2.5Z" />
  </svg>
);

const ZapIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" />
  </svg>
);

const SlidersIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h13M20 18h.01" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="8" cy="12" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);

export default function FieldCurrency() {
  // 1. Plain — the original, now with a visible border on all sides.
  const [amount, setAmount] = React.useState('2,500');

  // 2. Big price tag — an oversized number with quick-adjust chips.
  const [amount2, setAmount2] = React.useState(4900);

  // 3. Currency selector — a Select for the code, live symbol, one value.
  const [currency3, setCurrency3] = React.useState('USD');
  const [amount3, setAmount3] = React.useState('1,200');
  const symbol3 = CURRENCIES.find((c) => c.code === currency3)?.symbol ?? '$';

  // 4. Budget card — a gradient panel with a real spend-vs-limit bar.
  const [amount4, setAmount4] = React.useState('3,200');
  const percent4 = Math.min(100, Math.round((toNumber(amount4) / BUDGET_LIMIT) * 100));

  // 5. Neon ticker — dark, theme-adjustable, glows on focus.
  const [amount5, setAmount5] = React.useState('8,450');

  // 6. Slider-linked — the input and the range share one value.
  const [amount6, setAmount6] = React.useState(2500);

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <CoinIcon />
          </span>
          <FieldLabel>Monthly budget</FieldLabel>
        </div>
        <Input
          startIcon={<span className="text-(--noksha-fg-muted)">$</span>}
          value={amount}
          inputMode="decimal"
          onChange={(event) => setAmount(formatAmount(event.target.value))}
          className={ACCENT_INPUT_CLASSES}
        />
        <FieldDescription>Digits are grouped with thousands separators as you type.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <TagIcon />
          </span>
          <FieldLabel>Asking price</FieldLabel>
        </div>
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-(--noksha-border-default) bg-(--noksha-bg-surface) py-6 shadow-(--noksha-shadow-xs)">
          <div className="flex items-start">
            <span className="mt-2 font-semibold text-(--noksha-fg-muted) text-xl">$</span>
            <span className="font-bold text-5xl text-(--noksha-fg-default) tabular-nums">
              {amount2.toLocaleString('en-US')}
            </span>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="soft" tone="neutral" size="sm" onClick={() => setAmount2((v) => Math.max(0, v - 100))}>
              −$100
            </Button>
            <Button type="button" variant="soft" tone="accent" size="sm" onClick={() => setAmount2((v) => v + 100)}>
              +$100
            </Button>
          </div>
        </div>
        <FieldDescription>The number is the whole design — everything else is secondary.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <GlobeIcon />
          </span>
          <FieldLabel htmlFor="currency-amount">Invoice total</FieldLabel>
        </div>
        <div className={GROUP_CLASSES}>
          <SelectRoot value={currency3} onValueChange={setCurrency3}>
            <SelectTrigger aria-label="Currency" className={CODE_TRIGGER_CLASSES} renderValue={() => currency3} />
            <SelectContent>
              {CURRENCIES.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.symbol} {c.code}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
          <Input
            id="currency-amount"
            value={amount3}
            inputMode="decimal"
            startIcon={<span className="text-(--noksha-fg-muted)">{symbol3}</span>}
            onChange={(event) => setAmount3(formatAmount(event.target.value))}
            className={GROUP_INPUT_CLASSES}
          />
        </div>
        <FieldDescription>Pick a currency from the dropdown — the symbol updates with it.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <PieIcon />
          </span>
          <FieldLabel htmlFor="currency-budget">Team spend</FieldLabel>
        </div>
        <div
          className="rounded-2xl p-4"
          style={{ background: 'linear-gradient(135deg, var(--noksha-accent-solid), var(--noksha-info-solid))' }}
        >
          <div className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 backdrop-blur-md transition-colors focus-within:border-white/50">
            <span className="text-white/80">$</span>
            <input
              id="currency-budget"
              value={amount4}
              inputMode="decimal"
              onChange={(event) => setAmount4(formatAmount(event.target.value))}
              className="w-full min-w-0 bg-transparent text-white outline-none"
            />
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
            <div className="h-full rounded-full bg-white transition-[width] duration-200 ease-out" style={{ width: `${percent4}%` }} />
          </div>
          <p className="mt-1.5 text-white/80 text-xs">
            {percent4}% of a ${BUDGET_LIMIT.toLocaleString('en-US')} monthly limit.
          </p>
        </div>
        <FieldDescription>The card itself is the progress bar — not a separate widget.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <ZapIcon />
          </span>
          <FieldLabel htmlFor="currency-neon">Bid amount</FieldLabel>
        </div>
        <div className="flex items-center gap-2 rounded-(--noksha-radius-lg) border border-transparent bg-(--noksha-bg-inverse) px-4 py-3 transition-[box-shadow,border-color] focus-within:border-(--noksha-accent-solid) focus-within:shadow-[0_0_20px_-2px_var(--noksha-accent-solid)]">
          <span className="font-bold font-mono text-(--noksha-accent-solid) text-xl">$</span>
          <input
            id="currency-neon"
            value={amount5}
            inputMode="decimal"
            onChange={(event) => setAmount5(formatAmount(event.target.value))}
            className="w-full min-w-0 bg-transparent font-bold font-mono text-2xl text-(--noksha-fg-inverse) tabular-nums outline-none"
          />
        </div>
        <FieldDescription>A ticker readout — dark in both themes, glows the moment you focus it.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <SlidersIcon />
          </span>
          <FieldLabel htmlFor="currency-slider">Offer amount</FieldLabel>
        </div>
        <Input
          id="currency-slider"
          startIcon={<span className="text-(--noksha-fg-muted)">$</span>}
          value={amount6.toLocaleString('en-US')}
          inputMode="decimal"
          onChange={(event) => setAmount6(Math.min(SLIDER_MAX, toNumber(event.target.value)))}
          className={ACCENT_INPUT_CLASSES}
        />
        <input
          type="range"
          min={0}
          max={SLIDER_MAX}
          step={100}
          value={amount6}
          aria-label="Offer amount"
          onChange={(event) => setAmount6(event.currentTarget.valueAsNumber)}
          style={{ ['--sl-fill' as string]: `${(amount6 / SLIDER_MAX) * 100}%` }}
          className={sliderVariants({ tone: 'accent', size: 'sm', className: 'mt-3' })}
        />
        <FieldDescription>Drag the slider or type a number — both stay in sync.</FieldDescription>
      </FieldRoot>
    </div>
  );
}
