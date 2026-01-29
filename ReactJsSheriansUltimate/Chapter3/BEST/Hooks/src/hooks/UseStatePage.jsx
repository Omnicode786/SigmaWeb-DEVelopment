import React, { useState } from 'react';
import Bubble from '../components/Bubble';
import { motion } from 'framer-motion';

/*
  -------------------------------------------------------
  🎬 SCENE: The Shape Shifter
  -------------------------------------------------------
  Bhai, useState wo jaadugar hai jo React ko "Re-paint" karne pe majboor karta hai.
  Simple variable change karoge? React soyega rahega.
  useState use karoge? React cheekh maar ke uthega: "UI Update karo bhai!"
*/

const UseStatePage = () => {
  const [shape, setShape] = useState('rounded-full');
  const [rotation, setRotation] = useState(0);

  return (
    <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100">
      
      <Bubble 
        title="State?" 
        content={`Imagine karo ye dabba aik "Zinda Cheez" hai.
        Jab hum 'setShape' call karte hain, hum React ko bolte hain:
        "Oye! Pura component dobara se chalao, lekin naye style ke sath!"`}
        color="#ff7675" x="15%" y="20%" 
      />

      <div className="glass-panel p-12 rounded-[3rem] flex flex-col items-center gap-10 min-w-[400px]">
        <motion.div 
          animate={{ rotate: rotation }}
          className={`w-48 h-48 bg-gradient-to-tr from-pink-500 to-purple-600 shadow-2xl ${shape} transition-all duration-500 border-4 border-white`}
        />

        <div className="grid grid-cols-2 gap-4 w-full">
          <button onClick={() => setShape('rounded-full')} className="p-4 bg-white rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-all font-bold text-pink-500">
            Circle ⚪
          </button>
          <button onClick={() => setShape('rounded-3xl')} className="p-4 bg-white rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-all font-bold text-purple-500">
            Squircle ⬜
          </button>
          <button onClick={() => setRotation(rotation + 90)} className="col-span-2 p-4 bg-black text-white rounded-2xl shadow-lg hover:bg-gray-800 transition-all font-bold">
            Ghoomo! (Rotate) 🔄
          </button>
        </div>
      </div>
    </div>
  );
};

export default UseStatePage;