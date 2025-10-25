const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const router = express.Router();

// Register Page
router.get("/register", (req, res) => res.render("auth/register"));

// Handle Registration
router.post("/register", async (req, res) => {
  const { username, password, adminCode } = req.body;

  try {
    const [userExists] = await db
      .promise()
      .query("SELECT id FROM users WHERE username = ?", [username]);

    if (userExists.length > 0)
      return res.render("auth/register", { error: "Username already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const role = adminCode === "JAUNTADMIN123" ? "admin" : "user";

    await db
      .promise()
      .query("INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)", [
        username,
        hashed,
        role,
      ]);

    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.render("auth/register", { error: "Error registering user" });
  }
});

// Login Page
router.get("/login", (req, res) => res.render("auth/login"));

// Handle Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM users WHERE username = ?", [username]);

    if (rows.length === 0)
      return res.render("auth/login", { error: "Invalid credentials" });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid)
      return res.render("auth/login", { error: "Invalid credentials" });

    req.session.user = { id: user.id, username: user.username, role: user.role };
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.render("auth/login", { error: "Error logging in" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

module.exports = router;
