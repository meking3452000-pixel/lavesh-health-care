const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, 'data', 'products.json');

if (!fs.existsSync(productsFile)) {
  console.log('First run — seeding database...');
  require('./seed.js');
} else {
  console.log('Database already initialised.');
}
