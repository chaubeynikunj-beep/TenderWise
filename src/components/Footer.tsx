import React from 'react';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-stone-300 bg-stone-100 text-stone-700 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Column 1: Identity & Disclaimers */}
          <div className="space-y-4 md:col-span-1">
            <span className="font-serif text-xl font-bold text-stone-900 tracking-tight block">
              TenderWise India
            </span>
            <p className="text-xs text-stone-600 leading-relaxed">
              An independent digital research publication dedicated to demystifying public procurement in India. We organize verified source data, statutory frameworks, and operational guides for MSMEs, contractors, and students.
            </p>
            <p className="text-[11px] text-stone-500 leading-relaxed border-t border-stone-200 pt-3">
              <strong>Mandatory Notice:</strong> TenderWise India is NOT an official government website, tender-issuing authority, or procurement consultancy. We do not guarantee contract awards or claim official affiliation.
            </p>
          </div>

          {/* Column 2: Research Modules */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-900">
              Research Archive
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <button
                  onClick={() => onNavigate('article', 'how-to-start-a-government-tender-business-india')}
                  className="hover:text-stone-900 text-left transition-colors"
                >
                  Flagship Beginner's Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('archive')}
                  className="hover:text-stone-900 text-left transition-colors"
                >
                  All 11 Research Dossiers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('article', 'how-to-register-as-seller-on-gem')}
                  className="hover:text-stone-900 text-left transition-colors"
                >
                  GeM Seller Onboarding Manual
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('article', 'documents-required-for-government-tenders')}
                  className="hover:text-stone-900 text-left transition-colors"
                >
                  Mandatory Statutory Checklist
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('article', 'understanding-bid-security-emd-performance-guarantee')}
                  className="hover:text-stone-900 text-left transition-colors"
                >
                  EMD & Bank Guarantee Legal Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Directory & Comparison */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-900">
              Discovery & Official Hubs
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <button
                  onClick={() => onNavigate('tenders')}
                  className="hover:text-stone-900 text-left transition-colors"
                >
                  Verified Tender Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('compare')}
                  className="hover:text-stone-900 text-left transition-colors"
                >
                  Tender Opportunity Comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sources')}
                  className="hover:text-stone-900 text-left transition-colors"
                >
                  Official Government Portals
                </button>
              </li>
              <li>
                <a
                  href="https://gem.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-stone-900 block transition-colors"
                >
                  GeM Official Portal ↗
                </a>
              </li>
              <li>
                <a
                  href="https://eprocure.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-stone-900 block transition-colors"
                >
                  CPPP Central Portal ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional Governance */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-900">
              Institutional & Policies
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-stone-900 text-left transition-colors"
                >
                  About Our Research Charter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('membership')}
                  className="hover:text-stone-900 text-left transition-colors"
                >
                  Open Access Platform Charter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('subscription-policy')}
                  className="hover:text-stone-900 text-left transition-colors"
                >
                  Editorial & Open Access Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-stone-900 text-left transition-colors font-medium text-[#0E4C56]"
                >
                  Contact Editorial Desk ↗
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-stone-900 text-left transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-stone-900 text-left transition-colors"
                >
                  Privacy & Data Charter
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Hairline & Copyright */}
        <div className="border-t border-stone-200 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} TenderWise India Research Archive. All rights reserved. Published under academic & analytical fair use.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Content Integrity: GFR 2017 & CPPP Guidelines</span>
            <span>·</span>
            <span>Version 1.0.0</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
