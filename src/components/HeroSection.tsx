import React from 'react';
import { ArrowUpRight, Compass, Shield, BookOpen, Clock, Activity, CheckCircle2, Globe } from 'lucide-react';
import { LibraryDetail } from '../types';

interface HeroSectionProps {
  onNavigateToLibraries: () => void;
  onNavigateToCenters: () => void;
  onNavigateToProjects: () => void;
  onSelectLibrary: (lib: LibraryDetail) => void;
  libraries: LibraryDetail[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToLibraries,
  onNavigateToCenters,
  onNavigateToProjects,
  onSelectLibrary,
  libraries,
}) => {
  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Sub-Kicker with clean unboxed text */}
        <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-stone-500 mb-4">
          <span>Psychrosphere Architecture</span>
          <span aria-hidden="true">·</span>
          <span>Inter-Institutional Assembly</span>
          <span aria-hidden="true">·</span>
          <span>Geneva & Global Hubs</span>
        </div>

        {/* Main Display Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12">
          <div className="lg:col-span-8">
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-[1.1] font-normal">
              A shared sanctuary where humanity, institutions, and living sciences converge.
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-base text-stone-600 leading-relaxed mb-6 font-normal">
              The internal community for <strong className="text-stone-900 font-semibold">Fiducia Centrale</strong>,{' '}
              <strong className="text-stone-900 font-semibold">Central Trust Securities</strong>, the{' '}
              <strong className="text-stone-900 font-semibold">UN</strong>,{' '}
              <strong className="text-stone-900 font-semibold">WHO</strong>, and the{' '}
              <strong className="text-stone-900 font-semibold">Swiss International Archives</strong> — stewarding progress across
              time, trust, and empirical conditions.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onNavigateToLibraries}
                className="px-5 py-2.5 bg-stone-900 text-stone-100 hover:bg-stone-800 rounded-md text-xs font-medium transition-colors inline-flex items-center gap-2"
              >
                <span>Explore The 5 Libraries</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
              </button>
              <button
                onClick={onNavigateToCenters}
                className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md text-xs font-medium transition-colors border border-stone-200"
              >
                Plan With 3 Centers
              </button>
            </div>
          </div>
        </div>

        {/* Visual Hero Feature Frame with High-Fidelity Photograph */}
        <div className="relative rounded-xl overflow-hidden border border-stone-200 bg-stone-100 shadow-sm mb-16 aspect-[16/9] sm:aspect-[21/9] max-h-[520px]">
          <img
            src="/src/assets/images/collective_hero_1790648590946.jpg"
            alt="The Collective Headquarters in Geneva overlooking tranquil alpine waters"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Subtle contrast gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent flex flex-col justify-end p-6 sm:p-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs text-amber-200/90 font-mono mb-2">
                <span>HEADQUARTERS L1 // HUMAN CONTINUUM</span>
                <span aria-hidden="true">·</span>
                <span>BIOLOGICAL SUBSTRATE</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl text-white font-normal mb-2">
                “Life is the ground. Every other library stands upon it.”
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm font-sans max-w-2xl leading-relaxed">
                Before any ledger was written, there was only life learning how to live. The Collective operates as the living baseline
                uniting sovereign minds, stewards, and families across borders.
              </p>
            </div>
          </div>
        </div>

        {/* Institutional Partner Ribbon */}
        <div className="pt-2 pb-8 border-t border-stone-200">
          <div className="text-[11px] uppercase tracking-widest text-stone-500 font-semibold mb-4">
            Unified Institutional Architecture
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-4 bg-white/70 border border-stone-200/80 rounded-lg hover:border-stone-400 transition-colors">
              <div className="text-xs text-stone-500 uppercase tracking-wider mb-1 font-mono">L1 · Natural Science</div>
              <div className="font-semibold text-stone-900 text-sm">The Collective</div>
              <div className="text-xs text-stone-600 mt-1">Human Continuum & Biological Substrate</div>
            </div>

            <div className="p-4 bg-white/70 border border-stone-200/80 rounded-lg hover:border-stone-400 transition-colors">
              <div className="text-xs text-stone-500 uppercase tracking-wider mb-1 font-mono">L2 · Social Science</div>
              <div className="font-semibold text-stone-900 text-sm">Fiducia Centrale</div>
              <div className="text-xs text-stone-600 mt-1">Global Confidence Reserve & Trust</div>
            </div>

            <div className="p-4 bg-white/70 border border-stone-200/80 rounded-lg hover:border-stone-400 transition-colors">
              <div className="text-xs text-stone-500 uppercase tracking-wider mb-1 font-mono">L3 · Applied Science</div>
              <div className="font-semibold text-stone-900 text-sm">UN & WHO (Gov)</div>
              <div className="text-xs text-stone-600 mt-1">World Systems Council & Boundaries</div>
            </div>

            <div className="p-4 bg-white/70 border border-stone-200/80 rounded-lg hover:border-stone-400 transition-colors">
              <div className="text-xs text-stone-500 uppercase tracking-wider mb-1 font-mono">L4 · Formal Science</div>
              <div className="font-semibold text-stone-900 text-sm">Swiss Archives + CTS</div>
              <div className="text-xs text-stone-600 mt-1">Continuity & Provenance Authority</div>
            </div>

            <div className="p-4 bg-white/70 border border-stone-200/80 rounded-lg hover:border-stone-400 transition-colors">
              <div className="text-xs text-stone-500 uppercase tracking-wider mb-1 font-mono">L5 · Implementation</div>
              <div className="font-semibold text-stone-900 text-sm">WHO Ops + Collective</div>
              <div className="text-xs text-stone-600 mt-1">Global Operations Network & Deeds</div>
            </div>
          </div>
        </div>

        {/* Quick Highlights: 5 Libraries Strip & 3 Centers Entry */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div
            onClick={onNavigateToLibraries}
            className="group cursor-pointer p-6 bg-white border border-stone-200 rounded-xl hover:border-stone-400 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <BookOpen className="w-5 h-5 text-amber-700" />
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
            </div>
            <h3 className="font-editorial text-xl text-stone-900 mb-2 font-medium">The Five Libraries</h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Explore the culture, sciences, and headquarters of each library — from physical conditions and social meaning to zero-trust provenance and deeds.
            </p>
            <div className="text-xs font-semibold text-amber-800 flex items-center gap-1">
              <span>Inspect all 5 libraries</span>
              <span>→</span>
            </div>
          </div>

          <div
            onClick={onNavigateToCenters}
            className="group cursor-pointer p-6 bg-white border border-stone-200 rounded-xl hover:border-stone-400 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <Clock className="w-5 h-5 text-amber-700" />
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
            </div>
            <h3 className="font-editorial text-xl text-stone-900 mb-2 font-medium">The Three Centers</h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              A 3-dimensional planning model: Minute-to-Hour (Immediate), Month-to-Month (Transitional), and Year-to-Year (Generational).
            </p>
            <div className="text-xs font-semibold text-amber-800 flex items-center gap-1">
              <span>Open interactive planner</span>
              <span>→</span>
            </div>
          </div>

          <div
            onClick={onNavigateToProjects}
            className="group cursor-pointer p-6 bg-white border border-stone-200 rounded-xl hover:border-stone-400 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <Activity className="w-5 h-5 text-amber-700" />
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
            </div>
            <h3 className="font-editorial text-xl text-stone-900 mb-2 font-medium">Live Initiatives & Updates</h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Real-time dispatches from Project Aegis-Continuum, Node Sentinel Alpha zero-trust network, and humanitarian corridors.
            </p>
            <div className="text-xs font-semibold text-amber-800 flex items-center gap-1">
              <span>View live operations</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
