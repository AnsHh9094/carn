import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface VideoShowreelModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoShowreelModal: React.FC<VideoShowreelModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(35); // simulated percent
  const [currentTime, setCurrentTime] = useState("00:08:14");

  // Progress ticker: only advances when modal is open AND actively playing
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 250);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  // Accessibility: Escape key listener + body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl animate-fade-in"
    >
      {/* Modal Container (Stops propagation so clicking inside doesn't dismiss) */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-studio-900 border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
      >
        
        {/* NLE Window Header Bar */}
        <div className="px-5 py-3.5 bg-studio-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
            </div>
            <span className="text-xs font-mono-code text-studio-400 tracking-wider">
              PROGRAM MONITOR // {project.title.toUpperCase()}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
            aria-label="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Stage */}
        <div className="relative bg-black aspect-video flex items-center justify-center overflow-hidden">
          
          {/* Simulated Video Preview with Ambient Glow */}
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover filter brightness-90 contrast-105"
          />

          {/* Timecode overlay in video */}
          <div className="absolute top-4 left-4 font-mono-code text-xs bg-black/70 px-2.5 py-1 rounded border border-white/10 text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>PLAYING: {currentTime}</span>
          </div>

          <div className="absolute top-4 right-4 font-mono-code text-xs bg-black/70 px-2.5 py-1 rounded border border-white/10 text-accent-orange">
            {project.category}
          </div>

          {/* Center Play/Pause Overlay Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/60 hover:bg-accent-orange/90 text-white hover:text-black flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-2xl"
          >
            {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 fill-current ml-1" />}
          </button>

          {/* Bottom Video Controls / Scrub Bar */}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
            {/* Timeline Scrubber */}
            <div 
              className="relative w-full h-2 bg-white/20 hover:h-3 rounded-full cursor-pointer transition-all mb-3"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                setProgress(Math.round((clickX / rect.width) * 100));
              }}
            >
              <div 
                className="h-full bg-accent-orange rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md border border-accent-orange" />
              </div>
            </div>

            {/* Controller Buttons */}
            <div className="flex items-center justify-between text-xs font-mono-code text-white">
              <div className="flex items-center gap-4">
                <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-accent-orange">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button onClick={() => setProgress(0)} className="hover:text-accent-orange">
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button onClick={() => setIsMuted(!isMuted)} className="hover:text-accent-orange">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-studio-400">00:00:{String(Math.floor(progress * 0.3)).padStart(2, '0')}:12 / 00:00:30:00</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-white/10 text-[10px]">4K UHD 60FPS</span>
                <Maximize2 className="w-4 h-4 hover:text-accent-orange cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Project Meta Details Drawer */}
        <div className="p-6 bg-studio-900 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code bg-accent-orange/20 text-accent-orange border border-accent-orange/30">
                  {project.client}
                </span>
                <span className="text-xs font-mono-code text-studio-400">{project.year}</span>
              </div>
              <h2 className="font-syne font-black text-xl text-white">{project.title}</h2>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono-code text-studio-400 block">KEY PERFORMANCE</span>
              <span className="font-mono-code font-bold text-sm text-green-400">{project.metrics}</span>
            </div>
          </div>

          <p className="text-sm text-studio-200 leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono-code text-studio-400 mr-2">TECH STACK:</span>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-xs font-mono-code bg-white/5 border border-white/10 text-studio-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
