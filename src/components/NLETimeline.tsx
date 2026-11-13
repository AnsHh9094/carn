import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Scissors, Calendar } from 'lucide-react';
import { CAREER_TIMELINE } from '../data/portfolioData';

export const NLETimeline: React.FC = () => {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play timeline progression
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveTrackIndex((prev) => (prev + 1) % CAREER_TIMELINE.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeMilestone = CAREER_TIMELINE[activeTrackIndex];

  return (
    <section id="timeline" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse"></span>
            <span className="font-mono-code text-xs text-accent-orange tracking-widest uppercase">
              NON-LINEAR CAREER SEQUENCER // NLE TIMELINE
            </span>
          </div>
          <h2 className="font-syne font-black text-3xl md:text-5xl tracking-tight text-white uppercase">
            THE EDITING SUITE JOURNEY
          </h2>
          <p className="mt-2 text-sm text-studio-400 max-w-xl">
            Scrub through 4+ years of post-production contracts, global entertainment clients, and postgraduate UX research.
          </p>
        </div>

        {/* NLE Sequencer Controls */}
        <div className="flex items-center gap-3 bg-studio-900 border border-white/10 px-4 py-2 rounded-xl">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-orange text-black font-mono-code font-bold text-xs uppercase hover:bg-orange-600 transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'PAUSE' : 'PLAY SEQUENCE'}</span>
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setActiveTrackIndex(0);
            }}
            className="p-1.5 rounded-lg hover:bg-white/10 text-studio-400 hover:text-white transition-colors"
            title="Reset to 2020"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono-code text-studio-400 pl-2 border-l border-white/10">
            CLIP: {activeTrackIndex + 1}/{CAREER_TIMELINE.length}
          </span>
        </div>
      </div>

      {/* Main NLE Timeline Workspace */}
      <div className="bg-studio-900/90 border border-white/15 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* NLE Ruler Header */}
        <div className="bg-studio-950 border-b border-white/10 px-6 py-3 flex items-center justify-between text-[11px] font-mono-code text-studio-400">
          <div className="flex items-center gap-6">
            <span className="text-white font-bold">TIMELINE: MASTER_SEQUENCE</span>
            <span className="text-accent-orange">FPS: 24.00</span>
            <span>SMPTE: 00:04:12:08</span>
          </div>
          <div className="flex items-center gap-2">
            <Scissors className="w-3.5 h-3.5 text-studio-400" />
            <span>SNAPPING: ON</span>
          </div>
        </div>

        {/* Interactive Clip Tracks */}
        <div className="p-6 space-y-3 bg-studio-950/60">
          
          {/* Track Labels & Blocks */}
          {CAREER_TIMELINE.map((item, idx) => {
            const isSelected = activeTrackIndex === idx;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveTrackIndex(idx);
                  setIsPlaying(false); // Pauses playback so user can read without being interrupted
                }}
                className={`relative flex items-center p-3 rounded-xl border transition-all cursor-pointer group ${
                  isSelected
                    ? 'bg-white/10 border-accent-orange shadow-lg shadow-orange-500/10'
                    : 'bg-studio-900/40 border-white/5 hover:border-white/20'
                }`}
              >
                {/* Track Code (V1, V2, etc.) */}
                <div className="w-16 flex-shrink-0 flex items-center gap-2 font-mono-code text-xs text-studio-400">
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-accent-orange' : 'bg-studio-700'}`} />
                  <span className={isSelected ? 'text-white font-bold' : ''}>TRK 0{idx + 1}</span>
                </div>

                {/* Clip Block */}
                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2 px-4 py-1.5 rounded-lg bg-studio-800/80 border border-white/10">
                  <div className="flex items-center gap-3">
                    <span 
                      className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold uppercase"
                      style={{ backgroundColor: `${item.color}25`, color: item.color }}
                    >
                      {item.trackType}
                    </span>
                    <span className="font-syne font-bold text-sm text-white group-hover:text-accent-orange transition-colors">
                      {item.title}
                    </span>
                    <span className="hidden md:inline-block text-xs text-studio-400 font-mono-code">
                      @ {item.organization}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono-code text-studio-400">
                    <span>{item.location}</span>
                    <span className="text-white bg-white/10 px-2 py-0.5 rounded text-[11px] font-semibold">
                      {item.period}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Milestone Inspection Monitor */}
        <div className="bg-studio-900 border-t border-white/10 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            
            {/* Monitor Column 1 */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono-code text-accent-orange uppercase tracking-widest">
                INSPECTOR // ACTIVE CLIP
              </span>
              <h3 className="font-syne font-black text-2xl text-white">
                {activeMilestone.title}
              </h3>
              <p className="font-mono-code text-xs text-studio-300">
                {activeMilestone.organization} — {activeMilestone.location}
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-code text-studio-400 mt-2">
                <Calendar className="w-3.5 h-3.5 text-accent-orange" />
                <span>{activeMilestone.period}</span>
              </div>
            </div>

            {/* Monitor Column 2 & 3: Highlights & Takeaways */}
            <div className="md:col-span-2 space-y-3 bg-studio-950/80 p-5 rounded-xl border border-white/10">
              <span className="text-[10px] font-mono-code text-studio-400 uppercase tracking-wider block">
                DELIVERED MILESTONES & RESPONSIBILITIES:
              </span>
              <ul className="space-y-2.5">
                {activeMilestone.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-studio-200 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-orange mt-1.5 flex-shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
