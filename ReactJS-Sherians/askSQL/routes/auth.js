const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const prisma = require('../prisma');

router.get('/register', (req, res) => res.render('auth/register'));

router.post('/register', async (req, res) => {
  const { username, password, adminCode } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const role = (adminCode === 'ADMIN_SECRET_CODE') ? 'admin' : 'user';

    const user = await prisma.user.create({
      data: { username, passwordHash: hash, role }
    });

    req.session.user = { _id: String(user.id), username: user.username, role: user.role };
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('auth/register', { error: 'Username may already exist.' });
  }
});

router.get('/login', (req, res) => res.render('auth/login'));

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.render('auth/login', { error: 'Invalid credentials.' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.render('auth/login', { error: 'Invalid credentials.' });

  req.session.user = { _id: String(user.id), username: user.username, role: user.role };
  res.redirect('/');
});

router.post('/logout', (req, res) => {
  req.session.destroy(()=> res.redirect('/login'));
});

module.exports = router;
