import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, Compass, Shield, FileText, Activity, RefreshCw } from 'lucide-react';
import { LibraryDetail } from '../types';
import { RETURNING_RIVER_STEPS } from '../data/librariesData';

interface FiveLibrariesSectionProps {
  libraries: LibraryDetail[];
  onSelectLibrary: (lib: LibraryDetail) => void;
}

export const FiveLibrariesSection: React.FC<FiveLibrariesSectionProps> = ({
  libraries,
  onSelectLibrary,
}) => {
  const [activeRiverStep, setActiveRiverStep] = useState<number>(1);

  return (
    <section id="libraries" className="py-16 sm:py-24 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500 mb-3">
            <span>Civic Architecture</span>
            <span aria-hidden="true">·</span>
            <span>The Five Psychrosphere Layers</span>
            <span aria-hidden="true">·</span>
            <span>Stratified Sequence</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl text-stone-900 tracking-tight font-normal mb-4">
            The Five Libraries of the Human World
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            A civic story about the sciences of the five headquarters and the evolution of human movement between them.
            Not a hierarchy of power, but a sequence of learning. Not a chain of command, but a cycle of renewal.
          </p>
        </div>

        {/* Prologue Callout Quote */}
        <div className="p-6 sm:p-8 bg-white border border-stone-200 rounded-xl mb-16 shadow-sm">
          <div className="text-xs uppercase tracking-widest font-mono text-stone-500 mb-2">
            Prologue: The First Library
          </div>
          <p className="font-editorial text-xl sm:text-2xl text-stone-800 italic leading-relaxed mb-4">
            “Before any institution was built, before any archive was kept, before any ledger was written, there was only life learning how to live. Bodies learning hunger and shelter. Hands learning tools. Eyes learning patterns. Communities learning each other. Every science begins here. Every headquarters begins here.”
          </p>
          <div className="text-xs text-stone-500 font-sans">
            — <strong className="text-stone-800">The Human Continuum</strong>, where the world teaches before anyone writes.
          </div>
        </div>

        {/* The 5 Library Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {libraries.map((lib) => (
            <div
              key={lib.id}
              className="bg-white border border-stone-200 rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-stone-400 hover:shadow-md transition-all group"
            >
              <div>
                {/* Unboxed Metadata Header */}
                <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-4 pb-3 border-b border-stone-100">
                  <span>LIBRARY {lib.number}</span>
                  <span>{lib.scienceType}</span>
                </div>

                <h3 className="font-editorial text-2xl text-stone-900 font-medium mb-1 group-hover:text-amber-800 transition-colors">
                  {lib.name}
                </h3>
                <div className="text-xs text-stone-500 font-serif italic mb-4">
                  {lib.subtitle}
                </div>

                {/* Lesson Pull Quote */}
                <div className="p-3.5 bg-stone-50 border-l-2 border-stone-400 rounded-r mb-5">
                  <p className="font-editorial text-sm sm:text-base text-stone-800 italic leading-snug">
                    “{lib.lesson}”
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-5">
                  {lib.shortDescription}
                </p>

                {/* Scientific Disciplines */}
                <div className="mb-6">
                  <div className="text-[11px] uppercase tracking-wider font-mono text-stone-400 mb-2">
                    Sciences of this Library:
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-xs text-stone-700">
                    {lib.disciplines.map((d, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-amber-700" />
                        <span>{d.name} ({d.teaches})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer & Action */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 font-mono">
                  HQ: {lib.headquartersName}
                </span>
                <button
                  onClick={() => onSelectLibrary(lib)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-800 rounded text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Epilogue Card filling 6th slot */}
          <div className="bg-stone-900 text-stone-100 rounded-xl p-6 sm:p-7 flex flex-col justify-between border border-stone-800">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-4 pb-3 border-b border-stone-800">
                <span>SYNTHESIS</span>
                <span>PSYCHROSPHERE</span>
              </div>
              <h3 className="font-editorial text-2xl text-stone-100 font-medium mb-3">
                Epilogue: The Unified Architecture
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-4">
                The Human Continuum teaches reality. The Global Confidence Reserve teaches meaning. The World Systems Council teaches boundaries. The Continuity & Provenance Authority teaches method. The Global Operations Network teaches action.
              </p>
              <div className="text-xs text-amber-200/90 font-serif italic mb-2">
                “Not a claim of dominion. A map of how life becomes wiser.”
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 text-[11px] text-stone-400 font-mono">
              A sequence of learning · A cycle of renewal
            </div>
          </div>
        </div>

        {/* The Movement Between Libraries: The Returning River of Human Progress */}
        <div className="bg-[#F7F4EE] border border-stone-200 rounded-2xl p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500 mb-1">
                <span>The Returning River of Human Progress</span>
                <span aria-hidden="true">·</span>
                <span>8-Stage Evolution</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl text-stone-900 font-medium">
                The Movement Between Libraries
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
                Humans move between these libraries every day: from conditions to meaning, to boundaries, to systems, to deeds, and back to conditions.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
              <RefreshCw className="w-3.5 h-3.5 animate-spin-slow text-amber-700" />
              <span>Continuous Cyclical Flow</span>
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-6">
            {RETURNING_RIVER_STEPS.map((st) => (
              <button
                key={st.step}
                onClick={() => setActiveRiverStep(st.step)}
                className={`p-3 text-left rounded-lg transition-all border ${
                  activeRiverStep === st.step
                    ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
                }`}
              >
                <div className="text-[10px] font-mono opacity-70 mb-1">STEP 0{st.step}</div>
                <div className="text-xs font-semibold leading-tight line-clamp-2">{st.title}</div>
              </button>
            ))}
          </div>

          {/* Active Step Highlight Box */}
          {(() => {
            const current = RETURNING_RIVER_STEPS.find((s) => s.step === activeRiverStep) || RETURNING_RIVER_STEPS[0];
            return (
              <div className="p-6 bg-white border border-stone-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-amber-800 uppercase tracking-widest">
                    Step {current.step} of 8 · {current.library}
                  </div>
                  <div className="font-editorial text-2xl text-stone-900 font-medium">
                    {current.title}
                  </div>
                  <div className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
                    {current.desc}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    disabled={activeRiverStep === 1}
                    onClick={() => setActiveRiverStep((prev) => Math.max(1, prev - 1))}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-medium disabled:opacity-40 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    disabled={activeRiverStep === 8}
                    onClick={() => setActiveRiverStep((prev) => Math.min(8, prev + 1))}
                    className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium disabled:opacity-40 transition-colors"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};
