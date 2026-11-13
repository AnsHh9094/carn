import React from 'react';
import { Award, GraduationCap, Film, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AchievementsCertifications: React.FC = () => {
  const credentials = [
    {
      badge: 'ACADEMIC EXCELLENCE // POSTGRADUATE',
      icon: GraduationCap,
      title: 'MSc User Experience Design',
      institution: 'Edinburgh Napier University, Edinburgh, UK',
      period: '2024 – 2025',
      points: [
        'Research specialization in attention architecture and cognitive load theory',
        'Saccadic eye-movement and viewer fatigue mitigation models',
        'Integration of rapid Figma prototyping with non-linear video editing'
      ]
    },
    {
      badge: 'STUDIO LEAD // POST-PRODUCTION',
      icon: Film,
      title: 'Lead Video Editor & Content Creator',
      institution: 'Sun n Sky Entertainment, Florida (Remote)',
      period: '2020 – 2024 (4+ Years)',
      points: [
        'Full post-production ownership from raw multicam ingest to broadcast delivery',
        'Dynamic motion graphics and kinetic typography in Adobe After Effects',
        'Dialogue de-noising, foley sound design, and DaVinci Resolve color science'
      ]
    },
    {
      badge: 'CREATOR SCALE // 25M+ VIEWS',
      icon: TrendingUp,
      title: 'High-Retention Video Specialist',
      institution: 'YouTube Creators (Urban Pulse, Hypd Sports, Just Drama)',
      period: '2021 – 2024',
      points: [
        '350+ finished long-form and short-form video assets delivered',
        'Consistently exceeded channel retention baselines by +40% in first 30 seconds',
        'Maintained a 94% repeat engagement and client retention rate'
      ]
    },
    {
      badge: 'NARRATIVE FOUNDATION // UNDERGRADUATE',
      icon: Award,
      title: 'BA Journalism & Mass Communication',
      institution: 'GGS Indraprastha University, New Delhi',
      period: '2021 – 2024',
      points: [
        'Rigorous training in visual journalism, story pacing, and media ethics',
        'Broadcast scriptwriting and investigative documentary editing',
        'Hands-on studio camera operation and live television switcher controls'
      ]
    }
  ];

  const distinctions = [
    { name: 'RJ Hunt National Award', issuer: 'Spandan Media Festival', year: '2021', type: 'Voice & Storytelling' },
    { name: 'Visual Composition Distinction', issuer: 'Jashn-E-Tasveer', year: '2022', type: 'Framing & Geometry' },
    { name: 'Media Production Lead', issuer: 'National Festival Series', year: '2023', type: 'Post Pipeline' },
    { name: 'Public Service Documentary', issuer: 'Heal The Globe', year: '2022', type: 'Director / Editor' }
  ];

  return (
    <section id="achievements" className="w-full py-24 bg-[#090909] text-white border-b border-white/[0.08]">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Header */}
        <div className="pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono-code text-orange-400 uppercase tracking-widest flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>PROVEN CREDENTIALS // TRACK RECORD</span>
            </div>
            <h2 className="font-matrix font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              INDUSTRY MILESTONES <br />
              & ACCREDITATIONS.
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-sans">
            Backed by a formal postgraduate degree in User Experience Design from Edinburgh Napier and 4+ continuous years in commercial post-production.
          </p>
        </div>

        {/* 4 Architectural Credential Planes (No Floating Boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] border-b border-white/[0.08]">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div
                key={idx}
                className="py-12 md:py-16 md:px-10 first:md:pl-0 last:md:pr-0 group hover:bg-white/[0.015] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono-code text-zinc-500 mb-4">
                    <span className="text-orange-400 font-bold">{cred.badge}</span>
                    <span>{cred.period}</span>
                  </div>

                  <div className="flex items-baseline gap-3 mb-2">
                    <Icon className="w-5 h-5 text-zinc-400 group-hover:text-orange-400 transition-colors shrink-0 mt-1" />
                    <h3 className="font-matrix font-bold text-2xl text-white group-hover:text-orange-400 transition-colors uppercase">
                      {cred.title}
                    </h3>
                  </div>

                  <div className="text-xs font-mono-code text-zinc-400 mb-6">
                    {cred.institution}
                  </div>

                  <div className="space-y-3 pt-6 border-t border-white/[0.08]">
                    {cred.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verified Industry Distinctions Rail */}
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
          {distinctions.map((d, i) => (
            <div key={i} className="py-6 sm:px-6 first:sm:pl-0 last:sm:pr-0">
              <div className="text-[10px] font-mono-code text-orange-400 uppercase tracking-widest mb-1">
                [{d.year} // {d.type}]
              </div>
              <h4 className="font-matrix font-bold text-base text-white uppercase">
                {d.name}
              </h4>
              <p className="text-xs font-mono-code text-zinc-500 mt-1">
                {d.issuer}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};