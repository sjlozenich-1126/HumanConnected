import React, { useState } from 'react';
import { Network, Mail, ShieldCheck, MapPin, Search, MessageSquare, Check, X } from 'lucide-react';
import { MemberProfile } from '../types';
import { MEMBERS_DATA } from '../data/membersData';

interface NetworkingDirectoryProps {
  onDirectDispatch: (recipientName: string, recipientOrg: string) => void;
}

export const NetworkingDirectory: React.FC<NetworkingDirectoryProps> = ({
  onDirectDispatch,
}) => {
  const [members, setMembers] = useState<MemberProfile[]>(MEMBERS_DATA);
  const [search, setSearch] = useState('');
  const [institutionFilter, setInstitutionFilter] = useState('all');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [activeMessageRecipient, setActiveMessageRecipient] = useState<MemberProfile | null>(null);
  const [quickMessageText, setQuickMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSendQuickMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMessageText.trim() || !activeMessageRecipient) return;

    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setActiveMessageRecipient(null);
      setQuickMessageText('');
    }, 2000);
  };

  const filteredMembers = members.filter((m) => {
    const matchesOrg = institutionFilter === 'all' || m.institution.includes(institutionFilter);
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.institution.toLowerCase().includes(search.toLowerCase()) ||
      m.focusArea.toLowerCase().includes(search.toLowerCase()) ||
      m.location.toLowerCase().includes(search.toLowerCase());
    return matchesOrg && matchesSearch;
  });

  return (
    <section id="network" className="py-16 sm:py-24 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
              <span>Human Network</span>
              <span aria-hidden="true">·</span>
              <span>Stewards, Fellows & Partners</span>
              <span aria-hidden="true">·</span>
              <span>Inter-Institutional Assembly</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl text-stone-900 tracking-tight font-normal mb-3">
              Fellows & Institutional Directory
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Connect directly with colleagues across Fiducia Centrale, Central Trust Securities, the UN, WHO, and Swiss International Archives.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              placeholder="Search directory..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-lg outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>
        </div>

        {/* Institution Filters */}
        <div className="flex items-center gap-2 pb-6 overflow-x-auto text-xs font-medium text-stone-600">
          <span className="text-stone-400 font-mono text-[11px] mr-1">Organization:</span>
          {['all', 'Fiducia Centrale', 'Central Trust Securities', 'Swiss International Archives', 'WHO', 'United Nations', 'The Collective'].map(
            (inst) => (
              <button
                key={inst}
                onClick={() => setInstitutionFilter(inst)}
                className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                  institutionFilter === inst ? 'bg-stone-900 text-white' : 'bg-stone-100 hover:bg-stone-200'
                }`}
              >
                {inst === 'all' ? 'All Institutions' : inst}
              </button>
            )
          )}
        </div>

        {/* Member Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => {
            const isBookmarked = bookmarkedIds.includes(member.id);
            return (
              <div
                key={member.id}
                className="bg-white border border-stone-200 rounded-xl p-6 flex flex-col justify-between hover:border-stone-400 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-stone-900 text-amber-100 flex items-center justify-center font-editorial text-xl font-medium shrink-0">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-editorial text-lg text-stone-900 font-medium group-hover:text-amber-800 transition-colors">
                            {member.name}
                          </h4>
                          {member.verified && (
                            <span title="Accredited Fellow">
                              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-stone-600 line-clamp-1">{member.title}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleBookmark(member.id)}
                      className={`text-xs px-2 py-0.5 rounded border transition-colors ${
                        isBookmarked
                          ? 'bg-amber-100 border-amber-300 text-amber-900 font-medium'
                          : 'bg-stone-50 border-stone-200 text-stone-500 hover:text-stone-900'
                      }`}
                    >
                      {isBookmarked ? 'Connected' : 'Connect'}
                    </button>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                      <span className="font-semibold text-stone-800">{member.institution}</span>
                      <span aria-hidden="true">·</span>
                      <span>Library {member.libraryLevel}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-stone-500">
                      <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                      <span>{member.location}</span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 pt-2">
                      {member.bio}
                    </p>
                  </div>

                  <div className="p-2.5 bg-stone-50 rounded border border-stone-100 text-[11px] text-stone-600 mb-4">
                    <span className="font-mono text-stone-400 block text-[10px] uppercase">
                      Core Focus
                    </span>
                    <span className="font-medium text-stone-800">{member.focusArea}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-stone-400 uppercase">
                    Center: {member.primaryCenter}
                  </span>

                  <button
                    onClick={() => setActiveMessageRecipient(member)}
                    className="px-3 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Dispatch</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Message Modal */}
      {activeMessageRecipient && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#FBF9F5] border border-stone-300 rounded-2xl shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <div>
                <div className="text-xs font-mono text-stone-500">DIRECT DISPATCH</div>
                <h3 className="font-editorial text-2xl text-stone-900 font-medium">
                  {activeMessageRecipient.name}
                </h3>
                <div className="text-xs text-stone-600">
                  {activeMessageRecipient.institution} · {activeMessageRecipient.location}
                </div>
              </div>
              <button
                onClick={() => setActiveMessageRecipient(null)}
                className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {messageSent ? (
              <div className="py-8 text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-700 mx-auto" />
                <div className="font-semibold text-stone-900 text-sm">
                  Dispatch Transmitted
                </div>
                <p className="text-xs text-stone-500">
                  Relayed via secure zero-trust channel to {activeMessageRecipient.name}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendQuickMessage} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Direct Liaison Note
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={quickMessageText}
                    onChange={(e) => setQuickMessageText(e.target.value)}
                    placeholder={`Write a coordination note or query to ${activeMessageRecipient.name}...`}
                    className="w-full text-xs p-3 bg-white border border-stone-300 rounded-lg outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-stone-400">
                    Channel: Restrictive Partner TLS
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveMessageRecipient(null)}
                      className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium"
                    >
                      Send Dispatch
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
