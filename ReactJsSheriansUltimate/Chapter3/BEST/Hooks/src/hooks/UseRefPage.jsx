import React, { useRef } from 'react';
import Bubble from '../components/Bubble';

const UseRefPage = () => {
  const inputRef = useRef(null);

  const hackDOM = () => {
    // Direct DOM manipulation bypasses React
    inputRef.current.style.backgroundColor = '#fd79a8';
    inputRef.current.style.color = 'white';
    inputRef.current.value = "HACKED! 🕵️‍♂️";
    inputRef.current.focus();
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center bg-indigo-50">
      <Bubble 
        title="Direct Access" 
        content={`React shraafat se kaam karta hai (Props/State).
        Lekin useRef badmashi karta hai.
        
        Ye seedha Browser DOM me ghus ke element ko pakad leta hai.
        Useful for Focus, Animations, and Storing values without re-renders.`}
        color="#6c5ce7" x="70%" y="15%" 
      />

      <div className="glass-panel p-16 rounded-[2rem] flex flex-col gap-6 text-center">
        <h2 className="text-3xl font-bold text-slate-700">The Vault 🔒</h2>
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Type here..." 
          className="p-4 rounded-xl border-2 border-slate-200 text-xl text-center outline-none transition-all"
        />
        <button onClick={hackDOM} className="bg-slate-800 text-white py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform shadow-xl">
          Breach Security (Focus)
        </button>
      </div>
    </div>
  );
};

export default UseRefPage;