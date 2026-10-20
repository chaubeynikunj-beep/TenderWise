import React from 'react';
import { TenderNotice } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';

const getTenderCategoryImage = (category: string) => {
  if (category.includes('IT') || category.includes('Hardware')) return '/images/categories/it-hardware.jpg';
  if (category.includes('Civil') || category.includes('Construction')) return '/images/categories/civil-works.jpg';
  if (category.includes('Healthcare') || category.includes('Medical')) return '/images/categories/healthcare.jpg';
  if (category.includes('Railway') || category.includes('Power')) return '/images/categories/railway-power.jpg';
  if (category.includes('Textile') || category.includes('Equipment')) return '/images/categories/textiles.jpg';
  return '/images/categories/consultancy.jpg';
};

interface ComparisonViewProps {
  tenders: TenderNotice[];
  selectedCompareIds: string[];
  onToggleCompare: (id: string) => void;
  onNavigate: (view: string, param?: string) => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  tenders,
  selectedCompareIds,
  onToggleCompare,
  onNavigate
}) => {
  const comparedTenders = tenders.filter(t => selectedCompareIds.includes(t.id));

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
            Structured Evaluation Matrix
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 mt-1">
            Tender Opportunity Comparison Tool
          </h1>
          <p className="text-sm text-stone-600 mt-2 max-w-3xl leading-relaxed">
            Side-by-side comparison of verified public procurement notices. Missing or unlisted parameters are transparently marked as unavailable.
          </p>
        </div>

        <button
          onClick={() => onNavigate('tenders')}
          className="px-4 py-2 border border-stone-300 bg-white text-stone-800 text-xs font-semibold hover:bg-stone-50 self-start md:self-auto"
        >
          ← Browse Tender Directory
        </button>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="bg-stone-100 border border-stone-300 p-4 text-xs text-stone-700 leading-relaxed">
        <strong>Mandatory Advisory:</strong> This tool provides informational comparison based on publicly published tender notices. It does not constitute financial, legal, or bid-suitability advice. Missing fields are labelled as unavailable rather than estimated without documentary evidence.
      </div>

      {comparedTenders.length < 2 ? (
        <div className="bg-white border border-stone-200 p-12 text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            Select At Least 2 Tenders to Compare
          </h3>
          <p className="text-xs text-stone-600 max-w-md mx-auto">
            You currently have {comparedTenders.length} tender selected. Select 2 to 4 tender notices from our verified directory to generate a comparative analysis.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('tenders')}
              className="px-6 py-2.5 bg-[#0E4C56] text-white text-xs font-semibold hover:bg-[#09353C]"
            >
              Go to Tender Directory
            </button>
          </div>
        </div>
      ) : (
        /* Comparison Table Matrix */
        <div className="overflow-x-auto bg-white border border-stone-300 shadow-2xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-100 border-b border-stone-300">
                <th className="p-4 w-48 font-serif font-bold text-stone-900 text-sm border-r border-stone-200">
                  Parameter
                </th>
                {comparedTenders.map(t => (
                  <th key={t.id} className="p-4 min-w-[260px] max-w-[320px] border-r border-stone-200 last:border-r-0 align-top">
                    {/* Category Photographic Header */}
                    <div className="aspect-[16/9] w-full overflow-hidden bg-stone-100 border border-stone-200 mb-3">
                      <ImageWithFallback
                        src={getTenderCategoryImage(t.category)}
                        alt={t.category}
                        fallbackCategory={t.category}
                        fallbackTitle={t.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-[11px] text-stone-500">{t.tenderReference}</span>
                      <button
                        onClick={() => onToggleCompare(t.id)}
                        className="text-stone-400 hover:text-rose-600 text-xs font-bold"
                        title="Remove from comparison"
                      >
                        ✕ Remove
                      </button>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-stone-950 mt-1 leading-snug">
                      {t.title}
                    </h4>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-200 text-stone-700">
              {/* Procuring Organisation */}
              <tr>
                <td className="p-4 font-semibold text-stone-900 bg-stone-50 border-r border-stone-200">
                  Procuring Organisation
                </td>
                {comparedTenders.map(t => (
                  <td key={t.id} className="p-4 border-r border-stone-200 last:border-r-0">
                    <span className="font-medium text-stone-900">{t.procuringOrganisation}</span>
                    <span className="block text-stone-500 text-[11px] mt-0.5">{t.department}</span>
                  </td>
                ))}
              </tr>

              {/* Category & Location */}
              <tr>
                <td className="p-4 font-semibold text-stone-900 bg-stone-50 border-r border-stone-200">
                  Category & State
                </td>
                {comparedTenders.map(t => (
                  <td key={t.id} className="p-4 border-r border-stone-200 last:border-r-0">
                    <span>{t.category}</span>
                    <span className="block text-stone-500 font-mono text-[11px] mt-0.5">
                      {t.locationCity}, {t.locationState}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Estimated Contract Value */}
              <tr>
                <td className="p-4 font-semibold text-stone-900 bg-stone-50 border-r border-stone-200">
                  Estimated Value (INR)
                </td>
                {comparedTenders.map(t => (
                  <td key={t.id} className="p-4 border-r border-stone-200 last:border-r-0 font-mono text-stone-900">
                    {formatCurrency(t.estimatedValueInr)}
                  </td>
                ))}
              </tr>

              {/* Bid Security / EMD */}
              <tr>
                <td className="p-4 font-semibold text-stone-900 bg-stone-50 border-r border-stone-200">
                  Bid Security (EMD)
                </td>
                {comparedTenders.map(t => (
                  <td key={t.id} className="p-4 border-r border-stone-200 last:border-r-0 font-mono text-stone-900">
                    {formatCurrency(t.bidSecurityEmdInr)}
                  </td>
                ))}
              </tr>

              {/* MSE Exemption */}
              <tr>
                <td className="p-4 font-semibold text-stone-900 bg-stone-50 border-r border-stone-200">
                  MSE Exemption Policy
                </td>
                {comparedTenders.map(t => (
                  <td key={t.id} className="p-4 border-r border-stone-200 last:border-r-0">
                    {t.msmeExemptionAvailable === true ? (
                      <span className="text-[#0E4C56] font-medium">Eligible for EMD & Turnover waiver</span>
                    ) : t.msmeExemptionAvailable === false ? (
                      <span className="text-stone-500">Not Applicable (CPWD/Works clause)</span>
                    ) : (
                      <span className="text-stone-400 italic">Not specified in summary</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Required Experience */}
              <tr>
                <td className="p-4 font-semibold text-stone-900 bg-stone-50 border-r border-stone-200">
                  Prior Experience Mandate
                </td>
                {comparedTenders.map(t => (
                  <td key={t.id} className="p-4 border-r border-stone-200 last:border-r-0">
                    {t.experienceYearsRequired
                      ? `${t.experienceYearsRequired} Years Similar Completed Work`
                      : 'Not published in summary notice'}
                  </td>
                ))}
              </tr>

              {/* Solvency Requirement */}
              <tr>
                <td className="p-4 font-semibold text-stone-900 bg-stone-50 border-r border-stone-200">
                  Bank Solvency Certificate
                </td>
                {comparedTenders.map(t => (
                  <td key={t.id} className="p-4 border-r border-stone-200 last:border-r-0 font-mono">
                    {formatCurrency(t.technicalSolvencyRequiredInr)}
                  </td>
                ))}
              </tr>

              {/* Delivery Period */}
              <tr>
                <td className="p-4 font-semibold text-stone-900 bg-stone-50 border-r border-stone-200">
                  Execution / Delivery Period
                </td>
                {comparedTenders.map(t => (
                  <td key={t.id} className="p-4 border-r border-stone-200 last:border-r-0">
                    {t.deliveryPeriodMonths ? `${t.deliveryPeriodMonths} Months` : 'Not published in summary notice'}
                  </td>
                ))}
              </tr>

              {/* Submission Deadline */}
              <tr>
                <td className="p-4 font-semibold text-stone-900 bg-stone-50 border-r border-stone-200">
                  Submission Deadline
                </td>
                {comparedTenders.map(t => (
                  <td key={t.id} className="p-4 border-r border-stone-200 last:border-r-0 font-mono text-rose-700 font-medium">
                    {new Date(t.submissionDeadline).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                ))}
              </tr>

              {/* Official Platform & Link */}
              <tr>
                <td className="p-4 font-semibold text-stone-900 bg-stone-50 border-r border-stone-200">
                  Official Portal Verification
                </td>
                {comparedTenders.map(t => (
                  <td key={t.id} className="p-4 border-r border-stone-200 last:border-r-0">
                    <span className="font-semibold text-stone-900 block">{t.sourcePlatform}</span>
                    <a
                      href={t.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#0E4C56] hover:underline font-medium inline-block mt-1"
                    >
                      Open Official Notice ↗
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
