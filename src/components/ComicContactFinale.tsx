import React, { useEffect, useRef, useState } from 'react';
import { Send, Copy, Check, Mail, MapPin, ArrowUp, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { KUNAL_PROFILE } from '../data/portfolioData';
import { prefersReducedMotion } from '../engine';

interface ComicContactFinaleProps {
  preselectedPackage: string;
  onScrollTop: () => void;
}

const INQUIRY_TRACKS = [
  'UX & Interaction Design',
  'Video Editing (Short & Long-Form)',
  'Motion Graphics, Color & Sound',
  'Full-Time / Contract Role',
];

/**
 * Interactive Audio Waveform Responder in the Contact section.
 */
const WaveformResponder: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bars = 42;
    const heights = new Float32Array(bars).fill(0.28);
    const velocities = new Float32Array(bars).fill(0);
    let pointerX = -1;
    let pointerActive = false;
    let rafId = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const drawFrame = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const gap = w / bars;
      for (let i = 0; i < bars; i++) {
        const bx = i * gap + gap * 0.5;
        const target =
          pointerActive && !prefersReducedMotion()
            ? Math.max(0.22, 1.0 - Math.min(1, Math.abs(pointerX - bx) / (w * 0.16)) * 0.85)
            : 0.28 + Math.sin(i * 0.45) * 0.12;

        const force = (target - heights[i]) * 0.18;
        velocities[i] = (velocities[i] + force) * 0.78;
        heights[i] += velocities[i];

        const barH = Math.max(6, heights[i] * (h - 14));
        const x = i * gap + gap * 0.22;
        const barW = Math.max(3, gap * 0.56);
        const y = (h - barH) * 0.5;

        ctx.fillStyle = '#0A0A0A';
        ctx.fillRect(x, y, barW, barH);
      }

      rafId = requestAnimationFrame(drawFrame);
    };

    rafId = requestAnimationFrame(drawFrame);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerActive = true;
    };
    const onLeave = () => {
      pointerActive = false;
    };

    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="bg-white border-2 border-[#0A0A0A] shadow-[4px_4px_0_0_#0A0A0A] p-3">
      <div className="flex items-center justify-between mb-1.5 font-mono-code text-[10px] font-bold uppercase text-[#0A0A0A]">
        <span>INTERACTIVE AUDIO WAVEFORM</span>
        <span className="text-[#4A4A52]">MOVE CURSOR OVER BARS</span>
      </div>
      <canvas
        ref={canvasRef}
        aria-label="Interactive audio waveform bars"
        className="w-full h-16 block cursor-crosshair"
      />
    </div>
  );
};

