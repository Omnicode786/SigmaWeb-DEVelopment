import React, { useState, useMemo } from 'react';
import Bubble from '../components/Bubble';
import { motion } from 'framer-motion';

/*
  -------------------------------------------------------
  🎬 SCENE: The Ratta Master
  -------------------------------------------------------
  Agar calculation bhari hai (Heavy), to React har bar usko calculate karega.
  System hang ho jayega.
  
  useMemo kehta hai: "Bhai, jawab ratta maar lo."
  Jab tak sawal (dependency) same hai, jawab wohi purana copy-paste kardo.
*/

const UseMemoPage = () => {
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(false);

  // 🐢 SLOW FUNCTION
  const heavyNumber = useMemo(() => {
    let num = 0;
    // Artificially slow loop
    for(let i=0; i<500000000; i++) { num += i } 
    return count * 2;
  }, [count]); // Sirf tab run hoga jab 'count' change hoga. 'dark' change hone pe nahi!

  return (
    <div className={`w-full h-full relative flex items-center justify-center transition-colors ${dark ? 'bg-gray-900' : 'bg-emerald-50'}`}>
      
      <Bubble 
        title="Ratta System" 
        content={`"Dark Mode" button dabane se 'heavyNumber' dobara calculate NAHI hua.
        Kyun? Kyunke useMemo ne dekha ke 'count' to change hua hi nahi.
        
        To usne purana jawab chipka diya. Performance bach gayi!`}
        color="#fdcb6e" x="10%" y="30%" 
      />

      <div className="glass-panel p-10 rounded-3xl flex gap-10 items-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-slate-700">Heavy Result: {heavyNumber}</h2>
          <button onClick={() => setCount(count + 1)} className="bg-emerald-500 text-white py-3 px-6 rounded-xl shadow-lg hover:bg-emerald-600 active:translate-y-1">
            Change Number (Slow 🐢)
          </button>
        </div>

        <div className="w-[2px] h-32 bg-gray-300"></div>

        <div className="flex flex-col gap-4">
          <h2 className={`text-2xl font-bold ${dark ? 'text-white' : 'text-slate-700'}`}>Theme Switcher</h2>
          <button onClick={() => setDark(!dark)} className="bg-blue-500 text-white py-3 px-6 rounded-xl shadow-lg hover:bg-blue-600 active:translate-y-1">
             Toggle Theme (Fast 🐇)
          </button>
        </div>
      </div>
    </div>
  );
};

export default UseMemoPage;