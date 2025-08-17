
***

```markdown
# 📦 NPM Notes – My Chitti for Future Me  

So yeah, here’s me trying to remind myself:  

---

## 🔹 Install a Package at a Particular Version  
Yes, we can install any package with a specific version like this:  

```

npm i packagename@version

```

Example:  
```

npm i express@4.18.2

```

---

## 🔹 Dependencies  
When we install a package, if it depends on some other packages → npm will **also install them automatically**.  
Basically, it sorts the dependency tree for us.  

---

## 🔹 DevDependencies  
These are packages which are **only useful during development**.  
Like testing libraries, build tools, etc.  

When deployed, we don’t really need them in production.  

To install a package as **dev dependency**:  
```

npm i packagename --save-dev

```

---

## 🔹 Scripts in Package.json  
- We can create as many scripts as we like in the **`package.json`** file under `"scripts"`.  
- By default we get `start` and `test`.  
- If we add our own scripts → we run them with:  

```

npm run ourscriptname

```

---

### Example  
In `package.json`:  

```

{
"scripts": {
"start": "node index.js",
"test": "echo \"Error: no test specified\" \&\& exit 1",
"runscript": "node run.js"
}
}

```

Then run like:  
```

npm run runscript

```

And my `run.js` can have something like:  

```

console.log("I was executed via npm run runscript");

```

---

## 🔖 Quick Recap
- Install specific versions → `npm i package@version`  
- Dependencies come along automagically.  
- DevDependencies → `npm i package --save-dev`  
- Custom scripts live in `package.json`.  
- To run → `npm run myscript`

---

✨ Ok future me, that’s it. You were probably struggling with npm commands when you wrote this, so here’s your friendly cheat-sheet. ✨
```


***

Do you want me to also format this with a small **Table of Contents** at the top (clickable links) so that it’s quicker to navigate inside big markdown viewers like GitHub or VSCode?

