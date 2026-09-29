import React, { useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  Clock,
  Shield,
  Radio,
  X,
  Plus,
  CheckCircle,
  ExternalLink,
  Calendar,
  Layers,
  Milestone,
  CheckCircle2,
  CircleDashed,
  Hourglass,
  Flag,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import { Project, ProjectMilestone, ProjectUpdate } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';

export const ProjectsTracker: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(PROJECTS_DATA);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'roadmap'>('cards');
  const [simulatedCount, setSimulatedCount] = useState(0);

  // Allow simulating an incoming real-time telemetry update
  const handleSimulateLiveUpdate = () => {
    const authors = [
      { name: 'Dr. Lucas Chen', org: 'Central Trust Securities', phase: 'Continuous Invariants' },
      { name: 'Jean-Paul Mercier', org: 'WHO Operations', phase: 'Cold-Chain Telemetry' },
      { name: 'Marc V. Eberhard', org: 'Swiss International Archives', phase: 'Vault Verification' },
      { name: 'Hélène de Saint-Germain', org: 'Fiducia Centrale', phase: 'Reserve Audit' },
    ];
    const pick = authors[simulatedCount % authors.length];
    const newUpdate: ProjectUpdate = {
      id: `live-${Date.now()}`,
      timestamp: 'Just now',
      author: pick.name,
      institution: pick.org,
      headline: `Live Telemetry Heartbeat Sync: Node Cluster #${100 + simulatedCount}`,
      details:
        'Bi-directional synchronization verified across Geneva and Zurich relays. Zero integrity drift detected across all cryptographic provenance records.',
      phase: pick.phase,
    };

    setProjects((prev) =>
      prev.map((p, idx) =>
        idx === 0
          ? {
              ...p,
              updates: [newUpdate, ...p.updates],
              progressPercent: Math.min(100, p.progressPercent + 1),
            }
          : p
      )
    );
    setSimulatedCount((c) => c + 1);
  };

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter(
          (p) =>
            p.libraryLevel === activeFilter ||
            p.status === activeFilter ||
            p.horizonCategory === activeFilter
        );

  return (
    <section id="projects" className="py-16 sm:py-24 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
              <span>Operational Matrix</span>
              <span aria-hidden="true">·</span>
              <span>Visual Timelines & Institutional Goals</span>
              <span aria-hidden="true">·</span>
              <span>2025–2030 Horizon</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl text-stone-900 tracking-tight font-normal mb-3">
              Active Projects & Institutional Roadmap
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Track start-to-completion horizons, multi-year milestones, and real-time telemetry across Fiducia Centrale, CTS, UN, WHO, and Swiss International Archives.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Switcher */}
            <div className="flex items-center p-1 bg-stone-100 rounded-lg border border-stone-200/80">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Cards View
              </button>
              <button
                onClick={() => setViewMode('roadmap')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1.5 ${
                  viewMode === 'roadmap'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-amber-800" />
                <span>Timeline Roadmap</span>
              </button>
            </div>

            <button
              onClick={handleSimulateLiveUpdate}
              className="px-3.5 py-1.5 bg-white border border-stone-300 hover:border-stone-900 text-stone-900 rounded-lg text-xs font-medium transition-all shadow-sm flex items-center gap-2"
            >
              <Radio className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
              <span>Simulate Telemetry</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between gap-4 pb-6 overflow-x-auto text-xs font-medium text-stone-600 border-b border-stone-200/80 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-stone-400 font-mono text-[11px] mr-1">Filter by:</span>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                activeFilter === 'all' ? 'bg-stone-900 text-white' : 'bg-stone-100 hover:bg-stone-200'
              }`}
            >
              All Initiatives
            </button>
            <button
              onClick={() => setActiveFilter('L1')}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                activeFilter === 'L1' ? 'bg-stone-900 text-white' : 'bg-stone-100 hover:bg-stone-200'
              }`}
            >
              L1 Conditions (Collective)
            </button>
            <button
              onClick={() => setActiveFilter('L2')}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                activeFilter === 'L2' ? 'bg-stone-900 text-white' : 'bg-stone-100 hover:bg-stone-200'
              }`}
            >
              L2 Confidence (Fiducia)
            </button>
            <button
              onClick={() => setActiveFilter('L4')}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                activeFilter === 'L4' ? 'bg-stone-900 text-white' : 'bg-stone-100 hover:bg-stone-200'
              }`}
            >
              L4 Systems (CTS / Archives)
            </button>
            <button
              onClick={() => setActiveFilter('L5')}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                activeFilter === 'L5' ? 'bg-stone-900 text-white' : 'bg-stone-100 hover:bg-stone-200'
              }`}
            >
              L5 Operations (WHO)
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-stone-500">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Active Temporal Cycle: 2026.Q3</span>
          </div>
        </div>

        {/* View Mode 1: Cards View with Enhanced Visual Timelines */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-stone-400 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Project Image Frame */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-sm text-stone-100 text-[11px] font-mono px-2.5 py-1 rounded">
                      {project.libraryLevel} · {project.leadInstitution}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-stone-800 text-[11px] font-mono px-2.5 py-1 rounded border border-stone-200 font-semibold">
                      {project.status}
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 sm:p-7">
                    {/* Visual Timeline Header Ribbon */}
                    <div className="p-3 bg-stone-50 border border-stone-200/90 rounded-xl mb-4">
                      <div className="flex items-center justify-between text-xs font-mono text-stone-600 mb-1.5">
                        <span className="flex items-center gap-1.5 font-semibold text-stone-900">
                          <Calendar className="w-3.5 h-3.5 text-amber-800" />
                          <span>Timeline: {project.startDate} → {project.targetCompletionDate}</span>
                        </span>
                        <span className="text-amber-900 font-medium">{project.durationLabel}</span>
                      </div>

                      {/* Visual Segmented Phase Timeline Bar */}
                      <div className="space-y-1 mt-2">
                        <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                          <span>{project.currentPhase}</span>
                          <span className="font-semibold text-stone-800">
                            {project.currentPhaseNumber} of {project.totalPhases} Phases
                          </span>
                        </div>
                        <div className="grid grid-cols-5 gap-1 h-2 w-full pt-0.5">
                          {Array.from({ length: project.totalPhases }).map((_, i) => {
                            const phaseNum = i + 1;
                            const isCompleted = phaseNum < project.currentPhaseNumber;
                            const isCurrent = phaseNum === project.currentPhaseNumber;
                            return (
                              <div
                                key={i}
                                className={`rounded-sm h-1.5 transition-all ${
                                  isCompleted
                                    ? 'bg-stone-900'
                                    : isCurrent
                                    ? 'bg-amber-600 animate-pulse'
                                    : 'bg-stone-200'
                                }`}
                                title={`Phase ${phaseNum}: ${isCompleted ? 'Completed' : isCurrent ? 'Active Execution' : 'Upcoming'}`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <h3 className="font-editorial text-2xl text-stone-900 font-medium mb-2 group-hover:text-amber-800 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                      {project.summary}
                    </p>

                    {/* Progress Bar & Numerical Metrics */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                        <span>Overall Goal Attainment</span>
                        <span className="font-semibold text-stone-800 tabular-nums">
                          {project.progressPercent}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-stone-900 rounded-full transition-all duration-500"
                          style={{ width: `${project.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Milestones Preview Strip */}
                    <div className="space-y-2 mb-6">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 flex items-center justify-between">
                        <span>Milestones Timeline</span>
                        <span className="text-stone-400">
                          {project.milestones.filter((m) => m.status === 'completed').length} / {project.milestones.length} Completed
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {project.milestones.slice(0, 3).map((m) => (
                          <div
                            key={m.id}
                            className="flex items-center justify-between text-xs py-1 px-2.5 rounded bg-stone-50 border border-stone-100"
                          >
                            <div className="flex items-center gap-2 truncate max-w-[280px]">
                              {m.status === 'completed' ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                              ) : m.status === 'in_progress' ? (
                                <Hourglass className="w-3.5 h-3.5 text-amber-700 shrink-0 animate-spin-slow" />
                              ) : (
                                <CircleDashed className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                              )}
                              <span className={`truncate ${m.status === 'completed' ? 'text-stone-500' : 'text-stone-800 font-medium'}`}>
                                {m.title}
                              </span>
                            </div>
                            <span className="font-mono text-[10px] text-stone-500 shrink-0 ml-2">
                              {m.quarter}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics Definitions */}
                    <div className="grid grid-cols-3 gap-2 p-3 bg-stone-50 rounded-lg border border-stone-100 text-center">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <div className="text-[10px] text-stone-500 uppercase font-mono">{m.label}</div>
                          <div className="text-xs font-semibold text-stone-900 tabular-nums">{m.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Latest Real-Time Update Teaser & Action */}
                <div className="px-6 sm:px-7 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between">
                  <div className="text-xs text-stone-500 truncate max-w-[260px] sm:max-w-xs">
                    <span className="font-mono text-amber-800 font-medium">Latest: </span>
                    <span>{project.updates[0]?.headline}</span>
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-3.5 py-1.5 bg-stone-900 text-white hover:bg-stone-800 rounded text-xs font-medium transition-colors inline-flex items-center gap-1.5 shrink-0"
                  >
                    <span>Full Ledger & Milestones</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Mode 2: Multi-Year Institutional Roadmap & Visual Timeline Matrix */}
        {viewMode === 'roadmap' && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 mb-16 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-stone-900 font-medium">
                  Institutional Master Timeline (2024 – 2030)
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xl">
                  Chronological alignment across all five library initiatives. Track start dates, target completions, active phase intersections, and institutional covenants.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-stone-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-stone-900" />
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-amber-600" />
                  <span>Active Phase</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-stone-300" />
                  <span>Future Arc</span>
                </div>
              </div>
            </div>

            {/* Timeline Axis Header */}
            <div className="mt-8 overflow-x-auto">
              <div className="min-w-[720px]">
                {/* Years Row */}
                <div className="grid grid-cols-6 border-b border-stone-200 pb-2 text-xs font-mono text-stone-400">
                  <div className="pl-2">2024</div>
                  <div className="pl-2">2025</div>
                  <div className="pl-2 font-bold text-amber-800">2026 (NOW)</div>
                  <div className="pl-2">2027</div>
                  <div className="pl-2">2028</div>
                  <div className="pl-2">2029+</div>
                </div>

                {/* Project Rows */}
                <div className="space-y-6 pt-6">
                  {filteredProjects.map((p) => {
                    return (
                      <div
                        key={p.id}
                        className="p-4 bg-stone-50/70 border border-stone-200 rounded-xl hover:bg-stone-50 hover:border-stone-400 transition-all cursor-pointer group"
                        onClick={() => setSelectedProject(p)}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono px-2 py-0.5 bg-stone-200 rounded text-stone-800 font-semibold">
                              {p.libraryLevel}
                            </span>
                            <span className="font-editorial text-lg text-stone-900 font-medium group-hover:text-amber-800 transition-colors">
                              {p.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-xs font-mono text-stone-500">
                            <span className="text-amber-900 font-semibold">{p.startDate} → {p.targetCompletionDate}</span>
                            <span className="font-bold text-stone-800 tabular-nums">{p.progressPercent}%</span>
                          </div>
                        </div>

                        {/* Visual Gantt Bar */}
                        <div className="relative w-full h-7 bg-stone-200 rounded-md overflow-hidden flex items-center">
                          {/* Visual representation of duration and progress */}
                          <div
                            className="h-full bg-stone-900 flex items-center justify-end pr-2 text-[10px] font-mono text-white"
                            style={{ width: `${p.progressPercent}%` }}
                          >
                            <span>Phase {p.currentPhaseNumber}/{p.totalPhases}</span>
                          </div>
                          <div
                            className="h-full bg-amber-600/80 flex items-center px-2 text-[10px] font-mono text-white animate-pulse"
                            style={{ width: `${Math.max(5, 100 - p.progressPercent)}%` }}
                          >
                            <span className="truncate">{p.durationLabel}</span>
                          </div>
                        </div>

                        {/* Key Milestones Pill Row */}
                        <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px] font-mono text-stone-600">
                          <span className="text-stone-400 uppercase text-[10px]">Key Dates:</span>
                          {p.milestones.map((m) => (
                            <span
                              key={m.id}
                              className={`px-2 py-0.5 rounded border text-[10px] ${
                                m.status === 'completed'
                                  ? 'bg-white border-stone-300 text-stone-600 line-through'
                                  : m.status === 'in_progress'
                                  ? 'bg-amber-100 border-amber-300 text-amber-900 font-semibold'
                                  : 'bg-white/80 border-stone-200 text-stone-400'
                              }`}
                            >
                              {m.quarter}: {m.title.split(' ')[0]} {m.title.split(' ')[1] || ''}...
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Real-Time Feed Rail */}
        <div className="bg-[#F7F4EE] border border-stone-200 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <h3 className="font-editorial text-xl sm:text-2xl text-stone-900 font-medium">
                Live Inter-Institutional Dispatch Feed
              </h3>
            </div>
            <div className="text-xs font-mono text-stone-500">
              Synchronized Relay: Zurich · Bern · Geneva · UN NYC
            </div>
          </div>

          <div className="space-y-3">
            {projects
              .flatMap((p) =>
                p.updates.map((u) => ({ ...u, projectTitle: p.title, projectLevel: p.libraryLevel }))
              )
              .slice(0, 5)
              .map((u) => (
                <div
                  key={u.id}
                  className="p-4 bg-white border border-stone-200/90 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-stone-400 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                      <span className="font-semibold text-stone-800">{u.institution}</span>
                      <span aria-hidden="true">·</span>
                      <span>{u.timestamp}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-800">{u.phase}</span>
                    </div>
                    <div className="text-sm font-semibold text-stone-900">{u.headline}</div>
                    <p className="text-xs text-stone-600 leading-relaxed max-w-3xl">{u.details}</p>
                  </div>

                  <div className="text-[11px] font-mono text-stone-400 shrink-0 self-start sm:self-center">
                    {u.author}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Project Detail Modal with Comprehensive Milestone Timeline */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#FBF9F5] border border-stone-300 rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-100">
              <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                <span>{selectedProject.libraryLevel}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedProject.leadInstitution}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-stone-800">{selectedProject.status}</span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-8">
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h3 className="font-editorial text-3xl text-stone-900 font-medium mb-2">
                  {selectedProject.title}
                </h3>
                <div className="text-xs font-mono text-stone-500 mb-4">
                  Lead Steward: {selectedProject.leadSteward} · Partners:{' '}
                  {selectedProject.partnerInstitutions.join(', ')}
                </div>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  {selectedProject.fullOverview}
                </p>
              </div>

              {/* Visual Timeline and Institutional Dates Card */}
              <div className="p-5 bg-white border border-stone-200 rounded-xl space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-stone-500 border-b border-stone-100 pb-3">
                  <span className="flex items-center gap-2 text-stone-900 font-semibold">
                    <Calendar className="w-4 h-4 text-amber-800" />
                    <span>Project Horizon: {selectedProject.startDate} to {selectedProject.targetCompletionDate}</span>
                  </span>
                  <span className="text-amber-800 font-medium">{selectedProject.durationLabel}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono text-stone-600">
                    <span>Current Phase: {selectedProject.currentPhase}</span>
                    <span className="font-bold text-stone-900">{selectedProject.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-stone-900 rounded-full"
                      style={{ width: `${selectedProject.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Horizon Category Tag */}
                <div className="flex items-center gap-2 text-xs font-mono text-stone-500 pt-1">
                  <span className="text-stone-400">Horizon Classification:</span>
                  <span className="px-2.5 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 rounded font-semibold">
                    {selectedProject.horizonCategory}
                  </span>
                </div>
              </div>

              {/* Full Milestones Detailed Timeline */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-4 flex items-center justify-between">
                  <span>Institutional Milestones & Target Dates</span>
                  <span>{selectedProject.milestones.length} Total Targets</span>
                </h4>
                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                  {selectedProject.milestones.map((milestone) => (
                    <div key={milestone.id} className="relative group">
                      {/* Milestone Dot on timeline */}
                      <div
                        className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center bg-white ${
                          milestone.status === 'completed'
                            ? 'border-emerald-700 text-emerald-700'
                            : milestone.status === 'in_progress'
                            ? 'border-amber-600 text-amber-600 ring-2 ring-amber-100'
                            : 'border-stone-300 text-stone-400'
                        }`}
                      >
                        {milestone.status === 'completed' ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : milestone.status === 'in_progress' ? (
                          <div className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                        )}
                      </div>

                      <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                          <span className="font-semibold text-stone-900">{milestone.quarter} ({milestone.targetDate})</span>
                          <span
                            className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${
                              milestone.status === 'completed'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : milestone.status === 'in_progress'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-stone-100 text-stone-600'
                            }`}
                          >
                            {milestone.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-stone-900">{milestone.title}</div>
                        {milestone.description && (
                          <p className="text-xs text-stone-600 leading-relaxed pt-1">
                            {milestone.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-white border border-stone-200 rounded-xl">
                {selectedProject.metrics.map((m, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-[11px] font-mono text-stone-500 uppercase">{m.label}</div>
                    <div className="text-base font-semibold text-stone-900 mt-1 tabular-nums">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chronological Dispatches Log */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-3">
                  Historical Dispatch Log
                </h4>
                <div className="space-y-3">
                  {selectedProject.updates.map((up) => (
                    <div key={up.id} className="p-4 bg-white border border-stone-200 rounded-lg">
                      <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-1">
                        <span>
                          {up.author} ({up.institution})
                        </span>
                        <span>{up.timestamp}</span>
                      </div>
                      <div className="text-sm font-semibold text-stone-900 mb-1">{up.headline}</div>
                      <p className="text-xs text-stone-600 leading-relaxed">{up.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-stone-100 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-stone-900 text-white rounded text-xs font-medium hover:bg-stone-800"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
