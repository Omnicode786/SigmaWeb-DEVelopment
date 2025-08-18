# 🚀 Express.js Mastery Guide
*From Zero to Hero - Building Web Applications*

---

## 📚 Table of Contents
- [What is Express.js?](#-what-is-expressjs)
- [Basic Setup](#-basic-setup)
- [Middleware Deep Dive](#-middleware-deep-dive)
- [Routing System](#-routing-system)
- [Error Handling](#-error-handling)
- [Development Tools](#️-development-tools)
- [Request & Response](#-request--response)
- [Quick Reference](#-quick-reference)

---

## 🎯 What is Express.js?

```txt
Express.js is a web application framework for Node.js
→ It gives you a FLOW/STRUCTURE to build web apps
→ It's an npm package that simplifies server creation
→ Think of it as the foundation for your backend
```

```bash
# Install Express in your project
npm install express
```

---

## 🏗️ Basic Setup

```js
// Step 1: Import Express
const express = require('express');

// Step 2: Create Express application
const app = express();
// This app now holds ALL Express.js functionalities
// We could also do express().get() but that's redundant

// Step 3: Start the server
app.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
});
```

```txt
💡 What happens here:
1. require('express') imports the Express package
2. express() creates an application instance
3. app.listen() starts the server on port 5000
```

---

## 🔄 Middleware Deep Dive

```txt
🤔 What is Middleware?

When a server receives a request, BEFORE it reaches the route,
you can INTERCEPT and PROCESS that request.

Flow: Request → Middleware → Route → Response

Common uses:
• Logging user activities
• Authentication checks  
• Data parsing/formatting
• Security validations
```

### Basic Middleware Example

```js
// This middleware runs for EVERY request
app.use(function (req, res, next) {
    console.log("📝 Middleware was executed");
    console.log("🕒 Time:", new Date().toISOString());
    console.log("🌐 Method:", req.method);
    console.log("📍 URL:", req.url);
    
    // IMPORTANT: Call next() to continue to the route
    next(); // Without this, request will hang!
});

// You can have multiple middlewares
app.use(function (req, res, next) {
    console.log("🔐 Security check passed");
    next();
});

app.use(function (req, res, next) {
    console.log("📊 Analytics logged");
    next();
});
```

### Conditional Middleware

```js
// Middleware that only runs for specific routes
app.use('/admin', function(req, res, next) {
    console.log("🛡️ Admin area accessed");
    // Check if user is admin
    next();
});

// Middleware with authentication
app.use(function(req, res, next) {
    const isLoggedIn = req.headers.authorization;
    if (!isLoggedIn) {
        return res.status(401).send("❌ Please login first");
    }
    next();
});
```

---

## 🛣️ Routing System

```txt
🗺️ Routes = Different paths users can visit

Structure: app.METHOD(PATH, HANDLER)
• METHOD: get, post, put, delete, etc.
• PATH: the URL endpoint (/home, /about, etc.)  
• HANDLER: function that processes the request
```

### Basic Routes

```js
// Default/Home route
app.get('/', function(req, res) {
    res.send('🏠 Welcome to Homepage!');
});

// User profile route
app.get('/username', function(req, res) {
    res.send('👤 User Profile Page');
});

// About page
app.get('/about', function(req, res) {
    res.send('ℹ️ About Us - We build amazing apps!');
});

// Contact page  
app.get('/contact', function(req, res) {
    res.send('📞 Contact: hello@company.com');
});
```

### Dynamic Routes

```js
// Route with parameters
app.get('/user/:id', function(req, res) {
    const userId = req.params.id;
    res.send(`👤 User ID: ${userId}`);
});

// Multiple parameters
app.get('/user/:id/post/:postId', function(req, res) {
    const { id, postId } = req.params;
    res.send(`📝 User ${id}'s Post ${postId}`);
});

// Optional parameters
app.get('/search/:term?', function(req, res) {
    const searchTerm = req.params.term || 'all';
    res.send(`🔍 Searching for: ${searchTerm}`);
});
```

### Different HTTP Methods

```js
// GET - Retrieve data
app.get('/posts', (req, res) => {
    res.send('📄 All posts');
});

// POST - Create new data
app.post('/posts', (req, res) => {
    res.send('✅ New post created');
});

// PUT - Update data
app.put('/posts/:id', (req, res) => {
    res.send(`✏️ Post ${req.params.id} updated`);
});

// DELETE - Remove data
app.delete('/posts/:id', (req, res) => {
    res.send(`🗑️ Post ${req.params.id} deleted`);
});
```

---

## 🚨 Error Handling

```js
// Route that triggers an error
app.get('/error', function(req, res, next) {
    // Create and pass error to error handler
    return next(new Error("💥 Something went wrong!"));
});

// Global Error Handler Middleware
// NOTE: Must have 4 parameters (err, req, res, next)
app.use((err, req, res, next) => {
    // Log error details (for developers)
    console.error("🔥 Error Stack:", err.stack);
    console.error("🕒 Error Time:", new Date().toISOString());
    console.error("📍 Error URL:", req.url);
    
    // Send user-friendly response (for users)
    res.status(500).send("❌ Oops! Something broke on our end!");
});

// 404 Handler (for routes that don't exist)
app.use((req, res) => {
    res.status(404).send("🤷‍♂️ Page not found!");
});
```

### Advanced Error Handling

```js
// Custom error class
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// Route with custom error
app.get('/premium', (req, res, next) => {
    const isSubscribed = false; // Check user subscription
    
    if (!isSubscribed) {
        return next(new CustomError("💎 Premium subscription required", 402));
    }
    
    res.send("🌟 Welcome to Premium content!");
});

// Enhanced error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    console.error(`❌ [${statusCode}] ${message}`);
    
    res.status(statusCode).json({
        error: true,
        message: message,
        timestamp: new Date().toISOString()
    });
});
```

---

## 🛠️ Development Tools

```bash
# Problem: Manual server restart after code changes
# Solution: Use nodemon for auto-restart

# Install nodemon globally
npm install -g nodemon

# Or use npx (recommended)
npx nodemon server.js

# Add to package.json scripts
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}

# Then run with:
npm run dev
```

```txt
🔄 Nodemon Benefits:
• Auto-restarts server on file changes
• Saves development time  
• Watches multiple file types
• Configurable ignore patterns
```

---

## 📡 Request & Response

### Request Object (req)

```js
app.get('/debug', (req, res) => {
    // URL parameters
    console.log("📍 Params:", req.params);
    
    // Query strings (?name=john&age=25)
    console.log("❓ Query:", req.query);
    
    // Request headers
    console.log("📋 Headers:", req.headers);
    
    // Request method
    console.log("🔧 Method:", req.method);
    
    // Request URL
    console.log("🌐 URL:", req.url);
    
    // IP address
    console.log("🏠 IP:", req.ip);
    
    res.json({
        message: "Check console for request details"
    });
});
```

### Response Object (res)

```js
app.get('/response-demo', (req, res) => {
    // Different response types
    
    // Send plain text
    res.send("Hello World");
    
    // Send JSON
    res.json({ message: "Success", data: [1, 2, 3] });
    
    // Send with status code
    res.status(201).send("Created successfully");
    
    // Redirect
    res.redirect('/homepage');
    
    // Send file
    res.sendFile(__dirname + '/public/index.html');
    
    // Set headers
    res.set('Content-Type', 'application/json');
    res.send('{"message": "Custom headers set"}');
});
```

---

## 🎨 Advanced Features

### Static Files

```js
// Serve static files (CSS, JS, images)
app.use(express.static('public'));
// Now files in 'public' folder are accessible directly
// http://localhost:5000/style.css → serves public/style.css
```

### Body Parsing

```js
// Parse JSON requests
app.use(express.json());

// Parse URL-encoded requests (forms)
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    console.log("📝 Received data:", req.body);
    res.json({ received: req.body });
});
```

### CORS (Cross-Origin Requests)

```js
// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
```

---

## 🏆 Quick Reference

```js
// 🏗️ BASIC SETUP
const express = require('express');
const app = express();
app.listen(3000);

// 🔄 MIDDLEWARE
app.use(function(req, res, next) {
    // Your middleware code
    next(); // Always call next()!
});

// 🛣️ ROUTING
app.get('/path', (req, res) => { res.send('Response'); });
app.post('/path', (req, res) => { res.json({data: 'value'}); });
app.put('/path/:id', (req, res) => { /* update */ });
app.delete('/path/:id', (req, res) => { /* delete */ });

// 🚨 ERROR HANDLING
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 📁 STATIC FILES
app.use(express.static('public'));

// 📝 BODY PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

---

## 🎯 Best Practices

```txt
🛡️ Security:
• Use helmet for security headers
• Validate all input data
• Use environment variables for secrets
• Implement rate limiting

⚡ Performance:  
• Use compression middleware
• Cache responses when possible
• Optimize database queries
• Use clustering for production

🏗️ Structure:
• Separate routes into different files
• Use controllers for business logic
• Create reusable middleware
• Follow REST API conventions

🔧 Development:
• Use nodemon for development
• Implement proper logging
• Write tests for your routes
• Use TypeScript for larger projects
```

---

## 🎪 Fun Express Facts

```txt
🤯 Did you know?

• Express.js was created by TJ Holowaychuk in 2010
• It's the most popular Node.js framework
• Netflix, WhatsApp, and Uber use Express.js
• The entire framework is just ~1000 lines of code
• Express 5.0 is coming with async/await support
• You can create APIs in just 10 lines of code!
```

---

<div align="center">

**🐉 Made with ❤️ by Beast Mode Developer**

*Building the web, one route at a time!*

---

*"The best error message is the one that never shows up." - Thomas Fuchs*

</div>