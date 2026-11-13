import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS_LIST, KUNAL_PROFILE } from '../data/portfolioData';

export const FramerTestimonials: React.FC = () => {
  return (
    <section id="reviews" className="w-full py-24 bg-[#090909] text-white border-b border-white/[0.08]">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Header */}
        <div className="pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono-code text-orange-400 uppercase tracking-widest flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>VERIFIED EDITORIAL CRITIQUE // REVIEWS</span>
            </div>
            <h2 className="font-matrix font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              THEY SAID IT BETTER <br />
              THAN WE COULD.
            </h2>
          </div>

          <div className="flex items-center gap-3 p-3 bg-zinc-950 border border-white/10 font-mono-code text-xs">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-white">4.9 / 5.0</span>
            <span className="text-zinc-500">· {KUNAL_PROFILE.experienceLabel}</span>
          </div>
        </div>

        {/* 3-Column Architectural Hairline Grid (No Floating Boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] border-b border-white/[0.08]">
          {TESTIMONIALS_LIST.map((item, i) => (
            <div
              key={item.id}
              className="py-12 md:px-10 first:md:pl-0 last:md:pr-0 flex flex-col justify-between hover:bg-white/[0.015] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-code text-zinc-500 mb-6">
                  <span>[0{i + 1} // REVIEW]</span>
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(item.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-base text-zinc-300 leading-relaxed font-sans italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center gap-4">
                <div className={`relative w-12 h-12 shrink-0 border bg-zinc-950 flex items-center justify-center font-matrix font-black text-sm tracking-widest shadow-[0_0_14px_rgba(255,255,255,0.06)] ${item.badgeColor}`}>
                  <span className="relative z-10">{item.initials}</span>
                  <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-matrix font-bold text-sm text-white uppercase">
                    {item.author}
                  </h4>
                  <p className="text-xs font-mono-code text-zinc-500">
                    {item.role} · {item.company}
                  </p>
                  <span className="inline-block mt-1.5 px-2 py-0.5 border border-white/10 text-[9px] font-mono-code text-zinc-400 uppercase tracking-widest">
                    {item.studio}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};