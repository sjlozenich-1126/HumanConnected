import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Award,
  X,
  FileCheck,
  Send,
} from 'lucide-react';
import { TrainingModule } from '../types';
import { TRAINING_MODULES } from '../data/modulesData';

export const TrainingModulesSection: React.FC = () => {
  const [modules, setModules] = useState<TrainingModule[]>(() => {
    const saved = localStorage.getItem('collective_training_modules');
    return saved ? JSON.parse(saved) : TRAINING_MODULES;
  });
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);
  const [reflectionInput, setReflectionInput] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    localStorage.setItem('collective_training_modules', JSON.stringify(modules));
  }, [modules]);

  const handleToggleComplete = (id: string) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
    if (selectedModule && selectedModule.id === id) {
      setSelectedModule((prev) => (prev ? { ...prev, completed: !prev.completed } : null));
    }
  };

  const handleOpenModule = (mod: TrainingModule) => {
    setSelectedModule(mod);
    setReflectionInput('');
    setShowCertificate(false);
  };

  const completedCount = modules.filter((m) => m.completed).length;

  return (
    <div className="space-y-12">
      {/* Top Header & Progress */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
            <span>Curricular Foundations</span>
            <span aria-hidden="true">·</span>
            <span>Five Levels of Learning</span>
            <span aria-hidden="true">·</span>
            <span>Institutional Accreditation</span>
          </div>
          <h3 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-normal">
            Steward Training Modules
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Interdisciplinary curricula for fellows and staff across Fiducia Centrale, Central Trust Securities, the UN, WHO, and Swiss International Archives.
          </p>
        </div>

        {/* Completion Gauge */}
        <div className="p-3.5 bg-white border border-stone-200 rounded-xl flex items-center gap-4 shrink-0 shadow-sm">
          <GraduationCap className="w-6 h-6 text-amber-800" />
          <div>
            <div className="text-[11px] font-mono text-stone-500 uppercase">Accreditation Progress</div>
            <div className="text-sm font-semibold text-stone-900 tabular-nums">
              {completedCount} of {modules.length} Modules Certified ({Math.round((completedCount / modules.length) * 100)}%)
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className="p-6 bg-white border border-stone-200 rounded-xl flex flex-col justify-between hover:border-stone-400 hover:shadow-md transition-all group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-3">
                <span>{mod.code}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-stone-400" />
                  <span>{mod.durationMinutes} min</span>
                </span>
              </div>

              <div className="text-xs font-mono text-amber-800 font-semibold mb-1">
                Library {mod.libraryLevel}
              </div>

              <h4 className="font-editorial text-xl text-stone-900 font-medium mb-2 group-hover:text-amber-800 transition-colors">
                {mod.title}
              </h4>
              <p className="text-xs text-stone-500 font-serif italic mb-4">
                {mod.subtitle}
              </p>

              <p className="text-xs text-stone-600 leading-relaxed mb-6 line-clamp-3">
                {mod.overview}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs font-mono text-stone-500 flex items-center gap-1.5">
                {mod.completed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span className="text-emerald-700 font-medium">Certified</span>
                  </>
                ) : (
                  <span>Incomplete</span>
                )}
              </span>

              <button
                onClick={() => handleOpenModule(mod)}
                className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <span>Study Module</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Module Reader Modal */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#FBF9F5] border border-stone-300 rounded-2xl shadow-2xl overflow-hidden my-8">
            {/* Header */}
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-100">
              <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                <span>{selectedModule.code}</span>
                <span aria-hidden="true">·</span>
                <span>Library {selectedModule.libraryLevel}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedModule.durationMinutes} Minutes</span>
              </div>
              <button
                onClick={() => setSelectedModule(null)}
                className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-8">
              {/* Title Deck */}
              <div>
                <h3 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-medium mb-1">
                  {selectedModule.title}
                </h3>
                <div className="text-base font-serif italic text-stone-600 mb-4">
                  {selectedModule.subtitle}
                </div>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  {selectedModule.overview}
                </p>
              </div>

              {/* Syllabus Breakdown */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-3">
                  Curriculum Syllabus
                </h4>
                <div className="space-y-3">
                  {selectedModule.syllabus.map((item, idx) => (
                    <div key={idx} className="p-4 bg-white border border-stone-200 rounded-lg">
                      <div className="text-xs font-mono text-stone-400 mb-1">LESSON 0{idx + 1}</div>
                      <div className="text-sm font-semibold text-stone-900 mb-1">{item.title}</div>
                      <p className="text-xs text-stone-600 leading-relaxed">{item.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reflection Assessment */}
              <div className="p-5 bg-stone-100 rounded-xl border border-stone-200 space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-stone-500">
                  Steward Reflection & Institutional Review
                </div>
                <p className="font-serif italic text-stone-800 text-sm">
                  “{selectedModule.reflectionPrompt}”
                </p>
                <textarea
                  rows={3}
                  value={reflectionInput}
                  onChange={(e) => setReflectionInput(e.target.value)}
                  placeholder="Record your critical institutional reflection here..."
                  className="w-full text-xs p-3 bg-white border border-stone-300 rounded outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              {/* Certificate Preview Trigger if completed */}
              {selectedModule.completed && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-emerald-800" />
                    <div>
                      <div className="text-xs font-semibold text-emerald-950">
                        {selectedModule.certificationTitle}
                      </div>
                      <div className="text-[11px] text-emerald-700 font-mono">
                        Cryptographically Sealed in Archival Ledger
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="px-3 py-1.5 bg-emerald-900 text-white rounded text-xs font-medium hover:bg-emerald-800"
                  >
                    View Credential
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => handleToggleComplete(selectedModule.id)}
                className={`px-4 py-2 rounded text-xs font-medium flex items-center gap-2 transition-colors ${
                  selectedModule.completed
                    ? 'bg-stone-200 text-stone-800 hover:bg-stone-300'
                    : 'bg-emerald-800 hover:bg-emerald-700 text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {selectedModule.completed
                    ? 'Mark as Under Review'
                    : 'Complete & Certify Module'}
                </span>
              </button>

              <button
                onClick={() => setSelectedModule(null)}
                className="px-4 py-2 bg-stone-900 text-white rounded text-xs font-medium hover:bg-stone-800"
              >
                Close Module
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate of Completion Modal */}
      {showCertificate && selectedModule && (
        <div className="fixed inset-0 z-60 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#FFFDF9] border-8 border-double border-amber-900/30 p-8 sm:p-12 rounded-xl shadow-2xl text-center">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-[11px] font-mono uppercase tracking-widest text-amber-900 mb-2">
              The Collective · Psychrosphere Accreditation Council
            </div>
            <h3 className="font-editorial text-3xl sm:text-4xl text-stone-900 mb-1">
              Certificate of Institutional Stewardship
            </h3>
            <div className="w-24 h-0.5 bg-amber-800 mx-auto my-4" />

            <p className="text-xs text-stone-500 font-mono mb-6">
              THIS CERTIFIES THAT THE CANDIDATE HAS COMPLETED FORMAL ACCREDITATION IN
            </p>

            <div className="font-editorial text-2xl text-stone-900 font-semibold mb-2">
              {selectedModule.title}
            </div>
            <div className="text-xs font-serif italic text-stone-600 mb-8">
              Conferred title: {selectedModule.certificationTitle}
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-stone-500 border-t border-stone-200 pt-6">
              <div>
                <span className="block text-stone-400 text-[10px]">VERIFIED BY</span>
                <span className="font-semibold text-stone-800">Fiducia Centrale & Swiss Archives</span>
              </div>
              <div>
                <span className="block text-stone-400 text-[10px]">RECORD ID</span>
                <span className="font-semibold text-stone-800">VAULT-ACC-{selectedModule.id}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
