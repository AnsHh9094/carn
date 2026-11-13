import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface FramerVideoModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

/** Resolve a YouTube / Vimeo watch link into an embeddable player URL. */
const getEmbedUrl = (url: string): string | null => {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');

    // YouTube: youtu.be/ID, youtube.com/watch?v=ID, /embed/ID, /shorts/ID, /live/ID
    if (host === 'youtu.be') {
      const id = parsed.pathname.split('/').filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1` : null;
    }
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      const id = parsed.searchParams.get('v') ??
        parsed.pathname.match(/\/(?:embed|shorts|live)\/([^/?#]+)/)?.[1];
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1` : null;
    }

    // Vimeo: vimeo.com/ID, player.vimeo.com/video/ID, vimeo.com/channels/x/ID
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const id = parsed.pathname.match(/(\d{6,})/)?.[1];
      return id ? `https://player.vimeo.com/video/${id}?autoplay=1` : null;
    }
  } catch {
    return null;
  }

  return null;
};

export const FramerVideoModal: React.FC<FramerVideoModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setIsPlaying(true);
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

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration || 0);
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = percent * duration;
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    const f = Math.floor((secs % 1) * 24);
    return `00:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(f).padStart(2, '0')}`;
  };

  if (!isOpen || !project) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const embedUrl = getEmbedUrl(project.videoUrl);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-[#090909] border border-white/20 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-zinc-950 border-b border-white/10 flex items-center justify-between text-xs font-mono-code text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-red-500 animate-pulse" />
            <span className="text-white font-matrix font-bold tracking-wider">{project.title.toUpperCase()}</span>
            <span>/</span>
            <span className="text-orange-400">{project.category}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.clientUrl && (
              <a
                href={project.clientUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 border border-orange-500/40 text-orange-400 hover:text-white hover:border-white/40 uppercase flex items-center gap-1.5 transition-colors"
              >
                <span>VIEW LIVE PROJECT</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="p-1.5 border border-white/10 hover:border-white/30 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Canvas */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={project.title}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <>
              <video
                ref={videoRef}
                src={project.videoUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-full object-cover"
              />

              {/* Timecode overlay */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono-code text-white">
                TC {formatTime(currentTime)}
              </div>

              {/* Center Play Overlay */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-20 h-20 bg-orange-500 text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                >
                  <Play className="w-8 h-8 fill-black ml-1" />
                </button>
              )}

              {/* Scrubber & Controls */}
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
                {/* Scrubber bar */}
                <div
                  onClick={handleScrub}
                  className="relative w-full h-2 bg-white/20 hover:h-3 cursor-pointer transition-all mb-3"
                >
                  <div
                    className="h-full bg-orange-500 relative"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white shadow-md" />
                  </div>
                </div>

                {/* Controls Bar */}
                <div className="flex items-center justify-between text-xs font-mono-code text-white">
                  <div className="flex items-center gap-4">
                    <button onClick={togglePlay} className="hover:text-orange-400 transition-colors">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    <button onClick={toggleMute} className="hover:text-orange-400 transition-colors">
                      {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <span className="text-zinc-400 text-[11px]">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-zinc-400 text-[11px]">
                    <span>24.00 FPS SMPTE</span>
                    <span className="text-orange-400 font-bold">{project.metrics}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Metadata Slate */}
        <div className="p-6 bg-zinc-950 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono-code">
          <div>
            <span className="text-zinc-500 uppercase block mb-1">CLIENT & SCOPE</span>
            <span className="text-white font-bold">{project.client}</span>
            <p className="text-zinc-400 mt-0.5">{project.role}</p>
          </div>

          <div>
            <span className="text-zinc-500 uppercase block mb-1">RETENTION UPLIFT</span>
            <span className="text-orange-400 font-bold">{project.metrics}</span>
            <p className="text-zinc-400 mt-0.5">Audience watch time vs. channel average</p>
          </div>

          <div>
            <span className="text-zinc-500 uppercase block mb-1">PRODUCTION TIMELINE</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {project.tags.map((t, i) => (
                <span key={i} className="px-2 py-0.5 border border-white/10 text-[10px] text-zinc-300 uppercase">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};