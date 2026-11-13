import React, { useState, useEffect } from 'react';
import { Menu, X, Play, Copy, Check, ArrowUpRight, Download } from 'lucide-react';
import { KUNAL_PROFILE } from '../data/portfolioData';

interface FramerNavbarProps {
  onNavigate: (id: string) => void;
  onOpenShowreel: () => void;
}

export const FramerNavbar: React.FC<FramerNavbarProps> = ({
  onNavigate,
  onOpenShowreel
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour12: false, timeZone: 'Europe/London' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(KUNAL_PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navItems = [
    { num: '[01]', label: 'Works', id: 'works' },
    { num: '[02]', label: 'Credentials', id: 'achievements' },
    { num: '[03]', label: 'UX Lab', id: 'ux-video' },
    { num: '[04]', label: 'Pricing', id: 'pricing' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#090909]/90 backdrop-blur-md border-b border-white/[0.08]">
        <div className="w-full px-6 sm:px-10 lg:px-14 h-16 flex items-center justify-between">
          
          {/* Left: Branding & Edinburgh Coordinates */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('hero')}
              className="font-matrix font-black text-xl tracking-tight text-white flex items-center gap-2.5 hover:text-orange-400 transition-colors uppercase"
            >
              <span>KUNAL</span>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            </button>
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-zinc-950 border border-white/10 text-[10px] font-mono-code text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>AVAILABLE FOR COMMISSIONS // 2026</span>
            </div>
          </div>

          {/* Center: Architectural Nav Links */}
          <nav className="hidden md:flex items-center gap-4 xl:gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="group text-xs font-mono-code text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 uppercase tracking-wider"
              >
                <span className="text-zinc-600 group-hover:text-orange-400 transition-colors">{item.num}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right: Resume Download & Action Button */}
          <div className="flex items-center gap-4 xl:gap-8">
            

            <button
              onClick={onOpenShowreel}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 border border-white/15 hover:border-orange-500 text-xs font-mono-code text-white uppercase tracking-wider transition-all"
            >
              <Play className="w-3 h-3 fill-orange-400 text-orange-400" />
              <span>REEL 2026</span>
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="px-4 sm:px-5 py-2 bg-white text-black font-matrix font-bold text-xs uppercase tracking-wider hover:bg-orange-500 hover:text-black transition-all flex items-center gap-1.5"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white border border-white/10 shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-[#090909]/98 backdrop-blur-2xl border-t border-white/[0.08] p-8 flex flex-col justify-between md:hidden">
          <div className="space-y-6">
            <div className="text-xs font-mono-code text-zinc-500 uppercase tracking-widest pb-4 border-b border-white/10">
              [SYSTEM NAVIGATION]
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMenuOpen(false);
                }}
                className="w-full text-left font-matrix font-bold text-2xl text-white hover:text-orange-400 transition-colors flex items-baseline justify-between"
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono-code text-zinc-600">{item.num}</span>
              </button>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 space-y-4 font-mono-code text-xs">
            <div className="flex items-center justify-between text-zinc-400">
              <span>LOCATION:</span>
              <span className="text-white">EDINBURGH, SCOTLAND</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400">
              <span>CREDENTIALS:</span>
              <span className="text-white">EDINBURGH NAPIER (MSc UX)</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onNavigate('resume');
                  setMenuOpen(false);
                }}
                className="py-3 bg-white text-black text-center block uppercase tracking-wider font-franie font-bold text-xs hover:bg-orange-500 transition-colors"
              >
                VIEW CV
              </button>
              <a
                href="/assets/Kunal_Resume_Updated.pdf"
                download="Kunal_Resume_Updated.pdf"
                className="py-3 border border-white/20 text-center block text-white uppercase tracking-wider font-franie font-bold text-xs hover:bg-white hover:text-black transition-colors"
              >
                DOWNLOAD PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};