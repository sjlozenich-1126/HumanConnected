import React, { useState, useEffect } from 'react';
import {
  Clock,
  Compass,
  Sun,
  Plus,
  CheckCircle2,
  Circle,
  Trash2,
  Download,
  RotateCcw,
  Sparkles,
  Heart,
  Calendar,
  Layers,
  Check,
} from 'lucide-react';
import { CenterDetail, CenterId, PlanItem } from '../types';
import { CENTERS_DATA, INITIAL_PLAN_ITEMS } from '../data/centersData';

export const ThreeCentersPlanner: React.FC = () => {
  const [selectedCenter, setSelectedCenter] = useState<'all' | CenterId>('all');
  const [planItems, setPlanItems] = useState<PlanItem[]>(() => {
    const saved = localStorage.getItem('collective_plan_items');
    return saved ? JSON.parse(saved) : INITIAL_PLAN_ITEMS;
  });

  // State for new plan form
  const [newTitle, setNewTitle] = useState('');
  const [newCenter, setNewCenter] = useState<CenterId>('immediate');
  const [newTimeframe, setNewTimeframe] = useState('');
  const [newCategory, setNewCategory] = useState('Presence & Focus');
  const [newNotes, setNewNotes] = useState('');
  const [isAddingOpen, setIsAddingOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Breathing pacer state for Immediate Center
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathCounter, setBreathCounter] = useState(4);
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  useEffect(() => {
    localStorage.setItem('collective_plan_items', JSON.stringify(planItems));
  }, [planItems]);

  // Breathing timer effect
  useEffect(() => {
    if (!isBreathingActive) return;
    const interval = setInterval(() => {
      setBreathCounter((prev) => {
        if (prev <= 1) {
          if (breathPhase === 'Inhale') {
            setBreathPhase('Hold');
            return 4;
          } else if (breathPhase === 'Hold') {
            setBreathPhase('Exhale');
            return 6;
          } else {
            setBreathPhase('Inhale');
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isBreathingActive, breathPhase]);

  const toggleComplete = (id: string) => {
    setPlanItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const deleteItem = (id: string) => {
    setPlanItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: PlanItem = {
      id: `plan-${Date.now()}`,
      centerId: newCenter,
      title: newTitle.trim(),
      timeframe: newTimeframe.trim() || (newCenter === 'immediate' ? 'Today' : newCenter === 'transitional' ? 'This Month' : '2026–2030'),
      category: newCategory,
      notes: newNotes.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setPlanItems([newItem, ...planItems]);
    setNewTitle('');
    setNewTimeframe('');
    setNewNotes('');
    setIsAddingOpen(false);
  };

  const handleResetToPresets = () => {
    if (window.confirm('Reset plan items to institutional default templates?')) {
      setPlanItems(INITIAL_PLAN_ITEMS);
    }
  };

  const handleExportSchedule = () => {
    const text = planItems
      .map(
        (i) =>
          `[${i.completed ? 'X' : ' '}] (${i.centerId.toUpperCase()}) ${i.title} - ${i.timeframe} [${i.category}]`
      )
      .join('\n');
    navigator.clipboard.writeText(
      `THE COLLECTIVE — THREE CENTERS HUMAN CONTINUUM PLAN\n\n${text}\n\nGenerated: ${new Date().toLocaleDateString()}`
    );
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const filteredItems =
    selectedCenter === 'all'
      ? planItems
      : planItems.filter((i) => i.centerId === selectedCenter);

  return (
    <section id="centers" className="py-16 sm:py-24 border-b border-stone-200 bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500 mb-3">
            <span>The Human Continuum</span>
            <span aria-hidden="true">·</span>
            <span>Three Developmental Dimensions</span>
            <span aria-hidden="true">·</span>
            <span>Action, Rhythm & Legacy</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl text-stone-900 tracking-tight font-normal mb-4">
            The Three Centers of Human Progress
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            A three-dimensional planning model that governs how humans grow, act, and progress across time:
            from <strong className="text-stone-900 font-medium">minute to hour</strong> (Immediate), to{' '}
            <strong className="text-stone-900 font-medium">month to month</strong> (Transitional), to{' '}
            <strong className="text-stone-900 font-medium">year to year</strong> (Generational).
          </p>
        </div>

        {/* Center Philosophy Cards & Duality Mapping */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CENTERS_DATA.map((c) => {
            const isSelected = selectedCenter === c.id;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedCenter(c.id)}
                className={`p-6 sm:p-7 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white border-stone-900 shadow-md ring-1 ring-stone-900'
                    : 'bg-white/80 border-stone-200 hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-3">
                  <span>CENTER {c.number}</span>
                  <span className="font-semibold text-amber-800">{c.scale}</span>
                </div>

                <h3 className="font-editorial text-2xl text-stone-900 font-medium mb-1">
                  {c.name}
                </h3>
                <div className="text-xs font-serif italic text-stone-500 mb-3">
                  {c.ancientName}
                </div>

                <div className="text-xs uppercase tracking-wider font-semibold text-stone-800 mb-3 font-mono">
                  {c.definition}
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {c.description}
                </p>

                <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500">
                  <span className="font-mono text-stone-400 block mb-1">Governs:</span>
                  <ul className="space-y-0.5 text-stone-700">
                    {c.governs.slice(0, 3).map((g, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-amber-700" />
                        <span className="truncate">{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dual Stack Comparison Ribbon: Fiducia Centrale (L2) <-> The Collective (L1) */}
        <div className="p-6 bg-stone-100/80 border border-stone-200 rounded-xl mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-stone-500">
                Structural Correspondence
              </div>
              <h4 className="font-editorial text-lg text-stone-900 font-medium">
                How The Three Centers Mirror Fiducia Centrale While Staying in L1
              </h4>
            </div>
            <div className="text-xs text-stone-500 font-mono">
              L1 Natural Science (Living Reality) ↔ L2 Social Science (Ideological Trust)
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white border border-stone-200 rounded-lg">
              <span className="font-mono text-stone-400 block text-[10px]">AXIAL PIVOT</span>
              <div className="font-semibold text-stone-900 mt-0.5">Clock Center ↔ Immediate Center</div>
              <div className="text-stone-500 mt-1">Trust in motion ↔ Biological breath & presence</div>
            </div>
            <div className="p-3 bg-white border border-stone-200 rounded-lg">
              <span className="font-mono text-stone-400 block text-[10px]">CHRONOLOGICAL MERIDIAN</span>
              <div className="font-semibold text-stone-900 mt-0.5">Temporal Center ↔ Transitional Center</div>
              <div className="text-stone-500 mt-1">Reconciliation of time ↔ Behavioral & seasonal rhythms</div>
            </div>
            <div className="p-3 bg-white border border-stone-200 rounded-lg">
              <span className="font-mono text-stone-400 block text-[10px]">GRAVITATIONAL CENTER</span>
              <div className="font-semibold text-stone-900 mt-0.5">Cosmic Center ↔ Generational Center</div>
              <div className="text-stone-500 mt-1">Authority by constancy ↔ Biological continuity & legacy</div>
            </div>
          </div>
        </div>

        {/* Interactive Planner Section */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <h3 className="font-editorial text-2xl text-stone-900 font-medium">
                Three Centers Schedule & Action Ledger
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Organize presence, monthly cadence, and multi-year generational arcs in one cohesive timeline.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg overflow-x-auto">
              <button
                onClick={() => setSelectedCenter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  selectedCenter === 'all'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Centers
              </button>
              <button
                onClick={() => setSelectedCenter('immediate')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  selectedCenter === 'immediate'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Immediate (Min→Hr)
              </button>
              <button
                onClick={() => setSelectedCenter('transitional')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  selectedCenter === 'transitional'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Transitional (Mo→Mo)
              </button>
              <button
                onClick={() => setSelectedCenter('generational')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  selectedCenter === 'generational'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Generational (Yr→Yr)
              </button>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddingOpen(!isAddingOpen)}
                className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAddingOpen ? 'Close Form' : 'New Plan Commitment'}</span>
              </button>
              <button
                onClick={handleResetToPresets}
                title="Reset to institutional presets"
                className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded transition-colors border border-stone-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Optional Somatic Breath Pacer Toggle for Center 1 */}
              <button
                onClick={() => setIsBreathingActive(!isBreathingActive)}
                className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 border transition-colors ${
                  isBreathingActive
                    ? 'bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  {isBreathingActive ? `Breathing Pacer (${breathPhase} ${breathCounter}s)` : 'Somatic Breath Pacer'}
                </span>
              </button>

              <button
                onClick={handleExportSchedule}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-medium flex items-center gap-1.5 transition-colors border border-stone-200"
              >
                {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5" />}
                <span>{copySuccess ? 'Copied to Clipboard!' : 'Export Plan'}</span>
              </button>
            </div>
          </div>

          {/* New Item Form Drawer */}
          {isAddingOpen && (
            <form onSubmit={handleAddItem} className="p-5 bg-stone-50 border border-stone-200 rounded-xl my-4 space-y-4 animate-in fade-in duration-200">
              <div className="font-semibold text-xs text-stone-800 uppercase tracking-wider font-mono">
                Add New Commitment to the Human Continuum
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Center</label>
                  <select
                    value={newCenter}
                    onChange={(e) => setNewCenter(e.target.value as CenterId)}
                    className="w-full text-xs p-2 bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 outline-none"
                  >
                    <option value="immediate">Immediate Center (Minute → Hour)</option>
                    <option value="transitional">Transitional Center (Month → Month)</option>
                    <option value="generational">Generational Center (Year → Year)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Timeframe / Interval</label>
                  <input
                    type="text"
                    placeholder="e.g. Next 45 min, Oct 2026, or 2026–2035"
                    value={newTimeframe}
                    onChange={(e) => setNewTimeframe(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Presence, Archival, Habit, Sovereign Bio"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Title / Commitment</label>
                <input
                  type="text"
                  required
                  placeholder="Describe the action, routine, or long-arc covenant"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Operational Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="Context, partner coordination or empirical guidelines"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingOpen(false)}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium"
                >
                  Save Commitment
                </button>
              </div>
            </form>
          )}

          {/* List of Plan Items */}
          <div className="divide-y divide-stone-100 mt-2">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-stone-400 text-xs font-mono">
                No active commitments in this center view. Click &quot;New Plan Commitment&quot; to begin.
              </div>
            ) : (
              filteredItems.map((item) => {
                const centerMeta = CENTERS_DATA.find((c) => c.id === item.centerId);
                return (
                  <div
                    key={item.id}
                    className="py-4 flex items-start justify-between gap-4 group hover:bg-stone-50/50 px-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <button
                        onClick={() => toggleComplete(item.id)}
                        className="mt-0.5 text-stone-400 hover:text-stone-900 transition-colors shrink-0"
                        aria-label={item.completed ? 'Mark incomplete' : 'Mark complete'}
                      >
                        {item.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </button>

                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                          <span className="font-semibold text-stone-700">
                            {centerMeta?.name.replace('The ', '')}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{item.timeframe}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-800">{item.category}</span>
                        </div>

                        <div
                          className={`text-sm text-stone-900 font-medium ${
                            item.completed ? 'line-through text-stone-400' : ''
                          }`}
                        >
                          {item.title}
                        </div>

                        {item.notes && (
                          <p className="text-xs text-stone-500 leading-relaxed">
                            {item.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => deleteItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-stone-400 hover:text-rose-700 rounded transition-opacity"
                      title="Remove commitment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
