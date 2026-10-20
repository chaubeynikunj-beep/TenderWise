import React, { useState } from 'react';
import { Article, OfficialSource } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { IMAGE_MANIFEST } from '../config/imageManifest';

interface HomeViewProps {
  onNavigate: (view: string, param?: string) => void;
  articles: Article[];
  sources: OfficialSource[];
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, articles, sources }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const flagshipArticle = articles.find(
    a => a.slug === 'how-to-start-a-government-tender-business-india'
  ) || articles[0];

  const secondaryArticles = articles.filter(
    a => a.slug !== 'how-to-start-a-government-tender-business-india'
  ).slice(0, 3);

  const procurementSectors = [
    {
      id: 'civil-works',
      title: 'Civil Works & Highways',
      count: '42,000+ Tenders',
      image: '/images/categories/civil-works.jpg',
      desc: 'National highways, bridges, urban road networks, and government building construction.'
    },
    {
      id: 'it-hardware',
      title: 'IT Hardware & Telecom',
      count: '28,000+ Tenders',
      image: '/images/categories/it-hardware.jpg',
      desc: 'Enterprise servers, networking infrastructure, data center cloud services, and surveillance.'
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Biomedical',
      count: '19,500+ Tenders',
      image: '/images/categories/healthcare.jpg',
      desc: 'Hospital diagnostic devices, medical oxygen systems, and pharmaceuticals on GeM.'
    },
    {
      id: 'railway-power',
      title: 'Railway & Power Grids',
      count: '34,000+ Tenders',
      image: '/images/categories/railway-power.jpg',
      desc: 'IREPS railway traction, electrical sub-stations, and high-voltage transmission lines.'
    },
    {
      id: 'textiles',
      title: 'Textiles & Protective Gear',
      count: '11,200+ Tenders',
      image: '/images/categories/textiles.jpg',
      desc: 'Institutional uniforms, tactical protective apparel, and industrial linen manufacturing.'
    },
    {
      id: 'consultancy',
      title: 'Consultancy & Auditing',
      count: '14,800+ Tenders',
      image: '/images/categories/consultancy.jpg',
      desc: 'Third-party quality auditing, architectural engineering design, and statutory evaluations.'
    }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Discover on Official Hubs',
      desc: 'Learn how to filter CPPP (eprocure.gov.in) and GeM without paid third-party intermediaries.',
      image: '/images/articles/how-to-find-government-tenders-india.jpg',
      slug: 'how-to-find-government-tenders-india'
    },
    {
      step: '02',
      title: 'Prepare Statutory Files',
      desc: 'Assemble GST, Udyam, Class-3 DSC, and audited net worth statements without common disqualifications.',
      image: '/images/articles/documents-required-for-government-tenders.jpg',
      slug: 'documents-required-for-government-tenders'
    },
    {
      step: '03',
      title: 'Estimate Accurate Costs',
      desc: 'Calculate Bill of Quantities (BOQ), material escalation, and working capital buffers.',
      image: '/images/articles/how-to-calculate-tender-costs.jpg',
      slug: 'how-to-calculate-tender-costs'
    },
    {
      step: '04',
      title: 'Bank Security & Delivery',
      desc: 'Understand Earnest Money Deposit (EMD) exemptions and strict 60–90 day milestone payments.',
      image: '/images/articles/understanding-emd-and-performance-security.jpg',
      slug: 'understanding-emd-and-performance-security'
    }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('archive', searchQuery.trim());
    }
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Editorial Marquee Hero with Genuine Procurement Architecture Photograph */}
      <section className="border-b border-stone-200 pt-8 pb-12 bg-gradient-to-b from-[#FAF8F5] to-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#0F766E] block">
              Independent Procurement Research & Dossier Archive
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-950 leading-[1.15] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Understand Government Tenders. Make Better Business Decisions.
            </h1>
            <p className="text-base text-stone-600 font-sans max-w-2xl leading-relaxed">
              Find Opportunities. Understand Tenders. Bid Smarter. An independent research publication demystifying Indian public procurement, GeM seller onboarding, and statutory GFR compliance.
            </p>

            {/* Editorial Search Bar */}
            <form onSubmit={handleSearchSubmit} className="pt-2 max-w-xl flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search articles, GFR rules, GeM, bid security, or tender notices..."
                  className="w-full px-4 py-3 bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-hidden focus:border-[#0F766E]"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#0F766E] text-white text-sm font-semibold hover:bg-[#0d635c] transition-colors whitespace-nowrap"
              >
                Search Archive
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 pt-1">
              <span>Popular topics:</span>
              <button onClick={() => onNavigate('archive', 'GeM')} className="hover:text-stone-900 underline">GeM Registration</button>
              <span>·</span>
              <button onClick={() => onNavigate('archive', 'EMD')} className="hover:text-stone-900 underline">Bid Security & EMD</button>
              <span>·</span>
              <button onClick={() => onNavigate('archive', 'MSME')} className="hover:text-stone-900 underline">MSME Exemptions</button>
              <span>·</span>
              <button onClick={() => onNavigate('archive', 'Disqualification')} className="hover:text-stone-900 underline">Disqualification Traps</button>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="border border-stone-300 bg-white p-3 shadow-sm">
              <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                <ImageWithFallback
                  src="/images/hero/hero-procurement-desk.jpg"
                  alt="Modern government procurement complex and administrative center in India"
                  fallbackCategory="Institutional Architecture"
                  fallbackTitle="Indian Public Procurement Ecosystem"
                  priority={true}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-3 px-1 flex items-center justify-between text-[11px] text-stone-500">
                <span className="font-sans font-medium text-stone-700">Official Indian Procurement Hub</span>
                <span>GFR 2017 & PPP-MII Archive</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Lead Story Section */}
      {flagshipArticle && (
        <section className="max-w-7xl mx-auto px-6">
          <div className="flex items-baseline justify-between border-b border-stone-300 pb-3 mb-8">
            <div>
              <span className="text-xs uppercase font-sans font-semibold text-[#0F766E] tracking-wider block">
                Flagship Research Dossier
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-950 mt-0.5">
                Essential Procurement Foundations
              </h2>
            </div>
            <button
              onClick={() => onNavigate('archive')}
              className="text-xs font-semibold text-[#0F766E] hover:underline"
            >
              Browse All 16 Research Dossiers →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white border border-stone-200 p-6 lg:p-8">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
                <span className="font-medium text-[#0F766E]">{flagshipArticle.category}</span>
                <span>·</span>
                <span>{flagshipArticle.readingTimeMinutes} min read</span>
                <span>·</span>
                <span>{flagshipArticle.citations?.length || 4} Verified Citations</span>
              </div>

              <h3
                className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-snug hover:text-[#0F766E] transition-colors cursor-pointer"
                onClick={() => onNavigate('article', flagshipArticle.slug)}
              >
                {flagshipArticle.title}
              </h3>

              <p className="text-stone-600 text-sm leading-relaxed">
                {flagshipArticle.excerpt}
              </p>

              <div className="bg-stone-50 border-t border-b border-stone-200 py-3 px-4 my-4">
                <span className="text-xs uppercase font-sans font-bold tracking-wider text-stone-700 block mb-1">
                  Core Finding & Regulatory Takeaway:
                </span>
                <p className="text-xs text-stone-700 leading-relaxed italic font-serif">
                  "{flagshipArticle.summaryTakeaway}"
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('article', flagshipArticle.slug)}
                  className="px-5 py-2.5 bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#0d635c] transition-colors"
                >
                  Read Complete Research Dossier (Free Access)
                </button>
                <span className="text-xs text-stone-500">
                  By {flagshipArticle.author?.name || 'TenderWise India Editorial Team'} · Procurement Research Desk
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                className="overflow-hidden border border-stone-200 cursor-pointer group"
                onClick={() => onNavigate('article', flagshipArticle.slug)}
              >
                <ImageWithFallback
                  src={flagshipArticle.featuredImage}
                  alt={flagshipArticle.title}
                  fallbackCategory={flagshipArticle.category}
                  fallbackTitle={flagshipArticle.title}
                  className="w-full h-72 lg:h-84 object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              <div className="mt-2 text-[11px] text-stone-500 flex justify-between">
                <span>{flagshipArticle.imageLicense || 'CC BY-NC-ND 4.0'}</span>
                <span>Verified Research Archive</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Research Cards (Secondary Features) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="border-b border-stone-300 pb-3 mb-8">
          <span className="text-xs uppercase font-sans font-semibold text-[#0F766E] tracking-wider block">
            Featured Research Dossiers
          </span>
          <h2 className="font-serif text-2xl font-bold text-stone-950 mt-0.5">
            Operational Guides for Bidders & MSMEs
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            In-depth guides on statutory onboarding, documentation checklists, and financial costing with zero fluff.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryArticles.map(art => (
            <article
              key={art.id}
              className="bg-white border border-stone-200 flex flex-col justify-between hover:border-stone-400 transition-colors group cursor-pointer"
              onClick={() => onNavigate('article', art.slug)}
            >
              <div>
                <div className="relative overflow-hidden aspect-[4/3] bg-stone-100">
                  <ImageWithFallback
                    src={art.featuredImage}
                    alt={art.title}
                    fallbackCategory={art.category}
                    fallbackTitle={art.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/90 text-white text-[10px] uppercase tracking-widest px-2 py-0.5">
                    Research Dossier
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="text-xs text-stone-500 flex items-center gap-2">
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

              <div className="px-5 pb-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-[#0F766E] font-medium">
                <span>View Research Dossier →</span>
                <span className="text-stone-400 text-[11px]">{art.citationsCount || 1} citations</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Visual Workflow: How Government Tenders Work in India */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="border border-stone-300 bg-white p-8">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs uppercase font-sans font-bold text-[#0F766E] tracking-widest block">
              Process Demystified
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-950">
              How Indian Government Procurement Actually Works
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Public procurement follows a strict statutory progression from publication on CPPP or GeM through technical evaluation to financial award under GFR 2017.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map(step => (
              <div
                key={step.step}
                onClick={() => onNavigate('article', step.slug)}
                className="bg-stone-50 border border-stone-200 p-4 space-y-3 cursor-pointer hover:border-stone-400 transition-colors group"
              >
                <div className="aspect-[16/10] overflow-hidden bg-stone-200">
                  <ImageWithFallback
                    src={step.image}
                    alt={step.title}
                    fallbackCategory={`Phase ${step.step}`}
                    fallbackTitle={step.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 border border-teal-200">
                    Phase {step.step}
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-[#0F766E] transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Procurement Sectors with Category Photographs */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-300 pb-4 mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-sans font-bold text-[#0F766E] tracking-widest block">
              Sectoral Coverage
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-950 mt-1">
              Key Public Procurement Sectors
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Explore authentic tender opportunities across major civil, technical, and biomedical procurement categories.
            </p>
          </div>
          <button
            onClick={() => onNavigate('tenders')}
            className="text-xs font-semibold text-[#0F766E] hover:underline self-start sm:self-auto"
          >
            Open All Verified Tenders →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {procurementSectors.map(sec => (
            <div
              key={sec.id}
              onClick={() => onNavigate('tenders')}
              className="bg-white border border-stone-200 overflow-hidden hover:border-stone-400 transition-colors group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/9] overflow-hidden bg-stone-100 relative">
                  <ImageWithFallback
                    src={sec.image}
                    alt={sec.title}
                    fallbackCategory={sec.title}
                    fallbackTitle={sec.desc}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-stone-950/80 text-white text-[10px] font-mono px-2 py-0.5">
                    {sec.count}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-xl font-bold text-stone-950 group-hover:text-[#0F766E] transition-colors">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {sec.desc}
                  </p>
                </div>
              </div>
              <div className="px-5 pb-4 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-[#0F766E] font-medium">
                <span>Filter Opportunities in {sec.title}</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official Government Portals Operational Status Strip */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="border border-stone-200 bg-stone-100 p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#0F766E]">
                Verified Source Directory
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-950 mt-1">
                Official Indian Government Procurement Portals
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                Always confirm tenders directly on official .gov.in domains. All portals below require Class-3 DSC or e-Sign.
              </p>
            </div>
            <button
              onClick={() => onNavigate('sources')}
              className="px-4 py-2 border border-stone-300 bg-white text-xs font-semibold text-stone-800 hover:bg-stone-50 self-start md:self-auto transition-colors"
            >
              Full Portals Directory →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sources.slice(0, 3).map(src => (
              <div key={src.id} className="p-4 bg-white border border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900">{src.name}</span>
                  <span className="text-stone-500 font-mono text-[11px]">{src.status}</span>
                </div>
                <p className="text-xs text-stone-600 line-clamp-2">
                  {src.description}
                </p>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-stone-500">{src.activeTendersCountApprox}</span>
                  <a
                    href={src.portalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0F766E] hover:underline font-medium"
                  >
                    Visit Official Portal ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tender Discovery & Comparison Teaser with Infrastructure Imagery */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border border-stone-300 bg-white p-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#0F766E]">
              Verified Opportunity Registry
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-950 leading-tight">
              Filter Verified Tenders with Traceable Sources
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Explore active notices indexed directly from official repositories like GeM and CPPP. We clearly label missing summary data, provide verification timestamps, and allow side-by-side comparison.
            </p>
            
            {/* Visual Infrastructure Snippet */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="border border-stone-200 bg-stone-50 p-2">
                <div className="aspect-[16/10] overflow-hidden mb-2">
                  <ImageWithFallback
                    src="/images/infrastructure/highway-corridor.jpg"
                    alt="National highway and expressway corridor construction in India"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[11px] font-semibold text-stone-800 block">EPC & Road Projects</span>
                <span className="text-[10px] text-stone-500">CPWD / NHAI Bids</span>
              </div>
              <div className="border border-stone-200 bg-stone-50 p-2">
                <div className="aspect-[16/10] overflow-hidden mb-2">
                  <ImageWithFallback
                    src="/images/infrastructure/solar-energy-grid.jpg"
                    alt="Commercial solar power park and renewable energy infrastructure"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[11px] font-semibold text-stone-800 block">Renewable Power Grids</span>
                <span className="text-[10px] text-stone-500">SECI / NTPC Tenders</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('tenders')}
                className="px-5 py-2.5 bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#0d635c] transition-colors"
              >
                Search Verified Tenders
              </button>
              <button
                onClick={() => onNavigate('compare')}
                className="px-5 py-2.5 border border-stone-300 text-stone-800 text-xs font-semibold hover:bg-stone-50 transition-colors"
              >
                Open Comparison Tool
              </button>
            </div>
          </div>

          <div className="space-y-4 border-t lg:border-t-0 lg:border-l border-stone-200 pt-6 lg:pt-0 lg:pl-8">
            <span className="text-xs uppercase font-sans font-bold text-[#0F766E] tracking-widest block">
              Open Access Platform Charter
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              100% Free & Open Procurement Research
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              TenderWise India operates as a completely free public research and advisory archive. All research dossiers, procedural manuals, checklists, and statutory analyses are accessible without paywalls, credits, or subscriptions.
            </p>
            <div className="bg-stone-50 p-4 border border-stone-200 space-y-2 text-xs text-stone-700">
              <div className="flex items-center justify-between font-medium">
                <span>Complete Article Library:</span>
                <span className="font-mono font-semibold text-[#0F766E]">Free Public Access</span>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span>Tender Comparison Matrix:</span>
                <span className="font-mono font-semibold text-[#0F766E]">No Paywalls</span>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span className="flex items-center gap-1.5">
                  <span>Official Portal Directory:</span>
                  <span className="text-[10px] bg-teal-100 text-[#0F766E] font-bold px-1.5 py-0.2">Operational</span>
                </span>
                <span className="font-mono font-semibold text-[#0F766E]">Live Status</span>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span>Statutory References & Forms:</span>
                <span className="font-mono font-semibold text-[#0F766E]">Always Included</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('archive')}
              className="text-xs text-[#0F766E] font-semibold hover:underline block pt-1"
            >
              Explore Complete Research Archive →
            </button>
          </div>
        </div>
      </section>

      {/* Editorial Research Integrity Strip with Editorial Photo */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#10243A] text-stone-200 p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-stone-800">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs uppercase font-sans font-bold text-teal-400 tracking-widest block">
              Editorial Standards
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Independent Research Grounded in Primary Government Circulars
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              TenderWise India never fabricates tender notices, claims inside connections, or sells commercial leads. All research dossiers cite authoritative General Financial Rules (GFR), 2017 and GeM Special Conditions of Contract (SCC).
            </p>
            <div className="flex items-center gap-4 text-xs pt-1">
              <button
                onClick={() => onNavigate('about')}
                className="text-teal-300 font-semibold hover:underline"
              >
                Read Our Research Charter →
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-stone-400 hover:text-white"
              >
                Editorial Desk Contact
              </button>
            </div>
          </div>
          <div className="w-full md:w-64 shrink-0 border border-stone-700 bg-stone-900/50 p-2">
            <div className="aspect-[4/3] overflow-hidden">
              <ImageWithFallback
                src="/images/editorial/research-desk.jpg"
                alt="TenderWise India procurement research desk"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[10px] text-stone-400 mt-2 block text-center font-mono">
              Editorial Research Desk
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
