import React, { useState, useMemo } from 'react';
import { Article } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface ArchiveViewProps {
  articles: Article[];
  initialCategoryOrSearch?: string;
  onNavigate: (view: string, param?: string) => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({
  articles,
  initialCategoryOrSearch = '',
  onNavigate
}) => {
  const [search, setSearch] = useState(
    initialCategoryOrSearch && !initialCategoryOrSearch.includes('fundamentals') ? initialCategoryOrSearch : ''
  );
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategoryOrSearch && initialCategoryOrSearch.includes('fundamentals') ? initialCategoryOrSearch : 'All'
  );

  const categories = [
    'All',
    'Government tender fundamentals',
    'GeM and seller registration',
    'Central government procurement',
    'State e-procurement',
    'Tender documentation',
    'Eligibility and compliance',
    'Bid preparation',
    'Tender costing and working capital',
    'Procurement policies and rules'
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      // Category match
      if (selectedCategory !== 'All' && art.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Search match
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = art.title.toLowerCase().includes(q);
        const matchExcerpt = art.excerpt.toLowerCase().includes(q);
        const matchTags = art.tags.some(t => t.toLowerCase().includes(q));
        const matchCat = art.category.toLowerCase().includes(q);
        if (!matchTitle && !matchExcerpt && !matchTags && !matchCat) {
          return false;
        }
      }
      return true;
    });
  }, [articles, selectedCategory, search]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-300 pb-6">
        <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#0E4C56]">
          Searchable Knowledge Repository
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 mt-1">
          Government Procurement Research Archive
        </h1>
        <p className="text-sm text-stone-600 mt-2 max-w-3xl leading-relaxed">
          Comprehensive, source-cited research dossiers on Indian public procurement, GeM seller guidelines, financial securities, and standard bidding document evaluation.
        </p>
      </div>

      {/* Controls: Search & Filters */}
      <div className="space-y-4 bg-white border border-stone-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by keywords, GFR rules, documentation, or portals..."
              className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#0E4C56]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-700"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs text-stone-500 font-sans">
            <span className="px-3 py-1.5 bg-stone-100 border border-stone-200 text-stone-700 font-medium">
              ✓ 100% Free Public Access
            </span>
          </div>
        </div>

        {/* Categories segmented list */}
        <div className="pt-2 border-t border-stone-100">
          <span className="text-xs font-semibold text-stone-700 block mb-2">Category:</span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#0E4C56] text-white'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900 border border-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count & Status */}
      <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-200 pb-3">
        <span>
          Showing <strong className="text-stone-900">{filteredArticles.length}</strong> of {articles.length} research dossiers
        </span>
        {(selectedCategory !== 'All' || search.trim() !== '') && (
          <button
            onClick={() => { setSelectedCategory('All'); setSearch(''); }}
            className="text-[#0E4C56] hover:underline"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(art => (
            <article
              key={art.id}
              onClick={() => onNavigate('article', art.slug)}
              className="bg-white border border-stone-200 flex flex-col justify-between hover:border-stone-400 transition-colors group cursor-pointer"
            >
              <div>
                <div className="relative overflow-hidden aspect-[16/10] bg-stone-100">
                  <ImageWithFallback
                    src={art.featuredImage}
                    alt={art.title}
                    fallbackCategory={art.category}
                    fallbackTitle={art.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-stone-900/90 text-white text-[10px] uppercase tracking-widest px-2 py-0.5">
                    Open Research Dossier
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="text-xs text-stone-500 flex items-center gap-1.5 font-sans">
                    <span>{art.category}</span>
                    <span>·</span>
                    <span>{art.readingTimeMinutes} min</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#0F766E] transition-colors line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-[#0F766E] font-medium group-hover:underline">
                  Read Dossier →
                </span>
                <span className="text-stone-400 text-[11px]">
                  Fact-Checked: GFR 2017
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-stone-200 p-8 space-y-4">
          <p className="font-serif text-xl font-bold text-stone-800">
            No research dossiers match your search criteria.
          </p>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Try adjusting your search terms or selecting a broader category from the filters above.
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearch(''); }}
            className="px-4 py-2 bg-[#0E4C56] text-white text-xs font-semibold hover:bg-[#09353C]"
          >
            Clear Filters & View All
          </button>
        </div>
      )}
    </div>
  );
};
