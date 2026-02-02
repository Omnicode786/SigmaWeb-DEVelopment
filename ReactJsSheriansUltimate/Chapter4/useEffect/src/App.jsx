import { useState, useEffect } from 'react'
import FloatingBubble from './components/FloatingBubble'

function App() {
  const [count, setCount] = useState(0)
  const [count1, setCount1] = useState(0)
  const [selectedBubble, setSelectedBubble] = useState(null)

  // --- Aapka Original Code Logic (No compromise here) ---
  function stateChange() { console.log("use effect is running") }
  function stateChange2() { console.log("use effect 2 is running") }

  useEffect(stateChange); // Har bar chalne wala (The Wanderer)
  useEffect(stateChange2, [count1]); // Sirf count1 wala (The Loyal)

  // --- Expanded "Sherians" Style Explanations ---
  const bubbleInfo = [
    { 
      id: 1, icon: "🍭", title: "The 'Aawara' Effect", color: "bg-pink-300",
      desc: "Bhai, ye bina dependency wala useEffect hai. Iska koi ghar-baar nahi! 😂 Jab bhi React screen pe ek pixel bhi hilayega, ye bhai sahab foran console pe 'Hazri' laga denge. Isay kehte hain default behavior!" 
    },
    { 
      id: 2, icon: "🎀", title: "The 'Wafadar' Array", color: "bg-purple-300",
      desc: "Ye [count1] wala scene hai. Isne Count 0 ko block maar diya hai! 🚫 Ye sirf tabhi chalta hai jab Count1 ki state badalti hai. Targeted kaam karne ke liye ye best hathyari hai!" 
    },
    { 
      id: 3, icon: "🌈", title: "Mounting vs Updating", color: "bg-blue-300",
      desc: "Jab pehli baar component screen pe aata hai (Mounting), to saare effect chalte hain. Uske baad sirf wahi chalta hai jiski state change ho rahi ho. Simple logic, no bakwas! 🏗️" 
    },
    { 
      id: 4, icon: "⭐", title: "Side Effects Ki Rani", color: "bg-yellow-300",
      desc: "useEffect side-by-side cheezon ko chalane ka kaam karta hai. React screen saaf kar raha hota hai aur piche ye APIs ya Console logs handle karta hai. Multitasking at its best! ⚡" 
    },
    { 
      id: 5, icon: "🧸", title: "The Empty Array []", color: "bg-green-300",
      desc: "Agar aapne dependency mein khali dabba [] daal diya, to wo 'Ek Baar Ka Sath' hai. Wo sirf tab chalega jab component paida hoga, phir khamosh! 🤫" 
    }
  ]

  return (
    <div className="min-h-screen bg-[#fff5f7] overflow-hidden relative font-['Comic_Sans_MS',_sans-serif] select-none">
      
      {/* ☁️ Animated Background Clouds */}
      <div className="absolute top-10 left-10 animate-bounce transition-all duration-1000">☁️</div>
      <div className="absolute top-20 right-20 animate-pulse text-4xl">✨</div>
      <div className="absolute bottom-10 left-1/4 animate-bounce text-2xl">🌸</div>

      {/* 🏰 MAIN COUNTER STATIONS */}
      <div className="flex flex-col items-center justify-center min-h-screen gap-12 relative z-10">
        
        <h1 className="text-5xl font-black text-[#ff85a1] drop-shadow-lg text-center leading-tight">
          KAWAII <br/> <span className="text-[#a2adbc] text-3xl">EFFECT STATION</span>
        </h1>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Station 1 */}
          <div className="bg-white p-8 rounded-[3rem] border-8 border-[#ffb3c1] shadow-[0_15px_0_#ffb3c1] text-center w-64 transform -rotate-2">
            <h2 className="text-[#ff85a1] font-bold mb-4 uppercase tracking-tighter">Count 0 (General)</h2>
            <p className="text-6xl font-black text-slate-700 mb-6">{count}</p>
            <button 
              onClick={() => setCount(count + 1)}
              className="bg-[#ff85a1] text-white px-6 py-4 rounded-2xl font-black hover:scale-110 active:scale-90 transition-all shadow-md"
            >
              UP! 🚀
            </button>
          </div>

          {/* Station 2 */}
          <div className="bg-white p-8 rounded-[3rem] border-8 border-[#b9fbc0] shadow-[0_15px_0_#b9fbc0] text-center w-64 transform rotate-2">
            <h2 className="text-[#8e9aaf] font-bold mb-4 uppercase tracking-tighter">Count 1 (Targeted)</h2>
            <p className="text-6xl font-black text-slate-700 mb-6">{count1}</p>
            <button 
              onClick={() => setCount1(count1 - 1)}
              className="bg-[#b9fbc0] text-slate-700 px-6 py-4 rounded-2xl font-black hover:scale-110 active:scale-90 transition-all shadow-md"
            >
              DOWN! 🎈
            </button>
          </div>
        </div>
      </div>

      {/* 🫧 FLOATING BUBBLES ZONE */}
      {bubbleInfo.map((info, index) => (
        <FloatingBubble 
          key={info.id} 
          info={info} 
          delay={index * 2} 
          onClick={() => setSelectedBubble(info)}
        />
      ))}

      {/* 🎀 KAWAII MODAL (Pop-up Information) */}
      {selectedBubble && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <div className="bg-white border-8 border-[#ffb3c1] rounded-[3rem] p-10 max-w-md relative shadow-[0_30px_60px_rgba(0,0,0,0.1)] animate-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedBubble(null)}
              className="absolute -top-6 -right-6 bg-white border-4 border-[#ffb3c1] w-12 h-12 rounded-full font-black text-xl flex items-center justify-center hover:rotate-90 transition-all"
            >
              X
            </button>
            <div className={`${selectedBubble.color} w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto shadow-inner`}>
              {selectedBubble.icon}
            </div>
            <h3 className="text-3xl font-black text-[#ff85a1] text-center mb-4 uppercase tracking-tighter italic">
              {selectedBubble.title}
            </h3>
            <p className="text-slate-600 font-bold leading-relaxed text-center italic">
              "{selectedBubble.desc}"
            </p>
          </div>
        </div>
      )}

    </div>
  )
}

// 🎈 Component for the Draggable Floating Bubble


export default App