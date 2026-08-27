import type { ReactNode } from 'react';
import styles from './plane-street.module.css';

const PLANE_PATH =
  'M1.55989957,5.41666667 L5.51582215,5.41666667 L4.47015462,0.108333333 L4.47015462,0.108333333 C4.47015462,0.0634601974 4.49708054,0.0249592654 4.5354546,0.00851337035 L4.57707145,0 L5.36229752,0 C5.43359776,0 5.50087375,0.028779451 5.55026392,0.0782711996 L5.59317877,0.134368264 L7.13659662,2.81558333 L8.29565964,2.81666667 C8.53185377,2.81666667 8.72332694,3.01067661 8.72332694,3.25 C8.72332694,3.48932339 8.53185377,3.68333333 8.29565964,3.68333333 L7.63589819,3.68225 L8.63450135,5.41666667 L11.9308317,5.41666667 C12.5213171,5.41666667 13,5.90169152 13,6.5 C13,7.09830848 12.5213171,7.58333333 11.9308317,7.58333333 L8.63450135,7.58333333 L7.63589819,9.31666667 L8.29565964,9.31666667 C8.53185377,9.31666667 8.72332694,9.51067661 8.72332694,9.75 C8.72332694,9.98932339 8.53185377,10.1833333 8.29565964,10.1833333 L7.13659662,10.1833333 L5.59317877,12.8656317 C5.55725264,12.9280353 5.49882018,12.9724157 5.43174295,12.9907056 L5.36229752,13 L4.57707145,13 L4.55610333,12.9978962 C4.51267695,12.9890959 4.48069792,12.9547924 4.47230803,12.9134397 L4.47223088,12.8704208 L5.51582215,7.58333333 L1.55989957,7.58333333 L0.891288881,8.55114605 C0.853775374,8.60544678 0.798421006,8.64327676 0.73629202,8.65879796 L0.672314689,8.66666667 L0.106844414,8.66666667 L0.0715243949,8.66058466 L0.0715243949,8.66058466 C0.0297243066,8.6457608 0.00275502199,8.60729104 0,8.5651586 L0.00593007386,8.52254537 L0.580855011,6.85813984 C0.64492547,6.67265611 0.6577034,6.47392717 0.619193545,6.28316421 L0.580694768,6.14191703 L0.00601851064,4.48064746 C0.00203480725,4.4691314 0,4.45701613 0,4.44481314 C0,4.39994001 0.0269259152,4.36143908 0.0652999725,4.34499318 L0.106916826,4.33647981 L0.672546853,4.33647981 C0.737865848,4.33647981 0.80011301,4.36066329 0.848265401,4.40322477 L0.89131128,4.45169723 L1.55989957,5.41666667 Z';

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {children}
      <span className="text-(--noksha-fg-muted) text-xs">{label}</span>
    </div>
  );
}

function PlaneStreetToggle() {
  return (
    <label className={styles.planeSwitch}>
      <input type="checkbox" className="peer sr-only" aria-label="Airplane mode" />
      <div>
        <div>
          <svg viewBox="0 0 13 13" aria-hidden="true">
            <path d={PLANE_PATH} fill="currentColor" />
          </svg>
        </div>
        <span className={styles.streetMiddle} />
        <span className={styles.cloud} />
        <span className={`${styles.cloud} ${styles.two}`} />
      </div>
    </label>
  );
}

function TakeoffToggle() {
  return (
    <label className="group relative inline-flex h-11 w-24 cursor-pointer items-center overflow-hidden rounded-full bg-neutral-800 shadow-inner transition-colors duration-500 has-[:checked]:bg-sky-900">
      <input type="checkbox" className="peer sr-only" aria-label="Airplane mode" />
      <span
        aria-hidden="true"
        className="absolute inset-x-2 bottom-2 h-px bg-white/30 transition-opacity duration-500 peer-checked:opacity-0"
      />
      <span className="absolute left-1 flex size-9 items-center justify-center rounded-full bg-white shadow transition-all duration-500 ease-out peer-checked:translate-x-13 peer-checked:-translate-y-3 peer-checked:rotate-[-35deg]">
        <svg
          viewBox="0 0 13 13"
          className="size-5 fill-neutral-700 transition-colors duration-500 group-has-[:checked]:fill-sky-600"
          aria-hidden="true"
        >
          <path d={PLANE_PATH} />
        </svg>
      </span>
    </label>
  );
}

