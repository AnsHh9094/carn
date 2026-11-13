import React from 'react';
import { Check, ArrowUpRight, Sparkles } from 'lucide-react';

interface FramerPackagesProps {
  onSelectPackage: (name: string) => void;
}

export const FramerPackages: React.FC<FramerPackagesProps> = ({ onSelectPackage }) => {
  return (
    <section id="packages" className="w-full py-24 bg-[#090909] text-white border-b border-white/[0.08]">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Header */}
        <div className="pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono-code text-orange-400 uppercase tracking-widest flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>TRANSPARENT INVESTMENT // PACKAGES</span>
            </div>
            <h2 className="font-matrix font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              COMMISSION A <br />
              PRODUCTION CUT.
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-sans">
            Every quote includes transparent deliverables and revisions before kickoff. If your project sits between tiers, we calibrate a custom production agreement.
          </p>
        </div>

        {/* 2-Column Architectural Pricing Slates (No Floating Boxes) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08] border-b border-white/[0.08]">
          
          {/* Package 1: Single Cut / Campaign Starter */}
          <div className="py-12 lg:py-16 lg:pr-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono-code text-zinc-500 mb-6 pb-3 border-b border-white/[0.08]">
                <span>[TIER 01 // STARTER]</span>
                <span className="text-zinc-400">TURNAROUND: 1–2 WEEKS</span>
              </div>

              <h3 className="font-matrix font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                FIRST TAKE / SINGLE CUT
              </h3>
              <p className="mt-3 text-sm text-zinc-400 font-sans leading-relaxed">
                Engineered for creators, music artists, and brands needing a single high-conversion video or viral reel cut.
              </p>

              <div className="mt-8 mb-8 flex items-baseline gap-3">
                <span className="text-xs font-mono-code text-zinc-500 uppercase">From</span>
                <span className="font-matrix font-black text-6xl text-white tracking-tight">$1,500</span>
                <span className="text-xs font-mono-code text-zinc-500 uppercase">/ Project</span>
              </div>

              <div className="pt-6 border-t border-white/[0.08] space-y-3.5">
                <span className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider block mb-2">
                  Included In First Take:
                </span>
                {[
                  "Footage curation & assembly cut in Premiere Pro",
                  "Attention hook engineering & retention pacing",
                  "Sound design, dialogue denoise, and foley sync",
                  "Cinematic color grade in DaVinci Resolve",
                  "Two structured review & revision cycles",
                  "Full 4K DCI master + vertical 9:16 export"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs font-mono-code text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectPackage("First Take ($1,500)")}
              className="mt-10 w-full py-4 bg-white text-black font-matrix font-bold text-xs uppercase tracking-wider hover:bg-orange-500 transition-colors flex items-center justify-center gap-2"
            >
              <span>COMMISSION FIRST TAKE ($1,500)</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Package 2: Director's Cut / Monthly Retainer */}
          <div className="py-12 lg:py-16 lg:pl-12 flex flex-col justify-between bg-white/[0.01]">
            <div>
              <div className="flex items-center justify-between text-xs font-mono-code text-orange-400 mb-6 pb-3 border-b border-orange-500/20">
                <span>[TIER 02 // FEATURED RETAINER]</span>
                <span className="text-orange-400 font-bold">TURNAROUND: 3–4 WEEKS</span>
              </div>

              <h3 className="font-matrix font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                DIRECTOR'S CUT / RETAINER
              </h3>
              <p className="mt-3 text-sm text-zinc-400 font-sans leading-relaxed">
                Complete post-production partnership for ambitious YouTube channels, brands, and agencies producing regular content.
              </p>

              <div className="mt-8 mb-8 flex items-baseline gap-3">
                <span className="text-xs font-mono-code text-zinc-500 uppercase">From</span>
                <span className="font-matrix font-black text-6xl text-white tracking-tight">$3,200</span>
                <span className="text-xs font-mono-code text-zinc-500 uppercase">/ Month</span>
              </div>

              <div className="pt-6 border-t border-white/[0.08] space-y-3.5">
                <span className="text-xs font-mono-code text-orange-400 uppercase tracking-wider block mb-2">
                  Everything in First Take Plus:
                </span>
                {[
                  "Up to 4 complete multi-camera episodes / ad cuts",
                  "Dedicated Edinburgh Napier UX audience flow research",
                  "Custom motion graphic lower thirds & intro stings",
                  "Multi-platform aspect ratios (16:9, 9:16, 1:1, 4:5)",
                  "Priority 48-hour turnarounds on urgent revisions",
                  "Direct Slack / WhatsApp channel with Kunal"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs font-mono-code text-zinc-200">
                    <Check className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectPackage("Director's Cut ($3,200/mo)")}
              className="mt-10 w-full py-4 bg-orange-500 text-black font-matrix font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <span>COMMISSION DIRECTOR'S CUT ($3,200)</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};