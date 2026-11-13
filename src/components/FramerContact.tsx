import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Download, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { KUNAL_PROFILE } from '../data/portfolioData';

interface FramerContactProps {
  preselectedPackage?: string;
}

export const FramerContact: React.FC<FramerContactProps> = ({ preselectedPackage }) => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    packageType: preselectedPackage || 'First Take ($1,500)'
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(KUNAL_PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF5E1E', '#ffffff', '#FFB800']
    });
    setFormSubmitted(true);

    const subject = encodeURIComponent(`Project Commission [${formData.packageType}] - ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Kunal,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPackage: ${formData.packageType}\n\nProject Scope & Timeline:\n${formData.message}\n\n--- Sent from Kunal Portfolio Terminal ---`
    );
    window.location.href = `mailto:${KUNAL_PROFILE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="w-full py-24 bg-[#090909] text-white border-b border-white/[0.08]">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Header */}
        <div className="pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono-code text-orange-400 uppercase tracking-widest flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>DIRECT INQUIRIES // CONTACT</span>
            </div>
            <h2 className="font-matrix font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              GOT A VISION? <br />
              LET'S SHAPE IT.
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-sans">
            Bookings open for commercial post-production, creator YouTube retainers, and UX interaction design consultations.
          </p>
        </div>

        {/* 2-Column Architectural Terminal (No Floating Boxes) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08] border-b border-white/[0.08]">
          
          {/* Left Column: Direct Coordinates & CV Downloads (5 of 12 cols) */}
          <div className="py-12 lg:py-16 lg:pr-12 lg:col-span-5 space-y-8">
            
            {/* Email Terminal */}
            <div>
              <span className="text-xs font-mono-code text-zinc-500 uppercase tracking-widest block mb-2">
                [01] DIRECT PRIMARY INBOX
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 pb-4 border-b border-white/[0.08]">
                <a
                  href={`mailto:${KUNAL_PROFILE.email}`}
                  className="font-matrix font-bold text-xl sm:text-2xl text-white hover:text-orange-400 transition-colors break-all"
                >
                  {KUNAL_PROFILE.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 border border-white/15 hover:border-white/40 text-xs font-mono-code text-zinc-300 hover:text-white uppercase transition-all shrink-0 flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>

            {/* Telephone & Location Terminal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <span className="text-xs font-mono-code text-zinc-500 uppercase tracking-widest block mb-1">
                  [02] DIRECT PHONE
                </span>
                <a
                  href={`tel:${KUNAL_PROFILE.phone}`}
                  className="font-matrix font-bold text-lg text-white hover:text-orange-400 transition-colors"
                >
                  {KUNAL_PROFILE.phone}
                </a>
              </div>

              <div>
                <span className="text-xs font-mono-code text-zinc-500 uppercase tracking-widest block mb-1">
                  [03] BASE LOCATION
                </span>
                <p className="font-matrix font-bold text-lg text-white">
                  EDINBURGH, SCOTLAND
                </p>
                <p className="text-[11px] font-mono-code text-zinc-500">55.9533° N, 3.1883° W</p>
              </div>
            </div>

            {/* Academic Credential Slate */}
            <div className="pt-6 border-t border-white/[0.08] space-y-2">
              <span className="text-xs font-mono-code text-orange-400 uppercase tracking-wider block">
                [ACADEMIC & INDUSTRY CREDENTIALS]
              </span>
              <p className="font-franie font-bold text-sm text-white uppercase">
                MSc User Experience Design · Edinburgh Napier University
              </p>
              <p className="text-xs font-mono-code text-zinc-400">
                Sun n Sky Entertainment (Senior Video Post-Production, 4+ Years)
              </p>
            </div>

            {/* Direct Response Protocol & Link to Verified Resume */}
            <div className="pt-6 border-t border-white/[0.08] space-y-3">
              <span className="text-xs font-mono-code text-zinc-500 uppercase tracking-widest block mb-2">
                [04] PRODUCTION SLA & VERIFIED RESUME
              </span>
              <div className="p-4 bg-zinc-950 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-code text-orange-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span>GUARANTEED 24-HOUR RESPONSE WINDOW</span>
                </div>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Every inquiry receives an editorial feasibility assessment, timeline schedule, and commercial estimate.
                </p>
                <div className="pt-2">
                  <a
                    href="#resume"
                    className="inline-flex items-center gap-1.5 text-xs font-mono-code text-white hover:text-orange-400 transition-colors uppercase tracking-wider"
                  >
                    <span>View Full CV & ATS Resumes Above</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Project Commission Form (7 of 12 cols) */}
          <div className="py-12 lg:py-16 lg:pl-12 lg:col-span-7">
            {formSubmitted ? (
              <div className="p-8 border border-orange-500/30 bg-orange-500/5 text-center space-y-4">
                <h3 className="font-matrix font-black text-2xl text-white uppercase">
                  INQUIRY LOGGED INTO TIMELINE.
                </h3>
                <p className="text-xs font-mono-code text-zinc-400 max-w-md mx-auto">
                  Thank you! Your project parameters have been received. Kunal will review your inquiry and reply within 24 hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 bg-white text-black font-matrix font-bold text-xs uppercase tracking-wider hover:bg-orange-500 transition-colors"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-2">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Henderson"
                      className="w-full px-4 py-3.5 bg-zinc-950 border border-white/10 focus:border-orange-500 outline-none text-white text-sm font-sans transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@studio.com"
                      className="w-full px-4 py-3.5 bg-zinc-950 border border-white/10 focus:border-orange-500 outline-none text-white text-sm font-sans transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-2">
                    PROJECT SCOPE / PACKAGE
                  </label>
                  <select
                    value={formData.packageType}
                    onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                    className="w-full px-4 py-3.5 bg-zinc-950 border border-white/10 focus:border-orange-500 outline-none text-white text-sm font-mono-code transition-colors"
                  >
                    <option value="First Take ($1,500)">First Take / Single Cut ($1,500)</option>
                    <option value="Director's Cut ($3,200/mo)">Director's Cut / Monthly Retainer ($3,200/mo)</option>
                    <option value="Custom Commercial Campaign">Custom Commercial Campaign</option>
                    <option value="UX Design Consultation">Postgraduate UX Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-2">
                    PROJECT PARAMETERS & FOOTAGE DETAILS *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the raw footage, turnaround deadline, intended audience, and any reference styles..."
                    className="w-full px-4 py-3.5 bg-zinc-950 border border-white/10 focus:border-orange-500 outline-none text-white text-sm font-sans transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white text-black font-matrix font-bold text-xs uppercase tracking-wider hover:bg-orange-500 transition-colors flex items-center justify-center gap-2"
                >
                  <span>SUBMIT PROJECT BRIEF</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};