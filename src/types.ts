export interface Author {
  name: string;
  role: string;
  organization: string;
}

export interface Citation {
  id: string;
  number: number;
  text: string;
  sourceName: string;
  url: string;
  verifiedAt: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  summaryTakeaway: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  imageSource: string;
  imageLicense: string;
  imageAttribution: string;
  author: Author;
  publicationStatus: 'published' | 'draft' | 'withdrawn';
  publishedAt: string;
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  primaryKeywords: string[];
  citations: Citation[];
  factCheckStatus: 'verified' | 'under_review' | 'flagged';
  accessLevel?: 'free' | 'premium';
  requiredCredits?: number;
  readingTimeMinutes: number;
  tableOfContents: { id: string; title: string; level: number }[];
  faqs?: { question: string; answer: string }[];
  limitationsNotes?: string;
  relatedSlugs?: string[];
  citationsCount?: number;
}

export interface TenderNotice {
  id: string;
  tenderReference: string;
  title: string;
  procuringOrganisation: string;
  department: string;
  locationState: string;
  locationCity: string;
  category: string;
  publicationDate: string;
  submissionDeadline: string;
  tenderStatus: 'Open' | 'Under Evaluation' | 'Awarded' | 'Cancelled';
  sourcePlatform: 'GeM' | 'CPPP / eProcure' | 'Defence eProc' | 'State e-Procurement' | 'IREPS';
  sourceUrl: string;
  estimatedValueInr: number | null;
  bidSecurityEmdInr: number | null;
  msmeExemptionAvailable: boolean | null;
  experienceYearsRequired: number | null;
  technicalSolvencyRequiredInr: number | null;
  deliveryPeriodMonths: number | null;
  lastVerifiedTimestamp: string;
  summaryScope: string;
  verificationNotes: string;
}

export interface OfficialSource {
  id: string;
  name: string;
  shortCode: string;
  jurisdiction: 'Central' | 'State' | 'Public Enterprise' | 'Defence';
  portalUrl: string;
  description: string;
  activeTendersCountApprox: string;
  requiresDsc: boolean;
  dscTypeRequired: string;
  status: 'Operational' | 'Scheduled Maintenance' | 'High Traffic';
  lastChecked: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'editor' | 'admin';
  savedArticleSlugs: string[];
  savedTenderIds: string[];
  createdAt: string;
}

