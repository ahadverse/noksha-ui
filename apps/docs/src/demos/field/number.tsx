'use client';

import { Button, FieldDescription, FieldLabel, FieldRoot, Input } from '@noksha-ui/react';
import * as React from 'react';

const MIN_REPLICAS = 1;
const MAX_REPLICAS = 10;
const MIN_SEATS = 1;
const MAX_SEATS = 25;
const MIN_ITEMS = 0;
const MAX_ITEMS = 99;
const MIN_GUESTS = 1;
const MAX_GUESTS = 12;
const MIN_TICKETS = 1;
const MAX_TICKETS = 8;
const MIN_COPIES = 1;
const MAX_COPIES = 50;
const MIN_DOWNLOADS = 0;
const MAX_DOWNLOADS = 20;

const BADGE_CLASSES =
  'flex size-7 shrink-0 items-center justify-center rounded-full bg-(--noksha-accent-subtle) text-(--noksha-accent-fg) [&>svg]:size-3.5';

const STEPPER_CLASSES = [
  'inline-flex items-stretch overflow-hidden rounded-(--noksha-radius-md)',
  'border-0 border-s-4 border-(--noksha-accent-solid) bg-(--noksha-accent-subtle)/25',
  'hover:bg-(--noksha-accent-subtle)/40',
  'focus-within:bg-(--noksha-accent-subtle)/40',
  'focus-within:outline-(length:--noksha-ring-width) focus-within:outline-offset-(--noksha-ring-offset)',
  'focus-within:outline-(--noksha-ring)',
].join(' ');
const STEP_BUTTON_CLASSES =
  'aspect-square shrink-0 rounded-none text-(--noksha-accent-fg) hover:bg-(--noksha-accent-subtle)';
const STEP_INPUT_CLASSES = [
  'w-12 shrink border-x border-(--noksha-accent-solid)/30 bg-transparent text-center',
  '[appearance:textfield] focus-visible:outline-none',
  '[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
].join(' ');

const CARD_CLASSES = [
  'flex w-72 shrink-0 self-start items-center justify-between gap-3 rounded-(--noksha-radius-lg)',
  'border border-(--noksha-border-default) bg-(--noksha-bg-surface) p-3 shadow-(--noksha-shadow-xs)',
  'focus-within:border-(--noksha-border-focus)',
  'focus-within:outline-(length:--noksha-ring-width) focus-within:outline-offset-(--noksha-ring-offset)',
  'focus-within:outline-(--noksha-ring)',
].join(' ');
const QUANTITY_INPUT_CLASSES = [
  'w-16 shrink border-0 bg-transparent text-center text-2xl font-semibold tabular-nums',
  '[appearance:textfield] focus-visible:outline-none',
  '[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
].join(' ');

const CHIP_ROW_CLASSES = 'flex items-center gap-3';
const CHIP_INPUT_CLASSES = [
  'w-10 shrink rounded-full border-0 bg-(--noksha-bg-subtle) text-center tabular-nums',
  '[appearance:textfield] focus-visible:outline-none',
  '[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
].join(' ');

const SPIN_GROUP_CLASSES = [
  'inline-flex w-fit shrink-0 self-start items-center gap-2 rounded-(--noksha-radius-lg)',
  'border border-(--noksha-border-default) bg-(--noksha-bg-surface) py-1.5 pe-1.5 ps-3 shadow-(--noksha-shadow-xs)',
  'focus-within:border-(--noksha-border-focus)',
  'focus-within:outline-(length:--noksha-ring-width) focus-within:outline-offset-(--noksha-ring-offset)',
  'focus-within:outline-(--noksha-ring)',
].join(' ');
const SPIN_INPUT_CLASSES = [
  'w-10 shrink border-0 bg-transparent px-0 text-center text-xl font-semibold tabular-nums',
  '[appearance:textfield] focus-visible:outline-none',
  '[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
].join(' ');
const SPIN_BUTTON_CLASSES = 'h-full flex-1 rounded-none px-2 text-(--noksha-fg-muted)';

const BAR_CLASSES = 'flex w-72 shrink-0 self-start items-center gap-3';

const DASHED_ROW_CLASSES = 'inline-flex shrink-0 self-start items-center gap-2';
const DASHED_INPUT_CLASSES = [
  'w-10 shrink rounded-(--noksha-radius-md) border border-dashed border-(--noksha-border-strong)',
  'bg-transparent text-center tabular-nums',
  '[appearance:textfield] focus-visible:outline-none',
  '[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
].join(' ');

const HashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 4 7 20M17 4l-2 16M4 9h16M3 15h16" />
  </svg>
);

const UsersIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
    <circle cx="10" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
  </svg>
);

const CartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
    <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.8h7.2a2 2 0 0 0 2-1.6L21 8H6" />
  </svg>
);

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
  </svg>
);

const TicketIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4Z" />
    <path d="M10 6v12" strokeDasharray="2 2" />
  </svg>
);

const CopyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 4v11m0 0-4-4m4 4 4-4M4 19h16" />
  </svg>
);

const MinusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
  </svg>
);

const PlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m6 15 6-6 6 6" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function FieldNumber() {
  const [replicas, setReplicas] = React.useState(3);
  const [seats, setSeats] = React.useState(4);
  const [cart, setCart] = React.useState<Record<string, number>>({ tee: 2 });
  const [guests, setGuests] = React.useState(2);
  const [tickets, setTickets] = React.useState(2);
  const [copies, setCopies] = React.useState(1);
  const [downloads, setDownloads] = React.useState(3);

  function adjustCart(id: string, delta: number) {
    setCart((current) => ({ ...current, [id]: clamp((current[id] ?? 0) + delta, MIN_ITEMS, MAX_ITEMS) }));
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <HashIcon />
          </span>
          <FieldLabel>Replicas</FieldLabel>
        </div>
        <div className={STEPPER_CLASSES}>
          <Button
            type="button"
            variant="ghost"
            tone="accent"
            iconOnly
            icon={<MinusIcon />}
            aria-label="Decrease replicas"
            disabled={replicas <= MIN_REPLICAS}
            onClick={() => setReplicas((value) => clamp(value - 1, MIN_REPLICAS, MAX_REPLICAS))}
            className={STEP_BUTTON_CLASSES}
          />
          <Input
            type="number"
            inputMode="numeric"
            value={replicas}
            min={MIN_REPLICAS}
            max={MAX_REPLICAS}
            step={1}
            onChange={(event) =>
              setReplicas(clamp(Number(event.target.value) || MIN_REPLICAS, MIN_REPLICAS, MAX_REPLICAS))
            }
            className={STEP_INPUT_CLASSES}
          />
          <Button
            type="button"
            variant="ghost"
            tone="accent"
            iconOnly
            icon={<PlusIcon />}
            aria-label="Increase replicas"
            disabled={replicas >= MAX_REPLICAS}
            onClick={() => setReplicas((value) => clamp(value + 1, MIN_REPLICAS, MAX_REPLICAS))}
            className={STEP_BUTTON_CLASSES}
          />
        </div>
        <FieldDescription>A pill stepper — buttons attached to the field itself.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <UsersIcon />
          </span>
          <FieldLabel>Seats</FieldLabel>
        </div>
        <div className={CARD_CLASSES}>
          <Button
            type="button"
            shape="circle"
            variant="outline"
            tone="neutral"
            iconOnly
            icon={<MinusIcon />}
            aria-label="Remove a seat"
            disabled={seats <= MIN_SEATS}
            onClick={() => setSeats((value) => clamp(value - 1, MIN_SEATS, MAX_SEATS))}
          />
          <Input
            type="number"
            inputMode="numeric"
            value={seats}
            min={MIN_SEATS}
            max={MAX_SEATS}
            step={1}
            onChange={(event) =>
              setSeats(clamp(Number(event.target.value) || MIN_SEATS, MIN_SEATS, MAX_SEATS))
            }
            className={QUANTITY_INPUT_CLASSES}
          />
          <Button
            type="button"
            shape="circle"
            variant="outline"
            tone="neutral"
            iconOnly
            icon={<PlusIcon />}
            aria-label="Add a seat"
            disabled={seats >= MAX_SEATS}
            onClick={() => setSeats((value) => clamp(value + 1, MIN_SEATS, MAX_SEATS))}
          />
        </div>
        <FieldDescription>Round buttons in a card instead of a bare spinner.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <CartIcon />
          </span>
          <FieldLabel>Cart items</FieldLabel>
        </div>
        <div className={CHIP_ROW_CLASSES}>
          <Button
            type="button"
            shape="circle"
            variant="soft"
            tone="danger"
            size="sm"
            iconOnly
            icon={<MinusIcon />}
            aria-label="Remove an item"
            disabled={(cart.tee ?? 0) <= MIN_ITEMS}
            onClick={() => adjustCart('tee', -1)}
          />
          <Input
            id="cart-tee"
            type="number"
            inputMode="numeric"
            size="sm"
            value={cart.tee ?? 0}
            min={MIN_ITEMS}
            max={MAX_ITEMS}
            step={1}
            onChange={(event) =>
              setCart((current) => ({
                ...current,
                tee: clamp(Number(event.target.value) || MIN_ITEMS, MIN_ITEMS, MAX_ITEMS),
              }))
            }
            className={CHIP_INPUT_CLASSES}
          />
          <Button
            type="button"
            shape="circle"
            variant="soft"
            tone="success"
            size="sm"
            iconOnly
            icon={<PlusIcon />}
            aria-label="Add an item"
            disabled={(cart.tee ?? 0) >= MAX_ITEMS}
            onClick={() => adjustCart('tee', 1)}
          />
        </div>
        <FieldDescription>No box at all — just two soft, color-coded chips.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <TicketIcon />
          </span>
          <FieldLabel>Tickets</FieldLabel>
        </div>
        <div className={BAR_CLASSES}>
          <Button
            type="button"
            variant="solid"
            tone="accent"
            size="lg"
            iconOnly
            icon={<MinusIcon />}
            aria-label="Remove a ticket"
            disabled={tickets <= MIN_TICKETS}
            onClick={() => setTickets((value) => clamp(value - 1, MIN_TICKETS, MAX_TICKETS))}
            className="rounded-(--noksha-radius-lg)"
          />
          <span className="flex-1 text-center text-2xl font-bold tabular-nums">{tickets}</span>
          <Button
            type="button"
            variant="solid"
            tone="accent"
            size="lg"
            iconOnly
            icon={<PlusIcon />}
            aria-label="Add a ticket"
            disabled={tickets >= MAX_TICKETS}
            onClick={() => setTickets((value) => clamp(value + 1, MIN_TICKETS, MAX_TICKETS))}
            className="rounded-(--noksha-radius-lg)"
          />
        </div>
        <FieldDescription>Solid, blocky buttons — built for a thumb, not a cursor.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <UserIcon />
          </span>
          <FieldLabel>Guests</FieldLabel>
        </div>
        <div className={SPIN_GROUP_CLASSES}>
          <Input
            type="number"
            inputMode="numeric"
            size="sm"
            value={guests}
            min={MIN_GUESTS}
            max={MAX_GUESTS}
            step={1}
            onChange={(event) =>
              setGuests(clamp(Number(event.target.value) || MIN_GUESTS, MIN_GUESTS, MAX_GUESTS))
            }
            className={SPIN_INPUT_CLASSES}
          />
          <div className="flex flex-col divide-y divide-(--noksha-border-subtle) rounded-(--noksha-radius-sm) border border-(--noksha-border-default)">
            <Button
              type="button"
              variant="ghost"
              tone="neutral"
              size="xs"
              iconOnly
              icon={<ChevronUpIcon />}
              aria-label="Increase guests"
              disabled={guests >= MAX_GUESTS}
              onClick={() => setGuests((value) => clamp(value + 1, MIN_GUESTS, MAX_GUESTS))}
              className={SPIN_BUTTON_CLASSES}
            />
            <Button
              type="button"
              variant="ghost"
              tone="neutral"
              size="xs"
              iconOnly
              icon={<ChevronDownIcon />}
              aria-label="Decrease guests"
              disabled={guests <= MIN_GUESTS}
              onClick={() => setGuests((value) => clamp(value - 1, MIN_GUESTS, MAX_GUESTS))}
              className={SPIN_BUTTON_CLASSES}
            />
          </div>
        </div>
        <FieldDescription>Stacked chevrons replace the left/right pair entirely.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <CopyIcon />
          </span>
          <FieldLabel>Copies</FieldLabel>
        </div>
        <div className="inline-flex items-center gap-4">
          <Button
            type="button"
            variant="link"
            tone="accent"
            aria-label="Decrease copies"
            disabled={copies <= MIN_COPIES}
            onClick={() => setCopies((value) => clamp(value - 1, MIN_COPIES, MAX_COPIES))}
          >
            − fewer
          </Button>
          <span className="text-(--noksha-fg-default) text-lg font-semibold tabular-nums">{copies}</span>
          <Button
            type="button"
            variant="link"
            tone="accent"
            aria-label="Increase copies"
            disabled={copies >= MAX_COPIES}
            onClick={() => setCopies((value) => clamp(value + 1, MIN_COPIES, MAX_COPIES))}
          >
            more +
          </Button>
        </div>
        <FieldDescription>No buttons at all — just underlined text doing the work.</FieldDescription>
      </FieldRoot>

      <FieldRoot>
        <div className="mb-1.5 flex items-center gap-2">
          <span className={BADGE_CLASSES}>
            <DownloadIcon />
          </span>
          <FieldLabel>Downloads</FieldLabel>
        </div>
        <div className={DASHED_ROW_CLASSES}>
          <Button
            type="button"
            variant="dashed"
            tone="neutral"
            shape="round"
            size="sm"
            iconOnly
            icon={<MinusIcon />}
            aria-label="Decrease downloads"
            disabled={downloads <= MIN_DOWNLOADS}
            onClick={() => setDownloads((value) => clamp(value - 1, MIN_DOWNLOADS, MAX_DOWNLOADS))}
          />
          <Input
            type="number"
            inputMode="numeric"
            size="sm"
            value={downloads}
            min={MIN_DOWNLOADS}
            max={MAX_DOWNLOADS}
            step={1}
            onChange={(event) =>
              setDownloads(clamp(Number(event.target.value) || MIN_DOWNLOADS, MIN_DOWNLOADS, MAX_DOWNLOADS))
            }
            className={DASHED_INPUT_CLASSES}
          />
          <Button
            type="button"
            variant="dashed"
            tone="neutral"
            shape="round"
            size="sm"
            iconOnly
            icon={<PlusIcon />}
            aria-label="Increase downloads"
            disabled={downloads >= MAX_DOWNLOADS}
            onClick={() => setDownloads((value) => clamp(value + 1, MIN_DOWNLOADS, MAX_DOWNLOADS))}
          />
        </div>
        <FieldDescription>Dashed all the way through — button, badge and button alike.</FieldDescription>
      </FieldRoot>
    </div>
  );
}
