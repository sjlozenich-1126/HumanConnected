import React, { useState } from 'react';
import { User, X, Check, ShieldCheck, MapPin, Award, Building, Sparkles } from 'lucide-react';
import { CenterId, LibraryId, UserCurrentProfile } from '../types';

interface ProfileBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserCurrentProfile;
  setProfile: (profile: UserCurrentProfile) => void;
}

export const ProfileBuilderModal: React.FC<ProfileBuilderModalProps> = ({
  isOpen,
  onClose,
  profile,
  setProfile,
}) => {
  const [formData, setFormData] = useState<UserCurrentProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    localStorage.setItem('collective_user_profile', JSON.stringify(formData));
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FBF9F5] border border-stone-300 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Top Bar */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-100">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-amber-800" />
            <span className="font-editorial text-xl text-stone-900 font-medium">
              Professional Profile Builder & Institutional Identity
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full"
            aria-label="Close Profile Builder"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {/* Live Card Preview */}
          <div className="mb-8 p-6 bg-white border border-stone-200 rounded-xl shadow-sm">
            <div className="text-[11px] font-mono uppercase tracking-widest text-stone-400 mb-3">
              Live Inter-Institutional Credential Preview
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-stone-900 text-amber-100 flex items-center justify-center font-editorial text-2xl font-bold shadow-inner">
                  {formData.name.charAt(0) || 'U'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-editorial text-2xl text-stone-900 font-medium">
                      {formData.name || 'Unnamed Fellow'}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                  </div>
                  <div className="text-xs text-stone-600 font-medium">
                    {formData.title || 'Fellow / Delegate'}
                  </div>
                  <div className="text-xs text-stone-500 font-mono mt-0.5">
                    {formData.institution} · {formData.location}
                  </div>
                </div>
              </div>

              <div className="text-right sm:text-right space-y-1">
                <div className="text-[10px] font-mono text-stone-400 uppercase">
                  Library Alignment: {formData.primaryLibrary}
                </div>
                <div className="text-xs font-semibold text-amber-800">
                  Center: {formData.primaryCenter.toUpperCase()}
                </div>
                <div className="text-[10px] font-mono text-stone-500">
                  {formData.securityClearance}
                </div>
              </div>
            </div>

            {formData.bio && (
              <p className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-600 leading-relaxed font-sans">
                {formData.bio}
              </p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-stone-500 mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-500 mb-1">
                  OFFICIAL TITLE / ROLE
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-stone-500 mb-1">
                  INSTITUTIONAL AFFILIATION
                </label>
                <select
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded outline-none"
                >
                  <option>The Collective (Human Continuum)</option>
                  <option>Fiducia Centrale</option>
                  <option>Central Trust Securities (CTS)</option>
                  <option>Swiss International Archives</option>
                  <option>United Nations (UN)</option>
                  <option>World Health Organization (WHO)</option>
                  <option>Partner & Friends Assembly</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-500 mb-1">
                  PRIMARY LOCATION / HUB
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Geneva, Switzerland / New York"
                  className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-stone-500 mb-1">
                  PRIMARY LIBRARY
                </label>
                <select
                  value={formData.primaryLibrary}
                  onChange={(e) =>
                    setFormData({ ...formData, primaryLibrary: e.target.value as LibraryId })
                  }
                  className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded outline-none"
                >
                  <option value="L1">L1: Conditions (Natural Science)</option>
                  <option value="L2">L2: Meaning (Social Science)</option>
                  <option value="L3">L3: Boundaries (Applied Science)</option>
                  <option value="L4">L4: Systems (Formal Science)</option>
                  <option value="L5">L5: Deeds (Practical Ops)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-500 mb-1">
                  PRIMARY DEVELOPMENT CENTER
                </label>
                <select
                  value={formData.primaryCenter}
                  onChange={(e) =>
                    setFormData({ ...formData, primaryCenter: e.target.value as CenterId })
                  }
                  className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded outline-none"
                >
                  <option value="immediate">Immediate Center (Min → Hr)</option>
                  <option value="transitional">Transitional Center (Mo → Mo)</option>
                  <option value="generational">Generational Center (Yr → Yr)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-500 mb-1">
                  SECURITY CLEARANCE
                </label>
                <input
                  type="text"
                  value={formData.securityClearance}
                  onChange={(e) => setFormData({ ...formData, securityClearance: e.target.value })}
                  className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone-500 mb-1">
                PROFESSIONAL BIOGRAPHY & MISSION STATEMENT
              </label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="State your institutional role, scientific specialization, and ongoing mission commitments..."
                className="w-full text-xs p-3 bg-white border border-stone-300 rounded outline-none focus:ring-1 focus:ring-stone-900 leading-relaxed font-sans"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <span className="text-xs text-stone-500 font-mono">
                {savedSuccess ? 'Changes saved to local vault!' : 'Persisted in institutional storage'}
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Update Profile</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
