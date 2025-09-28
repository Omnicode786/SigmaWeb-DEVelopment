require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const threadRoutes = require('./routes/threads');
const apiRoutes = require('./routes/api');
const expressLayouts = require("express-ejs-layouts");
const app = express();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log('Mongo connected'))
.catch(err => console.error('Mongo connection error', err));

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");
app.set('views', path.join(__dirname, 'views'));




app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

app.use('/', authRoutes);
app.use('/', threadRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, ()=> {
  console.log(`Server running on http://localhost:${PORT}`);
});
