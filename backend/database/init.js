const fs = require('fs');
const path = require('path');

const DATA_DIR  = path.join(__dirname, 'data');
const metaFile  = path.join(DATA_DIR, '_meta.json');
const catsFile  = path.join(DATA_DIR, 'categories.json');
const SEED_VERSION = 3;

// Old slugs that should no longer exist
const STALE_SLUGS = ['herbal', 'amino-acids', 'weight-management', 'gut-health',
                     'herbal-extract-capsules', 'mineral-capsules', 'vitamin-capsules'];

function hasStaleData() {
  try {
    const cats = JSON.parse(fs.readFileSync(catsFile, 'utf-8'));
    return cats.some(c => STALE_SLUGS.includes(c.slug));
  } catch { return false; }
}

function needsReseed() {
  if (!fs.existsSync(path.join(DATA_DIR, 'products.json'))) return true;
  if (hasStaleData()) return true;
  try {
    const meta = JSON.parse(fs.readFileSync(metaFile, 'utf-8'));
    return meta.seedVersion !== SEED_VERSION;
  } catch { return true; }
}

if (needsReseed()) {
  console.log('Seeding database (version ' + SEED_VERSION + ')...');
  require('./seed.js');
  fs.writeFileSync(metaFile, JSON.stringify({ seedVersion: SEED_VERSION }));
} else {
  console.log('Database already at seed version ' + SEED_VERSION + '.');
}
