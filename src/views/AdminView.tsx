import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Article } from '../types';

interface AdminViewProps {
  onNavigate: (view: string, param?: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onNavigate }) => {
  const { user, token } = useAuth();
  const [adminArticles, setAdminArticles] = useState<Article[]>([]);
  const [activeTab, setActiveTab] = useState<'articles' | 'new-article'>('articles');
  const [loading, setLoading] = useState(true);

  // Form state for creating/editing article
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Government tender fundamentals');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [pubStatus, setPubStatus] = useState<'published' | 'draft' | 'withdrawn'>('published');
  const [saving, setSaving] = useState(false);

  const fetchAdminData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const artRes = await fetch('/api/admin/articles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (artRes.ok) {
        const data = await artRes.json();
        setAdminArticles(data.articles);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [token]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto px-6 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-stone-900">Access Restricted</h2>
        <p className="text-xs text-stone-600">
          Editorial Administrator privileges are required to view this interface.
        </p>
        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-2 bg-[#0E4C56] text-white text-xs font-semibold hover:bg-[#09353C]"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          category,
          excerpt,
          content,
          accessLevel: 'free',
          publicationStatus: pubStatus,
          requiredCredits: 0
        })
      });

      if (res.ok) {
        alert('Article created successfully!');
        setTitle('');
        setExcerpt('');
        setContent('');
        setActiveTab('articles');
        fetchAdminData();
      } else {
        alert('Failed to save article.');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: 'published' | 'draft' | 'withdrawn') => {
    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ publicationStatus: newStatus })
      });
      if (res.ok) {
        fetchAdminData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-300 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#0E4C56]">
            Editorial Governance & Content Management
          </span>
          <h1 className="text-3xl font-serif font-bold text-stone-950 mt-1">
            Editorial Administration
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Manage research dossiers, verify citations, record image licensing, and oversee open-access publications.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-3 py-1.5 text-xs font-semibold ${
              activeTab === 'articles' ? 'bg-[#0E4C56] text-white' : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-50'
            }`}
          >
            All Articles ({adminArticles.length})
          </button>
          <button
            onClick={() => setActiveTab('new-article')}
            className={`px-3 py-1.5 text-xs font-semibold ${
              activeTab === 'new-article' ? 'bg-[#0E4C56] text-white' : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-50'
            }`}
          >
            + New Dossier
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center py-12 text-stone-600 font-serif">Loading administrative records...</p>
      ) : (
        <>
          {/* Tab 1: Articles List */}
          {activeTab === 'articles' && (
            <div className="bg-white border border-stone-300 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-100 border-b border-stone-300 text-stone-900">
                    <th className="p-3 font-semibold">Title & Category</th>
                    <th className="p-3 font-semibold">Access Policy</th>
                    <th className="p-3 font-semibold">Fact Check</th>
                    <th className="p-3 font-semibold">Status</th>
                    <th className="p-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-700">
                  {adminArticles.map(a => (
                    <tr key={a.id} className="hover:bg-stone-50">
                      <td className="p-3">
                        <span className="font-serif font-bold text-stone-900 block text-sm">{a.title}</span>
                        <span className="text-[11px] text-stone-500">{a.category} · {a.readingTimeMinutes} min</span>
                      </td>
                      <td className="p-3 font-sans text-stone-600">
                        <span className="inline-block px-2 py-0.5 bg-stone-100 border border-stone-200 text-[11px] font-medium text-stone-700">
                          Free Public Access
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-emerald-800 font-medium">Verified (GFR 2017)</span>
                      </td>
                      <td className="p-3">
                        <select
                          value={a.publicationStatus}
                          onChange={e => handleUpdateStatus(a.id, e.target.value as any)}
                          className="p-1 border border-stone-300 bg-white text-xs"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                          <option value="withdrawn">Withdrawn</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => onNavigate('article', a.slug)}
                          className="text-[#0E4C56] font-medium hover:underline"
                        >
                          Preview ↗
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 2: New Article Form */}
          {activeTab === 'new-article' && (
            <form onSubmit={handleCreateArticle} className="max-w-3xl bg-white border border-stone-300 p-8 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-stone-950">Compose Research Dossier</h3>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800">Article Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Understanding MSME Tendering Under the 2026 Budget Amendments"
                  className="w-full p-2.5 border border-stone-300 text-sm focus:outline-none focus:border-[#0E4C56]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full p-2 border border-stone-300 bg-white"
                  >
                    <option value="Government tender fundamentals">Government tender fundamentals</option>
                    <option value="GeM and seller registration">GeM and seller registration</option>
                    <option value="Central government procurement">Central government procurement</option>
                    <option value="Tender documentation">Tender documentation</option>
                    <option value="Bid preparation">Bid preparation</option>
                    <option value="Tender costing and working capital">Tender costing and working capital</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-800 block mb-1">Publication Status</label>
                  <select
                    value={pubStatus}
                    onChange={e => setPubStatus(e.target.value as any)}
                    className="w-full p-2 border border-stone-300 bg-white"
                  >
                    <option value="published">Published Immediately</option>
                    <option value="draft">Save as Draft</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800">Executive Summary / Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={e => setExcerpt(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 border border-stone-300 text-sm focus:outline-none focus:border-[#0E4C56]"
                  placeholder="Concise 2-sentence summary for search cards..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-800">Full Content (HTML / Numbered Sections)</label>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  rows={8}
                  className="w-full p-2.5 border border-stone-300 font-mono text-xs focus:outline-none focus:border-[#0E4C56]"
                  placeholder="<section id='sec-1'><h2>1. Section Title</h2><p>Section analysis...</p></section>"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-[#0E4C56] text-white text-xs font-semibold hover:bg-[#09353C] disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Publish Research Dossier'}
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};
