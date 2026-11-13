import React, { useState, useRef, useEffect } from 'react';
import { Play, ArrowUpRight, Film, Clock, Sparkles, ExternalLink, Volume2, VolumeX } from 'lucide-react';
import { FEATURED_PROJECTS, ProjectItem } from '../data/portfolioData';

// Viewport-aware video component to eliminate decoder saturation and scroll stutter
const formatSMPTE = (seconds: number) => {
  const safe = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = Math.floor(safe % 60);
  const frames = Math.floor((safe - Math.floor(safe)) * 24);
  const pad = (value: number) => value.toString().padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(frames)}`;
};

const ProjectVideoItem: React.FC<{ videoUrl: string; poster?: string }> = ({ videoUrl, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);
  const [cursorX, setCursorX] = useState(0);
  const [timecode, setTimecode] = useState('00:00:00:00');
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const clamped = Math.min(1, Math.max(0, pct));
    setCursorX(clamped * 100);
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = videoRef.current.duration * clamped;
      setTimecode(formatSMPTE(videoRef.current.currentTime));
    }
  };

  const handleMouseEnter = () => {
    setHovering(true);
    videoRef.current?.pause();
  };

  const handleMouseLeave = () => {
    setHovering(false);
    videoRef.current?.play().catch(() => {});
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isMuted;
    setIsMuted(next);
    if (videoRef.current) {
      videoRef.current.muted = next;
    }
  };

  return (
    <div
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={poster}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 gpu-layer"
      />

      {/* Sound On / Off Control */}
      <button
        onClick={toggleAudio}
        className="absolute bottom-3 right-3 z-30 px-2.5 py-1 bg-black/85 hover:bg-orange-500 hover:text-black border border-white/15 text-white transition-all text-[10px] font-mono-code flex items-center gap-1.5 backdrop-blur-md"
        title={isMuted ? "Unmute Audio" : "Mute Audio"}
      >
        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-orange-400 group-hover:text-black" />}
        <span className="hidden sm:inline uppercase">{isMuted ? "AUDIO OFF" : "AUDIO ON"}</span>
      </button>

      {hovering && (
        <>
          <div
            className="absolute top-0 bottom-0 w-px bg-orange-500 pointer-events-none shadow-[0_0_8px_rgba(255,94,30,0.8)]"
            style={{ left: `${cursorX}%` }}
          />
          <div
            className="absolute top-3 px-2 py-1 bg-black/85 backdrop-blur-md border border-orange-500/40 text-[10px] font-mono-code text-orange-400 whitespace-nowrap pointer-events-none"
            style={{ left: `${Math.min(cursorX, 78)}%` }}
          >
            SCRUB: {timecode} // 24 FPS
          </div>
        </>
      )}
    </div>
  );
};

interface FramerProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const FramerProjects: React.FC<FramerProjectsProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Commercial', 'Creators', 'Sports', 'UX & Motion'];

  const filtered = FEATURED_PROJECTS.filter((p) => {
    if (filter === 'All') return true;
    return p.category.toLowerCase().includes(filter.toLowerCase()) || filter.toLowerCase().includes(p.category.toLowerCase());
  });

  return (
    <section id="works" className="w-full py-24 bg-[#090909] text-white border-b border-white/[0.08]">
      
      {/* Top Header Rail */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.08]">
        <div>
          <div className="text-xs font-mono-code text-orange-400 uppercase tracking-widest flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span>SELECTED WORKS // ARCHITECTURAL RELEASES</span>
          </div>
          <h2 className="font-matrix font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
            PROJECTS WE'RE <br />
            PROUD OF.
          </h2>
        </div>

        {/* Minimalist Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 border border-white/10 p-1 bg-zinc-950 font-mono-code text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 uppercase transition-all tracking-wider ${
                filter === cat
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Architectural Rows (No Floating Boxes - Clean Edge-to-Edge Planes) */}
      <div className="w-full max-w-[1600px] mx-auto divide-y divide-white/[0.08]">
        {filtered.map((project, idx) => {
          const projectNum = String(idx + 1).padStart(2, '0');
          return (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer px-6 sm:px-10 lg:px-14 py-16 hover:bg-white/[0.015] transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                
                {/* Visual Widescreen Video Frame (7 of 12 columns) */}
                <div className="lg:col-span-7 relative aspect-video bg-black overflow-hidden border border-white/10 group-hover:border-white/30 transition-all duration-500">
                  <ProjectVideoItem
                    videoUrl={project.videoUrl}
                    poster={project.thumbnailUrl}
                  />

                  {/* Subtle Gradient & SMPTE Badges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono-code text-white">
                    {project.year} // 24 FPS
                  </div>

                  <div className="absolute top-4 right-4 px-3 py-1 bg-orange-500/20 border border-orange-500/40 text-[11px] font-mono-code text-orange-400 font-bold">
                    {project.metrics}
                  </div>

                  {/* Play Prompt Indicator */}
                  <div className="absolute inset-0 m-auto w-16 h-16 bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 shadow-2xl">
                    <Play className="w-6 h-6 fill-black ml-1" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono-code text-zinc-400">
                    <span>{project.subtitle}</span>
                    <span className="text-white group-hover:text-orange-400 transition-colors">CLICK TO EXPAND INSPECTOR</span>
                  </div>
                </div>

                {/* Technical Metadata & Title Rail (5 of 12 columns) */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Index & Category Header with Film Runtime */}
                    <div className="flex items-center justify-between text-xs font-mono-code text-zinc-500 pb-3 border-b border-white/[0.08]">
                      <div className="flex items-center gap-2.5">
                        <span className="text-orange-400 font-bold">[{projectNum} / {String(filtered.length).padStart(2, '0')}]</span>
                        <span className="uppercase tracking-wider">{project.category}</span>
                      </div>
                      {project.duration && (
                        <div className="px-2.5 py-0.5 bg-zinc-950 border border-white/10 text-[11px] font-mono-code text-zinc-300 flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-orange-500 rounded-full" />
                          <span>RUNTIME: <strong className="text-white font-medium">{project.duration}</strong></span>
                        </div>
                      )}
                    </div>

                    {/* Monumental Project Title */}
                    <h3 className="mt-4 font-matrix font-black text-3xl sm:text-4xl text-white group-hover:text-orange-400 transition-colors uppercase leading-tight tracking-tight">
                      {project.title}
                    </h3>

                    {/* Client & Role */}
                    <div className="mt-2 text-xs font-mono-code text-zinc-400">
                      <span>CLIENT: </span>
                      <span className="text-white font-medium">{project.client}</span>
                      <span className="mx-2 text-zinc-600">•</span>
                      <span>ROLE: </span>
                      <span className="text-zinc-300">{project.role}</span>
                    </div>

                    {/* Editorial Description */}
                    <p className="mt-4 text-sm text-zinc-400 leading-relaxed font-sans">
                      {project.description}
                    </p>
                  </div>

                  {/* Software & Tags */}
                  <div className="pt-4 border-t border-white/[0.08] space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((t, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-[10px] font-mono-code text-zinc-400 border border-white/10 uppercase"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <span className="text-xs font-mono-code text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1.5 uppercase">
                        <span>VIEW FULL CASE STUDY & BREAKDOWN</span>
                        <ArrowUpRight className="w-4 h-4 text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>

                      {project.clientUrl && (
                        <a
                          href={project.clientUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs font-mono-code text-orange-400 hover:text-white uppercase flex items-center gap-1.5 px-2.5 py-1 border border-orange-500/40 hover:border-white/40 transition-colors"
                        >
                          <span>VIEW LIVE PROJECT</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};