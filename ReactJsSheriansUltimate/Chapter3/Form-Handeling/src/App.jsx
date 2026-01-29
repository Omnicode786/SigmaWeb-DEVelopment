/* -------------------------------------------------------------------------
  🎬 LECTURE: TWO-WAY BINDING KA ASLI SACH (Sherians Edition)
  -------------------------------------------------------------------------
  Bhai, ye jo niche code hai na, ye sirf form nahi hai... ye aik "Rishta" hai.
  
  1. STATE -> INPUT: Humne likha 'value={title}'. Iska matlab Input ab khud ki
     marzi se kuch nahi dikhayega. Wo React se puchega "Bhai kya dikhaun?"
     
  2. INPUT -> STATE: Humne likha 'onChange'. Jaise hi user ek bhi key dabayega,
     React foran 'setTitle' ko update karega.
     
  Isi ko kehte hain "Controlled Component". Agar aap 'value' property 
  nahi lagate, to wo "Uncontrolled" hota—yani wo apni man-mani karta.
  React mein humein 'Control' chahiye, warna debugging mein maut aa jayegi!
*/
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { Sparkles, Send, User, MessageSquareHeart, Ghost, Zap, Globe } from 'lucide-react'

/* -------------------------------------------------------------------------
  🎬 THE "BINA-DEKHE-NAHI-REH-SAKTE" LECTURE
  -------------------------------------------------------------------------
  Bhai, visibility ka asli matlab ye hai ke user ko har step pe "Feedback" mile.
  
  - Jab type karo: To icon nache (Visual Cue).
  - Jab focus karo: To border glow kare (State Cue).
  - Jab submit karo: To input gayab ho jaye aur naya card aaye (Logic Cue).
  
  Two-way binding ka maza tab hai jab screen pe kuch 'hote hue' dikhe!
*/

export default function App() {
  const [title, setTitle] = useState('')
  const [submittedName, setSubmittedName] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const formRef = useRef(null)

  // GSAP: Initial landing animation
  useEffect(() => {
    gsap.from(".main-card", {
      scale: 0.8,
      duration: 1.2,
      ease: "power4.out"
    })
  }, [])

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(title)
    if (!title.trim()) return
    setSubmittedName(title)
    setTitle('') // ✨ State clear = UI clear (The Power of Binding)
    
    // Celebration sound simulation/animation
    gsap.fromTo(".welcome-text", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
  }

  return (
    <div className="w-screen h-screen bg-[#0f172a] flex items-center justify-center overflow-hidden font-sans relative">
      
      {/* 🌌 DYNAMIC BACKGROUND (Ultra Visibility) */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-pink-600 rounded-full blur-[180px] opacity-20 animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600 rounded-full blur-[180px] opacity-20 animate-pulse" />

      {/* 🫧 DRAGGABLE "SHERIANS" LESSONS */}
      <div className="hidden xl:block">
        <LessonCard x="10%" y="15%" title="The Link 🔗" text="Value={title} ne input ki purani personality khatam kar di. Ab wo React ka 'Gulam' hai." color="border-pink-500" />
        <LessonCard x="75%" y="20%" title="The Event ⚡" text="onChange har ek stroke ko record karta hai. React kabhi kuch nahi bhoolta!" color="border-blue-500" />
        <LessonCard x="15%" y="70%" title="The Kill 🛑" text="preventDefault() ne browser ka purana 'Reload' wala system mar dia. Ab hum modern hain." color="border-purple-500" />
      </div>

      <motion.div 
        ref={formRef}
        className="main-card relative z-10 w-full max-w-xl p-8 rounded-[3.5rem] bg-white/10 backdrop-blur-3xl border border-white/20 shadow-[0_50px_100px_rgba(0,0,0,0.4)]"
      >
        {/* 🎇 TOP BADGE */}
        <div className="flex justify-center -mt-20 mb-8">
          <div className="bg-gradient-to-tr from-pink-500 to-violet-600 p-6 rounded-[2.5rem] shadow-2xl border-4 border-[#0f172a]">
            <Zap className="w-12 h-12 text-white fill-current" />
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">
            Two-Way <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">Binding</span>
          </h1>
          <p className="text-slate-400 font-bold mt-4 flex items-center justify-center gap-2">
            <Globe size={18} className="text-blue-400" /> NO RELOAD • FULL REACT CONTROL
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-8">
          <div className="group relative">
            <motion.div 
              animate={isFocused ? { scale: 1.2, color: "#f472b6" } : { scale: 1, color: "#94a3b8" }}
              className="absolute left-6 top-7 z-20"
            >
              <User size={32} />
            </motion.div>

            <input 
              type="text"
              placeholder="Likho apna naam..."
              value={title} 
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full pl-18 pr-8 py-8 bg-white/5 rounded-[2.5rem] border-4 border-white/10 text-white text-2xl font-black placeholder:text-slate-600 outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all shadow-inner"
            />

            {/* Visual Indicator of Binding */}
            {title && (
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute right-6 top-8 text-pink-400 text-sm font-black uppercase tracking-widest bg-pink-500/20 px-3 py-1 rounded-full border border-pink-500/30"
              >
                Syncing...
              </motion.div>
            )}
          </div>

          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(236, 72, 153, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-8 bg-white text-[#0f172a] rounded-[2.5rem] font-black text-3xl shadow-2xl flex items-center justify-center gap-4 group transition-all"
          >
            SUBMIT <Send size={30} className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </form>

        {/* 🏆 SUBMISSION RESULTS (High Visibility) */}
        <AnimatePresence>
          {submittedName && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="welcome-text mt-10 overflow-hidden"
            >
              <div className="p-8 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-[2.5rem] border-2 border-white/10 text-center">
                <span className="text-pink-400 font-black text-sm uppercase tracking-[0.3em]">Success Received</span>
                <h2 className="text-4xl font-black text-white mt-2 drop-shadow-lg">
                  WASSUP, {submittedName}! 👋
                </h2>
                <p className="text-slate-400 mt-2 font-medium italic">"Binding ne kaam kar dikhaya, jaani!"</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 🍬 BOTTOM BAR */}
      <div className="fixed bottom-8 flex gap-4">
        <div className="px-6 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-slate-500 text-xs font-bold uppercase tracking-widest">
          React Version: 19.0
        </div>
        <div className="px-6 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-slate-500 text-xs font-bold uppercase tracking-widest">
          Styling: Tailwind v4
        </div>
      </div>
    </div>
  )
}

// 📖 LESSON CARD COMPONENT
function LessonCard({ x, y, title, text, color }) {
  return (
    <motion.div 
      drag
      whileDrag={{ scale: 1.1, zIndex: 100 }}
      style={{ top: x, left: y }}
      className={`absolute w-72 p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border-t-4 ${color} shadow-2xl cursor-grab active:cursor-grabbing`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-3 h-3 rounded-full bg-current ${color.replace('border-', 'text-')}`} />
        <h3 className="text-white font-black uppercase text-sm tracking-tighter">{title}</h3>
      </div>
      <p className="text-slate-400 text-sm font-medium leading-relaxed italic">{text}</p>
    </motion.div>
  )
}