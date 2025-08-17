# 📚 Master Backend Development – Part 1  
Learning Node.js (File System & HTTP)

This README is my personal guide while following the **Master Backend Development Series**.  
It summarizes everything I coded in **Part 1**, using examples and comments for quick recall.

---

## ⚡ Technologies Used
- 🟢 **Node.js** (v14+)
- 📂 **File System (fs)** module
- 🌐 **HTTP** module
- ✨ Modern JS concepts (async, callbacks, sync ops)

---

## 📂 File System (fs)

Node.js has a built-in `fs` module to work with files & directories.  
There are multiple ways to use it:

- **Async methods** (default) → run in parallel → can cause race conditions  
- **Sync methods** (`fs.writeFileSync`) → run one by one → block execution  
- **Promise-based API** (`fs.promises`) → modern async/await usage  
- **Callback hell** → messy, avoid when possible  

---

### 📝 Writing a File
```js
fs.writeFile("Beast.txt","Hello this is writefile",(err)=>{
    if(err) console.log(err);
    console.log("writing file complete");
});
```

---

### ➕ Appending to a File
```js
fs.appendFile("Beast.txt"," So this is muzammil appending some text",(err)=>{
     if(err) console.log(err.message);
     console.log("Appending file complete");
})
```

---

### ✏️ Renaming a File
```js
fs.rename("Beast.txt","renameBeast.txt",(err)=>{
    if(err) console.log(err.message);
    console.log("finished renaming file");
})
```

---

### 📑 Copying a File
```js
fs.copyFile('renameBeast.txt','CopyBeast.txt',(err)=>{
    if (err) console.log(err.message);
    console.log("finished copying files");
});
```

---

### ❌ Deleting a File
```js
fs.unlink('wanttodelete.txt',(err)=>{
    if(err) console.log(err.message);
    console.log("finished deleting the file");
})
```

---

### 📂 Removing Directories
```js
// Old way
fs.rmdir('./delete',{recursive:true},(err)=>{
    if(err) console.log(err.message);
    console.log("finished deleting directory");
})

// New way (future-proof)
fs.rm('./delete',{recursive:true},(err)=>{
    if(err) console.log(err.message);
    console.log("finished deleting directory");
})
```
⚠️ **Note:** `fs.rmdir` will be deprecated → prefer `fs.rm`.

---

## 🌐 HTTP Module

We can use Node’s built-in `http` module to spin up a server.

```js
const http = require('http');

const server = http.createServer(function(req, response){
    response.end("hello world");
});

server.listen(3000);
```

### 🖥️ How it Works
- Creates a **server** listening on `http://localhost:3000`
- Sends `"hello world"` as response to the browser  
- This is the **foundation of backend development** 💡

---

## 🚀 Summary
- Learned about **Node.js fs module** → writing, appending, renaming, copying, deleting files & directories.  
- Discovered differences between **async vs sync methods**.  
- Built a **basic HTTP server** serving `hello world` at `localhost:3000`.

---

## 🔮 Next Steps
- Explore **fs.promises** with `async/await`
- Serve **HTML files** via `http`
- Build **APIs** with `Express.js`

---

📌 *Made with ❤️ by Muzammil (a.k.a Beast), learning MERN one step at a time.*
