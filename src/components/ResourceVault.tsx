import React, { useState } from 'react';
import { FileText, Download, Search, BookOpen, ArrowUpRight, X, Shield } from 'lucide-react';
import { DocumentResource } from '../types';
import { DOCUMENT_RESOURCES } from '../data/resourcesData';

export const ResourceVault: React.FC = () => {
  const [resources] = useState<DocumentResource[]>(DOCUMENT_RESOURCES);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDoc, setActiveDoc] = useState<DocumentResource | null>(null);

  const filtered = resources.filter((doc) => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.description.toLowerCase().includes(search.toLowerCase()) ||
      doc.institution.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pt-8">
      {/* Top Deck */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
            <span>Institutional Codex</span>
            <span aria-hidden="true">·</span>
            <span>Archival Accession</span>
            <span aria-hidden="true">·</span>
            <span>Unclassified Repository</span>
          </div>
          <h3 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-normal">
            The Archival Resource Vault
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Foundational treaties, blueprints, whitepapers, and operational covenants preserved across the five libraries.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
          <input
            type="text"
            placeholder="Search repository..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-lg outline-none focus:ring-1 focus:ring-stone-900"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 pb-2 overflow-x-auto text-xs font-medium text-stone-600">
        {['all', 'Charter', 'Whitepaper', 'Technical Blueprint', 'Archival Lineage', 'Field Protocol'].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                selectedCategory === cat ? 'bg-stone-900 text-white' : 'bg-stone-100 hover:bg-stone-200'
              }`}
            >
              {cat === 'all' ? 'All Publications' : cat}
            </button>
          )
        )}
      </div>

      {/* Resources List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="p-5 bg-white border border-stone-200 rounded-xl hover:border-stone-400 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-2">
                <span>{doc.code}</span>
                <span className="text-amber-800 font-semibold">{doc.category}</span>
              </div>

              <h4 className="font-editorial text-lg text-stone-900 font-medium mb-1 group-hover:text-amber-800 transition-colors">
                {doc.title}
              </h4>
              <div className="text-xs text-stone-500 font-mono mb-3">
                {doc.institution} · Published {doc.publicationDate}
              </div>

              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {doc.description}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-400 font-mono text-[11px]">
                {doc.pageCount} Pages · {doc.fileSize}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveDoc(doc)}
                  className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded font-medium flex items-center gap-1 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read</span>
                </button>
                <a
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Downloading verified copy of ${doc.code}: ${doc.title}`);
                  }}
                  className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded"
                  title="Download Document"
                >
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Document Reader Modal */}
      {activeDoc && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#FBF9F5] border border-stone-300 rounded-2xl shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
              <div className="text-xs font-mono text-stone-500">
                {activeDoc.code} · Library {activeDoc.libraryLevel}
              </div>
              <button
                onClick={() => setActiveDoc(null)}
                className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl text-stone-900 font-medium mb-2">
              {activeDoc.title}
            </h3>
            <div className="text-xs font-mono text-stone-500 mb-6">
              Custodian: {activeDoc.institution} · {activeDoc.pageCount} Pages
            </div>

            <div className="p-6 bg-white border border-stone-200 rounded-xl space-y-4 text-stone-700 text-sm leading-relaxed mb-6">
              <div className="font-mono text-xs uppercase tracking-wider text-amber-800">
                Preamble & Executive Summary
              </div>
              <p>
                {activeDoc.description}
              </p>
              <p>
                This covenant document is indexed in the Swiss International Archives under accession code {activeDoc.code}. All partner organizations (Fiducia Centrale, CTS, UN, WHO) maintain reciprocal copies signed by accredited council plenipotentiaries.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  alert(`Accession package for ${activeDoc.code} ready.`);
                }}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Archival Copy</span>
              </button>
              <button
                onClick={() => setActiveDoc(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-medium"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
