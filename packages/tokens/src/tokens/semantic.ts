import { CONTRAST_THRESHOLDS, type ContrastLevel, readableOn } from '../color/contrast.js';
import { formatOklch } from '../color/format.js';
import { parseColorOrThrow } from '../color/parse.js';
import { generateScaleColors } from '../color/scale.js';
import type { ColorScale, Oklch, ScaleStep } from '../color/types.js';
import type { TokenMap } from './scales.js';

/** The tones that get the full seven-slot treatment. */
export const TONES = ['accent', 'danger', 'success', 'warning', 'info'] as const;
export type Tone = (typeof TONES)[number];

export interface ThemeSeeds {
  /** The brand color. Everything else defaults from it. */
  brand: string;
  /** Neutral hue source. Defaults to the brand, giving brand-tinted grays. */
  neutral?: string;
  danger?: string;
  success?: string;
  warning?: string;
  info?: string;
}

export interface BuildThemeOptions extends ThemeSeeds {
  /** How much brand hue bleeds into the neutrals. `0` gives pure gray. */
  neutralTint?: number;
  /**
   * Throw when a computed `on-solid` pair misses {@link BuildThemeOptions.contrastLevel}.
   *
   * Off here, on in `emitThemeCss` — the build step is where a bad seed should
   * stop the world, whereas the programmatic API backs the docs-site theme
   * builder, which must not throw while someone drags a hue slider.
   */
  strictContrast?: boolean;
  /** Bar that `on-solid` must clear. Defaults to WCAG AA (4.5:1). */
  contrastLevel?: ContrastLevel;
}

export interface Theme {
  /** Layer 1 — the generated ramps, keyed `accent-500`, `neutral-200`, … */
  primitives: TokenMap;
  /** Layer 2 for light. Applied at `:root`. */
  light: TokenMap;
  /** Layer 2 for dark. */
  dark: TokenMap;
  /** The raw scales, for tooling like the docs-site theme builder. */
  scales: Record<Tone | 'neutral', ColorScale>;
}

const DEFAULT_SEEDS = {
  danger: '#E5484D',
  success: '#30A46C',
  warning: '#F5A524',
  info: '#0091FF',
} as const;

/**
 * `on-solid` candidates, tried in order.
 *
 * Both sit at the extremes on purpose. Softening the dark ink to a comfortable
 * `l: 0.17` opens a dead band around `l: 0.57` where *neither* ink clears AA,
 * and the mid-ramp solid steps land close enough to it that saturated reds and
 * magentas fall through. At `l: 0.13` every real brand color clears AA on one
 * of the two; only synthetic max-chroma seeds miss.
 */
const INK_LIGHT: Oklch = { l: 1, c: 0, h: 0 };
const INK_DARK: Oklch = { l: 0.13, c: 0, h: 0 };

function pickOnSolid(
  background: Oklch,
  strict: boolean,
  level: ContrastLevel,
  label: string,
): string {
  const { color, ratio, passes } = readableOn(background, {
    candidates: [INK_LIGHT, INK_DARK],
    level,
  });

  if (!passes && strict) {
    throw new Error(
      `[@prism-ui/tokens] "${label}" reaches only ${ratio.toFixed(2)}:1 against both inks; ` +
        `WCAG ${level} needs ${CONTRAST_THRESHOLDS[level]}:1. ` +
        'Use a less saturated seed for this tone, or lower contrastLevel.',
    );
  }
  return formatOklch(color);
}

/**
 * Builds every semantic token for both modes from a handful of seeds.
 *
 * Only the returned `light` / `dark` maps differ between modes — primitives are
 * shared. That is the property that makes a new theme a small CSS block rather
 * than a fork (ARCHITECTURE.md §3).
 */
