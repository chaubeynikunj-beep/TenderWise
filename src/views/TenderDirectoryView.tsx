import React, { useState, useMemo } from 'react';
import { TenderNotice } from '../types';
import { useAuth } from '../context/AuthContext';
import { ImageWithFallback } from '../components/ImageWithFallback';

const getTenderCategoryImage = (category: string) => {
  if (category.includes('IT') || category.includes('Hardware')) return '/images/categories/it-hardware.jpg';
  if (category.includes('Civil') || category.includes('Construction')) return '/images/categories/civil-works.jpg';
  if (category.includes('Healthcare') || category.includes('Medical')) return '/images/categories/healthcare.jpg';
  if (category.includes('Railway') || category.includes('Power')) return '/images/categories/railway-power.jpg';
  if (category.includes('Textile') || category.includes('Equipment')) return '/images/categories/textiles.jpg';
  return '/images/categories/consultancy.jpg';
};

interface TenderDirectoryViewProps {
  tenders: TenderNotice[];
  selectedCompareIds: string[];
  onToggleCompare: (id: string) => void;
  onNavigate: (view: string, param?: string) => void;
}

export const TenderDirectoryView: React.FC<TenderDirectoryViewProps> = ({
  tenders,
  selectedCompareIds,
  onToggleCompare,
  onNavigate
}) => {
  const { user, toggleSavedTender } = useAuth();
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('All');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeModalTender, setActiveModalTender] = useState<TenderNotice | null>(null);

  const states = ['All', 'Delhi', 'Karnataka', 'Maharashtra', 'Chandigarh', 'Uttar Pradesh'];
  const platforms = ['All', 'GeM', 'CPPP / eProcure', 'Defence eProc', 'IREPS', 'State e-Procurement'];
  const statuses = ['All', 'Open', 'Under Evaluation', 'Awarded'];

  const filteredTenders = useMemo(() => {
    return tenders.filter(t => {
      if (stateFilter !== 'All' && t.locationState.toLowerCase() !== stateFilter.toLowerCase()) return false;
      if (platformFilter !== 'All' && t.sourcePlatform !== platformFilter) return false;
      if (statusFilter !== 'All' && t.tenderStatus !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = t.title.toLowerCase().includes(q);
        const matchRef = t.tenderReference.toLowerCase().includes(q);
        const matchOrg = t.procuringOrganisation.toLowerCase().includes(q);
        const matchDept = t.department.toLowerCase().includes(q);
        if (!matchTitle && !matchRef && !matchOrg && !matchDept) return false;
      }
      return true;
    });
  }, [tenders, stateFilter, platformFilter, statusFilter, search]);

  const formatCurrency = (val: number | null) => {
    if (val === null) return 'Not published in summary';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-300 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#0E4C56]">
            Traceable Public Procurement Opportunities
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 mt-1">
            Verified Tender Directory
          </h1>
          <p className="text-sm text-stone-600 mt-2 max-w-3xl leading-relaxed">
            Index of active public procurement notices from Central, State, and Defence portals. All records cite official reference numbers, verified source links, and clear notes where data is unlisted.
          </p>
        </div>

        {selectedCompareIds.length > 0 && (
          <button
            onClick={() => onNavigate('compare')}
            className="px-5 py-2.5 bg-[#0E4C56] text-white text-xs font-semibold hover:bg-[#09353C] whitespace-nowrap self-start md:self-auto"
          >
            Compare Selected ({selectedCompareIds.length}) →
          </button>
        )}
      </div>

      {/* Transparency Banner */}
      <div className="p-4 bg-stone-100 border border-stone-300 text-xs text-stone-700 space-y-1">
        <span className="font-bold text-stone-900 block">Editorial Data Integrity Standard:</span>
        <p className="leading-relaxed">
          TenderWise India never fabricates tender reference numbers, deadlines, or pricing. Fields marked as <em>"Not published in summary"</em> reflect the actual limitation of the published Notice Inviting Tender. Always inspect the full tender packet on the official portal.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="bg-white border border-stone-200 p-5 space-y-4">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by tender reference, procuring organisation, equipment, or department..."
            className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-stone-300 text-sm focus:outline-none focus:border-[#0E4C56]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-stone-100 text-xs">
          <div>
            <label className="block font-medium text-stone-700 mb-1">State / Jurisdiction:</label>
            <select
              value={stateFilter}
              onChange={e => setStateFilter(e.target.value)}
              className="w-full p-2 border border-stone-300 bg-white text-stone-800"
            >
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-medium text-stone-700 mb-1">Source Platform:</label>
            <select
              value={platformFilter}
              onChange={e => setPlatformFilter(e.target.value)}
              className="w-full p-2 border border-stone-300 bg-white text-stone-800"
            >
              {platforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-medium text-stone-700 mb-1">Tender Status:</label>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full p-2 border border-stone-300 bg-white text-stone-800"
            >
              {statuses.map(st => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Tenders List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-stone-500 pb-2">
          <span>Found <strong className="text-stone-900">{filteredTenders.length}</strong> verified opportunities</span>
          <span>Showing authentic procurement records</span>
        </div>

        {filteredTenders.length > 0 ? (
          filteredTenders.map(t => {
            const isComparing = selectedCompareIds.includes(t.id);
            const isSaved = user?.savedTenderIds.includes(t.id);
            const categoryImg = getTenderCategoryImage(t.category);

            return (
              <div
                key={t.id}
                className="bg-white border border-stone-200 p-6 space-y-4 hover:border-stone-400 transition-colors"
              >
                <div className="flex flex-col md:flex-row gap-5 items-start">
                  {/* Category Photographic Thumbnail */}
                  <div
                    className="w-full md:w-36 h-28 shrink-0 overflow-hidden bg-stone-100 border border-stone-200 relative cursor-pointer group"
                    onClick={() => setActiveModalTender(t)}
                  >
                    <ImageWithFallback
                      src={categoryImg}
                      alt={t.category}
                      fallbackCategory={t.category}
                      fallbackTitle={t.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-stone-950/80 px-1.5 py-0.5 text-[9px] text-stone-200 font-mono truncate">
                      {t.category}
                    </div>
                  </div>

                  {/* Main Tender Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-sans">
                          <span className="font-mono text-stone-800 font-medium">{t.tenderReference}</span>
                          <span>·</span>
                          <span className="font-medium text-[#0F766E]">{t.sourcePlatform}</span>
                          <span>·</span>
                          <span>{t.locationCity}, {t.locationState}</span>
                          <span>·</span>
                          <span className="text-stone-700">{t.tenderStatus}</span>
                        </div>

                        <h3
                          onClick={() => setActiveModalTender(t)}
                          className="font-serif text-xl font-bold text-stone-950 hover:text-[#0F766E] transition-colors cursor-pointer leading-snug"
                        >
                          {t.title}
                        </h3>

                        <p className="text-xs text-stone-600">
                          <strong>Procuring Entity:</strong> {t.procuringOrganisation} ({t.department})
                        </p>
                      </div>

                      {/* Compare & Bookmark Buttons */}
                      <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                        <button
                          onClick={() => onToggleCompare(t.id)}
                          className={`px-3 py-1.5 border text-xs font-medium transition-colors ${
                            isComparing
                              ? 'bg-[#0F766E] text-white border-[#0F766E]'
                              : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                          }`}
                        >
                          {isComparing ? '✓ Comparing' : '+ Compare'}
                        </button>

                        <button
                          onClick={() => toggleSavedTender(t.id)}
                          className={`p-1.5 border text-xs ${
                            isSaved ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
                          }`}
                          title={isSaved ? 'Bookmarked' : 'Bookmark Tender'}
                        >
                          ★
                        </button>
                      </div>
                    </div>

                    {/* Scope Excerpt */}
                    <p className="text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-2">
                      {t.summaryScope}
                    </p>
                  </div>
                </div>

                {/* Structured Key Metrics Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 bg-stone-50 border border-stone-200 px-4 text-xs">
                  <div>
                    <span className="text-stone-500 block text-[11px]">Estimated Value:</span>
                    <span className="font-mono font-medium text-stone-900">{formatCurrency(t.estimatedValueInr)}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Bid Security (EMD):</span>
                    <span className="font-mono font-medium text-stone-900">{formatCurrency(t.bidSecurityEmdInr)}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Submission Deadline:</span>
                    <span className="font-mono font-medium text-rose-700">
                      {new Date(t.submissionDeadline).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">MSE Exemption:</span>
                    <span className="font-medium text-stone-900">
                      {t.msmeExemptionAvailable === true
                        ? 'Allowed for Eligible MSEs'
                        : t.msmeExemptionAvailable === false
                        ? 'Not Applicable'
                        : 'Unspecified'}
                    </span>
                  </div>
                </div>

                {/* Footer verification & direct portal link */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-stone-500 pt-1 gap-2">
                  <span>
                    Verified on Official Portal: {new Date(t.lastVerifiedTimestamp).toLocaleString('en-IN')}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveModalTender(t)}
                      className="text-stone-700 hover:underline font-medium"
                    >
                      View Full Dossier Details
                    </button>
                    <span>·</span>
                    <a
                      href={t.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#0E4C56] hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Open on {t.sourcePlatform}</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 bg-white border border-stone-200 text-center space-y-3">
            <p className="font-serif text-lg font-bold text-stone-800">No verified tenders match your filter criteria.</p>
            <p className="text-xs text-stone-500">Reset filters to view all available authentic procurement listings.</p>
          </div>
        )}
      </div>

      {/* Tender Modal */}
      {activeModalTender && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-300 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6">
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-xs font-mono text-stone-500">{activeModalTender.tenderReference}</span>
                <h3 className="font-serif text-xl font-bold text-stone-950 mt-1">{activeModalTender.title}</h3>
              </div>
              <button
                onClick={() => setActiveModalTender(null)}
                className="text-stone-400 hover:text-stone-900 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Illustrative Category Photograph Banner */}
            <div className="border border-stone-200 bg-stone-50 overflow-hidden">
              <div className="aspect-[21/9] overflow-hidden">
                <ImageWithFallback
                  src={getTenderCategoryImage(activeModalTender.category)}
                  alt={activeModalTender.category}
                  fallbackCategory={activeModalTender.category}
                  fallbackTitle={activeModalTender.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 bg-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-sans">
                <span>Sector Category: <strong>{activeModalTender.category}</strong></span>
                <span className="italic">Illustrative Category Photograph · Official Verified Notice</span>
              </div>
            </div>

            <div className="space-y-4 text-xs text-stone-700">
              <div>
                <span className="font-bold text-stone-900 block mb-1">Procuring Organisation:</span>
                <p>{activeModalTender.procuringOrganisation} — {activeModalTender.department}</p>
              </div>

              <div>
                <span className="font-bold text-stone-900 block mb-1">Detailed Scope Summary:</span>
                <p className="leading-relaxed bg-stone-50 p-3 border border-stone-200">{activeModalTender.summaryScope}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-bold text-stone-900 block mb-1">Estimated Value:</span>
                  <p className="font-mono">{formatCurrency(activeModalTender.estimatedValueInr)}</p>
                </div>
                <div>
                  <span className="font-bold text-stone-900 block mb-1">Bid Security (EMD):</span>
                  <p className="font-mono">{formatCurrency(activeModalTender.bidSecurityEmdInr)}</p>
                </div>
                <div>
                  <span className="font-bold text-stone-900 block mb-1">Experience Required:</span>
                  <p>{activeModalTender.experienceYearsRequired ? `${activeModalTender.experienceYearsRequired} Years Similar Experience` : 'Not published in summary'}</p>
                </div>
                <div>
                  <span className="font-bold text-stone-900 block mb-1">Delivery Schedule:</span>
                  <p>{activeModalTender.deliveryPeriodMonths ? `${activeModalTender.deliveryPeriodMonths} Months` : 'Not specified in summary'}</p>
                </div>
              </div>

              <div className="p-3 bg-stone-100 border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">Editorial Verification Audit:</span>
                <p>{activeModalTender.verificationNotes}</p>
                <p className="text-[11px] text-stone-500 mt-1">Verified: {new Date(activeModalTender.lastVerifiedTimestamp).toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-between items-center">
              <button
                onClick={() => {
                  onToggleCompare(activeModalTender.id);
                  setActiveModalTender(null);
                }}
                className="px-4 py-2 border border-stone-300 text-xs font-semibold hover:bg-stone-50"
              >
                {selectedCompareIds.includes(activeModalTender.id) ? 'Remove from Compare' : 'Add to Compare Matrix'}
              </button>

              <a
                href={activeModalTender.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#0d635c] transition-colors"
              >
                Go to Official {activeModalTender.sourcePlatform} Portal ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
