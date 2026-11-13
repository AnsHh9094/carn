import React, { useEffect, useState, Component, ErrorInfo, ReactNode } from 'react';
import { ComicHeader } from './components/ComicHeader';
import { ComicHero } from './components/ComicHero';
import { ComicWorkCarousel } from './components/ComicWorkCarousel';
import { ComicCraftDeck } from './components/ComicCraftDeck';
import { ComicAboutTheater } from './components/ComicAboutTheater';
import { ComicContactFinale } from './components/ComicContactFinale';
import { FramerVideoModal } from './components/FramerVideoModal';
import { FEATURED_PROJECTS, ProjectItem } from './data/portfolioData';
import { initScroll, scrollToTarget, startScroll, stopScroll } from './engine';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class AppErrorBoundary extends Component<
  { children: ReactNode; section?: string },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error?.message || 'Unknown render error' };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[${this.props.section || 'App'}] Runtime Error:`, error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full py-12 px-6 bg-white border-y-2 border-[#0A0A0A] text-center font-mono-code text-xs text-[#0A0A0A]">
          <span className="text-[#FF4D00] uppercase tracking-widest block mb-2 font-bold">
            [{this.props.section || 'PORTFOLIO'} RECOVERY MODE]
          </span>
          <span>{this.state.errorMessage}</span>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preselectedPackage, setPreselectedPackage] = useState<string>(
    'UX & Interaction Design'
  );

  // Single-clock GSAP + Lenis boot
  useEffect(() => {
    return initScroll();
  }, []);

  // Pause Lenis scroll while video modal is active
  useEffect(() => {
    if (isModalOpen) stopScroll();
    else startScroll();
  }, [isModalOpen]);

  const handleNavigate = (sectionId: string) => {
    scrollToTarget(sectionId);
  };

  const handleSelectProject = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleOpenShowreel = () => {
    setSelectedProject(FEATURED_PROJECTS[0]);
    setIsModalOpen(true);
  };

  const handleSelectService = (serviceLabel: string) => {
    setPreselectedPackage(serviceLabel);
    handleNavigate('contact');
  };

  return (
    <AppErrorBoundary section="ROOT">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="min-h-screen comic-shell selection:bg-[#FF4D00] selection:text-[#0A0A0A] overflow-x-clip">
        <ComicHeader onNavigate={handleNavigate} />

        <main
          id="main"
          tabIndex={-1}
          className="outline-none"
          style={{ paddingTop: 'calc(var(--header-h) + var(--frame-outer))' }}
        >
          <AppErrorBoundary section="HERO">
            <ComicHero
              onViewWorks={() => handleNavigate('works')}
              onOpenShowreel={handleOpenShowreel}
            />
          </AppErrorBoundary>

          <AppErrorBoundary section="WORKS">
            <ComicWorkCarousel onSelectProject={handleSelectProject} />
          </AppErrorBoundary>

          <AppErrorBoundary section="EXPERIENCE">
            <ComicAboutTheater onOpenShowreel={handleOpenShowreel} />
          </AppErrorBoundary>

          <AppErrorBoundary section="SKILLS">
            <ComicCraftDeck onSelectService={handleSelectService} />
          </AppErrorBoundary>

          <AppErrorBoundary section="CONTACT">
            <ComicContactFinale
              preselectedPackage={preselectedPackage}
              onScrollTop={() => handleNavigate('hero')}
            />
          </AppErrorBoundary>
        </main>

        <FramerVideoModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProject(null);
          }}
        />
      </div>
    </AppErrorBoundary>
  );
}

export default App;
