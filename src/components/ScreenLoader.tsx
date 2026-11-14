import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScreenLoaderProps {
  onComplete?: () => void;
  onExitStart?: () => void;
  durationMs?: number;
}

export const ScreenLoader: React.FC<ScreenLoaderProps> = ({
  onComplete,
  onExitStart,
  durationMs = 3200,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const exitCalledRef = useRef(false);

  const triggerExit = () => {
    if (exitCalledRef.current) return;
    exitCalledRef.current = true;
    if (onExitStart) onExitStart();
    setIsVisible(false);
  };

  useEffect(() => {
    // Lock scroll while intro is playing
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Auto-transition when video completes or timer fires
    timerRef.current = window.setTimeout(() => {
      triggerExit();
    }, durationMs);

    // Silent keyboard skip without any visible buttons or text
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        triggerExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [durationMs]);

  // Autoplay video muted
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback: timer handles exit gracefully if autoplay is blocked
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
          key="cinematic-screen-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          onClick={triggerExit}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black cursor-pointer select-none overflow-hidden"
          style={{ willChange: 'opacity' }}
        >
          {/* Frameless, seamless video presentation with feathered perimeter */}
          <video
            ref={videoRef}
            src="/assets/screen-loader.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={triggerExit}
            className="w-full h-full max-w-[1200px] max-h-[85vh] object-contain pointer-events-none"
            style={{
              maskImage: 'radial-gradient(ellipse 95% 90% at 50% 50%, black 82%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 95% 90% at 50% 50%, black 82%, transparent 100%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
