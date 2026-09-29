/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { FiveLibrariesSection } from './components/FiveLibrariesSection';
import { LibraryDetailModal } from './components/LibraryDetailModal';
import { ThreeCentersPlanner } from './components/ThreeCentersPlanner';
import { ProjectsTracker } from './components/ProjectsTracker';
import { InternalEmailTerminal } from './components/InternalEmailTerminal';
import { TrainingModulesSection } from './components/TrainingModulesSection';
import { ResourceVault } from './components/ResourceVault';
import { NetworkingDirectory } from './components/NetworkingDirectory';
import { ProfileBuilderModal } from './components/ProfileBuilderModal';
import { CouncilChatbotModal } from './components/CouncilChatbotModal';
import { Sparkles } from 'lucide-react';

import { LibraryDetail, InternalDispatch, UserCurrentProfile } from './types';
import { LIBRARIES_DATA } from './data/librariesData';
import { INITIAL_DISPATCHES } from './data/dispatchesData';

const DEFAULT_USER_PROFILE: UserCurrentProfile = {
  name: 'Shane C.',
  title: 'Steward of the Human Continuum',
  institution: 'The Collective',
  primaryLibrary: 'L1',
  primaryCenter: 'transitional',
  bio: 'Coordinating the foundational architecture of The Collective across Fiducia Centrale, Central Trust Securities, the UN, WHO, and Swiss International Archives.',
  location: 'Geneva / Global Nodes',
  email: 'steward@thecollective.earth',
  securityClearance: 'COUNCIL PLENIPOTENTIARY',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedLibrary, setSelectedLibrary] = useState<LibraryDetail | null>(null);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [dispatches, setDispatches] = useState<InternalDispatch[]>(() => {
    const saved = localStorage.getItem('collective_dispatches');
    return saved ? JSON.parse(saved) : INITIAL_DISPATCHES;
  });

  const [userProfile, setUserProfile] = useState<UserCurrentProfile>(() => {
    const saved = localStorage.getItem('collective_user_profile');
    return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('collective_dispatches', JSON.stringify(dispatches));
  }, [dispatches]);

  const unreadCount = dispatches.filter((d) => !d.read).length;

  const handleSelectAnotherLibrary = (libId: string) => {
    const found = LIBRARIES_DATA.find((l) => l.id === libId);
    if (found) setSelectedLibrary(found);
  };

  const handleDirectDispatchFromNetwork = (recipientName: string, recipientOrg: string) => {
    setIsEmailOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-stone-900 selection:bg-amber-100 selection:text-stone-900">
      {/* Strict 3-Zone Navigation Top Bar */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadDispatchesCount={unreadCount}
        onOpenEmail={() => setIsEmailOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        userProfile={userProfile}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <div>
            <HeroSection
              onNavigateToLibraries={() => setActiveTab('libraries')}
              onNavigateToCenters={() => setActiveTab('centers')}
              onNavigateToProjects={() => setActiveTab('projects')}
              onSelectLibrary={(lib) => setSelectedLibrary(lib)}
              libraries={LIBRARIES_DATA}
            />

            {/* In overview, we show the 5 Libraries & 3 Centers in streamlined sequence */}
            <FiveLibrariesSection
              libraries={LIBRARIES_DATA}
              onSelectLibrary={(lib) => setSelectedLibrary(lib)}
            />

            <ThreeCentersPlanner />

            <ProjectsTracker />
          </div>
        )}

        {activeTab === 'libraries' && (
          <div className="py-6">
            <FiveLibrariesSection
              libraries={LIBRARIES_DATA}
              onSelectLibrary={(lib) => setSelectedLibrary(lib)}
            />
          </div>
        )}

        {activeTab === 'centers' && (
          <div className="py-6">
            <ThreeCentersPlanner />
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="py-6">
            <ProjectsTracker />
          </div>
        )}

        {activeTab === 'modules' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
            <TrainingModulesSection />
            <ResourceVault />
          </div>
        )}

        {activeTab === 'network' && (
          <div className="py-6">
            <NetworkingDirectory onDirectDispatch={handleDirectDispatchFromNetwork} />
          </div>
        )}
      </main>

      {/* Institutional Editorial Footer */}
      <footer className="border-t border-stone-200 bg-[#F7F4EE] py-14 text-stone-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            <div className="md:col-span-4 space-y-3">
              <div className="font-editorial text-2xl text-stone-900 font-medium">
                The Collective
              </div>
              <div className="text-xs uppercase tracking-widest font-mono text-stone-500">
                Human Connected · Psychrosphere L1
              </div>
              <p className="text-stone-600 leading-relaxed max-w-sm">
                A shared sanctuary for people, institutions, and ideas working across borders. Uniting Fiducia Centrale, Central Trust Securities, the United Nations, World Health Organization, and Swiss International Archives.
              </p>
            </div>

            <div className="md:col-span-2 space-y-2">
              <div className="font-semibold text-stone-900 uppercase font-mono text-[11px] tracking-wider">
                The 5 Libraries
              </div>
              <ul className="space-y-1.5 text-stone-600">
                <li>
                  <button onClick={() => setSelectedLibrary(LIBRARIES_DATA[0])} className="hover:text-stone-950 text-left">
                    I. Conditions (Collective)
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedLibrary(LIBRARIES_DATA[1])} className="hover:text-stone-950 text-left">
                    II. Meaning (Fiducia)
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedLibrary(LIBRARIES_DATA[2])} className="hover:text-stone-950 text-left">
                    III. Boundaries (UN/WHO)
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedLibrary(LIBRARIES_DATA[3])} className="hover:text-stone-950 text-left">
                    IV. Systems (CTS/Archives)
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedLibrary(LIBRARIES_DATA[4])} className="hover:text-stone-950 text-left">
                    V. Deeds (Operations)
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-2">
              <div className="font-semibold text-stone-900 uppercase font-mono text-[11px] tracking-wider">
                The Three Centers
              </div>
              <ul className="space-y-1.5 text-stone-600">
                <li>
                  <button onClick={() => setActiveTab('centers')} className="hover:text-stone-950 text-left">
                    Immediate Center (Minute → Hour)
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('centers')} className="hover:text-stone-950 text-left">
                    Transitional Center (Month → Month)
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('centers')} className="hover:text-stone-950 text-left">
                    Generational Center (Year → Year)
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-2">
              <div className="font-semibold text-stone-900 uppercase font-mono text-[11px] tracking-wider">
                Institutional Portals
              </div>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setIsEmailOpen(true)}
                  className="text-left hover:text-stone-950"
                >
                  Secure Dispatch Terminal
                </button>
                <button
                  onClick={() => setActiveTab('modules')}
                  className="text-left hover:text-stone-950"
                >
                  Curricula & Resource Vault
                </button>
                <button
                  onClick={() => setActiveTab('network')}
                  className="text-left hover:text-stone-950"
                >
                  Fellows & Member Directory
                </button>
                <button
                  onClick={() => setIsProfileOpen(true)}
                  className="text-left hover:text-stone-950"
                >
                  Professional Profile Settings
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-stone-500">
            <div>
              © 2026 The Collective — Internal Community for Sovereign Stewards & Institutions.
            </div>
            <div className="flex items-center gap-4">
              <span>Geneva</span>
              <span aria-hidden="true">·</span>
              <span>Zurich</span>
              <span aria-hidden="true">·</span>
              <span>Bern</span>
              <span aria-hidden="true">·</span>
              <span>New York</span>
              <span aria-hidden="true">·</span>
              <span>Vienna</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Council Advisor Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-30 px-4 py-2.5 bg-stone-900 text-stone-100 rounded-full shadow-lg hover:bg-stone-800 transition-all flex items-center gap-2 border border-stone-700/80 group"
        title="Open Council Synthesizer Advisor (Gemini AI)"
      >
        <Sparkles className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-medium">Council Advisor</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
      </button>

      {/* Popups & Modals */}
      <LibraryDetailModal
        library={selectedLibrary}
        onClose={() => setSelectedLibrary(null)}
        onSelectAnother={handleSelectAnotherLibrary}
        allLibraries={LIBRARIES_DATA}
      />

      <InternalEmailTerminal
        isOpen={isEmailOpen}
        onClose={() => setIsEmailOpen(false)}
        dispatches={dispatches}
        setDispatches={setDispatches}
      />

      <ProfileBuilderModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={userProfile}
        setProfile={setUserProfile}
      />

      <CouncilChatbotModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}
