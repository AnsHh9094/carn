import React from 'react';
import { Download, ExternalLink, FileText, CheckCircle2, GraduationCap, Briefcase, Award } from 'lucide-react';
import { KUNAL_PROFILE } from '../data/portfolioData';

export const FramerResume: React.FC = () => {
  return (
    <section id="resume" className="w-full py-24 bg-[#090909] text-white border-b border-white/[0.08]">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Header */}
        <div className="pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono-code text-orange-400 uppercase tracking-widest flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>OFFICIAL VERIFICATION // CURRICULUM VITAE</span>
            </div>
            <h2 className="font-franie font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              CURRICULUM VITAE <br />
              & CREDENTIALS.
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-sans">
            Direct access to verified editorial history, post-production experience, and MSc User Experience Design academic records.
          </p>
        </div>

        {/* 2 Dedicated Architectural Resume Cards (Decoupled from Contact Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08] border-b border-white/[0.08]">
          
          {/* Card 1: Master Editorial CV */}
          <div className="py-12 lg:py-16 lg:pr-12 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-orange-400 font-bold uppercase tracking-wider">
                [FORMAT 01 // COMPREHENSIVE PORTFOLIO]
              </span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] font-mono-code text-zinc-400">
                OCTOBER 2024 (PDF)
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-franie font-bold text-2xl sm:text-3xl text-white uppercase">
                Master Editorial CV
              </h3>
              <p className="text-xs text-zinc-400 font-mono-code">
                Full 4+ year editorial history at Sun n Sky Entertainment, YouTube scale achievements (25M+ views), and complete client portfolio index.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/[0.08]">
              <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>Full production breakdown across 350+ finished videos and brand commercials.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>Verified technical stack: Premiere Pro, DaVinci Resolve, After Effects, and audio Foley.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>Includes direct links to live projects, client testimonials, and studio credentials.</span>
              </div>
            </div>

            {/* Actions: View in New Tab + Direct Download */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <a
                href="/assets/Kunal_Resume_Updated.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white text-black font-franie font-bold text-xs uppercase tracking-wider hover:bg-orange-500 hover:text-black transition-all flex items-center gap-2"
              >
                <span>VIEW CV IN BROWSER</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="/assets/Kunal_Resume_Updated.pdf"
                download="Kunal_Resume_Updated.pdf"
                className="px-6 py-3.5 bg-zinc-900 border border-white/15 hover:border-orange-500 text-white font-franie font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-orange-400" />
                <span>DOWNLOAD PDF</span>
              </a>
            </div>
          </div>

          {/* Card 2: ATS-Compliant Technical Resume */}
          <div className="py-12 lg:py-16 lg:pl-12 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-orange-400 font-bold uppercase tracking-wider">
                [FORMAT 02 // RECRUITER & ATS OPTIMIZED]
              </span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] font-mono-code text-zinc-400">
                1-PAGE MACHINE-READABLE
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-franie font-bold text-2xl sm:text-3xl text-white uppercase">
                ATS-Optimized Resume
              </h3>
              <p className="text-xs text-zinc-400 font-mono-code">
                Clean single-column standard format engineered for applicant tracking systems, corporate talent pipelines, and agency HR reviews.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/[0.08]">
              <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>MSc User Experience Design academic focus at Edinburgh Napier University (2025).</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>Indexed skill taxonomies: UX Research, Figma, Usability Testing, Attention Architecture.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>High-density layout tailored for automated scanning and fast recruiter screening.</span>
              </div>
            </div>

            {/* Actions: View in New Tab + Direct Download */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <a
                href="/assets/Kunal_Resume_ATS.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white text-black font-franie font-bold text-xs uppercase tracking-wider hover:border-orange-500 hover:text-black transition-all flex items-center gap-2"
              >
                <span>VIEW ATS RESUME</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="/assets/Kunal_Resume_ATS.pdf"
                download="Kunal_Resume_ATS.pdf"
                className="px-6 py-3.5 bg-zinc-900 border border-white/15 hover:border-orange-500 text-white font-franie font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-orange-400" />
                <span>DOWNLOAD ATS PDF</span>
              </a>
            </div>
          </div>

        </div>

        {/* Quick Verification Meta Bar */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono-code text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-zinc-300">STATUS: AVAILABLE FOR COMMERCIAL & AGENCY CONTRACTS (2026)</span>
          </div>
          <div>
            <span>DIRECT INQUIRIES: {KUNAL_PROFILE.email}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
