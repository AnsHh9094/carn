import React, { useState } from 'react';
import { Check, Plus, Minus, ArrowUpRight } from 'lucide-react';
import { SERVICES_LIST } from '../data/portfolioData';

interface FramerServicesProps {
  onPlanCut: () => void;
}

export const FramerServices: React.FC<FramerServicesProps> = ({ onPlanCut }) => {
  const [expandedId, setExpandedId] = useState<string>(SERVICES_LIST[0].id);

  return (
    <section id="services" className="w-full py-24 bg-[#090909] text-white border-b border-white/[0.08]">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Header */}
        <div className="pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono-code text-orange-400 uppercase tracking-widest flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>CORE CAPABILITIES // EDITORIAL SPECS</span>
            </div>
            <h2 className="font-matrix font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              BUILT FOR THE ENTIRE <br />
              POST PIPELINE.
            </h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-xl font-sans">
              From the assembly rough cut to fine rhythm cutting, dialogue de-noising, color science, and delivery masters.
            </p>
          </div>

          <button
            onClick={onPlanCut}
            className="px-6 py-3.5 bg-white text-black font-matrix font-bold text-xs uppercase tracking-wider hover:bg-orange-500 transition-colors flex items-center gap-2"
          >
            <span>COMMISSION A CUSTOM PROJECT</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Minimalist Hairline Accordion List (No Floating Boxes) */}
        <div className="divide-y divide-white/[0.08]">
          {SERVICES_LIST.map((service) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                className="py-10 transition-colors hover:bg-white/[0.015]"
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? '' : service.id)}
                  className="cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="text-sm font-mono-code text-orange-400 font-bold">{service.num}</span>
                    <h3 className="font-matrix font-black text-2xl sm:text-3xl text-white uppercase tracking-tight hover:text-orange-400 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6 text-xs font-mono-code text-zinc-400">
                    <span className="hidden sm:inline">[DELIVERY: {service.deliveryTime.toUpperCase()}]</span>
                    <span className="text-white font-bold">{service.startingPrice}</span>
                    <div className="w-8 h-8 border border-white/20 flex items-center justify-center text-white">
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Pane */}
                {isExpanded && (
                  <div className="mt-8 pt-8 border-t border-white/[0.05] grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    <div className="md:col-span-5">
                      <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                        {service.description}
                      </p>
                      <button
                        onClick={onPlanCut}
                        className="mt-6 inline-flex items-center gap-2 text-xs font-mono-code text-orange-400 hover:text-white transition-colors uppercase tracking-wider"
                      >
                        <span>BOOK THIS SPECIFICATION</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs font-mono-code text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
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