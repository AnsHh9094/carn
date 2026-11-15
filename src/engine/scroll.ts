import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, isTouch } from './env';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollState {
  y: number;
  velocity: number;
  progress: number;
}

const state: ScrollState = { y: 0, velocity: 0, progress: 0 };
const listeners = new Set<(s: ScrollState) => void>();

let lenis: Lenis | null = null;
let tickerFn: ((time: number) => void) | null = null;
let initialized = false;

function notify() {
  for (const fn of listeners) fn(state);
}

function nativeScrollHandler() {
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const nextY = window.scrollY || 0;
  state.velocity = nextY - state.y;
  state.y = nextY;
  state.progress = max > 0 ? Math.min(1, Math.max(0, nextY / max)) : 0;
  notify();
}

/** Boot one shared GSAP ticker driving Lenis and ScrollTrigger. */
export function initScroll(): () => void {
  if (initialized || typeof window === 'undefined') {
    return () => {};
  }
  initialized = true;

  if (prefersReducedMotion() || isTouch()) {
    window.addEventListener('scroll', nativeScrollHandler, { passive: true });
    nativeScrollHandler();
    return () => {
      window.removeEventListener('scroll', nativeScrollHandler);
      initialized = false;
    };
  }

  lenis = new Lenis({
    lerp: 0.11,
    wheelMultiplier: 1,
    touchMultiplier: 1.15,
    smoothWheel: true,
  });

  lenis.on('scroll', (instance) => {
    state.y = instance.scroll;
    state.velocity = instance.velocity;
    state.progress =
      instance.limit > 0
        ? Math.min(1, Math.max(0, instance.scroll / instance.limit))
        : 0;
    ScrollTrigger.update();
    notify();
  });

  tickerFn = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  return () => {
    if (tickerFn) gsap.ticker.remove(tickerFn);
    tickerFn = null;
    lenis?.destroy();
    lenis = null;
    initialized = false;
  };
}

export function onScroll(fn: (s: ScrollState) => void): () => void {
  listeners.add(fn);
  fn(state);
  return () => listeners.delete(fn);
}

export function scrollState(): ScrollState {
  return state;
}

export function stopScroll() {
  lenis?.stop();
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden';
  }
}

export function startScroll() {
  lenis?.start();
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
}

export function scrollToTarget(target: string | HTMLElement | number) {
  const offset = -74; // Keep sticky header + top border clear of anchored titles
  if (typeof target === 'string') {
    if (target === 'hero' || target === '#hero' || target === 'top') {
      if (lenis && !prefersReducedMotion()) {
        lenis.scrollTo(0, { duration: 1.1 });
      } else {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      }
      return;
    }
    const id = target.startsWith('#') ? target.slice(1) : target;
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis && !prefersReducedMotion()) {
      lenis.scrollTo(el, { offset, duration: 1.1 });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }
    return;
  }

  if (lenis && !prefersReducedMotion()) {
    lenis.scrollTo(target, { offset: typeof target === 'number' ? 0 : offset, duration: 1.1 });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  } else {
    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
}