function SignalToggle() {
  return (
    <label className="group relative inline-flex size-11 cursor-pointer items-center justify-center rounded-2xl bg-neutral-800 shadow-md transition-colors duration-300 has-[:checked]:bg-sky-600">
      <input type="checkbox" className="peer sr-only" aria-label="Airplane mode" />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-2 flex items-end justify-center gap-0.5">
        <span className="h-1.5 w-1 rounded-xs bg-white/70 transition-opacity duration-300 group-has-[:checked]:opacity-20" />
        <span className="h-2.5 w-1 rounded-xs bg-white/70 transition-opacity duration-300 group-has-[:checked]:opacity-20" />
        <span className="h-3.5 w-1 rounded-xs bg-white/70 transition-opacity duration-300 group-has-[:checked]:opacity-20" />
      </span>
      <svg
        viewBox="0 0 13 13"
        className="relative z-10 size-5 -translate-y-0.5 fill-white transition-transform duration-300 group-has-[:checked]:translate-y-0 group-has-[:checked]:rotate-45"
        aria-hidden="true"
      >
        <path d={PLANE_PATH} />
      </svg>
    </label>
  );
}

function PortholeToggle() {
  return (
    <label className="relative inline-block size-14 cursor-pointer overflow-hidden rounded-full border-4 border-neutral-700 bg-sky-300 shadow-inner">
      <input type="checkbox" className="peer sr-only" aria-label="Airplane mode" />
      <span
        aria-hidden="true"
        className="absolute bottom-3 left-2 h-3 w-6 rounded-full bg-white/90 shadow-[10px_2px_0_-2px_white,4px_-3px_0_-1px_white]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-y-full bg-neutral-800 transition-transform duration-500 ease-in peer-checked:translate-y-0"
      />
    </label>
  );
}

function BoardingPassToggle() {
  return (
    <label className="group relative inline-flex h-10 w-28 cursor-pointer items-center rounded-lg border border-dashed border-neutral-600 bg-neutral-900 px-3 transition-colors duration-500 has-[:checked]:border-sky-500 has-[:checked]:bg-sky-950">
      <input type="checkbox" className="peer sr-only" aria-label="Airplane mode" />
      <span
        aria-hidden="true"
        className="size-1.5 shrink-0 rounded-full bg-neutral-600 transition-colors duration-500 group-has-[:checked]:bg-sky-500"
      />
      <span
        aria-hidden="true"
        className="mx-1 h-px flex-1 bg-neutral-700 transition-colors duration-500 group-has-[:checked]:bg-sky-700"
      />
      <svg
        viewBox="0 0 13 13"
        className="size-4 shrink-0 fill-neutral-500 transition-all duration-500 ease-out group-has-[:checked]:translate-x-14 group-has-[:checked]:fill-sky-300"
        aria-hidden="true"
      >
        <path d={PLANE_PATH} />
      </svg>
      <span
        aria-hidden="true"
        className="mx-1 h-px flex-1 bg-neutral-700 transition-colors duration-500 group-has-[:checked]:bg-sky-700"
      />
      <span
        aria-hidden="true"
        className="size-1.5 shrink-0 rounded-full bg-neutral-600 transition-colors duration-500 group-has-[:checked]:bg-sky-500"
      />
    </label>
  );
}

export default function SwitchPlaneMode() {
  return (
    <div className="flex flex-wrap items-end gap-8">
      <Cell label="Runway">
        <PlaneStreetToggle />
      </Cell>
      <Cell label="Takeoff">
        <TakeoffToggle />
      </Cell>
      <Cell label="Signal">
        <SignalToggle />
      </Cell>
      <Cell label="Porthole">
        <PortholeToggle />
      </Cell>
      <Cell label="Boarding pass">
        <BoardingPassToggle />
      </Cell>
    </div>
  );
}
