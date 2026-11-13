import React, { useState, useEffect, useRef } from 'react';
import { Play, ArrowDown, Star, ArrowUpRight, ShieldCheck, Video, Layers } from 'lucide-react';
import { KUNAL_PROFILE } from '../data/portfolioData';
import { Hero3DCanvas } from './Hero3DCanvas';
import { HolographicShowreelCard } from './HolographicShowreelCard';

interface FramerHeroProps {
  onViewWorks: () => void;
  onOpenShowreel: () => void;
  onSelectCategory?: (categoryId: string) => void;
}

// Live 8-bar SMPTE frequency visualizer for the hero spec rail
const AUDIO_BARS = 8;

const SmpteEqualizer: React.FC = () => {
  const [levels, setLevels] = useState<number[]>(() => Array(AUDIO_BARS).fill(0.25));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLevels((prev) =>
        prev.map((level, i) => {
          const base = 0.2 + ((i * 3) % 5) * 0.12;
          const next = base + Math.random() * 0.6;
          return Math.min(1, Math.max(0.12, level * 0.35 + next * 0.65));
        })
      );
    }, 140);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2.5">
      <div className="flex items-end gap-[2px] h-4" aria-hidden="true">
        {levels.map((level, i) => (
          <span
            key={i}
            style={{ height: `${Math.round(level * 100)}%` }}
            className={`w-[2px] transition-[height] duration-150 ease-out ${
              i % 3 === 2 ? 'bg-amber-400' : 'bg-orange-500'
            }`}
          />
        ))}
      </div>
      <span className="text-[10px] font-mono-code text-zinc-500 uppercase tracking-widest">
        48kHz // 24-BIT SMPTE AUDIO STREAM
      </span>
    </div>
  );
};

