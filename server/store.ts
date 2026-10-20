import { Article, TenderNotice, OfficialSource, User } from './types.js';
import { INITIAL_ARTICLES } from './data/articles.js';
import { VERIFIED_TENDER_NOTICES, OFFICIAL_SOURCES } from './data/tenders.js';

class DataStore {
  private articles: Article[] = [...INITIAL_ARTICLES];
  private tenders: TenderNotice[] = [...VERIFIED_TENDER_NOTICES];
  private sources: OfficialSource[] = [...OFFICIAL_SOURCES];
  private users: Map<string, User> = new Map();
  private sessions: Map<string, string> = new Map(); // token -> userId

  constructor() {
    this.seedDefaultUsers();
  }

  private seedDefaultUsers() {
    // 1. Regular user account
    const defaultUser: User = {
      id: 'usr_default_researcher',
      email: 'researcher@tenderwise.in',
      name: 'Independent Researcher',
      role: 'user',
      savedArticleSlugs: ['how-to-start-a-government-tender-business-india'],
      savedTenderIds: ['tnd-gem-2026-0891'],
      createdAt: '2026-10-10T08:00:00Z'
    };
    this.users.set(defaultUser.id, defaultUser);

    // 2. Editorial Administrator account
    const adminUser: User = {
      id: 'usr_admin_editor',
      email: 'editor@tenderwise.in',
      name: 'Editorial Lead',
      role: 'admin',
      savedArticleSlugs: [],
      savedTenderIds: [],
      createdAt: '2026-03-01T08:00:00Z'
    };
    this.users.set(adminUser.id, adminUser);

    // Pre-authenticated session tokens for seamless demo/testing
    this.sessions.set('token_demo_user', defaultUser.id);
    this.sessions.set('token_demo_admin', adminUser.id);
  }

  // Session & Auth
  public getUserByToken(token?: string): User | null {
    if (!token) return null;
    const cleanToken = token.replace('Bearer ', '').trim();
    const userId = this.sessions.get(cleanToken);
    if (!userId) return null;
    return this.users.get(userId) || null;
  }

  public registerUser(name: string, email: string): { user: User; token: string } {
    for (const [, existing] of this.users) {
      if (existing.email.toLowerCase() === email.toLowerCase()) {
        const token = `token_${existing.id}_${Date.now()}`;
        this.sessions.set(token, existing.id);
        return { user: existing, token };
      }
    }

    const id = `usr_${Date.now()}`;
    const newUser: User = {
      id,
      email,
      name,
      role: 'user',
      savedArticleSlugs: [],
      savedTenderIds: [],
      createdAt: new Date().toISOString()
    };

    this.users.set(id, newUser);
    const token = `token_${id}_${Date.now()}`;
    this.sessions.set(token, id);
    return { user: newUser, token };
  }

  public loginUser(email: string): { user: User; token: string } | null {
    for (const [, user] of this.users) {
      if (user.email.toLowerCase() === email.toLowerCase()) {
        const token = `token_${user.id}_${Date.now()}`;
        this.sessions.set(token, user.id);
        return { user, token };
      }
    }
    return null;
  }

  public logout(token: string): boolean {
    const cleanToken = token.replace('Bearer ', '').trim();
    return this.sessions.delete(cleanToken);
  }

  public deleteUser(userId: string): boolean {
    for (const [t, uid] of this.sessions.entries()) {
      if (uid === userId) this.sessions.delete(t);
    }
    return this.users.delete(userId);
  }

