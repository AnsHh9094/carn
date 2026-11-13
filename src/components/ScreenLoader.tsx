import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScreenLoaderProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export const ScreenLoader: React.FC<ScreenLoaderProps> = ({
  onComplete,
  minDurationMs = 3500,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<number | null>(null);

  const handleFinish = () => {
    if (!isVisible) return;
    setIsVisible(false);
  };

  useEffect(() => {
    // Lock scroll while loader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Start progress bar timer
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, Math.round((elapsed / minDurationMs) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
      }
    }, 50);

    // Fallback maximum timeout to guarantee user is never blocked
    timerRef.current = window.setTimeout(() => {
      handleFinish();
    }, minDurationMs + 400);

    // Keyboard listener to skip with Escape or Space
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [minDurationMs]);

  // Attempt video play immediately on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback: timer will naturally transition
      });
    }
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (onComplete) onComplete();
      }}
    >
      {isVisible && (
        <motion.div
          key="screen-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.01,
            transition: {
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#090909] text-white select-none px-4"
        >
          {/* Subtle Ambient Vignette */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

          {/* Minimal Top Telemetry */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[11px] font-mono tracking-widest text-white/40 uppercase">
            <span>KUNAL // PORTFOLIO INITIALIZING</span>
            <button
              type="button"
              onClick={handleFinish}
              className="text-white/50 hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none"
              aria-label="Skip intro loader"
            >
              <span>SKIP</span>
              <span className="text-white/30">[ESC]</span>
            </button>
          </div>

          {/* Cinematic Letterbox Video Container */}
          <div className="relative w-full max-w-[680px] aspect-[1100/480] bg-black rounded-[2px] overflow-hidden border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <video
              ref={videoRef}
              src="/assets/screen-loader.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={handleFinish}
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>

          {/* Minimalist Progress Meter */}
          <div className="mt-6 w-full max-w-[680px] flex flex-col gap-2">
            <div className="w-full h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white/70"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-white/30 uppercase">
              <span>SYSTEM READY</span>
              <span>{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
