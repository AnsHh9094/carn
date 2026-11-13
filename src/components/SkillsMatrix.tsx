import React, { useState } from 'react';
import { Video, Wand2, Layout, Palette, Volume2, Layers, Check } from 'lucide-react';
import { KUNAL_PROFILE } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Post-Production' | 'UX & Motion'>('All');

  const categories = [
    {
      group: 'NON-LINEAR EDITING & POST',
      description: 'Mastery over high-speed pacing, multi-cam synchronization, rhythm cutting, and narrative structure.',
      skills: [
        { name: 'Adobe Premiere Pro', level: 98, spec: 'Advanced Timeline Editing & Speed Ramping' },
        { name: 'DaVinci Resolve', level: 88, spec: 'Color Management, ACES / Rec.709 Grading' },
        { name: 'Audio Mixing & Foley', level: 86, spec: 'Dialogue Clarity, Sound FX, Sub-Bass Transients' }
      ]
    },
    {
      group: 'MOTION GRAPHICS & KINETIC DESIGN',
      description: 'Attention-grabbing visual effects, custom lower thirds, typography animation, and dynamic stings.',
      skills: [
        { name: 'Adobe After Effects', level: 92, spec: 'Kinetic Typography, Tracking & Compositing' },
        { name: 'Adobe Photoshop', level: 92, spec: 'Thumbnail Engineering & Visual Assets' },
        { name: 'Visual Hierarchy & Brand Kit', level: 90, spec: 'Cross-Platform Formatting (16:9, 9:16, 1:1)' }
      ]
    },
    {
      group: 'UX ARCHITECTURE & AUDIENCE RETENTION',
      description: 'Applying Edinburgh Napier University postgraduate research to optimize viewer cognitive flow.',
      skills: [
        { name: 'Figma & UI Wireframing', level: 90, spec: 'Interactive Prototyping & Usability Testing' },
        { name: 'Cognitive Load Optimization', level: 94, spec: 'Saccadic Eye Tracking & Drop-off Mitigation' },
        { name: 'Audience Journey Mapping', level: 89, spec: 'Hook Design & Call-to-Action Visual Funnels' }
      ]
    }
  ];

  return (
    <section id="skills" className="w-full py-24 bg-[#090909] text-white border-b border-white/[0.08]">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Header */}
        <div className="pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono-code text-orange-400 uppercase tracking-widest flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>TECHNICAL ARSENAL // SOFTWARE & DOMAIN EXPERTISE</span>
            </div>
            <h2 className="font-matrix font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              ENGINEERED MASTERY.
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-sans">
            Deep technical competencies across industry standard NLE suites, color grading pipelines, and postgraduate UX research environments.
          </p>
        </div>

        {/* 3-Column Architectural Skill Planes (No Floating Boxes) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08] border-b border-white/[0.08]">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="py-12 lg:py-16 lg:px-10 first:lg:pl-0 last:lg:pr-0 flex flex-col justify-between hover:bg-white/[0.015] transition-colors"
            >
              <div>
                <div className="text-xs font-mono-code text-zinc-500 mb-2">
                  [CATEGORY 0{idx + 1}]
                </div>
                <h3 className="font-matrix font-bold text-xl text-white uppercase tracking-wider mb-3">
                  {cat.group}
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-8">
                  {cat.description}
                </p>

                <div className="space-y-6 pt-6 border-t border-white/[0.08]">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono-code">
                        <span className="text-white font-bold">{skill.name}</span>
                        <span className="text-orange-400">{skill.level}%</span>
                      </div>

                      <div className="text-[11px] font-mono-code text-zinc-500">
                        {skill.spec}
                      </div>

                      <div className="w-full h-1.5 bg-zinc-950 border border-white/10 overflow-hidden">
                        <div
                          className="h-full bg-orange-500 transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono-code text-zinc-500">
                <span>VERIFIED PROFICIENCY</span>
                <span className="text-white">INDUSTRY TESTED</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};