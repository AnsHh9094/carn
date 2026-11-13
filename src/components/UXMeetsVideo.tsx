import React, { useState } from 'react';
import { Eye, Brain, Sparkles, TrendingUp, Compass, ArrowRight } from 'lucide-react';

export const UXMeetsVideo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'retention' | 'cognition'>('retention');

  const retentionPoints = [
    { second: '0:01', label: 'Hook Impact', standard: 80, kunal: 98, note: 'Micro-motion cut interrupt prevents thumb-scroll drop' },
    { second: '0:05', label: 'Value Anchor', standard: 45, kunal: 89, note: 'Kinetic typography + spatial z-zoom lock visual attention' },
    { second: '0:15', label: 'Narrative Bridge', standard: 30, kunal: 82, note: 'Foley sound frequency reset dissolves cognitive fatigue' },
    { second: '0:30', label: 'Climax / Core', standard: 22, kunal: 78, note: 'Contrast ratio color grade triggers emotional dopamine peak' },
    { second: '0:60', label: 'Call to Action', standard: 14, kunal: 71, note: 'Gestalt visual hierarchy guides audience to conversion' }
  ];

  return (
    <section id="ux-video" className="w-full py-24 bg-[#0c0c0c] text-white border-b border-white/[0.08]">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Header */}
        <div className="pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono-code text-orange-400 uppercase tracking-widest flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>THE UNFAIR ADVANTAGE // COGNITIVE LAB</span>
            </div>
            <h2 className="font-matrix font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              UX ARCHITECTURE <br />
              MEETS VIDEO.
            </h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-2xl font-sans">
              Most video editors cut purely on gut feel and flashy trends. Kunal engineers every sequence with Edinburgh Napier University MSc UX research: balancing cognitive load, controlling saccadic eye movement, and preventing viewer drop-off.
            </p>
          </div>

          {/* Minimalist Switcher */}
          <div className="flex items-center border border-white/10 p-1 bg-zinc-950 font-mono-code text-xs">
            <button
              onClick={() => setActiveTab('retention')}
              className={`px-4 py-2 uppercase transition-all tracking-wider ${
                activeTab === 'retention'
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              RETENTION CURVE
            </button>
            <button
              onClick={() => setActiveTab('cognition')}
              className={`px-4 py-2 uppercase transition-all tracking-wider ${
                activeTab === 'cognition'
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              COGNITIVE LOAD
            </button>
          </div>
        </div>

        {/* Tab 1: Retention Analysis */}
        {activeTab === 'retention' ? (
          <div className="pt-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-mono-code text-zinc-500 uppercase tracking-wider">A/B RETENTION BENCHMARK</span>
                <h3 className="font-matrix font-bold text-2xl text-white mt-1 uppercase">
                  Industry Standard Cut vs. Kunal's UX-Engineered Cut
                </h3>
              </div>

              <div className="flex items-center gap-6 text-xs font-mono-code">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-zinc-700" />
                  <span className="text-zinc-400">Industry Average (14% Completion)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-orange-500" />
                  <span className="text-orange-400 font-bold">Kunal's UX Cut (71% Completion)</span>
                </div>
              </div>
            </div>

            {/* Retention Step-by-Step Rows */}
            <div className="divide-y divide-white/[0.08]">
              {retentionPoints.map((pt, i) => (
                <div key={i} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-3">
                    <div className="font-matrix font-bold text-lg text-white">
                      {pt.second} — {pt.label}
                    </div>
                    <div className="text-xs font-mono-code text-zinc-500 mt-1">{pt.note}</div>
                  </div>

                  <div className="md:col-span-9 space-y-2">
                    {/* Kunal Bar */}
                    <div className="flex items-center gap-3">
                      <span className="w-12 text-xs font-mono-code text-orange-400 font-bold">{pt.kunal}%</span>
                      <div className="flex-1 h-3 bg-zinc-950 border border-white/10 overflow-hidden">
                        <div
                          className="h-full bg-orange-500 transition-all duration-1000 ease-out"
                          style={{ width: `${pt.kunal}%` }}
                        />
                      </div>
                    </div>

                    {/* Standard Bar */}
                    <div className="flex items-center gap-3">
                      <span className="w-12 text-xs font-mono-code text-zinc-500">{pt.standard}%</span>
                      <div className="flex-1 h-2 bg-zinc-950 border border-white/5 overflow-hidden">
                        <div
                          className="h-full bg-zinc-700 transition-all duration-1000 ease-out"
                          style={{ width: `${pt.standard}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Tab 2: Cognitive Load */
          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
            <div className="p-6 md:p-8 space-y-4">
              <span className="text-xs font-mono-code text-orange-400 uppercase font-bold">[01] SACCADIC FLOW</span>
              <h4 className="font-matrix font-bold text-xl text-white uppercase">Eye Gaze Centering</h4>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Cutting matching points of focal interest between shots prevents the viewer’s eye from wandering across the screen, eliminating microscopic fatigue that causes scroll-aways.
              </p>
            </div>

            <div className="p-6 md:p-8 space-y-4">
              <span className="text-xs font-mono-code text-orange-400 uppercase font-bold">[02] DUAL-CHANNEL CODING</span>
              <h4 className="font-matrix font-bold text-xl text-white uppercase">Audio-Visual Sync</h4>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Pairing visual text cut-ins with sub-bass audio transients activates both visual and auditory processing areas simultaneously, multiplying memory retention by 3.2x.
              </p>
            </div>

            <div className="p-6 md:p-8 space-y-4">
              <span className="text-xs font-mono-code text-amber-400 uppercase font-bold">[03] MICRO-RESETS</span>
              <h4 className="font-matrix font-bold text-xl text-white uppercase">Dopamine Pacing</h4>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Injecting subtle rhythm alterations every 4–7 seconds resets viewer dopamine tolerance, making 10-minute long-form YouTube documentaries feel like 90 seconds.
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};