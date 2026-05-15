const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { requireAdmin } = require('../middleware/auth');

// GET /api/categories
router.get('/', (req, res) => {
  const categories = db.all('categories');
  const products = db.all('products');
  const result = categories.map(cat => ({
    ...cat,
    productCount: products.filter(p => p.categoryId === cat.id).length,
  }));
  res.json(result);
});

// GET /api/categories/:slug
router.get('/:slug', (req, res) => {
  const cat = db.where('categories', c => c.slug === req.params.slug)[0];
  if (!cat) return res.status(404).json({ error: 'Category not found' });
  const products = db.where('products', p => p.categoryId === cat.id);
  res.json({ ...cat, products });
});

// POST /api/categories (admin)
router.post('/', requireAdmin, (req, res) => {
  const { name, slug, icon, description } = req.body;
  if (!name || !slug) return res.status(400).json({ error: 'name and slug are required' });
  const exists = db.where('categories', c => c.slug === slug)[0];
  if (exists) return res.status(409).json({ error: 'Slug already exists' });
  const cat = db.insert('categories', { name, slug, icon, description });
  res.status(201).json(cat);
});

// PUT /api/categories/:id (admin)
router.put('/:id', requireAdmin, (req, res) => {
  const updated = db.update('categories', req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Category not found' });
  res.json(updated);
});

// DELETE /api/categories/:id (admin)
router.delete('/:id', requireAdmin, (req, res) => {
  const deleted = db.delete('categories', req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Category not found' });
  res.json({ success: true });
});

module.exports = router;
