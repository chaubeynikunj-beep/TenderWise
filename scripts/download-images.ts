import fs from 'fs';
import path from 'path';

interface ImageDownload {
  dest: string;
  unsplashId: string;
}

const downloads: ImageDownload[] = [
  { dest: 'public/images/hero/hero-procurement-desk.jpg', unsplashId: 'photo-1486406146926-c627a92ad1ab' },
  { dest: 'public/images/articles/how-to-read-a-tender-document.jpg', unsplashId: 'photo-1503387762-592deb58ef4e' },
  { dest: 'public/images/articles/how-to-evaluate-tender-eligibility.jpg', unsplashId: 'photo-1450133064473-71024230f91b' },
  { dest: 'public/images/articles/how-to-calculate-tender-costs.jpg', unsplashId: 'photo-1554224155-8d04cb21cd6c' },
  { dest: 'public/images/articles/understanding-emd-and-performance-security.jpg', unsplashId: 'photo-1565372195458-9de0b320ef04' },
  { dest: 'public/images/articles/how-to-avoid-tender-disqualification.jpg', unsplashId: 'photo-1454165804606-c3d57bc86b40' },
  { dest: 'public/images/articles/understanding-state-e-procurement-portals.jpg', unsplashId: 'photo-1517048676732-d65bc937f952' },
  { dest: 'public/images/articles/how-to-compare-tender-opportunities.jpg', unsplashId: 'photo-1460925895917-afdab827c52f' },
  { dest: 'public/images/articles/common-government-procurement-terms-explained.jpg', unsplashId: 'photo-1589829545856-d10d557cf95f' },
  { dest: 'public/images/articles/how-to-verify-whether-a-tender-notice-is-genuine.jpg', unsplashId: 'photo-1563986768609-322da13575f3' },
  { dest: 'public/images/articles/understanding-contract-delivery-and-payment-terms.jpg', unsplashId: 'photo-1586528116311-ad8dd3c8310d' },
  { dest: 'public/images/articles/procurement-opportunities-for-msmes.jpg', unsplashId: 'photo-1581091226825-a6a2a5aee158' },
  { dest: 'public/images/articles/how-to-prepare-a-tender-submission-checklist.jpg', unsplashId: 'photo-1484480974693-6ca0a78fb36b' },
  { dest: 'public/images/categories/civil-works.jpg', unsplashId: 'photo-1504307651254-35680f356dfd' },
  { dest: 'public/images/categories/it-hardware.jpg', unsplashId: 'photo-1558494949-ef010cbdcc31' },
  { dest: 'public/images/categories/healthcare.jpg', unsplashId: 'photo-1516549655169-df83a0774514' },
  { dest: 'public/images/categories/railway-power.jpg', unsplashId: 'photo-1474487548417-781cb71495f3' },
  { dest: 'public/images/categories/textiles.jpg', unsplashId: 'photo-1558769132-cb1aea458c5e' },
  { dest: 'public/images/categories/consultancy.jpg', unsplashId: 'photo-1551836022-d5d88e9218df' },
  { dest: 'public/images/infrastructure/highway-corridor.jpg', unsplashId: 'photo-1519817650390-64a93db51149' },
  { dest: 'public/images/infrastructure/solar-energy-grid.jpg', unsplashId: 'photo-1508514177221-188b1cf16e9d' },
  { dest: 'public/images/infrastructure/urban-metro.jpg', unsplashId: 'photo-1513475382585-d06e58bcb0e0' },
  { dest: 'public/images/infrastructure/port-container-freight.jpg', unsplashId: 'photo-1578575437130-527eed3abbec' },
  { dest: 'public/images/infrastructure/hospital-diagnostic-lab.jpg', unsplashId: 'photo-1581595220892-b0739db3ba8c' },
  { dest: 'public/images/editorial/research-desk.jpg', unsplashId: 'photo-1522071820081-009f0129c71c' },
  { dest: 'public/images/editorial/statutory-audit.jpg', unsplashId: 'photo-1450133064473-71024230f91b' }
];

// Copy existing 4 high-res local images to semantic names
const copies = [
  {
    src: 'src/assets/images/tenderwise_flagship_guide_1792044586121.jpg',
    dest: 'public/images/articles/how-to-start-a-government-tender-business-india.jpg'
  },
  {
    src: 'src/assets/images/tender_digital_eprocurement_1792044587598.jpg',
    dest: 'public/images/articles/how-to-find-government-tenders-india.jpg'
  },
  {
    src: 'src/assets/images/tender_gem_msme_procurement_1792044587385.jpg',
    dest: 'public/images/articles/how-to-register-as-seller-on-gem.jpg'
  },
  {
    src: 'src/assets/images/tender_documentation_compliance_1792044587510.jpg',
    dest: 'public/images/articles/documents-required-for-government-tenders.jpg'
  }
];

async function run() {
  console.log('Copying local cornerstone assets...');
  for (const c of copies) {
    const dir = path.dirname(c.dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (fs.existsSync(c.src)) {
      fs.copyFileSync(c.src, c.dest);
      console.log(`Copied ${c.src} -> ${c.dest}`);
    }
  }

  console.log('Downloading genuine photos for image library...');
  for (const item of downloads) {
    const dir = path.dirname(item.dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Download optimal web resolution (width: 1000px, quality 80)
    const url = `https://images.unsplash.com/${item.unsplashId}?w=1000&auto=format&fit=crop&q=80`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`Failed to download ${item.unsplashId}: HTTP ${res.status}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(item.dest, buffer);
      console.log(`Saved ${item.dest} (${Math.round(buffer.length / 1024)} KB)`);
    } catch (err) {
      console.error(`Error downloading ${item.dest}:`, err);
    }
  }
  console.log('All downloads finished successfully!');
}

run();
