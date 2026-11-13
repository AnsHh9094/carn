import React, { useEffect, useRef, useState } from 'react';
import { Play, ArrowDownRight, FileText, ExternalLink } from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { KUNAL_PROFILE } from '../data/portfolioData';

interface ComicHeroProps {
  onViewWorks: () => void;
  onOpenShowreel: () => void;
}

type BeatKey = 'ux' | 'editor' | 'creator' | 'napier';

const HERO_BEATS: Record<
  BeatKey,
  {
    label: string;
    tag: string;
    headline: string;
    note: string;
    badge: string;
  }
> = {
  ux: {
    label: 'UX Designer',
    tag: '01 // UX & INTERACTION',
    headline: 'Figma & User Research',
    note: 'User research, information architecture, wireframing, usability testing, and interactive Figma prototyping.',
    badge: 'MSc Edinburgh Napier',
  },
  editor: {
    label: 'Video Editor',
    tag: '02 // POST-PRODUCTION',
    headline: 'Premiere Pro & After Effects',
    note: '4+ years editing short- and long-form video content from raw footage to color grading and sound design.',
    badge: '4+ YRS EXPERIENCE',
  },
  creator: {
    label: 'Brands & Creators',
    tag: '03 // CREDITS',
    headline: 'Remote & Live Production',
    note: 'Sun n Sky Entertainment, Gulmohar Digitech, International Schooling, Hypd Sports, Zoomthing, Urban Pulse & Just Drama.',
    badge: 'COMMERCIAL & YOUTUBE',
  },
  napier: {
    label: 'Education',
    tag: '04 // ACADEMICS',
    headline: 'Edinburgh Napier & VIPS',
    note: 'MSc User Experience Design (01/2025 to 06/2025) following BA Journalism & Mass Communication (CGPA 7.32).',
    badge: 'EDINBURGH • NEW DELHI',
  },
};

