# 🎨 EJS & Dynamic Routing Guide
*My Notes on Templates & URL Parameters*

---

## 📚 Table of Contents
- [EJS Template Engine](#-ejs-template-engine)
- [Static Files Setup](#-static-files-setup)
- [Dynamic Routing](#-dynamic-routing)
- [Frontend-Backend Connection](#-frontend-backend-connection)
- [Code Examples](#-code-examples)
- [Quick Reference](#-quick-reference)

---

## 🎨 EJS Template Engine

```txt
🤔 What is EJS?

EJS lets you write HTML with JavaScript calculations inside it.
Instead of just static HTML, you can do math, loops, conditions, etc.

Think of it as HTML + JavaScript superpowers ⚡
```

### Basic EJS Setup

```js
const express = require('express');
const app = express();
const path = require('path');

// Set EJS as the template engine
app.set('view engine', 'ejs');

// If views folder is in a different location
app.set('views', path.join(__dirname, 'views'));

// Render EJS files
app.get('/', (req, res) => {
    // Just write the filename, no need for full path
    res.render('index'); // renders views/index.ejs
});
```

### Simple EJS File (index.ejs)

```html
<!DOCTYPE html>
<html>
<head>
    <title>My EJS Page</title>
    <link rel="stylesheet" href="/stylesheets/style.css">
</head>
<body>
    <h1>Setting up EJS index</h1>
    <h1>You want to calculate pretty baby??</h1>
    
    <!-- EJS can do calculations -->
    <p>2 + 2 = <%= 2 + 2 %></p>
    <p>Today is: <%= new Date().toDateString() %></p>
    
    <script src="/javascripts/script.js"></script>
</body>
</html>
```

---

## 📁 Static Files Setup

```txt
📂 What are static files?

CSS, JavaScript, images - files that don't change.
Express needs to know where to find them.
```

```js
// Make 'public' folder accessible to browser
app.use(express.static(path.join(__dirname, 'public')));

// Now browser can access:
// public/stylesheets/style.css → /stylesheets/style.css
// public/javascripts/script.js → /javascripts/script.js
// public/images/logo.png → /images/logo.png
```

### Folder Structure

```txt
your-project/
├── views/
│   └── index.ejs
├── public/
│   ├── stylesheets/
│   │   └── style.css
│   └── javascripts/
│       └── script.js
└── app.js
```

---

## 🛣️ Dynamic Routing

```txt
🎯 What is Dynamic Routing?

Instead of creating separate routes for each user:
/profile/john, /profile/mary, /profile/bob

We create ONE route that handles ALL:
/profile/:username

The :username becomes a variable!
```

### Basic Dynamic Routes

```js
// Single parameter
app.get('/profile/:username', (req, res) => {
    const user = req.params.username;
    res.send(`This is ${user} profile page`);
});

// Multiple parameters
app.get('/author/:username/:age', (req, res) => {
    const { username, age } = req.params;
    res.send(`This is ${username} author page who is ${age} years old`);
});

// Examples:
// /profile/john → user = "john"
// /author/mary/25 → username = "mary", age = "25"
```

### Dynamic Routes with EJS

```js
app.get('/user/:name', (req, res) => {
    const userName = req.params.name;
    res.render('profile', { 
        name: userName,
        age: 25,
        hobbies: ['coding', 'gaming', 'music']
    });
});
```

```html
<!-- views/profile.ejs -->
<h1>Welcome <%= name %>!</h1>
<p>You are <%= age %> years old</p>
<ul>
    <% hobbies.forEach(hobby => { %>
        <li><%= hobby %></li>
    <% }) %>
</ul>
```

---

## 🌐 Frontend-Backend Connection

### API Route (Backend)

```js
app.get('/jokes', (req, res) => {
    const jokes = [
        { id: 1, content: "Your mama is bald" },
        { id: 2, content: "Your mama is bald" },
        { id: 3, content: "Your mama is bald" },
        { id: 4, content: "Your mama is bald" }
    ];
    
    res.json(jokes); // Send as JSON
});
```

### Frontend JavaScript

```js
// public/javascripts/script.js
alert("This js is loaded from public");

let numberDiv = document.querySelector(".noofjokes");
let jokeDiv = document.querySelector(".jokecontent");

async function getJokes() {
    try {
        let response = await fetch('/jokes');
        let data = await response.json();
        
        numberDiv.innerHTML = `Total Jokes: ${data.length}`;
        
        jokeDiv.innerHTML = data.map(joke => {
            return `The id is: ${joke.id} and the joke is that ${joke.content}`;
        }).join("<br>");
        
    } catch (error) {
        console.log("Error fetching jokes:", error);
    }
}

getJokes();
```

---

## 💻 Complete Working Example

### app.js

```js
const express = require('express');
const app = express();
const path = require('path');

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/jokes', (req, res) => {
    const jokes = [
        { id: 1, content: "Why did the chicken cross the road?" },
        { id: 2, content: "To get to the other side!" },
        { id: 3, content: "What's a programmer's favorite drink?" },
        { id: 4, content: "Java!" }
    ];
    res.json(jokes);
});

// Dynamic routes
app.get('/profile/:username', (req, res) => {
    const user = req.params.username;
    res.render('profile', { username: user });
});

app.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
});
```

### views/index.ejs

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EJS HTML File</title>
    <link rel="stylesheet" href="/stylesheets/style.css">
</head>
<body>
    <h1>Setting up EJS index</h1>
    <h1>You want to calculate pretty baby??</h1>
    
    <h2>Jokes</h2>
    <div class="noofjokes"></div>
    <div class="jokecontent"></div>
    
    <script src="/javascripts/script.js"></script>
</body>
</html>
```

### views/profile.ejs

```html
<!DOCTYPE html>
<html>
<head>
    <title><%= username %>'s Profile</title>
</head>
<body>
    <h1>Welcome <%= username %>!</h1>
    <p>This is your profile page.</p>
    <a href="/">Back to Home</a>
</body>
</html>
```

---

## 🏆 Quick Reference

```js
// EJS SETUP
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// RENDER EJS
app.get('/', (req, res) => {
    res.render('index', { title: 'My Page' });
});

// DYNAMIC ROUTES
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID: ${userId}`);
});

// API ROUTES
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello API' });
});

// FORM HANDLING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

### EJS Syntax Quick Guide

```html
<!-- Output variable -->
<h1><%= title %></h1>

<!-- Run JavaScript code -->
<% if (user) { %>
    <p>Welcome <%= user.name %>!</p>
<% } %>

<!-- Loop through array -->
<% items.forEach(item => { %>
    <li><%= item %></li>
<% }) %>

<!-- Include other EJS files -->
<%- include('header') %>
```

---

## 🎯 Common Patterns

### User Profile with Dynamic Data

```js
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    
    // In real app, fetch from database
    const userData = {
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@email.com`,
        posts: 15
    };
    
    res.render('userProfile', userData);
});
```

### Product Page

```js
app.get('/product/:productId', (req, res) => {
    const { productId } = req.params;
    
    const product = {
        id: productId,
        name: `Product ${productId}`,
        price: 99.99,
        inStock: true
    };
    
    res.render('product', product);
});
```

### API with Frontend

```js
// API route
app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' }
    ]);
});

// Frontend fetch
fetch('/api/users')
    .then(response => response.json())
    .then(users => {
        console.log(users);
        // Update DOM with users
    });
```

---

## 🚨 Important Notes

```txt
⚠️ Remember:
• EJS files go in 'views' folder
• Static files (CSS/JS) go in 'public' folder
• Use res.render() for EJS, res.send() for text, res.json() for APIs
• req.params gets URL parameters (:username, :id, etc.)
• Always use path.join() for file paths

🔧 Troubleshooting:
• EJS not found? → Check 'views' folder location
• CSS not loading? → Check static files middleware
• req.params undefined? → Check route syntax with :
• Cannot GET /route? → Make sure route exists
```

---

<div align="center">

**🐉 Made with ❤️ by Beast Mode Developer**

*Templates + Dynamic Routes = Web App Magic! ✨*

---

*"Good code is like a good joke - it needs no explanation."*

</div>