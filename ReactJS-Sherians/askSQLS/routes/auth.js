// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// register page
router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post('/register', async (req, res) => {
  const { username, password, adminCode } = req.body;
  try {
    const existing = await User.findByUsername(username);
    if (existing) {
      return res.render('auth/register', { error: 'Username may already exist.' });
    }
    const hash = await bcrypt.hash(password, 10);
    const role = (adminCode === 'ADMIN_SECRET_CODE') ? 'admin' : 'user';
    const user = await User.createUser({ username, passwordHash: hash, role });
    req.session.user = { _id: user._id, username: user.username, role: user.role, id: user._id };
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('auth/register', { error: 'Username may already exist.' });
  }
});

// login
router.get('/login', (req, res) => res.render('auth/login'));
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userRow = await User.findByUsername(username);
    if (!userRow) return res.render('auth/login', { error: 'Invalid credentials.' });
    const ok = await User.verifyPassword(userRow, password);
    if (!ok) return res.render('auth/login', { error: 'Invalid credentials.' });
    // fetch user without password
    const user = await User.findById(userRow._id);
    req.session.user = { _id: user._id, username: user.username, role: user.role, id: user._id };
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('auth/login', { error: 'Invalid credentials.' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(()=> res.redirect('/login'));
});

module.exports = router;