export const ComicHero: React.FC<ComicHeroProps> = ({
  onViewWorks,
  onOpenShowreel,
}) => {
  const [activeBeat, setActiveBeat] = useState<BeatKey>('ux');
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let rafId = 0;
    const onPointerMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (portraitRef.current) {
          portraitRef.current.style.transform = `translate3d(${(nx * 10).toFixed(1)}px, ${(ny * 8).toFixed(1)}px, 0)`;
        }
        if (wordmarkRef.current) {
          wordmarkRef.current.style.transform = `translate3d(${(-nx * 14).toFixed(1)}px, ${(-ny * 10).toFixed(1)}px, 0)`;
        }
      });
    };

    const onPointerLeave = () => {
      cancelAnimationFrame(rafId);
      if (portraitRef.current) portraitRef.current.style.transform = 'translate3d(0,0,0)';
      if (wordmarkRef.current) wordmarkRef.current.style.transform = 'translate3d(0,0,0)';
    };

    section.addEventListener('pointermove', onPointerMove);
    section.addEventListener('pointerleave', onPointerLeave);
    return () => {
      cancelAnimationFrame(rafId);
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  const currentNote = HERO_BEATS[activeBeat];

  const chipClass = (key: BeatKey) =>
    `btn-comic min-h-[38px] px-3 py-1.5 font-mono-code text-xs font-bold uppercase tracking-wider ${
      activeBeat === key
        ? 'bg-[#2B47FF] text-white'
        : 'bg-white text-[#0A0A0A] hover:bg-[#FFAE00]'
    }`;

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="Introduction"
      className="comic-panel relative bg-white overflow-hidden"
    >
      {/* Subtle Light-Mode Three.js Depth Layer */}
      <Hero3DCanvas theme="light" />

      {/* Main 12-Column Editorial Comic Grid */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-5 sm:py-8 lg:py-10 min-h-[min(calc(100svh-var(--header-h)-var(--frame-outer)),820px)] flex flex-col justify-between gap-5 sm:gap-7">
        {/* Top Meta Rail */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#0A0A0A] pb-3">
          <div className="flex items-center gap-2 font-mono-code text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
            <span className="inline-block w-2.5 h-2.5 bg-[#FF4D00] border border-[#0A0A0A]" aria-hidden="true" />
            <span>{KUNAL_PROFILE.tagline}</span>
          </div>
          <div className="font-mono-code text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#4A4A52]">
            {KUNAL_PROFILE.location.toUpperCase()}
          </div>
        </div>

        {/* Centerpiece: Clear Identity Masthead + Interactive CV Focus + Graduate Portrait Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch my-auto">
          {/* Left 7 Cols: Factual Summary, Role Masthead & Direct Links */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6 py-1">
            {/* Upper Tier: Verified Credentials Telemetry Bar */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 border-2 border-[#0A0A0A] bg-white shadow-[4px_4px_0_0_#0A0A0A]">
                <div className="p-2.5 sm:p-3 border-r-2 border-[#0A0A0A]">
                  <div className="font-mono-code text-[10px] font-bold uppercase text-[#2B47FF]">
                    01 // EXPERIENCE
                  </div>
                  <div className="font-condensed font-black text-2xl sm:text-3xl text-[#0A0A0A] leading-none mt-0.5 tabular-nums">
                    4+ YEARS
                  </div>
                </div>
                <div className="p-2.5 sm:p-3 border-r-2 border-[#0A0A0A]">
                  <div className="font-mono-code text-[10px] font-bold uppercase text-[#B83200]">
                    02 // DEGREE
                  </div>
                  <div className="font-condensed font-black text-2xl sm:text-3xl text-[#0A0A0A] leading-none mt-0.5">
                    MSc UX DESIGN
                  </div>
                </div>
                <div className="p-2.5 sm:p-3">
                  <div className="font-mono-code text-[10px] font-bold uppercase text-[#4A4A52]">
                    03 // TOOLKIT
                  </div>
                  <div className="font-condensed font-black text-2xl sm:text-3xl text-[#0A0A0A] leading-none mt-0.5">
                    FIGMA &amp; ADOBE
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Tier: Clean Name Display + Grounded Bio + Focus Switcher */}
            <div className="space-y-4">
              <h1 className="font-comic text-6xl sm:text-8xl lg:text-[6.5rem] leading-[0.88] text-[#0A0A0A] tracking-tight">
                Kunal
              </h1>

              <p className="font-body text-lg sm:text-xl lg:text-[1.35rem] font-medium leading-[1.5] text-[#0A0A0A] max-w-2xl">
                {KUNAL_PROFILE.subheading}
              </p>

              {/* Focus Chips updating right-hand context card */}
              <div className="flex flex-wrap items-center gap-2 pt-1" role="group" aria-label="Core Focus Areas">
                {(Object.keys(HERO_BEATS) as BeatKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveBeat(key)}
                    onMouseEnter={() => setActiveBeat(key)}
                    aria-pressed={activeBeat === key}
                    className={chipClass(key)}
                  >
                    {HERO_BEATS[key].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Tier: Clear Primary Actions (Work, Showreel, Resume PDF, Figma Prototype) */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={onViewWorks}
                  className="btn-comic min-h-[50px] px-6 sm:px-7 bg-[#FF4D00] text-[#0A0A0A] font-condensed font-black text-2xl uppercase tracking-wide"
                  style={{ backgroundColor: 'var(--field-orange)' }}
                >
                  <span className="roll">
                    <span>My Work</span>
                    <span aria-hidden="true">My Work</span>
                  </span>
                  <ArrowDownRight className="w-5 h-5" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onOpenShowreel}
                  className="btn-comic min-h-[50px] px-5 sm:px-6 bg-white text-[#0A0A0A] font-condensed font-black text-2xl uppercase tracking-wide hover:bg-[#0A0A0A] hover:text-white"
                >
                  <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                  <span>Showreel</span>
                </button>

                <a
                  href="/assets/Kunal_Resume_ATS.pdf"
                  download="Kunal_Resume_ATS.pdf"
                  className="btn-comic min-h-[50px] px-5 bg-[#F4F4F6] text-[#0A0A0A] font-condensed font-black text-xl uppercase tracking-wide hover:bg-[#FFAE00]"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Resume PDF</span>
                </a>

                <a
                  href={KUNAL_PROFILE.portfolioLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-comic min-h-[50px] px-5 bg-[#F4F4F6] text-[#0A0A0A] font-condensed font-black text-xl uppercase tracking-wide hover:bg-[#2B47FF] hover:text-white"
                >
                  <span>Figma UX Prototype</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>

              <div className="font-mono-code text-[11px] font-bold uppercase tracking-wider text-[#4A4A52]">
                FIGMA • PREMIERE PRO • AFTER EFFECTS • PHOTOSHOP • CORELDRAW
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Graduate Portrait Cutout Framed in Cobalt Comic Panel */}
          <div className="lg:col-span-5 relative flex flex-col justify-end">
            <div
              className="relative border-[2.5px] border-[#0A0A0A] shadow-[8px_8px_0_0_#0A0A0A] overflow-hidden min-h-[380px] sm:min-h-[450px] lg:min-h-[510px] flex flex-col justify-end transition-colors duration-300"
              style={{ backgroundColor: 'var(--field-cobalt)' }}
            >
              {/* Soft Studio Radial Backlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 50% 44%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 68%)',
                }}
              />

              {/* Monumental KUNAL display layer behind portrait */}
              <div
                ref={wordmarkRef}
                aria-hidden="true"
                className="absolute inset-x-0 top-3 flex justify-center pointer-events-none select-none transition-transform duration-150 ease-out"
              >
                <span className="font-condensed font-black text-[5.75rem] sm:text-[7.5rem] xl:text-[8.75rem] leading-[0.78] tracking-tighter text-white/25 uppercase">
                  KUNAL
                </span>
              </div>

              {/* Edinburgh Napier Graduate Cutout Portrait */}
              <div
                ref={portraitRef}
                className="relative z-10 flex justify-center items-end pt-10 pointer-events-none transition-transform duration-150 ease-out"
              >
                <img
                  src="/assets/kunal-graduate-hero.webp"
                  width={705}
                  height={934}
                  alt="Kunal in Edinburgh Napier University MSc graduation gown and blue-red hood"
                  className="h-[300px] sm:h-[375px] lg:h-[420px] w-auto object-contain object-bottom drop-shadow-[2px_0_0_rgba(255,255,255,0.85)] drop-shadow-[-2px_0_0_rgba(255,255,255,0.85)] drop-shadow-[0_-2px_0_rgba(255,255,255,0.85)] drop-shadow-[0_14px_22px_rgba(10,10,10,0.45)]"
                />
              </div>

              {/* Clean Live Focus Card */}
              <div className="relative z-20 m-3 sm:m-4 bg-white border-2 border-[#0A0A0A] shadow-[4px_4px_0_0_#0A0A0A] p-3.5 sm:p-4">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono-code text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#2B47FF]">
                    {currentNote.tag}
                  </span>
                  <span className="px-2 py-0.5 bg-[#0A0A0A] text-white font-mono-code text-[9px] sm:text-[10px] font-bold uppercase">
                    {currentNote.badge}
                  </span>
                </div>
                <p className="font-condensed font-black text-2xl sm:text-3xl uppercase text-[#0A0A0A] leading-none">
                  {currentNote.headline}
                </p>
                <p className="mt-1.5 font-body text-xs sm:text-sm text-[#4A4A52] leading-snug">
                  {currentNote.note}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Index Strip */}
        <div className="pt-3 border-t-2 border-[#0A0A0A] flex flex-wrap items-center justify-between gap-3 font-mono-code text-[11px] font-bold uppercase tracking-wider text-[#4A4A52]">
          <span>USER RESEARCH • FIGMA • PREMIERE PRO • AFTER EFFECTS</span>
          <span className="text-[#0A0A0A]">SELECTED WORKS BELOW ↓</span>
        </div>
      </div>
    </section>
  );
};
