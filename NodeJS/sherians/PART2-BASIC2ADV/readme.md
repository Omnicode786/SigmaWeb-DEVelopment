# 🚀 NPM Mastery Guide
*A Beautiful Cheat Sheet for Package Management*

---

## 📚 Table of Contents
- [Version Control](#-version-control)
- [Dependency Management](#-dependency-management)
- [Development Dependencies](#️-development-dependencies)
- [Script Automation](#-script-automation)
- [Quick Reference](#-quick-reference)

---

## 🎯 Version Control

```bash
# Install a specific version of any package
npm install packagename@version

# Real-world examples
npm install express@4.18.2
npm install react@18.2.0
npm install lodash@4.17.21
```

```txt
💡 Pro Tip: Use specific versions to avoid breaking changes
when working with production applications!
```

---

## 🔗 Dependency Management

```txt
When you install a package, npm automatically resolves
and installs ALL its dependencies in a tree structure.

Example: Installing Express also pulls in:
├── accepts
├── array-flatten  
├── body-parser
├── content-disposition
└── ... 50+ more packages
```

```bash
# View your dependency tree
npm list

# View only top-level dependencies
npm list --depth=0
```

---

## 🛠️ Development Dependencies

```bash
# Install packages needed ONLY during development
npm install packagename --save-dev

# Common dev dependencies
npm install nodemon --save-dev       # Auto-restart server
npm install eslint --save-dev        # Code linting
npm install jest --save-dev          # Testing framework
npm install webpack --save-dev       # Module bundler
```

```txt
📦 Dev Dependencies vs Regular Dependencies:

✅ Regular Dependencies:
   - Needed in production
   - Get deployed with your app
   - Examples: express, mongoose, react

🔧 Dev Dependencies:
   - Only needed during development
   - Not included in production builds  
   - Examples: nodemon, eslint, webpack
```

---

## ⚡ Script Automation

```json
{
  "name": "my-awesome-project",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "build": "webpack --mode production",
    "lint": "eslint . --ext .js,.jsx",
    "deploy": "npm run build && npm run test"
  }
}
```

```bash
# Run built-in scripts (start, test)
npm start
npm test

# Run custom scripts with 'run'
npm run dev
npm run build  
npm run lint
npm run deploy
```

```js
// Example: run.js file
console.log("🎉 I was executed via npm run runscript!");
console.log("Current environment:", process.env.NODE_ENV);
```

---

## 🎨 Advanced Examples

```bash
# Install multiple packages at once
npm install express mongoose cors dotenv

# Install globally (use sparingly!)
npm install -g nodemon

# Install from GitHub
npm install user/repo-name

# Install specific commit/branch
npm install user/repo-name#commit-hash
```

```txt
🌟 Package.json Script Patterns:

"scripts": {
  "start": "node server.js",
  "start:dev": "NODE_ENV=development nodemon server.js",
  "start:prod": "NODE_ENV=production node server.js",
  "test": "jest --watchAll",
  "test:ci": "jest --coverage --watchAll=false",
  "prebuild": "npm run lint",
  "build": "webpack --mode production",
  "postbuild": "echo 'Build completed successfully!'"
}
```

---

## 🏆 Quick Reference

```bash
# 📦 PACKAGE INSTALLATION
npm install package@version           # Specific version
npm install package --save-dev        # Dev dependency
npm install package --global          # Global install

# 🔍 PACKAGE INFORMATION  
npm list                              # View dependencies
npm outdated                          # Check for updates
npm audit                             # Security vulnerabilities

# 🚀 SCRIPT EXECUTION
npm start                             # Run start script
npm test                              # Run test script  
npm run scriptname                    # Run custom script

# 🧹 MAINTENANCE
npm update                            # Update packages
npm cache clean --force               # Clear npm cache
npm prune                            # Remove unused packages
```

---

## 💫 Pro Tips & Best Practices

```txt
🎯 Version Management:
   • Use exact versions for critical dependencies
   • Use ^ for minor updates (^4.18.0 → 4.x.x)
   • Use ~ for patch updates (~4.18.0 → 4.18.x)

🔒 Security:
   • Run 'npm audit' regularly
   • Keep dependencies updated
   • Use 'npm ci' in production

⚡ Performance:
   • Use .npmrc for configuration
   • Consider 'npm ci' over 'npm install'
   • Use package-lock.json for consistency
```

---

## 🎪 Fun Commands

```bash
# See what packages take up the most space
npm list --depth=0 --parseable | xargs du -sh

# Create a new package.json interactively  
npm init

# Skip the questions and create minimal package.json
npm init -y

# Run multiple scripts in parallel
npm run build & npm run test & wait
```

---

<div align="center">

**🐉 Made with ❤️ by Beast Mode Developer**

*Keep learning, keep building, keep being awesome!*

---

*"First, solve the problem. Then, write the code." - John Johnson*

</div>