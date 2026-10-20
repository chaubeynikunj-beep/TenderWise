import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { store } from './server/store.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Helper middleware for auth extraction
const extractUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const user = store.getUserByToken(authHeader);
    if (user) {
      (req as any).user = user;
    }
  }
  next();
};

app.use(extractUser);

// -------------------------------------------------------------
// API: Authentication & User Accounts
// -------------------------------------------------------------
app.post('/api/auth/register', (req, res) => {
  const { name, email } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }
  const result = store.registerUser(name, email);
  return res.json(result);
});

app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }
  const result = store.loginUser(email);
  if (!result) {
    // If not existing, auto-register for demo convenience
    const newReg = store.registerUser(email.split('@')[0], email);
    return res.json(newReg);
  }
  return res.json(result);
});

app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    store.logout(authHeader);
  }
  return res.json({ success: true });
});

app.get('/api/auth/me', (req, res) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }
  return res.json({ user });
});

app.delete('/api/auth/delete-account', (req, res) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }
  store.deleteUser(user.id);
  return res.json({ success: true, message: 'Account deleted successfully.' });
});

// -------------------------------------------------------------
// API: Articles & Research Archive
// -------------------------------------------------------------
app.get('/api/articles', (req, res) => {
  const { search, category, accessLevel, status } = req.query as Record<string, string>;
  const articles = store.getAllArticles({ search, category, accessLevel, status });
  return res.json({ articles });
});

app.get('/api/articles/:slug', (req, res) => {
  const { slug } = req.params;
  const user = (req as any).user;
  const result = store.getArticleBySlug(slug, user ? user.id : null);
  if (!result) {
    return res.status(404).json({ error: 'Research article not found.' });
  }
  return res.json(result);
});

app.post('/api/articles/:slug/unlock', (_req, res) => {
  // All articles are free and open public access
  return res.json({ success: true, isUnlocked: true, message: 'Article is freely accessible.' });
});

// -------------------------------------------------------------
// API: Tenders & Official Discovery
// -------------------------------------------------------------
app.get('/api/tenders', (req, res) => {
  const { search, organisation, state, category, status, sourcePlatform } = req.query as Record<string, string>;
  const tenders = store.getTenders({ search, organisation, state, category, status, sourcePlatform });
  return res.json({ tenders, count: tenders.length });
});

app.get('/api/tenders/:id', (req, res) => {
  const { id } = req.params;
  const tender = store.getTenderById(id);
  if (!tender) {
    return res.status(404).json({ error: 'Tender notice not found in verified registry.' });
  }
  return res.json({ tender });
});

app.post('/api/tenders/compare', (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'Tender IDs array is required.' });
  }
  const compared = store.compareTenders(ids);
  return res.json({ tenders: compared });
});

// -------------------------------------------------------------
// API: Official Source Portals
// -------------------------------------------------------------
app.get('/api/sources', (req, res) => {
  const sources = store.getSources();
  return res.json({ sources });
});

// -------------------------------------------------------------
// API: Saved Articles & Tenders
// -------------------------------------------------------------
app.post('/api/saved/article/toggle', (req, res) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ error: 'Sign in to save research articles.' });
  }
  const { slug } = req.body;
  const saved = store.toggleSavedArticle(user.id, slug);
  return res.json({ savedArticleSlugs: saved });
});

app.post('/api/saved/tender/toggle', (req, res) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ error: 'Sign in to bookmark tender notices.' });
  }
  const { tenderId } = req.body;
  const saved = store.toggleSavedTender(user.id, tenderId);
  return res.json({ savedTenderIds: saved });
});

// -------------------------------------------------------------
// API: Editorial Administration (Protected)
// -------------------------------------------------------------
const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const user = (req as any).user;
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied: Editorial Administrator role required.' });
  }
  next();
};

app.get('/api/admin/articles', requireAdmin, (_req, res) => {
  const articles = store.getAllAdminArticles();
  return res.json({ articles });
});

app.post('/api/admin/articles', requireAdmin, (req, res) => {
  const created = store.createArticle(req.body);
  return res.json({ article: created });
});

app.put('/api/admin/articles/:id', requireAdmin, (req, res) => {
  const updated = store.updateArticle(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Article not found.' });
  }
  return res.json({ article: updated });
});


// -------------------------------------------------------------
// API: Institutional Editorial Contact & Fact-Check Queries
// -------------------------------------------------------------
const contactSubmissions: Array<{
  id: string;
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  timestamp: string;
}> = [];

app.post('/api/contact', (req, res) => {
  const { name, email, subject, category, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const submission = {
    id: `req_tw_${Date.now()}`,
    name: String(name).trim(),
    email: String(email).trim(),
    subject: String(subject || 'General Inquiry').trim(),
    category: String(category || 'General').trim(),
    message: String(message).trim(),
    timestamp: new Date().toISOString()
  };

  contactSubmissions.push(submission);
  return res.json({
    success: true,
    referenceId: submission.id,
    message: 'Your inquiry has been received by the TenderWise India Editorial Desk. Our team investigates and responds within 2 business days.'
  });
});

// -------------------------------------------------------------
// SEO: Sitemap.xml & Robots.txt
// -------------------------------------------------------------
app.get('/sitemap.xml', (_req, res) => {
  const articles = store.getAllArticles();
  const urls = [
    'https://tenderwise.in/',
    'https://tenderwise.in/archive',
    'https://tenderwise.in/tenders',
    'https://tenderwise.in/sources',
    'https://tenderwise.in/membership',
    'https://tenderwise.in/about',
    'https://tenderwise.in/contact',
    'https://tenderwise.in/terms',
    'https://tenderwise.in/privacy',
    'https://tenderwise.in/subscription-policy'
  ];

  articles.forEach(a => {
    urls.push(`https://tenderwise.in/archive/${a.slug}`);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.send(xml);
});

app.get('/robots.txt', (_req, res) => {
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: https://tenderwise.in/sitemap.xml
`;
  res.setHeader('Content-Type', 'text/plain');
  res.send(robots);
});

// -------------------------------------------------------------
// Static Asset Serving (Public Images)
// -------------------------------------------------------------
app.use('/images', express.static(path.resolve(process.cwd(), 'public/images')));

// -------------------------------------------------------------
// Vite Dev Server / Static Production Server
// -------------------------------------------------------------
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`TenderWise India running on port ${PORT} (mode: ${isProduction ? 'production' : 'development'})`);
  });
}

startServer();
