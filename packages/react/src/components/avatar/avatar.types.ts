import type * as React from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarShape = 'circle' | 'rounded';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize;
  shape?: AvatarShape;
  asChild?: boolean;
}

export interface AvatarImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'alt'> {
  /**
   * Required, not optional as it is on `<img>`.
   *
   * An avatar without one is announced as "image" — or, worse, as its file
   * name. Pass the person's name, or `""` when the name is already right next
   * to it and repeating it would be noise.
   */
  alt: string;
  /**
   * Called as the image resolves. Lets a consumer log broken avatar URLs, which
   * are otherwise invisible — the fallback hides the failure by design.
   */
  onLoadingStatusChange?: (status: AvatarLoadingStatus) => void;
}

export type AvatarLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Hold the fallback back for this many ms.
   *
   * A cached image resolves in a few ms, and showing initials for those few ms
   * produces a flash of the wrong content on every page load. Waiting means the
   * common case renders once.
   */
  delayMs?: number;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render at most this many, then a `+n` counter. */
  max?: number;
  size?: AvatarSize;
  /** How far each avatar overlaps the one before it. */
  spacing?: 'tight' | 'normal' | 'loose';
}
