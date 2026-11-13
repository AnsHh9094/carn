import React, { useState, useEffect, useRef } from 'react';
import { Play, ArrowDown } from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { KUNAL_PROFILE } from '../data/portfolioData';

interface HeroEditorialProps {
  onExploreClick: () => void;
  onWatchReelClick: () => void;
  onSelectCategory: (categoryId: string) => void;
}

export const HeroEditorial: React.FC<HeroEditorialProps> = ({
  onExploreClick,
  onWatchReelClick,
  onSelectCategory
}) => {
  // Parallax mouse tracker with rAF throttling
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [avatarMode, setAvatarMode] = useState<'techwear' | 'kunal'>('techwear');
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 2;
        const y = (e.clientY / innerHeight - 0.5) * 2;
        setMousePos({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-6 overflow-hidden bg-studio-950">
      
      {/* 3D Three.js WebGL Layer */}
      <Hero3DCanvas />

      {/* Top Editorial Micro-Header */}
      <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-start text-xs font-mono-code tracking-widest uppercase border-b border-white/10 pb-5">
        
        {/* Left Column */}
        <div className="space-y-1 text-studio-400">
          <p className="text-white font-semibold">POST-PRODUCTION & UX ARCHITECTURE</p>
          <p>4+ YEARS TURNING RAW FOOTAGE INTO DOPAMINE</p>
        </div>

        {/* Center Tagline */}
        <div className="text-center md:block hidden text-studio-200">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-ping"></span>
            <span>2026 DIRECTOR'S CUT</span>
          </span>
        </div>

        {/* Right Column */}
        <div className="text-right space-y-1 text-studio-400">
          <p className="text-white font-semibold">EDINBURGH, SCOTLAND</p>
          <p>EDINBURGH NAPIER UNIVERSITY (MSc UX)</p>
        </div>
      </div>

      {/* Center 3D Parallax Typography & Model Stage (The GAZU Editorial Effect) */}
      <div className="relative z-10 my-auto w-full max-w-7xl mx-auto flex items-center justify-center min-h-[520px]">
        
        {/* Giant Layer 1: Background Massive Editorial Letters "KUNAL" */}
        <div 
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${mousePos.x * -18}px, ${mousePos.y * -14}px)`
          }}
        >
          <h1 className="font-syne font-black text-[22vw] md:text-[19vw] lg:text-[18vw] leading-none tracking-[-0.05em] text-white/[0.07] uppercase">
            KUNAL
          </h1>
        </div>

        {/* Mid Layer: Layer 2 High-Contrast White Outline Typography */}
        <div 
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none transition-transform duration-150 ease-out"
          style={{
            transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -6}px)`
          }}
        >
          <span 
            className="font-syne font-black text-[22vw] md:text-[19vw] lg:text-[18vw] leading-none tracking-[-0.05em] text-transparent uppercase"
            style={{
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.22)'
            }}
          >
            KUNAL
          </span>
        </div>

        {/* Foreground 3D Model / Portrait with Interactive Parallax */}
        <div 
          className="relative z-20 flex flex-col items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${mousePos.x * 22}px, ${mousePos.y * 16}px)`
          }}
        >
          {/* Avatar Switcher Pill */}
          <div className="mb-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-studio-900/80 backdrop-blur-md border border-white/10 shadow-xl">
            <span className="text-[10px] font-mono-code text-studio-400 uppercase tracking-widest">AVATAR:</span>
            <button
              onClick={() => setAvatarMode('techwear')}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono-code transition-all ${
                avatarMode === 'techwear' ? 'bg-white text-black font-bold' : 'text-studio-400 hover:text-white'
              }`}
            >
              TECHWEAR (STUDIO)
            </button>
            <button
              onClick={() => setAvatarMode('kunal')}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono-code transition-all ${
                avatarMode === 'kunal' ? 'bg-white text-black font-bold' : 'text-studio-400 hover:text-white'
              }`}
            >
              KUNAL (LIVE)
            </button>
          </div>

          {/* Model Image with Drop Shadow & Parallax */}
          <div className="relative group cursor-pointer max-w-[280px] md:max-w-[340px] lg:max-w-[380px]">
            {avatarMode === 'techwear' ? (
              <img
                src="/assets/techwear_figure.png"
                alt="Techwear 3D Editor Figure"
                className="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-all duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                <img
                  src="/assets/spcl.jpg"
                  alt="Kunal Live Portrait"
                  className="w-full h-[440px] object-cover filter contrast-105 brightness-95 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <p className="font-syne font-bold text-white text-lg">Kunal</p>
                  <p className="text-xs font-mono-code text-studio-400">UX Designer & Video Editor</p>
                </div>
              </div>
            )}

            {/* Glowing Accent Ring on Hover */}
            <div className="absolute -inset-4 bg-gradient-to-r from-accent-orange/20 to-accent-cyan/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
          </div>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onWatchReelClick}
              className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-accent-orange hover:bg-orange-600 text-black font-syne font-bold text-xs tracking-widest uppercase transition-all hover:scale-105 shadow-lg shadow-orange-500/20"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>WATCH 2026 SHOWREEL</span>
            </button>

            <button
              onClick={onExploreClick}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-syne font-bold text-xs tracking-widest uppercase transition-all hover:scale-105 backdrop-blur-sm"
            >
              <span>EXPLORE WORKS</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: 4 High-Contrast Category Cards (Inspired by GAZU "MEN/WOMEN/KIDS" Cards) */}
      <div id="categories" className="relative z-20 max-w-7xl mx-auto w-full pt-8 border-t border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KUNAL_PROFILE.categories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="text-left p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-accent-orange/50 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono-code text-accent-orange tracking-widest uppercase">
                  0{idx + 1} // {cat.badge}
                </span>
                <span className="text-[10px] font-mono-code text-studio-400 group-hover:text-white transition-colors">
                  {cat.count}
                </span>
              </div>
              <h3 className="font-syne font-bold text-sm tracking-wide text-white group-hover:text-accent-orange transition-colors">
                {cat.name}
              </h3>
              <p className="mt-1 text-xs text-studio-400 line-clamp-2">
                {cat.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
