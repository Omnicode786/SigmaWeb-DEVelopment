import React, { useState, useEffect } from 'react';
import Bubble from '../components/Bubble';

/*
  -------------------------------------------------------
  🎬 SCENE: The Side-Wali Cycle
  -------------------------------------------------------
  Main component (UI) apni speed me chal raha hai.
  Lekin humein "Side" pe kuch karna hai (API call, Timer, DOM change).
  
  useEffect wo worker hai jo chupke se side pe kaam karta hai.
  Array [] khali hai? Matlab worker sirf pehli baar ayega.
  Array [party] hai? Matlab jab 'party' change hogi, worker wapas ayega.
*/

const UseEffectPage = () => {
  const [active, setActive] = useState(false);
  const [bgColor, setBgColor] = useState('#f8fafc');

  useEffect(() => {
    if (!active) {
      setBgColor('#f8fafc');
      return;
    }

    // SIDE EFFECT: Disco Lights 🕺
    const interval = setInterval(() => {
      const colors = ['#ffeaa7', '#fab1a0', '#74b9ff', '#55efc4', '#a29bfe'];
      const random = colors[Math.floor(Math.random() * colors.length)];
      setBgColor(random);
    }, 600);

    // CLEANUP: Safai Karamchari 🧹
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="w-full h-full relative flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: bgColor }}>
      <Bubble 
        title="Side Effect" 
        content={`Truck (UI) chal raha hai.
        Cycle (useEffect) side pe chal rahi hai.
        
        Agar hum 'Cleanup' nahi karenge (return function), to cycle rukegi nahi aur memory leak ho jayegi!`}
        color="#0984e3" x="20%" y="15%" 
      />

      <div className="text-center glass-panel p-16 rounded-[3rem]">
        <h1 className="text-6xl mb-8 animate-pulse">{active ? "💃 PARTY ON! 🕺" : "🤫 Sannata..."}</h1>
        <button 
          onClick={() => setActive(!active)}
          className={`px-10 py-5 rounded-full text-2xl font-bold shadow-xl transition-transform active:scale-95 ${active ? 'bg-white text-black' : 'bg-blue-600 text-white'}`}
        >
          {active ? "Stop Music" : "Play Music"}
        </button>
      </div>
    </div>
  );
};

export default UseEffectPage;