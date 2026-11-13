import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_LIST } from '../data/portfolioData';

export const FramerFAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_LIST[0].id);

  return (
    <section id="faq" className="w-full py-24 bg-[#090909] text-white border-b border-white/[0.08]">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Header */}
        <div className="pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono-code text-orange-400 uppercase tracking-widest flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>PRODUCTION PROTOCOLS // FAQ</span>
            </div>
            <h2 className="font-matrix font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              BEFORE THE <br />
              CAMERAS ROLL.
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-sans">
            Everything you need to know about raw footage delivery, color pipelines, remote NLE timelines, and revisions.
          </p>
        </div>

        {/* Minimalist Hairline Accordion List (No Floating Boxes) */}
        <div className="divide-y divide-white/[0.08]">
          {FAQ_LIST.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="py-8 transition-colors hover:bg-white/[0.015]"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full text-left flex items-center justify-between gap-6 group"
                >
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="text-xs font-mono-code text-orange-400 font-bold">{faq.num}</span>
                    <h3 className="font-matrix font-bold text-xl sm:text-2xl text-white group-hover:text-orange-400 transition-colors uppercase">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="w-8 h-8 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:border-orange-500 transition-colors">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-6 pl-12 sm:pl-16 pr-8 text-sm sm:text-base text-zinc-400 leading-relaxed font-sans max-w-4xl">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};