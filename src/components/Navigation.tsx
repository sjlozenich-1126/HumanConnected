import React from 'react';
import { Mail, User, Shield, Compass, BookOpen, Clock, Activity, Network, FileText, Sparkles } from 'lucide-react';
import { UserCurrentProfile } from '../types';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadDispatchesCount: number;
  onOpenEmail: () => void;
  onOpenProfile: () => void;
  onOpenChat: () => void;
  userProfile: UserCurrentProfile;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  unreadDispatchesCount,
  onOpenEmail,
  onOpenProfile,
  onOpenChat,
  userProfile,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('overview')}
            className="group text-left text-stone-900 focus-visible:outline-none"
          >
            <span className="font-editorial text-2xl lg:text-3xl tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
              The Collective
            </span>
            <span className="hidden sm:inline-block ml-3 text-xs tracking-widest uppercase font-sans text-stone-500 font-medium">
              Human Connected
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('overview')}
            className={`transition-colors py-1 relative hover:text-stone-900 whitespace-nowrap ${
              activeTab === 'overview' ? 'text-stone-900 font-semibold' : ''
            }`}
          >
            Overview
            {activeTab === 'overview' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('libraries')}
            className={`transition-colors py-1 relative hover:text-stone-900 whitespace-nowrap ${
              activeTab === 'libraries' ? 'text-stone-900 font-semibold' : ''
            }`}
          >
            5 Libraries
            {activeTab === 'libraries' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('centers')}
            className={`transition-colors py-1 relative hover:text-stone-900 whitespace-nowrap ${
              activeTab === 'centers' ? 'text-stone-900 font-semibold' : ''
            }`}
          >
            3 Centers Planner
            {activeTab === 'centers' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`transition-colors py-1 relative hover:text-stone-900 whitespace-nowrap ${
              activeTab === 'projects' ? 'text-stone-900 font-semibold' : ''
            }`}
          >
            Live Projects
            {activeTab === 'projects' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('modules')}
            className={`transition-colors py-1 relative hover:text-stone-900 whitespace-nowrap ${
              activeTab === 'modules' ? 'text-stone-900 font-semibold' : ''
            }`}
          >
            Training & Vault
            {activeTab === 'modules' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('network')}
            className={`transition-colors py-1 relative hover:text-stone-900 whitespace-nowrap ${
              activeTab === 'network' ? 'text-stone-900 font-semibold' : ''
            }`}
          >
            Network Directory
            {activeTab === 'network' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          {/* Council Advisor / Gemini Chatbot affordance */}
          <button
            onClick={onOpenChat}
            title="Open Council Synthesizer Advisor"
            className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors border border-stone-200/80 flex items-center gap-1.5 text-xs font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">Advisor</span>
          </button>

          {/* Dispatch Terminal / Email affordance */}
          <button
            onClick={onOpenEmail}
            title="Open Internal Dispatches & Comms"
            className="relative p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors border border-stone-200/80 flex items-center gap-1.5 text-xs font-medium"
          >
            <Mail className="w-4 h-4 text-stone-600" />
            <span className="hidden md:inline">Dispatches</span>
            {unreadDispatchesCount > 0 && (
              <span className="flex items-center justify-center w-4 h-4 text-[10px] font-mono text-white bg-amber-700 rounded-full font-semibold">
                {unreadDispatchesCount}
              </span>
            )}
          </button>

          {/* Profile Builder Affordance */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2.5 px-3 py-2 bg-stone-900 text-stone-100 rounded-lg hover:bg-stone-800 transition-colors text-xs font-medium whitespace-nowrap"
          >
            <div className="w-5 h-5 rounded-full bg-amber-600 text-[10px] text-white flex items-center justify-center font-serif font-bold">
              {userProfile.name.charAt(0)}
            </div>
            <span className="hidden sm:inline max-w-[120px] truncate">{userProfile.name}</span>
            <span className="text-[10px] text-stone-400 border-l border-stone-700 pl-2 hidden md:inline">
              {userProfile.primaryLibrary}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile navigation row */}
      <div className="lg:hidden flex items-center justify-around border-t border-stone-200/70 py-2.5 px-2 bg-[#FBF9F5] text-xs text-stone-600 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-2 py-1 whitespace-nowrap font-medium ${activeTab === 'overview' ? 'text-stone-950 font-bold border-b border-stone-900' : ''}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('libraries')}
          className={`px-2 py-1 whitespace-nowrap font-medium ${activeTab === 'libraries' ? 'text-stone-950 font-bold border-b border-stone-900' : ''}`}
        >
          5 Libraries
        </button>
        <button
          onClick={() => setActiveTab('centers')}
          className={`px-2 py-1 whitespace-nowrap font-medium ${activeTab === 'centers' ? 'text-stone-950 font-bold border-b border-stone-900' : ''}`}
        >
          3 Centers
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-2 py-1 whitespace-nowrap font-medium ${activeTab === 'projects' ? 'text-stone-950 font-bold border-b border-stone-900' : ''}`}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveTab('modules')}
          className={`px-2 py-1 whitespace-nowrap font-medium ${activeTab === 'modules' ? 'text-stone-950 font-bold border-b border-stone-900' : ''}`}
        >
          Modules & Vault
        </button>
        <button
          onClick={() => setActiveTab('network')}
          className={`px-2 py-1 whitespace-nowrap font-medium ${activeTab === 'network' ? 'text-stone-950 font-bold border-b border-stone-900' : ''}`}
        >
          Network
        </button>
      </div>
    </header>
  );
};
