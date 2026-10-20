import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { useAuth } from '../context/AuthContext';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface ArticleDetailViewProps {
  slug: string;
  onNavigate: (view: string, param?: string) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ slug, onNavigate }) => {
  const { user, toggleSavedArticle } = useAuth();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTocId, setActiveTocId] = useState<string>('');

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const token = localStorage.getItem('tw_auth_token');
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`/api/articles/${slug}`, { headers });
        if (res.ok) {
          const data = await res.json();
          setArticle(data.article);
        } else {
          setErrorMsg('Research dossier could not be found or has been withdrawn.');
        }
      } catch (err: any) {
        setErrorMsg('Network error while retrieving dossier.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo(0, 0);
  }, [slug]);

  const isSaved = user?.savedArticleSlugs.includes(slug) || false;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="font-serif text-xl text-stone-600">Retrieving verified research dossier...</p>
      </div>
    );
  }

  if (errorMsg || !article) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-stone-900">Dossier Unavailable</h2>
        <p className="text-sm text-stone-600">{errorMsg || 'The requested article does not exist.'}</p>
        <button
          onClick={() => onNavigate('archive')}
          className="px-4 py-2 bg-[#0E4C56] text-white text-xs font-semibold"
        >
          Return to Research Archive
        </button>
      </div>
    );
  }

  return (
    <article className="pb-24">
      {/* Editorial Breadcrumbs */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-3 text-xs text-stone-500 flex items-center gap-2 overflow-x-auto">
          <button onClick={() => onNavigate('home')} className="hover:text-stone-900">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('archive')} className="hover:text-stone-900">Research Archive</button>
          <span>/</span>
          <button onClick={() => onNavigate('archive', article.category)} className="hover:text-stone-900">{article.category}</button>
          <span>/</span>
          <span className="text-stone-900 font-medium truncate max-w-xs">{article.title}</span>
        </div>
      </div>

      {/* Hero Header */}
      <header className="max-w-4xl mx-auto px-6 pt-10 pb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 font-sans">
          <span className="font-semibold text-[#0E4C56] uppercase tracking-wider">{article.category}</span>
          <span>·</span>
          <span>Published {new Date(article.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          <span>·</span>
          <span>Updated {new Date(article.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          <span>·</span>
          <span>{article.readingTimeMinutes} min read</span>
          <span>·</span>
          <span className="text-stone-700 font-medium">Fact-Checked: GFR 2017</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-950 leading-[1.2] tracking-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-700 font-sans leading-relaxed">
          {article.excerpt}
        </p>

        {/* Byline & Actions */}
        <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div>
            <span className="font-bold text-stone-900 block">{article.author.name}</span>
            <span className="text-stone-500">{article.author.role} · {article.author.organization}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleSavedArticle(slug)}
              className={`px-3 py-1.5 border text-xs font-medium transition-colors ${
                isSaved ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
              }`}
            >
              {isSaved ? '✓ Saved in Account' : 'Bookmark Dossier'}
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Dossier link copied to clipboard.');
              }}
              className="px-3 py-1.5 border border-stone-300 bg-white text-stone-700 text-xs font-medium hover:bg-stone-50"
            >
              Share
            </button>
          </div>
        </div>
      </header>

      {/* Featured Image Presentation */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div className="overflow-hidden border border-stone-300 bg-stone-100">
          <ImageWithFallback
            src={article.featuredImage}
            alt={article.title}
            fallbackCategory={article.category}
            fallbackTitle={article.title}
            priority={true}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>
        <div className="mt-2 text-xs text-stone-500 flex flex-col sm:flex-row justify-between gap-1 italic font-serif">
          <span>{article.imageAttribution}</span>
          <span className="font-sans text-[11px] not-italic text-stone-400">License: {article.imageLicense}</span>
        </div>
      </div>

      {/* Asymmetric Reading Canvas (70% Body / 30% Margin Rail) */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Main Reading Column (70%) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Direct Answer / Key Takeaway Callout */}
          <div className="bg-white border border-stone-300 p-6 shadow-2xs">
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#0E4C56] block mb-2">
              Key Regulatory Takeaway
            </span>
            <p className="font-serif text-lg text-stone-900 leading-relaxed italic">
              "{article.summaryTakeaway}"
            </p>
          </div>

          {/* Full Structured Content (Open Access) */}
          <div
            className="prose-editorial max-w-none text-stone-800"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />


          {/* Official Verification Notes & Limitations */}
          <div className="border-t border-stone-300 pt-8 mt-12 space-y-3">
            <h4 className="font-serif text-lg font-bold text-stone-900">
              Limitations and Verification Notes
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {article.limitationsNotes ||
                'This research dossier is published strictly for educational and analytical purposes. Specific tender requirements, tender fees, EMD amounts, and pre-qualification parameters are defined solely by the respective procuring entity in the published Notice Inviting Tender (NIT). Always download the signed Corrigendum notices directly from official portals.'}
            </p>
          </div>

          {/* Footnoted Source Citations */}
          {article.citations && article.citations.length > 0 && (
            <div className="border-t border-stone-300 pt-8 space-y-4">
              <h4 className="font-serif text-lg font-bold text-stone-900">
                Verified Source Citations
              </h4>
              <ol className="list-decimal pl-5 space-y-3 text-xs text-stone-700">
                {article.citations.map((c, idx) => (
                  <li key={c.id || idx} id={`citation-${c.number}`}>
                    <span className="font-medium text-stone-900">{c.text}</span>
                    <span className="text-stone-500"> — {c.sourceName}. </span>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#0E4C56] hover:underline break-all font-mono text-[11px]"
                    >
                      {c.url} ↗
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Bottom Contextual CTA */}
          <div className="border border-stone-300 bg-[#FAF8F5] p-6 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-stone-900">Need to Compare Opportunities?</h4>
              <p className="text-xs text-stone-600 mt-1">Check verified live notices from GeM and CPPP with our side-by-side comparison matrix.</p>
            </div>
            <button
              onClick={() => onNavigate('compare')}
              className="px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 shrink-0"
            >
              Open Tender Comparison Tool
            </button>
          </div>

        </div>

        {/* Desktop Sidebar Rail (30%) */}
        <aside className="lg:col-span-4 space-y-8 sticky top-24">
          
          {/* Table of Contents */}
          {article.tableOfContents && article.tableOfContents.length > 0 && (
            <div className="bg-white border border-stone-200 p-5 space-y-3">
              <span className="text-xs uppercase tracking-widest font-sans font-bold text-stone-900 block border-b border-stone-100 pb-2">
                Table of Contents
              </span>
              <nav className="space-y-1.5 text-xs text-stone-600 max-h-96 overflow-y-auto pr-1">
                {article.tableOfContents.map(toc => (
                  <a
                    key={toc.id}
                    href={`#${toc.id}`}
                    onClick={() => setActiveTocId(toc.id)}
                    className={`block py-1 hover:text-[#0E4C56] transition-colors leading-snug ${
                      activeTocId === toc.id ? 'text-[#0E4C56] font-semibold pl-1 border-l-2 border-[#0E4C56]' : ''
                    } ${toc.level === 3 ? 'pl-3 text-stone-500' : ''}`}
                  >
                    {toc.title}
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* Verified Official Links Box */}
          <div className="bg-stone-100 border border-stone-200 p-5 space-y-3">
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-stone-900 block">
              Official Reference Links
            </span>
            <ul className="space-y-2 text-xs text-stone-700">
              <li>
                <a
                  href="https://gem.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0E4C56] hover:underline font-medium block"
                >
                  GeM SPV Portal (gem.gov.in) ↗
                </a>
                <span className="text-[11px] text-stone-500">Government e-Marketplace</span>
              </li>
              <li className="pt-2 border-t border-stone-200">
                <a
                  href="https://eprocure.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0E4C56] hover:underline font-medium block"
                >
                  CPPP eProcure (eprocure.gov.in) ↗
                </a>
                <span className="text-[11px] text-stone-500">Central Public Procurement</span>
              </li>
              <li className="pt-2 border-t border-stone-200">
                <a
                  href="https://udyamregistration.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0E4C56] hover:underline font-medium block"
                >
                  Udyam Portal (udyamregistration.gov.in) ↗
                </a>
                <span className="text-[11px] text-stone-500">Ministry of MSME</span>
              </li>
            </ul>
          </div>

          {/* Open Research Archive info in rail */}
          <div className="bg-white border border-stone-200 p-5 space-y-3">
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#0E4C56] block">
              Open Research Archive
            </span>
            <h4 className="font-serif text-base font-bold text-stone-900">
              Free & Open Procurement Knowledge
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every research guide and regulatory breakdown on TenderWise India is publicly accessible with verified statutory references, procurement checklists, and official source links.
            </p>
            <button
              onClick={() => onNavigate('archive')}
              className="w-full py-2 bg-[#0E4C56] text-white text-xs font-semibold hover:bg-[#09353C] transition-colors"
            >
              Explore All Articles
            </button>
          </div>

        </aside>

      </div>
    </article>
  );
};