export const ComicContactFinale: React.FC<ComicContactFinaleProps> = ({
  preselectedPackage,
  onScrollTop,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    packageType: preselectedPackage || INQUIRY_TRACKS[0],
    message: '',
  });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedPackage) {
      const matched =
        INQUIRY_TRACKS.find((opt) =>
          opt.toLowerCase().includes(preselectedPackage.toLowerCase().slice(0, 8))
        ) || INQUIRY_TRACKS[0];
      setFormData((prev) => ({ ...prev, packageType: matched }));
    }
  }, [preselectedPackage]);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(KUNAL_PROFILE.email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prefersReducedMotion()) {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#0A0A0A', '#FFFFFF', '#FFAE00', '#2B47FF'],
      });
    }
    setSubmitted(true);
    const subject = encodeURIComponent(
      `Inquiry [${formData.packageType}] - ${formData.name}`
    );
    const body = encodeURIComponent(
      `Hi Kunal,\n\nName: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.packageType}\n\nMessage:\n${formData.message}\n\n--- Sent from Kunal Portfolio ---`
    );
    window.location.href = `mailto:${KUNAL_PROFILE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <section
        id="contact"
        aria-label="Get in Touch"
        className="comic-panel relative text-[#0A0A0A] transition-colors duration-300"
        style={{ backgroundColor: 'var(--field-orange)' }}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 space-y-10">
          <WaveformResponder />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 5 Cols: Clean Headline + Direct Contact Coordinates */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="inline-block px-2.5 py-0.5 bg-[#0A0A0A] text-white font-mono-code text-[11px] font-bold uppercase tracking-widest mb-3">
                  [04] GET IN TOUCH
                </span>
                <h2 className="font-condensed font-black text-6xl sm:text-8xl uppercase leading-[0.84] text-[#0A0A0A]">
                  Let&apos;s Work Together
                </h2>
              </div>

              <p className="font-body text-base sm:text-lg font-medium text-[#0A0A0A] leading-relaxed">
                Open to UX design roles, video editing projects, and content production collaborations across the UK and remote teams.
              </p>

              {/* Direct Inbox Box */}
              <div className="bg-white border-[2.5px] border-[#0A0A0A] shadow-[6px_6px_0_0_#0A0A0A] p-4 sm:p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#0A0A0A]/15 pb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <Mail className="w-4 h-4 shrink-0 text-[#0A0A0A]" aria-hidden="true" />
                    <a
                      href={`mailto:${KUNAL_PROFILE.email}`}
                      className="font-condensed font-black text-2xl sm:text-3xl text-[#0A0A0A] hover:text-[#2B47FF] truncate"
                    >
                      {KUNAL_PROFILE.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="btn-comic min-h-[40px] px-3 bg-[#F4F4F6] text-[#0A0A0A] font-mono-code text-xs font-bold uppercase"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-body">
                  <div className="flex items-center gap-2 font-bold text-[#4A4A52] min-h-[40px]">
                    <MapPin className="w-4 h-4 shrink-0 text-[#0A0A0A]" aria-hidden="true" />
                    <span>{KUNAL_PROFILE.location}</span>
                  </div>
                  <a
                    href={KUNAL_PROFILE.portfolioLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-comic min-h-[40px] px-3 bg-[#F4F4F6] font-mono-code text-[11px] font-bold uppercase text-[#0A0A0A] hover:bg-[#2B47FF] hover:text-white"
                  >
                    <span>Figma Prototype</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Contact Message Form */}
            <div className="lg:col-span-7 bg-white border-[2.5px] border-[#0A0A0A] shadow-[8px_8px_0_0_#0A0A0A] p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block space-y-1.5">
                    <span className="font-mono-code text-xs font-bold uppercase text-[#0A0A0A]">
                      Your Name
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Name / Team"
                      className="w-full min-h-[48px] px-3.5 bg-[#F8F8FA] border-2 border-[#0A0A0A] font-body text-sm text-[#0A0A0A]"
                    />
                  </label>

                  <label className="block space-y-1.5">
                    <span className="font-mono-code text-xs font-bold uppercase text-[#0A0A0A]">
                      Return Email
                    </span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full min-h-[48px] px-3.5 bg-[#F8F8FA] border-2 border-[#0A0A0A] font-body text-sm text-[#0A0A0A]"
                    />
                  </label>
                </div>

                <label className="block space-y-1.5">
                  <span className="font-mono-code text-xs font-bold uppercase text-[#0A0A0A]">
                    Topic
                  </span>
                  <select
                    value={formData.packageType}
                    onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                    className="w-full min-h-[48px] px-3.5 bg-[#F8F8FA] border-2 border-[#0A0A0A] font-body text-sm font-semibold text-[#0A0A0A]"
                  >
                    {INQUIRY_TRACKS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block space-y-1.5">
                  <span className="font-mono-code text-xs font-bold uppercase text-[#0A0A0A]">
                    Message &amp; Details
                  </span>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share role details, project scope, or timeline..."
                    className="w-full p-3.5 bg-[#F8F8FA] border-2 border-[#0A0A0A] font-body text-sm text-[#0A0A0A]"
                  />
                </label>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <button
                    type="submit"
                    className="btn-comic min-h-[52px] px-7 bg-[#0A0A0A] text-white font-condensed font-black text-2xl uppercase tracking-wide hover:bg-[#2B47FF]"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>{submitted ? 'Mail App Opened · Send' : 'Send Message'}</span>
                  </button>

                  {submitted && (
                    <span className="font-mono-code text-xs font-bold text-[#2B47FF]">
                      Ready in your mail client.
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Portfolio Footer */}
      <footer className="bg-[#0A0A0A] text-white px-5 sm:px-8 lg:px-12 py-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-comic text-2xl tracking-tight text-white">KUNAL</div>
            <p className="font-mono-code text-[11px] uppercase tracking-wider text-zinc-400">
              &copy; 2026 KUNAL · EDINBURGH, UNITED KINGDOM
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono-code text-[10px] uppercase text-zinc-400">
              {KUNAL_PROFILE.tagline}
            </span>
            <button
              type="button"
              onClick={onScrollTop}
              className="btn-comic-light min-h-[44px] px-4 bg-[#141418] text-white font-condensed font-black text-lg uppercase inline-flex items-center gap-2 hover:bg-[#FF4D00] hover:text-[#0A0A0A] transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};
