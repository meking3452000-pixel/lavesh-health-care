const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const { requireAdmin, JWT_SECRET } = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

  const admin = db.where('admins', a => a.username === username)[0];
  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, username: admin.username });
});

// POST /api/auth/change-password (admin)
router.post('/change-password', requireAdmin, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Both passwords required' });
  if (newPassword.length < 6) return res.status(400).json({ error: 'New password must be at least 6 characters' });

  const admin = db.find('admins', req.admin.id);
  if (!bcrypt.compareSync(currentPassword, admin.password)) {
    return res.status(401).json({ error: 'Current password incorrect' });
  }

  db.update('admins', admin.id, { password: bcrypt.hashSync(newPassword, 10) });
  res.json({ success: true });
});

// GET /api/auth/me (admin)
router.get('/me', requireAdmin, (req, res) => {
  const admin = db.find('admins', req.admin.id);
  res.json({ id: admin.id, username: admin.username, email: admin.email });
});

module.exports = router;
