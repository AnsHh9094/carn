import React from 'react';
import { Film, ArrowUp, Sparkles, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 border-t border-white/10 bg-studio-950 text-xs font-mono-code text-studio-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          <span className="font-syne font-black text-white text-base">KUNAL<span className="text-accent-orange">.</span></span>
          <span className="border-l border-white/10 pl-3">
            © {new Date().getFullYear()} ALL RIGHTS RESERVED
          </span>
        </div>

        {/* Center: Tech Stack Pills */}
        <div className="flex items-center gap-2 text-[10px] text-studio-400">
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">THREE.JS</span>
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">REACT</span>
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">TAILWIND</span>
          <span className="px-2 py-0.5 rounded bg-accent-orange/10 border border-accent-orange/30 text-accent-orange">GSD + RALPH</span>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 hover:text-white transition-colors"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-4 h-4 text-accent-orange" />
        </button>
      </div>
    </footer>
  );
};
