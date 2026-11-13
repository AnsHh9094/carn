export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isTouch = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none), (pointer: coarse)').matches;

export const isMobile = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 767px)').matches;

/** Unified motion easing curves ("Cut & Lock" system from DESIGN.md). */
export const ease = {
  out: 'expo.out',
  inOut: 'expo.inOut',
  soft: 'power3.out',
  spring: 'back.out(1.6)',
} as const;