export const FramerHero: React.FC<FramerHeroProps> = ({
  onViewWorks,
  onOpenShowreel,
  onSelectCategory
}) => {
  const textLayerRef = useRef<HTMLDivElement>(null);
  const figureLayerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const renderParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (textLayerRef.current) {
        textLayerRef.current.style.transform = `translate3d(${currentX * -18}px, ${currentY * -10}px, 0)`;
      }
      if (figureLayerRef.current) {
        figureLayerRef.current.style.transform = `translate3d(${currentX * 12}px, ${currentY * 8}px, 0)`;
      }

      animFrameRef.current = requestAnimationFrame(renderParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    animFrameRef.current = requestAnimationFrame(renderParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const categories = [
    {
      num: '01',
      id: 'commercial',
      title: 'COMMERCIAL & REELS',
      badge: 'RETENTION-ENGINEERED',
      desc: 'High-conversion brand storytelling, product visual teasers, and cinematic pacing for commercial releases.',
      stat: '18+ Projects'
    },
    {
      num: '02',
      id: 'creators',
      title: 'YOUTUBE & CREATORS',
      badge: 'VIRAL HOOKS',
      desc: 'Pacing for 25M+ views across high-traffic channels (Urban Pulse, Just Drama, music & gaming).',
      stat: '350+ Videos'
    },
    {
      num: '03',
      id: 'sports',
      title: 'SPORTS & HIGH-OCTANE',
      badge: 'SPEED RAMPING',
      desc: 'Paced cuts for Hypd Sports, Moto GP Bharat, and dynamic live event packaging.',
      stat: '40+ Reels'
    },
    {
      num: '04',
      id: 'ux',
      title: 'UX & ATTENTION FLOW',
      badge: 'RESEARCH-BACKED',
      desc: 'Cognitive load optimization and viewer drop-off reduction from Edinburgh Napier University.',
      stat: 'MSc Portfolio'
    }
  ];

  return (
    <section id="hero" className="relative w-full pt-20 bg-[#090909] text-white overflow-hidden border-b border-white/[0.08]">
      
      {/* Studio Ambient Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-white/5 via-orange-500/5 to-transparent blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* 3D Atmospheric Canvas (Three.js Film Canister, Neon Aperture, Studio Dust) */}
      <Hero3DCanvas />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 pt-14 pb-8 flex flex-col justify-between min-h-[calc(100vh-4rem)]">
        
        {/* Top Editorial Spec Rail */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-start text-xs font-mono-code uppercase tracking-widest border-b border-white/[0.08] py-2">
          
          {/* Left Column: Discipline & Credential */}
          <div className="space-y-1 text-zinc-400">
            <div className="flex items-center gap-2 text-white font-bold tracking-wider">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
              <span>UX-DRIVEN POST-PRODUCTION</span>
            </div>
            <p className="text-zinc-500 text-[11px]">SUN N SKY ENTERTAINMENT // 4+ YEARS LEAD EDITOR</p>
            <p className="text-zinc-400 text-[11px]">EDINBURGH NAPIER UNIVERSITY (MSc UX DESIGN)</p>
          </div>

          {/* Center Column: Production Suite Status + Live Audio Meter */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-950 border border-white/10 text-[11px] font-mono-code text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>24.00 FPS SMPTE // TIMELINE ACTIVE</span>
            </div>
            <SmpteEqualizer />
          </div>

          {/* Right Column: Rating & Watch Metrics */}
          <div className="text-left md:text-right space-y-1 text-zinc-400">
            <div className="flex items-center md:justify-end gap-1.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
              <span className="text-white font-bold ml-1 text-xs">4.9 / 5.0</span>
            </div>
            <p className="text-zinc-500 text-[11px]">{KUNAL_PROFILE.experienceLabel}</p>
            <p className="text-zinc-400 text-[11px]">25M+ DIGITAL VIEWS GENERATED</p>
          </div>
        </div>

        {/* The 3D Depth Composition Stage */}
        <div className="relative my-auto w-full flex items-center justify-center min-h-[460px] sm:min-h-[580px] lg:min-h-[640px] select-none">
          
          {/* Layer 1: Monumental Typography "K U N A L" (Franie Premium Geometric Sans) */}
          <div
            ref={textLayerRef}
            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden gpu-layer"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          >
            <h1 className="w-full font-grift font-black text-[13.5vw] sm:text-[14.5vw] lg:text-[14.5vw] tracking-[0.32em] pl-[0.32em] leading-none text-white uppercase text-center select-none drop-shadow-[0_0_60px_rgba(255,255,255,0.12)]">
              KUNAL
            </h1>
          </div>

          {/* Layer 2: Silhouette Cutting Through Typography (Framing the 'N' cleanly) */}
          <div
            ref={figureLayerRef}
            className="relative z-10 flex flex-col items-center justify-end h-[500px] sm:h-[620px] lg:h-[680px] pointer-events-auto gpu-layer"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          >
            <div className="relative h-full flex items-end">
              <img
                src="/assets/kunal-portrait-cutout.png"
                alt="Kunal — Lead Video Editor & UX Designer"
                loading="eager"
                decoding="async"
                className="h-full max-w-[300px] sm:max-w-[350px] lg:max-w-[400px] w-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] contrast-[1.08] brightness-[1.02]"
              />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-28 bg-gradient-to-t from-[#090909] via-[#090909]/80 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-black/90 backdrop-blur-md border border-white/20 text-[10px] font-mono-code text-zinc-300 uppercase whitespace-nowrap tracking-widest shadow-2xl">
                DIRECTOR'S CUT // 24 FPS SMPTE
              </div>
            </div>
          </div>

          {/* Left Floating Holographic Director's Card (LayerTwo jjettas.com Model) */}
          <div className="absolute left-0 bottom-4 hidden lg:flex flex-col items-start z-20 max-w-[220px] space-y-3 font-mono-code text-xs text-zinc-400">
            <HolographicShowreelCard onOpenShowreel={onOpenShowreel} />
            <p className="text-zinc-500 text-[10px] leading-relaxed">
              4+ years lead post-production at Sun n Sky. 25M+ views generated across commercial and sports campaigns.
            </p>
          </div>

          {/* Right Floating Editorial Narrative Column */}
          <div className="absolute right-0 bottom-8 hidden lg:block z-20 text-right max-w-xs space-y-3 font-mono-code text-xs">
            <div className="text-white font-matrix font-bold text-sm tracking-wider uppercase">
              POST-PRODUCTION THAT CAPTIVATES.
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed font-sans">
              "Every cut has a psychological trigger. Every frame has a purpose. High-conversion editorial pacing engineered from Edinburgh Napier University."
            </p>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">
              COORDINATES: 55.9533° N, 3.1883° W [EDINBURGH]
            </div>
          </div>
        </div>

        {/* Bottom Minimal Scroll Rail (jjettas.com style) */}
        <div className="w-full pt-6 flex items-center justify-between border-t border-white/[0.08] text-xs font-mono-code text-zinc-500 uppercase tracking-widest">
          <button
            onClick={onViewWorks}
            className="group flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors"
          >
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
            <span className="tracking-wider text-white font-medium">EXPLORE SELECTED WORKS</span>
            <ArrowDown className="w-3.5 h-3.5 text-orange-400 group-hover:translate-y-1 transition-transform" />
          </button>

          <div className="hidden sm:flex items-center gap-4 text-[10px] text-zinc-500">
            <span>PRODUCTION ARCHIVE 2026</span>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-400">24 FPS SMPTE TIMECODES</span>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-300">SUN N SKY ENTERTAINMENT</span>
          </div>
        </div>

      </div>

    </section>
  );
};