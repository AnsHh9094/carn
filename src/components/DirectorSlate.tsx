import React from 'react';
import { Play, ArrowUpRight, Film, Sparkles, Sliders, Volume2 } from 'lucide-react';

interface DirectorSlateProps {
  onOpenShowreel: () => void;
  onNavigateContact: () => void;
}

export const DirectorSlate: React.FC<DirectorSlateProps> = ({
  onOpenShowreel,
  onNavigateContact
}) => {
  return (
    <section id="director" className="relative w-full py-24 bg-[#090909] text-white overflow-hidden border-b border-white/[0.08]">
      
      {/* Studio Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[160px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Top Header Rail */}
        <div className="pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08]">
          <div className="space-y-2">
            <div className="text-xs font-mono-code text-orange-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>THE DIRECTOR'S SLATE // CRAFT & PHILOSOPHY</span>
            </div>
            <h2 className="font-matrix font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              POST-PRODUCTION <br />
              IS A PSYCHOLOGICAL CRAFT.
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono-code text-zinc-500">
            <div className="px-3 py-1.5 bg-zinc-950 border border-white/10 text-zinc-300">
              <span className="text-orange-400 font-bold">4+ YEARS</span> LEAD POST-PRODUCTION
            </div>
            <div className="px-3 py-1.5 bg-zinc-950 border border-white/10 text-zinc-300">
              <span className="text-orange-400 font-bold">MSc UX</span> EDINBURGH NAPIER
            </div>
          </div>
        </div>

        {/* Two-Column Editorial Stage */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column 1: Philosophy & Specifications (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              
              <div className="text-xs font-mono-code text-zinc-500 uppercase tracking-widest">
                [EXECUTIVE SUMMARY // POST-PRODUCTION DIRECTIVE]
              </div>

              <h3 className="font-matrix font-bold text-2xl sm:text-3xl text-white uppercase leading-snug">
                "Every cut has a psychological trigger. Every frame has a purpose."
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                Most video editors cut to match the beat or follow transient social trends. Kunal engineers every sequence at the convergence of <span className="text-white font-medium">cognitive load theory</span> and <span className="text-white font-medium">high-octane visual dopamine</span>.
              </p>

              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                As lead editor at Sun n Sky Entertainment and an MSc User Experience Design graduate from Edinburgh Napier University, Kunal has directed post-production pipelines generating over <span className="text-orange-400 font-bold font-mono-code">25,000,000+ views</span> for commercial brands, international sports (Moto GP Bharat, Hypd Sports), and tier-one creator channels.
              </p>

              {/* Authentic Handwritten Director Note in Soge Font */}
              <div className="pt-2">
                <p className="font-soge text-2xl sm:text-3xl text-orange-400/90 -rotate-1 select-none">
                  "Cut on emotion and narrative intent — never just on the transition."
                </p>
                <span className="text-[11px] font-mono-code text-zinc-500 block mt-1 tracking-wider uppercase">
                  — Kunal, Director & Lead Editor
                </span>
              </div>
            </div>

            {/* Technical Specifications Grid */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-2 gap-4 text-xs font-mono-code text-zinc-400">
              <div className="space-y-1">
                <span className="text-zinc-600 block text-[10px] uppercase">TIMELINE FORMAT</span>
                <span className="text-white font-medium">4K PRORES 422 HQ</span>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-600 block text-[10px] uppercase">COLOR SCIENCE</span>
                <span className="text-white font-medium">DaVinci Wide Gamut</span>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-600 block text-[10px] uppercase">AUDIO FREQUENCY</span>
                <span className="text-white font-medium">48kHz / 24-Bit Spatial</span>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-600 block text-[10px] uppercase">NLE MASTERY</span>
                <span className="text-white font-medium">Premiere + After Effects</span>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenShowreel}
                className="px-6 py-3.5 bg-white text-black font-matrix font-bold text-xs uppercase tracking-wider hover:bg-orange-500 hover:text-black transition-all flex items-center gap-2.5 shadow-xl"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>WATCH MASTER SHOWREEL</span>
              </button>

              <button
                onClick={onNavigateContact}
                className="px-6 py-3.5 bg-zinc-950 border border-white/15 hover:border-orange-500 text-white font-matrix font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <span>INITIATE COMMISSION</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-orange-400" />
              </button>
            </div>
          </div>

          {/* Column 2: Borderless High-Contrast Studio Showreel Monitor (7 cols) */}
          <div className="lg:col-span-7 relative group">
            
            {/* The Borderless Cinematic Media Frame */}
            <div className="relative aspect-[16/10] sm:aspect-[16/10] lg:aspect-[16/10] w-full overflow-hidden bg-black select-none">
              
              {/* Looping muted showreel feed with subtle filmic monochrome-to-color grading on hover */}
              <video
                src="/assets/kunal-showreel.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Kunal Lead Post-Production Editor Showreel Monitor"
                className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-110 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.02]"
              />

              {/* Edge Gradient Falloff Mask (fades borderlessly into dark background) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-black/30 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#090909]/40 via-transparent to-[#090909]/40 pointer-events-none" />

              {/* Subtle Film Grain Noise Texture */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

              {/* Live SMPTE Timecode Stamp Overlays */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono-code text-white">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>REC ● 00:04:18:24</span>
              </div>

              <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono-code text-zinc-300">
                <span>SHUTTER 180° // ISO 800</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono-code text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="text-orange-400 font-bold">KUNAL</span>
                  <span className="text-zinc-600">•</span>
                  <span>LEAD VIDEO EDITOR & MSc UX RESEARCHER</span>
                </div>
                <div className="text-zinc-500 text-[10px]">
                  SUN N SKY ENTERTAINMENT • EDINBURGH NAPIER
                </div>
              </div>

            </div>

            {/* Bottom Accent Detail */}
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono-code text-zinc-600 uppercase tracking-widest">
              <span>CINEMATIC ARCHIVE // 35MM GRAIN EMULATION</span>
              <span className="text-zinc-500">HOVER TO REVEAL COLOR GRADE</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
