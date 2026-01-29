import React, { useState, useCallback } from 'react';
import Bubble from '../components/Bubble';

/*
  -------------------------------------------------------
  🎬 SCENE: The Freeze Ray
  -------------------------------------------------------
  Jab Parent re-render hota hai, to uske andar ke functions bhi
  dobara create hote hain (New memory address).
  
  Agar ye function kisi Child ko pass kia, to Child sochega "Naya function aya hai"
  aur wo bhi re-render ho jayega. Fazool kharcha!
  
  useCallback us function ko "Freeze" kar deta hai.
*/

// A child component that checks if it renders
const Sticker = React.memo(({ onClick, label }) => {
  console.log(`Rendering ${label}`); // Check console
  return (
    <button onClick={onClick} className="p-6 bg-white/50 border border-white rounded-2xl shadow-sm hover:scale-105 transition-transform">
      {label} 🎫
    </button>
  );
});

const UseCallbackPage = () => {
  const [count, setCount] = useState(0);

  // ❌ Bad: Re-created on every render
  const badFunction = () => console.log("Bad");

  // ✅ Good: Frozen until dependency changes
  const goodFunction = useCallback(() => {
    console.log("Good");
  }, []); // Empty dependency = Created once, never again

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center bg-cyan-50">
      <Bubble 
        title="Freeze Function" 
        content={`Parent ka background change ho raha hai (Re-render).
        Lekin "Frozen Sticker" re-render nahi ho raha.
        
        Kyunke useCallback ne us function ko memory me freeze kar diya hai.
        Child component khush: "Mujhe disturb nahi kiya!"`}
        color="#00cec9" x="15%" y="60%" 
      />

      <h1 className="text-4xl font-bold mb-8 text-cyan-800">Renders: {count}</h1>
      <button onClick={() => setCount(count+1)} className="mb-12 px-8 py-3 bg-cyan-600 text-white rounded-full shadow-lg">
        Trigger Parent Render
      </button>

      <div className="flex gap-10">
        <div className="text-center">
          <p className="mb-4 text-red-500 font-bold animate-pulse">Re-renders every time 😭</p>
          <Sticker onClick={badFunction} label="Normal Function" />
        </div>

        <div className="text-center">
          <p className="mb-4 text-green-600 font-bold">Stays Stable 😎</p>
          <Sticker onClick={goodFunction} label="Frozen (Callback)" />
        </div>
      </div>
    </div>
  );
};

export default UseCallbackPage;