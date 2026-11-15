import React, { useEffect, useState } from 'react';
import { Menu, X, Mail } from 'lucide-react';

interface ComicHeaderProps {
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'works', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export const ComicHeader: React.FC<ComicHeaderProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <>
      <header
        className="fixed top-0 z-50 transition-colors duration-300"
        style={{
          left: 'var(--frame-outer)',
          right: 'var(--frame-outer)',
          height: 'calc(var(--header-h) + var(--frame-outer))',
          borderTop: 'var(--frame-outer) solid #0A0A0A',
          borderBottom: 'var(--rule-w) solid #0A0A0A',
          backgroundColor: 'var(--field-orange)',
        }}
      >
        <div className="h-full px-3 sm:px-6 flex items-center justify-between gap-3">
          {/* Left: Clean Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleNavClick('hero')}
            className="group flex items-center gap-2 min-h-[44px] px-1 text-[#0A0A0A] focus-visible:outline-black hover:-translate-y-0.5 hover:-rotate-1 transition-transform duration-150"
          >
            <span className="font-comic text-xl sm:text-2xl tracking-tight leading-none uppercase">
              My Portfolio
            </span>
            <span className="sr-only">Return to top</span>
          </button>

          {/* Center: Rolling Dual-Span Nav Links (Desktop) */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className="roll font-condensed font-black text-xl lg:text-2xl uppercase tracking-tight text-[#0A0A0A] min-h-[44px] items-center"
              >
                <span>{item.label}</span>
                <span aria-hidden="true">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Right: Direct Contact CTA + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              className="btn-comic min-h-[42px] px-3.5 sm:px-5 bg-[#0A0A0A] text-white text-sm sm:text-base font-condensed font-black uppercase tracking-wide hover:bg-white hover:text-[#0A0A0A]"
            >
              <Mail className="w-3.5 h-3.5 shrink-0 hidden sm:block" aria-hidden="true" />
              <span>Get in Touch</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden btn-comic min-h-[42px] min-w-[44px] px-2.5 bg-white text-[#0A0A0A]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-40 bg-[#0A0A0A] text-white flex flex-col justify-between p-6 pt-24"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="flex items-baseline justify-between py-3 border-b-2 border-white/15 text-left font-condensed font-black text-5xl uppercase tracking-tight text-white hover:text-[#FFAE00] hover:translate-x-1 transition-all"
              >
                <span>{item.label}</span>
                <span className="font-mono-code text-sm text-[#FF4D00]">0{idx + 1}</span>
              </button>
            ))}
          </nav>

          <div className="space-y-3 pb-4">
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="w-full btn-comic min-h-[48px] bg-[#FF4D00] text-[#0A0A0A] font-condensed font-black text-2xl uppercase"
            >
              Get in Touch
            </button>
            <p className="font-mono-code text-[11px] uppercase tracking-widest text-zinc-400 text-center">
              Edinburgh, United Kingdom · UX Designer &amp; Video Editor
            </p>
          </div>
        </div>
      )}
    </>
  );
};
