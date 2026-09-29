import React, { useState } from 'react';
import {
  Mail,
  X,
  Send,
  Star,
  Inbox,
  SendHorizontal,
  FileCheck,
  Shield,
  Search,
  CheckCircle2,
  Paperclip,
  Trash2,
} from 'lucide-react';
import { InternalDispatch } from '../types';

interface InternalEmailTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  dispatches: InternalDispatch[];
  setDispatches: React.Dispatch<React.SetStateAction<InternalDispatch[]>>;
}

export const InternalEmailTerminal: React.FC<InternalEmailTerminalProps> = ({
  isOpen,
  onClose,
  dispatches,
  setDispatches,
}) => {
  const [activeFolder, setActiveFolder] = useState<string>('inbox');
  const [selectedDispatchId, setSelectedDispatchId] = useState<string | null>(
    dispatches[0]?.id || null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  // New compose form state
  const [composeRecipient, setComposeRecipient] = useState(
    'Fiducia Centrale — Executive Secretariat'
  );
  const [composeSubject, setComposeSubject] = useState('');
  const [composeCategory, setComposeCategory] = useState<InternalDispatch['category']>('Directive');
  const [composeContent, setComposeContent] = useState('');
  const [composeClassification, setComposeClassification] =
    useState<InternalDispatch['classification']>('RESTRICTED - INTERNAL');
  const [sentNotice, setSentNotice] = useState(false);

  if (!isOpen) return null;

  const currentDispatch = dispatches.find((d) => d.id === selectedDispatchId);

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDispatches((prev) =>
      prev.map((d) => (d.id === id ? { ...d, starred: !d.starred } : d))
    );
  };

  const handleSelectDispatch = (id: string) => {
    setSelectedDispatchId(id);
    setDispatches((prev) =>
      prev.map((d) => (d.id === id ? { ...d, read: true } : d))
    );
  };

  const handleSendDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeSubject.trim() || !composeContent.trim()) return;

    const newDisp: InternalDispatch = {
      id: `disp-${Date.now()}`,
      sender: 'Current Steward (User Session)',
      senderTitle: 'Accredited Institutional Liaison',
      senderOrg: 'The Collective / Inter-Institutional Desk',
      recipient: composeRecipient,
      subject: composeSubject.trim(),
      timestamp: 'Just now',
      category: composeCategory,
      read: true,
      starred: false,
      classification: composeClassification,
      content: composeContent.trim(),
    };

    setDispatches([newDisp, ...dispatches]);
    setSelectedDispatchId(newDisp.id);
    setIsComposing(false);
    setComposeSubject('');
    setComposeContent('');
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 3000);
  };

  const filteredDispatches = dispatches.filter((d) => {
    const matchesSearch =
      d.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.content.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeFolder === 'starred') return d.starred;
    if (activeFolder === 'directives') return d.category === 'Directive';
    if (activeFolder === 'archival') return d.category === 'Archival';
    if (activeFolder === 'field') return d.category === 'Field Report';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[88vh] bg-[#FBF9F5] border border-stone-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-3.5 border-b border-stone-200 bg-stone-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-amber-800" />
            <span className="font-editorial text-xl text-stone-900 font-medium">
              The Collective Secure Dispatch Terminal
            </span>
            <span className="text-[11px] font-mono text-stone-500 hidden sm:inline">
              [Encrypted Internal Relay · Fiducia Centrale / CTS / UN / WHO / SIA]
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full"
            aria-label="Close Email Terminal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sent Notice Toast */}
        {sentNotice && (
          <div className="bg-emerald-800 text-white text-xs py-2 px-4 text-center font-mono animate-in slide-in-from-top duration-300 shrink-0">
            Dispatch successfully broadcast to recipient hub with cryptographic receipt.
          </div>
        )}

        {/* Layout: Sidebar + List + Detail / Compose */}
        <div className="flex-1 flex overflow-hidden">
          {/* Folders Navigation Column */}
          <div className="w-48 sm:w-56 border-r border-stone-200 bg-stone-50/70 p-3 sm:p-4 flex flex-col justify-between shrink-0">
            <div className="space-y-4">
              <button
                onClick={() => setIsComposing(true)}
                className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>New Dispatch</span>
              </button>

              <div className="space-y-1 text-xs">
                <button
                  onClick={() => {
                    setActiveFolder('inbox');
                    setIsComposing(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between font-medium transition-colors ${
                    activeFolder === 'inbox' && !isComposing
                      ? 'bg-stone-200 text-stone-900'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Inbox className="w-3.5 h-3.5" />
                    <span>All Inbound</span>
                  </div>
                  <span className="font-mono text-[10px] text-stone-500">{dispatches.length}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveFolder('starred');
                    setIsComposing(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between font-medium transition-colors ${
                    activeFolder === 'starred' && !isComposing
                      ? 'bg-stone-200 text-stone-900'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 text-amber-600" />
                    <span>Starred</span>
                  </div>
                  <span className="font-mono text-[10px] text-stone-500">
                    {dispatches.filter((d) => d.starred).length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveFolder('directives');
                    setIsComposing(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between font-medium transition-colors ${
                    activeFolder === 'directives' && !isComposing
                      ? 'bg-stone-200 text-stone-900'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Directives</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveFolder('archival');
                    setIsComposing(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between font-medium transition-colors ${
                    activeFolder === 'archival' && !isComposing
                      ? 'bg-stone-200 text-stone-900'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Archival Gazettes</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveFolder('field');
                    setIsComposing(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between font-medium transition-colors ${
                    activeFolder === 'field' && !isComposing
                      ? 'bg-stone-200 text-stone-900'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <SendHorizontal className="w-3.5 h-3.5" />
                    <span>Field Reports</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="p-2 bg-white rounded border border-stone-200 text-[10px] text-stone-500 font-mono">
              <span className="block font-semibold text-stone-700">CTS Node 087</span>
              Zero-Trust TLS Verified
            </div>
          </div>

          {/* Dispatches List Column */}
          <div className="w-72 sm:w-88 border-r border-stone-200 flex flex-col bg-white shrink-0">
            {/* Search Box */}
            <div className="p-3 border-b border-stone-200">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search dispatches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-1.5 bg-stone-100 border border-stone-200 rounded outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
              {filteredDispatches.length === 0 ? (
                <div className="p-8 text-center text-xs text-stone-400 font-mono">
                  No matching dispatches.
                </div>
              ) : (
                filteredDispatches.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => {
                      handleSelectDispatch(d.id);
                      setIsComposing(false);
                    }}
                    className={`p-3.5 cursor-pointer transition-colors ${
                      selectedDispatchId === d.id && !isComposing
                        ? 'bg-amber-50/60 border-l-3 border-amber-700'
                        : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-1">
                      <span className="font-semibold text-stone-800 truncate max-w-[170px]">
                        {d.sender.split(' ')[0]} {d.sender.split(' ')[1] || ''}
                      </span>
                      <span>{d.timestamp}</span>
                    </div>

                    <div
                      className={`text-xs mb-1 line-clamp-1 ${
                        !d.read ? 'font-bold text-stone-950' : 'text-stone-800'
                      }`}
                    >
                      {d.subject}
                    </div>

                    <div className="text-[11px] text-stone-500 line-clamp-2 leading-snug">
                      {d.content}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1">
                      <span className="text-[10px] font-mono text-stone-400 uppercase">
                        {d.category}
                      </span>
                      <button
                        onClick={(e) => toggleStar(d.id, e)}
                        className="text-stone-300 hover:text-amber-600 transition-colors p-0.5"
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            d.starred ? 'fill-amber-500 text-amber-500' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Detail View or Compose Area */}
          <div className="flex-1 flex flex-col bg-[#FBF9F5] overflow-y-auto">
            {isComposing ? (
              /* Compose New Dispatch Form */
              <form onSubmit={handleSendDispatch} className="p-6 sm:p-8 space-y-4 max-w-2xl mx-auto w-full">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <h3 className="font-editorial text-2xl text-stone-900 font-medium">
                    Transmit Encrypted Dispatch
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsComposing(false)}
                    className="text-xs text-stone-500 hover:text-stone-900"
                  >
                    Cancel
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-500 mb-1">
                    DESTINATION INSTITUTION
                  </label>
                  <select
                    value={composeRecipient}
                    onChange={(e) => setComposeRecipient(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-stone-300 rounded outline-none"
                  >
                    <option>Fiducia Centrale — Executive Secretariat</option>
                    <option>Central Trust Securities — Threat Response Desk</option>
                    <option>Swiss International Archives — Lineage Custody</option>
                    <option>United Nations — World Systems Council Assembly</option>
                    <option>World Health Organization — Field Logistics Office</option>
                    <option>The Collective — Fellowship Council</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-500 mb-1">
                      DISPATCH CATEGORY
                    </label>
                    <select
                      value={composeCategory}
                      onChange={(e) =>
                        setComposeCategory(e.target.value as InternalDispatch['category'])
                      }
                      className="w-full text-xs p-2 bg-white border border-stone-300 rounded outline-none"
                    >
                      <option value="Directive">Directive</option>
                      <option value="Diplomatic">Diplomatic</option>
                      <option value="Archival">Archival</option>
                      <option value="Field Report">Field Report</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-500 mb-1">
                      CLASSIFICATION
                    </label>
                    <select
                      value={composeClassification}
                      onChange={(e) =>
                        setComposeClassification(
                          e.target.value as InternalDispatch['classification']
                        )
                      }
                      className="w-full text-xs p-2 bg-white border border-stone-300 rounded outline-none"
                    >
                      <option value="RESTRICTED - INTERNAL">RESTRICTED - INTERNAL</option>
                      <option value="COUNCIL CONFIDENTIAL">COUNCIL CONFIDENTIAL</option>
                      <option value="ARCHIVAL OPEN">ARCHIVAL OPEN</option>
                      <option value="STABILIZATION MEMO">STABILIZATION MEMO</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-500 mb-1">SUBJECT</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief description of the council subject"
                    value={composeSubject}
                    onChange={(e) => setComposeSubject(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-stone-300 rounded outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-500 mb-1">
                    DISPATCH BODY
                  </label>
                  <textarea
                    rows={8}
                    required
                    placeholder="Enter formal dispatch content..."
                    value={composeContent}
                    onChange={(e) => setComposeContent(e.target.value)}
                    className="w-full text-xs p-3 bg-white border border-stone-300 rounded outline-none focus:ring-1 focus:ring-stone-900 font-sans leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-stone-400">
                    Signing key: ED25519-SIA-VAULT-2026
                  </span>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Dispatch</span>
                  </button>
                </div>
              </form>
            ) : currentDispatch ? (
              /* Reading Selected Dispatch */
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Classification Ribbon */}
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
                    <span className="text-[11px] font-mono tracking-widest uppercase px-2.5 py-1 bg-stone-200 text-stone-800 rounded font-semibold">
                      {currentDispatch.classification}
                    </span>
                    <span className="text-xs font-mono text-stone-500">
                      {currentDispatch.timestamp}
                    </span>
                  </div>

                  {/* Subject */}
                  <h3 className="font-editorial text-2xl sm:text-3xl text-stone-900 font-normal mb-4">
                    {currentDispatch.subject}
                  </h3>

                  {/* Sender & Recipient Box */}
                  <div className="p-4 bg-white border border-stone-200 rounded-xl mb-6 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 font-mono">FROM:</span>
                      <span className="font-semibold text-stone-900">
                        {currentDispatch.sender} ({currentDispatch.senderTitle})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 font-mono">ORGANIZATION:</span>
                      <span className="text-stone-700">{currentDispatch.senderOrg}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500 font-mono">TO:</span>
                      <span className="text-stone-700">{currentDispatch.recipient}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="prose text-stone-800 text-sm leading-relaxed whitespace-pre-line font-sans">
                    {currentDispatch.content}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-6 mt-8 border-t border-stone-200 flex items-center justify-between">
                  <div className="text-xs font-mono text-stone-400">
                    ID: {currentDispatch.id} · Cryptographically Verified
                  </div>
                  <button
                    onClick={() => {
                      setIsComposing(true);
                      setComposeRecipient(currentDispatch.sender);
                      setComposeSubject(`RE: ${currentDispatch.subject}`);
                    }}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Reply to Sender</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-xs text-stone-400 font-mono">
                Select a dispatch from the list to view.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
