import React from 'react';
import { X, BookOpen, Landmark, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { LibraryDetail } from '../types';

interface LibraryDetailModalProps {
  library: LibraryDetail | null;
  onClose: () => void;
  onSelectAnother: (libId: string) => void;
  allLibraries: LibraryDetail[];
}

export const LibraryDetailModal: React.FC<LibraryDetailModalProps> = ({
  library,
  onClose,
  onSelectAnother,
  allLibraries,
}) => {
  if (!library) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#FBF9F5] border border-stone-300 rounded-2xl shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="library-modal-title"
      >
        {/* Header Ribbon */}
        <div className="px-6 sm:px-8 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-100/60">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500">
            <span>Library {library.number}</span>
            <span aria-hidden="true">·</span>
            <span>{library.scienceType}</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-800 font-semibold">{library.headquartersName}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 hover:bg-stone-200/60 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-8">
          {/* Title & Core Lesson */}
          <div>
            <h2 id="library-modal-title" className="font-editorial text-3xl sm:text-4xl text-stone-900 font-normal mb-2">
              {library.name}
            </h2>
            <div className="text-base font-editorial italic text-stone-600 mb-6">
              {library.subtitle}
            </div>

            {/* Core Lesson Highlight Callout */}
            <div className="p-5 bg-amber-50/70 border-l-4 border-amber-700 rounded-r-lg">
              <div className="text-[11px] uppercase tracking-wider font-mono text-amber-800 mb-1">
                The Foundational Lesson
              </div>
              <p className="font-editorial text-xl sm:text-2xl text-stone-900 italic font-medium leading-snug">
                “{library.lesson}”
              </p>
            </div>
          </div>

          {/* Full Narrative Text from PDF */}
          <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
            {library.fullText.map((paragraph, idx) => (
              <p
                key={idx}
                className={idx === 0 ? 'first-letter:text-4xl first-letter:font-editorial first-letter:font-semibold first-letter:float-left first-letter:mr-2.5 first-letter:text-stone-900' : ''}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Key Questions if present (Library II) */}
          {library.keyQuestions && (
            <div className="p-5 bg-stone-100 rounded-xl border border-stone-200">
              <div className="text-xs uppercase tracking-widest font-mono text-stone-500 mb-3">
                Core Inquiry of This Library
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {library.keyQuestions.map((q, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-stone-200/70 text-center">
                    <span className="font-editorial text-lg text-stone-900 italic block">{q}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* The Sciences of This Library */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-mono text-stone-500 mb-3">
              The Sciences of This Layer
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {library.disciplines.map((d, idx) => (
                <div key={idx} className="p-3.5 bg-white border border-stone-200 rounded-lg">
                  <div className="text-xs font-semibold text-stone-900">{d.name}</div>
                  <div className="text-xs text-stone-500 mt-1">
                    teaches <strong className="text-amber-800 font-medium">{d.teaches}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custodian Institutions */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
            <div className="text-xs uppercase tracking-widest font-mono text-stone-500 mb-2">
              Designated Headquarters & Institutional Stewards
            </div>
            <div className="flex flex-wrap gap-2">
              {library.institutions.map((inst, idx) => (
                <div key={idx} className="text-xs px-3 py-1.5 bg-white border border-stone-300 rounded text-stone-800 font-medium">
                  {inst}
                </div>
              ))}
            </div>
          </div>

          {/* Governing Civic Principles */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-mono text-stone-500 mb-3">
              Civic Invariants & Principles
            </h4>
            <div className="space-y-2">
              {library.principles.map((pr, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-white border border-stone-200 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-stone-800 font-medium">{pr}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with quick switcher to next/previous library */}
        <div className="px-6 sm:px-8 py-4 bg-stone-100/90 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-stone-500">
            Switch library:
            <div className="inline-flex gap-1.5 ml-2">
              {allLibraries.map((lib) => (
                <button
                  key={lib.id}
                  onClick={() => onSelectAnother(lib.id)}
                  className={`px-2 py-0.5 text-xs font-mono rounded ${
                    lib.id === library.id
                      ? 'bg-stone-900 text-white'
                      : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-300'
                  }`}
                >
                  {lib.number}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-stone-900 text-stone-100 hover:bg-stone-800 rounded-md text-xs font-medium transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
