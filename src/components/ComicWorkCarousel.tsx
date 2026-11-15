import React, { useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, ArrowUpRight, ExternalLink } from 'lucide-react';
import { FEATURED_PROJECTS, KUNAL_PROFILE, ProjectItem } from '../data/portfolioData';

interface ComicWorkCarouselProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ComicWorkCarousel: React.FC<ComicWorkCarouselProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<'All' | 'Commercial' | 'Creators'>('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  const visibleProjects = useMemo(() => {
    if (filter === 'All') return FEATURED_PROJECTS;
    return FEATURED_PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  const handleFilterChange = (next: 'All' | 'Commercial' | 'Creators') => {
    setFilter(next);
    setActiveIndex(0);
    if (railRef.current) {
      railRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const scrollCard = (dir: -1 | 1) => {
    if (!railRef.current) return;
    const nextIdx = Math.max(0, Math.min(visibleProjects.length - 1, activeIndex + dir));
    setActiveIndex(nextIdx);
    const cardEl = railRef.current.children[nextIdx] as HTMLElement | undefined;
    if (cardEl) {
      railRef.current.scrollTo({
        left: cardEl.offsetLeft - 12,
        behavior: 'smooth',
      });
    }
  };

  const handleRailScroll = () => {
    if (!railRef.current) return;
    const scrollLeft = railRef.current.scrollLeft;
    const firstCard = railRef.current.children[0] as HTMLElement | undefined;
    if (!firstCard) return;
    const step = firstCard.offsetWidth + 24;
    if (step > 0) {
      const idx = Math.round(scrollLeft / step);
      setActiveIndex(Math.max(0, Math.min(visibleProjects.length - 1, idx)));
    }
  };

  return (
    <section
      id="works"
      aria-label="Selected Video Editing and UX Work"
      className="comic-panel relative text-white overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: 'var(--field-cobalt)' }}
    >
      {/* Massive Watermark Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none font-condensed font-black text-[11rem] sm:text-[18rem] lg:text-[24rem] leading-[0.75] text-white/[0.06] absolute -top-6 left-4 uppercase tracking-tighter"
      >
        WORK
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 space-y-8">
        {/* Top Row: Section Heading + Figma Portfolio Link + Filter Chips */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b-2 border-white/25 pb-6">
          <div className="space-y-2">
            <span className="inline-block px-2.5 py-0.5 bg-[#0A0A0A] text-[#FFAE00] font-mono-code text-[11px] font-bold uppercase tracking-widest">
              [01] SELECTED WORK
            </span>
            <h2 className="font-condensed font-black text-5xl sm:text-7xl lg:text-8xl uppercase leading-[0.86] tracking-tight text-white">
              Video Cuts &amp; UX
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4">
            <a
              href={KUNAL_PROFILE.portfolioLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-comic min-h-[44px] px-4 bg-[#FFAE00] text-[#0A0A0A] font-condensed font-black text-xl uppercase tracking-wide hover:bg-white"
            >
              <span>Figma UX Prototype</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2" role="group" aria-label="Filter projects by category">
              {(['All', 'Commercial', 'Creators'] as const).map((cat) => {
                const active = filter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleFilterChange(cat)}
                    aria-pressed={active}
                    className={`btn-comic min-h-[44px] px-4 font-condensed font-black text-xl uppercase tracking-wide ${
                      active
                        ? 'bg-white text-[#0A0A0A]'
                        : 'bg-[#0A0A0A] text-white hover:bg-[#FFAE00] hover:text-[#0A0A0A]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Carousel Controls + Counter */}
            <div className="flex items-center gap-2">
              <span className="font-mono-code text-xs font-bold tabular-nums px-3 py-2 bg-[#0A0A0A] text-white border-2 border-[#0A0A0A]">
                {activeIndex + 1} / {visibleProjects.length}
              </span>
              <button
                type="button"
                onClick={() => scrollCard(-1)}
                disabled={activeIndex === 0}
                aria-label="Previous project"
                className="btn-comic min-h-[44px] min-w-[44px] px-3 bg-white text-[#0A0A0A] disabled:opacity-40"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollCard(1)}
                disabled={activeIndex >= visibleProjects.length - 1}
                aria-label="Next project"
                className="btn-comic min-h-[44px] min-w-[44px] px-3 bg-white text-[#0A0A0A] disabled:opacity-40"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Snap Carousel of Bold Black-Bordered Comic Video Cards */}
        <div
          ref={railRef}
          onScroll={handleRailScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {visibleProjects.map((project, idx) => {
            const isHovered = hoveredId === project.id;
            return (
              <article
                key={project.id}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="snap-start shrink-0 w-[88vw] sm:w-[70vw] md:w-[52vw] lg:w-[42vw] xl:w-[38vw] bg-white text-[#0A0A0A] border-[2.5px] border-[#0A0A0A] shadow-[8px_8px_0_0_#0A0A0A] hover:shadow-[12px_12px_0_0_#0A0A0A] hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                {/* 16:9 Looping Video Preview Window */}
                <div className="relative aspect-video bg-[#0A0A0A] border-b-[2.5px] border-[#0A0A0A] overflow-hidden group">
                  <video
                    src={project.videoUrl}
                    poster={project.thumbnailUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    className="w-full h-full object-cover pointer-events-none"
                  />

                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    aria-label={`Play ${project.title}`}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-black/15 group-hover:bg-black/35 transition-colors cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-none bg-[#FF4D00] border-[2.5px] border-[#0A0A0A] shadow-[4px_4px_0_0_#0A0A0A] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-[#0A0A0A] text-[#0A0A0A] ml-0.5" aria-hidden="true" />
                    </div>
                  </button>

                  {/* Top Left Duration Badge */}
                  <div className="pointer-events-none absolute top-3 left-3 z-20 px-2.5 py-1 bg-[#0A0A0A] text-white font-mono-code text-[11px] font-bold uppercase tracking-wider">
                    {project.duration} · {project.year}
                  </div>
                </div>

                {/* Card Copy Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono-code font-bold uppercase text-[#2B47FF]">
                      <span>0{idx + 1} / {project.client}</span>
                      <span className="text-[#0A0A0A] bg-[#FFAE00] px-2 py-0.5 border border-[#0A0A0A]">
                        {project.metrics}
                      </span>
                    </div>

                    <h3 className="font-condensed font-black text-3xl sm:text-4xl uppercase leading-[0.9] text-[#0A0A0A]">
                      {project.title}
                    </h3>

                    <p className="font-body text-sm text-[#4A4A52] leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags & Play CTA */}
                  <div className="pt-3 border-t-2 border-[#0A0A0A]/15 flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-[#F4F4F6] border border-[#0A0A0A]/25 font-mono-code text-[10px] font-bold uppercase text-[#0A0A0A]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="btn-comic min-h-[40px] px-3.5 bg-[#0A0A0A] text-white font-condensed font-black text-lg uppercase hover:bg-[#FF4D00] hover:text-[#0A0A0A] shrink-0"
                    >
                      <span>Watch</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
