import React, { useState } from 'react';
import { Play, ArrowUpRight, Filter, Film, Sparkles } from 'lucide-react';
import { FEATURED_PROJECTS, ProjectItem } from '../data/portfolioData';

interface VideoShowreelProps {
  onOpenProject: (project: ProjectItem) => void;
  selectedCategory: string | null;
}

export const VideoShowreel: React.FC<VideoShowreelProps> = ({
  onOpenProject,
  selectedCategory
}) => {
  const [filter, setFilter] = useState<string>('All');

  // Synchronize category selection from Hero category cards
  React.useEffect(() => {
    if (selectedCategory) {
      if (selectedCategory.includes('commercial')) setFilter('Commercial');
      else if (selectedCategory.includes('creator')) setFilter('Creators');
      else if (selectedCategory.includes('sports')) setFilter('Sports');
      else if (selectedCategory.includes('ux')) setFilter('UX & Motion');
    }
  }, [selectedCategory]);

  const categories = ['All', 'Commercial', 'Creators', 'Sports', 'UX & Motion'];

  const filteredProjects = FEATURED_PROJECTS.filter((p) => {
    if (filter === 'All') return true;
    return p.category.toLowerCase().includes(filter.toLowerCase()) || filter.toLowerCase().includes(p.category.toLowerCase());
  });

  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent-orange"></span>
            <span className="font-mono-code text-xs text-accent-orange tracking-widest uppercase">
              SELECTED SHOWREEL // 2020 - 2026
            </span>
          </div>
          <h2 className="font-syne font-black text-3xl md:text-5xl tracking-tight text-white uppercase">
            CRAFTED WITH PRECISION
          </h2>
          <p className="mt-2 text-sm text-studio-400 max-w-xl">
            From Hollywood-remote edits to viral million-view YouTube hooks and high-energy sports cuts.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono-code tracking-wider uppercase transition-all ${
                filter === cat
                  ? 'bg-white text-black font-bold shadow-lg shadow-white/10'
                  : 'bg-white/5 hover:bg-white/15 text-studio-400 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            onClick={() => onOpenProject(project)}
            className="group relative bg-studio-900/60 rounded-2xl overflow-hidden border border-white/10 hover:border-accent-orange/60 transition-all duration-500 cursor-pointer flex flex-col hover:-translate-y-1.5 shadow-xl"
          >
            {/* Visual Thumbnail Stage */}
            <div className="relative aspect-video bg-black overflow-hidden">
              <img
                src={project.thumbnailUrl}
                alt={project.title}
                className="w-full h-full object-cover filter brightness-90 contrast-105 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-transparent to-transparent opacity-70" />

              {/* Category Pill */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono-code text-white">
                {project.category}
              </div>

              {/* Performance Metric Badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-accent-orange/20 border border-accent-orange/40 text-[10px] font-mono-code text-accent-orange">
                {project.metrics}
              </div>

              {/* Center Play Button on Hover */}
              <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-accent-orange text-black flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-2xl">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>

              {/* Timecode preview footer in card */}
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono-code text-studio-400">
                <span>{project.client}</span>
                <span>{project.year}</span>
              </div>
            </div>

            {/* Meta Content */}
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="font-syne font-bold text-lg text-white group-hover:text-accent-orange transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs text-studio-400 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tag Pills */}
              <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-1.5 items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-white/5 text-studio-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="w-4 h-4 text-studio-400 group-hover:text-accent-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
