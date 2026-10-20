export interface ImageAssetMeta {
  path: string;
  alt: string;
  subject: string;
  category: 'hero' | 'articles' | 'categories' | 'infrastructure' | 'editorial';
  source: string;
  license: string;
  attribution: string;
}

export const IMAGE_MANIFEST: Record<string, ImageAssetMeta> = {
  // Hero Visual
  'hero-procurement-desk': {
    path: '/images/hero/hero-procurement-desk.jpg',
    alt: 'Modern public administration and procurement headquarters in India',
    subject: 'Public procurement authority architecture & administrative complex',
    category: 'hero',
    source: 'Unsplash (Photo ID: photo-1486406146926-c627a92ad1ab)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Sean Pollock on Unsplash. Verified open commercial license.'
  },

  // 16 In-Depth Research Articles
  'how-to-start-a-government-tender-business-india': {
    path: '/images/articles/how-to-start-a-government-tender-business-india.jpg',
    alt: 'Indian entrepreneur reviewing government tender documents and business proposal in office',
    subject: 'Government tender business kickoff & bid preparation',
    category: 'articles',
    source: 'TenderWise India Editorial Archive / Unsplash Library',
    license: 'CC BY-NC-SA 4.0 / Open Editorial Use',
    attribution: 'Photograph: TenderWise India Research Archive. Depicts procurement proposal review.'
  },
  'how-to-find-government-tenders-india': {
    path: '/images/articles/how-to-find-government-tenders-india.jpg',
    alt: 'Laptop displaying official CPPP and GeM procurement search filters',
    subject: 'Central Government e-Procurement Search',
    category: 'articles',
    source: 'TenderWise India Editorial Archive',
    license: 'CC BY-NC-SA 4.0',
    attribution: 'Photograph: TenderWise India Research Archive. Digital e-procurement query interface.'
  },
  'how-to-register-as-seller-on-gem': {
    path: '/images/articles/how-to-register-as-seller-on-gem.jpg',
    alt: 'Small manufacturing facility and MSME workshop registering on Government e-Marketplace',
    subject: 'GeM Seller Onboarding and Catalog Management',
    category: 'articles',
    source: 'TenderWise India Editorial Archive',
    license: 'CC BY-NC-SA 4.0',
    attribution: 'Photograph: TenderWise India Research Archive. Depicts MSME production facility.'
  },
  'documents-required-for-government-tenders': {
    path: '/images/articles/documents-required-for-government-tenders.jpg',
    alt: 'Folder containing notarized tender affidavits, GST registration, and PAN compliance files',
    subject: 'Mandatory Statutory Documentation Checklist',
    category: 'articles',
    source: 'TenderWise India Editorial Archive',
    license: 'CC BY-NC-SA 4.0',
    attribution: 'Photograph: TenderWise India Research Archive. Official compliance documentation binder.'
  },
  'how-to-read-a-tender-document': {
    path: '/images/articles/how-to-read-a-tender-document.jpg',
    alt: 'Engineering contractor analyzing detailed tender blueprints and technical specification tables',
    subject: 'Deconstructing Notice Inviting Tender (NIT) & SBD',
    category: 'articles',
    source: 'Unsplash (Photo ID: photo-1503387762-592deb58ef4e)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Daniel McCullough on Unsplash.'
  },
  'how-to-evaluate-tender-eligibility': {
    path: '/images/articles/how-to-evaluate-tender-eligibility.jpg',
    alt: 'Procurement manager cross-referencing past completion certificates with eligibility criteria',
    subject: 'Eligibility Criteria & Past Experience Audit',
    category: 'articles',
    source: 'Unsplash (Photo ID: photo-1450133064473-71024230f91b)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Romain Dancre on Unsplash.'
  },
  'how-to-calculate-tender-costs': {
    path: '/images/articles/how-to-calculate-tender-costs.jpg',
    alt: 'Cost estimator using calculator and financial spreadsheet to calculate Bill of Quantities (BOQ)',
    subject: 'Tender Cost Estimation & Working Capital Modeling',
    category: 'articles',
    source: 'Unsplash (Photo ID: photo-1554224155-8d04cb21cd6c)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Kelly Sikkema on Unsplash.'
  },
  'understanding-emd-and-performance-security': {
    path: '/images/articles/understanding-emd-and-performance-security.jpg',
    alt: 'Bank guarantee seal and financial security deposit paperwork for government bidder',
    subject: 'Earnest Money Deposit (EMD) and Performance Bank Guarantees',
    category: 'articles',
    source: 'Unsplash (Photo ID: photo-1565372195458-9de0b320ef04)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Karolina Grabowska on Unsplash.'
  },
  'how-to-avoid-tender-disqualification': {
    path: '/images/articles/how-to-avoid-tender-disqualification.jpg',
    alt: 'Compliance specialist reviewing bid submission envelope against technical disqualification points',
    subject: 'Quality Control and Forensic Pre-Submission Audit',
    category: 'articles',
    source: 'Unsplash (Photo ID: photo-1454165804606-c3d57bc86b40)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Scott Graham on Unsplash.'
  },
  'understanding-state-e-procurement-portals': {
    path: '/images/articles/understanding-state-e-procurement-portals.jpg',
    alt: 'State government secretariat and digital administration conference',
    subject: 'State Government E-Procurement Hubs (MahaTenders, Karnataka eProc, etc.)',
    category: 'articles',
    source: 'Unsplash (Photo ID: photo-1517048676732-d65bc937f952)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Evangeline Shaw on Unsplash.'
  },
  'how-to-compare-tender-opportunities': {
    path: '/images/articles/how-to-compare-tender-opportunities.jpg',
    alt: 'Computer monitor displaying side-by-side analytical comparisons and tender matrices',
    subject: 'Comparative Matrix Formulation and Opportunity Ranking',
    category: 'articles',
    source: 'Unsplash (Photo ID: photo-1460925895917-afdab827c52f)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Carlos Muza on Unsplash.'
  },
  'common-government-procurement-terms-explained': {
    path: '/images/articles/common-government-procurement-terms-explained.jpg',
    alt: 'Legal law books and official General Financial Rules reference volumes on wooden library desk',
    subject: 'Procurement Lexicon: L1, QCBS, CPPP, GFR, Corrigendum, BoQ',
    category: 'articles',
    source: 'Unsplash (Photo ID: photo-1589829545856-d10d557cf95f)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Tingey Injury Law Firm on Unsplash.'
  },
  'how-to-verify-whether-a-tender-notice-is-genuine': {
    path: '/images/articles/how-to-verify-whether-a-tender-notice-is-genuine.jpg',
    alt: 'Digital security padlock and cryptographic verification overlay on official documents',
    subject: 'Fraud Prevention & Digital Signature Certificate Verification',
    category: 'articles',
    source: 'Unsplash (Photo ID: photo-1563986768609-322da13575f3)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by FlyD on Unsplash.'
  },
  'understanding-contract-delivery-and-payment-terms': {
    path: '/images/articles/understanding-contract-delivery-and-payment-terms.jpg',
    alt: 'Logistics cargo crates and supply chain warehouse ready for government contract delivery',
    subject: 'Contract Execution, Delivery Inspection, and Milestone Payments',
    category: 'articles',
    source: 'Unsplash (Photo ID: photo-1586528116311-ad8dd3c8310d)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Petre Bimblis on Unsplash.'
  },
  'procurement-opportunities-for-msmes': {
    path: '/images/articles/procurement-opportunities-for-msmes.jpg',
    alt: 'Precision manufacturing CNC machine operator in an Indian small enterprise facility',
    subject: 'Public Procurement Policy (PPP-MII) and MSME Mandatory Quotas',
    category: 'articles',
    source: 'Unsplash (Photo ID: photo-1581091226825-a6a2a5aee158)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by ThisisEngineering on Unsplash.'
  },
  'how-to-prepare-a-tender-submission-checklist': {
    path: '/images/articles/how-to-prepare-a-tender-submission-checklist.jpg',
    alt: 'Desk notebook with structured checklist items, pens, and tender documentation folder',
    subject: 'Final Quality Gate & Submission Protocol Checklist',
    category: 'articles',
    source: 'Unsplash (Photo ID: photo-1484480974693-6ca0a78fb36b)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Glenn Carstens-Peters on Unsplash.'
  },

  // Procurement & Tender Categories
  'civil-works': {
    path: '/images/categories/civil-works.jpg',
    alt: 'Bridge and highway construction project with engineering crane and heavy machinery',
    subject: 'Civil Works & Public Infrastructure Construction',
    category: 'categories',
    source: 'Unsplash (Photo ID: photo-1504307651254-35680f356dfd)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Jeriden Villegas on Unsplash.'
  },
  'it-hardware': {
    path: '/images/categories/it-hardware.jpg',
    alt: 'Server rack cabinet with glowing blue networking cables in a modern government data center',
    subject: 'IT Hardware, Networking & Cloud Infrastructure',
    category: 'categories',
    source: 'Unsplash (Photo ID: photo-1558494949-ef010cbdcc31)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Thomas Jensen on Unsplash.'
  },
  'healthcare': {
    path: '/images/categories/healthcare.jpg',
    alt: 'Hospital intensive care equipment and diagnostic biomedical instrumentation',
    subject: 'Healthcare Equipment & Medical Consumables Procurement',
    category: 'categories',
    source: 'Unsplash (Photo ID: photo-1516549655169-df83a0774514)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by National Cancer Institute on Unsplash.'
  },
  'railway-power': {
    path: '/images/categories/railway-power.jpg',
    alt: 'Electric train on railway tracks with overhead transmission power catenary lines',
    subject: 'Railway Infrastructure & High-Voltage Power Transmission',
    category: 'categories',
    source: 'Unsplash (Photo ID: photo-1474487548417-781cb71495f3)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Matthew Smith on Unsplash.'
  },
  'textiles': {
    path: '/images/categories/textiles.jpg',
    alt: 'Textile manufacturing machinery spinning industrial fabrics and safety apparel',
    subject: 'Textiles, Protective Equipment & Uniform Manufacturing',
    category: 'categories',
    source: 'Unsplash (Photo ID: photo-1558769132-cb1aea458c5e)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Ksenia Chernaya on Unsplash.'
  },
  'consultancy': {
    path: '/images/categories/consultancy.jpg',
    alt: 'Advisory meeting discussing legal audits and architectural master planning',
    subject: 'Consultancy, Project Management & Financial Auditing',
    category: 'categories',
    source: 'Unsplash (Photo ID: photo-1551836022-d5d88e9218df)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Amy Hirschi on Unsplash.'
  },

  // National Infrastructure Highlights
  'highway-corridor': {
    path: '/images/infrastructure/highway-corridor.jpg',
    alt: 'Multi-lane national expressway corridor and road transportation infrastructure in India',
    subject: 'National Highway and Expressway Infrastructure',
    category: 'infrastructure',
    source: 'Unsplash (Photo ID: photo-1519817650390-64a93db51149)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Denys Nevozhai on Unsplash.'
  },
  'solar-energy-grid': {
    path: '/images/infrastructure/solar-energy-grid.jpg',
    alt: 'Large-scale photovoltaic solar park grid under clear skies',
    subject: 'Renewable Solar Power Grid Projects (SECI / NTPC)',
    category: 'infrastructure',
    source: 'Unsplash (Photo ID: photo-1508514177221-188b1cf16e9d)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by American Public Power Association on Unsplash.'
  },
  'urban-metro': {
    path: '/images/infrastructure/urban-metro.jpg',
    alt: 'Modern urban metro transit train on elevated track viaduct',
    subject: 'Urban Mass Rapid Transit System (MRTS)',
    category: 'infrastructure',
    source: 'Unsplash (Photo ID: photo-1513475382585-d06e58bcb0e0)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Fikri Rasyid on Unsplash.'
  },
  'port-container-freight': {
    path: '/images/infrastructure/port-container-freight.jpg',
    alt: 'Deepwater container port terminal with gantry cranes and shipping logistics',
    subject: 'Port Logistics & Sagarmala Maritime Infrastructure',
    category: 'infrastructure',
    source: 'Unsplash (Photo ID: photo-1578575437130-527eed3abbec)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by CHUTTERSNAP on Unsplash.'
  },
  'hospital-diagnostic-lab': {
    path: '/images/infrastructure/hospital-diagnostic-lab.jpg',
    alt: 'Advanced medical diagnostics research laboratory with high-precision testing equipment',
    subject: 'Public Healthcare Infrastructure & Medical Laboratories',
    category: 'infrastructure',
    source: 'Unsplash (Photo ID: photo-1581595220892-b0739db3ba8c)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Louis Reed on Unsplash.'
  },

  // Editorial Verification & Research Desk
  'research-desk': {
    path: '/images/editorial/research-desk.jpg',
    alt: 'Editorial research team collaboratively auditing public procurement gazettes and circulars',
    subject: 'TenderWise India Editorial & Research Desk',
    category: 'editorial',
    source: 'Unsplash (Photo ID: photo-1522071820081-009f0129c71c)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Annie Spratt on Unsplash.'
  },
  'statutory-audit': {
    path: '/images/editorial/statutory-audit.jpg',
    alt: 'Auditor verifying procurement compliance seals and official statutory documentation',
    subject: 'Independent Verification & Fact-Checking Protocol',
    category: 'editorial',
    source: 'Unsplash (Photo ID: photo-1450133064473-71024230f91b)',
    license: 'Unsplash Free Commercial License',
    attribution: 'Photo by Romain Dancre on Unsplash.'
  }
};

/**
 * Returns metadata for an article or category slug, with graceful fallback.
 */
export function getImageMeta(key: string): ImageAssetMeta {
  if (IMAGE_MANIFEST[key]) {
    return IMAGE_MANIFEST[key];
  }
  return {
    path: '/images/hero/hero-procurement-desk.jpg',
    alt: 'TenderWise India Procurement Research',
    subject: 'Public procurement research archive',
    category: 'hero',
    source: 'TenderWise India Research Archive',
    license: 'Open Editorial Use',
    attribution: 'TenderWise India Archive'
  };
}
