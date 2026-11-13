import React, { useState } from 'react';
import { Phone, MapPin, Copy, Check, Download, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { KUNAL_PROFILE } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', projectType: 'Commercial Video' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(KUNAL_PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FF5E1E', '#00F0FF', '#ffffff']
    });
    setFormSubmitted(true);
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', message: '', projectType: 'Commercial Video' });
    setFormSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-accent-orange animate-ping"></span>
          <span className="font-mono-code text-xs text-accent-orange tracking-widest uppercase">
            COMMISSION & COLLABORATE // 2026 BOOKINGS
          </span>
        </div>
        <h2 className="font-syne font-black text-3xl md:text-6xl tracking-tight text-white uppercase">
          LET'S CREATE VISUAL IMPACT
        </h2>
        <p className="mt-2 text-sm text-studio-400 max-w-xl">
          Available for commercial edits, YouTube channel growth retaining, UX consulting, and freelance post-production.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Direct Contact Info & CV Downloads */}
        <div className="space-y-6">
          
          {/* Email Quick Action Card */}
          <div className="p-6 md:p-8 rounded-2xl bg-studio-900 border border-white/10 hover:border-accent-orange/40 transition-all shadow-xl">
            <span className="text-xs font-mono-code text-studio-400 uppercase tracking-widest block mb-2">
              PRIMARY DIRECT INBOX
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <a
                href={`mailto:${KUNAL_PROFILE.email}`}
                className="font-syne font-black text-xl md:text-2xl text-white hover:text-accent-orange transition-colors break-all"
              >
                {KUNAL_PROFILE.email}
              </a>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black font-mono-code text-xs uppercase transition-all flex-shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'COPIED!' : 'COPY EMAIL'}</span>
              </button>
            </div>
          </div>

          {/* Phone & Location Bento Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-studio-900 border border-white/10 space-y-2">
              <Phone className="w-5 h-5 text-accent-orange" />
              <span className="text-[10px] font-mono-code text-studio-400 uppercase tracking-wider block">DIRECT CALL</span>
              <a href={`tel:${KUNAL_PROFILE.phone}`} className="font-mono-code font-bold text-sm text-white hover:text-accent-orange block">
                {KUNAL_PROFILE.phone}
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-studio-900 border border-white/10 space-y-2">
              <MapPin className="w-5 h-5 text-accent-cyan" />
              <span className="text-[10px] font-mono-code text-studio-400 uppercase tracking-wider block">BASE OF OPERATIONS</span>
              <span className="font-mono-code font-bold text-sm text-white block">
                Edinburgh, Scotland, UK
              </span>
            </div>
          </div>

          {/* Resume Downloads Bento Card */}
          <div className="p-6 md:p-8 rounded-2xl bg-studio-900 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-syne font-bold text-lg text-white">Curriculum Vitae</h3>
                <p className="text-xs text-studio-400 font-mono-code">Select your preferred CV format</p>
              </div>
              <Download className="w-5 h-5 text-accent-orange" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href="/assets/Kunal_Resume_ATS.pdf"
                download="Kunal_Resume_ATS.pdf"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 transition-all font-mono-code text-xs font-semibold"
              >
                <span>ATS-FRIENDLY PDF</span>
                <Download className="w-4 h-4" />
              </a>

              <a
                href="/assets/Kunal_Resume_Updated.pdf"
                download="Kunal_Resume_Updated.pdf"
                className="flex items-center justify-between p-3.5 rounded-xl bg-accent-orange/10 hover:bg-accent-orange text-accent-orange hover:text-black border border-accent-orange/30 transition-all font-mono-code text-xs font-semibold"
              >
                <span>MASTER RESUME 2026</span>
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Briefing / Inquiry Form */}
        <div className="p-6 md:p-8 rounded-2xl bg-studio-900/90 border border-white/10 shadow-2xl">
          <h3 className="font-syne font-bold text-xl text-white mb-1">Send a Project Brief</h3>
          <p className="text-xs text-studio-400 mb-6 font-mono-code">Guaranteed response within 24 hours.</p>

          {formSubmitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-syne font-bold text-xl text-white">Inquiry Received</h4>
              <p className="text-xs text-studio-300 max-w-sm mx-auto">
                Thank you! Kunal will review your project brief and reply directly via email.
              </p>
              <button
                onClick={handleResetForm}
                className="mt-4 px-4 py-2 rounded-lg bg-white/10 text-xs font-mono-code text-white hover:bg-white/20 transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono-code text-studio-400 uppercase mb-1.5">
                  Your Name / Agency
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Vance, Studio Apex"
                  className="w-full px-4 py-3 rounded-xl bg-studio-950 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-orange font-mono-code"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-code text-studio-400 uppercase mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@studioapex.com"
                  className="w-full px-4 py-3 rounded-xl bg-studio-950 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-orange font-mono-code"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-code text-studio-400 uppercase mb-1.5">
                  Project Type
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-studio-950 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-orange font-mono-code"
                >
                  <option value="Commercial Video">Commercial / Brand Video</option>
                  <option value="YouTube Retainer">YouTube Channel Retention Retainer</option>
                  <option value="Sports Action">Sports & Action Highlights</option>
                  <option value="UX Design">UX Research & Interaction Prototyping</option>
                  <option value="Other">Other Collaboration</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono-code text-studio-400 uppercase mb-1.5">
                  Project Brief & Timeline
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell Kunal about the project goals, raw footage volume, and expected delivery date..."
                  className="w-full px-4 py-3 rounded-xl bg-studio-950 border border-white/10 text-white text-sm focus:outline-none focus:border-accent-orange font-mono-code resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-accent-orange hover:bg-orange-600 text-black font-syne font-bold text-xs tracking-widest uppercase transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
              >
                <span>TRANSMIT BRIEF</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
