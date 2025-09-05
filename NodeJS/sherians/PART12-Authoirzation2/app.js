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
  console.log("User logged out", req.cookies.token);
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
    let token = jwt.sign({ email }, "secret", { expiresIn: "1h" });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false // true in production (HTTPS)
    });
    res.redirect('/profile');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
});

// Profile (protected route)
app.get('/profile', async (req, res) => {
    console.log("Cookei on request: ", req.cookies.token);
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send("Not logged in, please log in.");
    }

    const decoded = jwt.verify(token, "secret");

    const user = await userModel.findOne({ email: decoded.email }).lean();
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render('profile', { user });
  } catch (err) {
    console.error(err);
    return res.status(401).send("Invalid or expired token");
  }
});

// Logout
app.post('/logout', (req, res) => {
  res.cookie("token","removed", {
    httpOnly: true,
    secure: false
  });

  res.redirect('/');
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
  


// ⚠️ NOTE TO FUTURE ME:
// when I do console.log(req.cookies.token) right after res.cookie()
// it will always show "undefined" 😅
// because cookies are only available on the *next request*,
// not in the same one where I just set them.
// 👉 If I want to see the cookie value, check it inside /profile or the next request.
