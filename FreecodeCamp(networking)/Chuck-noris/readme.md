# 🥋 Chuck Norris Jokes App

A fun web app that fetches **random Chuck Norris jokes** from the [Chuck Norris API](https://api.chucknorris.io/) and reads them aloud using the **Web Speech API**.  
Styled with **Glassmorphism UI** for a modern and sleek look.

---

## 🚀 Features
- ✅ Random Chuck Norris jokes from API  
- ✅ Voice narration using **Speech Synthesis**  
- ✅ Clean glassmorphism UI design  
- ✅ Refresh button for new jokes  
- ✅ Animated hover & click effects  

---

## 🖼️ Preview
![Chuck Norris](https://api.chucknorris.io/img/avatar/chuck-norris.png)

---

## 📂 Project Structure

index.html # Main HTML file with structure
style.css # Glassmorphism styling
script.js # Joke fetch & voice logic



---

## 📜 Code Overview
### HTML Structure
```html
<div class="container">
    <div class="image">
        <img class="chuck-noris" src="https://api.chucknorris.io/img/avatar/chuck-norris.png" alt="Chuck Norris">
    </div>
    <div class="title">
        <h1>Chuck Norris Jokes</h1>
    </div>
    <div class="jokes">Loading joke...</div>
    <button class="refresh">Refresh Joke</button>
</div>
CSS Styling (Glassmorphism)

.container {
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(18px) saturate(180%);
    border-radius: 25px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
    text-align: center;
    color: white;
}
JavaScript Logic

async function JokeGen() {
    let response = await fetch('https://api.chucknorris.io/jokes/random');
    let data = await response.json();
    imageContainer.src = data.icon_url;
    jokeBox.innerHTML = data.value;
}
⚡ How to Run
Save the code as index.html

Open in your browser

Click Refresh Joke → Get a new Chuck Norris joke (with voice 🎤)

🔮 Future Improvements
🎭 Add categories of jokes (explicit, dev, movie, etc.)

📱 Make responsive for mobile

🎨 Add joke animations

🤠 About
This project uses:

Chuck Norris API

Web Speech API

HTML, CSS (Glassmorphism), JS

Enjoy the jokes, and remember… Chuck Norris doesn’t do push-ups, he pushes the Earth down. 💪🥋

