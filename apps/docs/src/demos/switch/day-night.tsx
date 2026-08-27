import type { ReactNode } from 'react';
import skyFadeStyles from './sky-fade.module.css';
import starCloudStyles from './star-cloud.module.css';

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {children}
      <span className="text-(--noksha-fg-muted) text-xs">{label}</span>
    </div>
  );
}

function SkyToggle() {
  return (
    <label className={skyFadeStyles.themeSwitch}>
      <input type="checkbox" className={`${skyFadeStyles.checkbox} sr-only`} aria-label="Toggle theme" />
      <div className={skyFadeStyles.container}>
        <div className={skyFadeStyles.clouds} />
        <div className={skyFadeStyles.starsContainer}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none" aria-hidden="true">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className={skyFadeStyles.circleContainer}>
          <div className={skyFadeStyles.sunMoonContainer}>
            <div className={skyFadeStyles.moon}>
              <div className={skyFadeStyles.spot} />
              <div className={skyFadeStyles.spot} />
              <div className={skyFadeStyles.spot} />
            </div>
          </div>
        </div>
      </div>
    </label>
  );
}

function SunMoonToggle() {
  return (
    <label className="relative inline-block h-[34px] w-16">
      <svg
        viewBox="0 0 24 24"
        className="absolute top-1.5 left-9 z-[1] size-6 animate-[spin_15s_linear_infinite]"
        aria-hidden="true"
      >
        <g fill="#ffd43b">
          <circle r="5" cy="12" cx="12" />
          <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z" />
        </g>
      </svg>

      <svg
        viewBox="0 0 384 512"
        className="absolute top-[5px] left-[5px] z-[1] size-6 animate-tilt fill-[#73C0FC]"
        aria-hidden="true"
      >
        <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
      </svg>

      <input type="checkbox" className="peer sr-only" aria-label="Toggle theme" />

      <span
        aria-hidden="true"
        className="absolute inset-0 cursor-pointer rounded-full bg-[#73C0FC] transition-colors duration-[400ms] before:absolute before:bottom-0.5 before:left-0.5 before:z-[2] before:size-[30px] before:rounded-full before:bg-[#e8e8e8] before:transition-transform before:duration-[400ms] peer-checked:bg-[#183153] peer-checked:before:translate-x-[30px] peer-focus:shadow-[0_0_1px_#183153]"
      />
    </label>
  );
}

function StarCloudToggle() {
  return (
    <label className={starCloudStyles.switch}>
      <input
        type="checkbox"
        className={`${starCloudStyles.checkbox} sr-only`}
        aria-label="Toggle theme"
        defaultChecked
      />
      <span className={starCloudStyles.slider}>
        <div className={`${starCloudStyles.star} ${starCloudStyles.star1}`} />
        <div className={`${starCloudStyles.star} ${starCloudStyles.star2}`} />
        <div className={`${starCloudStyles.star} ${starCloudStyles.star3}`} />
        <svg viewBox="0 0 16 16" className={starCloudStyles.cloud} aria-hidden="true">
          <path
            transform="matrix(.77976 0 0 .78395-299.99-418.63)"
            fill="#fff"
            d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
          />
        </svg>
      </span>
    </label>
  );
}

function CrescentToggle() {
  return (
    <label className="relative inline-block h-[2em] w-[3.5em] text-[17px]">
      <input type="checkbox" className="peer sr-only" aria-label="Toggle theme" />
      <span
        aria-hidden="true"
        className="absolute inset-0 cursor-pointer rounded-full bg-[#28096b] transition-colors duration-500 before:absolute before:bottom-[15%] before:left-[10%] before:size-[1.4em] before:rounded-full before:bg-[#28096b] before:shadow-[inset_8px_-4px_0px_0px_#fff000] before:transition-all before:duration-500 peer-checked:bg-[#522ba7] peer-checked:before:translate-x-full peer-checked:before:shadow-[inset_15px_-4px_0px_15px_#fff000]"
      />
    </label>
  );
}

function HorizonToggle() {
  return (
    <label className="relative inline-flex h-14 w-24 cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-b from-indigo-950 to-slate-900 transition-colors duration-700 has-[:checked]:from-sky-400 has-[:checked]:to-sky-200">
      <input type="checkbox" className="peer sr-only" aria-label="Toggle theme" />
      <span className="absolute bottom-3 left-1/2 size-7 -translate-x-1/2 translate-y-2 rounded-full bg-slate-300 shadow-[0_0_12px_2px_rgba(203,213,225,0.5)] transition-all duration-700 ease-out peer-checked:-translate-y-3 peer-checked:bg-amber-300 peer-checked:shadow-[0_0_16px_4px_rgba(252,211,77,0.6)]" />
      <svg
        viewBox="0 0 96 24"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-6 w-full fill-slate-950/80 transition-colors duration-700 peer-checked:fill-emerald-900/70"
        aria-hidden="true"
      >
        <path d="M0,24 L0,15 Q24,4 48,13 T96,11 L96,24 Z" />
      </svg>
    </label>
  );
}

function AuroraToggle() {
  return (
    <label className="relative flex size-14 cursor-pointer items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#312e81,#0f172a_70%)] shadow-[0_0_20px_rgba(99,102,241,0.35)_inset] transition-all duration-500 has-[:checked]:bg-[radial-gradient(circle_at_30%_30%,#fef3c7,#38bdf8_70%)] has-[:checked]:shadow-[0_0_20px_rgba(56,189,248,0.45)_inset] hover:scale-105">
      <input type="checkbox" className="peer sr-only" aria-label="Toggle theme" />
      <svg
        viewBox="0 0 384 512"
        className="absolute size-5 fill-[#c7d2fe] opacity-100 transition-opacity duration-500 peer-checked:opacity-0"
        aria-hidden="true"
      >
        <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
      </svg>
      <svg viewBox="0 0 24 24" className="absolute size-6 opacity-0 transition-opacity duration-500 peer-checked:opacity-100" aria-hidden="true">
        <g fill="#ffd43b">
          <circle r="5" cy="12" cx="12" />
          <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z" />
        </g>
      </svg>
    </label>
  );
}

export default function SwitchDayNight() {
  return (
    <div className="flex flex-wrap items-end gap-10">
      <Cell label="Sky fade">
        <SkyToggle />
      </Cell>
      <Cell label="Sun / moon">
        <SunMoonToggle />
      </Cell>
      <Cell label="Stars & clouds">
        <StarCloudToggle />
      </Cell>
      <Cell label="Crescent">
        <CrescentToggle />
      </Cell>
      <Cell label="Horizon">
        <HorizonToggle />
      </Cell>
      <Cell label="Aurora">
        <AuroraToggle />
      </Cell>
    </div>
  );
}
