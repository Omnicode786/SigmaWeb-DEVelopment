
***

```markdown
# 📦 NPM Basics – My Cheat Sheet  

This is me making notes while messing around with **npm**.  
Future me → read this when you forget how it works 😅

---

## 🔹 Installing a Package with a Specific Version  

Yes meri jaan ke tote 😄 → we can install a package at a **specific version** like this:

```

npm i packagename@version

```

Example:  
```

npm i express@4.18.2

```

---

## 🔗 Dependencies  

If we install one package but it **depends on others**, then npm will also install those automatically.  
Basically → dependency tree resolved ✅

---

## 🛠️ DevDependencies  

Some packages are only needed during development (like nodemon, testing libs, build tools).  
When deployed → we won’t use them.

Install as a **dev dependency**:

```

npm i packagename --save-dev

```

---

## 📜 Scripts in `package.json`  

- By default, `start` and `test` exist.  
- We can **create our own scripts** in `package.json`.  
- To run custom ones, use:  

```

npm run scriptname

```

---

### 📝 Example  

**package.json** part:  

```

{
"scripts": {
"start": "node index.js",
"test": "echo \"Error: no test specified\" \&\& exit 1",
"runscript": "node run.js"
}
}

```

Run it:  
```

npm run runscript

```

File: `run.js`  

```

console.log("I was executed via npm run runscript");

```

---

## 🏁 Recap  

- Install specific versions → `npm i package@version`  
- Dependencies get resolved automatically  
- Dev-only → `npm i package --save-dev`  
- Scripts live in `package.json` → run with `npm run scriptname`

---

📌 *Made with ❤️ by me while learning npm basics. Beast Mode ON 🐉🔥*
```


***

This is **only for your npm file**, with your same humorous/relaxed tone but presented beautifully.

👉 Do you want me to also add a **collapsible TOC** at the top (so you can click “DevDependencies” / “Scripts” instantly in GitHub or VSCode)?

