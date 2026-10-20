import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  selectedCompareCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, selectedCompareCount }) => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authoritative route matching helper
  const isNavActive = (item: 'home' | 'articles' | 'tenders' | 'compare' | 'sources' | 'about') => {
    switch (item) {
      case 'home':
        return currentView === 'home';
      case 'articles':
        return currentView === 'archive' || currentView === 'article';
      case 'tenders':
        return currentView === 'tenders';
      case 'compare':
        return currentView === 'compare';
      case 'sources':
        return currentView === 'sources';
      case 'about':
        return currentView === 'about';
      default:
        return false;
    }
  };

  const getDesktopNavLinkClass = (active: boolean) => {
    return `text-sm font-medium transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
      active
        ? 'text-[#0F766E] font-semibold border-[#0F766E]'
        : 'text-[#64748B] hover:text-[#0F766E] border-transparent'
    }`;
  };

  const getMobileNavLinkClass = (active: boolean) => {
    return `block w-full text-left py-2.5 px-3 text-sm font-medium transition-colors ${
      active
        ? 'text-[#0F766E] font-semibold bg-teal-50 border-l-4 border-[#0F766E]'
        : 'text-[#64748B] hover:text-[#0F766E] hover:bg-stone-50'
    }`;
  };

  return (
    <>
      {/* Top Trust & Independence Ribbon */}
      <div className="bg-stone-900 text-stone-300 text-[11px] px-6 py-1.5 border-b border-stone-800 tracking-wide flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium text-stone-200">Independent Research Archive</span>
          <span className="text-stone-500">·</span>
          <span className="hidden sm:inline text-stone-400">Not a government portal or tender-awarding authority</span>
        </div>
        <div className="flex items-center gap-4 text-stone-400">
          <span className="hidden md:inline">Primary Official Hubs:</span>
          <a
            href="https://gem.gov.in"
            target="_blank"
            rel="noreferrer"
            className="hover:text-stone-200 underline decoration-stone-600 underline-offset-2 transition-colors"
          >
            GeM (gem.gov.in)
          </a>
          <span className="text-stone-600">/</span>
          <a
            href="https://eprocure.gov.in"
            target="_blank"
            rel="noreferrer"
            className="hover:text-stone-200 underline decoration-stone-600 underline-offset-2 transition-colors"
          >
            CPPP (eprocure.gov.in)
          </a>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          
          {/* Brand Wordmark (Deep Navy #10243A) */}
          <button
            onClick={() => onNavigate('home')}
            className="text-2xl font-serif font-bold text-[#10243A] tracking-tight whitespace-nowrap shrink-0 hover:text-[#0F766E] transition-colors text-left"
          >
            TenderWise India
          </button>

          {/* Desktop Navigation Links with Active Page Highlight */}
          <nav className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => onNavigate('home')}
              className={getDesktopNavLinkClass(isNavActive('home'))}
              aria-current={isNavActive('home') ? 'page' : undefined}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('archive')}
              className={getDesktopNavLinkClass(isNavActive('articles'))}
              aria-current={isNavActive('articles') ? 'page' : undefined}
            >
              Articles
            </button>

            <button
              onClick={() => onNavigate('tenders')}
              className={getDesktopNavLinkClass(isNavActive('tenders'))}
              aria-current={isNavActive('tenders') ? 'page' : undefined}
            >
              Explore Tenders
            </button>

            <button
              onClick={() => onNavigate('compare')}
              className={`flex items-center gap-1.5 ${getDesktopNavLinkClass(isNavActive('compare'))}`}
              aria-current={isNavActive('compare') ? 'page' : undefined}
            >
              <span>Compare</span>
              {selectedCompareCount > 0 && (
                <span className="text-xs font-mono font-semibold text-[#0F766E] bg-teal-50 px-1.5 py-0.2 border border-teal-200">
                  {selectedCompareCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('sources')}
              className={getDesktopNavLinkClass(isNavActive('sources'))}
              aria-current={isNavActive('sources') ? 'page' : undefined}
            >
              Sources
            </button>

            <button
              onClick={() => onNavigate('about')}
              className={getDesktopNavLinkClass(isNavActive('about'))}
              aria-current={isNavActive('about') ? 'page' : undefined}
            >
              About Us
            </button>
          </nav>

          {/* Action Zone: Dashboard or Sign In CTA */}
          <div className="flex items-center gap-3 shrink-0">
            {user ? (
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-4 py-2 text-xs font-semibold rounded-none transition-colors whitespace-nowrap shrink-0 tracking-wide ${
                  currentView === 'dashboard'
                    ? 'bg-[#0d635c] ring-2 ring-[#0F766E] text-white shadow-xs'
                    : 'bg-[#0F766E] hover:bg-[#0d635c] text-white'
                }`}
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={() => onNavigate('auth')}
                className={`px-4 py-2 text-xs font-semibold rounded-none transition-colors whitespace-nowrap shrink-0 tracking-wide ${
                  currentView === 'auth'
                    ? 'bg-[#0d635c] ring-2 ring-[#0F766E] text-white shadow-xs'
                    : 'bg-[#0F766E] hover:bg-[#0d635c] text-white'
                }`}
              >
                Sign In / Join Free
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-[#0F766E]"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Active Page Highlight */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-[#FAF8F5] px-6 py-4 space-y-1">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className={getMobileNavLinkClass(isNavActive('home'))}
            >
              Home
            </button>
            <button
              onClick={() => { onNavigate('archive'); setMobileMenuOpen(false); }}
              className={getMobileNavLinkClass(isNavActive('articles'))}
            >
              Articles & Research Archive
            </button>
            <button
              onClick={() => { onNavigate('tenders'); setMobileMenuOpen(false); }}
              className={getMobileNavLinkClass(isNavActive('tenders'))}
            >
              Explore Tenders
            </button>
            <button
              onClick={() => { onNavigate('compare'); setMobileMenuOpen(false); }}
              className={getMobileNavLinkClass(isNavActive('compare'))}
            >
              Tender Comparison Matrix ({selectedCompareCount})
            </button>
            <button
              onClick={() => { onNavigate('sources'); setMobileMenuOpen(false); }}
              className={getMobileNavLinkClass(isNavActive('sources'))}
            >
              Official Portals & Sources
            </button>
            <button
              onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
              className={getMobileNavLinkClass(isNavActive('about'))}
            >
              About Us
            </button>
            <button
              onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }}
              className={`block w-full text-left py-2.5 px-3 text-sm font-medium transition-colors ${
                currentView === 'contact'
                  ? 'text-[#0F766E] font-semibold bg-teal-50 border-l-4 border-[#0F766E]'
                  : 'text-[#64748B] hover:text-[#0F766E] hover:bg-stone-50'
              }`}
            >
              Editorial Contact
            </button>
            {user?.role === 'admin' && (
              <button
                onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2.5 px-3 text-sm font-medium text-[#0F766E] hover:bg-stone-50"
              >
                Editorial Administration
              </button>
            )}
            <div className="pt-3 border-t border-stone-200 text-xs text-stone-500 flex justify-between items-center">
              <span>Account: {user ? user.email : 'Guest'}</span>
              {user && (
                <button
                  onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
                  className="text-[#0F766E] underline font-medium"
                >
                  Dashboard
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
