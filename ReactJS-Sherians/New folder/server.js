require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const db = require("./db");
const MySQLStore = require("express-mysql-session")(session);

const app = express();

// SESSION STORE
const sessionStore = new MySQLStore({}, db.promise());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// ROUTES
const authRoutes = require("./routes/auth");
const threadRoutes = require("./routes/threads");
const commentRoutes = require("./routes/comments");

app.use("/", authRoutes);
app.use("/", threadRoutes);
app.use("/", commentRoutes);

// HOME PAGE
app.get("/", async (req, res) => {
  try {
    const [threads] = await db.promise().query(`
      SELECT t.*, u.username AS author_username 
      FROM threads t 
      LEFT JOIN users u ON t.author_id = u.id
      ORDER BY t.created_at DESC
    `);
    res.render("index", { threads });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading threads");
  }
});

app.use((req, res) => res.status(404).send("<h1>404 Not Found</h1>"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
