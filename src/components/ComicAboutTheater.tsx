import React, { useState } from 'react';
import {
  Play,
  Download,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Award,
  MapPin,
} from 'lucide-react';
import {
  KUNAL_PROFILE,
  CAREER_TIMELINE,
  EDUCATION_LIST,
  EXTRACURRICULARS_AND_CERTS,
} from '../data/portfolioData';

interface ComicAboutTheaterProps {
  onOpenShowreel: () => void;
}

export const ComicAboutTheater: React.FC<ComicAboutTheaterProps> = ({
  onOpenShowreel,
}) => {
  const [reelHover, setReelHover] = useState(false);

  return (
    <section
      id="experience"
      aria-label="Experience, Education and Resume"
      className="comic-panel relative bg-white overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 space-y-12 sm:space-y-16">
        {/* Top Row: Overview Bio + 16:9 Showreel Video Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center border-b-2 border-[#0A0A0A] pb-12">
          <div className="lg:col-span-6 space-y-5">
            <span className="inline-block px-2.5 py-0.5 bg-[#0A0A0A] text-[#FFAE00] font-mono-code text-[11px] font-bold uppercase tracking-widest">
              [02] EXPERIENCE SO FAR
            </span>
            <h2 className="font-condensed font-black text-5xl sm:text-7xl lg:text-8xl uppercase leading-[0.86] text-[#0A0A0A]">
              Background &amp; Track Record
            </h2>
            <p className="font-body text-base sm:text-lg text-[#4A4A52] leading-relaxed">
              {KUNAL_PROFILE.subheading}
            </p>

            {/* 4 Verified Credential Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {KUNAL_PROFILE.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#F4F4F6] border-2 border-[#0A0A0A] shadow-[3px_3px_0_0_#0A0A0A] p-3"
                >
                  <div className="font-condensed font-black text-3xl sm:text-4xl text-[#0A0A0A] leading-none tabular-nums">
                    {stat.value}
                  </div>
                  <div className="mt-1 font-mono-code text-[10px] font-bold uppercase text-[#4A4A52] leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 6 Cols: Clean 16:9 Showreel Preview */}
          <div className="lg:col-span-6">
            <div
              onMouseEnter={() => setReelHover(true)}
              onMouseLeave={() => setReelHover(false)}
              className="relative bg-[#0A0A0A] border-[2.5px] border-[#0A0A0A] shadow-[8px_8px_0_0_#0A0A0A] overflow-hidden aspect-video"
            >
              <img
                src="/assets/poster-showreel.webp"
                alt="Kunal 16:9 video editing showreel preview frame"
                loading="lazy"
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  reelHover ? 'opacity-0' : 'opacity-100'
                }`}
              />
              {reelHover && (
                <video
                  src="/assets/kunal-preview-loop.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <button
                type="button"
                onClick={onOpenShowreel}
                aria-label="Play Showreel Video"
                className="group absolute inset-0 z-10 flex items-center justify-center bg-black/20 hover:bg-black/35 transition-colors"
              >
                <div className="btn-comic px-5 py-3 bg-[#FF4D00] text-[#0A0A0A] font-condensed font-black text-2xl uppercase tracking-wide group-hover:bg-white">
                  <Play className="w-5 h-5 fill-[#0A0A0A]" aria-hidden="true" />
                  <span>Play Showreel</span>
                </div>
              </button>
              <div className="pointer-events-none absolute top-3 left-3 z-20 px-2.5 py-1 bg-[#0A0A0A] text-white font-mono-code text-[11px] font-bold uppercase">
                SHOWREEL ARCHIVE · 16:9
              </div>
            </div>
          </div>
        </div>

        {/* Work Experience Grid (6 Authentic Roles from CV) */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-5 h-5 text-[#2B47FF]" aria-hidden="true" />
              <h3 className="font-condensed font-black text-4xl sm:text-5xl uppercase text-[#0A0A0A] leading-none">
                Work Experience
              </h3>
            </div>
            <span className="font-mono-code text-xs font-bold uppercase text-[#4A4A52]">
              2020 TO PRESENT · VIDEO, CONTENT &amp; MEDIA
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAREER_TIMELINE.map((track) => (
              <article
                key={track.id}
                className="bg-white border-[2.5px] border-[#0A0A0A] shadow-[6px_6px_0_0_#0A0A0A] p-5 sm:p-6 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 bg-[#0A0A0A] text-white font-mono-code text-[11px] font-bold uppercase tracking-wider">
                      {track.period}
                    </span>
                    <span className="font-mono-code text-[11px] font-bold uppercase text-[#4A4A52] inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#B83200]" aria-hidden="true" />
                      {track.location}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-condensed font-black text-3xl sm:text-4xl uppercase text-[#0A0A0A] leading-[0.95]">
                      {track.title}
                    </h4>
                    <div className="mt-1 font-mono-code text-xs sm:text-sm font-bold uppercase text-[#2B47FF]">
                      {track.organization}
                    </div>
                  </div>

                  <ul className="space-y-1.5 pt-1">
                    {track.highlights.map((bullet, i) => (
                      <li
                        key={i}
                        className="font-body text-sm text-[#4A4A52] leading-relaxed flex items-start gap-2"
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 shrink-0 bg-[#0A0A0A]"
                          aria-hidden="true"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Education & Live Event Credits / Certifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Education Column */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-5 h-5 text-[#2B47FF]" aria-hidden="true" />
              <h3 className="font-condensed font-black text-4xl sm:text-5xl uppercase text-[#0A0A0A] leading-none">
                Education
              </h3>
            </div>

            <div className="space-y-4">
              {EDUCATION_LIST.map((edu) => (
                <article
                  key={edu.id}
                  className="bg-[#F4F4F6] border-2 border-[#0A0A0A] shadow-[4px_4px_0_0_#0A0A0A] p-4 sm:p-5 space-y-1.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono-code text-[11px] font-bold uppercase text-[#2B47FF]">
                      {edu.period}
                    </span>
                    <span className="font-mono-code text-[11px] font-bold uppercase text-[#4A4A52]">
                      {edu.location}
                    </span>
                  </div>
                  <h4 className="font-condensed font-black text-2xl sm:text-3xl uppercase text-[#0A0A0A] leading-none">
                    {edu.degree}
                  </h4>
                  <div className="font-mono-code text-xs font-bold uppercase text-[#0A0A0A]">
                    {edu.institution}
                  </div>
                  <p className="font-body text-sm text-[#4A4A52] leading-snug pt-0.5">
                    {edu.details}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Extracurriculars & Certifications Column */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-[#B83200]" aria-hidden="true" />
              <h3 className="font-condensed font-black text-4xl sm:text-5xl uppercase text-[#0A0A0A] leading-none">
                Events &amp; Certifications
              </h3>
            </div>

            <div className="bg-white border-2 border-[#0A0A0A] shadow-[4px_4px_0_0_#0A0A0A] p-5 space-y-5">
              <div>
                <div className="font-mono-code text-xs font-bold uppercase text-[#2B47FF] mb-3">
                  Live Production &amp; Event Operations
                </div>
                <ul className="divide-y divide-[#0A0A0A]/15">
                  {EXTRACURRICULARS_AND_CERTS.events.map((ev) => (
                    <li
                      key={`${ev.title}-${ev.year}`}
                      className="py-2 flex flex-wrap items-baseline justify-between gap-2"
                    >
                      <div>
                        <span className="font-body text-sm font-bold text-[#0A0A0A]">
                          {ev.title}
                        </span>
                        <span className="font-body text-sm text-[#4A4A52]">
                          {' · '}
                          {ev.role}
                        </span>
                      </div>
                      <span className="font-mono-code text-xs font-bold text-[#0A0A0A]">
                        {ev.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t-2 border-[#0A0A0A] pt-4">
                <div className="font-mono-code text-xs font-bold uppercase text-[#B83200] mb-2.5">
                  Certifications
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {EXTRACURRICULARS_AND_CERTS.certifications.map((cert) => (
                    <div
                      key={`${cert.title}-${cert.year}`}
                      className="px-3 py-2 bg-[#F4F4F6] border border-[#0A0A0A] flex items-center justify-between gap-2"
                    >
                      <span className="font-body text-xs sm:text-sm font-semibold text-[#0A0A0A]">
                        {cert.title}
                      </span>
                      <span className="font-mono-code text-[11px] font-bold text-[#2B47FF]">
                        {cert.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Organizations & Credits Marquee */}
        <div className="border-y-2 border-[#0A0A0A] py-3 bg-[#F4F4F6] overflow-hidden">
          <div className="marquee-track flex gap-10 whitespace-nowrap w-max font-condensed font-black text-xl sm:text-2xl uppercase tracking-wide text-[#0A0A0A]">
            {[...KUNAL_PROFILE.brands, ...KUNAL_PROFILE.brands].map((brand, i) => (
              <span key={`${brand}-${i}`} className="inline-flex items-center gap-3">
                <span className="w-2 h-2 bg-[#FF4D00] border border-[#0A0A0A]" aria-hidden="true" />
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Verified Resume & Figma Prototype Download Bar */}
        <div
          id="resume"
          className="bg-[#2B47FF] text-white border-[2.5px] border-[#0A0A0A] shadow-[8px_8px_0_0_#0A0A0A] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          style={{ backgroundColor: 'var(--field-cobalt)' }}
        >
          <div className="space-y-1.5">
            <span className="inline-block px-2 py-0.5 bg-[#0A0A0A] text-[#FFAE00] font-mono-code text-[11px] font-bold uppercase">
              RESUME &amp; UX PORTFOLIO
            </span>
            <h3 className="font-condensed font-black text-4xl sm:text-5xl uppercase leading-none text-white">
              Verified Resume PDFs &amp; Figma Prototype
            </h3>
            <p className="font-body text-sm sm:text-base text-white/90">
              {KUNAL_PROFILE.currentDegree} · {KUNAL_PROFILE.location}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/assets/Kunal_Resume_Updated.pdf"
              download="Kunal_Resume_Updated.pdf"
              className="btn-comic min-h-[48px] px-5 bg-white text-[#0A0A0A] font-condensed font-black text-xl uppercase whitespace-nowrap hover:bg-[#FFAE00]"
            >
              <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Master CV (PDF)</span>
            </a>

            <a
              href="/assets/Kunal_Resume_ATS.pdf"
              download="Kunal_Resume_ATS.pdf"
              className="btn-comic min-h-[48px] px-5 bg-[#FF4D00] text-[#0A0A0A] font-condensed font-black text-xl uppercase whitespace-nowrap hover:bg-white"
            >
              <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>ATS Resume (PDF)</span>
            </a>

            <a
              href={KUNAL_PROFILE.portfolioLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-comic-light inline-flex items-center gap-2 min-h-[48px] px-5 bg-[#0A0A0A] text-white font-condensed font-black text-xl uppercase whitespace-nowrap hover:bg-white hover:text-[#0A0A0A]"
            >
              <span>Figma Prototype</span>
              <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
