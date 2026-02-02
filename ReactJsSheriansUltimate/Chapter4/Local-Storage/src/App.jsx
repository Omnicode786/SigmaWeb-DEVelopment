import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Database, HardDrive, Key, Trash2, Ghost, Save, Zap } from 'lucide-react'

/* -------------------------------------------------------------------------
  🎬 THE "HARD DRIVE" LECTURE (Sherians Style)
  -------------------------------------------------------------------------
  Bhai, Local Storage wo "Kacha Chitta" hai jo Browser band hone ke baad bhi 
  nahi mitt-ta. Jab tak aap 'removeItem' ya 'clear' nahi karte, ye chipka rehta hai.
  
  1. JSON.stringify: React Objects "Zinda" hote hain, lekin Local Storage 
     sirf "Murda" (String) cheezein leta hai. Isliye hum Stringify karte hain.
     
  2. JSON.parse: Jab wapis data nikalte hain, to wo String hota hai. 
     Usko dubara "Zinda" (Object) karne ke liye Parse zaroori hai.
*/

export default function App() {
  const [localData, setLocalData] = useState(null)
  const [isSaved, setIsSaved] = useState(false)

  // 📝 DATA SETUP
  const user1 = {
    username: "Muzammil Alam",
    age: 69,
    city: 'Karachi',
    cityTag: "The city of lights"
  }

  const saveToVault = () => {
    // Stringify: Object ko String banaya (Packing)
    let people = JSON.stringify(user1)
    localStorage.setItem('user1', people)
    localStorage.setItem('age', '48') // Simple values bhi store kar sakte hain
    
    // UI Update
    setLocalData(JSON.parse(localStorage.getItem('user1')))
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const clearVault = () => {
    localStorage.clear()
    setLocalData(null)
  }

  // Load data on start
  useEffect(() => {
    const saved = localStorage.getItem('user1')
    if (saved) setLocalData(JSON.parse(saved))
  }, [])

  return (
    <div className="w-screen h-screen bg-[#020617] flex items-center justify-center overflow-hidden font-sans relative">
      
      {/* 🌌 VISUAL REAL ESTATE: Glow Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />

      {/* 🫧 DRAGGABLE LESSON BUBBLES */}
      <div className="hidden lg:block">
        <LessonBubble x="10%" y="20%" title="Stringify 📦" color="border-emerald-500"
          text="Storage sirf Strings samajhta hai. Object ko dabba band (String) karna parta hai." />
        <LessonBubble x="80%" y="15%" title="Length 📏" color="border-blue-500"
          text={`Total Keys: ${localStorage.length}. Har Item aik key-value pair hai.`} />
        <LessonBubble x="15%" y="70%" title="Persistent 💎" color="border-purple-500" 
          text="Tab band karo ya computer—ye data yahan se kahin nahi jayega!" />
      </div>

      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 w-full max-w-2xl bg-slate-900/50 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-emerald-500/20 rounded-3xl border border-emerald-500/30">
              <Database className="text-emerald-400 w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tighter">LOCAL STORAGE</h1>
              <p className="text-slate-500 font-bold uppercase text-xs tracking-[0.2em]">The Browser's Memory</p>
            </div>
          </div>
          <Zap className={`w-8 h-8 transition-colors ${localData ? 'text-yellow-400' : 'text-slate-700'}`} />
        </div>

        {/* 📟 THE DATA CONSOLE */}
        <div className="bg-black/40 rounded-[2.5rem] p-8 border border-white/5 mb-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
            <HardDrive className="text-white" size={40} />
          </div>
          
          <h3 className="text-emerald-400 font-mono text-sm mb-4 uppercase tracking-widest flex items-center gap-2">
            <Key size={14} /> Current_Keys: [{JSON.stringify(user1)}]
          </h3>

          <AnimatePresence mode="wait">
            {localData ? (
              <motion.div 
                key="data" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">User</p>
                    <p className="text-white font-black text-xl">{localData.username}</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Status</p>
                    <p className="text-blue-400 font-black text-xl">{localData.cityTag}</p>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-slate-500 text-xs font-bold uppercase mb-1">JSON Raw (String)</p>
                  <p className="text-slate-400 font-mono text-xs break-all truncate">{localStorage.getItem('user1')}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="ghost" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 text-center text-slate-600">
                <Ghost size={48} className="mx-auto mb-4 opacity-20" />
                <p className="font-bold italic">"Memory is empty, jaani..."</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 🎮 CONTROLS */}
        <div className="flex gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={saveToVault}
            className={`flex-1 py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 transition-all
              ${isSaved ? 'bg-emerald-500 text-white' : 'bg-white text-slate-900 shadow-[0_10px_30px_rgba(255,255,255,0.1)]'}`}
          >
            {isSaved ? "DATA PACKED! ✅" : "SET ITEM 💾"}
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#ef4444' }} whileTap={{ scale: 0.95 }}
            onClick={clearVault}
            className="w-24 bg-slate-800 text-white rounded-3xl flex items-center justify-center transition-colors"
          >
            <Trash2 size={28} />
          </motion.button>
        </div>
      </motion.div>

      {/* 🍬 STATUS BAR */}
      <div className="fixed bottom-8 flex gap-4 px-8 w-full justify-between max-w-4xl text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
        <p>LocalStorage.setItem(key, value)</p>
        <p>JSON.parse(localStorage.getItem(key))</p>
      </div>
    </div>
  )
}

function LessonBubble({ x, y, title, text, color }) {
  return (
    <motion.div drag style={{ top: x, left: y }} className={`absolute w-64 p-6 bg-slate-900/80 backdrop-blur-xl border-l-4 ${color} rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing z-0 hover:z-50`}>
      <h4 className="text-white font-black text-xs uppercase mb-2 flex items-center gap-2">
        <Zap size={12} className="text-yellow-400" /> {title}
      </h4>
      <p className="text-slate-400 text-xs leading-relaxed font-medium">{text}</p>
    </motion.div>
  )
}