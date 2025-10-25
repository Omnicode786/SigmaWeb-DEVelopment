require('dotenv').config();
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

const authRoutes = require('./routes/auth');
const threadRoutes = require('./routes/threads');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// --- view engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('views', path.join(__dirname, 'views'));

// --- middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- sessions (MemoryStore for dev; swap later if you want)
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// --- routes
app.use('/', authRoutes);
app.use('/', threadRoutes);
app.use('/api', apiRoutes);

// --- start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
