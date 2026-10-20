import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { ArchiveView } from './views/ArchiveView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { TenderDirectoryView } from './views/TenderDirectoryView';
import { ComparisonView } from './views/ComparisonView';
import { SourcesDirectoryView } from './views/SourcesDirectoryView';
import { DashboardView } from './views/DashboardView';
import { MembershipView } from './views/MembershipView';
import { AdminView } from './views/AdminView';
import { AboutView, TermsView, PrivacyView, SubscriptionPolicyView, AuthView, ContactView } from './views/InstitutionalViews';
import { Article, TenderNotice, OfficialSource } from './types';

export function AppContent() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParam, setViewParam] = useState<string>('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [tenders, setTenders] = useState<TenderNotice[]>([]);
  const [sources, setSources] = useState<OfficialSource[]>([]);
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([
    'tnd-gem-2026-0891',
    'tnd-cppp-2026-4412'
  ]);
  const [loading, setLoading] = useState(true);

  // Initial data loading
  useEffect(() => {
    Promise.all([
      fetch('/api/articles').then(r => r.json()),
      fetch('/api/tenders').then(r => r.json()),
      fetch('/api/sources').then(r => r.json())
    ])
      .then(([artData, tndData, srcData]) => {
        if (artData.articles) setArticles(artData.articles);
        if (tndData.tenders) setTenders(tndData.tenders);
        if (srcData.sources) setSources(srcData.sources);
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    // Handle initial browser URL path if provided
    const pathname = window.location.pathname;
    if (pathname.startsWith('/archive/')) {
      const slug = pathname.replace('/archive/', '');
      setCurrentView('article');
      setViewParam(slug);
    } else if (pathname === '/archive') {
      setCurrentView('archive');
    } else if (pathname === '/tenders') {
      setCurrentView('tenders');
    } else if (pathname === '/compare') {
      setCurrentView('compare');
    } else if (pathname === '/membership') {
      setCurrentView('membership');
    } else if (pathname === '/contact') {
      setCurrentView('contact');
    }
  }, []);

  const handleNavigate = (view: string, param?: string) => {
    setCurrentView(view);
    setViewParam(param || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update browser URL state cleanly
    let path = '/';
    if (view === 'archive') path = '/archive';
    else if (view === 'article' && param) path = `/archive/${param}`;
    else if (view === 'tenders') path = '/tenders';
    else if (view === 'compare') path = '/compare';
    else if (view === 'sources') path = '/sources';
    else if (view === 'dashboard') path = '/dashboard';
    else if (view === 'membership') path = '/membership';
    else if (view === 'admin') path = '/admin';
    else if (view === 'about') path = '/about';
    else if (view === 'contact') path = '/contact';
    else if (view === 'terms') path = '/terms';
    else if (view === 'privacy') path = '/privacy';
    else if (view === 'subscription-policy') path = '/subscription-policy';

    window.history.pushState({}, '', path);
  };

  const handleToggleCompare = (id: string) => {
    setSelectedCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 4) {
        alert('You can compare a maximum of 4 tenders at a time.');
        return prev;
      }
      return [...prev, id];
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-[#0E4C56] selection:text-white">
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        selectedCompareCount={selectedCompareIds.length}
      />

      <main className="flex-1">
        {loading ? (
          <div className="max-w-4xl mx-auto px-6 py-28 text-center">
            <span className="font-serif text-2xl text-stone-700 animate-pulse">
              Loading TenderWise India Research Archive...
            </span>
          </div>
        ) : (
          <>
            {currentView === 'home' && (
              <HomeView
                onNavigate={handleNavigate}
                articles={articles}
                sources={sources}
              />
            )}

            {currentView === 'archive' && (
              <ArchiveView
                articles={articles}
                initialCategoryOrSearch={viewParam}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'article' && (
              <ArticleDetailView
                slug={viewParam || 'how-to-start-a-government-tender-business-india'}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'tenders' && (
              <TenderDirectoryView
                tenders={tenders}
                selectedCompareIds={selectedCompareIds}
                onToggleCompare={handleToggleCompare}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'compare' && (
              <ComparisonView
                tenders={tenders}
                selectedCompareIds={selectedCompareIds}
                onToggleCompare={handleToggleCompare}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'sources' && (
              <SourcesDirectoryView sources={sources} />
            )}

            {currentView === 'dashboard' && (
              <DashboardView
                articles={articles}
                tenders={tenders}
                onNavigate={handleNavigate}
              />
            )}

            {currentView === 'membership' && (
              <MembershipView onNavigate={handleNavigate} />
            )}

            {currentView === 'admin' && (
              <AdminView onNavigate={handleNavigate} />
            )}

            {currentView === 'auth' && (
              <AuthView onNavigate={handleNavigate} />
            )}

            {currentView === 'about' && <AboutView />}
            {currentView === 'contact' && <ContactView />}
            {currentView === 'terms' && <TermsView />}
            {currentView === 'privacy' && <PrivacyView />}
            {currentView === 'subscription-policy' && <SubscriptionPolicyView />}
          </>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
