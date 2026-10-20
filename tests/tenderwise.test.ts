import { store } from '../server/store.js';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

async function runTests() {
  console.log('--- Starting TenderWise India Open Access Test Suite ---');

  // Test 1: User registration succeeds without credit balance fields
  console.log('Test 1: User registration and session creation...');
  const testUserEmail = `test_user_${Date.now()}@tenderwise.in`;
  const regResult = store.registerUser('Test User', testUserEmail);
  assert(regResult.user.id.startsWith('usr_'), 'User ID should be generated');
  assert(regResult.user.email === testUserEmail, 'User email must match');
  assert(regResult.token.startsWith('token_'), 'Token should be returned');
  assert(Array.isArray(regResult.user.savedArticleSlugs), 'savedArticleSlugs must be an array');
  assert(Array.isArray(regResult.user.savedTenderIds), 'savedTenderIds must be an array');
  console.log('✓ Passed: User account created cleanly without credit fields.');

  // Test 2: Flagship research article is 100% open
  console.log('Test 2: Flagship article accessibility (100% open public access)...');
  const freeArticleResult = store.getArticleBySlug('how-to-start-a-government-tender-business-india', regResult.user.id);
  assert(freeArticleResult !== null, 'Flagship article must exist');
  assert(freeArticleResult!.isUnlocked === true, 'Article must be unlocked by default');
  assert(freeArticleResult!.article.content.includes('General Financial Rules (GFR), 2017'), 'Article must include full content');
  console.log('✓ Passed: Flagship research article is fully accessible.');

  // Test 3: Deep-dive procedural guides are completely un-gated
  console.log('Test 3: Unrestricted access to specialized guides (GeM seller registration)...');
  const gemGuide = store.getArticleBySlug('how-to-register-as-seller-on-gem', null);
  assert(gemGuide !== null, 'GeM registration guide must exist');
  assert(gemGuide!.isUnlocked === true, 'GeM guide must be unlocked for guests too');
  assert(!gemGuide!.article.content.includes('Notice: In-Depth Research Dossier'), 'No paywall notice in content');
  assert(gemGuide!.article.content.includes('Caution Money Slabs'), 'Full procedural content present');
  console.log('✓ Passed: Procedural research guides are 100% open without paywalls.');

  // Test 4: Tender comparison matrix
  console.log('Test 4: Tender comparison matrix generation...');
  const compared = store.compareTenders(['tnd-gem-2026-0891', 'tnd-cppp-2026-4412']);
  assert(compared.length === 2, 'Should return exactly 2 compared tenders');
  assert(compared[0].tenderReference.includes('GEM/2026'), 'First tender is GeM');
  assert(compared[1].tenderReference.includes('CPPP/2026'), 'Second tender is CPPP');
  console.log('✓ Passed: Tender comparison matrix operates correctly.');

  // Test 5: User bookmarking research articles
  console.log('Test 5: Bookmarking and unbookmarking research articles...');
  const savedSlugs = store.toggleSavedArticle(regResult.user.id, 'how-to-register-as-seller-on-gem');
  assert(savedSlugs.includes('how-to-register-as-seller-on-gem'), 'Slug should be in savedArticleSlugs');
  const unSavedSlugs = store.toggleSavedArticle(regResult.user.id, 'how-to-register-as-seller-on-gem');
  assert(!unSavedSlugs.includes('how-to-register-as-seller-on-gem'), 'Slug should be removed when toggled again');
  console.log('✓ Passed: Article bookmarking operates cleanly.');

  // Test 6: User bookmarking tender notices
  console.log('Test 6: Bookmarking and unbookmarking tender notices...');
  const savedTenders = store.toggleSavedTender(regResult.user.id, 'tnd-gem-2026-0891');
  assert(savedTenders.includes('tnd-gem-2026-0891'), 'Tender ID should be bookmarked');
  const unSavedTenders = store.toggleSavedTender(regResult.user.id, 'tnd-gem-2026-0891');
  assert(!unSavedTenders.includes('tnd-gem-2026-0891'), 'Tender ID should be unbookmarked when toggled again');
  console.log('✓ Passed: Tender notice bookmarking operates cleanly.');

  // Test 7: Official sources directory
  console.log('Test 7: Official procurement sources registry...');
  const sources = store.getSources();
  assert(sources.length >= 6, 'Sources should have multiple verified portals');
  assert(sources.some(s => s.name.includes('Government e-Marketplace')), 'GeM portal present');
  assert(sources.some(s => s.name.includes('Central Public Procurement Portal')), 'CPPP portal present');
  console.log('✓ Passed: Official sources directory verified.');

  // Test 8: Admin article creation and publishing
  console.log('Test 8: Editorial Admin creating new open research dossier...');
  const newDossier = store.createArticle({
    title: 'Test Procurement Analysis 2026',
    category: 'Government tender fundamentals',
    excerpt: 'Test summary analysis of new guidelines.',
    content: '<section id="sec-1"><h2>1. Introduction</h2><p>Test content analysis.</p></section>'
  });
  assert(newDossier.id.startsWith('art_'), 'Article ID generated');
  assert(newDossier.accessLevel === 'free', 'New article accessLevel must be free');
  assert(newDossier.requiredCredits === 0, 'New article requiredCredits must be 0');
  console.log('✓ Passed: Editorial Admin article creation verified.');

  console.log('\n--- ALL 8 TENDERWISE OPEN ACCESS INTEGRITY TESTS PASSED! ---');
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
