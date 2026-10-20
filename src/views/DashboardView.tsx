import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Article, TenderNotice } from '../types';

interface DashboardViewProps {
  articles: Article[];
  tenders: TenderNotice[];
  onNavigate: (view: string, param?: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  articles,
  tenders,
  onNavigate
}) => {
  const { user, token, logout, switchDemoRole } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'saved' | 'settings'>('overview');
  const [deleting, setDeleting] = useState(false);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-stone-900">Sign In Required</h2>
        <p className="text-xs text-stone-600">Please sign in or register to access your user dashboard.</p>
        <button
          onClick={() => onNavigate('auth')}
          className="px-5 py-2.5 bg-[#0E4C56] text-white text-xs font-semibold hover:bg-[#09353C] transition-colors"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  const savedArticleList = articles.filter(a => user.savedArticleSlugs.includes(a.slug));
  const savedTenderList = tenders.filter(t => user.savedTenderIds.includes(t.id));

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to permanently delete your account and saved bookmarks? This action is irreversible.')) {
      return;
    }
    setDeleting(true);
    try {
      const res = await fetch('/api/auth/delete-account', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        logout();
        onNavigate('home');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      {/* Demo Role Switcher Ribbon */}
      <div className="bg-stone-100 border border-stone-300 p-3 text-xs flex flex-wrap items-center justify-between gap-2">
        <span className="text-stone-700">
          <strong>Reviewer Testing Mode:</strong> Currently authenticated as <strong>{user.role}</strong> ({user.email}).
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => switchDemoRole('user')}
            className={`px-2.5 py-1 text-xs border ${
              user.role === 'user' ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-300'
            }`}
          >
            Switch to Regular User
          </button>
          <button
            onClick={() => switchDemoRole('admin')}
            className={`px-2.5 py-1 text-xs border ${
              user.role === 'admin' ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-300'
            }`}
          >
            Switch to Editorial Admin
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap border-b border-stone-300 gap-2">
        {(['overview', 'saved', 'settings'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-semibold transition-colors capitalize ${
              activeTab === tab
                ? 'border-b-2 border-[#0F766E] text-[#0F766E] bg-white'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {tab === 'saved' ? `Saved Bookmarks (${savedArticleList.length + savedTenderList.length})` : tab}
          </button>
        ))}
        {user.role === 'admin' && (
          <button
            onClick={() => onNavigate('admin')}
            className="px-4 py-2 text-xs font-semibold text-[#0F766E] hover:underline ml-auto"
          >
            Editorial Admin Panel ↗
          </button>
        )}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-stone-200 p-6 space-y-3">
            <h3 className="font-serif text-lg font-bold text-stone-950">Free & Open Research Charter</h3>
            <ul className="text-xs text-stone-600 space-y-2 leading-relaxed">
              <li>• <strong>100% Free Public Access:</strong> All research guides and regulatory dossiers are permanently accessible.</li>
              <li>• <strong>No Paywalls or Credits:</strong> Read without limits, credit deductions, or subscription barriers.</li>
              <li>• <strong>Statutory Verifications:</strong> Every guide includes primary circular citations under GFR 2017 and GeM terms.</li>
              <li>• <strong>Personalized Bookmarks:</strong> Save articles and live tender notices for quick reference anytime.</li>
            </ul>
          </div>

          <div className="bg-white border border-stone-200 p-6 space-y-3">
            <h3 className="font-serif text-lg font-bold text-stone-950">Explore Discovery Tools</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Use our verified directory tools to search Central & State tenders or compare multiple bidding requirements side-by-side:
            </p>
            <div className="space-y-2 pt-1">
              <button
                onClick={() => onNavigate('tenders')}
                className="w-full py-2 bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#0d635c] transition-colors text-center block"
              >
                Search Verified Tenders →
              </button>
              <button
                onClick={() => onNavigate('compare')}
                className="w-full py-2 border border-stone-300 text-stone-800 text-xs font-semibold hover:bg-stone-50 transition-colors text-center block"
              >
                Open Tender Comparison Tool
              </button>
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-6 space-y-3">
            <h3 className="font-serif text-lg font-bold text-stone-950">Recommended Reading</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Start with our foundational guides on starting a government tender business or onboarding as an OEM/reseller on GeM:
            </p>
            <button
              onClick={() => onNavigate('article', 'how-to-start-a-government-tender-business-india')}
              className="text-xs text-[#0E4C56] font-semibold hover:underline block text-left"
            >
              → Starting a Government Tender Business (Flagship)
            </button>
            <button
              onClick={() => onNavigate('article', 'how-to-register-as-seller-on-gem')}
              className="text-xs text-[#0E4C56] font-semibold hover:underline block text-left"
            >
              → GeM Seller Registration & Catalog Manual
            </button>
            <button
              onClick={() => onNavigate('article', 'how-to-avoid-tender-disqualification')}
              className="text-xs text-[#0E4C56] font-semibold hover:underline block text-left"
            >
              → How to Avoid Fatal Technical Disqualification
            </button>
          </div>
        </div>
      )}

      {/* Tab: Saved Bookmarks */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-3">Saved Research Articles</h3>
            {savedArticleList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedArticleList.map(a => (
                  <div key={a.id} className="bg-white border border-stone-200 p-5 space-y-2 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-[#0E4C56] font-semibold">{a.category}</span>
                      <h4
                        onClick={() => onNavigate('article', a.slug)}
                        className="font-serif text-base font-bold text-stone-950 hover:text-[#0E4C56] cursor-pointer mt-1"
                      >
                        {a.title}
                      </h4>
                      <p className="text-xs text-stone-600 line-clamp-2 mt-1">{a.excerpt}</p>
                    </div>
                    <div className="pt-3 border-t border-stone-100 flex justify-between items-center text-xs">
                      <span className="text-stone-500 font-sans">{a.readingTimeMinutes} min read</span>
                      <button
                        onClick={() => onNavigate('article', a.slug)}
                        className="text-[#0E4C56] font-semibold hover:underline"
                      >
                        Read Full Guide →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-stone-200 p-6 text-center space-y-2">
                <p className="font-serif text-base text-stone-800">No research articles bookmarked yet.</p>
                <p className="text-xs text-stone-500">Explore the article library and click "Save Article" to build your reading list.</p>
                <button
                  onClick={() => onNavigate('archive')}
                  className="mt-2 px-4 py-2 bg-[#0E4C56] text-white text-xs font-semibold hover:bg-[#09353C]"
                >
                  Browse Research Archive
                </button>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-3">Saved Tender Notices</h3>
            {savedTenderList.length > 0 ? (
              <div className="space-y-3">
                {savedTenderList.map(t => (
                  <div key={t.id} className="bg-white border border-stone-200 p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div>
                      <span className="text-xs font-mono text-stone-500">{t.tenderReference}</span>
                      <h4 className="font-serif text-sm font-bold text-stone-950">{t.title}</h4>
                      <span className="text-xs text-stone-600">{t.procuringOrganisation} · {t.sourcePlatform}</span>
                    </div>
                    <button
                      onClick={() => onNavigate('tenders')}
                      className="px-3 py-1.5 border border-stone-300 text-xs font-medium hover:bg-stone-50 shrink-0"
                    >
                      View in Directory
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-stone-200 p-6 text-center space-y-2">
                <p className="font-serif text-base text-stone-800">No tender notices bookmarked yet.</p>
                <p className="text-xs text-stone-500">Browse verified tenders and bookmark opportunities for compliance tracking.</p>
                <button
                  onClick={() => onNavigate('tenders')}
                  className="mt-2 px-4 py-2 bg-[#0E4C56] text-white text-xs font-semibold hover:bg-[#09353C]"
                >
                  Explore Tenders
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Settings */}
      {activeTab === 'settings' && (
        <div className="max-w-xl bg-white border border-stone-200 p-6 space-y-6">
          <h3 className="font-serif text-lg font-bold text-stone-900">Account Governance</h3>

          <div className="space-y-2 border-b border-stone-100 pb-4 text-xs">
            <label className="block text-stone-600 font-medium">Full Name</label>
            <input
              type="text"
              readOnly
              value={user.name}
              className="w-full p-2 bg-stone-50 border border-stone-200 text-stone-700"
            />
          </div>

          <div className="space-y-2 border-b border-stone-100 pb-4 text-xs">
            <label className="block text-stone-600 font-medium">Email Address</label>
            <input
              type="text"
              readOnly
              value={user.email}
              className="w-full p-2 bg-stone-50 border border-stone-200 text-stone-700 font-mono"
            />
          </div>

          <div className="pt-2 space-y-4">
            <button
              onClick={logout}
              className="px-4 py-2 border border-stone-300 text-stone-800 text-xs font-semibold hover:bg-stone-50"
            >
              Sign Out of Session
            </button>

            <div className="pt-4 border-t border-rose-100 space-y-2">
              <h4 className="text-xs font-bold text-rose-800">Delete Account & Data</h4>
              <p className="text-[11px] text-stone-500">
                Permanently purge your account and saved bookmarks from our servers.
              </p>
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="px-4 py-2 bg-rose-700 text-white text-xs font-semibold hover:bg-rose-800 disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Permanently Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
