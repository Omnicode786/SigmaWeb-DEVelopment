# 🚀 NASA Picture of the Day (APOD)

A small web app that fetches and displays the **Astronomy Picture of the Day (APOD)** from NASA’s open API.  
This project is part of my journey into modern web development.

---

## ⚡ Tech Stack
- 🌐 **HTML5**
- 🎨 **CSS3** (modern variables + gradients)
- ✨ **JavaScript (ES6)** – async/await + `fetch`
- 🔑 **NASA APOD API**

---

## 🎯 Features
- Fetches the **Astronomy Picture of the Day** directly from NASA’s API.  
- Displays:
  - 🖼️ The **Image** (or video if returned by API)  
  - 📌 The **Title**  
  - 📖 The **Explanation**  
- Modern UI with:
  - 🎨 Gradient backgrounds
  - 🪞 Glassmorphism-style cards
  - 🌙 Smooth colors and rounded corners

---

## 📂 File Structure
```
📁 nasa-apod
 ┣ 📄 index.html   # HTML structure
 ┣ 📄 style.css    # Styling with CSS variables
 ┣ 📄 script.js    # API fetch + UI update
```

---

## 🖼️ Demo Preview
When opened in the browser, the app shows something like:

![NASA Demo](https://apod.nasa.gov/apod/image/2508/asperatus_priester_1024.jpg)

---

## 🔑 NASA API Setup
You’ll need an **API key** from [NASA’s API portal](https://api.nasa.gov/).  
For now, you can use the demo key:

```js
let apiKEY = "DEMO_KEY";
```

But with your own key, you’ll avoid rate limits:

```js
let apiKEY = "YOUR_PERSONAL_KEY";
```

---

## 🛠️ How It Works

### 1️⃣ Fetching Data
```js
async function GetAPOD() {
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKEY}`);
    let data = await response.json();
    return data;
}
```
✅ Makes an HTTP request to NASA API & converts it into JSON.

---

### 2️⃣ Updating the UI
```js
async function updateui() {
    let data = await GetAPOD();
    explanation.innerHTML = data.explanation;
    title.innerHTML = data.title;
    img.src = data.url;
}
updateui();
```
✅ Injects the API response into the DOM (`title`, `image`, `explanation`).

---

### 3️⃣ Styling with CSS Variables
```css
:root {
  --bg-gradient: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  --text-color: #f0f0f0;
  --primary-accent: #ff6ec7;
  --secondary-accent: #6a5acd;
}
```
✅ Provides **modern theme colors** (dark background + pastel accents).  

---

## 🚀 Run the Project
1. Clone this repo:
   ```bash
   git clone https://github.com/your-username/nasa-apod.git
   ```
2. Open `index.html` in your browser.  
3. Enjoy the **NASA Picture of the Day**! 🌌

---

## 🔮 Next Steps
- Add a **date picker** → see past APODs.  
- Handle **videos** (APOD sometimes returns YouTube links).  
- Add **loading animation** while fetching data.  
- Deploy with **GitHub Pages / Vercel / Netlify**.

---

📌 *Made with ❤️ by Muzammil (a.k.a Beast), exploring the universe with code.*
