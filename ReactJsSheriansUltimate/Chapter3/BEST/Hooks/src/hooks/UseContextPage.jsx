import React, { createContext, useContext, useState } from 'react';
import Bubble from '../components/Bubble';

/*
  -------------------------------------------------------
  🎬 SCENE: The Global Broadcast
  -------------------------------------------------------
  Prop Drilling se bachne ka tareeka.
  App ne aik "Tower" lagaya (Provider).
  Ab koi bhi bacha, kahin bhi betha ho, wo "useContext" ka receiver on karega
  aur data pakar lega. No wiring needed!
*/

const ThemeContext = createContext();

const Card = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`w-40 h-40 rounded-3xl shadow-lg flex items-center justify-center transition-all duration-700 ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'}`}>
      <span className="text-4xl">📡</span>
    </div>
  )
}

const UseContextPage = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme }}>
      <div className={`w-full h-full relative flex flex-col items-center justify-center transition-colors duration-700 ${theme === 'dark' ? 'bg-slate-900' : 'bg-blue-50'}`}>
        
        <Bubble 
          title="The Tower" 
          content={`Beech me koi wire (props) nahi hai.
          Button ne signal hawa me chora (Context Provider).
          Cards ne hawa se signal pakar liya (useContext).
          
          Global state management ka sasta jugad!`}
          color="#00b894" x="80%" y="20%" 
        />

        <div className="z-10 mb-12 text-center">
          <button 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="glass-panel px-8 py-4 rounded-full text-2xl font-bold hover:bg-white/50 transition-all"
          >
            {theme === 'light' ? '🌙 Switch to Dark Mode' : '☀️ Switch to Light Mode'}
          </button>
        </div>

        <div className="flex gap-8 perspective-1000">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default UseContextPage;