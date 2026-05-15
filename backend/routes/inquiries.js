const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { requireAdmin } = require('../middleware/auth');

// POST /api/inquiries  (public — from gateway form or Enquire Now)
router.post('/', (req, res) => {
  const { name, businessName, phone, city, email, productId, productName, message, source } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'name and phone are required' });

  const inquiry = db.insert('inquiries', {
    name,
    businessName: businessName || '',
    phone,
    city: city || '',
    email: email || '',
    productId: productId ? Number(productId) : null,
    productName: productName || '',
    message: message || '',
    source: source || 'website',
    status: 'new',
  });

  res.status(201).json({ success: true, id: inquiry.id, message: 'Inquiry submitted successfully' });
});

// GET /api/inquiries (admin) — supports ?status= and ?search=
router.get('/', requireAdmin, (req, res) => {
  let inquiries = db.all('inquiries').reverse();
  const { status, search } = req.query;
  if (status) inquiries = inquiries.filter(i => i.status === status);
  if (search) {
    const q = search.toLowerCase();
    inquiries = inquiries.filter(i =>
      (i.name || '').toLowerCase().includes(q) ||
      (i.businessName || '').toLowerCase().includes(q) ||
      (i.phone || '').includes(q) ||
      (i.city || '').toLowerCase().includes(q)
    );
  }
  res.json(inquiries);
});

// GET /api/inquiries/:id (admin)
router.get('/:id', requireAdmin, (req, res) => {
  const inquiry = db.find('inquiries', req.params.id);
  if (!inquiry) return res.status(404).json({ error: 'Inquiry not found' });
  res.json(inquiry);
});

// PATCH /api/inquiries/:id/status (admin)
router.patch('/:id/status', requireAdmin, (req, res) => {
  const { status } = req.body;
  const valid = ['new', 'in-progress', 'resolved'];
  if (!valid.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  const updated = db.update('inquiries', req.params.id, { status });
  if (!updated) return res.status(404).json({ error: 'Inquiry not found' });
  res.json(updated);
});

// DELETE /api/inquiries/:id (admin)
router.delete('/:id', requireAdmin, (req, res) => {
  const deleted = db.delete('inquiries', req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Inquiry not found' });
  res.json({ success: true });
});

module.exports = router;
