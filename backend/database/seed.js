const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const write = (name, data) =>
  fs.writeFileSync(path.join(DATA_DIR, `${name}.json`), JSON.stringify(data, null, 2));

const categories = [
  { id: 1, name: 'Vitamins',                slug: 'vitamins',               icon: 'science',      description: 'Essential vitamins for daily health',               createdAt: new Date().toISOString() },
  { id: 2, name: 'Minerals',                slug: 'minerals',               icon: 'diamond',      description: 'Key minerals for optimal body function',            createdAt: new Date().toISOString() },
  { id: 3, name: 'Effervescent Tablets',    slug: 'effervescent-tablets',   icon: 'bubble_chart', description: 'Fast-dissolving effervescent health tablets',        createdAt: new Date().toISOString() },
  { id: 4, name: 'Paralysis & Cancer Care', slug: 'paralysis-cancer-care',  icon: 'favorite',     description: 'Specialised care supplements for critical conditions', createdAt: new Date().toISOString() },
];

function makeProduct(id, imgNum, categoryId, name) {
  return {
    id,
    categoryId,
    name,
    slug: `product-${imgNum}`,
    tagline: '',
    description: '',
    image: `/products/${imgNum}.png`,
    badge: null,
    capsuleCount: 60,
    form: 'Capsule',
    grade: 'Pharma Grade',
    origin: 'India',
    shelfLife: '24 months',
    storage: 'Cool & dry place',
    specs: [],
    benefits: [],
    inStock: true,
    createdAt: new Date().toISOString(),
  };
}

const products = [];
let pid = 1;

// Vitamins — images 3 to 25
for (let n = 3; n <= 25; n++) products.push(makeProduct(pid++, n, 1, `Vitamin ${n}`));

// Minerals — images 26 to 38
for (let n = 26; n <= 38; n++) products.push(makeProduct(pid++, n, 2, `Mineral ${n}`));

// Effervescent Tablets — images 132 to 134
for (let n = 132; n <= 134; n++) products.push(makeProduct(pid++, n, 3, `Effervescent Tablet ${n}`));

// Paralysis & Cancer Care — images 135 to 136
for (let n = 135; n <= 136; n++) products.push(makeProduct(pid++, n, 4, `Care Product ${n}`));

const passwordHash = bcrypt.hashSync('healthcare', 10);
const admins = [
  { id: 1, username: 'lavesh', email: 'admin@laveshhealthcare.com', password: passwordHash, createdAt: new Date().toISOString() },
];

write('categories', categories);
write('products', products);
write('admins', admins);
write('inquiries', []);

console.log(`Seeded: ${categories.length} categories, ${products.length} products`);
console.log('Admin -> username: admin | password: admin123');
