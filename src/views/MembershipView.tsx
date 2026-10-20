import React from 'react';

interface MembershipViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const MembershipView: React.FC<MembershipViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#0F766E]">
          Free Public Research Platform
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-950">
          Open Access & Research Charter
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
          TenderWise India is committed to democratizing access to Indian public procurement intelligence. All articles, statutory analyses, and tender discovery tools are completely free to read and use without credits or subscriptions.
        </p>
      </div>

      {/* Core Open Access Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-stone-200 p-6 space-y-4">
          <div className="w-10 h-10 bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0F766E] font-serif text-lg font-bold">
            01
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Zero Paywalls or Reading Fees
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Every research dossier, procedural guide, and regulatory breakdown is 100% free. We do not impose credit deductions, paywalls, or article access charges on contractors, researchers, or students.
          </p>
          <div className="pt-2">
            <span className="text-[11px] font-mono font-semibold text-[#0F766E] block bg-stone-50 p-2 border border-stone-200">
              ✓ Unrestricted Article Library
            </span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 p-6 space-y-4">
          <div className="w-10 h-10 bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0F766E] font-serif text-lg font-bold">
            02
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Unrestricted Tender Discovery Tools
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Search verified tender notices across GeM, CPPP, Defence eProc, and State Portals. Compare multi-tender eligibility, EMD requirements, and technical solvency side-by-side with zero restrictions.
          </p>
          <div className="pt-2">
            <span className="text-[11px] font-mono font-semibold text-[#0F766E] block bg-stone-50 p-2 border border-stone-200">
              ✓ Side-by-Side Tender Matrix Included
            </span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 p-6 space-y-4">
          <div className="w-10 h-10 bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0F766E] font-serif text-lg font-bold">
            03
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Statutory & Independent Accuracy
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Our editorial analyses are grounded in General Financial Rules (GFR), 2017, Public Procurement Policy (PPP-MII), and official CVC guidelines. We do not sell tender awards, commercial leads, or paid consulting.
          </p>
          <div className="pt-2">
            <span className="text-[11px] font-mono font-semibold text-[#0F766E] block bg-stone-50 p-2 border border-stone-200">
              ✓ Grounded in Primary Government Circulars
            </span>
          </div>
        </div>
      </div>

      {/* Mandatory Ethics & Independence Notice */}
      <div className="max-w-4xl mx-auto p-5 bg-stone-100 border border-stone-300 text-xs text-stone-700 leading-relaxed text-center space-y-2">
        <strong className="block text-stone-900 font-sans uppercase tracking-wider text-[11px]">
          Integrity & Non-Affiliation Declaration
        </strong>
        <p>
          TenderWise India is an independent public research initiative. We do not charge subscription fees, sell tender documents, or provide commercial bidding representation. All tender notices are indexed for reference and must be verified on official government portals (gem.gov.in / eprocure.gov.in).
        </p>
      </div>

      {/* Action Zone */}
      <div className="bg-[#10243A] text-white p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border border-stone-800">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-serif text-2xl font-bold">
            Start Exploring Procurement Knowledge
          </h3>
          <p className="text-xs text-stone-300">
            Read comprehensive guides, download statutory compliance checklists, and track verified tender notices.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <button
            onClick={() => onNavigate('archive')}
            className="px-5 py-2.5 bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#0d635c] transition-colors"
          >
            Explore Articles
          </button>
          <button
            onClick={() => onNavigate('tenders')}
            className="px-5 py-2.5 bg-stone-800 text-stone-200 text-xs font-semibold hover:bg-stone-700 transition-colors border border-stone-700"
          >
            Search Tenders
          </button>
        </div>
      </div>
    </div>
  );
};
