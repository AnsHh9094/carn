import React from 'react';
import { ArrowUp } from 'lucide-react';
import { KUNAL_PROFILE } from '../data/portfolioData';

export const FramerFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-16 bg-[#090909] text-xs font-mono-code text-zinc-500 border-t border-white/[0.08]">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Brand */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <span className="font-matrix font-black text-2xl text-white tracking-tight uppercase">KUNAL</span>
          <span className="hidden sm:inline text-zinc-700">/</span>
          <span>EDINBURGH NAPIER (MSc UX) · SUN N SKY ENTERTAINMENT</span>
        </div>

        {/* Center: Direct Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-zinc-400 uppercase tracking-wider">
          <a href={`mailto:${KUNAL_PROFILE.email}`} className="hover:text-white transition-colors">
            {KUNAL_PROFILE.email}
          </a>
          <span className="text-zinc-700">•</span>
          <a href={`tel:${KUNAL_PROFILE.phone}`} className="hover:text-white transition-colors">
            {KUNAL_PROFILE.phone}
          </a>
          <span className="text-zinc-700">•</span>
          <a href={KUNAL_PROFILE.portfolioLink} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">
            {KUNAL_PROFILE.portfolioLinkLabel.toUpperCase()} ↗
          </a>
        </div>

        {/* Right: Scroll to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors px-4 py-2 border border-white/10 hover:border-white/30 uppercase"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-orange-400" />
        </button>

      </div>
    </footer>
  );
};