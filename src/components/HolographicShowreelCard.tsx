import React, { useState, useRef } from 'react';
import { Play } from 'lucide-react';

interface HolographicShowreelCardProps {
  onOpenShowreel: () => void;
}

export const HolographicShowreelCard: React.FC<HolographicShowreelCardProps> = ({
  onOpenShowreel,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseXPos, setMouseXPos] = useState(0.5);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 16;
    const rotY = ((x - centerX) / centerX) * 16;
    const normX = Math.max(0, Math.min(1, x / rect.width));

    setRotateX(rotX);
    setRotateY(rotY);
    setMouseXPos(normX);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setMouseXPos(0.5);
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={onOpenShowreel}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenShowreel();
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative w-36 sm:w-44 md:w-48 cursor-pointer select-none"
      style={{
        aspectRatio: '1036 / 1519',
        perspective: '1200px',
      }}
      aria-label="Open Kunal Master Showreel 2026"
    >
      {/* 3D Transform Container */}
      <div
        className="relative h-full w-full transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `translateZ(${isHovered ? '24px' : '0px'}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.05 : 1})`,
          filter: `drop-shadow(0 ${isHovered ? '24px' : '8px'} ${isHovered ? '32px' : '16px'} rgba(0,0,0,${isHovered ? '0.75' : '0.4'}))`,
        }}
      >
        {/* Card Shell */}
        <div className="relative h-full w-full overflow-hidden rounded-[8px] bg-zinc-950 border border-white/20">
          
          {/* Card Poster Image with High-Contrast Editorial Grading */}
          <img
            src="/assets/spcl.jpg"
            alt="Kunal Master Showreel 2026"
            className="h-full w-full object-cover filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
            loading="eager"
          />

          {/* Holographic Rainbow Foil Sheen (Directly modeled on LayerTwo jjettas.com) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              background:
                'linear-gradient(102deg, transparent 36%, rgba(255,255,255,0.32) 46%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.32) 54%, transparent 64%)',
              backgroundSize: '260% 100%',
              backgroundPositionX: `${mouseXPos * 100}%`,
              mixBlendMode: 'screen',
              opacity: isHovered ? 0.9 : 0,
            }}
          />

          {/* Color-Dodge Iridescent Gradient Layer */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              background:
                'linear-gradient(115deg, rgba(255,94,30,0.3) 0%, rgba(0,240,255,0.2) 38%, rgba(255,215,0,0.25) 62%, rgba(255,94,30,0.3) 100%)',
              mixBlendMode: 'color-dodge',
              opacity: isHovered ? 0.8 : 0,
            }}
          />

          {/* Outer Specular Inner Ring */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[8px] transition-all duration-300"
            style={{
              boxShadow: isHovered
                ? 'inset 0 0 0 1px rgba(255,255,255,0.6), inset 0 0 18px rgba(255,94,30,0.35)'
                : 'inset 0 0 0 1px rgba(255,255,255,0.15)',
            }}
          />

          {/* Card Overlays & Metadata */}
          <div className="absolute inset-0 p-3 flex flex-col justify-between pointer-events-none">
            
            {/* Top Foil Tag */}
            <div className="flex items-center justify-between text-[8px] font-mono-code uppercase tracking-widest">
              <span className="px-1.5 py-0.5 bg-black/80 backdrop-blur-md border border-white/20 text-white font-bold">
                REEL // 2026
              </span>
              <span className="px-1.5 py-0.5 bg-orange-500 text-black font-bold">
                PRORES 4K
              </span>
            </div>

            {/* Center Play Glyph */}
            <div className="my-auto mx-auto w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-2xl">
              <Play className="w-4 h-4 fill-current ml-0.5 text-white group-hover:text-black transition-colors" />
            </div>

            {/* Bottom Card Title */}
            <div className="bg-black/85 backdrop-blur-md border border-white/10 p-2 space-y-0.5">
              <div className="text-[10px] font-matrix font-bold text-white uppercase tracking-wider truncate">
                MASTER SHOWREEL
              </div>
              <div className="text-[8px] font-mono-code text-zinc-400 flex items-center justify-between">
                <span>SUN N SKY</span>
                <span className="text-orange-400 font-bold">24 FPS</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Under-Card Micro Caption */}
      <div className="mt-2 text-center text-[9px] font-mono-code text-zinc-500 uppercase tracking-wider group-hover:text-orange-400 transition-colors">
        [CLICK TO LAUNCH REEL]
      </div>
    </div>
  );
};