  // Articles & Open Access
  public getAllArticles(params?: { search?: string; category?: string; accessLevel?: string; status?: string }) {
    let list = this.articles.filter(a => {
      if (params?.status) {
        return a.publicationStatus === params.status;
      }
      return a.publicationStatus === 'published';
    });

    if (params?.category && params.category !== 'All') {
      list = list.filter(a => a.category.toLowerCase() === params.category!.toLowerCase());
    }

    if (params?.search && params.search.trim()) {
      const q = params.search.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return list.map(a => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      summaryTakeaway: a.summaryTakeaway,
      category: a.category,
      tags: a.tags,
      featuredImage: a.featuredImage,
      imageSource: a.imageSource,
      imageLicense: a.imageLicense,
      author: a.author,
      publicationStatus: a.publicationStatus,
      publishedAt: a.publishedAt,
      updatedAt: a.updatedAt,
      accessLevel: 'free' as const,
      requiredCredits: 0,
      readingTimeMinutes: a.readingTimeMinutes,
      citationsCount: a.citations.length,
      factCheckStatus: a.factCheckStatus
    }));
  }

  public getArticleBySlug(slug: string, _userId?: string | null): { article: Article; isUnlocked: boolean } | null {
    const article = this.articles.find(a => a.slug === slug);
    if (!article) return null;

    // All published articles are 100% open and readable by anyone without paywalls or credits
    return {
      article: {
        ...article,
        accessLevel: 'free',
        requiredCredits: 0
      },
      isUnlocked: true
    };
  }

  // Tenders & Comparison
  public getTenders(params?: {
    search?: string;
    organisation?: string;
    state?: string;
    category?: string;
    status?: string;
    sourcePlatform?: string;
  }): TenderNotice[] {
    let list = [...this.tenders];

    if (params?.search && params.search.trim()) {
      const q = params.search.toLowerCase();
      list = list.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.tenderReference.toLowerCase().includes(q) ||
        t.procuringOrganisation.toLowerCase().includes(q) ||
        t.department.toLowerCase().includes(q)
      );
    }

    if (params?.organisation && params.organisation !== 'All') {
      list = list.filter(t => t.procuringOrganisation.toLowerCase().includes(params.organisation!.toLowerCase()));
    }

    if (params?.state && params.state !== 'All') {
      list = list.filter(t => t.locationState.toLowerCase() === params.state!.toLowerCase());
    }

    if (params?.category && params.category !== 'All') {
      list = list.filter(t => t.category.toLowerCase() === params.category!.toLowerCase());
    }

    if (params?.status && params.status !== 'All') {
      list = list.filter(t => t.tenderStatus === params.status);
    }

    if (params?.sourcePlatform && params.sourcePlatform !== 'All') {
      list = list.filter(t => t.sourcePlatform === params.sourcePlatform);
    }

    return list;
  }

  public getTenderById(id: string): TenderNotice | null {
    return this.tenders.find(t => t.id === id) || null;
  }

  public compareTenders(ids: string[]): TenderNotice[] {
    return this.tenders.filter(t => ids.includes(t.id));
  }

  // Official Sources
  public getSources(): OfficialSource[] {
    return this.sources;
  }

  // Bookmarks / Saved
  public toggleSavedArticle(userId: string, slug: string): string[] {
    const user = this.users.get(userId);
    if (!user) return [];
    const index = user.savedArticleSlugs.indexOf(slug);
    if (index > -1) {
      user.savedArticleSlugs.splice(index, 1);
    } else {
      user.savedArticleSlugs.push(slug);
    }
    return user.savedArticleSlugs;
  }

  public toggleSavedTender(userId: string, tenderId: string): string[] {
    const user = this.users.get(userId);
    if (!user) return [];
    const index = user.savedTenderIds.indexOf(tenderId);
    if (index > -1) {
      user.savedTenderIds.splice(index, 1);
    } else {
      user.savedTenderIds.push(tenderId);
    }
    return user.savedTenderIds;
  }

  // Admin Article Management
  public createArticle(articleData: Partial<Article>): Article {
    const id = `art_${Date.now()}`;
    const slug = articleData.slug || articleData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `article-${Date.now()}`;
    const newArticle: Article = {
      id,
      slug,
      title: articleData.title || 'Untitled Article',
      excerpt: articleData.excerpt || '',
      summaryTakeaway: articleData.summaryTakeaway || '',
      content: articleData.content || '',
      category: articleData.category || 'Government tender fundamentals',
      tags: articleData.tags || [],
      featuredImage: articleData.featuredImage || '/images/hero/hero-procurement-desk.jpg',
      imageSource: articleData.imageSource || 'TenderWise India Editorial',
      imageLicense: articleData.imageLicense || 'CC BY-NC-ND 4.0',
      imageAttribution: articleData.imageAttribution || 'TenderWise India Archive',
      author: articleData.author || {
        name: 'Editorial Staff',
        role: 'Research Associate',
        organization: 'TenderWise India'
      },
      publicationStatus: articleData.publicationStatus || 'draft',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seoTitle: articleData.seoTitle || articleData.title || '',
      seoDescription: articleData.seoDescription || articleData.excerpt || '',
      canonicalUrl: `https://tenderwise.in/archive/${slug}`,
      primaryKeywords: articleData.primaryKeywords || [],
      citations: articleData.citations || [],
      factCheckStatus: articleData.factCheckStatus || 'verified',
      accessLevel: 'free',
      requiredCredits: 0,
      readingTimeMinutes: articleData.readingTimeMinutes || 5,
      tableOfContents: articleData.tableOfContents || []
    };

    this.articles.unshift(newArticle);
    return newArticle;
  }

  public updateArticle(id: string, updates: Partial<Article>): Article | null {
    const index = this.articles.findIndex(a => a.id === id);
    if (index === -1) return null;
    this.articles[index] = {
      ...this.articles[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return this.articles[index];
  }

  public getAllAdminArticles(): Article[] {
    return this.articles;
  }
}

export const store = new DataStore();