export function buildTheme(options: BuildThemeOptions): Theme {
  const { brand, neutralTint = 0.012, strictContrast = false, contrastLevel = 'AA' } = options;

  const brandColor = parseColorOrThrow(brand);
  const neutralSeed = options.neutral ?? brand;

  const toneSeeds: Record<Tone, string | Oklch> = {
    accent: brandColor,
    danger: options.danger ?? DEFAULT_SEEDS.danger,
    success: options.success ?? DEFAULT_SEEDS.success,
    warning: options.warning ?? DEFAULT_SEEDS.warning,
    info: options.info ?? DEFAULT_SEEDS.info,
  };

  const toneColors = {} as Record<Tone, Record<ScaleStep, Oklch>>;
  for (const tone of TONES) {
    toneColors[tone] = generateScaleColors(toneSeeds[tone]);
  }

  const neutralHue = parseColorOrThrow(neutralSeed).h;
  const neutralColors = generateScaleColors(neutralSeed, { baseChroma: neutralTint });

  // Surfaces and dark-mode borders need finer resolution than the 11-step ramp
  // offers, so they are addressed by lightness directly on the neutral hue.
  const n = (l: number, chromaScale = 1): string =>
    formatOklch({ l, c: neutralTint * chromaScale, h: neutralHue });

  const primitives: TokenMap = {};
  const scales = {} as Record<Tone | 'neutral', ColorScale>;

  const record = (name: Tone | 'neutral', colors: Record<ScaleStep, Oklch>) => {
    const scale = {} as ColorScale;
    for (const step of Object.keys(colors) as unknown as ScaleStep[]) {
      const value = formatOklch(colors[step]);
      scale[step] = value;
      primitives[`${name}-${step}`] = value;
    }
    scales[name] = scale;
  };

  for (const tone of TONES) record(tone, toneColors[tone]);
  record('neutral', neutralColors);

  const light: TokenMap = {
    'bg-canvas': n(0.995, 0.25),
    'bg-surface': n(1, 0),
    'bg-subtle': n(0.968, 0.6),
    'bg-muted': n(0.93, 0.9),
    'bg-inverse': n(0.24),

    'fg-default': n(0.24, 1.4),
    'fg-muted': n(0.49, 1.2),
    'fg-subtle': n(0.58, 1),
    'fg-disabled': n(0.72, 0.8),
    'fg-inverse': n(0.985, 0.25),

    'border-subtle': n(0.92, 1),
    'border-default': n(0.86, 1.2),
    'border-strong': n(0.74, 1.4),

    'shadow-color': `${neutralHue.toFixed(2)}`,
  };

  const dark: TokenMap = {
    'bg-canvas': n(0.185, 1.2),
    'bg-surface': n(0.225, 1.2),
    'bg-subtle': n(0.268, 1.2),
    'bg-muted': n(0.32, 1.2),
    'bg-inverse': n(0.93, 0.5),

    'fg-default': n(0.96, 0.4),
    'fg-muted': n(0.72, 0.8),
    'fg-subtle': n(0.6, 0.8),
    'fg-disabled': n(0.45, 0.8),
    'fg-inverse': n(0.2, 1.2),

    'border-subtle': n(0.29, 1.4),
    'border-default': n(0.36, 1.6),
    'border-strong': n(0.48, 1.6),

    'shadow-color': `${neutralHue.toFixed(2)}`,
  };

  for (const tone of TONES) {
    const c = toneColors[tone];

    // Light: solid sits at 600 so white ink clears AA on most hues; the yellow
    // family falls through to dark ink via pickOnSolid rather than being special-cased.
    light[`${tone}-solid`] = formatOklch(c[600]);
    light[`${tone}-solid-hover`] = formatOklch(c[700]);
    light[`${tone}-solid-active`] = formatOklch(c[800]);
    light[`${tone}-subtle`] = formatOklch(c[100]);
    light[`${tone}-subtle-hover`] = formatOklch(c[200]);
    light[`${tone}-fg`] = formatOklch(c[700]);
    light[`${tone}-on-solid`] = pickOnSolid(
      c[600],
      strictContrast,
      contrastLevel,
      `${tone}-solid (light)`,
    );

    // Dark: solid brightens on hover instead of darkening, and the subtle pair
    // moves to the bottom of the ramp so it reads as a tinted surface.
    dark[`${tone}-solid`] = formatOklch(c[500]);
    dark[`${tone}-solid-hover`] = formatOklch(c[400]);
    dark[`${tone}-solid-active`] = formatOklch(c[300]);
    dark[`${tone}-subtle`] = formatOklch(c[950]);
    dark[`${tone}-subtle-hover`] = formatOklch(c[900]);
    dark[`${tone}-fg`] = formatOklch(c[400]);
    dark[`${tone}-on-solid`] = pickOnSolid(
      c[500],
      strictContrast,
      contrastLevel,
      `${tone}-solid (dark)`,
    );
  }

  light.ring = light['accent-solid'] as string;
  light['ring-offset-color'] = light['bg-canvas'] as string;
  light['border-focus'] = light['accent-solid'] as string;

  dark.ring = dark['accent-solid'] as string;
  dark['ring-offset-color'] = dark['bg-canvas'] as string;
  dark['border-focus'] = dark['accent-solid'] as string;

  return { primitives, light, dark, scales };
}

/**
 * Elevation. Tinted with the neutral hue rather than pure black, so shadows on
 * a warm theme do not read as gray smudges. `--prism-shadow-color` carries the
 * hue; the alpha is baked per level.
 */
export const shadowTokens: TokenMap = {
  'shadow-xs': '0 1px 2px 0 oklch(0.2 0.02 var(--prism-shadow-color) / 0.05)',
  'shadow-sm':
    '0 1px 3px 0 oklch(0.2 0.02 var(--prism-shadow-color) / 0.08), 0 1px 2px -1px oklch(0.2 0.02 var(--prism-shadow-color) / 0.06)',
  'shadow-md':
    '0 4px 8px -2px oklch(0.2 0.02 var(--prism-shadow-color) / 0.1), 0 2px 4px -2px oklch(0.2 0.02 var(--prism-shadow-color) / 0.06)',
  'shadow-lg':
    '0 12px 20px -4px oklch(0.2 0.02 var(--prism-shadow-color) / 0.1), 0 4px 8px -4px oklch(0.2 0.02 var(--prism-shadow-color) / 0.06)',
  'shadow-xl':
    '0 24px 32px -8px oklch(0.2 0.02 var(--prism-shadow-color) / 0.14), 0 8px 12px -6px oklch(0.2 0.02 var(--prism-shadow-color) / 0.08)',
};

/** Dark mode needs heavier shadows to register against a dark canvas. */
export const darkShadowTokens: TokenMap = {
  'shadow-xs': '0 1px 2px 0 oklch(0 0 0 / 0.3)',
  'shadow-sm': '0 1px 3px 0 oklch(0 0 0 / 0.4), 0 1px 2px -1px oklch(0 0 0 / 0.3)',
  'shadow-md': '0 4px 8px -2px oklch(0 0 0 / 0.45), 0 2px 4px -2px oklch(0 0 0 / 0.3)',
  'shadow-lg': '0 12px 20px -4px oklch(0 0 0 / 0.5), 0 4px 8px -4px oklch(0 0 0 / 0.35)',
  'shadow-xl': '0 24px 32px -8px oklch(0 0 0 / 0.6), 0 8px 12px -6px oklch(0 0 0 / 0.4)',
};

/** The default Prism brand — violet. Used for the prebuilt stylesheet. */
export const DEFAULT_BRAND = '#6D4AFF';
