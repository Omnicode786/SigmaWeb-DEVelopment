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
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
});


app.get('/login',(req,res)=>{

  res.render('login');

})
app.post('/login',async (req,res)=>{
try{
  let {email, password} = req.body;


  const user =await userModel.findOne({email}); 
    if (!user) {
      return res.status(404).send("invalid email or password");
    }
    const isMatch =await bcrypt.compare(password,user.password);
    if (!isMatch){
       return res.status(401).send("Invalid email or password");
    }
    
    // now that the user has logged in create a new token now for this login session 
    const token = jwt.sign({email:user.email},"secret", {expiresIn:"1h"});
    res.cookie(
      "token",token,
    {
       httpOnly: true,
      secure: false 
    })



  res.redirect('/profile');
  }
  catch(err){
    console.log(err);
    res.send("Error loggin in ");
  }
})


// Profile
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


// 👉 jwt.verify() + findOne() are not really "login" steps 😅
// this is actually *token verification* (checking if user already has a valid cookie)
// it works here only because I already had a token from signup
// but in real login I should:
//   1. find user by email
//   2. check password with bcrypt.compare
//   3. then make a new token + cookie
// ⚠️ Keep this logic for protected routes like /profile, not /login