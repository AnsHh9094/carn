import React from 'react';
import { ArrowUpRight, CheckCircle2, Globe2 } from 'lucide-react';
import { KUNAL_PROFILE } from '../data/portfolioData';

interface ComicCraftDeckProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ComicCraftDeck: React.FC<ComicCraftDeckProps> = ({ onSelectService }) => {
  return (
    <section
      id="skills"
      aria-label="Skills and Capabilities"
      className="comic-panel relative bg-[#F4F4F6] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 space-y-10 sm:space-y-12">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[#0A0A0A] pb-6">
          <div className="space-y-2">
            <span className="inline-block px-2.5 py-0.5 bg-[#0A0A0A] text-[#FFAE00] font-mono-code text-[11px] font-bold uppercase tracking-widest">
              [03] SKILLS &amp; TOOLS
            </span>
            <h2 className="font-condensed font-black text-5xl sm:text-7xl lg:text-8xl uppercase leading-[0.86] text-[#0A0A0A]">
              Capabilities &amp; Stack
            </h2>
          </div>

          <p className="font-body text-base sm:text-lg text-[#4A4A52] max-w-md">
            Core UX methods, post-production software, visual design tools, and spoken languages from Kunal&apos;s CV.
          </p>
        </div>

        {/* 4-Card Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {KUNAL_PROFILE.skillGroups.map((group, index) => (
            <article
              key={group.id}
              className="bg-white border-[2.5px] border-[#0A0A0A] shadow-[8px_8px_0_0_#0A0A0A] hover:shadow-[10px_10px_0_0_#0A0A0A] hover:-translate-y-0.5 transition-all p-6 sm:p-7 flex flex-col justify-between gap-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`px-2.5 py-1 border-2 border-[#0A0A0A] font-mono-code text-xs font-bold uppercase ${
                      index === 0
                        ? 'bg-[#2B47FF] text-white'
                        : index === 1
                        ? 'bg-[#FF4D00] text-[#0A0A0A]'
                        : 'bg-[#FFAE00] text-[#0A0A0A]'
                    }`}
                  >
                    {group.code} // 0{index + 1}
                  </span>
                  <span className="font-mono-code text-[11px] font-bold uppercase text-[#4A4A52]">
                    {group.subtitle}
                  </span>
                </div>

                <h3 className="font-condensed font-black text-4xl sm:text-5xl uppercase leading-[0.9] text-[#0A0A0A]">
                  {group.title}
                </h3>

                <p className="font-body text-sm sm:text-base text-[#4A4A52] leading-relaxed">
                  {group.description}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 font-body text-sm font-semibold text-[#0A0A0A]"
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 text-[#2B47FF]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t-2 border-[#0A0A0A]/15 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => onSelectService(group.title)}
                  className="btn-comic min-h-[44px] px-4 bg-[#0A0A0A] text-white font-condensed font-black text-xl uppercase hover:bg-[#FF4D00] hover:text-[#0A0A0A]"
                >
                  <span>Discuss {group.code}</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Clean Languages & Interests Summary Strip */}
        <div className="bg-white border-[2.5px] border-[#0A0A0A] shadow-[6px_6px_0_0_#0A0A0A] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Globe2 className="w-5 h-5 text-[#2B47FF] shrink-0" aria-hidden="true" />
            <div>
              <div className="font-mono-code text-[11px] font-bold uppercase text-[#2B47FF]">
                Languages
              </div>
              <div className="font-body text-sm sm:text-base font-bold text-[#0A0A0A]">
                English · Hindi · Ukrainian
              </div>
            </div>
          </div>

          <div className="sm:text-right">
            <div className="font-mono-code text-[11px] font-bold uppercase text-[#B83200]">
              Interests &amp; Availability
            </div>
            <div className="font-body text-sm sm:text-base font-semibold text-[#4A4A52]">
              Gaming, Music · Open to UK &amp; Remote UX / Video Roles
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
