import React, { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

// Leaf memoized component: isolates 24 FPS SMPTE ticker to prevent re-rendering the parent Navbar
const TimecodeBadge: React.FC = React.memo(() => {
  const [timecode, setTimecode] = useState("00:00:00:00");

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame = (frame + 1) % 24;
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      const ff = String(frame).padStart(2, '0');
      setTimecode(`${hh}:${mm}:${ss}:${ff}`);
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
      <span className="font-mono-code text-xs text-studio-200 tracking-wider">REC {timecode}</span>
    </div>
  );
});

TimecodeBadge.displayName = 'TimecodeBadge';

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'work', label: 'WORKS' },
    { id: 'categories', label: 'DISCIPLINES' },
    { id: 'timeline', label: 'CAREER TIMELINE' },
    { id: 'ux', label: 'UX LAB' },
    { id: 'skills', label: 'ARSENAL' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-studio-950/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Left: Isolated Timecode & Location */}
        <div className="flex items-center gap-4">
          <TimecodeBadge />
          <span className="hidden md:inline-block text-xs font-mono-code text-studio-400 border-l border-white/10 pl-3">
            EDINBURGH, UK
          </span>
        </div>

        {/* Center: Brand Monogram */}
        <button 
          onClick={() => onNavigate('hero')}
          className="font-syne font-black text-xl tracking-[0.2em] text-white hover:text-accent-orange transition-colors"
        >
          KUNAL<span className="text-accent-orange">.</span>
        </button>

        {/* Right: Desktop Navigation + Action */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-xs font-medium tracking-widest uppercase transition-colors relative py-1 ${
                activeSection === link.id ? 'text-accent-orange font-semibold' : 'text-studio-200 hover:text-white'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-orange animate-pulse" />
              )}
            </button>
          ))}

          {/* Resume Download CTA */}
          <a
            href="/assets/Kunal_Resume_ATS.pdf"
            download="Kunal_Resume_ATS.pdf"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white text-xs font-mono-code text-white hover:text-black transition-all hover:scale-105"
          >
            <span>RESUME</span>
            <Download className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-1 hover:text-accent-orange"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-studio-950/95 border-b border-white/10 px-6 py-6 flex flex-col gap-4 backdrop-blur-xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-sm font-semibold tracking-wider uppercase text-studio-200 hover:text-accent-orange"
            >
              {link.label}
            </button>
          ))}
          <a
            href="/assets/Kunal_Resume_ATS.pdf"
            download="Kunal_Resume_ATS.pdf"
            className="flex items-center justify-center gap-2 mt-2 w-full py-2.5 rounded-lg bg-accent-orange text-black font-semibold text-xs tracking-wider uppercase"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD RESUME (PDF)</span>
          </a>
        </div>
      )}
    </header>
  );
};
