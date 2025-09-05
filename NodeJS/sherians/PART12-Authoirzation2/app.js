const cookieParser = require('cookie-parser');
const express = require('express');
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));

// Home page
app.get('/', (req, res) => {
  res.render("index");
});

// Create user
app.post('/create', async (req, res) => {
  try {
    let { username, email, password, age } = req.body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Save user in DB
    const createdUser = await userModel.create({
      username,
      email,
      password: hash,
      age
    });

    // Create JWT
    let token = jwt.sign({ email }, "secret");

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false // change to true if HTTPS
    });

    console.log("Cookie on request:", req.cookies.token);

    res.send(createdUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
});

// Logout
app.post('/logout', (req, res) => {
  res.cookie("token", "changed", {
    httpOnly: true,
    secure: false
  });

  console.log("After logout cookie:", req.cookies.token);
  res.redirect('/');
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
        