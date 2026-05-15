const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const db = require('../database/db');
const { requireAdmin } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// GET /api/products?category=&search=&inStock=
router.get('/', (req, res) => {
  let products = db.all('products');
  const { category, search, inStock } = req.query;

  if (category) {
    const cat = db.where('categories', c => c.slug === category || c.id === Number(category))[0];
    if (cat) products = products.filter(p => p.categoryId === cat.id);
  }
  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }
  if (inStock === 'true') products = products.filter(p => p.inStock);

  // Attach category info
  const categories = db.all('categories');
  const result = products.map(p => ({
    ...p,
    category: categories.find(c => c.id === p.categoryId) || null,
  }));

  res.json(result);
});

// GET /api/products/:slug
router.get('/:slug', (req, res) => {
  const product = db.where('products', p => p.slug === req.params.slug || p.id === Number(req.params.slug))[0];
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const category = db.find('categories', product.categoryId);
  const related = db.where('products', p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3);

  res.json({ ...product, category, related });
});

// POST /api/products (admin)
router.post('/', requireAdmin, upload.single('image'), (req, res) => {
  const { name, slug, categoryId, tagline, description, capsuleCount, form, grade, origin, shelfLife, storage: stor, inStock } = req.body;
  if (!name || !slug || !categoryId) return res.status(400).json({ error: 'name, slug, categoryId are required' });

  const exists = db.where('products', p => p.slug === slug)[0];
  if (exists) return res.status(409).json({ error: 'Slug already exists' });

  let image = req.body.image || '';
  if (req.file) image = `/uploads/${req.file.filename}`;

  let specs = [];
  let benefits = [];
  try { specs = JSON.parse(req.body.specs || '[]'); } catch {}
  try { benefits = JSON.parse(req.body.benefits || '[]'); } catch {}

  const product = db.insert('products', {
    name, slug, categoryId: Number(categoryId), tagline, description,
    image, badge: req.body.badge || null,
    capsuleCount: Number(capsuleCount) || 60,
    form, grade, origin, shelfLife, storage: stor,
    specs, benefits, inStock: inStock !== 'false',
  });
  res.status(201).json(product);
});

// PUT /api/products/:id (admin)
router.put('/:id', requireAdmin, upload.single('image'), (req, res) => {
  const changes = { ...req.body };
  if (req.file) changes.image = `/uploads/${req.file.filename}`;
  if (changes.categoryId) changes.categoryId = Number(changes.categoryId);
  if (changes.capsuleCount) changes.capsuleCount = Number(changes.capsuleCount);
  if (changes.inStock !== undefined) changes.inStock = changes.inStock !== 'false';
  try { if (typeof changes.specs === 'string') changes.specs = JSON.parse(changes.specs); } catch {}
  try { if (typeof changes.benefits === 'string') changes.benefits = JSON.parse(changes.benefits); } catch {}

  const updated = db.update('products', req.params.id, changes);
  if (!updated) return res.status(404).json({ error: 'Product not found' });
  res.json(updated);
});

// DELETE /api/products/:id (admin)
router.delete('/:id', requireAdmin, (req, res) => {
  const deleted = db.delete('products', req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Product not found' });
  res.json({ success: true });
});

module.exports = router;
