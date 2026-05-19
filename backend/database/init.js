const fs = require('fs');
const path = require('path');

const DATA_DIR   = path.join(__dirname, 'data');
const metaFile   = path.join(DATA_DIR, '_meta.json');
const SEED_VERSION = 3;

function needsReseed() {
  if (!fs.existsSync(path.join(DATA_DIR, 'products.json'))) return true;
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
