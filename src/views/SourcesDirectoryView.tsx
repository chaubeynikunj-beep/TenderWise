import React from 'react';
import { OfficialSource } from '../types';

interface SourcesDirectoryViewProps {
  sources: OfficialSource[];
}

export const SourcesDirectoryView: React.FC<SourcesDirectoryViewProps> = ({ sources }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-300 pb-6">
        <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#0E4C56]">
          Direct Official Portal Registry
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 mt-1">
          Official Government Procurement Portals in India
        </h1>
        <p className="text-sm text-stone-600 mt-2 max-w-3xl leading-relaxed">
          Central, State, and Sectoral e-procurement portals. Bidders should exclusively register and submit tenders through verified government domains ending in <code className="bg-stone-200 px-1 font-mono text-xs">.gov.in</code> or <code className="bg-stone-200 px-1 font-mono text-xs">.nic.in</code>.
        </p>
      </div>

      {/* Advisory Banner */}
      <div className="p-4 bg-stone-100 border border-stone-300 text-xs text-stone-700 leading-relaxed">
        <strong>Anti-Fraud Warning:</strong> Never pay registration fees on non-government portals ending in <code>.com</code> or <code>.org</code> that claim to be official tender registries. Downloading tender notices on official government websites is completely free under GFR 2017.
      </div>

      {/* Portals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources.map(src => (
          <div key={src.id} className="bg-white border border-stone-200 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between text-xs">
                <span className="font-semibold text-[#0E4C56] uppercase tracking-wider">{src.jurisdiction} Authority</span>
                <span className="font-mono text-[11px] text-stone-600 font-medium">{src.status}</span>
              </div>

              <h3 className="font-serif text-xl font-bold text-stone-950 leading-snug">
                {src.name}
              </h3>

              <p className="text-xs text-stone-600 leading-relaxed">
                {src.description}
              </p>

              <div className="p-3 bg-stone-50 border border-stone-200 space-y-1.5 text-xs text-stone-700">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Active Bids:</span>
                  <span className="font-mono font-medium">{src.activeTendersCountApprox}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">DSC Token:</span>
                  <span className="font-medium text-right text-[11px]">{src.dscTypeRequired}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-stone-400">
                Verified: {new Date(src.lastChecked).toLocaleDateString('en-IN')}
              </span>
              <a
                href={src.portalUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-[#0E4C56] text-white font-medium hover:bg-[#09353C] flex items-center gap-1 transition-colors"
              >
                <span>Visit Official Portal</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
