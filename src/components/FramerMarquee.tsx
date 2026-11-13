import React from 'react';
import { KUNAL_PROFILE } from '../data/portfolioData';

export const FramerMarquee: React.FC = () => {
  return (
    <section className="py-14 border-b border-white/[0.08] bg-[#090909] overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono-code uppercase tracking-widest text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          <span className="text-zinc-300">TRUSTED PRODUCTION COLLABORATORS</span>
        </div>
        <div>
          <span>4+ YEARS · SUN N SKY ENTERTAINMENT · 25M+ COMBINED REACH</span>
        </div>
      </div>

      {/* Infinite Scrolling Ticker */}
      <div className="relative w-full overflow-hidden flex py-2 border-y border-white/[0.05]">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#090909] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#090909] to-transparent z-10 pointer-events-none" />

        <div className="flex shrink-0 animate-marquee gap-14 sm:gap-20 items-center gpu-layer">
          {KUNAL_PROFILE.brands.concat(KUNAL_PROFILE.brands).map((brand, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-sm sm:text-lg font-franie font-bold tracking-wider text-zinc-500 hover:text-white transition-colors cursor-default whitespace-nowrap uppercase"
            >
              <span className="w-1 h-1 rounded-full bg-orange-500" />
              <span>{brand}</span>
            </div>
          ))}
        </div>

        {/* Second track for seamless infinite loop */}
        <div className="flex shrink-0 animate-marquee gap-14 sm:gap-20 items-center gpu-layer" aria-hidden="true">
          {KUNAL_PROFILE.brands.concat(KUNAL_PROFILE.brands).map((brand, i) => (
            <div
              key={`dup-${i}`}
              className="flex items-center gap-3 text-sm sm:text-lg font-franie font-bold tracking-wider text-zinc-500 hover:text-white transition-colors cursor-default whitespace-nowrap uppercase"
            >
              <span className="w-1 h-1 rounded-full bg-orange-500" />
              <span>{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};