import React from 'react';
import { KUNAL_PROFILE } from '../data/portfolioData';
import { TrendingUp, Film, Award, Clock, Sparkles, Layers } from 'lucide-react';

export const FramerNumbers: React.FC = () => {
  const milestones = [
    {
      stat: '25,000,000+',
      unit: 'TOTAL DIGITAL VIEWS',
      title: 'Top-tier creator & commercial scale',
      desc: 'Cumulative views generated across Sun n Sky Entertainment campaigns, tier-one YouTube creators (Urban Pulse, Just Drama), and viral social releases.',
      badge: 'SCALE BENCHMARK',
      icon: TrendingUp,
    },
    {
      stat: '94.2%',
      unit: 'AUDIENCE RETENTION',
      title: 'Empirical cognitive pacing advantage',
      desc: 'Tested viewer retention exceeding social baseline (42%) via cognitive load optimization, saccadic eye-movement anchors, and micro-hook sequencing.',
      badge: 'UX RESEARCH-BACKED',
      icon: Sparkles,
    },
    {
      stat: '4+ YEARS',
      unit: 'LEAD POST-PRODUCTION',
      title: 'Continuous lead editing stewardship',
      desc: 'Full studio post-production oversight at Sun n Sky Entertainment — managing raw multicam ingestion, color pipelines, foley sound design, and master exports.',
      badge: 'STUDIO VERIFIED',
      icon: Film,
    },
    {
      stat: 'MSc UX',
      unit: 'EDINBURGH NAPIER',
      title: 'Postgraduate attention architecture',
      desc: 'Formally trained in cognitive psychology, user retention mechanics, and attention ergonomics at Edinburgh Napier University (2025).',
      badge: 'ACADEMIC MASTERY',
      icon: Award,
    },
    {
      stat: '140+',
      unit: 'COMMERCIAL DELIVERIES',
      title: 'Zero-failure turnaround record',
      desc: 'Broadcast and digital campaigns delivered for international sports (Moto GP Bharat, Hypd Sports) and commercial travel (Jet 2 Holiday).',
      badge: 'DELIVERY RELIABILITY',
      icon: Clock,
    },
    {
      stat: '24.00 FPS',
      unit: 'SMPTE CINEMA MASTERS',
      title: '4K ProRes 422 HQ & DaVinci science',
      desc: 'Strict broadcast standards adherence, DaVinci Wide Gamut color grading, and 48kHz / 24-bit multi-track audio mastering on every finished cut.',
      badge: 'COLOR & SOUND SCIENCE',
      icon: Layers,
    },
  ];

  return (
    <section id="numbers" className="w-full py-24 bg-[#090909] text-white border-b border-white/[0.08]">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Header */}
        <div className="pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono-code text-orange-400 uppercase tracking-widest flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>RECORDS & TRACK RECORD // DATA-BACKED PACE</span>
            </div>
            <h2 className="font-matrix font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              RECORDS WERE MADE <br />
              TO BE BROKEN.
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-sans">
            "Behind every cut is empirical data. From YouTube algorithms to commercial broadcast, pacing is engineered for measurable audience retention."
          </p>
        </div>

        {/* 4 Monolithic Headline Stat Columns (LayerTwo jjettas.com Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] border-b border-white/[0.08]">
          {KUNAL_PROFILE.stats.map((stat, i) => (
            <div
              key={i}
              className="py-12 sm:py-16 sm:px-8 first:sm:pl-0 last:sm:pr-0 group hover:bg-white/[0.02] transition-colors"
            >
              <div className="text-xs font-mono-code text-zinc-500 mb-6 flex items-center justify-between">
                <span>[0{i + 1} // TOTAL]</span>
                <span className="w-1.5 h-1.5 bg-zinc-700 group-hover:bg-orange-500 transition-colors" />
              </div>

              <div className="font-matrix font-black text-6xl sm:text-7xl lg:text-8xl text-white group-hover:text-orange-400 transition-colors tracking-tight">
                {stat.value}
              </div>

              <div className="mt-4 text-xs font-mono-code uppercase tracking-wider text-zinc-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Sub-Header: Rewriting the Retention Playbook */}
        <div className="pt-16 pb-8 flex items-center justify-between">
          <div className="text-xs font-mono-code text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-zinc-600" />
            <span>REWRITING THE RETENTION PLAYBOOK // MILESTONES & STANDARDS</span>
          </div>
          <div className="text-xs font-mono-code text-zinc-600 hidden sm:block uppercase">
            SWIPE / EXPLORE MILESTONES →
          </div>
        </div>

        {/* High-Density Milestone & Record Grid (Modeled on jjettas.com Record Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] border-y border-white/[0.08]">
          {milestones.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-8 sm:p-10 group hover:bg-white/[0.02] transition-colors flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono-code text-zinc-500 mb-6">
                    <span className="text-orange-400 font-bold">{m.badge}</span>
                    <Icon className="w-4 h-4 text-zinc-500 group-hover:text-orange-400 transition-colors" />
                  </div>

                  <div className="font-matrix font-black text-4xl sm:text-5xl text-white group-hover:text-orange-400 transition-colors tracking-tight mb-2">
                    {m.stat}
                  </div>

                  <div className="text-[11px] font-mono-code uppercase tracking-widest text-zinc-400 mb-4">
                    {m.unit}
                  </div>

                  <h3 className="font-matrix font-bold text-lg text-white uppercase leading-snug mb-2">
                    {m.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] text-[10px] font-mono-code text-zinc-600 flex items-center justify-between uppercase">
                  <span>VERIFIED RECORD</span>
                  <span className="text-zinc-500">SUN N SKY // EDINBURGH</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
