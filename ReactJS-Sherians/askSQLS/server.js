require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const threadRoutes = require('./routes/threads');
const apiRoutes = require('./routes/api');
const expressLayouts = require("express-ejs-layouts");
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// session store using mysql mind blown
const sessionStore = new MySQLStore({}, db.pool); // pass pool
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// expose currentusers to views everysingle one biuthc
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// routes
app.use('/', authRoutes);
app.use('/', threadRoutes);
app.use('/api', apiRoutes);

// redirect root to index will return a promise
app.get('/', (req, res) => res.redirect('/'));

app.listen(PORT, ()=> {
  console.log(`Server running on http://localhost:${PORT}`);
});
