import { gsap } from 'gsap';
import { prefersReducedMotion } from './env';
import { onScroll, ScrollState } from './scroll';

export interface PlayheadFrame {
  timecode: string;
  frame: number;
  progress: number;
  velocity: number;
  chapter: 'HERO' | 'WORK' | 'CRAFT' | 'ABOUT' | 'CONTACT';
}

const TOTAL_DURATION_FRAMES = 24 * 84; // 01'24" Master Showreel runtime at 24 FPS

/** Format a 0..1 progress value as a 24 FPS SMPTE timecode (HH:MM:SS:FF). */
export function formatTimecode24(progress: number): { timecode: string; frame: number } {
  const clamped = Math.min(1, Math.max(0, progress));
  const totalFrames = Math.round(clamped * TOTAL_DURATION_FRAMES);
  const ff = totalFrames % 24;
  const totalSecs = Math.floor(totalFrames / 24);
  const ss = totalSecs % 60;
  const mm = Math.floor(totalSecs / 60) % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    timecode: `00:${pad(mm)}:${pad(ss)}:${pad(ff)}`,
    frame: totalFrames,
  };
}

function detectChapter(progress: number): PlayheadFrame['chapter'] {
  if (progress < 0.16) return 'HERO';
  if (progress < 0.38) return 'WORK';
  if (progress < 0.6) return 'CRAFT';
  if (progress < 0.82) return 'ABOUT';
  return 'CONTACT';
}

/**
 * Subscribe to the unified 24 FPS playhead driver (scroll progress + gentle idle pulse).
 * Respects prefers-reduced-motion and pauses ambient ticks when tab is hidden.
 */
export function subscribePlayhead(onFrame: (frame: PlayheadFrame) => void): () => void {
  let latestScroll: ScrollState = { y: 0, velocity: 0, progress: 0 };
  let idleTick = 0;

  const emit = () => {
    const { timecode, frame } = formatTimecode24(latestScroll.progress);
    document.documentElement.style.setProperty('--scroll-progress', latestScroll.progress.toFixed(4));
    document.documentElement.style.setProperty('--scroll-velocity', Math.min(1, Math.abs(latestScroll.velocity) / 45).toFixed(4));
    onFrame({
      timecode,
      frame,
      progress: latestScroll.progress,
      velocity: latestScroll.velocity,
      chapter: detectChapter(latestScroll.progress),
    });
  };

  const unsubScroll = onScroll((s) => {
    latestScroll = s;
    emit();
  });

  // Gentle 24 FPS ambient breath on CSS var --idle-pulse so alive-at-rest elements stay subtle
  const onTick = () => {
    if (prefersReducedMotion() || document.hidden) return;
    idleTick += 0.016;
    const pulse = (Math.sin(idleTick * 1.4) * 0.5 + 0.5).toFixed(4);
    document.documentElement.style.setProperty('--idle-pulse', pulse);
  };

  gsap.ticker.add(onTick);
  emit();

  return () => {
    unsubScroll();
    gsap.ticker.remove(onTick);
  };
}

