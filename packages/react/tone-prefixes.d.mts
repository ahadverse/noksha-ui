/**
 * Types for `tone-prefixes.mjs`. It stays plain JS because the stylesheet
 * generator runs before anything is compiled, but `tone.test.ts` imports it
 * too — and an untyped import there would silently weaken the test.
 */
export declare const TONE_PREFIXES: string[];
export declare const TONE_NAMES: string[];
export declare const TONE_SLOTS: string[];
export declare function toneSlotValue(tone: string, slot: string): string;
